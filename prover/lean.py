"""Thin, typed access to Lean: compile one file, read its diagnostics.

Every call goes through one file lock, because a Lean process that imports Mathlib takes
several GB and the machine has room for about two at a time.
"""
from __future__ import annotations

import fcntl
import json
import os
import re
import subprocess
from dataclasses import dataclass, asdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEAN_DIR = ROOT / "lean"
ELAN_BIN = Path.home() / ".elan" / "bin"
MAX_CONCURRENT_LEAN = int(os.environ.get("OPENMATH_LEAN_JOBS", "2"))

AXIOM_LINE = re.compile(r"'(?P<name>[^']+)' depends on axioms: \[(?P<axioms>[^\]]*)\]")
NO_AXIOMS = re.compile(r"'(?P<name>[^']+)' does not depend on any axioms")


@dataclass
class Diagnostic:
    severity: str  # error | warning | information
    line: int
    column: int
    message: str

    def short(self, limit: int = 1200) -> str:
        text = self.message if len(self.message) <= limit else self.message[:limit] + " …"
        return f"{self.severity} at {self.line}:{self.column}: {text}"


@dataclass
class CheckResult:
    path: str
    ok: bool  # compiled with no errors
    errors: list[Diagnostic]
    sorries: list[Diagnostic]
    warnings: list[Diagnostic]
    infos: list[Diagnostic]
    axioms: dict[str, list[str]]
    timed_out: bool = False

    @property
    def complete(self) -> bool:
        """No errors and no `sorry` anywhere in the file."""
        return self.ok and not self.sorries

    def to_json(self) -> dict:
        return asdict(self) | {"complete": self.complete}

    def render(self, limit: int = 30) -> str:
        if self.timed_out:
            return f"{self.path}: TIMED OUT"
        lines = [f"{self.path}: {len(self.errors)} error(s), {len(self.sorries)} sorry(s)"]
        for d in (self.errors + self.sorries)[:limit]:
            lines.append("  " + d.short().replace("\n", "\n    "))
        for d in self.infos[:limit]:
            lines.append("  " + d.short().replace("\n", "\n    "))
        if self.complete:
            lines.append("  compiles with no errors and no sorry (not yet judged)")
        return "\n".join(lines)


def env() -> dict:
    e = dict(os.environ)
    e["PATH"] = f"{ELAN_BIN}:{e.get('PATH', '')}"
    return e


class _Slot:
    """One of MAX_CONCURRENT_LEAN machine-wide slots for a heavy Lean process."""

    def __enter__(self):
        lock_dir = LEAN_DIR / ".lake"
        lock_dir.mkdir(exist_ok=True)
        self.handles = [open(lock_dir / f"openmath-slot-{i}.lock", "w") for i in range(MAX_CONCURRENT_LEAN)]
        for h in self.handles:  # take any free slot without waiting
            try:
                fcntl.flock(h, fcntl.LOCK_EX | fcntl.LOCK_NB)
                self.held = h
                return self
            except BlockingIOError:
                continue
        self.held = self.handles[0]
        fcntl.flock(self.held, fcntl.LOCK_EX)  # all busy: queue on the first
        return self

    def __exit__(self, *exc):
        fcntl.flock(self.held, fcntl.LOCK_UN)
        for h in self.handles:
            h.close()


def run(cmd: list[str], timeout: int) -> subprocess.CompletedProcess | None:
    """Run a command in the Lake project. None means it timed out."""
    with _Slot():
        try:
            return subprocess.run(cmd, cwd=LEAN_DIR, env=env(), capture_output=True, text=True, timeout=timeout)
        except subprocess.TimeoutExpired:
            return None


def parse_diagnostics(stdout: str) -> list[Diagnostic]:
    out = []
    for line in stdout.splitlines():
        if not line.startswith("{"):
            continue
        try:
            d = json.loads(line)
        except json.JSONDecodeError:
            continue
        pos = d.get("pos") or {}
        out.append(Diagnostic(d.get("severity", "error"), pos.get("line", 0), pos.get("column", 0), d.get("data", "")))
    return out


def classify(path: str, diags: list[Diagnostic], returncode: int) -> CheckResult:
    errors = [d for d in diags if d.severity == "error"]
    sorries = [d for d in diags if d.severity == "warning" and "declaration uses `sorry`" in d.message]
    warnings = [d for d in diags if d.severity == "warning" and d not in sorries]
    infos = [d for d in diags if d.severity == "information"]
    axioms: dict[str, list[str]] = {}
    for d in infos:
        if m := AXIOM_LINE.search(d.message):
            axioms[m["name"]] = [a.strip() for a in m["axioms"].split(",") if a.strip()]
        elif m := NO_AXIOMS.search(d.message):
            axioms[m["name"]] = []
    ok = not errors and returncode == 0
    return CheckResult(path, ok, errors, sorries, warnings, infos, axioms)


def check(path: Path | str, timeout: int = 900) -> CheckResult:
    """Compile one Lean file inside the project and return its diagnostics."""
    path = Path(path).resolve()
    proc = run(["lake", "env", "lean", "--json", str(path)], timeout)
    if proc is None:
        return CheckResult(str(path), False, [], [], [], [], {}, timed_out=True)
    diags = parse_diagnostics(proc.stdout)
    if proc.returncode != 0 and not any(d.severity == "error" for d in diags):
        diags.append(Diagnostic("error", 0, 0, (proc.stderr or proc.stdout or "lean failed").strip()[:4000]))
    return classify(str(path), diags, proc.returncode)
