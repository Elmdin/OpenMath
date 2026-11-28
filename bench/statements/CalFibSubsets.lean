import Mathlib

namespace CalFibSubsets

/-- A set of naturals with no two consecutive members. -/
def Sparse (s : Finset ℕ) : Prop := ∀ i ∈ s, i + 1 ∉ s

instance : DecidablePred Sparse := fun s => by unfold Sparse; infer_instance

/-- Sanity checks on the definition (these are part of the locked statement file). -/
example : Sparse {0, 2, 5} := by decide
example : ¬ Sparse {0, 1} := by decide
example : ((Finset.range 3).powerset.filter Sparse).card = 5 := by decide

/-- The subsets of {0, …, n-1} with no two consecutive members are counted by Fibonacci numbers. -/
theorem card_sparse (n : ℕ) :
    ((Finset.range n).powerset.filter Sparse).card = Nat.fib (n + 2) := by
  sorry

end CalFibSubsets
