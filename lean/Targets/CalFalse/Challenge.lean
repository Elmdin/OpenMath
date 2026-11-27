import Mathlib

/-- Deliberately false (it fails at n = 40). The loop should refute it, not prove it. -/
theorem euler_polynomial_prime (n : ℕ) : Nat.Prime (n ^ 2 + n + 41) := by
  sorry
