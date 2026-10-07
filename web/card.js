window.CARD = {
 "paper": "family-025",
 "root": "thm:main",
 "map": {
  "nodes": [
   {
    "label": "thm:main",
    "kind": "theorem",
    "title": "",
    "statement": "There are absolute constants $c_1,c_2>0$ and $b_0$ such that, for every\ninteger $b\\ge b_0$,\n\\[\n c_1\\log\\log b\\le N(b)\\le c_2\\log\\log b.\n\\]\nIn particular, the upper bound holds for every integer numerator\n$1\\le a<b$.",
    "deps": [
     "lem:greedy",
     "lem:distinct",
     "prop:density"
    ]
   },
   {
    "label": "cor:counting",
    "kind": "corollary",
    "title": "",
    "statement": "There are absolute constants $c,C>0$ and $k_0$ such that, for every\ninteger $k\\ge k_0$,\n\\[\n ck\\le\\log\\log F(k)\\le Ck.\n\\]",
    "deps": [
     "thm:main",
     "lem:marked-cleanup"
    ]
   },
   {
    "label": "cor:prescribed",
    "kind": "corollary",
    "title": "",
    "statement": "For every sufficiently large integer $k$,\n\\[\n \\exp\\bigl(\\exp(k/600)\\bigr)\\le v(k)\\le1+k^{2^{k-1}}.\n\\]\nMore precisely,\n\\[\n \\frac{\\log2}{257}\n \\le\\liminf_{k\\to\\infty}\\frac{\\log\\log v(k)}k\n \\le\\limsup_{k\\to\\infty}\\frac{\\log\\log v(k)}k\n \\le\\log2.\n\\]\nEquivalently for the lower bound, every fixed $c<\\log2/257$ satisfies\n$v(k)\\ge\\exp(\\exp(ck))$ for every sufficiently large integer $k$.\nIn particular $\\log\\log v(k)=\\Theta(k)$.",
    "deps": [
     "prop:marked-length",
     "lem:exact-marker-padding",
     "cor:counting"
    ]
   },
   {
    "label": "prop:density",
    "kind": "proposition",
    "title": "A dense set of short expansions",
    "statement": "There are absolute constants \\(D_M>1\\), \\(L>0\\), and \\(S_0>1\\) with the\nfollowing property.  Put \\(D_X=D_M+2\\) and \\(D_C=4D_X\\).\nFor every real \\(S\\ge S_0\\) and every integer \\(C\\) satisfying\n\\[\n e^{D_CS}\\le C\\le e^{2D_CS},\n\\]\nthere are an integer \\(M\\) and a set\n\\(G\\subseteq\\{1,\\ldots,\\lfloor X\\rfloor\\}\\), where \\(X=e^{D_XS}\\), such that\n\\[\n e^S<M\\le e^{D_MS},\n \\qquad\n \\bigl|\\{1,\\ldots,\\lfloor X\\rfloor\\}\\setminus G\\bigr|\\le \\frac X8.\n\\]\nFor each \\(u\\in G\\), the fraction \\(u/(MC)\\) is a sum of at most\n\\(L\\log S\\) unit fractions with integer denominators at least \\(2\\).\nRepetitions are allowed.",
    "deps": [
     "lem:residues",
     "lem:divisor"
    ]
   },
   {
    "label": "lem:distinct",
    "kind": "lemma",
    "title": "Removing repetitions",
    "statement": "Let \\(k\\ge1\\) be an integer.  If \\(0<x<1\\) is a sum of \\(k\\) positive unit fractions with integer\ndenominators, then it is a sum of \\(k\\) such fractions with distinct\ndenominators, all at least \\(2\\).",
    "deps": []
   },
   {
    "label": "lem:greedy",
    "kind": "lemma",
    "title": "Preparing the denominator",
    "statement": "Let \\(1\\le a<b\\) be integers and let \\(T>b\\) be real.\nAfter at most\n\\[\n 1+\\left\\lceil\\log_2\\left(\\frac{\\log T}{\\log 2}\\right)\\right\\rceil\n\\]\ngreedy steps, either \\(a/b\\) has been expressed as a sum of unit fractions,\nor its positive remainder can be written as \\(A/C\\), with integers\n\\[\n 1\\le A\\le a,\\qquad T\\le C<T^2.\n\\]\nAll unit denominators produced are at least \\(2\\).\nThe fractions used during this procedure need not be reduced.",
    "deps": []
   },
   {
    "label": "lem:divisor",
    "kind": "lemma",
    "title": "",
    "statement": "For every fixed pair of real numbers \\(D,r\\ge1\\), there is\n\\(S_0(D,r)\\) such that the following holds for \\(S\\ge S_0(D,r)\\).\nSuppose that \\(X,Y\\) are real numbers and \\(N\\) is a nonnegative integer\nsatisfying\n\\[\n \\frac{S}{2\\log S}\\le \\log X\\le DS,\\qquad\n X^{1/2}\\le Y\\le X,\\qquad N\\le e^{DS}.\n\\]\nThen\n\\begin{equation}\n \\sum_{1\\le h\\le Y}d_X(N+h)^r\\le Y\\exp(S^{1/4}).\n\\end{equation}",
    "deps": []
   },
   {
    "label": "lem:residues",
    "kind": "lemma",
    "title": "",
    "statement": "For all sufficiently large \\(S\\) and every integer \\(C\\) satisfying\n\\eqref{eq:C-range}, there are an integer \\(M\\) and indexed lists\n\\(T_0,T_1,\\ldots,T_R\\), each with \\(2^m\\) entries, such that:\n\\begin{enumerate}\n\\item\n\\(e^S<M\\le e^{D_MS}\\), and the least power of \\(2\\) at least\n\\(S^{D_0}\\) divides \\(M\\).  Every entry of every \\(T_i\\) divides \\(M\\).\n\\item\nFor each \\(0\\le j<d\\), let \\(T=T_0\\) if \\(X_j>e^S\\), and let\n\\(T=T_1\\) otherwise.  Apart from at most\n\\(X_j e^{-c_*m}\\) integers \\(u\\in(X_{j+1},X_j]\\), at least\n\\(\\rho |T|/2\\) entries \\(t\\in T\\) satisfy\n\\[\n h_{j,t}(u)\\le X_{j+1},\n \\qquad c_*=0.001.\n\\]\n\\item\nFor every integer \\(S^{D_0}<u\\le e^m\\), some entry \\(t\\) of one of\n\\(T_1,\\ldots,T_R\\) satisfies\n\\[\n u\\lceil t/u\\rceil-t\\le u^{1-\\eta}.\n\\]\n\\end{enumerate}\nRepeated values in a list are counted with their indices.\nThe threshold on \\(S\\) is independent of \\(C\\).",
    "deps": [
     "lem:deterministic",
     "lem:discrepancy",
     "lem:random"
    ]
   },
   {
    "label": "lem:discrepancy",
    "kind": "lemma",
    "title": "",
    "statement": "For all sufficiently large real \\(w\\), suppose \\(u,Q\\) are positive\nintegers and \\(T\\) is a nonempty finite list of positive integers.\nIf\n\\[\n \\left|\\frac1{|T|}\\sum_{t\\in T}\\e(\\ell Qt/u)\\right|\n \\le e^{-3\\eta w}\n \\quad\n \\left(1\\le\\ell\\le\\lfloor e^{4\\eta w}\\rfloor\\right),\n\\]\nthen at least \\(e^{-\\eta w}|T|/2\\) entries satisfy\n\\[\n 0\\le u\\lceil Qt/u\\rceil-Qt<e^{-\\eta w}u.\n\\]",
    "deps": []
   },
   {
    "label": "lem:reciprocal-phase",
    "kind": "lemma",
    "title": "",
    "statement": "Fix \\(B\\ge4\\).  There are constants \\(A_B,\\delta_B>0\\) such that,\nfor every sufficiently large \\(U\\), every real \\(Z\\) with\n\\(U^4\\le |Z|\\le U^B\\), and every interval \\(I\\subset[U,2U]\\),\n\\[\n \\left|\\sum_{n\\in I}\\e(Z/n)\\right|\\le A_BU^{1-\\delta_B}.\n\\]",
    "deps": []
   },
   {
    "label": "lem:deterministic",
    "kind": "lemma",
    "title": "",
    "statement": "For the deterministic list \\(T_0\\) constructed above, every level\n\\(0\\le j<d\\) with \\(X=X_j>e^S\\), and every integer\n\\(1\\le\\ell\\le H:=\\lfloor e^{4\\eta m}\\rfloor\\), one has\n\\begin{equation}\n \\frac1X\\sum_{X_{j+1}<u\\le X}\n \\left|\\frac1{|T_0|}\\sum_{t\\in T_0}\\e(\\ell Ct/u)\\right|^2\n \\le e^{-0.01m}\n\\end{equation}\nfor all sufficiently large \\(S\\), uniformly in \\(C\\).",
    "deps": [
     "lem:reciprocal-phase"
    ]
   },
   {
    "label": "lem:random",
    "kind": "lemma",
    "title": "",
    "statement": "Let \\(K=100\\), \\(D_0=100000\\), and \\(m=\\lfloor S/\\log S\\rfloor\\).\nLet \\(\\mathcal P\\) be a set of primes in \\([S^K,2S^K]\\) with\n\\(P=|\\mathcal P|\\ge S^{K-1}\\), and sample\n\\[\n p_{j,\\epsilon}\\qquad\n (1\\le j\\le m,\\ \\epsilon\\in\\{0,1\\})\n\\]\nindependently and uniformly from \\(\\mathcal P\\).  For\n\\(I\\in\\{0,1\\}^m\\), put \\(t_I=\\prod_{j=1}^m p_{j,I_j}\\).\nFor every integer \\(u\\) such that\n\\[\n D_0\\log S\\le V:=\\log u\\le S,\n \\qquad w=\\min(m,V),\n\\]\nand every integer \\(1\\le l\\le \\exp(0.005w)\\), one has\n\\begin{equation}\n \\E\\left|2^{-m}\\sum_{I\\in\\{0,1\\}^m}\\e(lt_I/u)\\right|^2\n \\le \\exp(-0.01w)\n\\end{equation}\nfor all sufficiently large \\(S\\).  The onset is absolute and uniform in\n\\(u,l,\\mathcal P\\).",
    "deps": []
   },
   {
    "label": "lem:marked-cleanup",
    "kind": "lemma",
    "title": "",
    "statement": "Let $Q>1$ be odd. Suppose that a finite list of positive integers\n$m_1,\\ldots,m_t$ satisfies $\\sum_{i=1}^t1/m_i=1$ and contains a\nmultiple of $Q$. Then $1$ has a representation by at most $t$ distinct\npositive unit fractions, still with a denominator divisible by $Q$.",
    "deps": []
   },
   {
    "label": "lem:marked-greedy-prefix",
    "kind": "lemma",
    "title": "A greedy prefix avoiding one denominator",
    "statement": "Let $m\\ge4$ and $T\\ge2m^2$ be integers.\nThere are integers $2\\le n_1<\\cdots<n_j$, none equal to $m$,\nand integers $q>0$ and $0\\le R<2m$ such that\n\\[\n  1=\\frac1m+\\sum_{i=1}^{j}\\frac1{n_i}+\\frac Rq,\n  \\qquad q=m\\prod_{i=1}^{j}n_i,\n  \\qquad\n  j<3+\\log_2\\log_2 T.\n\\]\nWriting $q_0=m$ and $q_i=m\\prod_{h=1}^{i}n_h$ for $1\\le i\\le j$,\nwe have $n_i\\le q_{i-1}+1$ for every $1\\le i\\le j$.\nIf $R>0$, then\n\\[\n  q\\ge T,\\qquad\n  \\frac Rq<\\frac{2m}{T}\\le\\frac1m,\n  \\qquad \\frac Rq<\\frac1{n_i}\\quad(1\\le i\\le j).\n\\]\nIn either case $q<T^2$.",
    "deps": []
   },
   {
    "label": "lem:exact-marker-padding",
    "kind": "lemma",
    "title": "Preserving a prescribed denominator while padding",
    "statement": "Let $r\\ge3$ be an integer, and suppose that\n\\[\n 1=\\sum_{i=1}^{r}\\frac1{n_i},\\qquad\n 1\\le n_1<\\cdots<n_r,\n\\]\nwhere the denominators are integers. For every\n$m\\in\\{n_1,\\ldots,n_r\\}$ there is a representation of $1$ by\nexactly $r+1$ distinct positive unit fractions that still contains\nthe exact denominator $m$. Consequently $D_r\\subseteq D_{r+1}$.",
    "deps": []
   },
   {
    "label": "prop:marked-length",
    "kind": "proposition",
    "title": "",
    "statement": "For every $\\varepsilon>0$ there is an integer $m_\\varepsilon$ such\nthat every integer $m\\ge m_\\varepsilon$ occurs as an exact denominator\nin a representation of $1$ by distinct positive unit fractions with\nat most\n\\[\n \\left(\\frac{257}{\\log 2}+\\varepsilon\\right)\\log\\log m\n\\]\nterms.",
    "deps": [
     "lem:rational-divisor-supply",
     "lem:marked-greedy-prefix",
     "lem:marked-divisor-density",
     "lem:marked-grouping",
     "lem:distinct"
    ]
   },
   {
    "label": "lem:rational-divisor-supply",
    "kind": "lemma",
    "title": "",
    "statement": "For every sufficiently large integer $m$, put\n\\[\n L=\\log\\log m,\\qquad Y=m^4,\\qquad\n \\ell(v)=\\left\\lceil\\frac{4\\log v}{\\log 2}\\right\\rceil\n \\quad(v\\geq2).\n\\]\nLet $P(v)$ be the product of the first $\\ell(v)$ primes, and define\n\\[\n K_m=P(Y)^2\\,\\lfloor L\\rfloor!.\n\\]\nThen $K_m>m$ and\n\\begin{equation}\n \\log K_m\\leq\n \\left(\\frac{32}{\\log 2}+o(1)\\right)\\log m\\log\\log m\n \\qquad(m\\longrightarrow\\infty).\n\\end{equation}\nMoreover, every integer $1\\leq s\\leq Y$ has a representation\n\\begin{equation}\n s=\\sum_{i=1}^{h}\\frac{e_i}{t_i},\\qquad\n h\\leq16,\\quad e_i\\mid K_m,\\quad e_i,t_i\\in\\mathbb Z_{>0}.\n\\end{equation}\nRepeated summands are allowed.",
    "deps": []
   },
   {
    "label": "lem:marked-divisor-density",
    "kind": "lemma",
    "title": "",
    "statement": "Let $m\\ge2$ be an integer.  Suppose that $q$ is obtained from $m$ by a\nfinite sequence of replacements $q\\mapsto nq$, where at each replacement\n$n$ is a positive integer satisfying $n\\le q+1$.  Then, for every real\nnumber $w$ with $1\\le w\\le q$, there is a positive divisor $d$ of $q$ such\nthat\n\\[\n  \\frac wm\\le d\\le w.\n\\]",
    "deps": []
   },
   {
    "label": "lem:marked-grouping",
    "kind": "lemma",
    "title": "",
    "statement": "Let $m\\ge2$, $q\\ge1$, $K_m\\ge1$, and $B\\ge1$ be integers.  Suppose that, for every\nreal $w\\in[1,q]$, the integer $q$ has a divisor in $[w/m,w]$.  Suppose\nalso that each integer $s\\in[1,m^4]$ can be written as a sum of at most\n$B$ positive rational numbers $e/t$, where $e\\mid K_m$ and $t$ is a\npositive integer.  Then, for every integer $X$ with $1\\le X\\le q$, the\nrational number $X/(qK_m)$ is a sum of at most\n\\[\n  B\\left(\\frac{\\log X}{2\\log m}+2\\right)\n\\]\npositive unit fractions, with repetitions allowed.",
    "deps": []
   }
  ]
 },
 "spine": [
  "thm:main",
  "lem:greedy",
  "lem:distinct",
  "prop:density",
  "lem:residues",
  "lem:divisor",
  "lem:deterministic",
  "lem:discrepancy",
  "lem:random",
  "lem:reciprocal-phase"
 ],
 "formal": {
  "file": "ShortEgyptianFractions.lean",
  "source": "import Mathlib\n\nnamespace OAI\n\nnamespace ShortEgyptian\n\ndef IsExpansion (a b : \u2115) (ns : List \u2115) : Prop :=\n  ns.Pairwise (\u00b7 < \u00b7) \u2227 (\u2200 n \u2208 ns, 2 \u2264 n) \u2227\n    (ns.map (fun n => (1 : \u211a) / (n : \u211a))).sum = (a : \u211a) / (b : \u211a)\n\nnoncomputable def minLength (a b : \u2115) : \u2115 :=\n  sInf {k : \u2115 | \u2203 ns : List \u2115, IsExpansion a b ns \u2227 ns.length = k}\n\nnoncomputable def maxMinLength (b : \u2115) : \u2115 :=\n  (Finset.Ico 1 b).sup (fun a => minLength a b)\n\ntheorem main :\n    (\u2200 a b : \u2115, 1 \u2264 a \u2192 a < b \u2192 \u2203 ns : List \u2115, IsExpansion a b ns) \u2227\n    \u2203 c\u2081 c\u2082 : \u211d, 0 < c\u2081 \u2227 0 < c\u2082 \u2227 \u2203 b\u2080 : \u2115, 2 \u2264 b\u2080 \u2227\n      \u2200 b : \u2115, b\u2080 \u2264 b \u2192\n        c\u2081 * Real.log (Real.log (b : \u211d)) \u2264 (maxMinLength b : \u211d) \u2227\n        (maxMinLength b : \u211d) \u2264 c\u2082 * Real.log (Real.log (b : \u211d)) := by\n  sorry\n\nend ShortEgyptian\n\nend OAI\n",
  "theorem": "theorem main :\n    (\u2200 a b : \u2115, 1 \u2264 a \u2192 a < b \u2192 \u2203 ns : List \u2115, IsExpansion a b ns) \u2227\n    \u2203 c\u2081 c\u2082 : \u211d, 0 < c\u2081 \u2227 0 < c\u2082 \u2227 \u2203 b\u2080 : \u2115, 2 \u2264 b\u2080 \u2227\n      \u2200 b : \u2115, b\u2080 \u2264 b \u2192\n        c\u2081 * Real.log (Real.log (b : \u211d)) \u2264 (maxMinLength b : \u211d) \u2227\n        (maxMinLength b : \u211d) \u2264 c\u2082 * Real.log (Real.log (b : \u211d))",
  "solution_module": "OAI.NumberTheory.ShortEgyptian.Main",
  "permitted_axioms": [
   "propext",
   "Quot.sound",
   "Classical.choice"
  ],
  "rebuilt_here": false
 },
 "check": {
  "a": 5,
  "b": 181,
  "denominators": [
   39,
   507,
   91767
  ],
  "ok": true,
  "failures": []
 },
 "explore": {
  "b_max": 200,
  "cases": 19900,
  "firsts": [
   {
    "b": 2,
    "worst": 1,
    "witness_a": 1,
    "expansion": [
     2
    ],
    "cases": 1,
    "loglog": null
   },
   {
    "b": 3,
    "worst": 2,
    "witness_a": 2,
    "expansion": [
     2,
     6
    ],
    "cases": 2,
    "loglog": 0.094
   },
   {
    "b": 5,
    "worst": 3,
    "witness_a": 4,
    "expansion": [
     2,
     4,
     20
    ],
    "cases": 4,
    "loglog": 0.476
   },
   {
    "b": 11,
    "worst": 4,
    "witness_a": 8,
    "expansion": [
     2,
     5,
     37,
     4070
    ],
    "cases": 10,
    "loglog": 0.875
   },
   {
    "b": 17,
    "worst": 5,
    "witness_a": 16,
    "expansion": [
     2,
     3,
     10,
     128,
     32640
    ],
    "cases": 16,
    "loglog": 1.041
   },
   {
    "b": 79,
    "worst": 6,
    "witness_a": 77,
    "expansion": [
     2,
     3,
     8,
     62,
     4524,
     7386184
    ],
    "cases": 78,
    "loglog": 1.475
   }
  ]
 }
};
