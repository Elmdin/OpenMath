# The prover harness

A loop that takes a locked Lean 4 statement and drives an AI agent until Lean's own judge
accepts a proof of exactly that statement, or the loop gives up and says why.

```
python3 -m prover new   <Name> <statement.lean>   # set up a target; review and commit the statement
python3 -m prover loop  <Name>                    # run until proved / refuted / stalled / out of budget
python3 -m prover judge <Name> [--paranoid]       # the verdict, any time
python3 -m prover status
```

Setup once with `scripts/setup-lean.sh` (Lean 4.36.0, Mathlib v4.36.0, bubblewrap).

## The loop

```
          ┌────────────────────────────────────────────────────────────────┐
          │  measure   compile Solution.lean: errors, holes (sorry)        │
          │  judge     no errors and no holes → lake comparator (sandbox)  │──► proved
          │  work      fresh-context agent: notes + diagnostics + protocol │
          │  guard     restore Challenge.lean / comparator.json if touched │
          │  sweep     tactic portfolio on every remaining hole            │
          │  record    one line in ledger.jsonl                            │
          └──────────────────────────────┬─────────────────────────────────┘
                                         └─ repeat; stop on stall, budget, or a compiled refutation
```

The agent is any coding agent with a shell. The default is headless Claude Code
(`claude -p`); `--agent-command` swaps in anything that reads a prompt on stdin. What the
agent is told is in `prover/PROTOCOL.md`: informal proof first, then a compiling skeleton of
`sorry`'d lemmas, then the portfolio, then one hole at a time with a compile after every
edit, and try to refute a hole that resists.

## Why it is built this way

Each choice follows something measured in 2025–2026 work. Sources were read on 27 Nov 2026.

| Choice | Evidence |
|---|---|
| A plain loop with fast compiler feedback, not a search engine | h1: a single edit-compile loop reports 670/672 on PutnamBench and says the Lean interface "largely determines cost and solve rate" ([arXiv 2610.35962](https://arxiv.org/abs/2610.35962)). DeepMind's basic agent later matched its evolutionary one on the Erdős problems it solved ([arXiv 2605.22763](https://arxiv.org/abs/2605.22763)). |
| Fresh context each iteration, memory in `NOTES.md` | h1's ablation: summarising about every 10 turns beats both never and always (72 solves against 60 and 50). Numina needed a fresh-context subagent to finish Putnam 2025 A5 ([arXiv 2601.14027](https://arxiv.org/abs/2601.14027)). |
| Informal proof before Lean | Numina: 4 of 12 Putnam 2025 problems without an informal prover, 11 of 12 with. Hilbert reports the same ordering ([arXiv 2509.22819](https://arxiv.org/abs/2509.22819)). |
| Skeleton of `sorry`'d lemmas, then fill | Goedel-Architect on 200 Putnam problems: single agent about 55%, blueprint loop about 80% ([project page](https://goedelarchitect.github.io/)). Anthropic's FLT formalization only worked once it used a statement graph ([write-up](https://www.anthropic.com/research/formalizing-fermats-last-theorem)). |
| Automation sweep before the model works on a hole | APOLLO and the `lean4-skills` cascade (`rfl → simp → ring → linarith → nlinarith → omega → exact? → grind → aesop`) ([repo](https://github.com/cameronfreer/lean4-skills)). |
| Try to refute a stubborn hole | Aristotle gives every goal a negation branch ([arXiv 2510.01346](https://arxiv.org/abs/2510.01346)); Seed-Prover 1.5 re-plans on disproof ([arXiv 2512.17260](https://arxiv.org/abs/2512.17260)). |
| Search Mathlib, import all of it | Removing search drops h1 from 69 to 49 on Putnam100; 42% of one system's failed compiles were bad imports (h1 paper). |
| Statement locked, judge outside the agent | Every serious system validates against the original statement; Lean now ships the tool for it (`lake comparator`, in core since 4.35). |

Not built, on purpose: tree search, trained provers, parallel workers on one target. The
evidence says they matter for weaker models or much longer proofs; they can be added when a
target needs them.

## What "proved" means here

A target counts as proved only when `lake comparator` accepts it. Run in a bubblewrap
sandbox, it rebuilds both files and checks that

1. the solution's theorem is the same kernel term as the challenge's, and so is every
   definition underneath it;
2. the proof uses no axiom beyond `propext`, `Quot.sound`, `Classical.choice`;
3. the kernel accepts the proof when it is replayed from an export.

`--paranoid` adds Lean's other bundled kernels. The harness adds two things around it:
the challenge and judge config are hash-locked for the run (and compared with git when
committed), and a source lint rejects the obvious shortcuts a minute sooner.

What no tool checks: whether the locked statement says what you meant. That stays with a
person. The practice the harness supports is the one Tao and the AlphaProof team describe:
put small `example` sanity checks next to the definitions in the challenge file, and treat a
suspiciously quick proof as a sign the statement is wrong.

## Evidence that it works

### The judge rejects cheats

`python3 -m prover.selftest` judges ten "proofs" of one small theorem: one honest, nine
cheating in different ways. Results are in `docs/evidence/judge-selftest.json`.

| Case | Compiles cleanly | Caught by source lint | Comparator | What the comparator said |
|---|---|---|---|---|
| honest proof | yes | n/a | **accepted** | "Your solution is okay!" |
| `sorry` | yes | yes | rejected | illegal axiom `sorryAx` |
| helper lemma with `sorry` | yes | yes | rejected | illegal axiom `sorryAx` |
| new `axiom` | yes | yes | rejected | illegal axiom `Smoke.tri_fact` |
| `native_decide` | yes | yes | rejected | illegal axiom `…native_decide.ax_1_1` |
| weaker statement (extra hypothesis) | yes | no | rejected | statement does not match |
| changed definition underneath | yes | no | rejected | constant `Smoke.tri` does not match |
| local instance that redefines `*` before the statement (source text identical, proof is `rfl`) | yes | no | rejected | statement does not match |
| theorem proved under another name | yes | no | rejected | export aborted: theorem not found |
| declaration added to the environment without a kernel check (`#print axioms` reports it clean) | yes | no | rejected | kernel rejected it on replay |

10 of 10 calls correct. Every cheat compiles without an error, and five get past the source
lint; the comparator catches all nine on its own. The last row is the one to remember:
compiling plus `#print axioms` is not a proof check.

### The loop proves things unattended

`python3 -m prover.bench` runs the whole loop on five statements with nobody in between.
Results are in `docs/evidence/calibration.json`; the proofs are in `lean/Targets/Cal*/`.

| Target | Statement | Outcome | Worker iterations | Wall time | Cost |
|---|---|---|---|---|---|
| `CalGcd` | IMO 1959 P1: gcd(21n+4, 14n+3) = 1 | proved | 1 | 1.8 min | $0.34 |
| `CalPow` | IMO 1964 P1(b): 7 never divides 2^n + 1 | proved | 1 | 1.7 min | $0.30 |
| `CalNesbitt` | Nesbitt's inequality | proved | 1 | 2.2 min | $0.33 |
| `CalFibSubsets` | subsets of {0..n-1} with no two consecutive members number fib(n+2) (written for this run) | proved, 101 lines, two helper lemmas | 1 | 2.3 min | $0.47 |
| `CalFalse` | n² + n + 41 is always prime (false on purpose) | refuted at n = 40, not proved | 1 | 1.3 min | $0.31 |

5 of 5 as expected, $1.75 in total. Limits of this evidence: every target fell in the first
iteration, so the carry-over between iterations (notes, portfolio sweep, stall stop) has
unit tests but has not yet been needed in a real run. A refutation is compiled and checked
for holes, but whether it negates the right statement is left to a person.

What this does and does not show: the loop turns a statement into a judge-accepted proof with
no human step, and it reports a false statement instead of proving it. Four of the five are
well-known results a model may have seen; they calibrate the machinery, not the
mathematics. The first real target is the test of that.

### First real target: Erdős 282, Fibonacci variant

Fibonacci's greedy Egyptian-fraction algorithm terminates for every rational in (0, 1).
Definition and statement are copied from google-deepmind/formal-conjectures
(`FormalConjectures/ErdosProblems/282.lean`, commit f606af1), where the theorem stood as
`sorry`. The loop proved it in one worker iteration: 11 minutes, $0.74, 142 lines
(`lean/Targets/Erdos282Fibonacci/Solution.lean`). `lake comparator --paranoid` accepts it,
so every kernel bundled with Lean 4.36 agrees.

Not yet done: the proof is on Lean 4.36 / Mathlib v4.36.0 and formal-conjectures is on Lean
4.33.1, so it has not been built there, and nothing has been sent upstream.

## Layout

- `prover/lean.py` compile a file, parse diagnostics; caps concurrent Lean processes
- `prover/auto.py`, `lean/OpenMath/Auto.lean` the tactic portfolio
- `prover/judge.py` locks, lint, comparator
- `prover/loop.py`, `prover/PROTOCOL.md` the loop and what the agent is told
- `prover/target.py` target layout: `lean/Targets/<Name>/{Challenge,Solution}.lean`, `comparator.json`, `NOTES.md`, `ledger.jsonl`
- `prover/selftest/`, `prover/bench.py`, `bench/statements/` the evidence runs
