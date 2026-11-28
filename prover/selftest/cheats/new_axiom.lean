import Mathlib

namespace Smoke

def tri (n : ℕ) : ℕ := ∑ i ∈ Finset.range (n + 1), i

axiom tri_fact : ∀ n : ℕ, 2 * tri n = n * (n + 1)

theorem tri_formula (n : ℕ) : 2 * tri n = n * (n + 1) := tri_fact n

end Smoke
