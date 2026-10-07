import copy
import json

import pytest

from agent.notes import build_prompt, review_paper, review_result, summary

NODE = {"label": "lem:key", "kind": "lemma", "title": "Key bound", "section": "2", "deps": [],
        "statement": "For every $b\\ge 2$ we have $N(b)\\le \\log b$.",
        "proof": "Apply the greedy algorithm.\n  Each step halves\n the numerator, so $k\\le \\log_2 b$."}


def reply(*checks, role="Bounds the length from above."):
    return json.dumps({"role": role, "checks": list(checks)})


def check(quote, point="Check the halving claim."):
    return {"point": point, "quote": quote}


def fixed(text):
    return lambda prompt: text


def test_prompt_contains_statement_and_proof():
    prompt = build_prompt(NODE)
    assert NODE["statement"] in prompt and NODE["proof"] in prompt
    assert "lem:key" in prompt and "JSON only" in prompt


def test_grounded_check_is_kept():
    note = review_result(NODE, fixed(reply(check("Apply the greedy algorithm."), check("$N(b)\\le \\log b$"))))
    assert note["label"] == "lem:key" and note["role"] == "Bounds the length from above."
    assert [c["quote"] for c in note["checks"]] == ["Apply the greedy algorithm.", "$N(b)\\le \\log b$"]
    assert note["rejected"] == 0


def test_invented_quote_is_rejected_and_counted():
    note = review_result(NODE, fixed(reply(check("by induction on $b$"), check("Apply the greedy algorithm."))))
    assert [c["quote"] for c in note["checks"]] == ["Apply the greedy algorithm."]
    assert note["rejected"] == 1


def test_matching_tolerates_whitespace():
    note = review_result(NODE, fixed(reply(check("Each  step halves the\nnumerator, so"))))
    assert len(note["checks"]) == 1 and note["rejected"] == 0


def test_quote_may_not_span_statement_and_proof_without_the_text_between():
    note = review_result(NODE, fixed(reply(check("$N(b)\\le \\log b$. Each step"))))
    assert note["checks"] == [] and note["rejected"] == 1


def test_at_most_three_checks_are_considered():
    note = review_result(NODE, fixed(reply(*[check("Apply the greedy algorithm.")] * 5)))
    assert len(note["checks"]) == 3 and note["rejected"] == 0


@pytest.mark.parametrize("raw", [
    "not json", None, "[]", json.dumps({"checks": []}), json.dumps({"role": "  ", "checks": []}),
    json.dumps({"role": "r"}), json.dumps({"role": "r", "checks": "x"}), json.dumps({"role": "r", "checks": ["x"]}),
    json.dumps({"role": "r", "checks": [{"point": "p"}]}), json.dumps({"role": "r", "checks": [{"point": "", "quote": "q"}]}),
    json.dumps({"role": "r", "checks": [{"point": "p", "quote": 3}]}),
])
def test_malformed_output_raises(raw):
    with pytest.raises(ValueError):
        review_result(NODE, fixed(raw))


def test_inputs_are_not_mutated():
    before = copy.deepcopy(NODE)
    review_result(NODE, fixed(reply(check("Apply the greedy algorithm."))))
    assert NODE == before


def test_review_paper_records_an_error_for_one_failing_result():
    nodes = [{**NODE, "label": f"lem:{name}"} for name in ("a", "b", "c", "d")]

    def model(prompt):
        if "lem:b" in prompt:
            raise RuntimeError("upstream timeout")
        if "lem:c" in prompt:
            return "garbage"
        return reply(check("Apply the greedy algorithm."), check("made up"))

    notes = review_paper({"nodes": nodes, "flow": []}, model, max_workers=3)
    assert list(notes) == ["lem:a", "lem:b", "lem:c", "lem:d"]
    assert notes["lem:b"] == {"label": "lem:b", "error": "RuntimeError: upstream timeout"}
    assert notes["lem:c"]["label"] == "lem:c" and "did not return JSON" in notes["lem:c"]["error"]
    assert len(notes["lem:a"]["checks"]) == 1 and notes["lem:d"]["rejected"] == 1
    assert summary(notes) == "results reviewed 2; results with errors 2; grounded checks 2; rejected checks 2"


def test_review_paper_handles_an_empty_map():
    assert review_paper({"nodes": [], "flow": []}, fixed(reply())) == {}


def test_unescaped_latex_backslashes_are_repaired():
    raw = '{"role": "r", "checks": [{"point": "p", "quote": "$N(b)\\le \\log b$"}, {"point": "p", "quote": "$k\\\\le \\\\log_2 b$"}]}'
    assert "\\le \\log b" in raw and "\\\\log_2" in raw  # one reply mixing unescaped and correctly escaped LaTeX
    note = review_result(NODE, fixed(raw))
    assert note["role"] == "r" and len(note["checks"]) == 2 and note["rejected"] == 0


def test_latex_commands_that_look_like_json_escapes_survive():
    node = {**NODE, "proof": "so $\\frac{a}{b}\\to 0$ and $\\beta\\neq\\rho$."}
    raw = '{"role": "r", "checks": [{"point": "p", "quote": "$\\frac{a}{b}\\to 0$ and $\\beta\\neq\\rho$"}]}'
    assert review_result(node, fixed(raw))["rejected"] == 0


def test_terminal_colour_codes_are_stripped_from_prose_but_quotes_are_untouched():
    quote = "Each step halves\n the numerator"
    note = review_result(NODE, fixed(reply(check(quote, point="Check \x1b[0mk\x1b[0m here."), role="\x1b[1mBounds\x1b[0m it.")))
    assert note["role"] == "Bounds it." and note["checks"] == [{"point": "Check k here.", "quote": quote}]
