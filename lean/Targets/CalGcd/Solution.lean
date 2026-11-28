import Mathlib

/-- IMO 1959, problem 1: the fraction (21n+4)/(14n+3) is irreducible for every natural n. -/
theorem imo1959_p1 (n : ℕ) : Nat.gcd (21 * n + 4) (14 * n + 3) = 1 := by
  have h1 : Nat.gcd (21 * n + 4) (14 * n + 3) ∣ 2 * (21 * n + 4) :=
    Dvd.dvd.mul_left (Nat.gcd_dvd_left _ _) 2
  have h2 : Nat.gcd (21 * n + 4) (14 * n + 3) ∣ 2 * (21 * n + 4) + 1 := by
    have h3 : 2 * (21 * n + 4) + 1 = 3 * (14 * n + 3) := by ring
    rw [h3]
    exact Dvd.dvd.mul_left (Nat.gcd_dvd_right _ _) 3
  exact Nat.dvd_one.mp ((Nat.dvd_add_right h1).mp h2)
