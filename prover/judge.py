"""The judge. Nothing counts as proved until this says so.

Three stages, cheapest first. The last one is Lean's own `lake comparator`, run in its
sandbox: it rebuilds both files, checks the solution proves the *same* statement as the
locked challenge (same kernel term, same definitions underneath), allows only the three
standard axioms, and has the kernel re-check the proof.

The agent never runs as the judge of its own work: the loop calls this after the agent stops.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
from dataclasses import dataclass, field, asdict

from . import lean
from .auto import strip_comments
from .target import Target, PERMITTED_AXIOMS, committed_bytes

# Things a finished proof file has no business containing. The comparator would catch the
# ones that matter; rejecting them here gives the agent a clear message a minute sooner.
BANNED = {
    r"(?<![\w.'])sorry(?![\w'])": "contains `sorry`",
    r"(?<![\w.'])admit(?![\w'])": "contains `admit`",
    r"^\s*(?:private\s+|protected\s+)?axiom\s": "declares an axiom",
    r"native_decide|decide\s*\+native|ofReduceBool|bv_decide": "uses native evaluation (adds an axiom)",
    r"debug\.skipKernelTC": "turns off the kernel check",
    r"implemented_by|@\[\s*extern|(?<![\w.'])unsafe\s": "uses unsafe or externally implemented code",
    r"^\s*import\s+OpenMath": "imports the harness helper (final proofs import Mathlib only)",
}
IMPORT = re.compile(r"^\s*(?:public\s+)?import\s+(?:all\s+)?(\S+)", re.M)


@dataclass
class Verdict:
    accepted: bool
    stage: str  # locks | lint | comparator
    reasons: list[str] = field(default_factory=list)
    detail: str = ""

    def to_json(self) -> dict:
        return asdict(self)

    def render(self) -> str:
        head = "ACCEPTED: kernel-checked against the locked statement" if self.accepted else f"REJECTED at stage `{self.stage}`"
        lines = [head] + [f"  - {r}" for r in self.reasons]
        if self.detail and not self.accepted:
            lines.append("  comparator output (tail):")
            lines += ["    " + ln for ln in self.detail.splitlines()[-25:]]
        return "\n".join(lines)


def check_locks(target: Target, expected: dict[str, str] | None = None) -> list[str]:
    """The challenge and judge config must be exactly what was approved."""
    problems = []
    for path in target.locked:
        if not path.exists():
            problems.append(f"{path.name} is missing")
            continue
        data = path.read_bytes()
        if expected is not None:
            if hashlib.sha256(data).hexdigest() != expected.get(path.name):
                problems.append(f"{path.name} was modified during the run (it is locked)")
        else:
            committed = committed_bytes(path)
            if committed is not None and committed != data:
                problems.append(f"{path.name} differs from the committed version (it is locked)")
    cfg = json.loads(target.config.read_text()) if target.config.exists() else {}
    if sorted(cfg.get("permitted_axioms", [])) != sorted(PERMITTED_AXIOMS):
        problems.append("comparator.json permits axioms other than propext, Quot.sound, Classical.choice")
    if cfg.get("definition_names"):
        problems.append("comparator.json has definition holes; those need separate human review")
    return problems


def lint(target: Target) -> list[str]:
    """Cheap source checks on every solution-side file."""
    problems = []
    files = [p for p in target.dir.glob("*.lean") if p.name not in ("Challenge.lean", "Refutation.lean")]
    own = f"Targets.{target.name}."
    for path in files:
        text = strip_comments(path.read_text())
        for pattern, why in BANNED.items():
            if re.search(pattern, text, flags=re.M):
                problems.append(f"{path.name} {why}")
        for mod in IMPORT.findall(text):
            if mod == "Mathlib" or mod.startswith("Mathlib."):
                continue
            if mod.startswith(own) and mod != own + "Challenge":
                continue
            problems.append(f"{path.name} imports `{mod}` (allowed: Mathlib and this target's own helper files)")
    if not target.solution.exists():
        problems.append("Solution.lean is missing")
    return problems


def judge(target: Target, expected_locks: dict[str, str] | None = None, paranoid: bool = False,
          timeout: int = 3600, skip_lint: bool = False) -> Verdict:
    problems = check_locks(target, expected_locks)
    if problems:
        return Verdict(False, "locks", problems)
    problems = [] if skip_lint else lint(target)
    if problems:
        return Verdict(False, "lint", problems)
    if shutil.which("bwrap") is None:
        return Verdict(False, "comparator", ["bubblewrap (`bwrap`) is not installed; the comparator sandbox cannot start"])
    cmd = ["lake", "comparator", "--config", str(target.config.relative_to(lean.LEAN_DIR))]
    if paranoid:
        cmd.append("--paranoid")
    proc = lean.run(cmd, timeout)
    if proc is None:
        return Verdict(False, "comparator", ["the comparator timed out"])
    output = (proc.stdout + "\n" + proc.stderr).strip()
    if proc.returncode == 0:
        return Verdict(True, "comparator", [f"theorem(s): {', '.join(target.theorems())}",
                                             f"axioms permitted: {', '.join(PERMITTED_AXIOMS)}",
                                             "extra kernels: " + ("all bundled" if paranoid else "none (run with --paranoid)")],
                       output[-3000:])
    reason = {1: "the comparator rejected the solution", 2: "the comparator could not start"}.get(
        proc.returncode, f"the comparator exited with code {proc.returncode}")
    return Verdict(False, "comparator", [reason], output[-6000:])
