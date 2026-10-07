window.NOTES = {
 "provider": "agent37",
 "seconds": 25.9,
 "notes": {
  "thm:main": {
   "label": "thm:main",
   "role": "This theorem gives matching Θ(log log b) bounds for N(b), using a uniform upper bound over numerators and a lower-bound example with numerator b-1.",
   "checks": [
    {
     "point": "Trace how the two expansions yield one for A/C after scaling denominators by g, and how the prefix and distinctification lemma give the stated uniform bound.",
     "quote": "Multiplying every denominator by the integer \\(g\\) gives an expansion of \\(A/C\\) of the same length."
    },
    {
     "point": "Check the lower-bound argument that each partial remainder has denominator dividing L_{j-1}, which is used to bound the sorted denominators and ultimately b.",
     "quote": "the amount remaining after the first \\(j-1\\) terms is positive and has denominator dividing \\(L_{j-1}\\)."
    }
   ],
   "rejected": 1
  },
  "cor:counting": {
   "label": "cor:counting",
   "role": "This corollary bounds the growth of \\(F(k)\\) on the double-logarithmic scale, using branching and padding for the lower bound and a count of possible denominators for the upper bound.",
   "checks": [
    {
     "point": "Trace the use of the earlier theorem and cleanup lemma to obtain a short expansion whose denominator set contains a multiple of \\(Q\\).",
     "quote": "Lemma~\\ref{lem:marked-cleanup} produces a distinct expansion of one whose denominator set $S$ has size $s=O(\\log r)$ and contains a multiple $n$ of $Q$."
    },
    {
     "point": "Follow the denominator bounds through the induction and into the product count used for the upper bound.",
     "quote": "Inductively $P_i\\le k^{2^i-1}$ and $n_i\\le k^{2^{i-1}}$."
    }
   ],
   "rejected": 1
  },
  "cor:prescribed": {
   "label": "cor:prescribed",
   "role": "This corollary bounds the growth rate of the first missing denominator, showing that its iterated logarithm grows linearly in the exact expansion length.",
   "checks": [
    {
     "point": "Check how the length estimate for large integers combines with the finite choices for smaller integers to cover the full stated range.",
     "quote": "For every integer $k\\ge k_*$ and every integer $2\\le m\\le\\exp(\\exp(ck))$"
    },
    {
     "point": "Check that the padding lemma applies repeatedly while preserving the exact denominator, so the constructed expansions reach length exactly $k$.",
     "quote": "Lemma~\\ref{lem:exact-marker-padding} may be iterated until the length is exactly $k$, retaining the exact integer $m$."
    },
    {
     "point": "Check that the product recurrence gives the claimed uniform bound on every denominator and that this bound implies the stated limsup.",
     "quote": "the product recurrence in the proof of Corollary~\\ref{cor:counting} gives $n_i\\le k^{2^{i-1}}$ in every distinct exact-$k$ expansion of $1$."
    }
   ],
   "rejected": 0
  },
  "prop:density": {
   "label": "prop:density",
   "role": "This proposition turns residue-based descents into short unit-fraction expansions for a dense subset of numerators up to \\(X\\).",
   "checks": [
    {
     "point": "Check the divisor-moment estimate and its uniform application to the shifts and indexed residue lists at every level.",
     "quote": "\\sum_{1\\le h\\le Y}d_X(N+h)^r"
    },
    {
     "point": "Check the recurrence iteration and the parameter bounds used to deduce the final exceptional-set size.",
     "quote": "\\delta_0\\le\n \\sum_{i=0}^{d-1}\n A^{(1-\\alpha^i)/(1-\\alpha)}\\epsilon^{\\alpha^i}"
    }
   ],
   "rejected": 1
  },
  "lem:distinct": {
   "label": "lem:distinct",
   "role": "The lemma shows that any representation using \\(k\\) positive unit fractions of a total below \\(1\\) can be converted to one with \\(k\\) distinct denominators.",
   "checks": [
    {
     "point": "Check how the induction bounds the remaining denominator lists after fixing the first denominator.",
     "quote": "Indeed, the first denominator is at most \\(k/x\\)."
    },
    {
     "point": "Check that the increasing denominator-sum measure and the finite set of lists together justify termination, including after the lists are reordered.",
     "quote": "Finiteness of the set of lists therefore forces termination"
    }
   ],
   "rejected": 1
  },
  "lem:greedy": {
   "label": "lem:greedy",
   "role": "This lemma bounds the number of greedy unit-fraction subtractions needed to reach zero or a remainder with a controlled denominator.",
   "checks": [
    {
     "point": "Check that the first-crossing argument covers the denominator bound, including the strict upper endpoint.",
     "quote": "At such a first crossing, the preceding denominator was less than \\(T\\), so the new one is less than \\(T^2\\)."
    },
    {
     "point": "Check the decay estimate and its indexing against the stated ceiling bound on the number of steps.",
     "quote": "After \\(j\\ge1\\) positive steps their values therefore satisfy\n\\[\n x_j\\le 2^{-2^{j-1}}.\n\\]"
    }
   ],
   "rejected": 0
  },
  "lem:divisor": {
   "label": "lem:divisor",
   "role": "This lemma bounds the \\(r\\)-th moment of the truncated divisor function over a shifted interval, uniformly in the stated parameter ranges.",
   "checks": [
    {
     "point": "Check how the weighted subset count controls the number of divisors made from prime factors above the cutoff.",
     "quote": "\\le q^{-v/\\log z}(1+q)^L \\le \\exp\\left(\\frac{Bv}{\\log z}\\right)"
    },
    {
     "point": "Check how the resulting losses are absorbed into the claimed \\(\\exp(S^{1/4})\\) bound, including the final logarithmic loss.",
     "quote": "O_{D,r}(S^{1/16}\\log\\log S+\\log S)"
    }
   ],
   "rejected": 1
  },
  "lem:residues": {
   "label": "lem:residues",
   "role": "This lemma constructs a common divisible modulus and lists that provide many good residues at intermediate levels and a suitable entry for every terminal integer.",
   "checks": [
    {
     "point": "Check that the hypotheses and parameter ranges of the random Fourier estimate and discrepancy lemma apply uniformly in this range of \\(u\\).",
     "quote": "4\\eta m\\le0.005w"
    },
    {
     "point": "Check the Markov bound and the union over the \\(O(\\log S)\\) levels that yield the stated exceptional-set size simultaneously.",
     "quote": "\\Prob(B_j>X_j e^{-0.001m})\\le e^{-0.004m}."
    }
   ],
   "rejected": 1
  },
  "lem:discrepancy": {
   "label": "lem:discrepancy",
   "role": "This lemma turns the assumed small Fourier averages into a lower bound on the number of entries whose normalized ceiling residue is very small.",
   "checks": [
    {
     "point": "Check that the chosen frequency cutoff and Fourier bound give the displayed discrepancy estimate, which is eventually small enough relative to the interval length.",
     "quote": "O\\bigl(e^{-4\\eta w}+(1+4\\eta w)e^{-3\\eta w}\\bigr)\n=o(e^{-\\eta w})."
    }
   ],
   "rejected": 2
  },
  "lem:reciprocal-phase": {
   "label": "lem:reciprocal-phase",
   "role": "This lemma establishes power-saving cancellation for reciprocal phases over intervals in \\([U,2U]\\), uniformly across the stated range of \\(Z\\).",
   "checks": [
    {
     "point": "Check the nearest-integer choice of derivative order against the full allowed range of \\(Z\\), including endpoint cases.",
     "quote": "4\\le k\\le Q_B,\\qquad U^{-3/2}\\le |Z|U^{-k-1}\\le U^{-1/2}."
    },
    {
     "point": "Inspect the treatment of intervals where \\(g'\\) approaches integers and the accumulation of boundary contributions in the second-derivative estimate.",
     "quote": "The portions where \\(g'\\) is within \\(\\beta\\) of an integer have \\(O_A(U\\lambda+1)\\) components"
    },
    {
     "point": "Check the normalization and exponent bookkeeping when iterating the differencing recurrence to obtain the final power saving.",
     "quote": "\\sigma_j^2\\ll L^{-1}+\\sigma_{j+1}"
    }
   ],
   "rejected": 0
  },
  "lem:deterministic": {
   "label": "lem:deterministic",
   "role": "This lemma provides a uniform mean-square cancellation bound for the deterministic list, for use in the subsequent argument.",
   "checks": [
    {
     "point": "Check that the bounds on \\(C\\), \\(t-t'\\), and \\(\\ell\\) give the stated range for \\(|Z|\\), and that this range yields the dyadic-scale comparisons used next.",
     "quote": "e^{D_CS}\\le |Z|\\le e^{(2D_C+K+2)S}."
    },
    {
     "point": "Check that the construction of \\(T_0\\) gives \\(2^m\\) distinct subset products, as used to bound the diagonal contribution.",
     "quote": "because the \\(2^m\\) subset products are distinct."
    }
   ],
   "rejected": 1
  },
  "lem:random": {
   "label": "lem:random",
   "role": "This lemma bounds the expected squared normalized exponential sum over the sampled products, uniformly for the stated moduli and frequencies.",
   "checks": [
    {
     "point": "Check the estimate for the probability that the reduced denominator is small, including the count of primes in the sampling interval that can divide \\(u\\).",
     "quote": "At most \\(S\\) primes in the sampling interval divide \\(u\\), so each sample has hit probability at most"
    },
    {
     "point": "Check the maximum atom bound for each fresh product and how the product-size bound ensures reduction modulo \\(q\\) preserves distinct values.",
     "quote": "By unique factorization, an integer can arise as the product of at most \\(s!\\) ordered \\(s\\)-tuples of primes."
    },
    {
     "point": "Check how the exceptional Hamming-distance and denominator probabilities combine to give the stated uniform final bound.",
     "quote": "Combining this with the Hamming exception, we obtain"
    }
   ],
   "rejected": 0
  },
  "lem:marked-cleanup": {
   "label": "lem:marked-cleanup",
   "role": "This lemma converts a unit-fraction representation into one with distinct denominators, without increasing its length or losing a denominator divisible by $Q$.",
   "checks": [
    {
     "point": "Check that the replacement identities preserve the sum and that, when the replaced denominator is divisible by $Q$, at least one new denominator remains divisible by $Q$.",
     "quote": "\\frac2m=\\frac1{m/2}\\quad(m\\text{ even}),\n\\qquad\n\\frac2m=\\frac1{(m+1)/2}+\\frac1{m(m+1)/2}\n       \\quad(m\\text{ odd})."
    },
    {
     "point": "Check that the stated lexicographic descent applies to the sorted tuples throughout the process and ensures termination at fixed length.",
     "quote": "The sorted denominator tuple therefore strictly decreases lexicographically: all entries below $(m+1)/2$ are unchanged, and one extra copy of $(m+1)/2$ is inserted."
    }
   ],
   "rejected": 0
  },
  "lem:marked-greedy-prefix": {
   "label": "lem:marked-greedy-prefix",
   "role": "The lemma constructs a greedy Egyptian-fraction prefix that avoids denominator \\(m\\), with a small controlled remainder and bounds on its length and product denominator.",
   "checks": [
    {
     "point": "Check how the exceptional choice \\(n_{i+1}=m+1\\) affects the remainder bounds and the later denominator sequence.",
     "quote": "(m-1)R_i<q_i\\le mR_i"
    },
    {
     "point": "Check the iteration and index bookkeeping connecting the remainder decay to the stated bound on the number of terms.",
     "quote": "2^{2^{j-3}}\\le q_{j-1}<T."
    },
    {
     "point": "Check how the stopping rule and earlier-step comparisons yield the final remainder bounds, including the comparison with each selected denominator.",
     "quote": "\\frac Rq<\\frac{2m}{T}\\le\\frac1m,"
    }
   ],
   "rejected": 0
  },
  "lem:exact-marker-padding": {
   "label": "lem:exact-marker-padding",
   "role": "This lemma pads any \\(r\\)-term representation of 1 by one distinct unit fraction while retaining a chosen denominator, yielding \\(D_r\\subseteq D_{r+1}\\).",
   "checks": [
    {
     "point": "Check that these are exactly the possible collisions between the split denominators and the marked largest denominator.",
     "quote": "The same split of $s$ works unless $v=s+1$ or $v=s(s+1)$"
    },
    {
     "point": "Verify that the alternative split applies when \\(s\\) is composite and that its new denominators avoid both exceptional values and all unchanged denominators.",
     "quote": "\\frac1s=\\frac1{s+a}+\\frac1{b(s+a)}"
    },
    {
     "point": "Check that the modular contradiction uses a common denominator \\(B\\) not divisible by \\(p\\), as required for both congruences.",
     "quote": "write the sum of their reciprocals as $A/B$ with $p\\nmid B$"
    }
   ],
   "rejected": 0
  },
  "prop:marked-length": {
   "label": "prop:marked-length",
   "role": "This proposition combines the marked prefix with a bounded-length tail to obtain an exact denominator \\(m\\) and the stated asymptotic term count.",
   "checks": [
    {
     "point": "Check that the denominator \\(q\\) produced by the prefix satisfies all hypotheses of the marked-divisor-density lemma, including the retained-without-cancellation condition.",
     "quote": "The denominator $q$ is retained without cancellation, beginning at $m$ and using multipliers at most the preceding denominator plus one."
    },
    {
     "point": "Check that the grouping lemma’s supply and parameter conditions apply to \\(X=RK_m\\), including the required range relative to \\(q\\).",
     "quote": "so the integer $X=RK_m$ satisfies $1\\le X<q$."
    },
    {
     "point": "Check that applying the distinctness lemma to the tail preserves its term count and that the resulting denominators remain separate from the reserved term and prefix.",
     "quote": "Apply Lemma~\\ref{lem:distinct} only to this tail. It makes its denominators distinct without changing its number of terms."
    }
   ],
   "rejected": 0
  },
  "lem:rational-divisor-supply": {
   "label": "lem:rational-divisor-supply",
   "role": "This lemma provides a moderately sized common denominator whose divisors supply short rational representations of every integer up to \\(Y\\).",
   "checks": [
    {
     "point": "Check the cited bilinear estimate and Fourier argument support the five-product modular representation, and that lifting the residues gives the claimed positive integer numerators.",
     "quote": "For five independent copies $U_1,\\ldots,U_5$, Fourier inversion now yields"
    }
   ],
   "rejected": 2
  },
  "lem:marked-divisor-density": {
   "label": "lem:marked-divisor-density",
   "role": "This lemma propagates a divisor-coverage property from \\(m\\) to every integer obtained by the specified bounded multiplication steps.",
   "checks": [
    {
     "point": "A referee should check how the induction covers the interval when \\(q<n\\), including why \\(q\\) supplies a divisor for every point in the gap.",
     "quote": "the divisor $q$ itself works"
    },
    {
     "point": "A referee should check that rescaling the input and divisor by \\(n\\) gives the required interval bounds and a divisor of \\(nq\\).",
     "quote": "apply the property at $w/n$ and multiply the resulting divisor by $n$."
    }
   ],
   "rejected": 0
  },
  "lem:marked-grouping": {
   "label": "lem:marked-grouping",
   "role": "This lemma turns a sequence of integer groupings into a unit-fraction representation of \\(X/(qK_m)\\), with a logarithmic bound on the number of terms.",
   "checks": [
    {
     "point": "Check how the divisor hypothesis applies at each large-remainder step, including that the chosen scale lies in its stated range.",
     "quote": "If the current integer $X_i$ exceeds $m^4$, then\n$w=X_i/m^2$ lies in $[1,q]$."
    },
    {
     "point": "Check that the group sizes fall within the range covered by the assumed rational-sum representations.",
     "quote": "Thus $m^2\\le s_i\\le m^3\\le m^4$"
    }
   ],
   "rejected": 1
  }
 }
};
