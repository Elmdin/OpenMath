# CalNesbitt: working notes

This file is the prover's memory between iterations. Keep it short and true.

## Plan
Clear denominators (all of b+c, c+a, a+b are positive). The resulting polynomial
inequality is equivalent to
  (a+b)(a-b)^2 + (b+c)(b-c)^2 + (c+a)(c-a)^2 >= 0,
which is a sum of nonnegative terms.

Lean: `div_add_div` twice, `div_le_div_iff₀`, then `nlinarith` with the three
product hints above.

## Proved so far
- `nesbitt` in `Solution.lean`: checked, `prover check` reports 0 errors, 0 sorries.
- `prover judge CalNesbitt` (iteration 1) printed "ACCEPTED: kernel-checked against the
  locked statement" (run without --paranoid).

## Dead ends
None; the first attempt compiled.

## Open holes
None.
