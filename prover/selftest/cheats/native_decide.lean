import Mathlib

namespace Smoke

def tri (n : ℕ) : ℕ := ∑ i ∈ Finset.range (n + 1), i

theorem tri_formula (n : ℕ) : 2 * tri n = n * (n + 1) := by
  have h3 : 2 * tri 3 = 12 := by native_decide
  unfold tri
  induction n with
  | zero => simp
  | succ k ih => rw [Finset.sum_range_succ, mul_add, ih]; ring

end Smoke
