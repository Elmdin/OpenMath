# Catch-Up Agent

An agent that turns an AI-generated math paper into a playable picture, unattended.
Built at the "Build an Agent" Hackathon, Corgi Cafe, San Francisco, Oct 7, 2026.

**Status: environment only. No application code yet.**

## What it does (target)
Paper in -> briefing out, no human step:
1. Claim in plain words.
2. Verification status: Lean-checked / human-reviewed / unreviewed (read from the source repo, not judged by us).
3. An interactive picture: the agent chooses a simulation from a small vetted library and emits a JSON spec. It never emits pixels or code.
4. A self-check: exact arithmetic on the paper's worked example.
5. Open questions.

## Stack
- Agent37 Cloud APIs: the unattended worker (required by the hackathon)
- OpenAI: structured output for the briefing and the picture spec
- Supabase: stores finished briefings; the web page reads the feed

## Layout
- `data/family-025/` first target paper (OpenAI, "Short Egyptian fractions"), see SOURCE.md
- `docs/SETUP.md`    accounts, keys and the pre-build checklist
- `docs/BRIEF.md`    the first paper, the picture, and the demo script
- `supabase/schema.sql`
- `agent/`, `web/`   empty until the build starts
