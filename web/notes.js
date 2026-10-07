window.NOTES = {
 "provider": "agent37",
 "seconds": 24.4,
 "notes": {
  "thm:main": {
   "label": "thm:main",
   "role": "The theorem establishes matching order-​\\(\\log\\log b\\) bounds for \\(N(b)\\), with the upper bound uniform over numerators and the lower bound obtained from numerator \\(b-1\\).",
   "checks": [
    {
     "point": "Check that the parameters supplied by the density proposition meet its hypotheses for the stated range of \\(S\\) and \\(C\\), with constants uniform in \\(a\\).",
     "quote": "Choose \\(M,G,X\\) from Proposition~\\ref{prop:density} for this \\(S,C\\)."
    },
    {
     "point": "Check the count of splits with an entry outside \\(G\\), including the size bound on \\(H\\) and the integer-rounding effects in the comparison with \\(n-1\\).",
     "quote": "Among the \\(n-1\\) positive splits \\(n=u+(n-u)\\), at most \\(2|H|\\le X/4\\) have an entry outside \\(G\\)."
    },
    {
     "point": "Check the denominator accounting after appending \\(1/b\\) and sorting, which is used to identify \\(b\\) among the denominators bounded by the product estimate.",
     "quote": "As \\(b\\) is one of these denominators,"
    }
   ],
   "rejected": 0
  },
  "cor:counting": {
   "label": "cor:counting",
   "role": "This corollary bounds the growth of the number of length-​\\(k\\) expansions by constructing many through divisor branching and padding, then bounding denominators from above.",
   "checks": [
    {
     "point": "Check how the cited theorem and cleanup lemma yield a common denominator set of size \\(O(\\log r)\\) containing a multiple of \\(Q\\), with the stated distinct-expansion property.",
     "quote": "Lemma~\\ref{lem:marked-cleanup} produces a distinct expansion of one whose denominator set $S$ has size $s=O(\\log r)$ and contains a multiple $n$ of $Q$."
    },
    {
     "point": "Check that the divisor choices remain distinct after accounting for collisions with unchanged denominators, and that the resulting sets uniquely recover each choice of \\(d\\).",
     "quote": "For each unchanged denominator in $S\\setminus\\{n\\}$, at most one choice of $d$ makes it equal to $n+d$, and at most one makes it equal to $n+n^2/d$."
    },
    {
     "point": "Check the padding operation’s injectivity and the resulting lower bound for every sufficiently large length \\(k\\), rather than only for the initial length.",
     "quote": "The operation is injective: delete those two denominators and reinsert the second largest minus one."
    }
   ],
   "rejected": 0
  },
  "cor:prescribed": {
   "label": "cor:prescribed",
   "role": "This corollary bounds the growth of the first missing denominator from below using short marked expansions and padding, and from above using a denominator-size estimate.",
   "checks": [
    {
     "point": "Check how the marked-expansion length bound is obtained and how its constants yield the stated lower exponential rate.",
     "quote": "every integer $m\\ge M$ has a distinct marked expansion with at most $(A+\\varepsilon)\\log\\log m$ terms."
    },
    {
     "point": "Check the padding lemma’s hypotheses and that iterating it preserves the denominator while reaching every required exact length.",
     "quote": "Lemma~\\ref{lem:exact-marker-padding} may be iterated until the length is exactly $k$, retaining the exact integer $m$."
    }
   ],
   "rejected": 1
  },
  "prop:density": {
   "label": "prop:density",
   "role": "This proposition turns the residue-based descent into a density statement: for each allowed \\(C\\), a common \\(M\\) supports short unit-fraction expansions for all but at most one-eighth of numerators up to \\(X\\).",
   "checks": [
    {
     "point": "Check the indexed predecessor count, including how repeated list entries and the inherited bad numerators are accounted for.",
     "quote": "For a fixed pair \\((h,i)\\), every predecessor \\(u\\) satisfies"
    },
    {
     "point": "Check the hypotheses and uniformity needed to apply the divisor-moment lemma across all levels and list entries.",
     "quote": "Thus Lemma~\\ref{lem:divisor}, with the fixed parameters \\(D_*,r\\), applies uniformly at every level and to every list entry."
    }
   ],
   "rejected": 1
  },
  "lem:distinct": {
   "label": "lem:distinct",
   "role": "This lemma shows that a sum of \\(k\\) positive unit fractions totaling less than \\(1\\) can be represented with \\(k\\) distinct denominators.",
   "checks": [
    {
     "point": "Check the finiteness argument for denominator lists with fixed \\(x\\) and \\(k\\), especially how the bound on the first denominator supports the induction.",
     "quote": "Indeed, the first denominator is at most \\(k/x\\)."
    },
    {
     "point": "Check how the replacements apply to repeated denominators and how the increase in denominator sum, together with finiteness, yields termination.",
     "quote": "Each replacement preserves the number of terms and increases the sum of their denominators"
    }
   ],
   "rejected": 0
  },
  "lem:greedy": {
   "label": "lem:greedy",
   "role": "This lemma bounds how many greedy unit-fraction subtractions are needed to reach zero or a remainder with a denominator in the specified range.",
   "checks": [
    {
     "point": "Check how the indexing of positive steps and the stopping threshold yield the stated bound on the total number of steps.",
     "quote": "If the procedure has not yet stopped, its positive integer numerator gives \\(x_j\\ge 1/C_j>1/T\\)."
    },
    {
     "point": "Check how the estimate for successive remainders is iterated from the first positive remainder.",
     "quote": "The first positive remainder is less than \\(1/2\\), and subsequent remainders decrease at least by squaring."
    }
   ],
   "rejected": 0
  },
  "lem:divisor": {
   "label": "lem:divisor",
   "role": "The lemma bounds the average \\(r\\)-th power of the truncated divisor function over a shifted interval, uniformly in the stated parameter ranges.",
   "checks": [
    {
     "point": "Trace how the cases for the next prime cover the full range and how the intermediate-prime estimate is summed.",
     "quote": "It remains to treat\n\\(4\\log S\\le\\log p<v^{15/16}\\)."
    },
    {
     "point": "Check how the accumulated exponential and logarithmic losses are absorbed into the stated \\(\\exp(S^{1/4})\\) bound.",
     "quote": "The logarithmic loss is \\(o(S^{1/4})\\), proving\n\\eqref{eq:divisor-moment}."
    }
   ],
   "rejected": 0
  },
  "lem:residues": {
   "label": "lem:residues",
   "role": "This lemma constructs a common modulus and indexed lists whose entries provide the required residue bounds across the intermediate and terminal ranges.",
   "checks": [],
   "rejected": 3
  },
  "lem:discrepancy": {
   "label": "lem:discrepancy",
   "role": "This lemma uses Fourier smallness to show that a positive proportion of the listed integers have a small upward-rounding residue modulo \\(u\\).",
   "checks": [
    {
     "point": "Check that the stated frequency range and Fourier bounds give the claimed discrepancy estimate with constants sufficient for the eventual half-length bound.",
     "quote": "The discrepancy is\n\\[\n O\\bigl(e^{-4\\eta w}+(1+4\\eta w)e^{-3\\eta w}\\bigr)\n =o(e^{-\\eta w})."
    },
    {
     "point": "Check that the chosen interval and fractional-part identity handle the zero-residue case and match the inequality in the conclusion.",
     "quote": "\\(\\{-Qt/u\\}=(u\\lceil Qt/u\\rceil-Qt)/u\\), including when the residue is zero."
    }
   ],
   "rejected": 0
  },
  "lem:reciprocal-phase": {
   "label": "lem:reciprocal-phase",
   "role": "The lemma gives a power-saving bound, uniform over the stated range of \\(Z\\), for sums with reciprocal phase.",
   "checks": [
    {
     "point": "Check that choosing the nearest integer \\(k\\) gives the stated derivative-scale range uniformly, including at the endpoints for \\(Z\\), and that the resulting constants are uniform over the finite set of \\(k\\).",
     "quote": "There are only finitely many possible orders:"
    },
    {
     "point": "Check the second-derivative estimate’s treatment of the portions where \\(g'\\) is near an integer, including the conversion from their total length and number of components to a bound on integer points.",
     "quote": "The portions where \\(g'\\) is within \\(\\beta\\) of an integer have \\(O_A(U\\lambda+1)\\) components and total length"
    }
   ],
   "rejected": 1
  },
  "lem:deterministic": {
   "label": "lem:deterministic",
   "role": "This lemma bounds the mean squared exponential sum over the deterministic list \\(T_0\\), uniformly over the stated levels, frequencies, and \\(C\\).",
   "checks": [
    {
     "point": "Check how distinctness and the size of \\(T_0\\) yield the stated diagonal contribution.",
     "quote": "because the \\(2^m\\) subset products are distinct."
    },
    {
     "point": "Check that the parameter bounds imply these inequalities for every dyadic piece, uniformly over the allowed \\(C\\) and ℓ.",
     "quote": "U^4\\le |Z|\\le U^{3D_C}."
    },
    {
     "point": "Check that the reciprocal-phase lemma applies to the truncated dyadic intersections with constants uniform in \\(C\\).",
     "quote": "Lemma~\\ref{lem:reciprocal-phase}, with the fixed value \\(B=3D_C\\),"
    }
   ],
   "rejected": 0
  },
  "lem:random": {
   "label": "lem:random",
   "role": "This lemma provides an expected Fourier-cancellation bound for random product frequencies, uniformly over the stated moduli and multipliers.",
   "checks": [
    {
     "point": "Check that the exposure leaves the fresh product variables independent, including when sampled primes have equal values.",
     "quote": "Equal prime values cause no difficulty: the \\(I\\)-selected and \\(J\\)-selected variables at a differing coordinate are distinct independent samples."
    },
    {
     "point": "Check the atom-probability estimate for fresh products, especially the use of unique factorization and the resulting factorial bound.",
     "quote": "By unique factorization, an integer can arise as the product of at most \\(s!\\) ordered \\(s\\)-tuples of primes."
    },
    {
     "point": "Check that the exceptional-event and cancellation estimates yield the claimed uniformity over the full ranges of parameters.",
     "quote": "The onset is absolute and uniform in \\(u,l,\\mathcal P\\)."
    }
   ],
   "rejected": 0
  },
  "lem:marked-cleanup": {
   "label": "lem:marked-cleanup",
   "role": "The lemma turns a unit-fraction representation with a denominator divisible by \\(Q\\) into one with distinct denominators, using at most the original number of terms.",
   "checks": [
    {
     "point": "Check that the two displayed replacement identities preserve the sum and do not increase the number of terms.",
     "quote": "\\frac2m=\\frac1{m/2}\\quad(m\\text{ even}),\n \\qquad\n \\frac2m=\\frac1{(m+1)/2}+\\frac1{m(m+1)/2}"
    },
    {
     "point": "Check that the argument covers preservation of a denominator divisible by \\(Q\\) in both replacement cases.",
     "quote": "if $Q\\mid m$, the even replacement $m/2$ is a multiple of $Q$ because $Q$ is odd, and the larger odd replacement is a multiple of $m$."
    },
    {
     "point": "Check the lexicographic descent and termination argument for the sorted denominator tuple at fixed length.",
     "quote": "The sorted denominator tuple therefore strictly decreases lexicographically: all entries below $(m+1)/2$ are unchanged, and one extra copy of $(m+1)/2$ is inserted."
    }
   ],
   "rejected": 0
  },
  "lem:marked-greedy-prefix": {
   "label": "lem:marked-greedy-prefix",
   "role": "This lemma constructs a greedy reciprocal-sum prefix that avoids denominator $m$ and leaves a controlled remainder, with bounds on its length and product.",
   "checks": [
    {
     "point": "Trace how the exceptional choice $n_{i+1}=m+1$ affects denominator growth and the subsequent remainder bounds.",
     "quote": "n_{i+1}=\\begin{cases}a,&a\\ne m,\\\\m+1,&a=m,\\end{cases}"
    },
    {
     "point": "Check the index bookkeeping that turns the remainder decay, including the exceptional step, into the stated bound on $j$.",
     "quote": "All later steps square the upper bound for the remainder, apart from at most one step that still decreases it."
    },
    {
     "point": "Follow the final-step denominator bound through $n_i\\le q_{i-1}+1$ to the strict upper bound on $q$.",
     "quote": "q_j\\le q_{j-1}(q_{j-1}+1)<T^2"
    }
   ],
   "rejected": 0
  },
  "lem:exact-marker-padding": {
   "label": "lem:exact-marker-padding",
   "role": "This lemma pads an \\(r\\)-term representation of 1 to \\(r+1\\) distinct unit fractions while retaining a chosen denominator, yielding \\(D_r\\subseteq D_{r+1}\\).",
   "checks": [
    {
     "point": "Check that the proposed split is an identity and that the stated ordering ensures the new denominators avoid the unchanged terms and the exceptional value of \\(v\\).",
     "quote": "\\frac1s=\\frac1{s+a}+\\frac1{b(s+a)}"
    },
    {
     "point": "Check the denominator-clearing and congruence steps in both prime exceptional cases, using the stated condition \\(p\\nmid B\\).",
     "quote": "After clearing denominators and reducing modulo $p$, these equations give respectively"
    }
   ],
   "rejected": 0
  },
  "prop:marked-length": {
   "label": "prop:marked-length",
   "role": "This result turns the marked prefix and its remainder into a distinct unit-fraction representation of 1 with exact denominator m and the stated asymptotic length bound.",
   "checks": [
    {
     "point": "Check that the supply-size estimate yields the stated bound on G uniformly over the possible values of R.",
     "quote": "G\\le\\frac{\\log(RK_m)}{2\\log m}+2"
    },
    {
     "point": "Check that the constructed denominator q meets all hypotheses of the marked-divisor-density lemma.",
     "quote": "The denominator $q$ is retained without cancellation, beginning at $m$ and using multipliers at most the preceding denominator plus one."
    },
    {
     "point": "Check that the tail distinctification preserves its term count and that its size guarantees no denominator collides with the reserved term or prefix.",
     "quote": "It makes its denominators distinct without changing its number of terms."
    }
   ],
   "rejected": 0
  },
  "lem:rational-divisor-supply": {
   "label": "lem:rational-divisor-supply",
   "role": "This lemma supplies a divisor-controlled representation of every integer up to \\(Y\\) using at most 16 rational summands, while bounding the size of the common modulus \\(K_m\\).",
   "checks": [
    {
     "point": "Check the exceptional-prime count and how it compares with the number of three-prime representations, since this is used to obtain representations avoiding all exceptional primes.",
     "quote": "For any two distinct members $a,b\\in A$, the nonzero integer $|a-b|<P(u)$ has at most $\\log P(u)/\\log 2$ distinct prime divisors."
    },
    {
     "point": "Check the uniform lower bound for the singular series over odd \\(u\\), which underlies the absolute threshold for the three-prime representation count.",
     "quote": "Thus the asymptotic formula supplies an absolute lower bound with an absolute threshold, with no dependence on the factorization of $u$."
    },
    {
     "point": "Check how the five-product congruence is lifted to positive divisors and converted into a rational representation with a shared denominator.",
     "quote": "The five integer products $e_1,\\ldots,e_5$ are positive divisors of $P(u)^2$, and their sum is divisible by $p$."
    }
   ],
   "rejected": 0
  },
  "lem:marked-divisor-density": {
   "label": "lem:marked-divisor-density",
   "role": "This lemma establishes that every interval \\([w/m,w]\\) with \\(1\\le w\\le q\\) contains a positive divisor of the grown value \\(q\\).",
   "checks": [
    {
     "point": "Check that the rescaled parameter falls in the induction hypothesis range and that multiplying the divisor gives the required bounds.",
     "quote": "apply the property at $w/n$ and multiply the resulting divisor by $n$."
    },
    {
     "point": "In the uncovered gap, check that the chosen divisor meets the lower bound using the stated restriction on \\(n\\).",
     "quote": "w<n\\le q+1\\le mq."
    }
   ],
   "rejected": 1
  },
  "lem:marked-grouping": {
   "label": "lem:marked-grouping",
   "role": "This lemma converts the assumed bounded rational representations of small integers into a unit-fraction representation of \\(X/(qK_m)\\) with a logarithmic term bound.",
   "checks": [
    {
     "point": "Check how the divisor condition is applied to \\(w=X_i/m^2\\) to obtain the stated interval for \\(d_i\\), and how that interval gives the claimed range for \\(s_i\\).",
     "quote": "Choose $d_i\\mid q$ with\n\\[\n  \\frac{X_i}{m^3}\\le d_i\\le\\frac{X_i}{m^2},\n  \\qquad s_i=\\left\\lfloor\\frac{X_i}{d_i}\\right\\rfloor.\n\\]"
    },
    {
     "point": "Check the group-count estimate, especially the logarithmic bound when \\(X=1\\) and the case where the remainder is already zero.",
     "quote": "G\\le\\left\\lceil\\frac{\\log X}{2\\log m}\\right\\rceil+1\n    \\le\\frac{\\log X}{2\\log m}+2."
    }
   ],
   "rejected": 1
  }
 }
};
