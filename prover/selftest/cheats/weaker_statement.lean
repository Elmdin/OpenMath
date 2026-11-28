import Mathlib

namespace Smoke

def tri (n : ℕ) : ℕ := ∑ i ∈ Finset.range (n + 1), i

theorem tri_formula (n : ℕ) (h : n = 0) : 2 * tri n = n * (n + 1) := by
  subst h; simp [tri]

end Smoke
