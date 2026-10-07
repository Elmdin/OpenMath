from pathlib import Path

from agent.card import build_card

FAMILY_025 = Path(__file__).resolve().parents[2] / "data" / "family-025"


def test_family_025_card():
    card = build_card(FAMILY_025, root="thm:main", example={"a": 5, "b": 181, "denominators": [39, 507, 91767]})
    assert card["check"]["ok"] is True
    assert card["formal"]["theorem"].startswith("theorem main")
    assert "sorry" not in card["formal"]["theorem"]
    assert card["formal"]["permitted_axioms"] == ["propext", "Quot.sound", "Classical.choice"]
    assert card["formal"]["rebuilt_here"] is False
    assert card["spine"][0] == "thm:main" and len(card["spine"]) == 10
    assert len(card["map"]["nodes"]) == 19
    firsts = card["explore"]["firsts"]
    assert [(f["worst"], f["b"]) for f in firsts] == [(1, 2), (2, 3), (3, 5), (4, 11), (5, 17), (6, 79)]
    assert card["explore"]["cases"] == sum(range(1, 200))
    series = card["explore"]["series"]
    assert series[0] == [2, 1] and len(series) == 199 and max(w for _, w in series) == 6


def test_failing_example_is_reported_not_raised():
    card = build_card(FAMILY_025, root="thm:main", example={"a": 5, "b": 181, "denominators": [39]})
    assert card["check"]["ok"] is False
    assert card["check"]["failures"]
