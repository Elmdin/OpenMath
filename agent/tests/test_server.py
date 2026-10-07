from pathlib import Path

import pytest

from agent.card import build_card
from agent.server import MAX_QUESTION, RateLimit, build_prompt, parse_check, parse_drawing, parse_spec

CARD = build_card(Path(__file__).resolve().parents[2] / "data" / "family-025", "thm:main",
                  {"a": 5, "b": 181, "denominators": [39, 507, 91767]})


def test_prompt_carries_the_step_and_the_question():
    prompt = build_prompt(CARD, "lem:greedy", "  Why is this needed?  ")
    assert "Lemma lem:greedy (Preparing the denominator)" in prompt
    assert "Question: Why is this needed?" in prompt
    assert "greedy steps" in prompt


def test_long_proofs_are_truncated():
    prompt = build_prompt(CARD, "prop:density", "Explain")
    assert "[proof truncated]" in prompt and len(prompt) < 12_000


@pytest.mark.parametrize("label,question", [("nope", "x"), (None, "x"), ("thm:main", ""), ("thm:main", "   "),
                                            ("thm:main", None), ("thm:main", "x" * (MAX_QUESTION + 1))])
def test_bad_requests_are_rejected(label, question):
    with pytest.raises(ValueError):
        build_prompt(CARD, label, question)


def test_test_mode_asks_for_a_script_and_its_real_output():
    prompt = build_prompt(CARD, "lem:greedy", "Test this step on small cases.", mode="test")
    assert "RUN it in your sandbox" in prompt and "do not invent output" in prompt
    assert "greedy steps" in prompt


def test_unknown_mode_is_rejected():
    with pytest.raises(ValueError):
        build_prompt(CARD, "lem:greedy", "x", mode="prove")


def test_picture_spec_is_validated():
    spec = parse_spec('Sure: {"picture": "greedy", "a": 5, "b": 121, "caption": " Watch the denominators. "}')
    assert spec == {"picture": "greedy", "a": 5, "b": 121, "caption": "Watch the denominators."}


@pytest.mark.parametrize("raw", ['no json', '{"picture": "movie", "a": 1, "b": 2, "caption": "x"}',
                                 '{"picture": "greedy", "a": 5, "b": 5, "caption": "x"}',
                                 '{"picture": "greedy", "a": 5, "b": 999, "caption": "x"}',
                                 '{"picture": "greedy", "a": "5", "b": 9, "caption": "x"}',
                                 '{"picture": "shortest", "a": 1, "b": 2, "caption": ""}'])
def test_bad_picture_specs_are_rejected(raw):
    with pytest.raises(ValueError):
        parse_spec(raw)


def test_show_mode_lists_the_picture_library():
    prompt = build_prompt(CARD, "lem:greedy", "Show me.", mode="show")
    assert '"shortest"' in prompt and '"greedy"' in prompt and '"none"' in prompt


def test_drawing_is_extracted_with_caption():
    out = parse_drawing('CAPTION: Bars grow slowly.\nSVG:\n<svg viewBox="0 0 640 380"><rect width="640" height="380" fill="#fff"/></svg>\nthanks')
    assert out["caption"] == "Bars grow slowly."
    assert out["svg"].startswith('<svg xmlns="http://www.w3.org/2000/svg"') and out["svg"].endswith("</svg>")


@pytest.mark.parametrize("raw", ["FAILED: no sandbox", "<svg><script>alert(1)</script></svg>", '<svg onload="x()"></svg>',
                                 '<svg><image href="http://x/y.png"/></svg>', '<svg><a href="javascript:x">t</a></svg>',
                                 '<svg><rect fill="url(http://x/y)"/></svg>',
                                 "<svg>" + "x" * 70_000 + "</svg>"])
def test_unsafe_or_missing_drawings_are_rejected(raw):
    with pytest.raises(ValueError):
        parse_drawing(raw)


def test_draw_mode_asks_for_computed_svg_and_allows_3d():
    prompt = build_prompt(CARD, "thm:main", "Draw the number of terms for every a/b.", mode="draw")
    assert "isometric projection" in prompt and "Request: Draw the number of terms" in prompt


def test_drawings_may_use_internal_references_and_styles():
    out = parse_drawing('<svg><defs><linearGradient id="g"/></defs><style>text{fill:#222}</style><rect fill="url(#g)"/><use href="#g"/></svg>')
    assert "url(#g)" in out["svg"]


def test_check_keeps_only_steps_quoted_from_the_proof():
    proof = "Subtracting 1/z leaves A'/C'. Thus the numerator never exceeds a."
    raw = ('{"steps": [{"claim": "c1", "verdict": "follows", "why": "w", "quote": "Subtracting 1/z  leaves"},'
           '{"claim": "c2", "verdict": "gap", "why": "w", "quote": "not in the proof"}], "overall": "ok"}')
    review = parse_check(raw, proof)
    assert [s["claim"] for s in review["steps"]] == ["c1"] and review["dropped"] == 1 and review["overall"] == "ok"


@pytest.mark.parametrize("raw", ["nope", '{"steps": []}', '{"steps": [{"claim": "c", "verdict": "fine", "why": "w", "quote": "q"}]}'])
def test_bad_checks_are_rejected(raw):
    with pytest.raises(ValueError):
        parse_check(raw, "q")


def test_rate_limit_caps_total_and_per_client_and_recovers():
    now = [0.0]
    limit = RateLimit(per_minute=3, per_client_minute=2, clock=lambda: now[0])
    assert limit.allow("a") and limit.allow("a")
    assert not limit.allow("a")          # per-client cap
    assert limit.allow("b")
    assert not limit.allow("c")          # global cap
    now[0] = 61.0
    assert limit.allow("a")              # window has passed
