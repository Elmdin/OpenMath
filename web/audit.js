window.AUDIT = {
 "total": 4,
 "caught": 4,
 "controls": 3,
 "controls_clean": 3,
 "false_flag_on_original": false,
 "original": {
  "flags": [
   {
    "severity": "note",
    "summary": "The Lean theorem adds a global existence conjunct. This is stronger than the theorem environment requires; the paper does state existence in the preceding prose, outside that theorem.",
    "paper_quote": "The greedy algorithm shows that such expansions exist.",
    "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
   },
   {
    "severity": "note",
    "summary": "The definitions are totalized: `sInf` gives a natural-number value even when there is no expansion, and the finite supremum is also defined for an empty range. The added existence conjunct ensures `minLength` is the least expansion length on the numerator range used when b ≥ 2; that range is nonempty there, so the supremum matches the paper’s maximum.",
    "paper_quote": "let N(a,b) be the least k",
    "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
   },
   {
    "severity": "note",
    "summary": "Lean requires the threshold b₀ to be at least 2, whereas the paper does not state that restriction. This is equivalent for the asymptotic claim because the threshold can be increased.",
    "paper_quote": "There are absolute constants $c_1,c_2>0$ and $b_0$ such that, for every\ninteger $b\\ge b_0$,",
    "lean_quote": "∃ b₀ : ℕ, 2 ≤ b₀ ∧"
   }
  ],
  "rejected": []
 },
 "results": [
  {
   "id": "drop_threshold",
   "description": "holds for every b >= 2 (stronger: still implies the theorem)",
   "is_defect": false,
   "caught": false,
   "flags": [
    {
     "severity": "note",
     "summary": "The Lean bounds apply to every b ≥ 2; the existential b₀ is not used to restrict their domain. This is stronger than the paper’s eventual bound, so it would imply that bound, but the added range makes the Lean statement false at b = 2: log(log 2) is negative while maxMinLength is nonnegative.",
     "paper_quote": "for every\ninteger $b\\ge b_0$",
     "lean_quote": "∃ b₀ : ℕ, 2 ≤ b₀ ∧\n      ∀ b : ℕ, 2 ≤ b →\n        c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The Lean statement adds expansion existence as a conjunct. That fact is stated in the paper’s surrounding text, but is not part of the theorem environment being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The definitions totalize minLength and maxMinLength outside the paper’s stated domains: sInf over no expansions and a supremum over an empty interval have natural-number defaults. On the theorem’s valid inputs, the added existence conjunct ensures the minimum is over a nonempty set, and b ≥ 2 makes the interval nonempty. The finite supremum over 1 ≤ a < b represents the paper’s maximum; its upper bound also gives the stated per-numerator upper bound.",
     "paper_quote": "let $N(a,b)$ be the least $k$ for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ]
  },
  {
   "id": "exists_b",
   "description": "holds for some b instead of all large b",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "The Lean statement gives both inequalities for only one existentially chosen b. The paper requires them for every integer b ≥ b₀; consequently the Lean statement also does not establish the stated upper bound for every numerator.",
     "paper_quote": "for every\ninteger b\\ge b_0,\n\\[\n c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.\n\\]\nIn particular, the upper bound holds for every integer numerator\n$1\\le a<b$.",
     "lean_quote": "∃ b : ℕ, b₀ ≤ b ∧\n        c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The Lean statement adds universal existence of expansions as a conjunct. This is stated in the paper’s preceding text, outside the theorem environment.",
     "paper_quote": "The greedy algorithm shows that such\nexpansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The definitions totalize edge cases: `sInf` gives a value even when no expansion exists, and the empty finite supremum also has a value. On the intended domain b ≥ 2 and 1 ≤ a < b, the expansion-existence conjunct ensures the minimum is over a nonempty set, and the finite supremum ranges over the paper’s numerators.",
     "paper_quote": "let N(b) be the maximum of N(a,b) over 1\\le a<b.",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ]
  },
  {
   "id": "log_upper",
   "description": "upper bound is log b instead of log log b",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "The Lean upper bound is only O(log b), not the paper’s O(log log b), so it does not establish the stated upper bound.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (b : ℝ)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds an existence conjunct. The paper mentions this fact before the theorem, but it is not part of the theorem environment being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The Lean functions are totalized over all naturals, whereas the paper defines these quantities only on the stated ranges. On the theorem’s domain, the infimum and finite supremum encode the least length and maximum; outside it, the definitions still return values (including 0 for empty sets).",
     "paper_quote": "For integers\n$1\\le a<b$, let $N(a,b)$ be the least $k$",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ],
   "rejected": []
  },
  {
   "id": "drop_lower",
   "description": "lower bound removed",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "The Lean statement omits the theorem’s lower bound; the positive existential for c₁ is unused, so the Lean upper bound alone does not establish the claimed two-sided estimate.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The Lean statement adds expansion existence for every positive proper fraction. This is outside the theorem environment, though the paper states it in the preceding text.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "minLength is defined by a natural-number sInf, so it is totalized (with value 0 when the set is empty), unlike the paper’s least-length definition on 1 ≤ a < b. The added existence conjunct ensures the relevant sets are nonempty on the theorem’s domain.",
     "paper_quote": "let N(a,b) be the least k for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
    }
   ],
   "rejected": []
  },
  {
   "id": "allow_one",
   "description": "denominator 1 allowed (equivalent, since a/b < 1)",
   "is_defect": false,
   "caught": false,
   "flags": [
    {
     "severity": "note",
     "summary": "Lean permits denominator 1, unlike the paper’s stated denominator bound. On the theorem’s domain, an expansion containing 1 would sum to at least 1, whereas a/b<1, so this does not change the expansions being counted.",
     "paper_quote": "2\\le n_1<\\cdots<n_k",
     "lean_quote": "(∀ n ∈ ns, 1 ≤ n)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds an existence-of-expansion conjunct beyond the theorem environment. The paper states this separately before the theorem, rather than including it in the theorem’s claim.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The Lean definitions are totalized: minLength uses sInf even when no expansion exists, and maxMinLength uses a finite supremum even when the range is empty. These cases do not affect the theorem’s domain, where existence is asserted and b≥b₀≥2 makes the numerator range nonempty.",
     "paper_quote": "and put $N(b)=\\max_{1\\le a<b}N(a,b)$.",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ],
   "rejected": []
  },
  {
   "id": "not_distinct",
   "description": "repeated denominators allowed",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "Lean permits repeated denominators: `Pairwise (· ≤ ·)` requires only nondecreasing order, whereas the paper requires strictly increasing denominators. Thus Lean’s minimum lengths can be smaller, and its lower bound does not establish the paper’s lower bound for distinct-denominator expansions.",
     "paper_quote": "2\\le n_1<\\cdots<n_k",
     "lean_quote": "ns.Pairwise (· ≤ ·)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds an existence conjunct. It concerns Lean’s `IsExpansion` notion and asserts existence for every positive proper fraction; the paper’s theorem environment does not include this conjunct (though existence is stated in the surrounding text).",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The definitions are totalized: `sInf` supplies a value even if no expansion exists, and finite `sup` supplies a value for an empty index set. On the theorem’s range, `b ≥ b₀ ≥ 2` makes the numerator index set nonempty, and the added existence conjunct makes the Lean expansion sets nonempty for those numerators. The `Ico 1 b` range otherwise matches `1 ≤ a < b`.",
     "paper_quote": "let N(a,b) be the least k",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ],
   "rejected": []
  }
 ],
 "model": "default",
 "provider": "agent37",
 "seconds": 27.7
};
