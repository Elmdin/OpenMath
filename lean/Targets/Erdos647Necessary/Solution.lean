import Mathlib

/-!
Erdős problem 647 asks whether some n > 24 has max_{m < n} (m + τ(m)) ≤ n + 2.
The open statement, copied from google-deepmind/formal-conjectures
(`FormalConjectures/ErdosProblems/647.lean`, commit 9097e2f), is

  theorem erdos_647 : ∃ n > 24, ⨆ m : Fin n, m + σ 0 m ≤ n + 2

This file does NOT state that problem. It states a necessary condition on any such n:
it must be a multiple of 2520. The hypothesis `h` is the body of the open statement.
-/

namespace Erdos647

open ArithmeticFunction.sigma

/-- Sanity checks: 24 satisfies the hypothesis, 25 does not. -/
example : ⨆ m : Fin 24, (m : ℕ) + σ 0 m ≤ 24 + 2 := ciSup_le <| by decide
example : ¬ ⨆ m : Fin 25, (m : ℕ) + σ 0 m ≤ 25 + 2 := by
  intro h; exact absurd ((le_ciSup (Finite.bddAbove_range _) (⟨24, by omega⟩ : Fin 25)).trans h) (by decide)

/-- Any solution to Erdős 647 is divisible by 2520. -/
theorem witness_dvd (n : ℕ) (hn : 24 < n) (h : ⨆ m : Fin n, (m : ℕ) + σ 0 m ≤ n + 2) :
    2520 ∣ n := by
  sorry

end Erdos647
