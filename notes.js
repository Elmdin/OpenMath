window.NOTES = {
 "provider": "agent37",
 "seconds": 27.7,
 "notes": {
  "thm:main": {
   "label": "thm:main",
   "role": "This theorem combines an \\(O(\\log\\log b)\\) construction uniform over numerators with a matching lower-bound witness at numerator \\(b-1\\).",
   "checks": [
    {
     "point": "Check that the cited greedy lemma and density proposition apply with these parameter ranges and yield constants uniform in the numerator.",
     "quote": "Apply Lemma~\\ref{lem:greedy} with \\(T=e^{D_CS}\\)."
    },
    {
     "point": "Check the split-counting and denominator-scaling steps that turn the selected pair of expansions into an expansion of the remainder.",
     "quote": "Among the \\(n-1\\) positive splits \\(n=u+(n-u)\\), at most \\(2|H|\\le X/4\\) have an entry outside \\(G\\)."
    },
    {
     "point": "Check the lower-bound argument linking the denominator product recurrence to the claimed bound for \\(b\\).",
     "quote": "As \\(b\\) is one of these denominators,\n\\[\n b\\le d_s\\le s^{2^{s-1}}=(k+1)^{2^k}.\n\\]"
    }
   ],
   "rejected": 0
  },
  "cor:counting": {
   "label": "cor:counting",
   "role": "This corollary bounds the growth of the counting function \\(F(k)\\), showing that its double logarithm is linear in \\(k\\) up to absolute constants.",
   "checks": [
    {
     "point": "A referee should trace the application of the main theorem and cleanup lemma to confirm the stated size and multiple properties of the fixed denominator set.",
     "quote": "Lemma~\\ref{lem:marked-cleanup} produces a distinct expansion of one whose denominator set $S$ has size $s=O(\\log r)$ and contains a multiple $n$ of $Q$."
    },
    {
     "point": "A referee should check the denominator bounds used to count the larger box of possible tuples and derive the upper bound for $F(k)$.",
     "quote": "Inductively $P_i\\le k^{2^i-1}$ and $n_i\\le k^{2^{i-1}}$."
    }
   ],
   "rejected": 1
  },
  "cor:prescribed": {
   "label": "cor:prescribed",
   "role": "This corollary converts the marked-expansion length bound and the denominator recurrence into exponential-in-kk bounds on klogklog v(k).",
   "checks": [
    {
     "point": "Check that the padding lemma applies repeatedly while preserving the exact denominator m and the required distinctness.",
     "quote": "Thus Lemma~\\ref{lem:exact-marker-padding} may be iterated until the length is exactly $k$, retaining the exact integer $m$."
    }
   ],
   "rejected": 2
  },
  "prop:density": {
   "label": "prop:density",
   "role": "The proposition shows that, uniformly over the allowed values of \\(C\\), a set containing at least seven-eighths of the integers up to \\(X\\) has expansions of \\(u/(MC)\\) using \\(O(\\log S)\\) unit fractions.",
   "checks": [
    {
     "point": "Check how the cited residue lemma supplies a single \\(M\\) with the required bounds for every allowed \\(C\\).",
     "quote": "choose the common integer \\(M\\) supplied by Lemma~\\ref{lem:residues}."
    },
    {
     "point": "Check the descent identity and length accounting, especially the transition from \\(C_j=C\\) to \\(C_{j+1}=1\\).",
     "quote": "This includes the possible transition from \\(C_j=C\\) to \\(C_{j+1}=1\\), where the second scaling factor is \\(zC\\)."
    },
    {
     "point": "Check the uniform divisor-moment estimate and recurrence used to bound the exceptional set at level zero.",
     "quote": "Thus Lemma~\\ref{lem:divisor}, with the fixed parameters \\(D_*,r\\), applies uniformly at every level and to every list entry."
    }
   ],
   "rejected": 0
  },
  "lem:distinct": {
   "label": "lem:distinct",
   "role": "The lemma lets the argument replace any \\(k\\)-term unit-fraction representation of \\(x<1\\) with one whose denominators are distinct and at least \\(2\\).",
   "checks": [
    {
     "point": "Check the two replacement identities and the stated increases in denominator sum, which drive the termination argument.",
     "quote": "the increases are \\((p-1)^2\\) and \\(2p^2\\), respectively."
    },
    {
     "point": "Check the handling of denominator \\(1\\), including why it cannot appear in the final representation.",
     "quote": "Positivity and the unchanged total exclude a denominator \\(1\\) throughout."
    }
   ],
   "rejected": 1
  },
  "lem:greedy": {
   "label": "lem:greedy",
   "role": "This lemma provides a greedy unit-fraction procedure that either terminates or reaches a remainder with bounded numerator and denominator in \\([T,T^2)\\), with an explicit step limit.",
   "checks": [
    {
     "point": "Check how the first remainder estimate and the repeated squaring bound yield the stated step count, including the indexing of \\(j\\) against total greedy steps.",
     "quote": "The first positive remainder is less than \\(1/2\\)"
    }
   ],
   "rejected": 1
  },
  "lem:divisor": {
   "label": "lem:divisor",
   "role": "This lemma gives a uniform short-interval upper bound for the \\(r\\)-th moment of the \\(X\\)-truncated divisor function.",
   "checks": [
    {
     "point": "Check that the bounds on \\(v\\) make the stated estimate for \\(B\\) uniform throughout the allowed parameter range.",
     "quote": "1<B\\le1+\\log(2E\\log S)=O_D(\\log\\log S)."
    },
    {
     "point": "Check how the prefix \\(d\\) and the remaining factor \\(n/d\\) yield the divisor-function bound, including when they are not coprime.",
     "quote": "d_X(n)\\le \\tau(d)d_X(n/d)"
    },
    {
     "point": "Check that the accumulated contributions, including the number of intermediate-prime intervals, fit within the target \\(Y\\exp(S^{1/4})\\).",
     "quote": "O_{D,r}(S^{1/16}\\log\\log S+\\log S)"
    }
   ],
   "rejected": 0
  },
  "lem:residues": {
   "label": "lem:residues",
   "role": "The lemma constructs one common modulus and indexed lists with residue properties covering both the intermediate levels and all terminal integers.",
   "checks": [],
   "rejected": 3
  },
  "lem:discrepancy": {
   "label": "lem:discrepancy",
   "role": "The lemma turns small Fourier averages of the residues \\(Qt/u\\) into a lower bound on how many entries lie within \\(e^{-\\eta w}u\\) of the next multiple of \\(u\\).",
   "checks": [
    {
     "point": "Check that the implied constant and the dependence on \\(w\\) in the discrepancy estimate give the claimed eventual half-threshold.",
     "quote": "O\\bigl(e^{-4\\eta w}+(1+4\\eta w)e^{-3\\eta w}\\bigr)\n=o(e^{-\\eta w})."
    }
   ],
   "rejected": 2
  },
  "lem:reciprocal-phase": {
   "label": "lem:reciprocal-phase",
   "role": "This lemma supplies a uniform power-saving bound for reciprocal-phase sums, for use wherever the argument needs cancellation over intervals in \\([U,2U]\\).",
   "checks": [
    {
     "point": "Check the choice of the nearest-integer derivative order against the full stated range of \\(|Z|\\), including the endpoint cases.",
     "quote": "There are only finitely many possible orders:"
    },
    {
     "point": "Check how the repeated differencing bounds are iterated and how the final exponent is made uniform over all allowed orders.",
     "quote": "Induction, using \\(L\\ge U^{1/(10k)}/2\\) for large \\(U\\), yields"
    }
   ],
   "rejected": 1
  },
  "lem:deterministic": {
   "label": "lem:deterministic",
   "role": "This lemma bounds the mean squared exponential sum for the deterministic list over denominators in each interval \\((X_{j+1},X]\\), uniformly over the stated frequencies and \\(C\\).",
   "checks": [
    {
     "point": "Check that the bounds on \\(Z\\) and \\(U\\) imply the reciprocal-phase lemma’s hypotheses uniformly for all dyadic pieces, including pieces near the endpoints.",
     "quote": "U^4\\le |Z|\\le U^{3D_C}."
    },
    {
     "point": "Check that the reciprocal-phase lemma’s constants and range allow the decay to be uniform in \\(C\\) and strong enough after summing over the pieces.",
     "quote": "Lemma~\\ref{lem:reciprocal-phase}, with the fixed value \\(B=3D_C\\),"
    },
    {
     "point": "Check that the distinctness of the subset products yields the stated diagonal contribution, and that the resulting bound is at most the claimed target in the stated asymptotic regime.",
     "quote": "2^{-m}+O(e^{-cS})\\le e^{-0.01m}"
    }
   ],
   "rejected": 0
  },
  "lem:random": {
   "label": "lem:random",
   "role": "This lemma bounds the expected squared Fourier average of the random products, giving uniform exponential cancellation across the stated ranges of \\(u\\) and \\(l\\).",
   "checks": [
    {
     "point": "Check that the chosen product length satisfies both the required lower bound and the coordinate budget uniformly over the allowed \\(V\\).",
     "quote": "Since \\(V/(K\\log S)\\ge1000\\), and \\(V\\le S\\), we have"
    },
    {
     "point": "Check the divisor-count and union-bound estimates that control the probability of a small reduced denominator, including their dependence on \\(u\\) and \\(\\mathcal P\\).",
     "quote": "At most \\(S\\) primes in the sampling interval divide \\(u\\), so each sample has hit probability at most \\(S/P\\le S^{-(K-2)}\\)."
    },
    {
     "point": "Check that the atom bound for fresh products follows with the stated exponent and applies after reduction modulo \\(q\\).",
     "quote": "By unique factorization, an integer can arise as the product of at most \\(s!\\) ordered \\(s\\)-tuples of primes."
    }
   ],
   "rejected": 0
  },
  "lem:marked-cleanup": {
   "label": "lem:marked-cleanup",
   "role": "This lemma turns a unit-fraction representation with a denominator divisible by \\(Q\\) into one with distinct denominators and no more terms.",
   "checks": [
    {
     "point": "Check that the odd-denominator replacement preserves the sum and retains a denominator divisible by \\(Q\\) when the replaced denominator is a multiple of \\(Q\\).",
     "quote": "\\frac2m=\\frac1{(m+1)/2}+\\frac1{m(m+1)/2}"
    },
    {
     "point": "Check that the stated ordering of denominator tuples gives a terminating descent under the odd replacements.",
     "quote": "The sorted denominator tuple therefore strictly decreases lexicographically"
    }
   ],
   "rejected": 0
  },
  "lem:marked-greedy-prefix": {
   "label": "lem:marked-greedy-prefix",
   "role": "This lemma constructs a greedy Egyptian-fraction prefix that avoids denominator \\(m\\), while bounding its length, product, and final remainder for use in the subsequent argument.",
   "checks": [
    {
     "point": "Check how the exceptional update is accounted for in the repeated remainder bounds and the resulting bound on the number of steps.",
     "quote": "All later steps square the upper bound for the remainder, apart from at most one step that still decreases it."
    },
    {
     "point": "Trace how the denominator bound for the preceding state yields the claimed upper bound on the final product.",
     "quote": "$q_j\\le q_{j-1}(q_{j-1}+1)<T^2$"
    },
    {
     "point": "Check how the stepwise remainder comparisons imply the final strict comparison with every selected reciprocal.",
     "quote": "At each earlier step the new remainder was smaller than $1/n_i$, and subsequent steps only decrease it."
    }
   ],
   "rejected": 0
  },
  "lem:exact-marker-padding": {
   "label": "lem:exact-marker-padding",
   "role": "This lemma pads any representation of 1 by distinct unit fractions with one additional term while retaining a prescribed denominator, yielding the inclusion $D_r\\subseteq D_{r+1}$.",
   "checks": [
    {
     "point": "Check that the alternative split in the composite case gives the stated unit-fraction identity and that its new denominators are distinct from each other and from every unchanged denominator.",
     "quote": "\\frac1s=\\frac1{s+a}+\\frac1{b(s+a)}."
    },
    {
     "point": "Check the denominator-clearing and modular-reduction details in both prime exceptional cases, including the use of $p\\nmid B$.",
     "quote": "write the sum of their reciprocals as $A/B$ with $p\\nmid B$."
    }
   ],
   "rejected": 0
  },
  "prop:marked-length": {
   "label": "prop:marked-length",
   "role": "This proposition combines the marked-prefix and divisor-supply constructions to bound the number of distinct unit fractions needed to represent 1 with any sufficiently large exact denominator.",
   "checks": [
    {
     "point": "Check that the cited prefix and divisor-supply lemmas apply uniformly for the chosen parameter and give the stated prefix-length estimate.",
     "quote": "Apply Lemma~\\ref{lem:marked-greedy-prefix} with $T=2mK_m$, which is an integer at least $2m^2$."
    },
    {
     "point": "Check that the denominator retained in the prefix satisfies the hypotheses of the marked-divisor-density lemma.",
     "quote": "The denominator $q$ is retained without cancellation, beginning at $m$ and using multipliers at most the preceding denominator plus one."
    },
    {
     "point": "Check how the grouping bound and its constant yield the stated total coefficient, including the asserted uniformity in $m$.",
     "quote": "All errors here tend to zero as $m$ tends to infinity through all\nintegers: the bound on $R$ removed any dependence on the chosen\nstopping numerator, and the supply covers both parities."
    }
   ],
   "rejected": 0
  },
  "lem:rational-divisor-supply": {
   "label": "lem:rational-divisor-supply",
   "role": "This lemma constructs a controlled-size integer whose divisors supply numerators for representing every integer up to \\(m^4\\) as a sum of at most 16 positive rational terms.",
   "checks": [
    {
     "point": "Check the cited three-prime theorem gives the stated lower bound for ordered representations uniformly over all sufficiently large odd integers, including the claimed singular-series lower bound.",
     "quote": "Thus the asymptotic formula supplies an absolute lower bound with an absolute threshold, with no dependence on the factorization of $u$."
    },
    {
     "point": "Check the size estimate for \\(K_m\\) retains the stated leading constant after squaring \\(P(Y)\\), with the factorial term negligible.",
     "quote": "\\log K_m\\leq\n \\left(\\frac{32}{\\log 2}+o(1)\\right)\\log m\\log\\log m"
    }
   ],
   "rejected": 1
  },
  "lem:marked-divisor-density": {
   "label": "lem:marked-divisor-density",
   "role": "This lemma propagates a divisor-density property from the initial integer \\(m\\) to every \\(q\\) reachable by the permitted multiplicative replacements.",
   "checks": [
    {
     "point": "Check how the induction cases cover the full real interval, especially the boundary values and the separately treated gap.",
     "quote": "These two cases cover $[1,nq]$ unless $q<n$ and $q<w<n$."
    },
    {
     "point": "Check the bounds used to show that the divisor \\(q\\) serves throughout the gap, including the dependence on \\(m\\ge2\\).",
     "quote": "w<n\\le q+1\\le mq."
    }
   ],
   "rejected": 0
  },
  "lem:marked-grouping": {
   "label": "lem:marked-grouping",
   "role": "This lemma turns the assumed short rational representations of bounded integers into a unit-fraction representation of \\(X/(qK_m)\\), with a logarithmic bound on the number of terms.",
   "checks": [
    {
     "point": "Check how the divisor-size hypothesis applies at each stage to obtain a divisor in the stated interval.",
     "quote": "\\frac{X_i}{m^3}\\le d_i\\le\\frac{X_i}{m^2},"
    },
    {
     "point": "Check how the divisibilities ensure that the displayed summands are unit fractions and how the group bounds give the term count.",
     "quote": "Each displayed denominator is a positive integer."
    }
   ],
   "rejected": 1
  }
 }
};
