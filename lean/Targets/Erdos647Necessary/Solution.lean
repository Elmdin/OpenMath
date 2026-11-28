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


lemma sig0 (n : ℕ) : σ 0 n = n.divisors.card := by
  simp [ArithmeticFunction.sigma_zero_apply]

lemma leaf (m d e r j c : ℕ) (hm : 0 < m) (h1 : d ∣ m) (h2 : (m / d) % r = c)
    (h3 : Nat.gcd c r = 1) (h4 : d ∣ r ^ j) (h5 : e ∣ m / d) (h6 : m / d ≠ e) :
    σ 0 d * (σ 0 e + 1) ≤ σ 0 m := by
  obtain ⟨t, rfl⟩ := h1
  have hd : 0 < d := Nat.pos_of_ne_zero (by rintro rfl; simp at hm)
  have ht0 : 0 < t := Nat.pos_of_ne_zero (by rintro rfl; simp at hm)
  rw [Nat.mul_div_cancel_left _ hd] at h2 h5 h6
  have hcr : Nat.Coprime r t := by
    unfold Nat.Coprime
    rw [Nat.gcd_rec, h2, h3]
  have hc : Nat.Coprime d t := (hcr.pow_left j).coprime_dvd_left h4
  rw [(ArithmeticFunction.isMultiplicative_sigma).map_mul_of_coprime hc]
  apply Nat.mul_le_mul_left
  rw [sig0, sig0]
  apply Finset.card_lt_card
  rw [Finset.ssubset_iff_of_subset (Nat.divisors_subset_of_dvd ht0.ne' h5)]
  refine ⟨t, by simp [ht0.ne'], ?_⟩
  intro hmem
  have := Nat.le_of_dvd (Nat.pos_of_ne_zero (by rintro rfl; simp at hmem)) (Nat.dvd_of_mem_divisors hmem)
  have := Nat.le_of_dvd ht0 h5
  omega

lemma leafF (n k d e r j c : ℕ) (hk : k < n) (h1 : d ∣ n - k) (h2 : ((n - k) / d) % r = c)
    (h3 : Nat.gcd c r = 1) (h4 : d ∣ r ^ j) (h5 : e ∣ (n - k) / d) (h6 : (n - k) / d ≠ e)
    (hb : σ 0 (n - k) ≤ k + 2) (hlt : k + 2 < σ 0 d * (σ 0 e + 1)) : False := by
  have := leaf (n - k) d e r j c (by omega) h1 h2 h3 h4 h5 h6
  omega

set_option maxHeartbeats 2000000 in
lemma stage2 (n : ℕ) (hn : 24 < n) (hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2) :
    n % 2 = 0 := by
  by_contra hne
  rcases (by omega : n % 4 = 1 ∨ n % 4 = 3) with h|h
  · exact leafF n 1 1 4 1 6 0 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 1 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 1 2 1 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 1 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)

set_option maxHeartbeats 2000000 in
lemma stage4 (n : ℕ) (hn : 24 < n) (hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2) (hp : n % 2 = 0) :
    n % 4 = 0 := by
  by_contra hne
  rcases (by omega : n % 8 = 2 ∨ n % 8 = 6) with h|h
  · exact leafF n 2 1 8 1 6 0 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 2 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 2 4 1 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 2 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)

set_option maxHeartbeats 2000000 in
lemma stage8 (n : ℕ) (hn : 24 < n) (hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2) (hp : n % 4 = 0) :
    n % 8 = 0 := by
  by_contra hne
  rcases (by omega : n % 32 = 4 ∨ n % 32 = 20 ∨ n % 16 = 12) with h|h|h
  · rcases (by omega : n = 36 ∨ n ≠ 36) with h0|h0
    · subst h0; have := hA 1 (by norm_num) (by norm_num); rw [sig0] at this; revert this; decide
    · exact leafF n 4 1 32 1 6 0 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 4 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 4 16 1 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 4 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 4 8 1 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 4 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)

set_option maxHeartbeats 2000000 in
lemma stage24 (n : ℕ) (hn : 24 < n) (hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2) (hp : n % 8 = 0) :
    n % 24 = 0 := by
  by_contra hne
  rcases (by omega : n % 24 = 8 ∨ n % 24 = 16) with h|h
  · exact leafF n 2 2 3 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 2 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 4 4 3 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 4 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)

set_option maxHeartbeats 2000000 in
lemma stage72 (n : ℕ) (hn : 24 < n) (hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2) (hp : n % 24 = 0) :
    n % 72 = 0 := by
  by_contra hne
  rcases (by omega : n % 216 = 24 ∨ n % 216 = 96 ∨ n % 216 = 168 ∨ n % 216 = 48 ∨ n % 216 = 120 ∨ n % 216 = 192) with h|h|h|h|h|h
  · exact leafF n 6 18 1 6 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 6 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 6 18 1 6 6 5 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 6 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 6 2 27 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 6 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 3 9 1 3 6 2 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 3 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 3 9 1 3 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 3 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 12 36 1 6 6 5 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 12 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)

set_option maxHeartbeats 2000000 in
lemma stage360 (n : ℕ) (hn : 24 < n) (hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2) (hp : n % 72 = 0) :
    n % 360 = 0 := by
  by_contra hne
  rcases (by omega : n % 360 = 72 ∨ n % 360 = 144 ∨ n % 360 = 216 ∨ n % 360 = 288) with h|h|h|h
  · exact leafF n 2 2 5 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 2 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 4 4 5 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 4 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 6 6 5 6 6 5 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 6 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 3 3 5 3 6 2 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 3 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)

set_option maxHeartbeats 2000000 in
lemma stage2520 (n : ℕ) (hn : 24 < n) (hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2) (hp : n % 360 = 0) :
    n % 2520 = 0 := by
  by_contra hne
  rcases (by omega : n % 2520 = 360 ∨ n % 2520 = 720 ∨ n % 2520 = 1080 ∨ n % 2520 = 1440 ∨ n % 5040 = 1800 ∨ n % 5040 = 4320 ∨ n % 2520 = 2160) with h|h|h|h|h|h|h
  · exact leafF n 3 3 7 3 6 2 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 3 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 6 6 7 6 6 5 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 6 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 2 2 7 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 2 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 12 12 7 6 6 5 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 12 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 8 1 112 1 6 0 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 8 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 8 8 7 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 8 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)
  · exact leafF n 4 4 7 2 6 1 (by omega) (by omega) (by omega) (by norm_num) (by norm_num) (by omega) (by omega) (hA 4 (by norm_num) (by omega)) (by rw [sig0, sig0]; decide)

/-- Any solution to Erdős 647 is divisible by 2520. -/
theorem witness_dvd (n : ℕ) (hn : 24 < n) (h : ⨆ m : Fin n, (m : ℕ) + σ 0 m ≤ n + 2) :
    2520 ∣ n := by
  have hA : ∀ k, 1 ≤ k → k < n → σ 0 (n - k) ≤ k + 2 := by
    intro k hk1 hkn
    have := (le_ciSup (Finite.bddAbove_range _) (⟨n - k, by omega⟩ : Fin n)).trans h
    simp only at this
    omega
  have h2 := stage2 n hn hA
  have h4 := stage4 n hn hA h2
  have h8 := stage8 n hn hA h4
  have h24 := stage24 n hn hA h8
  have h72 := stage72 n hn hA h24
  have h360 := stage360 n hn hA h72
  have h2520 := stage2520 n hn hA h360
  omega

end Erdos647
