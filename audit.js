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
    "summary": "The Lean theorem adds expansion existence for every valid natural-number numerator and denominator. This is extra to the paper’s theorem, though the paper states it separately before the theorem.",
    "paper_quote": "The greedy algorithm shows that such expansions exist.",
    "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
   },
   {
    "severity": "note",
    "summary": "`minLength` is totalized: as a natural-number `sInf`, it returns 0 if no expansion exists. The added existence conjunct ensures this does not affect the numerator-denominator range used in the theorem.",
    "paper_quote": "let $N(a,b)$ be the least $k$ for which",
    "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
   },
   {
    "severity": "note",
    "summary": "The maximum is expressed as a finset supremum over numerators in `[1,b)`. For the theorem’s range `b ≥ 2`, this is the paper’s maximum; the supremum also totalizes the empty range outside that domain.",
    "paper_quote": "and put $N(b)=\\max_{1\\le a<b}N(a,b)$.",
    "lean_quote": "noncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
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
     "summary": "The Lean theorem adds an expansion-existence conjunct. It is stated in the paper’s surrounding text, but not in the theorem environment being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The inequalities are required for every b ≥ 2, not merely every b ≥ b₀. This is stronger; b₀ is otherwise unused in the bound. The lower bound b₀ ≥ 2 is compatible with the paper.",
     "paper_quote": "for every\ninteger $b\\ge b_0$,",
     "lean_quote": "∃ b₀ : ℕ, 2 ≤ b₀ ∧\n      ∀ b : ℕ, 2 ≤ b →\n        c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "On the theorem’s domain, the definitions match the paper’s least length and maximum: the existence conjunct ensures the sInf is over a nonempty set, and Ico 1 b indexes exactly the allowed numerators. Outside that domain the Lean definitions are totalized, whereas the paper defines these quantities only for the stated ranges.",
     "paper_quote": "For integers $1\\le a<b$, let $N(a,b)$ be the least $k$ for which\n\\[\n \\frac ab=\\frac1{n_1}+\\cdots+\\frac1{n_k},\n \\qquad 2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,\n\\]\nand put $N(b)=\\max_{1\\le a<b}N(a,b)$.",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ],
   "rejected": []
  },
  {
   "id": "exists_b",
   "description": "holds for some b instead of all large b",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "The paper asserts both bounds for every integer b above a fixed threshold. Lean asserts them only for one existentially chosen b, so it does not establish the asymptotic theorem.",
     "paper_quote": "for every\ninteger b\\ge b_0,",
     "lean_quote": "∃ b : ℕ, b₀ ≤ b ∧\n        c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "Lean adds an expansion-existence conjunct. This is stated in the paper's surrounding text, though it is not part of the theorem environment being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "`minLength` uses `Nat.sInf`, which is totalized (the infimum of an empty set is 0). The added existence conjunct ensures the set of lengths is nonempty for the theorem's valid numerator-denominator pairs, so there it represents the least length as in the paper.",
     "paper_quote": "let N(a,b) be the least k for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
    },
    {
     "severity": "note",
     "summary": "`maxMinLength` is a supremum over `Finset.Ico 1 b`, i.e. numerators 1 through b−1. For b≥2 this is the stated maximum over valid numerators; the theorem's threshold requires b₀≥2. The empty-set totalization outside that range does not affect the theorem domain.",
     "paper_quote": "and put $N(b)=\\max_{1\\le a<b}N(a,b)$.",
     "lean_quote": "noncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    },
    {
     "severity": "note",
     "summary": "The Lean encoding uses naturals for denominators, requires them to be at least 2, orders them pairwise strictly, and sums their rational reciprocals. This represents the paper's integer denominators and distinct increasing reciprocal expansion.",
     "paper_quote": "2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,",
     "lean_quote": "def IsExpansion (a b : ℕ) (ns : List ℕ) : Prop :=\n  ns.Pairwise (· < ·) ∧ (∀ n ∈ ns, 2 ≤ n) ∧\n    (ns.map (fun n => (1 : ℚ) / (n : ℚ))).sum = (a : ℚ) / (b : ℚ)"
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
     "summary": "The upper bound is only by log b, not log log b as in the paper. This weaker bound does not establish the theorem’s stated upper bound, including its consequence for each numerator.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (b : ℝ)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds an expansion-existence conjunct. It is stated in the paper’s surrounding text, but is not part of the theorem environment under audit.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The definitions are totalized outside the valid domains: minLength uses sInf even when there is no expansion, and maxMinLength uses a supremum over an empty interval for b ≤ 1. The theorem’s threshold and existence conjunct make these cases irrelevant to its asserted bounds.",
     "paper_quote": "For integers $1\\le a<b$, let $N(a,b)$ be the least $k$",
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
     "summary": "The Lean statement omits the theorem’s lower bound. The positive constant c₁ is introduced but is not related to maxMinLength, so the Lean statement does not establish the claimed two-sided estimate.",
     "paper_quote": "c_1\\log\\log b\\le N(b)",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The Lean statement adds an expansion-existence conjunct. This is stated in the paper’s preceding text, outside the theorem environment.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The Lean definitions are totalized: minLength uses sInf (which is 0 when there are no expansion lengths), and maxMinLength uses a finite supremum (0 on an empty range). On the theorem’s domain, the added existence conjunct and b₀ ≥ 2 ensure these definitions represent the intended minimum and maximum.",
     "paper_quote": "For integers 1≤a<b, let N(a,b) be the least k for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ]
  },
  {
   "id": "allow_one",
   "description": "denominator 1 allowed (equivalent, since a/b < 1)",
   "is_defect": false,
   "caught": false,
   "flags": [
    {
     "severity": "note",
     "summary": "Lean permits denominator 1, unlike the paper’s definition. This does not change expansions for 1 ≤ a < b: every summand is positive, so an expansion containing 1 would sum to at least 1, while a/b < 1. Using ℕ rather than ℤ for denominators is likewise equivalent here because the paper requires them to be at least 2.",
     "paper_quote": "2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z",
     "lean_quote": "(∀ n ∈ ns, 1 ≤ n)"
    },
    {
     "severity": "note",
     "summary": "The Lean statement adds existence of expansions for every valid numerator and denominator. This is stated in the paper’s preceding text, outside the theorem environment, rather than in the theorem claim itself.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "Lean defines the minimum using sInf, which is totalized (and gives 0 for an empty set). On the relevant domain the added existence conjunct makes the set nonempty, so this agrees with the paper’s least length.",
     "paper_quote": "let N(a,b) be the least k",
     "lean_quote": "sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
    },
    {
     "severity": "note",
     "summary": "Lean defines the maximum with Finset.sup, which is totalized (and gives 0 for an empty finset). For b ≥ b₀ ≥ 2, the index set is nonempty and contains exactly the numerators 1 ≤ a < b, so it agrees with the paper’s maximum on the theorem’s domain.",
     "paper_quote": "N(b)=\\max_{1\\le a<b}N(a,b).",
     "lean_quote": "(Finset.Ico 1 b).sup (fun a => minLength a b)"
    },
    {
     "severity": "note",
     "summary": "The Lean formulation uses real-valued logarithms of the natural-number argument cast to ℝ. This is the usual interpretation of the paper’s log log b and is equivalent on the stated domain.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧"
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
     "summary": "The Lean predicate permits repeated denominators: `Pairwise (· ≤ ·)` allows equality, while the paper requires distinct denominators. Thus `minLength` and `maxMinLength` measure expansions that may be shorter than the paper’s, so their bounds do not establish the theorem’s bounds.",
     "paper_quote": "a finite\nsum of distinct reciprocals of positive integers.",
     "lean_quote": "ns.Pairwise (· ≤ ·) ∧ (∀ n ∈ ns, 2 ≤ n)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds an existence conjunct. The paper states existence before the theorem, but the Lean predicate in this conjunct still allows repeated denominators, so it is not exactly the paper’s existence statement.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The paper uses integers while Lean uses naturals. On the theorem’s positive domain these represent the same numerators and denominators; the `Ico 1 b` range likewise selects exactly the eligible numerators.",
     "paper_quote": "For integers $1\\le a<b$",
     "lean_quote": "(Finset.Ico 1 b).sup (fun a => minLength a b)"
    },
    {
     "severity": "note",
     "summary": "The Lean definitions are totalized outside the paper’s domain: `sInf` of an empty set and `sup` over an empty finset give zero in ℕ. The theorem’s threshold ensures the relevant numerator range is nonempty, and its existence conjunct ensures the relevant `minLength` sets are nonempty.",
     "paper_quote": "$N(b)=\\max_{1\\le a<b}N(a,b).$",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ],
   "rejected": []
  }
 ],
 "model": "default",
 "provider": "agent37",
 "seconds": 31.2
};
