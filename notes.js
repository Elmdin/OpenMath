window.NOTES = {
 "provider": "agent37",
 "seconds": 25.6,
 "notes": {
  "thm:main": {
   "label": "thm:main",
   "role": "The theorem combines a uniform upper bound for all numerators with a lower bound witnessed by the numerator \\(b-1\\), establishing the stated order of growth for \\(N(b)\\).",
   "checks": [
    {
     "point": "Check that Proposition~\\ref{prop:density} supplies the complement-size bound needed to ensure a split has both entries in \\(G\\), including the integer-rounding details.",
     "quote": "Among the \\(n-1\\) positive splits \\(n=u+(n-u)\\), at most \\(2|H|\\le X/4\\) have an entry outside \\(G\\)."
    },
    {
     "point": "Check that the hypotheses of Proposition~\\ref{prop:density} apply to the chosen remainder denominator \\(C\\), and that its parameter bounds imply the displayed inequality involving \\(AM\\) and \\(X\\).",
     "quote": "Choose \\(M,G,X\\) from Proposition~\\ref{prop:density} for this \\(S,C\\)."
    },
    {
     "point": "Check the denominator-divisibility claim for each remainder and the induction yielding the bound on \\(L_j\\), which drive the lower-bound estimate.",
     "quote": "For each \\(1\\le j\\le s\\), the amount remaining after the first \\(j-1\\) terms is positive and has denominator dividing \\(L_{j-1}\\)."
    }
   ],
   "rejected": 0
  },
  "cor:counting": {
   "label": "cor:counting",
   "role": "This corollary bounds the growth of the number of length-​$k$ expansions between doubly exponential rates, completing the argument’s estimate for $F(k)$.",
   "checks": [
    {
     "point": "Check that the collision count accounts for all divisors excluded by overlaps with the unchanged denominators, and that the remaining sets uniquely identify the chosen divisor.",
     "quote": "For each unchanged denominator in $S\\setminus\\{n\\}$, at most one choice of $d$ makes it equal to $n+d$, and at most one makes it equal to $n+n^2/d$."
    },
    {
     "point": "Check the claimed inverse to padding, including why the two inserted denominators can be identified as the largest and second largest after sorting.",
     "quote": "The operation is injective: delete those two denominators and reinsert the second largest minus one."
    },
    {
     "point": "Check how the positive remainder’s denominator and the ordering bound imply the stated bounds on each $n_i$ and hence the finite counting box.",
     "quote": "Ordering therefore gives\n\\[\n \\frac1{P_{i-1}}\\le R_i\\le\\frac{k}{n_i},\n \\qquad n_i\\le kP_{i-1},\\qquad P_i\\le kP_{i-1}^2.\n\\]"
    }
   ],
   "rejected": 0
  },
  "cor:prescribed": {
   "label": "cor:prescribed",
   "role": "This corollary bounds the growth rate of the first missing denominator for exact-length expansions, showing that its double logarithm grows linearly in the length.",
   "checks": [
    {
     "point": "Check that the marked-length proposition provides the stated uniform bound for all sufficiently large integers and that the finite exceptions are covered by the construction.",
     "quote": "Proposition~\\ref{prop:marked-length} supplies an integer $M\\ge4$ such\nthat every integer $m\\ge M$ has a distinct marked expansion with\nat most $(A+\\varepsilon)\\log\\log m$ terms."
    },
    {
     "point": "Check that the padding lemma applies repeatedly while preserving the exact denominator, as needed to pass from expansions of at most $k$ terms to exactly $k$ terms.",
     "quote": "Thus Lemma~\\ref{lem:exact-marker-padding} may be iterated until the\nlength is exactly $k$, retaining the exact integer $m$."
    },
    {
     "point": "Check that the cited counting corollary yields the denominator bound for every distinct exact-$k$ expansion, including the indexing used in the product recurrence.",
     "quote": "the product recurrence in the proof of Corollary~\\ref{cor:counting} gives $n_i\\le k^{2^{i-1}}$ in every\ndistinct exact-$k$ expansion of $1$."
    }
   ],
   "rejected": 0
  },
  "prop:density": {
   "label": "prop:density",
   "role": "This result turns the residue descent into a set of at least \\(7X/8\\) numerators whose fractions \\(u/(MC)\\) have \\(O(\\log S)\\)-term unit-fraction expansions.",
   "checks": [
    {
     "point": "Check that the cited residue lemma supplies one common \\(M\\) with the stated bounds uniformly for every allowed \\(C\\).",
     "quote": "choose the common integer \\(M\\) supplied by Lemma~\\ref{lem:residues}."
    },
    {
     "point": "Check the divisor-moment estimate for all translated intervals and shifts used to control the bad numerators, and how it feeds into the recurrence iteration.",
     "quote": "Thus Lemma~\\ref{lem:divisor}, with the fixed parameters \\(D_*,r\\), applies uniformly at every level and to every list entry."
    },
    {
     "point": "Check that the recursive scalings preserve unit-fraction denominators at least two, including when a remainder vanishes or the levels change.",
     "quote": "Both \\(M/t_{j,i}\\) and \\(zC_j/C_{j+1}\\) are positive integers."
    }
   ],
   "rejected": 0
  },
  "lem:distinct": {
   "label": "lem:distinct",
   "role": "This lemma removes repeated denominators while preserving the number of unit fractions representing \\(x\\).",
   "checks": [
    {
     "point": "Check that the finiteness claim applies to the nondecreasing denominator lists for every positive remainder arising in the induction.",
     "quote": "there are only finitely many nondecreasing lists of \\(k\\) denominators with reciprocal sum \\(x\\)."
    },
    {
     "point": "Check that each replacement keeps the denominators integral and positive and that the stated increase supplies a termination measure.",
     "quote": "Each replacement preserves the number of terms and increases the sum of their denominators:"
    }
   ],
   "rejected": 0
  },
  "lem:greedy": {
   "label": "lem:greedy",
   "role": "This lemma bounds the number of greedy unit-fraction subtractions needed to reach zero or a remainder with denominator in the prescribed range.",
   "checks": [],
   "rejected": 2
  },
  "lem:divisor": {
   "label": "lem:divisor",
   "role": "This lemma bounds the \\(r\\)-th moment of the number of divisors at most \\(X\\) across every shifted interval in the stated ranges.",
   "checks": [
    {
     "point": "Check how the prime-factor prefix decomposition handles repeated prime factors and accounts for all integers, including those below the cutoff.",
     "quote": "For \\(n>\\sqrt Y\\), order its prime factors with multiplicity and let \\(d\\) be the longest initial product at most \\(\\sqrt Y\\), allowing \\(d=1\\)."
    }
   ],
   "rejected": 2
  },
  "lem:residues": {
   "label": "lem:residues",
   "role": "This lemma constructs a common modulus and indexed divisor lists that provide many good residues on each level and a near-multiple approximation for every terminal integer.",
   "checks": [
    {
     "point": "Check that the terminal-integer union bound has the claimed \\(o(1)\\) dependence on \\(S\\).",
     "quote": "\n  \\Prob(\\text{some terminal integer has no successful block})\n \\le \\sum_{u>S^{D_0}}u^{-5}=o(1)."
    },
    {
     "point": "Check that the estimates used to choose one common realization are uniform in \\(C\\), as required by the statement.",
     "quote": "The threshold on \\(S\\) is independent of \\(C\\)."
    }
   ],
   "rejected": 1
  },
  "lem:discrepancy": {
   "label": "lem:discrepancy",
   "role": "This lemma uses Fourier cancellation to give a lower bound on how often the normalized rounding gap is small.",
   "checks": [],
   "rejected": 2
  },
  "lem:reciprocal-phase": {
   "label": "lem:reciprocal-phase",
   "role": "This lemma supplies a uniform power-saving bound for reciprocal-phase sums over intervals in \\([U,2U]\\).",
   "checks": [
    {
     "point": "Check that the chosen integer \\(k\\) and the resulting bounds for \\(|Z|U^{-k-1}\\) hold uniformly across the full stated range of \\(Z\\).",
     "quote": " 4\\le k\\le Q_B,\\qquad\n U^{-3/2}\\le |Z|U^{-k-1}\\le U^{-1/2}."
    }
   ],
   "rejected": 2
  },
  "lem:deterministic": {
   "label": "lem:deterministic",
   "role": "This lemma gives a uniform mean-square bound for the exponential averages over the deterministic list across the specified levels and frequencies.",
   "checks": [
    {
     "point": "Check that the bounds on \\(Z\\) and the dyadic ranges for \\(U\\) yield the stated phase-size hypotheses uniformly in the parameters.",
     "quote": "U^4\\le |Z|\\le U^{3D_C}."
    },
    {
     "point": "Check the hypotheses and uniformity in the constants of the reciprocal-phase estimate when \\(B=3D_C\\).",
     "quote": "Lemma~\\ref{lem:reciprocal-phase}, with the fixed value \\(B=3D_C\\),"
    },
    {
     "point": "Check how distinctness of the subset products in \\(T_0\\) is established and used to bound the diagonal contribution.",
     "quote": "the diagonal contributes at most \\(2^{-m}\\) because the \\(2^m\\) subset products are distinct."
    }
   ],
   "rejected": 0
  },
  "lem:random": {
   "label": "lem:random",
   "role": "This lemma bounds the expected squared size of the random exponential sum, uniformly over the stated choices of \\(u\\), \\(l\\), and \\(\\mathcal P\\).",
   "checks": [
    {
     "point": "Track the exceptional-event estimate for the gcd, including the count of prime divisors of \\(u\\) in the sampling interval and repeated sample values.",
     "quote": "At most \\(S\\) primes in the sampling interval divide \\(u\\)"
    },
    {
     "point": "Check the product-size and atom-probability bounds used to pass to distributions modulo \\(q\\).",
     "quote": "Reduction modulo \\(q\\) is injective on these integer values."
    },
    {
     "point": "Check the parameter comparisons and uniformity in the final exponent bound over the full range of \\(V\\).",
     "quote": "The final inequality is uniform because \\(\\min(m,D_0\\log S)\\) tends to infinity with \\(S\\)."
    }
   ],
   "rejected": 0
  },
  "lem:marked-cleanup": {
   "label": "lem:marked-cleanup",
   "role": "This lemma turns an Egyptian-fraction representation with a denominator divisible by \\(Q\\) into one with distinct denominators and no more terms.",
   "checks": [
    {
     "point": "Check that each replacement preserves the reciprocal sum and yields positive-integer denominators.",
     "quote": "\\frac2m=\\frac1{m/2}\\quad(m\\text{ even}),\n \\qquad\n \\frac2m=\\frac1{(m+1)/2}+\\frac1{m(m+1)/2}\n       \\quad(m\\text{ odd})."
    }
   ],
   "rejected": 2
  },
  "lem:marked-greedy-prefix": {
   "label": "lem:marked-greedy-prefix",
   "role": "This lemma constructs an Egyptian-fraction prefix that avoids denominator $m$, bounds its length and product, and leaves a controlled remainder for later use.",
   "checks": [
    {
     "point": "A referee should look at how replacing the greedy denominator $m$ by $m+1$ preserves a positive remainder smaller than the term just subtracted, and how this affects the numerator bound.",
     "quote": "In the exceptional step $a=m$, we have $(m-1)R_i<q_i\\le mR_i$."
    },
    {
     "point": "A referee should track the possible exceptional step when deriving the doubly exponential remainder estimate and the resulting bound on the number of terms.",
     "quote": "All later steps square the upper bound for the remainder, apart from at most one step that still decreases it."
    },
    {
     "point": "A referee should check the final-step boundary cases in using the preceding state and the denominator growth condition to obtain the product bound.",
     "quote": "$q_j\\le q_{j-1}(q_{j-1}+1)<T^2$"
    }
   ],
   "rejected": 0
  },
  "lem:exact-marker-padding": {
   "label": "lem:exact-marker-padding",
   "role": "The lemma gives a one-term padding step that preserves any chosen denominator, yielding the inclusion from representations of length \\(r\\) to length \\(r+1\\).",
   "checks": [
    {
     "point": "Check how the two exceptional values are identified and how the alternate split avoids collisions with both the unchanged denominators and the marked denominator.",
     "quote": "The same split of $s$ works unless $v=s+1$ or $v=s(s+1)$"
    },
    {
     "point": "Trace the denominator-clearing and reduction modulo \\(p\\) in both exceptional cases, including the condition that \\(p\\nmid B\\).",
     "quote": "After clearing denominators and reducing modulo $p$, these equations"
    }
   ],
   "rejected": 0
  },
  "prop:marked-length": {
   "label": "prop:marked-length",
   "role": "This proposition turns the marked-denominator construction into a representation for every sufficiently large integer, with an explicit asymptotic bound on the number of terms.",
   "checks": [
    {
     "point": "Trace the grouping lemma’s hypotheses and the estimate for \\(G\\), especially how the divisor supply yields the stated constant without a dependence on the size of \\(q\\).",
     "quote": "This count depends on $RK_m$, not on the potentially much larger $q$."
    },
    {
     "point": "Check that the tail-separation argument applies to every denominator in the distinct tail, so it can be adjoined to the reserved term and prefix.",
     "quote": "Thus all denominators of the distinct tail exceed $m$ and every $n_i$, so adjoining it to the reserved term and prefix produces a distinct expansion of $1$."
    },
    {
     "point": "Check that the cited supply and error estimates give the claimed asymptotic uniformly over all sufficiently large integers, including both parities.",
     "quote": "All errors here tend to zero as $m$ tends to infinity through all integers: the bound on $R$ removed any dependence on the chosen stopping numerator, and the supply covers both parities."
    }
   ],
   "rejected": 0
  },
  "lem:rational-divisor-supply": {
   "label": "lem:rational-divisor-supply",
   "role": "This lemma supplies a moderately sized integer whose divisors can serve as numerators in bounded-length rational representations of every integer up to \\(Y\\).",
   "checks": [
    {
     "point": "Check that the cited three-prime asymptotic gives the stated lower bound beyond an absolute threshold uniformly over odd \\(u\\), including the singular-series lower bound.",
     "quote": "To make the uniformity in odd $u$ explicit, its singular series is"
    },
    {
     "point": "Check the congruent-pair count and the resulting bound on the number of exceptional primes.",
     "quote": "Counting the same pairs prime by prime therefore bounds the number $B(u)$"
    },
    {
     "point": "Check that the five-fold Fourier estimate and the lifting from residues to positive divisors yield the claimed prime representation.",
     "quote": "For five independent copies $U_1,\\ldots,U_5$, Fourier inversion now yields"
    }
   ],
   "rejected": 0
  },
  "lem:marked-divisor-density": {
   "label": "lem:marked-divisor-density",
   "role": "This lemma propagates a divisor-density interval from the initial value \\(m\\) to every value \\(q\\) reached by the permitted replacements.",
   "checks": [
    {
     "point": "Check that the scaled application of the induction hypothesis is within its allowed range and yields a divisor of the new value.",
     "quote": "apply the property at $w/n$ and multiply the resulting divisor by $n$."
    },
    {
     "point": "Check that the replacement constraint and the standing assumptions on \\(m,q\\) support the bounds used for the gap.",
     "quote": "w<n\\le q+1\\le mq."
    }
   ],
   "rejected": 1
  },
  "lem:marked-grouping": {
   "label": "lem:marked-grouping",
   "role": "This lemma turns a bounded rational decomposition of small integers, together with suitable divisors of \\(q\\), into a unit-fraction decomposition of \\(X/(qK_m)\\) with a logarithmic term bound.",
   "checks": [
    {
     "point": "Check how the divisor hypothesis applies at each step, including the range of \\(w\\) and the resulting bounds on \\(d_i\\) and \\(s_i\\).",
     "quote": "If the current integer $X_i$ exceeds $m^4$, then\n$w=X_i/m^2$ lies in $[1,q]$."
    },
    {
     "point": "Check that the assumed small-integer representations apply to every group size, including the final group, and that the divisibilities yield integer denominators.",
     "quote": "For each group, use the assumed representation\n$s_i=\\sum_{a=1}^{b_i}e_{i,a}/t_{i,a}$, with $b_i\\le B$."
    }
   ],
   "rejected": 1
  }
 }
};
