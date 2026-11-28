"""The proving loop.

    repeat:
        measure   compile Solution.lean, count errors and holes
        judge     if it compiles with no holes, run the judge; stop if accepted
        work      hand a fresh-context agent the target, the notes and the diagnostics
        guard     restore the locked files if the agent touched them
        sweep     close whatever the tactic portfolio can close
        record    append the iteration to the ledger

Each iteration starts the agent with a clean context. What carries over is on disk:
Solution.lean, NOTES.md and the ledger. The agent proposes; only the judge decides.
"""
from __future__ import annotations

import hashlib
import json
import shlex
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path

from . import auto, lean
from .judge import judge, lint, Verdict
from .target import Target

PROTOCOL = (Path(__file__).parent / "PROTOCOL.md")
WORKER_TOOLS = "Bash,Read,Edit,Write,Grep,Glob"


@dataclass
class WorkerRun:
    ok: bool
    seconds: float
    cost_usd: float | None = None
    turns: int | None = None
    summary: str = ""


def claude_backend(prompt: str, timeout: int, model: str | None = None) -> WorkerRun:
    """One headless Claude Code session in the repo, with shell and file tools."""
    cmd = ["claude", "-p", prompt, "--output-format", "json", "--allowedTools", WORKER_TOOLS]
    if model:
        cmd += ["--model", model]
    start = time.time()
    try:
        proc = subprocess.run(cmd, cwd=lean.ROOT, env=lean.env(), capture_output=True, text=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        return WorkerRun(False, time.time() - start, summary="worker timed out")
    seconds = time.time() - start
    try:
        data = json.loads(proc.stdout)
        return WorkerRun(not data.get("is_error", False), seconds, data.get("total_cost_usd"),
                         data.get("num_turns"), (data.get("result") or "")[-2000:])
    except json.JSONDecodeError:
        return WorkerRun(proc.returncode == 0, seconds, summary=(proc.stdout or proc.stderr)[-2000:])


def command_backend(template: str):
    """Any other agent: a shell command that reads the prompt on stdin and works in the repo."""
    def run(prompt: str, timeout: int, model: str | None = None) -> WorkerRun:
        start = time.time()
        try:
            proc = subprocess.run(shlex.split(template), input=prompt, cwd=lean.ROOT, env=lean.env(),
                                  capture_output=True, text=True, timeout=timeout)
        except subprocess.TimeoutExpired:
            return WorkerRun(False, time.time() - start, summary="worker timed out")
        return WorkerRun(proc.returncode == 0, time.time() - start, summary=proc.stdout[-2000:])
    return run


def build_prompt(target: Target, state: lean.CheckResult, last_verdict: Verdict | None, iteration: int) -> str:
    rel = target.dir.relative_to(lean.ROOT)
    parts = [
        PROTOCOL.read_text(),
        f"\n# Your assignment (iteration {iteration})\n",
        f"Target directory: `{rel}/`",
        f"Theorem(s) to prove: {', '.join('`' + t + '`' for t in target.theorems())}",
        f"Locked statement: `{rel}/Challenge.lean` (read it, never edit it)",
        f"Your file: `{rel}/Solution.lean`",
        f"Your notes from earlier iterations: `{rel}/NOTES.md` (read this first)",
        "\n## Where things stand right now\n",
        "```\n" + state.render() + "\n```",
    ]
    if last_verdict is not None and not last_verdict.accepted:
        parts += ["\n## The judge rejected the last submission\n", "```\n" + last_verdict.render() + "\n```"]
    return "\n".join(parts)


def restore_locks(target: Target, originals: dict[str, bytes]) -> list[str]:
    restored = []
    for path in target.locked:
        if not path.exists() or path.read_bytes() != originals[path.name]:
            path.write_bytes(originals[path.name])
            restored.append(path.name)
    return restored


def check_refutation(target: Target) -> bool:
    """A refutation is a compiled, hole-free proof that the statement is false. A human must
    still confirm it negates the right statement; the loop only stops and reports it."""
    if not target.refutation.exists():
        return False
    result = lean.check(target.refutation)
    text = auto.strip_comments(target.refutation.read_text())
    return result.complete and "axiom" not in text and "native_decide" not in text


def fingerprint(target: Target, state: lean.CheckResult) -> str:
    h = hashlib.sha256()
    for p in sorted(target.dir.glob("*.lean")):
        h.update(p.read_bytes())
    return f"{h.hexdigest()[:16]}:{len(state.errors)}:{len(state.sorries)}"


def run_loop(target: Target, max_iterations: int = 8, worker_minutes: int = 45, backend=claude_backend,
             model: str | None = None, stall_limit: int = 3, say=print) -> dict:
    """Drive one target to a verdict. Returns the final ledger entry."""
    originals = {p.name: p.read_bytes() for p in target.locked}
    locks = target.lock_hashes()
    last_verdict: Verdict | None = None
    seen: list[str] = []
    total_cost = 0.0
    started = time.time()

    def finish(status: str, **extra) -> dict:
        entry = {"event": "finished", "status": status, "minutes": round((time.time() - started) / 60, 1),
                 "cost_usd": round(total_cost, 2), **extra}
        target.log(entry)
        say(f"[{target.name}] {status}")
        return entry

    for iteration in range(1, max_iterations + 2):
        state = lean.check(target.solution)
        say(f"[{target.name}] iteration {iteration}: {len(state.errors)} error(s), {len(state.sorries)} hole(s)")
        if state.complete and not lint(target):
            last_verdict = judge(target, expected_locks=locks)
            target.log({"event": "judged", "iteration": iteration, **last_verdict.to_json() | {"detail": ""}})
            if last_verdict.accepted:
                return finish("proved", iterations=iteration - 1, verdict=last_verdict.reasons)
            say(last_verdict.render())
        if check_refutation(target):
            return finish("refutation-claimed", iterations=iteration - 1,
                          note="Refutation.lean compiles with no holes; a human must confirm it negates the challenge")
        if iteration > max_iterations:
            break
        mark = fingerprint(target, state)
        if seen[-stall_limit:] == [mark] * stall_limit:
            return finish("stalled", iterations=iteration - 1, errors=len(state.errors), holes=len(state.sorries))
        seen.append(mark)

        run = backend(build_prompt(target, state, last_verdict, iteration), worker_minutes * 60, model)
        total_cost += run.cost_usd or 0.0
        tampered = restore_locks(target, originals)
        swept = 0
        if target.solution.exists() and "sorry" in target.solution.read_text():
            holes, _ = auto.run_auto(target.solution)
            swept = sum(1 for h in holes if h.closed_by)
        after = lean.check(target.solution)
        target.log({"event": "iteration", "iteration": iteration, "worker_ok": run.ok,
                    "worker_minutes": round(run.seconds / 60, 1), "cost_usd": run.cost_usd, "turns": run.turns,
                    "errors": len(after.errors), "holes": len(after.sorries), "holes_closed_by_portfolio": swept,
                    "locked_files_restored": tampered, "worker_summary": run.summary[-600:]})
    return finish("out-of-iterations", iterations=max_iterations)
