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
    "summary": "The Lean theorem adds a global expansion-existence conjunct. The paper mentions existence in the surrounding text, but it is not part of the theorem claim being audited.",
    "paper_quote": "The greedy algorithm shows that such expansions exist.",
    "lean_quote": "∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns"
   },
   {
    "severity": "note",
    "summary": "The Lean encoding uses naturals for positive integer numerators and denominators, a strictly increasing pairwise list for distinct ordered denominators, and rational coercions for the sum. These encode the paper's expansion conditions on the stated domain.",
    "paper_quote": "\\frac ab=\\frac1{n_1}+\\cdots+\\frac1{n_k},\n \\qquad 2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,",
    "lean_quote": "def IsExpansion (a b : ℕ) (ns : List ℕ) : Prop :=\n  ns.Pairwise (· < ·) ∧ (∀ n ∈ ns, 2 ≤ n) ∧\n    (ns.map (fun n => (1 : ℚ) / (n : ℚ))).sum = (a : ℚ) / (b : ℚ)"
   },
   {
    "severity": "note",
    "summary": "The paper does not specify a logarithm base, while `Real.log` is the natural logarithm. Changing a fixed logarithm base only changes the large-b bounds by constants and threshold, so this is equivalent for the stated existential asymptotic bounds.",
    "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
    "lean_quote": "c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
   }
  ],
  "rejected": [
   {
    "severity": "note",
    "summary": "`minLength` uses `sInf` to totalize the least length, including when no expansion exists. On the theorem's valid inputs, the added existence conjunct ensures the set is nonempty and `sInf` gives the least length.",
    "paper_quote": "let N(a,b) be the least k for which",
    "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
   },
   {
    "severity": "note",
    "summary": "`maxMinLength` takes a finite supremum over precisely the numerators 1 ≤ a < b; for b ≥ 2 this is the stated maximum. It is also totalized for an empty numerator range, which does not occur on the theorem's domain.",
    "paper_quote": "and put N(b)=\\max_{1\\le a<b}N(a,b).",
    "lean_quote": "noncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
   }
  ]
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
     "summary": "The Lean theorem adds an expansion-existence conjunct. This is stated in the paper's preceding text, but is not part of the theorem environment being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The definitions use totalized natural-number infimum and finite supremum. On the theorem's relevant range, the existence conjunct ensures the expansion sets are nonempty, and Finset.Ico 1 b ranges over exactly the numerators 1 ≤ a < b, so these definitions match the paper's least length and maximum.",
     "paper_quote": "let $N(a,b)$ be the least $k$ for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The Lean bounds are required for every b ≥ 2, rather than only for all b above a sufficiently large b₀. This is stronger and, as written, impossible: at b = 2, log(log 2) < 0, while the expansion-existence conjunct implies maxMinLength 2 ≥ 1. The paper avoids this by allowing b₀ to be sufficiently large.",
     "paper_quote": "for every\ninteger b\\ge b_0,",
     "lean_quote": "∃ b₀ : ℕ, 2 ≤ b₀ ∧\n      ∀ b : ℕ, 2 ≤ b →\n        c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
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
     "summary": "The Lean statement asserts the bounds for only one witness b, whereas the paper requires them for every b ≥ b₀. It therefore does not establish the theorem’s asymptotic bounds.",
     "paper_quote": "for every\ninteger $b\\ge b_0$",
     "lean_quote": "∃ b : ℕ, b₀ ≤ b ∧\n        c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The expansion-existence conjunct is an extra theorem conclusion, but the paper states this existence immediately before the theorem. On the valid domain, the natural-number `sInf` gives the least expansion length and the `Finset.Ico` supremum gives the maximum over 1 ≤ a < b; using ℕ rather than integers is equivalent there. The definitions are totalized outside that domain, where they need not represent the paper’s N(a,b) or N(b).",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧\n    ∃ c₁ c₂ : ℝ, 0 < c₁ ∧ 0 < c₂ ∧ ∃ b₀ : ℕ, 2 ≤ b₀ ∧"
    }
   ],
   "rejected": []
  },
  {
   "id": "log_upper",
   "description": "upper bound is log b instead of log log b",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "The upper bound is only O(log b), not the claimed O(log log b), so this statement does not establish the paper’s upper bound.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (b : ℝ)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds existence of expansions for every natural-number fraction with 1 ≤ a < b. The paper states this outside the theorem, so it is an extra conjunct rather than a missing part of the theorem claim.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The definitions use natural-number lists, `sInf`, and finite-set `sup` rather than the paper’s integer denominators and least/max terminology. On the theorem’s domain, the denominator restrictions match, and the added existence conjunct ensures the minimum is over a nonempty set; with b ≥ 2, the finite set of numerators is nonempty. Thus these definitions agree with the paper’s minimum and maximum there.",
     "paper_quote": "let N(a,b) be the least k for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ]
  },
  {
   "id": "drop_lower",
   "description": "lower bound removed",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "The Lean statement omits the theorem’s lower bound, so proving it would establish only the upper bound and not the claimed two-sided estimate.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds expansion existence as a conjunct. This is stated before the paper’s theorem, but is not part of the theorem claim being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The Lean upper bound is expressed using a finite supremum over numerators 1 ≤ a < b, which corresponds to the paper’s maximum N(b); thus it also gives the stated per-numerator upper bound. The sInf definition is totalized when no expansion exists, but the added existence conjunct ensures the relevant lengths are defined by nonempty sets.",
     "paper_quote": "In particular, the upper bound holds for every integer numerator\n$1\\le a<b$.",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
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
     "summary": "The Lean theorem adds expansion existence as a conjunct. This is outside the paper’s theorem environment, but the preceding text states it.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The definition permits denominator 1 syntactically, unlike the paper’s bound of 2. On the theorem’s domain, a positive sum containing 1 cannot equal a/b < 1, so this does not change the expansions being counted.",
     "paper_quote": "2\\le n_1<\\cdots<n_k",
     "lean_quote": "(∀ n ∈ ns, 1 ≤ n)"
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
     "summary": "Lean permits repeated denominators, while the paper requires strictly increasing, hence distinct, denominators. Its minimum can therefore be smaller than the paper’s N(a,b); in particular, the Lean upper bound does not establish the paper’s upper bound.",
     "paper_quote": "2\\le n_1<\\cdots<n_k",
     "lean_quote": "ns.Pairwise (· ≤ ·)"
    },
    {
     "severity": "note",
     "summary": "The Lean existence conjunct is an additional theorem conclusion; the paper states this fact before the theorem, outside the claim being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The infimum over natural-number lengths gives the least length when the witness set is nonempty; if it is empty, it is totalized to 0. The extra existence conjunct ensures nonemptiness for the valid numerator-denominator inputs. Likewise, the finite supremum agrees with the stated maximum for b ≥ 2, the range used by the theorem, though it is totalized when the range is empty.",
     "paper_quote": "let N(a,b) be the least k",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ]
  }
 ],
 "model": "default",
 "provider": "agent37",
 "seconds": 26.8
};
