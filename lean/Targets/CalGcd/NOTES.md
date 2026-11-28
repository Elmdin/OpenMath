# CalGcd: working notes

This file is the prover's memory between iterations. Keep it short and true.

## Plan
Key identity: 3*(14n+3) = 2*(21n+4) + 1. Let g = gcd. g ∣ 2*(21n+4) and g ∣ 3*(14n+3)
= 2*(21n+4)+1, so g ∣ 1 (Nat.dvd_add_right), hence g = 1 (Nat.dvd_one).

## Proved so far
`imo1959_p1` in Solution.lean: `check` reports 0 errors, 0 sorry (iteration 1).

## Dead ends
None.

## Open holes
None.
