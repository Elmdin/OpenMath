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
    "summary": "The Lean statement adds existence of an expansion for every natural-number fraction with 1 ≤ a < b. This is an extra conjunct beyond the theorem environment, though the paper states the existence fact in the preceding text.",
    "paper_quote": "The greedy algorithm shows that such expansions exist.",
    "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
   },
   {
    "severity": "note",
    "summary": "The Lean statement bounds the maximum rather than separately stating the per-numerator upper bound. On the specified domain, that maximum bound entails the paper's stated individual upper bound. Real.log is the natural logarithm; using another fixed logarithm base would only change the comparison constants for sufficiently large b.",
    "paper_quote": "In particular, the upper bound holds for every integer numerator\n$1\\le a<b$.",
    "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
   }
  ],
  "rejected": [
   {
    "severity": "note",
    "summary": "On the theorem's domain, the definitions match the paper's minimum length and maximum: existence makes the natural-number sInf equal the least expansion length, and for b ≥ 2 the Finset supremum ranges over exactly 1 ≤ a < b. Outside that domain, minLength is totalized (sInf of an empty set is 0), and the supremum may be over an empty set; these cases do not affect the stated bounds.",
    "paper_quote": "let N(a,b) be the least k for which",
    "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ := sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ := (Finset.Ico 1 b).sup (fun a => minLength a b)"
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
     "summary": "The Lean theorem adds expansion existence for every positive numerator and denominator pair. The paper states this before the theorem, not inside it.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The bound is required for every b ≥ 2, rather than only for b above the threshold b₀; b₀ is existentially bound but unused in the universal condition. This is stronger than the paper’s range, but makes the Lean statement false already at b = 2: log(log 2) is negative, while maxMinLength is nonnegative and c₂ is positive.",
     "paper_quote": "for every\ninteger $b\\ge b_0$,",
     "lean_quote": "∃ b₀ : ℕ, 2 ≤ b₀ ∧\n      ∀ b : ℕ, 2 ≤ b →"
    },
    {
     "severity": "note",
     "summary": "The definitions match the paper’s least expansion length and maximum over numerators on the stated domain: the existence conjunct makes each relevant sInf set nonempty, and b ≥ 2 makes the finite supremum range nonempty. Outside those conditions, sInf and Finset.sup are totalized definitions, but that does not change the claim on the theorem’s domain.",
     "paper_quote": "let $N(a,b)$ be the least $k$ for which\n\\[\n \\frac ab=\\frac1{n_1}+\\cdots+\\frac1{n_k},\n \\qquad 2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,\n\\]\nand put $N(b)=\\max_{1\\le a<b}N(a,b)$.",
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
     "summary": "The paper asserts both bounds for every integer b ≥ b₀, while Lean asserts them for only one witness b. Proving the Lean statement would not establish the asymptotic theorem.",
     "paper_quote": "for every\ninteger $b\\ge b_0$,",
     "lean_quote": "∃ b : ℕ, b₀ ≤ b ∧"
    },
    {
     "severity": "note",
     "summary": "Lean adds an expansion-existence conjunct. This is stated in the paper’s preceding prose, but it is not part of the theorem environment being audited.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The definitions match the paper’s minimum length and maximum over numerators on the relevant domain: the ordered list represents distinct increasing denominators, and `Finset.Ico 1 b` ranges over 1 ≤ a < b. `sInf` totalizes the minimum as 0 if the set of lengths is empty, but the added existence conjunct rules that out for the fractions in this range.",
     "paper_quote": "let $N(a,b)$ be the least $k$ for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
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
     "summary": "The Lean upper bound is proportional to log b, not log log b, so it does not establish the paper’s claimed upper bound.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (b : ℝ)"
    },
    {
     "severity": "note",
     "summary": "The Lean statement adds expansion existence for every valid numerator and denominator. The paper states this separately before the theorem, rather than as part of the theorem.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The paper uses integer denominators and the Lean definition uses naturals, but the constraint n ≥ 2 makes these equivalent. Pairwise strict ordering on a list likewise expresses the paper’s increasing distinct denominators.",
     "paper_quote": "2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z",
     "lean_quote": "ns.Pairwise (· < ·) ∧ (∀ n ∈ ns, 2 ≤ n)"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The definitions totalize minimum length via sInf, so it has a value even when no expansion exists; the added existence conjunct ensures expansions exist for valid inputs. On those inputs, sInf gives the least expansion length.",
     "paper_quote": "let N(a,b) be the least k",
     "lean_quote": "sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
    },
    {
     "severity": "note",
     "summary": "The Lean maximum is expressed as a finite-set supremum over natural numerators in [1,b); for b ≥ 2 this is the same range and maximum as in the paper.",
     "paper_quote": "put N(b)=\\max_{1\\le a<b}N(a,b).",
     "lean_quote": "(Finset.Ico 1 b).sup (fun a => minLength a b)"
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
     "summary": "The Lean theorem proves only the upper bound; it omits the paper’s lower bound, so it does not establish the stated asymptotic order.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ)) :="
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds expansion existence for every valid natural-number numerator and denominator. This is an extra conjunct; the paper states existence outside the theorem.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "`minLength` uses `sInf`, which totalizes to 0 for an empty set of lengths. On the valid numerator/denominator domain used by the theorem, the added existence conjunct ensures the set is nonempty, so it gives the least length as in the paper.",
     "paper_quote": "let $N(a,b)$ be the least $k$ for which",
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
     "summary": "The Lean theorem adds an existence conjunct asserting that every positive proper fraction has an expansion. This is stated in the paper’s surrounding text, not in the theorem itself.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The Lean definitions are totalized: `sInf` also assigns a value when no expansion exists, and the finite supremum has a value on an empty range. On the theorem’s domain, the existence conjunct and `b ≥ 2` ensure these definitions represent the least length and the maximum over the intended numerators.",
     "paper_quote": "let N(a,b) be the least k",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    }
   ]
  },
  {
   "id": "not_distinct",
   "description": "repeated denominators allowed",
   "is_defect": true,
   "caught": true,
   "flags": [
    {
     "severity": "mismatch",
     "summary": "The Lean relation permits repeated denominators: `Pairwise (· ≤ ·)` allows equality, unlike the paper’s strictly increasing denominators. Thus Lean bounds lengths for expansions that may use repeated terms. In particular, its upper bound for these possibly shorter expansions does not establish the paper’s upper bound for expansions with distinct denominators.",
     "paper_quote": "2\\le n_1<\\cdots<n_k",
     "lean_quote": "ns.Pairwise (· ≤ ·)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds an existence conjunct. The paper states existence outside the theorem environment, and the prompt says that preceding text is not itself part of the claim the Lean statement must contain.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The Lean witness threshold is required to be at least 2. This is a harmless normalization for an eventual bound: the paper’s threshold can be increased if needed.",
     "paper_quote": "for every\ninteger $b\\ge b_0$",
     "lean_quote": "2 ≤ b₀"
    },
    {
     "severity": "note",
     "summary": "The Lean definitions totalize the minimum and maximum as natural-number infimum and finite supremum, respectively, so they have default values when the relevant sets are empty. On the theorem’s range, the added existence conjunct ensures expansions for every numerator and b₀ ≥ 2 makes the numerator range nonempty, so these defaults do not affect the asserted bounds.",
     "paper_quote": "let $N(a,b)$ be the least $k$",
     "lean_quote": "sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}"
    }
   ],
   "rejected": []
  }
 ],
 "model": "default",
 "provider": "agent37",
 "seconds": 29.8
};
