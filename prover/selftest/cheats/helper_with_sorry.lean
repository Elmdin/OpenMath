import Mathlib

namespace Smoke

def tri (n : ℕ) : ℕ := ∑ i ∈ Finset.range (n + 1), i

lemma step (k : ℕ) : 2 * tri (k + 1) = 2 * tri k + 2 * (k + 1) := by
  sorry

theorem tri_formula (n : ℕ) : 2 * tri n = n * (n + 1) := by
  induction n with
  | zero => simp [tri]
  | succ k ih => rw [step, ih]; ring

end Smoke
