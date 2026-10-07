"""Assemble the deterministic part of a review card for one paper. No model is involved."""
import json
import math
import re
import sys
from pathlib import Path

from agent.check import check_expansion
from agent.explore import worst_case_table
from agent.proofmap import build_proof_map, load_tex, spine

_THEOREM = re.compile(r"^theorem .*?(?=\s*:=)", re.DOTALL | re.MULTILINE)


def _formal(paper_dir):
    lean_files = sorted(paper_dir.glob("*.lean"))
    if not lean_files:
        return None
    lean = lean_files[0].read_text(encoding="utf-8")
    match = _THEOREM.search(lean)
    if not match:
        raise ValueError(f"no theorem statement found in {lean_files[0]}")
    comparator = json.loads(lean_files[0].with_suffix(".json").read_text(encoding="utf-8"))
    return {
        "file": lean_files[0].name,
        "source": lean,
        "theorem": match.group(0),
        "solution_module": comparator["solution_module"],
        "permitted_axioms": comparator["permitted_axioms"],
        # We hold the statement only; the proof files are not in this repo, so we did not compile it.
        "rebuilt_here": False,
    }


def _explore(b_max):
    """First b at which the worst case reaches each length, from an exhaustive search up to b_max."""
    rows = worst_case_table(2, b_max)
    firsts = []
    for row in rows:
        if not firsts or row["worst"] > firsts[-1]["worst"]:
            firsts.append({**row, "loglog": round(math.log(math.log(row["b"])), 3) if row["b"] > 2 else None})
    return {"b_max": b_max, "cases": sum(row["cases"] for row in rows), "firsts": firsts}


def build_card(paper_dir, root, example, explore_b_max=200):
    paper_dir = Path(paper_dir)
    proof_map = build_proof_map(load_tex(paper_dir / "tex"))
    check = check_expansion(example["a"], example["b"], example["denominators"])
    return {
        "paper": paper_dir.name,
        "root": root,
        "map": proof_map,
        "spine": spine(proof_map, root),
        "formal": _formal(paper_dir),
        "check": {**example, "ok": check.ok, "failures": list(check.failures)},
        "explore": _explore(explore_b_max),
    }


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("usage: python -m agent.card <paper-dir> <out.js>")
    card = build_card(sys.argv[1], "thm:main", {"a": 5, "b": 181, "denominators": [39, 507, 91767]})
    Path(sys.argv[2]).write_text("window.CARD = " + json.dumps(card, indent=1) + ";\n", encoding="utf-8")
