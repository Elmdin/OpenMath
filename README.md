# OpenMath — Catch-Up Agent

An agent that turns an AI-generated math paper into a playable picture, unattended.
Built at the "Build an Agent" Hackathon, Corgi Cafe, San Francisco, Oct 7, 2026.

**Status: working on one paper (Family 025). One command runs the audit on Agent37, scores it, searches prior work through Monid, and publishes the card to Supabase.**

**Demo video:** https://drive.google.com/file/d/1Heyey2PuSMREzx5KD7WMdONOz1z_djNZ/view?usp=sharing
**Live pages:** https://elmdin.github.io/OpenMath/ (chat and experiments need the local server)

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
- `docs/DECISIONS.md` what we decided and why; links to the full research doc
- `docs/REQUIREMENTS.md` hackathon rules, sponsor plan, submission checklist
- `supabase/schema.sql`
- `docs/RESEARCH.md` what we found online, what Family 025 looks like, ideas kept and dropped
- `agent/`           proof map, exact check and card builder (`python3 -m pytest agent -q`)
- `web/`             the card page; build data with `python -m agent.card data/family-025 web/card.js`

## Run it
```
cp .env.example .env            # fill in the keys (MONID_API_KEY for the prior-work search)
python3 -m pytest agent -q      # 70 tests
python3 -m agent.run data/family-025 "Family 025: Short Egyptian fractions" agent37   # or: openai
python3 -m agent.server         # then open http://127.0.0.1:8765 (summary card, review copilot, chat)
```
See `docs/SUBMISSION.md` for the pitch and `docs/RESEARCH.md` for the research behind it.
