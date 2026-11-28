import Mathlib

/-!
Erdős problem 697, the variant `delta_lt`: δ(m, α) < (m^α + 1) / m.

Copied from google-deepmind/formal-conjectures at commit f606af1 (Apache-2.0):
- `Set.partialDensity`, `Set.HasDensity` from `FormalConjecturesForMathlib/Data/Set/Density.lean`
- `density_exists`, `δ`, `erdos_697.variants.delta_lt` from `FormalConjectures/ErdosProblems/697.lean`
Only the `@[category …]` attributes and module headers are dropped.

`δ` is defined from `density_exists`, so both theorems are targets here.
-/

open Filter

open scoped Topology

namespace Set

@[inline]
noncomputable abbrev partialDensity {β : Type*} [Preorder β] [LocallyFiniteOrderBot β]
    (S : Set β) (A : Set β := Set.univ) (b : β) : ℝ :=
  ((S ∩ A) ∩ Iio b).ncard / (A ∩ Iio b).ncard

def HasDensity {β : Type*} [Preorder β] [LocallyFiniteOrderBot β]
    (S : Set β) (α : ℝ) (A : Set β := Set.univ) : Prop :=
  Tendsto (fun (b : β) => S.partialDensity A b) atTop (𝓝 α)

end Set

open Filter Set Real
open scoped Topology

namespace Erdos697

/-- Sanity checks on the density definition: the whole of ℕ has density 1, the empty set 0. -/
example : (Set.univ : Set ℕ).HasDensity 1 := by
  refine tendsto_const_nhds.congr' ?_
  filter_upwards [eventually_gt_atTop 0] with b hb
  have hb' : (b : ℝ) ≠ 0 := by exact_mod_cast hb.ne'
  simp [Set.partialDensity, div_self hb']

example : (∅ : Set ℕ).HasDensity 0 := by simp [Set.HasDensity, Set.partialDensity]


lemma count_period (p : ℕ → Prop) [DecidablePred p] (L : ℕ) (hp : Function.Periodic p L)
    (q r : ℕ) : Nat.count p (q * L + r) = q * Nat.count p L + Nat.count p r := by
  induction q with
  | zero => simp
  | succ q ih =>
    have : (q + 1) * L + r = L + (q * L + r) := by ring
    rw [this, Nat.count_add]
    have e : Nat.count (fun k => p (L + k)) (q * L + r) = Nat.count p (q * L + r) := by
      simp only [Nat.count_eq_card_filter_range]
      congr 1; ext x; simp only [Finset.mem_filter]; rw [add_comm L x, hp x]
    rw [e, ih]; ring

lemma ncard_eq_count (p : ℕ → Prop) [DecidablePred p] (b : ℕ) :
    ({n | p n} ∩ Set.univ ∩ Set.Iio b).ncard = Nat.count p b := by
  rw [Nat.count_eq_card_filter_range, ← Set.ncard_coe_finset]
  congr 1; ext x; simp [and_comm]

lemma ncard_univ_Iio (b : ℕ) : ((Set.univ : Set ℕ) ∩ Set.Iio b).ncard = b := by
  rw [Set.univ_inter, ← Finset.coe_range, Set.ncard_coe_finset, Finset.card_range]

lemma tendsto_periodic (p : ℕ → Prop) [DecidablePred p] (L : ℕ) (hL : 0 < L)
    (hp : Function.Periodic p L) :
    Tendsto (fun b : ℕ => (Nat.count p b : ℝ) / b) atTop (𝓝 ((Nat.count p L : ℝ) / L)) := by
  rw [tendsto_iff_norm_sub_tendsto_zero]
  have hL' : (0 : ℝ) < L := by exact_mod_cast hL
  refine squeeze_zero' (Eventually.of_forall fun _ => norm_nonneg _) ?_
    (tendsto_const_div_atTop_nhds_zero_nat (L : ℝ))
  filter_upwards [eventually_gt_atTop 0] with b hb
  have hb' : (0 : ℝ) < b := by exact_mod_cast hb
  have hdec := count_period p L hp (b / L) (b % L)
  rw [Nat.div_add_mod' b L] at hdec
  have hbr : (b : ℝ) = (b / L : ℕ) * L + (b % L : ℕ) := by
    exact_mod_cast (Nat.div_add_mod' b L).symm
  have hr : ((b % L : ℕ) : ℝ) < L := by exact_mod_cast Nat.mod_lt b hL
  have hc : (Nat.count p L : ℝ) ≤ L := by exact_mod_cast Nat.count_le p
  have hcr : (Nat.count p (b % L) : ℝ) ≤ (b % L : ℕ) := by exact_mod_cast Nat.count_le p
  have hc0 : (0 : ℝ) ≤ Nat.count p L := by positivity
  have hcr0 : (0 : ℝ) ≤ Nat.count p (b % L) := by positivity
  have hr0 : (0 : ℝ) ≤ ((b % L : ℕ) : ℝ) := by positivity
  have key : (Nat.count p b : ℝ) / b - Nat.count p L / L
      = (Nat.count p (b % L) * L - Nat.count p L * (b % L : ℕ)) / (b * L) := by
    rw [hdec]; push_cast
    field_simp
    rw [hbr]; ring
  rw [Real.norm_eq_abs, key, abs_div, abs_of_pos (by positivity : (0:ℝ) < b * L),
    div_le_div_iff₀ (by positivity) hb']
  have hX : |(Nat.count p (b % L) : ℝ) * L - Nat.count p L * (b % L : ℕ)| ≤ L * L := by
    rw [abs_le]
    constructor <;> nlinarith [mul_le_mul hc hr.le hr0 hL'.le, mul_le_mul_of_nonneg_right hcr hL'.le]
  nlinarith

lemma harm_bound (m : ℕ) (hm : 0 < m) (α : ℝ) (D : Finset ℕ)
    (hD : ∀ d ∈ D, d ≡ 1 [MOD m] ∧ 1 < d ∧ (d : ℝ) < exp ((m : ℝ) ^ α)) :
    ∑ d ∈ D, (1 : ℝ) / d < ((m : ℝ) ^ α + 1) / m := by
  set E := exp ((m : ℝ) ^ α) with hE
  have hm' : (0 : ℝ) < m := by exact_mod_cast hm
  set K := ⌊E / m⌋₊ with hK
  have hsub : D ⊆ (Finset.Icc 1 K).image (fun k => k * m + 1) := by
    intro d hd
    obtain ⟨h1, h2, h3⟩ := hD d hd
    have hdvd : m ∣ d - 1 := (Nat.modEq_iff_dvd' h2.le).mp h1.symm
    obtain ⟨k, hk⟩ := hdvd
    have hdk : d = k * m + 1 := by rw [mul_comm]; omega
    rw [Finset.mem_image]
    refine ⟨k, Finset.mem_Icc.mpr ⟨?_, ?_⟩, hdk.symm⟩
    · rcases Nat.eq_zero_or_pos k with h | h
      · subst h; omega
      · exact h
    · apply Nat.le_floor
      rw [le_div_iff₀ hm']
      have : (d : ℝ) = k * m + 1 := by exact_mod_cast hdk
      linarith
  have hinj : Set.InjOn (fun k : ℕ => k * m + 1) (Finset.Icc 1 K : Set ℕ) := by
    intro a _ b _ h
    simp only at h
    exact Nat.eq_of_mul_eq_mul_right hm (by omega)
  calc ∑ d ∈ D, (1 : ℝ) / d ≤ ∑ d ∈ (Finset.Icc 1 K).image (fun k => k * m + 1), (1 : ℝ) / d :=
        Finset.sum_le_sum_of_subset_of_nonneg hsub (fun _ _ _ => by positivity)
    _ = ∑ k ∈ Finset.Icc 1 K, (1 : ℝ) / ((k * m + 1 : ℕ) : ℝ) := Finset.sum_image hinj
    _ < ((m : ℝ) ^ α + 1) / m := by
      have hpow : (0 : ℝ) < (m : ℝ) ^ α := Real.rpow_pos_of_pos hm' α
      rcases Nat.eq_zero_or_pos K with hK0 | hK0
      · rw [hK0]; simp; positivity
      have hne : (Finset.Icc 1 K).Nonempty := ⟨1, Finset.mem_Icc.mpr ⟨le_rfl, hK0⟩⟩
      calc ∑ k ∈ Finset.Icc 1 K, (1 : ℝ) / ((k * m + 1 : ℕ) : ℝ)
          < ∑ k ∈ Finset.Icc 1 K, (1 : ℝ) / m * (k : ℝ)⁻¹ := by
            apply Finset.sum_lt_sum_of_nonempty hne
            intro k hk
            have hk1 : (1 : ℝ) ≤ k := by exact_mod_cast (Finset.mem_Icc.mp hk).1
            push_cast
            have : (1 : ℝ) / m * (k : ℝ)⁻¹ = 1 / (k * m) := by
              field_simp
            rw [this]
            apply one_div_lt_one_div_of_lt (by positivity)
            linarith
        _ = (1 : ℝ) / m * (harmonic K : ℝ) := by
            rw [← Finset.mul_sum, harmonic_eq_sum_Icc]; push_cast; rfl
        _ ≤ (1 : ℝ) / m * (1 + Real.log K) := by
            gcongr; exact harmonic_le_one_add_log K
        _ ≤ ((m : ℝ) ^ α + 1) / m := by
            rw [one_div_mul_eq_div]
            apply div_le_div_of_nonneg_right _ hm'.le
            have hKpos : (0 : ℝ) < K := by exact_mod_cast hK0
            have hKE : (K : ℝ) ≤ E := by
              have h1 : (K : ℝ) ≤ E / m := Nat.floor_le (by positivity)
              have h2 : E / m ≤ E := div_le_self (by positivity) (by exact_mod_cast hm)
              linarith
            have : Real.log K ≤ (m : ℝ) ^ α := by
              calc Real.log K ≤ Real.log E := Real.log_le_log hKpos hKE
                _ = (m : ℝ) ^ α := Real.log_exp _
            linarith

lemma count_dvd_le (d L : ℕ) (hd : 0 < d) (hdL : d ∣ L) :
    (Finset.filter (fun x => d ∣ x) (Finset.range L)).card ≤ L / d := by
  obtain ⟨q, rfl⟩ := hdL
  calc (Finset.filter (fun x => d ∣ x) (Finset.range (d * q))).card
      ≤ ((Finset.range q).image (fun k => d * k)).card := by
        apply Finset.card_le_card
        intro x hx
        simp only [Finset.mem_filter, Finset.mem_range] at hx
        obtain ⟨hxL, k, rfl⟩ := hx
        simp only [Finset.mem_image, Finset.mem_range]
        exact ⟨k, Nat.lt_of_mul_lt_mul_left hxL, rfl⟩
    _ ≤ (Finset.range q).card := Finset.card_image_le
    _ = d * q / d := by rw [Finset.card_range, Nat.mul_div_cancel_left _ hd]

lemma finite_D (m : ℕ) (α : ℝ) : ∃ D : Finset ℕ, ∀ d, d ∈ D ↔
    (d ≡ 1 [MOD m] ∧ 1 < d ∧ (d : ℝ) < exp ((m : ℝ) ^ α)) := by
  classical
  refine ⟨(Finset.range ⌈exp ((m : ℝ) ^ α)⌉₊).filter
    (fun d => d ≡ 1 [MOD m] ∧ 1 < d ∧ (d : ℝ) < exp ((m : ℝ) ^ α)), fun d => ?_⟩
  simp only [Finset.mem_filter, Finset.mem_range, and_iff_right_iff_imp]
  intro h; exact Nat.lt_ceil.mpr h.2.2

lemma main_lemma (m : ℕ) (α : ℝ) : ∃ c : ℝ, HasDensity
    {n : ℕ | ∃ d, d ≡ 1 [MOD m] ∧ (d : ℝ) ∈ Set.Ioo 1 (exp (m ^ α)) ∧ d ∣ n} c ∧
    (0 < m → c < (m ^ α + 1) / m) := by
  classical
  obtain ⟨D, hD⟩ := finite_D m α
  let p : ℕ → Prop := fun n => ∃ d ∈ D, d ∣ n
  have hS : {n : ℕ | ∃ d, d ≡ 1 [MOD m] ∧ (d : ℝ) ∈ Set.Ioo 1 (exp (m ^ α)) ∧ d ∣ n}
      = {n | p n} := by
    ext n
    simp only [Set.mem_setOf_eq, Set.mem_Ioo, hD, p]
    constructor
    · rintro ⟨d, h1, ⟨h2, h3⟩, h4⟩; exact ⟨d, ⟨h1, by exact_mod_cast h2, h3⟩, h4⟩
    · rintro ⟨d, ⟨h1, h2, h3⟩, h4⟩; exact ⟨d, h1, ⟨by exact_mod_cast h2, h3⟩, h4⟩
  have hdD : ∀ d ∈ D, 1 < d := fun d hd => ((hD d).mp hd).2.1
  set L := ∏ d ∈ D, d with hLdef
  have hL : 0 < L := Finset.prod_pos (fun d hd => by have := hdD d hd; omega)
  have hdvdL : ∀ d ∈ D, d ∣ L := fun d hd => Finset.dvd_prod_of_mem _ hd
  have hper : Function.Periodic p L := by
    intro n
    apply propext
    constructor
    · rintro ⟨d, hd, h⟩; exact ⟨d, hd, (Nat.dvd_add_left (hdvdL d hd)).mp h⟩
    · rintro ⟨d, hd, h⟩; exact ⟨d, hd, (Nat.dvd_add_left (hdvdL d hd)).mpr h⟩
  refine ⟨(Nat.count p L : ℝ) / L, ?_, ?_⟩
  · rw [hS]
    unfold HasDensity
    refine (tendsto_periodic p L hL hper).congr' ?_
    filter_upwards with b
    simp only [Set.partialDensity, ncard_eq_count, ncard_univ_Iio]
  · intro hm
    have hcount : Nat.count p L ≤ ∑ d ∈ D, L / d := by
      rw [Nat.count_eq_card_filter_range]
      calc (Finset.filter p (Finset.range L)).card
          ≤ (D.biUnion (fun d => Finset.filter (fun x => d ∣ x) (Finset.range L))).card := by
            apply Finset.card_le_card
            intro x hx
            simp only [Finset.mem_filter, p] at hx
            obtain ⟨hx, d, hd, hdx⟩ := hx
            simp only [Finset.mem_biUnion, Finset.mem_filter]
            exact ⟨d, hd, hx, hdx⟩
        _ ≤ ∑ d ∈ D, (Finset.filter (fun x => d ∣ x) (Finset.range L)).card :=
            Finset.card_biUnion_le
        _ ≤ ∑ d ∈ D, L / d := Finset.sum_le_sum (fun d hd =>
            count_dvd_le d L (by have := hdD d hd; omega) (hdvdL d hd))
    have hL' : (0 : ℝ) < L := by exact_mod_cast hL
    calc (Nat.count p L : ℝ) / L ≤ ∑ d ∈ D, (1 : ℝ) / d := by
          rw [div_le_iff₀ hL', Finset.sum_mul]
          calc (Nat.count p L : ℝ) ≤ ((∑ d ∈ D, L / d : ℕ) : ℝ) := by exact_mod_cast hcount
            _ = ∑ d ∈ D, (1 : ℝ) / d * L := by
              push_cast
              refine Finset.sum_congr rfl (fun d hd => ?_)
              rw [Nat.cast_div (hdvdL d hd) (by have := hdD d hd; positivity)]
              ring
      _ < _ := harm_bound m hm α D (fun d hd => (hD d).mp hd)

/-- For each $m$ and $\alpha$, the density of the set of integers which are divisible by
some $d \equiv 1 \pmod{m}$ with $1 < d < \exp (m ^ \alpha)$ exists. -/
theorem density_exists (m : ℕ) (α : ℝ) : ∃ δ, HasDensity
    {n : ℕ | ∃ d, d ≡ 1 [MOD m] ∧ (d : ℝ) ∈ Set.Ioo 1 (exp (m ^ α)) ∧ d ∣ n} δ := by
  obtain ⟨c, hc, -⟩ := main_lemma m α
  exact ⟨c, hc⟩

/-- For each $m$ and $\alpha$, $\delta (m, \alpha)$ is the density of the set of integers which are
divisible by some $d \equiv 1 \pmod{m}$ with $1 < d < exp (m ^ \alpha)$ exists. -/
noncomputable def δ (m : ℕ) (α : ℝ) : ℝ := (density_exists m α).choose

/-- $\delta < \frac{m ^ \alpha + 1}{m}$. This shows that
$lim_{m\rightarrow\infty} \delta (m, \alpha) = 0$ for $\alpha < 1$.
At $m = 0$, both sides are 0, so the strict bound requires $m > 0$. -/
theorem erdos_697.variants.delta_lt (m : ℕ) (α : ℝ) (hm : 0 < m) : δ m α < (m ^ α + 1) / m := by
  obtain ⟨c, hc, hlt⟩ := main_lemma m α
  have h := (density_exists m α).choose_spec
  have : δ m α = c := tendsto_nhds_unique h hc
  rw [this]; exact hlt hm

end Erdos697
