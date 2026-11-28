"""Adversarial self-test of the judge: python3 -m prover.selftest

Each file in cheats/ is a "proof" of the same small theorem. `honest.lean` is real; every
other file cheats in a different way, and most of them compile without complaint. The judge
must accept the honest one and reject all the others. Each cheat is judged twice: with the
source lint on (what the loop does) and with it off, to show the sandboxed comparator alone
catches it and nothing rests on pattern matching.

Writes docs/evidence/judge-selftest.json. Takes roughly a minute per file.
"""
from __future__ import annotations

import json
import shutil
import sys
import time
from pathlib import Path

from .. import lean
from ..judge import judge, lint
from ..target import Target, create

HERE = Path(__file__).parent
OUT = lean.ROOT / "docs" / "evidence" / "judge-selftest.json"


def main() -> int:
    target = Target("JudgeSelfTest")
    shutil.rmtree(target.dir, ignore_errors=True)
    create("JudgeSelfTest", HERE / "challenge.lean")
    rows = []
    try:
        for cheat in sorted((HERE / "cheats").glob("*.lean")):
            honest = cheat.stem == "honest"
            target.solution.write_text(cheat.read_text())
            compiles = lean.check(target.solution)
            lint_problems = lint(target)
            start = time.time()
            verdict = judge(target, skip_lint=True)
            row = {
                "case": cheat.stem,
                "should_be_accepted": honest,
                "compiles_without_error": compiles.ok,
                "caught_by_source_lint": bool(lint_problems),
                "comparator_accepted": verdict.accepted,
                "correct": verdict.accepted == honest,
                "comparator_says": [ln for ln in verdict.detail.splitlines() if ln.strip()][-1:] if verdict.detail else verdict.reasons,
                "seconds": round(time.time() - start),
            }
            rows.append(row)
            print(json.dumps(row), flush=True)
    finally:
        shutil.rmtree(target.dir, ignore_errors=True)
    passed = all(r["correct"] for r in rows)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps({"lean": "4.36.0", "mathlib": "v4.36.0", "all_correct": passed, "cases": rows}, indent=1) + "\n")
    print("ALL CORRECT" if passed else "JUDGE MADE A WRONG CALL")
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
