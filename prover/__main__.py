"""Command line for the prover harness. Run from the repository root: python3 -m prover <command>."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

from . import auto, lean
from .judge import judge
from .loop import run_loop, claude_backend, command_backend
from .target import Target, create, all_targets

MATHLIB = lean.LEAN_DIR / ".lake" / "packages" / "mathlib" / "Mathlib"


def cmd_check(args) -> int:
    result = lean.check(args.file)
    print(json.dumps(result.to_json(), indent=1) if args.json else result.render())
    return 0 if result.complete else 1


def cmd_auto(args) -> int:
    holes, result = auto.run_auto(args.file, write=not args.dry_run)
    print(auto.render(holes, result))
    return 0 if holes and all(h.closed_by for h in holes) else 1


def cmd_search(args) -> int:
    proc = subprocess.run(["grep", "-rnE", "--include=*.lean", "-m", "5", args.pattern, str(MATHLIB)],
                          capture_output=True, text=True)
    lines = proc.stdout.splitlines()
    decls = [ln for ln in lines if any(k in ln for k in ("theorem ", "lemma ", "def ", "instance ", "abbrev ", "structure ", "class "))]
    for ln in (decls or lines)[: args.limit]:
        print(ln.replace(str(MATHLIB.parent) + "/", "")[:300])
    if not lines:
        print("no match")
    return 0


def cmd_new(args) -> int:
    t = create(args.name, Path(args.statement), args.theorem or None)
    print(f"created {t.dir.relative_to(lean.ROOT)} for {', '.join(t.theorems())}")
    print("Review Challenge.lean (does it say what you mean?), then commit it. From then on it is locked.")
    return 0


def cmd_judge(args) -> int:
    t = Target(args.target)
    verdict = judge(t, paranoid=args.paranoid)
    t.log({"event": "judged", "manual": True, **verdict.to_json() | {"detail": ""}})
    print(json.dumps(verdict.to_json(), indent=1) if args.json else verdict.render())
    return 0 if verdict.accepted else 1


def cmd_loop(args) -> int:
    backend = command_backend(args.agent_command) if args.agent_command else claude_backend
    final = run_loop(Target(args.target), args.iterations, args.worker_minutes, backend, args.model)
    print(json.dumps(final, indent=1))
    return 0 if final["status"] == "proved" else 1


def cmd_status(args) -> int:
    for t in all_targets():
        hist = t.history()
        done = [e for e in hist if e.get("event") == "finished"]
        accepted = any(e.get("event") == "judged" and e.get("accepted") for e in hist)
        iters = sum(1 for e in hist if e.get("event") == "iteration")
        cost = sum(e.get("cost_usd") or 0 for e in hist if e.get("event") == "iteration")
        state = "PROVED (judge accepted)" if accepted else (done[-1]["status"] if done else "not started")
        print(f"{t.name:28} {state:28} iterations={iters} cost=${cost:.2f}  {', '.join(t.theorems())}")
    return 0


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="prover", description=__doc__)
    sub = p.add_subparsers(dest="command", required=True)

    s = sub.add_parser("check", help="compile one Lean file and report errors and holes")
    s.add_argument("file"); s.add_argument("--json", action="store_true"); s.set_defaults(fn=cmd_check)

    s = sub.add_parser("auto", help="try the tactic portfolio on every sorry in a file")
    s.add_argument("file"); s.add_argument("--dry-run", action="store_true"); s.set_defaults(fn=cmd_auto)

    s = sub.add_parser("search", help="search Mathlib source for declarations matching a regex")
    s.add_argument("pattern"); s.add_argument("--limit", type=int, default=40); s.set_defaults(fn=cmd_search)

    s = sub.add_parser("new", help="create a target from a Lean statement file")
    s.add_argument("name"); s.add_argument("statement")
    s.add_argument("--theorem", action="append", help="fully qualified theorem name (default: all in the file)")
    s.set_defaults(fn=cmd_new)

    s = sub.add_parser("judge", help="run the sandboxed comparator on a target")
    s.add_argument("target"); s.add_argument("--paranoid", action="store_true")
    s.add_argument("--json", action="store_true"); s.set_defaults(fn=cmd_judge)

    s = sub.add_parser("loop", help="run the proving loop on a target until proved, stalled or out of budget")
    s.add_argument("target"); s.add_argument("--iterations", type=int, default=8)
    s.add_argument("--worker-minutes", type=int, default=45); s.add_argument("--model")
    s.add_argument("--agent-command", help="use another agent: a command that reads the prompt on stdin")
    s.set_defaults(fn=cmd_loop)

    s = sub.add_parser("status", help="one line per target"); s.set_defaults(fn=cmd_status)

    args = p.parse_args(argv)
    return args.fn(args)


if __name__ == "__main__":
    sys.exit(main())
