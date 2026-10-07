# Research log (7 Oct 2026, during the hackathon)

What we looked at this afternoon, what we found, and which ideas we kept. Where this file
disagrees with DECISIONS.md, this file is newer.

## 1. What people say the problem is

Quick web pass, about ten minutes, read mostly through summaries. Check a quote before it
goes on a slide.

| Finding | Source |
|---|---|
| Digestion is the bottleneck: "drinking from a firehose. Humans cannot even digest this rate." | [OpenAI community thread](https://community.openai.com/t/first-look-at-mathematics-manuscripts-from-an-internal-frontier-model-at-openai/1403886/6) |
| The release "will take mathematicians months to parse through." | [Scientific American](https://www.scientificamerican.com/article/openai-unleashes-hundreds-more-math-results-upon-a-field-already-in-shock/) |
| 722 manuscripts, 372 families, 162 formalized papers giving 185 Lean main results. Most manuscripts have no formal proof. | [lean-genius issue #43839](https://github.com/rjwalters/lean-genius/issues/43839) |
| Statement audit is a known job done mostly by hand: is the Lean statement the conjecture, "or a weaker or restricted variant?" | same |
| Novelty is disputed: new ideas or "mostly mash-ups of existing techniques"? | Scientific American |
| Attribution is disputed: the forum poster says their 2005 work went uncited in the Navier-Stokes paper. | community thread |
| Replication cannot be checked: "We should ask for receipts." (Andrew Sutherland, MIT) | Scientific American |
| Human authors should supply intuitive explanations, plus prompts and formalization. | [arXiv 2608.29401](https://arxiv.org/abs/2608.29401) |
| Formal proofs outside Mathlib run to hundreds or thousands of lines; most departments do not follow formalization. | [NAS panel notes](https://web.mit.edu/~ywang02/www/blog/nas-formalization/posts/02-panel-landscape-and-challenges.html) |

Who is building what:
- Axiom Math (reported $64M seed, $200M Series A) and Math, Inc.: generation and
  autoformalization, not digestion.
- lean-genius: a crosswalk and audit of the OpenAI collection, manual, for its own gallery.
- The forum poster proposes a wiki with open comments, 0-100 ratings and rating-filtered
  search, plus AI as a first referee.

Where to read the other papers: https://github.com/openai/math (`preprints/`, `lean/docs/`,
`lean/ComparatorChallenges/`). `lean/docs/` has one short scope note per family.

## 2. What Family 025 actually looks like (measured, not guessed)

- About 11,400 words: 1 theorem, 14 lemmas, 2 propositions, 2 corollaries, 19 proofs.
- 74 labels and 119 cross-references. The paper is short but densely linked.
- Lean: a 27-line statement here; the proof is a main file plus 60 supporting files upstream.
- Our proof map (`agent/proofmap.py`): the main theorem depends on 10 of the 19 results. The
  other 9 serve the two corollaries. It rests directly on `lem:greedy`, `lem:distinct` and
  `prop:density`; the hard part sits under `prop:density`.
- Greedy expansion of 5/181 takes 5 terms with a 27-digit denominator. The 3-term expansion
  1/39 + 1/507 + 1/91767 is exact. So a greedy "pour" picture would show the opposite of the
  theorem; a picture needs a shortest-expansion search.

Conclusion for this paper: the reader is short of a map, not a summary. This is a sample of
one; the same measurement has not been run on the other families.

## 3. The trust ladder

Every line on a card is tagged with what backs it.
1. Kernel-checked: the Lean proof compiles, no `sorry`, only permitted axioms.
2. Recomputed: something we re-run with a fixed result (exact arithmetic, small cases).
3. Quoted: a machine-written sentence pinned to its source line.
4. Unbacked: model prose.

Rule: the headline and status may only use rungs 1 and 2. Three things stay with a human:
fidelity (does the formal statement say what the paper claims), novelty, significance.

Honest gap today: we hold the Lean statement only, so the card says "claimed by source, not
rebuilt here" rather than "Lean-checked".

## 4. Ideas considered

| Idea | Verdict | Why |
|---|---|---|
| Playable picture per paper (original plan) | Demoted | Weak fit for "agents you can sell"; greedy picture misleads. |
| Agent that signs into any account, pays, sets up keys | Set aside | Crowded, CAPTCHAs and 2FA, payments are a trust problem. Narrow `.env` provisioner was the only buildable form. |
| Review card for reviewers | **Kept** | Matches the stated pain; statement audit is done by hand today. |
| Deterministic proof map and spine | **Kept, built** | No model, same output every run, a chat agent does not give this. |
| Map as JSON for research and review harnesses | Kept | Same parser output; harnesses are the customer. |
| LLM condensing of proofs | Rejected | Rung 4; any chat agent does it. The spine is the condensed view. |
| Plain-language level and "learn more" from the bibliography | Later | Same card, second reading level. |
| Real-world applications panel | Rejected | Most results have none; a model will invent them. |
| Wiki with comments and ratings | Reframed | Comment sites exist; attention is scarce. The agent writes the first page of each entry, humans flag on top. |
| Prior-work panel (search) | Later | Supported by the novelty and attribution complaints. |
| General research workbench (literature mapping, LaTeX from sketches, counterexample engine, admin) | Vision only | Four products. The proof map is the seed of the first, the exact check of the third; the other two are what general agents already do. |

## 5. What exists in the repo

- `agent/proofmap.py`: LaTeX to dependency graph and spine. `python -m agent.proofmap <tex-dir>`.
- `agent/check.py`: exact check of an Egyptian-fraction expansion, mirroring `IsExpansion`.
- `agent/card.py`: builds the deterministic card. `python -m agent.card data/family-025 web/card.js`.
- `web/index.html`: renders the card (status, statement versus claim, worked example, proof map).
- `python3 -m pytest agent -q`: 15 tests.

Known limits of the map: edges come from `\ref`-style citations only; nested brackets in an
optional argument, `theorem*`, and `\cref`-family variants beyond `\ref`, `\eqref`, `\cref`,
`\Cref`, `\autoref` are not handled.

## 6. Not done

- No Agent37 or OpenAI call yet, so the entry is not eligible as it stands.
- No Supabase feed, no flag box, no demo video. The repo is still private.
- No customer has been asked. Buyers remain hypotheses (see REQUIREMENTS.md).

## 7. What mathematicians say they need (second pass)

Read through summaries; several attributions come from secondary pages. Verify before quoting.

Terence Tao ([views page](https://teorth.github.io/tao-web/ai-views.html),
[blog, 11 Sep 2026](https://terrytao.wordpress.com/2026/09/11/a-severe-misalignment-of-ai-in-mathematics/),
[OpenAI Academy talk](https://academy.openai.com/public/blogs/terence-tao-ai-is-ready-for-primetime-in-math-and-theoretical-physics-2026-03-06)):
- Five stages: generation, verification, exposition, publication, canonicalization. AI sped up
  the first two; exposition and digestion lag, so signal-to-noise falls.
- "verification certifies the formal statement, not that it matches intent". His safeguard:
  humans review theorem *statements*, with "unit tests" attached to catch misformalization.
  A run of suspiciously easy proofs is a sign the statement is wrong.
- Wants: formalization infrastructure, digestion rubrics and style guides, credit for whoever
  first explains a result, automated dependency graphs from papers (older IPAM-era remark,
  via [this collection](https://github.com/alreadydone/contents/discussions/6)).
- Uses AI for literature search, spot-checking calculations, and red-teaming his own work.
- Solving problems is "only a tool and proxy for" understanding; rushed releases leave no time
  for isolating new ideas or citing prior work.
- AI-written Lean proofs run hundreds of lines longer than human ones; reading them is the
  new bottleneck (reported from his IEANTN project).

Others:
- Kevin Buzzard: papers with adjustable levels of proof detail.
- Akshay Venkatesh: AI replacing long proofs with short overlooked ones.
- Andrew Sutherland: replication, "receipts".
- Max Weinreich ([arXiv 2608.02859](https://arxiv.org/abs/2608.02859)): total opposition. Some
  of the audience will reject the premise.
- An IAS-associated advisory group including Tao advises OpenAI on release coordination; it
  does not certify the results.

Existing evaluation work on statement fidelity:
- [ConsistencyCheck](https://huggingface.co/datasets/GuoxinChen/ConsistencyCheck): labelled
  natural-language/Lean 4 pairs from miniF2F and ProofNet.
- [arXiv 2606.31002](https://arxiv.org/abs/2606.31002): an agent reaches 89.5% compilation but
  60.5% faithfulness. Compiling is not the same as saying the right thing.

## 8. The agent we are building

**A statement auditor.** Input: a paper's LaTeX and its Lean statement. Output: a review card.

1. Parse the proof map (code, no model).
2. Model step: compare the paper's main theorem with the Lean statement and return structured
   flags. Each flag must quote the paper line and the Lean line it refers to.
3. Model step: propose unit tests for the statement, concrete instances the definitions
   should accept or reject.
4. Run those tests in code (exact arithmetic). The model proposes; code decides.
5. Write the card with every line tagged by rung. Runs unattended over a list of papers.

This is Tao's "review the statement, attach unit tests" safeguard, automated as a first pass.
It is not a platform, a summarizer, or a prover.

## 9. Evals

- Deterministic parts: ordinary unit tests (15 today).
- Model parts, small golden set by seeded defects: take a statement known to be faithful and
  write variants with one known defect each (drop `b0 <= b`, drop distinctness, allow n = 1,
  `log` for `log log`, flip an inequality, drop the lower bound). Labels are known by
  construction. Measure: defects caught, and false flags on the unmodified statement.
- Later: ConsistencyCheck for scale, lean-genius's manual audits as expert ground truth.
- Not measured, and not claimed: novelty, significance, whether the map helps a real reviewer.

## 10. First real runs (3:10 to 3:20 PM)

- OpenAI gpt-5.5, first prompt: 5 of 6 seeded changes flagged, none on the original. The one
  it declined to flag (denominator 1 allowed) was our labelling error: for a/b < 1 a term 1/1
  cannot occur, so the rewrite is equivalent. The model's reasoning was right.
- Repeat runs varied: the same prompt later raised false alarms on the equivalent rewrite and
  on the original. Model output is not deterministic; the card must keep saying so.
- We then defined "mismatch" as "proving the Lean statement would not establish the theorem",
  which also makes the stronger variant (b >= 2) a control rather than a defect.
- Final run on Agent37 (default managed model): 4 of 4 defects, 3 of 3 controls, 27 seconds,
  several flags discarded by the quote check.
- Caveat: seven cases, one paper, prompt and labels revised while looking at them. In-sample.
- Unexplained: the Supabase `papers` table held two rows we did not write ("TruckSplit
  (working name)", "decision"), inserted minutes before ours. The anon key allows inserts.
