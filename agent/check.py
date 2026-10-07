"""Exact-arithmetic check that a list of denominators is an Egyptian-fraction expansion of a/b.

Mirrors IsExpansion in data/family-025/ShortEgyptianFractions.lean: distinct n >= 2 summing to a/b.
"""
from dataclasses import dataclass
from fractions import Fraction


@dataclass(frozen=True)
class CheckResult:
    ok: bool
    failures: tuple[str, ...]


def check_expansion(a: int, b: int, denominators: list[int]) -> CheckResult:
    failures = []
    if not (1 <= a < b):
        failures.append(f"need 1 <= a < b, got a={a}, b={b}")
    if any(n < 2 for n in denominators):
        failures.append("every denominator must be at least 2")
    if len(set(denominators)) != len(denominators):
        failures.append("denominators must be distinct")
    if not failures:
        total = sum((Fraction(1, n) for n in denominators), Fraction(0))
        if total != Fraction(a, b):
            failures.append(f"sum is {total}, expected {Fraction(a, b)}")
    return CheckResult(ok=not failures, failures=tuple(failures))
