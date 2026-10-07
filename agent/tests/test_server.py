from pathlib import Path

import pytest

from agent.card import build_card
from agent.server import MAX_QUESTION, build_prompt

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
