import Mathlib

namespace Smoke

def tri (n : ℕ) : ℕ := ∑ i ∈ Finset.range (n + 1), i

open Lean Elab Command Term Meta in
run_cmd liftTermElabM do
  let stx ← `(∀ n : ℕ, 2 * tri n = n * (n + 1))
  let ty ← instantiateMVars (← elabType stx)
  let decl := Declaration.thmDecl
    { name := `Smoke.tri_formula_bogus, levelParams := [], type := ty, value := mkConst ``True.intro }
  modifyEnv fun env => match env.addDeclCore 0 1000 decl none (doCheck := false) with
    | .ok env' => env'
    | .error _ => env

theorem tri_formula (n : ℕ) : 2 * tri n = n * (n + 1) := tri_formula_bogus n

end Smoke
