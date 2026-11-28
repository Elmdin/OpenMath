#!/usr/bin/env bash
# One-time setup for the prover harness: Lean (via elan), the Mathlib build cache, and
# bubblewrap for the comparator sandbox. Safe to run again.
set -euo pipefail
cd "$(dirname "$0")/../lean"
if ! command -v bwrap >/dev/null; then
  (apt-get update -qq && apt-get install -y -qq bubblewrap) || echo "install bubblewrap by hand: the judge needs it"
fi
if [ ! -x "$HOME/.elan/bin/elan" ]; then
  curl -sSfL https://raw.githubusercontent.com/leanprover/elan/master/elan-init.sh | sh -s -- -y --default-toolchain none
fi
export PATH="$HOME/.elan/bin:$PATH"
lake exe cache get          # prebuilt Mathlib, about 7 GB
lake build OpenMath.Auto    # the tactic portfolio used by `prover auto`
