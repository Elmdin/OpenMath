import pytest

from agent.check import check_expansion
from agent.explore import shortest_expansion, worst_case_table


@pytest.mark.parametrize("a,b,length", [(1, 2, 1), (3, 4, 2), (2, 3, 2), (4, 5, 3), (5, 181, 3)])
def test_known_shortest_lengths(a, b, length):
    ns = shortest_expansion(a, b)
    assert len(ns) == length
    assert check_expansion(a, b, ns).ok


def test_unreduced_fraction_uses_its_value():
    assert shortest_expansion(2, 4) == [2]


def test_rejects_out_of_range():
    with pytest.raises(ValueError):
        shortest_expansion(3, 3)


def test_gives_up_explicitly_when_cap_is_too_small():
    with pytest.raises(ValueError):
        shortest_expansion(4, 5, max_terms=2)


def test_worst_case_table_rows_are_checked():
    rows = worst_case_table(2, 12)
    assert [r["b"] for r in rows] == list(range(2, 13))
    assert rows[0] == {"b": 2, "worst": 1, "witness_a": 1, "expansion": [2], "cases": 1}
    assert next(r for r in rows if r["b"] == 5)["worst"] == 3
    for r in rows:
        assert check_expansion(r["witness_a"], r["b"], r["expansion"]).ok
