from agent.check import check_expansion


def test_paper_example_passes():
    result = check_expansion(5, 181, [39, 507, 91767])
    assert result.ok
    assert result.failures == ()


def test_wrong_sum_fails():
    result = check_expansion(5, 181, [39, 507])
    assert not result.ok
    assert any("sum" in f for f in result.failures)


def test_repeated_denominator_fails():
    result = check_expansion(1, 1, [2, 2])
    assert not result.ok
    assert any("distinct" in f for f in result.failures)


def test_denominator_below_two_fails():
    result = check_expansion(1, 1, [1])
    assert not result.ok


def test_rejects_out_of_range_fraction():
    result = check_expansion(7, 3, [2])
    assert not result.ok
    assert any("a < b" in f for f in result.failures)
