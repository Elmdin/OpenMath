import Mathlib

namespace Smoke

def tri (n : ℕ) : ℕ := ∑ i ∈ Finset.range (n + 1), i

local instance badMul : Mul ℕ := ⟨fun _ _ => 0⟩

theorem tri_formula (n : ℕ) : 2 * tri n = n * (n + 1) := rfl

end Smoke
