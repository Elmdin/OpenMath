# Submission form answers

Paste into the Google Form. Deadline 4:40 PM PDT. Blanks are yours to fill.

**Project name**
OpenMath: the statement auditor

**Team name and member names**
______

**Team lead contact email**
______

**What does your agent do, and which workflow does it improve?**
OpenMath does the referee's first pass on a machine-written mathematics paper, unattended.
Labs now release AI-generated proofs by the hundred (OpenAI published 722 manuscripts this
week), and a proof checker like Lean only confirms the formal statement, not that the
statement says what the paper claims. Today a mathematician checks that by hand, clause by
clause, and works out which lemmas the headline theorem really rests on.

Given a paper's LaTeX and its Lean statement, the agent:
1. Builds a dependency map of the proof (on our test paper the main theorem needs 10 of 19 results).
2. Audits the Lean statement against the paper's theorem and raises flags. Code discards any
   flag whose quotes are not verbatim in the sources.
3. Recomputes the worked example and searches 19,900 small cases in exact arithmetic.
4. Searches for prior work and marks which results the paper does not cite.
   It also writes a reviewer's note for each of the 19 results: what the step does and what to
   check, each point quoting the proof (44 grounded points; 8 dropped for misquoting).
5. Scores itself by planting known defects in the statement and counting what it catches
   (latest runs: 4 of 4 defects caught, 3 of 3 controls left alone; a seven-case smoke test,
   and results vary between runs).
6. Publishes a summary card and a review copilot: a guided path through the proof with the
   agent's notes, an interactive picture of the theorem, and progress ticks beside each step.

The reviewer keeps the judgement: the card shows what was checked, by what, and what is left.
One paper takes about a minute. Buyers: labs publishing machine-proved results, journals
receiving them, and audit projects doing this by hand. Not yet validated with a customer.

**Demo video URL**
______

**Live project, GitHub, or additional Drive links**
https://github.com/Elmdin/OpenMath

**Describe your Agent37 Cloud API integration and any OpenAI, Supabase, InstaCloud, or Monid integrations**
- Agent37 Cloud API: the worker. We create a hosted Hermes instance through
  `POST /v1/instances`, wait on `/v1/health`, and run every audit turn (26 per paper:
  7 for the audit and its self-evaluation, 19 for the per-result reviewer's notes) through `POST /v1/responses` on the instance. Code:
  `agent/agent37.py`. A full run completes in about a minute.
- Supabase: every finished card, with its audit, self-evaluation and prior-work results, is
  inserted into a `papers` table through the REST API. Code: `agent/publish.py`, `supabase/schema.sql`.
- Monid: prior-work search. The agent calls Monid's `/v1/run` (routed to Exa) with a query
  built from the paper's title and abstract, then cross-checks the hits against the paper's
  bibliography. Code: `agent/priorwork.py`.
- OpenAI: an alternative audit model (gpt-5.5) behind the same interface, used for our first
  evaluation runs. Code: `agent/openai_model.py`; run with `python -m agent.run ... openai`.
- InstaCloud: not used.

## Checklist before submitting
- [ ] Repo is public and opens without sign-in
- [ ] Demo video link is viewable by anyone with the link
- [ ] Team names and lead email filled in
- [ ] Submitted before 4:40 PM

## What we do not claim (keep the pitch honest)
- That we verify proofs. We did not rebuild the Lean proof.
- That it works on any paper. One paper so far.
- That a flag or an uncited search hit is a finding. Each is a prompt for a reader.
- A measured time saving. No reviewer has been timed.
