import Mathlib

/-- IMO 1964, problem 1(b): 2^n + 1 is never divisible by 7. -/
theorem imo1964_p1b (n : ℕ) : ¬ 7 ∣ 2 ^ n + 1 := by
  have h : 2 ^ n % 7 = 1 ∨ 2 ^ n % 7 = 2 ∨ 2 ^ n % 7 = 4 := by
    induction n with
    | zero => simp
    | succ k ih => rw [pow_succ]; omega
  omega
