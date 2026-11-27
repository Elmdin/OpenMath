# CalFibSubsets: working notes

## Plan
Let A(n) = sparse subsets of range n. A(n+2) = A(n+1) ∪ image (insert (n+1)) A(n), a disjoint
union (members of A(n+1) lack n+1), and insert (n+1) is injective on A(n). So
|A(n+2)| = |A(n+1)| + |A(n)|; two-step induction with bases n=0,1 by `decide`.

## Proved so far (checked: `prover check` reports 0 errors, 0 sorry)
- `step`: the set identity above.
- `card_step`: the cardinality recurrence.
- `card_sparse`: main theorem, via induction on the pair (P n ∧ P (n+1)).

## Dead ends
None.

## Open holes
None.

## Judge
`python3 -m prover judge CalFibSubsets` (iteration 1) printed: ACCEPTED: kernel-checked against the locked statement (without --paranoid).
