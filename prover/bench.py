"""Calibration run: python3 -m prover.bench [Name ...]

Turns each statement in bench/statements/ into a target and runs the full loop on it, one
after another, with no human in between. Writes docs/evidence/calibration.json.

`CalFalse` is false on purpose: the right outcome there is `refutation-claimed`, not `proved`.
"""
from __future__ import annotations

import json
import sys

from . import lean
from .loop import run_loop
from .target import Target, create

STATEMENTS = lean.ROOT / "bench" / "statements"
OUT = lean.ROOT / "docs" / "evidence" / "calibration.json"
EXPECTED = {"CalFalse": "refutation-claimed"}


def main(argv: list[str]) -> int:
    names = argv or sorted(p.stem for p in STATEMENTS.glob("*.lean"))
    results = json.loads(OUT.read_text())["results"] if OUT.exists() else {}
    for name in names:
        target = Target(name)
        if not target.exists():
            create(name, STATEMENTS / f"{name}.lean")
        final = run_loop(target, max_iterations=6, worker_minutes=40)
        expected = EXPECTED.get(name, "proved")
        results[name] = {"theorems": target.theorems(), "expected": expected, "outcome": final["status"],
                         "as_expected": final["status"] == expected, "iterations": final.get("iterations"),
                         "minutes": final.get("minutes"), "cost_usd": final.get("cost_usd")}
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(json.dumps({"lean": "4.36.0", "mathlib": "v4.36.0", "results": results}, indent=1) + "\n")
        print(json.dumps({name: results[name]}), flush=True)
    return 0 if all(r["as_expected"] for r in results.values()) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
