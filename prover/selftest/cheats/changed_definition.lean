import Mathlib

namespace Smoke

def tri (n : ℕ) : ℕ := n * (n + 1) / 2

theorem tri_formula (n : ℕ) : 2 * tri n = n * (n + 1) := by
  unfold tri
  exact Nat.mul_div_cancel' (Nat.even_mul_succ_self n).two_dvd

end Smoke
