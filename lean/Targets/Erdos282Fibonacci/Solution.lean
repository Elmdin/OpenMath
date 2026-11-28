import Mathlib

/-!
Erdős problem 282, the textbook variant: Fibonacci's greedy algorithm for Egyptian fractions
terminates for every rational in (0, 1).

Definition and statement copied from google-deepmind/formal-conjectures,
`FormalConjectures/ErdosProblems/282.lean` at commit f606af1 (27 Nov 2026), Apache-2.0.
Only the `@[category …]` attributes and the module header are dropped.
-/

open Filter Real

namespace Erdos282

noncomputable def greedyUnitFractionRem (A : Set ℕ) (x : ℚ) (t : ℕ) : ℚ :=
  if x ≤ 0 then 0 else
    let n := sInf { n | n ∈ A ∧ 1 / x ≤ n }
    let rem := x - 1 / n
    match t with
    | 0 => rem
    | t + 1 => greedyUnitFractionRem (A \ {n}) rem t

/-- Sanity checks on the definition, from the same source file. -/
example (n : ℕ) : greedyUnitFractionRem .univ (1 / n) 0 = 0 := by
  simp [greedyUnitFractionRem, Set.Ici_def]

example (n : ℕ) : greedyUnitFractionRem .univ (1 / n) 1 = 0 := by
  simp [greedyUnitFractionRem, Set.Ici_def]

def Inv (A : Set ℕ) (x : ℚ) : Prop := 0 < x ∧ x < 1 ∧ ∀ m : ℕ, 1 / x ≤ m → m ∈ A

lemma rem_zero (A : Set ℕ) (t : ℕ) : greedyUnitFractionRem A 0 t = 0 := by
  unfold greedyUnitFractionRem; simp

lemma sInf_eq {A : Set ℕ} {x : ℚ} (h : Inv A x) :
    sInf { n : ℕ | n ∈ A ∧ 1 / x ≤ n } = ⌈1 / x⌉₊ := by
  apply le_antisymm
  · exact Nat.sInf_le ⟨h.2.2 _ (Nat.le_ceil _), Nat.le_ceil _⟩
  · exact Nat.ceil_le.2
      (Nat.sInf_mem (s := { n : ℕ | n ∈ A ∧ 1 / x ≤ n })
        ⟨_, h.2.2 _ (Nat.le_ceil _), Nat.le_ceil _⟩).2

lemma step {A : Set ℕ} {x : ℚ} (h : Inv A x) :
    x - 1 / (⌈1 / x⌉₊ : ℚ) = 0 ∨
      (Inv (A \ {⌈1 / x⌉₊}) (x - 1 / (⌈1 / x⌉₊ : ℚ)) ∧
        (x - 1 / (⌈1 / x⌉₊ : ℚ)).num < x.num) := by
  obtain ⟨hx0, hx1, hA⟩ := h
  have hn1 : 1 / x ≤ (⌈1 / x⌉₊ : ℚ) := Nat.le_ceil _
  have hn2 : (⌈1 / x⌉₊ : ℚ) < 1 / x + 1 := Nat.ceil_lt_add_one (by positivity)
  generalize ⌈1 / x⌉₊ = n at *
  have hnpos : (0 : ℚ) < n := lt_of_lt_of_le (by positivity) hn1
  have h1 : 1 ≤ (n : ℚ) * x := by rwa [div_le_iff₀ hx0] at hn1
  have h2 : ((n : ℚ) - 1) * x < 1 := by
    have : (n : ℚ) - 1 < 1 / x := by linarith
    rwa [lt_div_iff₀ hx0] at this
  have hrem : (x - 1 / (n : ℚ)) * n = n * x - 1 := by field_simp
  rcases eq_or_lt_of_le (show 0 ≤ (n : ℚ) * x - 1 by linarith) with h0 | hpos
  · left
    have : (x - 1 / (n : ℚ)) * n = 0 := by rw [hrem, ← h0]
    rcases mul_eq_zero.1 this with h | h
    · exact h
    · exact absurd h hnpos.ne'
  right
  have hrpos : 0 < x - 1 / (n : ℚ) := by
    have : 0 < (x - 1 / (n : ℚ)) * n := by rw [hrem]; exact hpos
    exact (pos_iff_pos_of_mul_pos this).2 hnpos
  have hrlt : x - 1 / (n : ℚ) < x := by
    have : 0 < 1 / (n : ℚ) := by positivity
    linarith
  refine ⟨⟨hrpos, by linarith, ?_⟩, ?_⟩
  · intro m hm
    rw [div_le_iff₀ hrpos] at hm
    have hmn : n < m := by
      by_contra hc
      have hc' : (m : ℚ) ≤ n := by exact_mod_cast not_lt.1 hc
      have : (m : ℚ) * (x - 1 / (n : ℚ)) ≤ n * (x - 1 / (n : ℚ)) :=
        mul_le_mul_of_nonneg_right hc' hrpos.le
      nlinarith
    refine ⟨hA m ?_, by simpa using hmn.ne'⟩
    rw [div_le_iff₀ hx0]
    have : (m : ℚ) * (x - 1 / (n : ℚ)) ≤ m * x :=
      mul_le_mul_of_nonneg_left hrlt.le (by positivity)
    linarith
  · have hxe : x = (x.num : ℚ) / (x.den : ℚ) := (Rat.num_div_den x).symm
    have hb : (0 : ℚ) < x.den := by exact_mod_cast x.den_pos
    have ha : (0 : ℚ) < x.num := by exact_mod_cast Rat.num_pos.2 hx0
    have e : x - 1 / (n : ℚ) =
        ((x.num * n - x.den : ℤ) : ℚ) / ((x.den * n : ℤ) : ℚ) := by
      push_cast
      nth_rewrite 1 [hxe]
      field_simp
    have hdvd : (x - 1 / (n : ℚ)).num ∣ (x.num * n - x.den : ℤ) := by
      rw [e, ← Rat.divInt_eq_div]
      apply Rat.num_dvd
      have : (0:ℤ) < x.den * n := by exact_mod_cast mul_pos hb hnpos
      exact this.ne'
    have hq1 : (0 : ℚ) < x.num * n - x.den := by
      have : (n : ℚ) * (x.num / x.den) - 1 > 0 := by rw [← hxe]; exact hpos
      have h3 : (n : ℚ) * (x.num / x.den) * x.den = n * x.num := by field_simp
      nlinarith
    have hq2 : (x.num : ℚ) * n - x.den < x.num := by
      have : ((n : ℚ) - 1) * (x.num / x.den) < 1 := by rw [← hxe]; exact h2
      have h3 : ((n : ℚ) - 1) * (x.num / x.den) * x.den = (n - 1) * x.num := by field_simp
      nlinarith
    have hz1 : (0 : ℤ) < x.num * n - x.den := by exact_mod_cast hq1
    have hz2 : (x.num : ℤ) * n - x.den < x.num := by exact_mod_cast hq2
    exact lt_of_le_of_lt (Int.le_of_dvd hz1 hdvd) hz2

lemma main_aux : ∀ (k : ℕ) (A : Set ℕ) (x : ℚ), Inv A x → x.num ≤ (k : ℤ) + 1 →
    ∀ t, k ≤ t → greedyUnitFractionRem A x t = 0 := by
  intro k
  induction k with
  | zero =>
    intro A x h hk t _
    have hs := step h
    rcases hs with h0 | ⟨hI, hlt⟩
    · unfold greedyUnitFractionRem
      rw [if_neg (not_le.2 h.1)]
      simp only [sInf_eq h, h0]
      cases t <;> simp [rem_zero]
    · have := Rat.num_pos.2 hI.1
      omega
  | succ k ih =>
    intro A x h hk t ht
    obtain ⟨s, rfl⟩ : ∃ s, t = s + 1 := ⟨t - 1, by omega⟩
    have hs := step h
    unfold greedyUnitFractionRem
    rw [if_neg (not_le.2 h.1)]
    simp only [sInf_eq h]
    rcases hs with h0 | ⟨hI, hlt⟩
    · rw [h0]; exact rem_zero _ _
    · exact ih _ _ hI (by push_cast at hk; omega) s (by omega)

/-- In 1202 Fibonacci observed that this process terminates for any $x$ when $A=\mathbb{N}$. -/
theorem erdos_282.variants.fibonacci {x : ℚ} (hx : x ∈ Set.Ioo 0 1) :
    greedyUnitFractionRem .univ x =ᶠ[atTop] 0 := by
  have hI : Inv Set.univ x := ⟨hx.1, hx.2, fun _ _ => Set.mem_univ _⟩
  refine eventually_atTop.2 ⟨x.num.toNat, fun t ht => ?_⟩
  exact main_aux x.num.toNat _ x hI (by have := Int.self_le_toNat x.num; omega) t ht

end Erdos282
