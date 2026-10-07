# Submission sheet

Fill the blanks, then paste into the form. Deadline 4:40 PM.

- **Project:** OpenMath, a statement auditor for machine-written mathematics
- **Team members:** ______
- **Repo / live link:** https://github.com/Elmdin/OpenMath (must be public before submitting)
- **Demo video link:** ______

## The workflow replaced
A reviewer handed a machine-written maths paper with a Lean proof has to work out, by hand:
which results the headline theorem actually rests on, whether the formal statement says what
the paper claims, and whether the claim survives small cases. For OpenAI's release of 722
manuscripts this is being done manually today. Our agent does the first pass unattended and
hands the reviewer a card showing what was checked, by what, and what is left for a human.

## How the agent works
1. Parses the paper's LaTeX into a dependency map (code). Family 025: the main theorem needs
   10 of 19 results.
2. A model compares the Lean statement with the paper's claim and raises flags. Code keeps a
   flag only if both of its quotes occur verbatim in the sources.
3. Recomputes the worked example and searches 19,900 small cases exhaustively (exact arithmetic).
4. Scores itself: we plant known changes in the Lean statement and re-run the audit. Latest run
   on Agent37: 4 of 4 real defects caught, 3 of 3 controls left alone (the original, an
   equivalent rewrite, and a stronger statement). Seven cases, one paper, and the prompt and
   labels were adjusted while looking at these cases, so this is a smoke test, not a benchmark.
5. Writes the card with every panel tagged by what backs it.

## Time saved
Not measured with a reviewer. What we can state: the full pipeline runs unattended in about 30 seconds on
this paper, and the map removes 9 of 19 results from the reading needed for the main theorem.

## Sponsor integrations
- **OpenAI:** alternative audit model (gpt-5.5) behind the same interface: `python -m agent.run ... openai`. Working.
- **Agent37:** the worker. A hosted Hermes instance runs all 7 audit turns per paper
  (`agent/agent37.py`). Working: full run completed in 27 seconds.
- **Supabase:** every finished card and its self-evaluation is inserted into `papers`
  (`agent/publish.py`). Working: rows are written on each run. The page does not read the feed yet.

## Judging criteria, and our answer
- **Originality:** not a summarizer or a prover. It audits the one thing a proof checker cannot:
  whether the formal statement matches the claim, and it measures its own reliability.
- **Business use case:** labs publishing machine-proved results, journals receiving them, and
  audit projects doing this by hand. A generator cannot credibly audit itself. Not yet
  validated with a customer.
- **Working prototype:** `python3 -m pytest agent -q`; `python -m agent.card data/family-025 web/card.js`;
  `python -m agent.run data/family-025 "Family 025" agent37`; open `web/index.html` via a local server.
- **User experience:** one page, "At a glance" first, every panel labelled with its evidence.

## What we do not claim
- That we verify proofs. We did not rebuild the Lean proof.
- That it works on any paper. One paper, one family of defects.
- That a flag is a finding. It is a prompt for a reader.
