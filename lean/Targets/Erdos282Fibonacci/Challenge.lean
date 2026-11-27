import Mathlib

/-!
Erdős problem 282, the textbook variant: Fibonacci's greedy algorithm for Egyptian fractions
terminates for every rational in (0, 1).

Definition and statement copied from google-deepmind/formal-conjectures,
`FormalConjectures/ErdosProblems/282.lean` at commit f606af1 (27 Nov 2026), Apache-2.0.
Only the `@[category …]` attributes and the module header are dropped.
-/

open Filter Real

namespace Erdos282

noncomputable def greedyUnitFractionRem (A : Set ℕ) (x : ℚ) (t : ℕ) : ℚ :=
  if x ≤ 0 then 0 else
    let n := sInf { n | n ∈ A ∧ 1 / x ≤ n }
    let rem := x - 1 / n
    match t with
    | 0 => rem
    | t + 1 => greedyUnitFractionRem (A \ {n}) rem t

/-- Sanity checks on the definition, from the same source file. -/
example (n : ℕ) : greedyUnitFractionRem .univ (1 / n) 0 = 0 := by
  simp [greedyUnitFractionRem, Set.Ici_def]

example (n : ℕ) : greedyUnitFractionRem .univ (1 / n) 1 = 0 := by
  simp [greedyUnitFractionRem, Set.Ici_def]

/-- In 1202 Fibonacci observed that this process terminates for any $x$ when $A=\mathbb{N}$. -/
theorem erdos_282.variants.fibonacci {x : ℚ} (hx : x ∈ Set.Ioo 0 1) :
    greedyUnitFractionRem .univ x =ᶠ[atTop] 0 := by
  sorry

end Erdos282
