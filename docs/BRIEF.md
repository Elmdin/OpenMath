# First paper: Short Egyptian fractions (OpenAI Family 025)

## The claim
Write a/b (1 <= a < b) as a sum of distinct unit fractions 1/n. Let N(b) be the worst case,
over all a, of the fewest terms needed. Then for all sufficiently large b:

    c1 * log log b  <=  N(b)  <=  c2 * log log b

This settles Erdos Problem 304. The lower bound is Erdos 1950; the new part is the upper bound.
Previous best: Vose 1985, sqrt(log b).

## Status label
Lean-checked. The Lean statement (`data/family-025/ShortEgyptianFractions.lean`) matches the
paper's Theorem 1: existence for all a < b, plus two constants and a threshold b0.
Caveats to state honestly:
- "sufficiently large b": b0 and the constants are not given explicitly in the statement.
- The repo's top-level summary line says "every rational a/b"; the theorem itself needs b >= b0
  for the length bound.

## The picture
A glass filled to a/b. Cups of size 1/2, 1/3, 1/4, ... each usable once. Pour until the glass
is exactly empty. Counter: cups used. Slider: b. The point the user should feel: the number of
cups needed barely grows as b explodes (log log b).

## Self-check
Exact rational arithmetic: the chosen 1/n values are distinct, n >= 2, and sum to a/b.
Example from our notes: 5/181 = 1/39 + 1/507 + 1/91767.

## What we will NOT claim
- That we verify proofs. We report the repo's status.
- That it works on any paper. One simulation type today.
- That the greedy pour is the paper's method. Greedy gives existence, not the log log bound.

## Demo script (2 minutes)
1. The problem: 722 AI papers, nobody has made them understandable.
2. Run the agent on Family 025 live, untouched.
3. Play with the picture; show the self-check passing.
4. Show the status label and the two caveats.
5. One line: generation is automated, checking is automated, explaining was not.
