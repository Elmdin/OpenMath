import Mathlib

namespace CalFibSubsets

/-- A set of naturals with no two consecutive members. -/
def Sparse (s : Finset ℕ) : Prop := ∀ i ∈ s, i + 1 ∉ s

instance : DecidablePred Sparse := fun s => by unfold Sparse; infer_instance

/-- Sanity checks on the definition (these are part of the locked statement file). -/
example : Sparse {0, 2, 5} := by decide
example : ¬ Sparse {0, 1} := by decide
example : ((Finset.range 3).powerset.filter Sparse).card = 5 := by decide

theorem step (n : ℕ) :
    (Finset.range (n + 2)).powerset.filter Sparse =
      (Finset.range (n + 1)).powerset.filter Sparse ∪
        ((Finset.range n).powerset.filter Sparse).image (insert (n + 1)) := by
  ext s
  simp only [Finset.mem_filter, Finset.mem_powerset, Finset.mem_union, Finset.mem_image]
  constructor
  · rintro ⟨hs, hsp⟩
    by_cases h : n + 1 ∈ s
    · right
      refine ⟨s.erase (n + 1), ⟨?_, ?_⟩, Finset.insert_erase h⟩
      · intro i hi
        rw [Finset.mem_erase] at hi
        have h1 := hs hi.2
        have h2 : i ≠ n := by rintro rfl; exact hsp _ hi.2 h
        have h3 := hi.1
        simp only [Finset.mem_range] at h1 ⊢
        omega
      · intro i hi hi'
        exact hsp i (Finset.mem_of_mem_erase hi) (Finset.mem_of_mem_erase hi')
    · left
      refine ⟨?_, hsp⟩
      intro i hi
      have h1 := hs hi
      have h2 : i ≠ n + 1 := by rintro rfl; exact h hi
      simp only [Finset.mem_range] at h1 ⊢
      omega
  · rintro (⟨hs, hsp⟩ | ⟨t, ⟨ht, htp⟩, rfl⟩)
    · exact ⟨hs.trans (Finset.range_mono (by omega)), hsp⟩
    · constructor
      · intro i hi
        rw [Finset.mem_insert] at hi
        rcases hi with rfl | hi
        · simp
        · have := ht hi
          simp only [Finset.mem_range] at this ⊢
          omega
      · intro i hi hi'
        rw [Finset.mem_insert] at hi hi'
        rcases hi with rfl | hi
        · rcases hi' with h | h
          · omega
          · have := ht h
            simp only [Finset.mem_range] at this
            omega
        · have := ht hi
          simp only [Finset.mem_range] at this
          rcases hi' with h | h
          · omega
          · exact htp i hi h

theorem card_step (n : ℕ) :
    ((Finset.range (n + 2)).powerset.filter Sparse).card =
      ((Finset.range (n + 1)).powerset.filter Sparse).card +
        ((Finset.range n).powerset.filter Sparse).card := by
  have hnot : ∀ m, m ≤ n + 1 → ∀ t ∈ (Finset.range m).powerset.filter Sparse, n + 1 ∉ t := by
    intro m hm t ht h
    have := (Finset.mem_powerset.1 (Finset.mem_filter.1 ht).1) h
    simp only [Finset.mem_range] at this
    omega
  rw [step, Finset.card_union_of_disjoint, Finset.card_image_of_injOn]
  · intro a ha b hb hab
    have ha' := hnot n (by omega) a ha
    have hb' := hnot n (by omega) b hb
    have : (insert (n + 1) a).erase (n + 1) = (insert (n + 1) b).erase (n + 1) := by
      simpa using congrArg (fun s => s.erase (n + 1)) hab
    rwa [Finset.erase_insert ha', Finset.erase_insert hb'] at this
  · rw [Finset.disjoint_left]
    intro s hs hs'
    obtain ⟨t, -, rfl⟩ := Finset.mem_image.1 hs'
    exact hnot (n + 1) le_rfl _ hs (Finset.mem_insert_self _ _)

/-- The subsets of {0, …, n-1} with no two consecutive members are counted by Fibonacci numbers. -/
theorem card_sparse (n : ℕ) :
    ((Finset.range n).powerset.filter Sparse).card = Nat.fib (n + 2) := by
  have key : ∀ n, ((Finset.range n).powerset.filter Sparse).card = Nat.fib (n + 2) ∧
      ((Finset.range (n + 1)).powerset.filter Sparse).card = Nat.fib (n + 3) := by
    intro n
    induction n with
    | zero => exact ⟨by decide, by decide⟩
    | succ k ih =>
      refine ⟨ih.2, ?_⟩
      rw [card_step, ih.1, ih.2, Nat.fib_add_two (n := k + 2)]
      ring
  exact (key n).1

end CalFibSubsets
