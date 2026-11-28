"""A target is one locked statement and everything written while trying to prove it.

    lean/Targets/<Name>/
        Challenge.lean    the statement, ending in `sorry`. Locked: never edited after approval.
        comparator.json   what the judge compares (theorem names, permitted axioms). Locked.
        Solution.lean     the agent's proof. Same statement, real proof.
        NOTES.md          the agent's running memory: plan, what failed, what is proved.
        ledger.jsonl      one line per loop iteration, appended by the harness.
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import time
from dataclasses import dataclass
from pathlib import Path

from .lean import LEAN_DIR, ROOT

TARGETS_DIR = LEAN_DIR / "Targets"
PERMITTED_AXIOMS = ["propext", "Quot.sound", "Classical.choice"]
NAME = re.compile(r"^[A-Z][A-Za-z0-9]*$")
THEOREM = re.compile(r"^\s*(?:theorem|lemma)\s+([^\s:({\[]+)", re.M)
NAMESPACE = re.compile(r"^\s*(namespace|end)\s+([^\s]+)\s*$", re.M)

NOTES_TEMPLATE = """# {name}: working notes

This file is the prover's memory between iterations. Keep it short and true.

## Plan
(informal proof sketch goes here before any Lean is written)

## Proved so far
(lemma names that compile without sorry)

## Dead ends
(what was tried and why it failed, so it is not tried again)

## Open holes
(each remaining sorry and the current idea for it)
"""


@dataclass
class Target:
    name: str

    @property
    def dir(self) -> Path:
        return TARGETS_DIR / self.name

    @property
    def challenge(self) -> Path:
        return self.dir / "Challenge.lean"

    @property
    def solution(self) -> Path:
        return self.dir / "Solution.lean"

    @property
    def config(self) -> Path:
        return self.dir / "comparator.json"

    @property
    def notes(self) -> Path:
        return self.dir / "NOTES.md"

    @property
    def ledger(self) -> Path:
        return self.dir / "ledger.jsonl"

    @property
    def refutation(self) -> Path:
        return self.dir / "Refutation.lean"

    @property
    def locked(self) -> list[Path]:
        return [self.challenge, self.config]

    def exists(self) -> bool:
        return self.challenge.exists() and self.config.exists()

    def theorems(self) -> list[str]:
        return json.loads(self.config.read_text())["theorem_names"]

    def lock_hashes(self) -> dict[str, str]:
        return {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in self.locked}

    def log(self, event: dict) -> None:
        event = {"time": time.strftime("%Y-%m-%dT%H:%M:%S"), **event}
        with self.ledger.open("a") as f:
            f.write(json.dumps(event, ensure_ascii=False) + "\n")

    def history(self) -> list[dict]:
        if not self.ledger.exists():
            return []
        return [json.loads(line) for line in self.ledger.read_text().splitlines() if line.strip()]


def qualified_theorems(source: str) -> list[str]:
    """Fully qualified names of the theorems declared in a Lean file (namespaces applied)."""
    from .auto import strip_comments
    source = strip_comments(source)
    events = [(m.start(), "ns", m.group(1), m.group(2)) for m in NAMESPACE.finditer(source)]
    events += [(m.start(), "thm", "", m.group(1)) for m in THEOREM.finditer(source)]
    stack: list[str] = []
    names = []
    for _, kind, verb, ident in sorted(events):
        if kind == "ns":
            if verb == "namespace":
                stack.append(ident)
            elif stack and stack[-1] == ident:
                stack.pop()
        else:
            names.append(".".join(stack + [ident]))
    return names


def create(name: str, statement_file: Path, theorems: list[str] | None = None) -> Target:
    """Set up a new target from a Lean file holding the statement with `sorry` as its proof."""
    if not NAME.match(name):
        raise ValueError("target name must be UpperCamelCase letters and digits (it becomes a Lean module name)")
    t = Target(name)
    if t.dir.exists():
        raise FileExistsError(f"{t.dir} already exists")
    source = statement_file.read_text()
    if "sorry" not in source:
        raise ValueError("the statement file has no `sorry`: there is nothing to prove")
    names = theorems or qualified_theorems(source)
    if not names:
        raise ValueError("no theorem found in the statement file")
    t.dir.mkdir(parents=True)
    t.challenge.write_text(source)
    t.solution.write_text(source)  # the agent starts from the statement itself
    t.config.write_text(json.dumps({
        "challenge_module": f"Targets.{name}.Challenge",
        "solution_module": f"Targets.{name}.Solution",
        "theorem_names": names,
        "definition_names": [],
        "permitted_axioms": PERMITTED_AXIOMS,
    }, indent=2) + "\n")
    t.notes.write_text(NOTES_TEMPLATE.format(name=name))
    return t


def all_targets() -> list[Target]:
    if not TARGETS_DIR.exists():
        return []
    return [Target(p.name) for p in sorted(TARGETS_DIR.iterdir()) if (p / "comparator.json").exists()]


def committed_bytes(path: Path) -> bytes | None:
    """The file as committed at HEAD, or None if it is not committed."""
    rel = path.resolve().relative_to(ROOT)
    proc = subprocess.run(["git", "show", f"HEAD:{rel.as_posix()}"], cwd=ROOT, capture_output=True)
    return proc.stdout if proc.returncode == 0 else None
