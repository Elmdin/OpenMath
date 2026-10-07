# Decisions (newest thinking, 7 Oct 2026)

Full background research lives in the Claude doc "Catch-Up Agent: AI math you can touch":
https://claude.ai/code/artifact/9d4bc550-9ed3-4c65-ae06-32616e5ca0b1
Where that doc disagrees with this file, this file is newer.

1. **What it automates.** Not understanding (that happens in a head) and not just triage
   (every summarizer does that). It automates *exposition*: producing the playable picture and
   briefing for a paper with no human step. Hand-made explorables take days, so for 722 papers
   they do not get made at all.
   One line: "Generation is automated, checking is automated by Lean, explaining was not."
2. **It runs unattended.** The agent works through papers on its own and writes finished
   briefings to Supabase; the page is a feed, not a "paste a paper" box. This changes the
   architecture in the research doc (paste box, Agent37 off the critical path): the Agent37
   instance is now the worker.
3. **It checks itself.** Every picture carries an exact-arithmetic check against the paper's
   worked example.
4. **Honest limits.** One or two simulation types; never say "any paper". We report the
   source repo's verification status; we do not verify proofs.
5. **To prove "automates" on stage,** run a second paper untouched, even if rougher.
6. **Considered and set aside:** automating the referee step of checking that a Lean statement
   matches the English claim. Real gap, weak demo, unknown whether OpenAI already audits it.
7. **Audience framing.** For mathematicians: built for them on open terms, not as marketing
   for an AI lab. SAIR (co-founded by Terence Tao) is independent of the labs.
8. **Status labels, never merged:** Lean-checked / human-reviewed / unreviewed.
9. **Design rule:** the agent picks a simulation from a vetted library and emits a JSON spec.
   Never pixels, never code.
10. **First paper:** OpenAI Family 025, Short Egyptian fractions (see BRIEF.md).
11. **Hackathon theme fit:** "the workflow you never want to do again" = making sense of a
    machine-written paper by hand.
