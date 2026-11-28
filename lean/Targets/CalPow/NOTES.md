# CalPow: working notes

## Plan
2^n mod 7 is always 1, 2 or 4 (induction on n: doubling maps 1→2→4→1 mod 7).
So 2^n + 1 mod 7 is 2, 3 or 5, never 0.

## Proved so far
`imo1964_p1b` in Solution.lean: induction for the residue fact, then `omega`.
Checked: `prover check` reports 0 errors, 0 sorries; `prover judge CalPow` printed ACCEPTED (iteration 1).

## Dead ends
None.

## Open holes
None.
