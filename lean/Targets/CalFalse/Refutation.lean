import Mathlib

/-- The locked statement `euler_polynomial_prime` is false: at `n = 40`,
`40 ^ 2 + 40 + 41 = 1681 = 41 * 41`. -/
theorem euler_polynomial_prime_false : ¬ ∀ n : ℕ, Nat.Prime (n ^ 2 + n + 41) := by
  intro h
  have h40 : Nat.Prime 1681 := h 40
  have hd : (41 : ℕ) ∣ 1681 := ⟨41, by norm_num⟩
  rcases (Nat.dvd_prime h40).mp hd with h1 | h1 <;> omega
