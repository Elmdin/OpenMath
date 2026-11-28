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

/-- For each $m$ and $\alpha$, the density of the set of integers which are divisible by
some $d \equiv 1 \pmod{m}$ with $1 < d < \exp (m ^ \alpha)$ exists. -/
theorem density_exists (m : ℕ) (α : ℝ) : ∃ δ, HasDensity
    {n : ℕ | ∃ d, d ≡ 1 [MOD m] ∧ (d : ℝ) ∈ Set.Ioo 1 (exp (m ^ α)) ∧ d ∣ n} δ := by
  sorry

/-- For each $m$ and $\alpha$, $\delta (m, \alpha)$ is the density of the set of integers which are
divisible by some $d \equiv 1 \pmod{m}$ with $1 < d < exp (m ^ \alpha)$ exists. -/
noncomputable def δ (m : ℕ) (α : ℝ) : ℝ := (density_exists m α).choose

/-- $\delta < \frac{m ^ \alpha + 1}{m}$. This shows that
$lim_{m\rightarrow\infty} \delta (m, \alpha) = 0$ for $\alpha < 1$.
At $m = 0$, both sides are 0, so the strict bound requires $m > 0$. -/
theorem erdos_697.variants.delta_lt (m : ℕ) (α : ℝ) (hm : 0 < m) : δ m α < (m ^ α + 1) / m := by
  sorry

end Erdos697
