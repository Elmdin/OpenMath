"""Small-case explorer: exact shortest Egyptian-fraction expansions by exhaustive search.

Computes maxMinLength(b) from the Lean statement for small b, so a reader can see the quantity
the theorem is about. Small cases illustrate the theorem; they are not evidence for it, since
the theorem only speaks about b beyond an unspecified threshold.
"""
import json
import math
import sys


def _search(p, q, terms, lowest):
    """Denominators >= lowest, strictly increasing, exactly `terms` of them, summing to p/q."""
    if terms == 1:
        return [q // p] if q % p == 0 and q // p >= lowest else None
    start = max(lowest, q // p + 1)  # 1/n must be strictly less than p/q
    stop = terms * q // p  # the largest term is at least the average
    for n in range(start, stop + 1):
        np_, nq = p * n - q, q * n
        g = math.gcd(np_, nq)
        rest = _search(np_ // g, nq // g, terms - 1, n + 1)
        if rest is not None:
            return [n] + rest
    return None


def shortest_expansion(a, b, max_terms=6):
    if not (1 <= a < b):
        raise ValueError(f"need 1 <= a < b, got a={a}, b={b}")
    g = math.gcd(a, b)
    for terms in range(1, max_terms + 1):
        found = _search(a // g, b // g, terms, 2)
        if found is not None:
            return found
    raise ValueError(f"no expansion of {a}/{b} with at most {max_terms} terms")


def worst_case_table(b_min, b_max, max_terms=6):
    rows = []
    for b in range(b_min, b_max + 1):
        worst_a, worst = 1, shortest_expansion(1, b, max_terms)
        for a in range(2, b):
            found = shortest_expansion(a, b, max_terms)
            if len(found) > len(worst):
                worst_a, worst = a, found
        rows.append({"b": b, "worst": len(worst), "witness_a": worst_a, "expansion": worst, "cases": b - 1})
    return rows


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -m agent.explore <b_max>")
    json.dump(worst_case_table(2, int(sys.argv[1])), sys.stdout)
