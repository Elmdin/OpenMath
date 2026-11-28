# Erdos282Fibonacci: working notes

This file is the prover's memory between iterations. Keep it short and true.

## Plan
Invariant `Inv A x`: 0 < x < 1 and every natural m with 1/x ≤ m lies in A.
Under it, the sInf in the definition is n = ⌈1/x⌉₊ (`sInf_eq`).
Step (`step`): rem = x - 1/n is either 0, or `Inv (A \ {n}) rem` holds and rem.num < x.num.
- rem*n = n*x - 1 < x < 1 (since (n-1)x < 1), so any m with 1/rem ≤ m has m > n, hence m ≠ n,
  and m ≥ 1/x because rem < x.
- rem = (x.num*n - x.den)/(x.den*n), so rem.num divides x.num*n - x.den, which is < x.num.
Once the remainder is 0 the function is 0 forever (`rem_zero`).
`main_aux`: induction on k: Inv A x and x.num ≤ k+1 imply value 0 for all t ≥ k.
Main theorem: take k = x.num.toNat, A = univ.

## Proved so far
Checked: `rem_zero`, `sInf_eq`, `step`, `main_aux`, and the main theorem all compile in
`Solution.lean` — `prover check` reports 0 errors, 0 sorries. `prover judge` printed ACCEPTED (iteration 1).

## Dead ends
None.

## Open holes
None.
