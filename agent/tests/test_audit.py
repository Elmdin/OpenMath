import json
from pathlib import Path

import pytest

from agent.audit import DEFECTS, audit, build_prompt, run_eval, seeded_variants

LEAN = (Path(__file__).resolve().parents[2] / "data" / "family-025" / "ShortEgyptianFractions.lean").read_text()
CLAIM = "for every integer $b\\ge b_0$, $c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b$."


def reply(*flags):
    return json.dumps({"flags": list(flags)})


def flag(lean_quote, paper_quote="b\\ge b_0", severity="mismatch"):
    return {"severity": severity, "summary": "s", "paper_quote": paper_quote, "lean_quote": lean_quote}


def test_every_defect_changes_the_statement():
    variants = seeded_variants(LEAN)
    assert len(variants) == len(DEFECTS) == 6
    assert all(v["lean"] != LEAN for v in variants)
    assert len({v["lean"] for v in variants}) == 6


def test_seeding_fails_loudly_if_source_drifts():
    with pytest.raises(ValueError):
        seeded_variants("theorem other : True := by trivial")


def test_prompt_contains_both_sides():
    prompt = build_prompt(CLAIM, LEAN)
    assert CLAIM in prompt and "theorem main" in prompt


def test_flags_with_real_quotes_are_kept():
    result = audit(CLAIM, LEAN, lambda _: reply(flag("b₀ ≤ b")))
    assert len(result["flags"]) == 1 and result["rejected"] == []


def test_quotes_tolerate_whitespace_differences():
    result = audit(CLAIM, LEAN, lambda _: reply(flag("∀ a b : ℕ,   1 ≤ a →\n a < b")))
    assert len(result["flags"]) == 1


def test_flag_with_invented_quote_is_rejected_not_dropped():
    result = audit(CLAIM, LEAN, lambda _: reply(flag("b₀ ≤ b"), flag("∀ b, True"), flag("b₀ ≤ b", paper_quote="not in paper")))
    assert len(result["flags"]) == 1
    assert len(result["rejected"]) == 2


@pytest.mark.parametrize("bad", ["not json", json.dumps({"nope": 1}), json.dumps({"flags": [{"severity": "mismatch"}]}),
                                 json.dumps({"flags": [flag("b₀ ≤ b", severity="shrug")]})])
def test_malformed_model_output_raises(bad):
    with pytest.raises(ValueError):
        audit(CLAIM, LEAN, lambda _: bad)


def test_eval_counts_caught_defects_and_false_flags():
    def model(prompt):  # flags a mismatch only when the bound became log b
        return reply(flag("≤ c₂ * Real.log (b : ℝ)")) if "≤ c₂ * Real.log (b : ℝ)" in prompt else reply(flag("2 ≤ b₀", severity="note"))

    report = run_eval(CLAIM, LEAN, model)
    assert report["caught"] == 1 and report["total"] == 4
    assert report["controls"] == 3 and report["controls_clean"] == 3
    assert report["false_flag_on_original"] is False
    assert [r["caught"] for r in report["results"] if r["id"] == "log_upper"] == [True]


def test_mismatch_on_equivalent_control_counts_against_the_auditor():
    report = run_eval(CLAIM, LEAN, lambda prompt: reply(flag("1 ≤ n")) if "1 ≤ n)" in prompt else reply())
    assert report["caught"] == 0
    assert report["controls_clean"] == 2 and report["false_flag_on_original"] is False


def test_paper_quote_may_omit_math_delimiters():
    result = audit(CLAIM, LEAN, lambda _: reply(flag("b₀ ≤ b", paper_quote="for every integer b\\ge b_0")))
    assert len(result["flags"]) == 1 and result["rejected"] == []


def test_unescaped_latex_backslashes_in_reply_are_repaired():
    raw = '{"flags": [{"severity": "note", "summary": "uses \\log and \\nu", "paper_quote": "b\\ge b_0", "lean_quote": "b₀ ≤ b →\\n        c₁"}]}'
    result = audit(CLAIM, LEAN, lambda _: raw)
    assert len(result["flags"]) == 1 and result["rejected"] == []
    assert result["flags"][0]["summary"] == "uses \\log and \\nu"


def test_reply_mixing_escaped_and_unescaped_backslashes_is_repaired():
    from agent.audit import _loads
    raw = '{"a": "ok \\\\(x\\\\) and bare \\(y\\) and \\frac"}'
    assert _loads(raw) == {"a": "ok \\(x\\) and bare \\(y\\) and \\frac"}
