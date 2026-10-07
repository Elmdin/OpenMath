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
    "summary": "The Lean statement adds expansion existence for every natural-number pair with 1 ≤ a < b. This is an extra conjunct beyond the theorem environment; the paper mentions existence separately in the introduction.",
    "paper_quote": "The greedy algorithm shows that such expansions exist.",
    "lean_quote": "∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns"
   },
   {
    "severity": "note",
    "summary": "The Lean definitions use `sInf` and finite-set `sup`, which are totalized (including on empty sets); on the theorem's range, the extra existence conjunct ensures the length sets are nonempty, and for b ≥ 2 the numerator range is nonempty. Thus these definitions give the paper's least length and maximum there. The maximum upper bound also entails the paper's stated upper bound for each numerator.",
    "paper_quote": "For integers $1\\le a<b$, let $N(a,b)$ be the least $k$ for which",
    "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
   },
   {
    "severity": "note",
    "summary": "The paper uses integers for a, b, and the threshold, while Lean uses naturals and requires b₀ ≥ 2. This is equivalent on the stated positive-integer domain: the threshold can be increased to at least 2. The real logarithm expression is the same log-log bound.",
    "paper_quote": "There are absolute constants $c_1,c_2>0$ and $b_0$ such that, for every\ninteger $b\\ge b_0$,",
    "lean_quote": "∃ c₁ c₂ : ℝ, 0 < c₁ ∧ 0 < c₂ ∧ ∃ b₀ : ℕ, 2 ≤ b₀ ∧\n      ∀ b : ℕ, b₀ ≤ b →"
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
     "summary": "The Lean theorem requires both bounds for every b ≥ 2, whereas the paper requires them only for b ≥ b₀. This is stronger, not weaker; moreover, the Lean upper bound at b = 2 is impossible because log(log 2) < 0 while maxMinLength is nonnegative. The stronger range does not prevent the Lean statement from implying the paper’s eventual bound, but it makes the Lean statement unprovable as written.",
     "paper_quote": "for every\ninteger\nb\\ge b_0,",
     "lean_quote": "∀ b : ℕ, 2 ≤ b →\nc₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    }
   ],
   "rejected": [
    {
     "severity": "note",
     "summary": "The Lean statement adds an existence-of-expansions conjunct. The paper states this separately before the theorem, and Lean’s sInf definition gives the intended least length once the conjunct ensures the set of expansion lengths is nonempty for the relevant a,b. The Finset supremum agrees with the paper’s maximum when b ≥ 2, when the index set is nonempty.",
     "paper_quote": "The greedy algorithm shows that such\nexpansions exist.\n\nFor integers\n$1\\le a<b$, let $N(a,b)$ be the least $k$ for which\n\\[\n \\frac ab=\\frac1{n_1}+\\cdots+\\frac1{n_k},\n \\qquad 2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,\n\\]\nand put $N(b)=\\max_{1\\le a<b}N(a,b).",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧\n\nnoncomputable def minLength (a b : ℕ) : ℕ :=\nsInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n(Finset.Ico 1 b).sup (fun a => minLength a b)"
    },
    {
     "severity": "note",
     "summary": "The expansion encoding is equivalent on the theorem’s domain: pairwise strict ordering on the list gives the ordered distinct denominators, each denominator is at least 2, and the rational sum matches a/b. Using ℕ instead of ℤ for denominators makes no difference under that lower bound. Also, the paper’s per-numerator upper-bound sentence follows from the Lean maximum bound for b ≥ 2, since each eligible numerator is in the supremum’s index set.",
     "paper_quote": "\\qquad 2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,",
     "lean_quote": "ns.Pairwise (· < ·) ∧ (∀ n ∈ ns, 2 ≤ n) ∧\n    (ns.map (fun n => (1 : ℚ) / (n : ℚ))).sum = (a : ℚ) / (b : ℚ)\n\nIn particular, the upper bound holds for every integer numerator\n$1\\le a<b$."
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
     "summary": "The paper requires the bounds for every integer b above the threshold; the Lean statement requires them only for one b. Thus it does not establish the claimed asymptotic bounds or the stated upper bound for every numerator.",
     "paper_quote": "for every\ninteger\nb\\ge b_0,\n\\[\n c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.\n\\]",
     "lean_quote": "∃ b : ℕ, b₀ ≤ b ∧\n        c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧\n        (maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds existence of an expansion for every valid numerator and denominator. The paper states this before the theorem as a consequence of the greedy algorithm, not as part of the theorem claim.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "The definitions encode the paper’s minimum and maximum using natural-number sInf and Finset.sup. On the relevant domain, the added existence conjunct ensures the minimum is over a nonempty set, and b ≥ 2 makes the numerator range nonempty; these definitions therefore match the paper’s quantities there. Requiring b₀ ≥ 2 is harmless because the paper’s threshold can be increased.",
     "paper_quote": "and put $N(b)=\\max_{1\\le a<b}N(a,b)$.",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
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
     "summary": "The Lean upper bound is only proportional to log b, not log log b. It therefore does not establish the paper’s upper bound for N(b), nor the stated log-log upper bound for each numerator.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (b : ℝ)"
    },
    {
     "severity": "note",
     "summary": "The expansion-existence conjunct is additional to the theorem’s claim. The paper states this fact before the theorem; in Lean it also ensures minLength’s sInf is taken over a nonempty set for the relevant numerators.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The definitions encode the paper’s least length and maximum over 1 ≤ a < b using natural-number sInf and Finset.sup. These operators are totalized, but their empty-set cases do not affect the theorem’s domain: existence supplies expansion witnesses, and b₀ ≥ 2 makes the numerator range nonempty.",
     "paper_quote": "let N(a,b) be the least k for which\n\\[\n \\frac ab=\\frac1{n_1}+\\cdots+\\frac1{n_k},\n \\qquad 2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,\n\\]\nand put N(b)=\\max_{1\\le a<b}N(a,b).",
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
     "summary": "The Lean theorem asserts only the upper bound. It has no lower-bound inequality relating a positive constant to maxMinLength, so proving it would not establish the paper’s two-sided estimate; c₁ is otherwise unused.",
     "paper_quote": "c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem adds an existence conjunct for expansions. This is not part of the theorem environment, though the paper states the fact immediately before it.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "On the relevant domain, the definitions encode the paper’s objects: Pairwise (<) gives strictly increasing denominators, and the rational sum gives the expansion equality; minLength takes the least attainable length, and the finite supremum ranges over numerators 1 through b−1. The definitions are totalized outside that domain: in particular, sInf of an empty set of naturals and the supremum over an empty finset are 0. The added existence conjunct ensures the minimum is attained for relevant a,b, and b₀ ≥ 2 makes the numerator range nonempty.",
     "paper_quote": "let $N(a,b)$ be the least $k$ for which",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    },
    {
     "severity": "note",
     "summary": "The Lean upper bound on the maximum over all numerators also yields the paper’s individual-numerator upper bound on the theorem’s domain; it need not state that consequence separately.",
     "paper_quote": "In particular, the upper bound holds for every integer numerator\n$1\\le a<b$.",
     "lean_quote": "(maxMinLength b : ℝ) ≤ c₂ * Real.log (Real.log (b : ℝ))"
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
     "summary": "The Lean theorem adds an existence conjunct for expansions of every valid fraction. This is stated in the paper’s surrounding text, not in the theorem, and is extra to the claim under audit.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns) ∧"
    },
    {
     "severity": "note",
     "summary": "Lean requires denominators to be at least 1 rather than at least 2. On the stated domain, a denominator of 1 would contribute 1 to a sum equal to a/b<1, so this difference does not change which expansions qualify.",
     "paper_quote": "2\\le n_1<\\cdots<n_k",
     "lean_quote": "(∀ n ∈ ns, 1 ≤ n)"
    },
    {
     "severity": "note",
     "summary": "The definitions totalize the least length and maximum using sInf and Finset.sup. An empty set of expansion lengths gives 0 in ℕ, but the added existence conjunct ensures nonempty sets for valid fractions; for b≥2, the numerator finset is nonempty and its supremum is the stated maximum.",
     "paper_quote": "let N(a,b) be the least k",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    },
    {
     "severity": "note",
     "summary": "Lean indexes b and chooses b₀ in ℕ, with b₀≥2; the paper phrases the range as integers. This is equivalent for the sufficiently large positive b in the theorem.",
     "paper_quote": "for every\ninteger $b\\ge b_0$",
     "lean_quote": "∃ b₀ : ℕ, 2 ≤ b₀ ∧\n      ∀ b : ℕ, b₀ ≤ b →"
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
     "summary": "Lean allows repeated denominators, while the paper requires them to be distinct. Thus Lean bounds the maximum minimum length for a larger class of expansions. Its lower bound for this relaxed minimum would imply the paper’s lower bound, but its upper bound would not imply the paper’s upper bound.",
     "paper_quote": "2\\le n_1<\\cdots<n_k",
     "lean_quote": "ns.Pairwise (· ≤ ·)"
    },
    {
     "severity": "note",
     "summary": "The Lean theorem has an extra existence conjunct. The paper mentions existence before the theorem, but Lean’s conjunct uses the relaxed IsExpansion definition, so it does not assert existence of expansions with distinct denominators.",
     "paper_quote": "The greedy algorithm shows that such expansions exist.",
     "lean_quote": "(∀ a b : ℕ, 1 ≤ a → a < b → ∃ ns : List ℕ, IsExpansion a b ns)"
    },
    {
     "severity": "note",
     "summary": "The natural-number sInf and finite-set sup are totalized (zero on empty inputs). On the relevant domain, the existence conjunct makes the length set nonempty, and b₀ ≥ 2 makes the numerator range nonempty; the finite sup is the maximum over 1 ≤ a < b.",
     "paper_quote": "and put $N(b)=\\max_{1\\le a<b}N(a,b)$.",
     "lean_quote": "noncomputable def minLength (a b : ℕ) : ℕ :=\n  sInf {k : ℕ | ∃ ns : List ℕ, IsExpansion a b ns ∧ ns.length = k}\n\nnoncomputable def maxMinLength (b : ℕ) : ℕ :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)"
    },
    {
     "severity": "note",
     "summary": "The paper uses integers for a, b, and the denominators; Lean uses naturals. On the stated ranges (in particular, denominators at least 2 and b ≥ b₀ ≥ 2), this is an equivalent representation. Likewise, Lean’s natural-number coercion into ℝ supplies the real argument to log.",
     "paper_quote": "For integers $1\\le a<b$",
     "lean_quote": "∀ a b : ℕ, 1 ≤ a → a < b"
    }
   ],
   "rejected": []
  }
 ],
 "model": "default",
 "provider": "agent37",
 "seconds": 35.1
};
