# Erdos697DeltaLt: working notes

## Plan (implemented)
- The admissible d (d ≡ 1 mod m, 1 < d < exp(m^α)) form a finite set D (`finite_D`), so
  S = {n | ∃ d ∈ D, d ∣ n}, which is periodic with period L = ∏ D > 0.
- Periodic predicate: count p (qL + r) = q·count p L + count p r (`count_period`), hence
  count p b / b → count p L / L (`tendsto_periodic`, error ≤ L/b). Gives `density_exists`.
- Bound: count p L ≤ Σ_{d∈D} L/d (union bound, `count_dvd_le`), so δ ≤ Σ 1/d.
  D ⊆ {km+1 : 1 ≤ k ≤ K}, K = ⌊e^{m^α}/m⌋; Σ 1/(km+1) < H_K/m ≤ (1+log K)/m ≤ (1+m^α)/m
  (`harm_bound`, uses `harmonic_le_one_add_log`).
- `delta_lt`: δ = c by `tendsto_nhds_unique`.

## Status (checked)
Solution.lean compiles with no sorry; `python3 -m prover judge Erdos697DeltaLt` printed
ACCEPTED for both theorems.

## Open holes
None.
