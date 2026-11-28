import Mathlib

/-- Nesbitt's inequality. -/
theorem nesbitt (a b c : ℝ) (ha : 0 < a) (hb : 0 < b) (hc : 0 < c) :
    3 / 2 ≤ a / (b + c) + b / (c + a) + c / (a + b) := by
  have h1 : 0 < b + c := by positivity
  have h2 : 0 < c + a := by positivity
  have h3 : 0 < a + b := by positivity
  rw [div_add_div _ _ h1.ne' h2.ne', div_add_div _ _ (mul_pos h1 h2).ne' h3.ne',
    div_le_div_iff₀ (by norm_num) (mul_pos (mul_pos h1 h2) h3)]
  nlinarith [mul_nonneg h3.le (sq_nonneg (a - b)), mul_nonneg h1.le (sq_nonneg (b - c)),
    mul_nonneg h2.le (sq_nonneg (c - a))]
