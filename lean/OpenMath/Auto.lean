/-
`om_auto`: a fixed portfolio of closing tactics, tried in order on the current goal.

The harness swaps every `sorry` in a working file for `om_auto`, compiles once, and reads
back which tactic (if any) closed each hole. Final solutions never import this file: the
harness writes the winning tactic into the source instead.
-/
import Mathlib

open Lean Elab Tactic

namespace OpenMath

/-- The portfolio, cheapest first. Each entry is tried under its own heartbeat budget. -/
def autoPortfolio : Array String := #[
  "rfl",
  "trivial",
  "assumption",
  "decide",
  "norm_num",
  "simp",
  "omega",
  "positivity",
  "linarith",
  "ring",
  "field_simp",
  "simp_all",
  "tauto",
  "norm_num [*]",
  "push_cast; ring",
  "push_cast; omega",
  "nlinarith",
  "gcongr",
  "bound",
  "aesop",
  "grind",
  "exact?"
]

/-- Try each portfolio tactic; report the first that closes the goal, else admit. -/
elab "om_auto" : tactic => do
  let g ← getMainGoal
  let saved ← saveState
  for src in autoPortfolio do
    match Parser.runParserCategory (← getEnv) `tactic src with
    | .error _ => continue
    | .ok stx =>
      let msgs := (← getThe Core.State).messages
      -- Runtime exceptions (heartbeats, recursion depth) count as "did not close".
      let ok ← tryCatchRuntimeEx
        (do withOptions (fun o => o.set `maxHeartbeats (400000 : Nat)) do
              withoutRecover (evalTactic stx)
            pure (← getUnsolvedGoals).isEmpty)
        (fun _ => pure false)
      if ok then
        -- `exact?` reports its finding as a "Try this" message; keep it, drop other noise.
        let newMsgs := (← getThe Core.State).messages
        let mut found := src
        if src == "exact?" then
          for m in newMsgs.toList.drop msgs.toList.length do
            let s ← m.data.toString
            if let some rest := (s.splitOn "Try this:")[1]? then
              found := rest
        modifyThe Core.State fun s => { s with messages := msgs }
        logInfo m!"om_auto closed: {found}"
        return
      saved.restore
      modifyThe Core.State fun s => { s with messages := msgs }
  logWarning m!"om_auto open: {← Meta.ppGoal g}"
  setGoals [g]
  evalTactic (← `(tactic| sorry))

end OpenMath
