"""Fast tests for the parts of the harness that need no Lean process."""
import json

from prover import auto, lean
from prover.judge import lint, check_locks
from prover.target import Target, qualified_theorems, create
import prover.target as target_mod


def test_instrument_marks_tactic_and_term_holes():
    src = "theorem t : P := by\n  have h : Q := sorry\n  sorry\n"
    out, holes = auto.instrument(src)
    assert out.startswith("import OpenMath.Auto\n")
    assert [h.term_position for h in holes] == [True, False]
    assert "have h : Q := (by om_auto)" in out and "\n  om_auto\n" in out
    assert out.split("\n")[2][holes[0].new_column:].startswith("om_auto")


def test_instrument_ignores_comments_and_identifiers():
    src = "-- sorry about this\n/- sorry\n sorry -/\ndef sorry_count := 1\ntheorem t : P := by\n  sorry\n"
    _, holes = auto.instrument(src)
    assert [(h.line, h.column) for h in holes] == [(6, 2)]


def test_case_arm_is_a_tactic_hole_but_fun_body_is_a_term():
    _, holes = auto.instrument("  | zero => sorry\n  exact fun x => sorry\n")
    assert [h.term_position for h in holes] == [False, True]


def test_apply_results_rewrites_only_closed_holes():
    src = "theorem t : P := by\n  have h : Q := sorry\n  sorry\n"
    _, holes = auto.instrument(src)
    holes[0].closed_by = "omega"
    assert auto.apply_results(src, holes) == "theorem t : P := by\n  have h : Q := (by omega)\n  sorry\n"


def test_two_holes_on_one_line_keep_their_columns():
    src = "  exact ⟨sorry, sorry⟩\n"
    out, holes = auto.instrument(src)
    row = out.split("\n")[1]
    assert all(row[h.new_column:].startswith("om_auto") for h in holes)
    holes[1].closed_by = "simp"
    assert auto.apply_results(src, holes) == "  exact ⟨sorry, (by simp)⟩\n"


def test_exact_suggestion_is_cleaned():
    assert auto.clean_tactic(" [apply] exact Nat.le_of_lt\n   h") == "exact Nat.le_of_lt h"


def test_qualified_theorem_names_follow_namespaces():
    src = "namespace A\nnamespace B\ntheorem x : P := by sorry\nend B\nlemma y (n : ℕ) : Q := by sorry\nend A\ntheorem z : R := sorry\n"
    assert qualified_theorems(src) == ["A.B.x", "A.y", "z"]


def test_diagnostics_are_classified():
    lines = [
        {"severity": "warning", "pos": {"line": 3, "column": 8}, "data": "declaration uses `sorry`"},
        {"severity": "error", "pos": {"line": 4, "column": 2}, "data": "unsolved goals\n⊢ False"},
        {"severity": "information", "pos": {"line": 5, "column": 0}, "data": "'foo' depends on axioms: [propext, sorryAx]"},
        {"severity": "information", "pos": {"line": 6, "column": 0}, "data": "'bar' does not depend on any axioms"},
    ]
    result = lean.classify("f.lean", lean.parse_diagnostics("\n".join(json.dumps(x) for x in lines)), 1)
    assert not result.ok and not result.complete
    assert len(result.errors) == 1 and len(result.sorries) == 1
    assert result.axioms == {"foo": ["propext", "sorryAx"], "bar": []}


def make_target(tmp_path, monkeypatch, solution: str) -> Target:
    tmp_path.mkdir(parents=True, exist_ok=True)
    monkeypatch.setattr(target_mod, "TARGETS_DIR", tmp_path)
    stmt = tmp_path / "s.lean"
    stmt.write_text("import Mathlib\ntheorem t : 1 = 1 := by\n  sorry\n")
    t = create("Demo", stmt)
    t.solution.write_text(solution)
    return t


def test_lint_flags_each_shortcut(tmp_path, monkeypatch):
    bad = {
        "import Mathlib\ntheorem t : 1 = 1 := by sorry\n": "sorry",
        "import Mathlib\naxiom a : 1 = 1\ntheorem t : 1 = 1 := a\n": "axiom",
        "import Mathlib\ntheorem t : 1 = 1 := by native_decide\n": "native",
        "import Mathlib\nset_option debug.skipKernelTC true\ntheorem t : 1 = 1 := rfl\n": "kernel",
        "import OpenMath.Auto\ntheorem t : 1 = 1 := rfl\n": "import",
        "import Targets.Demo.Challenge\ntheorem t' : 1 = 1 := rfl\n": "import",
    }
    for i, (src, word) in enumerate(bad.items()):
        t = make_target(tmp_path / str(i), monkeypatch, src)
        problems = lint(t)
        assert problems and any(word in p for p in problems), (src, problems)


def test_lint_passes_a_clean_file_and_ignores_comments(tmp_path, monkeypatch):
    t = make_target(tmp_path, monkeypatch, "import Mathlib\n-- no sorry here, no axiom either\ntheorem t : 1 = 1 := rfl\n")
    assert lint(t) == []


def test_locks_detect_a_changed_challenge_and_loosened_axioms(tmp_path, monkeypatch):
    t = make_target(tmp_path, monkeypatch, "import Mathlib\ntheorem t : 1 = 1 := rfl\n")
    hashes = t.lock_hashes()
    assert check_locks(t, hashes) == []
    t.challenge.write_text("import Mathlib\ntheorem t : True := by\n  sorry\n")
    assert any("Challenge.lean was modified" in p for p in check_locks(t, hashes))
    cfg = json.loads(t.config.read_text())
    cfg["permitted_axioms"].append("sorryAx")
    t.config.write_text(json.dumps(cfg))
    assert any("permits axioms" in p for p in check_locks(t, t.lock_hashes()))


def test_theorems_mentioned_in_comments_are_not_targets():
    src = "/-!\n  theorem fake : P := by sorry\n-/\nnamespace A\n-- theorem also_fake : Q\ntheorem real : R := by sorry\nend A\n"
    assert qualified_theorems(src) == ["A.real"]
