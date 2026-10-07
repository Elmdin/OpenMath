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
    "section": "Introduction",
    "proof": "For the upper bound, fix \\(1\\le a<b\\), put \\(S=\\log b\\), and assume that\n\\(S\\) is sufficiently large.  Apply Lemma~\\ref{lem:greedy} with\n\\(T=e^{D_CS}\\).  This uses \\(O(\\log S)\\) terms.  If the procedure\nterminates, Lemma~\\ref{lem:distinct} gives the required upper bound.\nOtherwise its\nremainder \\(A/C\\) satisfies\n\\[\n 1\\le A<b,\\qquad e^{D_CS}\\le C<e^{2D_CS}.\n\\]\nChoose \\(M,G,X\\) from Proposition~\\ref{prop:density} for this \\(S,C\\).\nSince \\(D_X=D_M+2\\),\n\\[\n AM<e^{(D_M+1)S}<X.\n\\]\nLet \\(g=\\lfloor X/(AM)\\rfloor\\) and \\(n=gAM\\).  These are positive\nintegers, and the inequality \\(\\lfloor t\\rfloor\\ge t/2\\) for \\(t\\ge1\\)\ngives\n\\[\n \\frac X2\\le n\\le X.\n\\]\nWrite \\(H=\\{1,\\ldots,\\lfloor X\\rfloor\\}\\setminus G\\).\nAmong the \\(n-1\\) positive splits \\(n=u+(n-u)\\), at most \\(2|H|\\le X/4\\)\nhave an entry outside \\(G\\).  Since \\(n-1\\ge X/2-1>X/4\\) for large \\(S\\),\nsome split has both entries in \\(G\\).\nTheir expansions together express\n\\[\n \\frac{n}{MC}=\\frac{gA}{C}\n\\]\nusing at most \\(2L\\log S\\) unit fractions.  Multiplying every denominator\nby the integer \\(g\\) gives an expansion of \\(A/C\\) of the same length.\nAdjoin the greedy prefix and apply Lemma~\\ref{lem:distinct} to the total\n\\(a/b<1\\).  The resulting distinct expansion has \\(O(\\log S)\\) terms,\nuniformly in \\(a\\).  No reduction of \\(a/b\\), or restriction on the final\ndenominator sizes, has been used.\n\nFor the lower bound, consider an expansion of \\((b-1)/b\\) with \\(k\\)\nterms and append \\(1/b\\).  Sort the resulting \\(s=k+1\\) denominators as\n\\(d_1\\le\\cdots\\le d_s\\); repetitions are harmless here.\nPut \\(L_0=1\\) and \\(L_j=d_1\\cdots d_j\\).\nFor each \\(1\\le j\\le s\\), the amount remaining after the first \\(j-1\\)\nterms is positive and has denominator dividing \\(L_{j-1}\\).\nConsequently\n\\[\n \\frac1{L_{j-1}}\n \\le 1-\\sum_{i<j}\\frac1{d_i}\n =\\sum_{i=j}^s\\frac1{d_i}\n \\le\\frac{s}{d_j}.\n\\]\nIt follows that \\(d_j\\le sL_{j-1}\\) and \\(L_j\\le sL_{j-1}^2\\).\nInduction gives \\(L_j\\le s^{2^j-1}\\) and \\(d_j\\le s^{2^{j-1}}\\).\nAs \\(b\\) is one of these denominators,\n\\[\n b\\le d_s\\le s^{2^{s-1}}=(k+1)^{2^k}.\n\\]\nHence\n\\(\\log\\log b\\le k\\log2+\\log\\log(k+1)\\le(1+\\log2)k\\).\nThe numerator \\(b-1\\) therefore supplies the required lower bound for\n\\(N(b)\\).",
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
    "section": "Introduction",
    "proof": "\\emph{A short initial expansion.}\nLet $r$ be a sufficiently large integer and let $Q$ be the product of\nthe first $r$ odd primes. The prime number theorem, already used in\nSection~\\ref{sec:residues}, gives\n\\[\n \\log Q=O(r\\log r),\\qquad \\log\\log Q=O(\\log r).\n\\]\nApply Theorem~\\ref{thm:main} to $(Q-1)/Q$ and append $1/Q$.\nLemma~\\ref{lem:marked-cleanup} produces a distinct expansion of one\nwhose denominator set $S$ has size $s=O(\\log r)$ and contains a\nmultiple $n$ of $Q$. Fix this one set $S$ and this one $n$.\nWriting $\\tau(n)$ for the number of positive divisors of $n$, we have\n$\\tau(n)\\ge 2^r$.\n\n\\emph{Branching over divisors.}\nFor every positive proper divisor $d$ of $n$, the identity\n\\begin{equation}\\label{eq:divisor-split}\n \\frac1n=\\frac1{n+d}+\\frac1{n+n^2/d}\n\\end{equation}\ngives two distinct integer denominators, with\n\\[\n n<n+d<2n<n+n^2/d.\n\\]\nFor each unchanged denominator in $S\\setminus\\{n\\}$, at most one\nchoice of $d$ makes it equal to $n+d$, and at most one makes it equal\nto $n+n^2/d$. Thus at least\n\\[\n \\tau(n)-1-2(s-1)\\ge 2^r-2s+1\n\\]\nchoices give distinct-denominator expansions of one, all of the same\nlength $\\ell=s+1$. They give different expansions: from any resulting\ndenominator set, remove the fixed set $S\\setminus\\{n\\}$; the smaller\nof the two remaining denominators is $n+d$, which recovers $d$.\nSorting each set therefore gives a different tuple counted by $F(\\ell)$.\n\n\\emph{Every sufficiently large length.}\nFor any distinct expansion of one with at least two terms, its largest\ndenominator $v$ exceeds one. Replace $v$ by $v+1$ and $v(v+1)$, using\n\\begin{equation}\\label{eq:padding-split}\n \\frac1v=\\frac1{v+1}+\\frac1{v(v+1)}.\n\\end{equation}\nThese are the two largest denominators of the new expansion. The\noperation is injective: delete those two denominators and reinsert\nthe second largest minus one. Iterating a fixed number of times is\ntherefore injective. Our initial set contains a multiple of $Q>1$,\nso it is not the singleton $\\{1\\}$; the operation applies to all\nthe expansions just constructed.\n\nChoose an absolute constant $B\\ge1$ such that $\\ell\\le B\\log r$ for\nall sufficiently large $r$. For each sufficiently large integer $k$,\ntake $r=\\lfloor\\exp(k/(2B))\\rfloor$. Then $\\ell\\le k$, and applying\n\\eqref{eq:padding-split} exactly $k-\\ell$ times to each of our\ncommon-length expansions gives\n\\[\n F(k)\\ge 2^r-2s+1\\ge 2^{r-1}.\n\\]\nSince $r\\ge\\tfrac12\\exp(k/(2B))$ for large $k$, this proves\n$\\log\\log F(k)\\ge k/(2B)+O(1)$, hence the desired lower bound\nfor every sufficiently large integer $k$.\n\n\\emph{The upper bound.}\nFix a tuple counted by $F(k)$ and put $P_0=1$ and\n$P_i=n_1\\cdots n_i$. Before the $i$th term, the positive remainder\n\\[\n R_i=1-\\sum_{j<i}\\frac1{n_j}=\\sum_{j=i}^k\\frac1{n_j}\n\\]\nis a rational number with a positive integer numerator over\n$P_{i-1}$. Ordering therefore gives\n\\[\n \\frac1{P_{i-1}}\\le R_i\\le\\frac{k}{n_i},\n \\qquad n_i\\le kP_{i-1},\\qquad P_i\\le kP_{i-1}^2.\n\\]\nInductively $P_i\\le k^{2^i-1}$ and $n_i\\le k^{2^{i-1}}$.\nCounting all integer choices in this larger box shows that $F(k)$ is\nfinite and\n\\[\n F(k)\\le\\prod_{i=1}^k k^{2^{i-1}}=k^{2^k-1}.\n\\]\nTogether with the lower bound, this yields\n$\\log\\log F(k)\\le k\\log2+\\log\\log k=O(k)$ for sufficiently\nlarge $k$, as required.",
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
    "section": "Introduction",
    "proof": "Set $A=257/\\log2$. Fix a real number $c$ with $0<c<1/A$, and\nchoose $\\varepsilon>0$ such that $c(A+\\varepsilon)<1$.\nProposition~\\ref{prop:marked-length} supplies an integer $M\\ge4$ such\nthat every integer $m\\ge M$ has a distinct marked expansion with\nat most $(A+\\varepsilon)\\log\\log m$ terms. The construction in\nSection~\\ref{sec:prescribed} also gives a finite distinct marked\nexpansion for each $2\\le m<M$. Fix one for each such $m$, and let\n$k_*$ be the maximum of their finitely many lengths.\n\nFor every integer $k\\ge k_*$ and every integer\n$2\\le m\\le\\exp(\\exp(ck))$, the chosen expansion has at most $k$\nterms. This is immediate for $m<M$; for $m\\ge M$ its length is at\nmost\n\\[\n (A+\\varepsilon)\\log\\log m\n \\le c(A+\\varepsilon)k<k.\n\\]\nA distinct expansion of $1$ containing a denominator $m\\ge2$ has\nat least three terms: denominator one would exhaust the sum, and two\ndistinct denominators at least two contribute at most $1/2+1/3<1$.\nThus Lemma~\\ref{lem:exact-marker-padding} may be iterated until the\nlength is exactly $k$, retaining the exact integer $m$. We have proved\n\\[\n \\{2,\\ldots,\\lfloor\\exp(\\exp(ck))\\rfloor\\}\\subseteq D_k.\n\\]\nThe first missing integer exceeds the real right endpoint, and hence\n$v(k)\\ge\\exp(\\exp(ck))$ for every sufficiently large integer $k$.\nBecause this holds for each fixed $c<\\log2/257$, it gives\n\\[\n \\liminf_{k\\to\\infty}\\frac{\\log\\log v(k)}{k}\n \\ge\\frac{\\log2}{257}.\n\\]\nIn particular $257/\\log2<600$, so taking $c=1/600$ gives the stated\neventual lower bound $v(k)\\ge\\exp(\\exp(k/600))$.\n\nFor the upper bound, the product recurrence in the proof of\nCorollary~\\ref{cor:counting} gives $n_i\\le k^{2^{i-1}}$ in every\ndistinct exact-$k$ expansion of $1$. Every denominator in such an\nexpansion is therefore at most $k^{2^{k-1}}$. Consequently $D_k$ is\nfinite for every $k\\ge1$, its complement in $\\{2,3,\\ldots\\}$ is\nnonempty, and\n\\[\n v(k)\\le1+k^{2^{k-1}}.\n\\]\nFor $k\\ge2$ this yields\n$\\log\\log v(k)\\le k\\log2+\\log\\log k$, and therefore\n\\[\n \\limsup_{k\\to\\infty}\\frac{\\log\\log v(k)}{k}\\le\\log2.\n\\]\nTogether the two bounds imply $\\log\\log v(k)=\\Theta(k)$.",
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
    "section": "From a dense set to every numerator",
    "proof": "Use the absolute constants and levels of Lemma~\\ref{lem:residues}.  Before\nchoosing \\(S\\), fix\n\\[\n K_d=\\frac{3D_X}{\\eta},\\qquad\n D_*=2D_C+D_M+1,\n \\qquad r\\in\\N,\\quad r\\ge \\max\\{2,8K_d\\},\n \\qquad \\alpha=1-\\frac1r.\n\\]\nAll subsequent lower bounds on \\(S\\) may depend on these fixed constants.\nIn particular, the moment order \\(r\\) is independent of \\(S\\).\nFor sufficiently large \\(S\\),\n\\begin{equation}\\label{eq:descent-depth}\n m\\ge\\frac{S}{2\\log S},\n \\qquad\n d=\\left\\lceil\\frac{D_XS-m}{\\eta m}\\right\\rceil\n \\le \\frac{2D_X}{\\eta}\\log S+1\n \\le K_d\\log S.\n\\end{equation}\nFix an integer \\(C\\) in the range of Proposition~\\ref{prop:density}, and\nchoose the common integer \\(M\\) supplied by Lemma~\\ref{lem:residues}.\n\nEvery fraction \\(u/(MC_j)\\) with \\(1\\le u\\le X_j\\) is less than one.\nIndeed, if \\(C_j=C\\), then \\(u\\le X_0=e^{D_XS}<MC\\); if \\(C_j=1\\),\nthen \\(u\\le e^S<M\\).  Moreover \\(C_d=1\\), since \\(X_d\\le e^m<e^S\\).\nWe first produce expansions at this last level, and then work backwards.\n\n\\paragraph{The last level.}\nThe power of two dividing \\(M\\) is at least \\(S^{D_0}\\).  For any integer\n\\(1\\le u\\le S^{D_0}\\), write \\(u\\) in binary.  Every power \\(2^k\\) that\noccurs divides \\(M\\), and\n\\[\n \\frac{2^k}{M}=\\frac1{M/2^k}.\n\\]\nThis gives an expansion of \\(u/M\\) with at most\n\\(1+D_0\\log S/\\log 2\\) terms.\n\nIf \\(S^{D_0}<u\\le e^m\\), the last part of Lemma~\\ref{lem:residues}\ngives a divisor \\(t\\mid M\\) for which\n\\[\n z=\\left\\lceil\\frac tu\\right\\rceil,\\qquad\n h=uz-t,\\qquad 0\\le h\\le u^{1-\\eta}.\n\\]\nThe identity\n\\begin{equation}\\label{eq:terminal-descent}\n \\frac uM=\\frac1{(M/t)z}+\\frac1z\\frac hM\n\\end{equation}\nadds one unit fraction.  If \\(h=0\\), the expansion ends; otherwise an\nexpansion of \\(h/M\\) can be divided by the positive integer \\(z\\).\nAs long as the numerator remains above \\(S^{D_0}\\), its logarithm\ndecreases by a factor at most \\(1-\\eta\\) at each step.  It starts at most\n\\(m\\le S\\), so after at most\n\\[\n 1+\\left\\lceil\\frac{\\log S}{-\\log(1-\\eta)}\\right\\rceil\n\\]\nsteps it has either vanished or entered the binary range.  Thus an absolute constant\n\\(B_0\\) bounds the length of every terminal expansion by \\(B_0\\log S\\).\nAll denominators are integers.  Since every term is positive and the\ntotal is less than one, every denominator is at least two.\n\n\\paragraph{Working backwards.}\nSet\n\\[\n G_d=\\{1,\\ldots,\\lfloor X_d\\rfloor\\}.\n\\]\nAt a level \\(j<d\\), write the list prescribed by\nLemma~\\ref{lem:residues} as \\((t_{j,i})_{i\\in I_j}\\):\nit is the deterministic list when \\(X_j>e^S\\), and the first random\nlist otherwise.  Its entries may coincide; their indices are always\nretained.  Having defined \\(G_{j+1}\\), let\n\\begin{equation}\\label{eq:good-backwards}\n \\begin{aligned}\n G_j=G_{j+1}\\ \\cup\\ \\bigl\\{u\\in\\N:\\ &1\\le u\\le X_j,\\\\\n &h_{j,t_{j,i}}(u)\\in G_{j+1}\\cup\\{0\\}\n       \\text{ for some }i\\in I_j\\bigr\\}.\n \\end{aligned}\n\\end{equation}\nThese sets have the asserted expansions.  For membership inherited\ndirectly from \\(G_{j+1}\\), divide the known expansion by the integer\n\\(C_j/C_{j+1}\\).  For membership obtained from a residue, put\n\\[\n z=\\left\\lceil\\frac{C_jt_{j,i}}u\\right\\rceil,\\qquad\n h=uz-C_jt_{j,i}.\n\\]\nThen\n\\begin{equation}\\label{eq:rescaled-descent}\n \\frac{u}{MC_j}\n =\\frac1{(M/t_{j,i})z}\n +\\frac1{zC_j/C_{j+1}}\\frac{h}{MC_{j+1}}.\n\\end{equation}\nBoth \\(M/t_{j,i}\\) and \\(zC_j/C_{j+1}\\) are positive integers.\nThis includes the possible transition from \\(C_j=C\\) to\n\\(C_{j+1}=1\\), where the second scaling factor is \\(zC\\).\nIf \\(h=0\\), the second term is absent.  Otherwise it uses the known\nexpansion for \\(h\\in G_{j+1}\\).  Consequently every member of \\(G_j\\)\nhas an expansion of length at most\n\\begin{equation}\\label{eq:descent-length}\n B_0\\log S+d-j.\n\\end{equation}\n\nIt remains to prove that almost all integers up to \\(X_0\\) belong to\n\\(G_0\\).  We have built expansions whenever a residue reaches a\npreviously treated numerator; the following count controls all other\nnumerators.\n\n\\paragraph{Counting unsuccessful numerators.}\nDefine\n\\[\n H_j=\\{1,\\ldots,\\lfloor X_j\\rfloor\\}\\setminus G_j,\n \\qquad\n \\delta_j=\\frac{|H_j|}{X_j}.\n\\]\nThus \\(0\\le\\delta_j\\le1\\) and \\(\\delta_d=0\\).\nFix \\(j<d\\), and abbreviate \\(X=X_j\\), \\(Y=X_{j+1}=\\rho X\\).\nThe inclusion \\(G_{j+1}\\subseteq G_j\\) gives\n\\[\n |H_j\\cap[1,Y]|\\le |H_{j+1}|.\n\\]\nApart from at most \\(Xe^{-c_*m}\\) exceptional integers, every\n\\(u\\in H_j\\cap(Y,X]\\) has at least \\(\\rho|I_j|/2\\) indices \\(i\\)\nwith \\(h_{j,t_{j,i}}(u)\\le Y\\).\nEach such residue lies in \\(H_{j+1}\\): a residue in\n\\(G_{j+1}\\cup\\{0\\}\\) would place \\(u\\) in \\(G_j\\).\n\nFor a fixed pair \\((h,i)\\), every predecessor \\(u\\) satisfies\n\\[\n u\\mid C_jt_{j,i}+h,\\qquad 1\\le u\\le X.\n\\]\nThere are at most \\(d_X(C_jt_{j,i}+h)\\) such predecessors.\nCounting pairs with their list indices therefore yields\n\\begin{equation}\\label{eq:bad-pair-count}\n |H_j|\\le Xe^{-c_*m}+|H_{j+1}|\n +\\frac{2}{\\rho|I_j|}\n   \\sum_{i\\in I_j}\\ \\sum_{h\\in H_{j+1}}\n       d_X(C_jt_{j,i}+h).\n\\end{equation}\nRepeated values of \\(t_{j,i}\\) create repeated summands on both sides\nof this count and require no adjustment. Figure~\\ref{fig:predecessors}\nshows why the index must be retained in this double count.\n\n\\begin{figure}[ht]\n\\centering\n\\begin{tikzpicture}[x=1cm,y=1cm,\n  every node/.style={font=\\small},\n  point/.style={circle,fill=blue!55!black,inner sep=2pt}]\n\\node[align=center] at (0,1.15) {Nonexceptional bad numerators\\\\$u\\in H_j\\cap(Y,X]$};\n\\node[align=center] at (6.4,1.15) {Indexed targets\\\\$(h,i)\\in H_{j+1}\\times I_j$};\n\\node[point,label=left:$u_1$] (u1) at (0,0.25) {};\n\\node[point,label=left:$u_2$] (u2) at (0,-0.6) {};\n\\node at (0,-1.25) {$\\vdots$};\n\\node[point,label=left:$u_a$] (ua) at (0,-2) {};\n\\node[point,label=right:{$(h_1,i_1)$}] (h1) at (6.4,0.25) {};\n\\node[point,label=right:{$(h_2,i_2)$}] (h2) at (6.4,-0.6) {};\n\\node at (6.4,-1.25) {$\\vdots$};\n\\node[point,label=right:{$(h_b,i_b)$}] (hb) at (6.4,-2) {};\n\\draw[gray] (u1)--(h1) (u1)--(h2) (u2)--(h1) (u2)--(hb) (ua)--(h2) (ua)--(hb);\n\\node[fill=white,align=center] at (3.2,-0.85)\n {$h=h_{j,t_{j,i}}(u)$\\\\$u\\mid C_jt_{j,i}+h$};\n\\node[align=center] at (0,-2.85) {Degree at least\\\\$\\rho|I_j|/2$};\n\\node[align=center] at (6.4,-2.85) {Degree at most\\\\$d_X(C_jt_{j,i}+h)$};\n\\end{tikzpicture}\n\\caption{Schematic of the indexed predecessor count. Summing the right\n degrees and dividing by the left-degree lower bound gives the last term\n in \\eqref{eq:bad-pair-count}. The Fourier-exception term\n $Xe^{-c_*m}$ and the inherited term $|H_{j+1}|$ are counted separately.\n Equal list values retain different indices. The drawn graph does not\n specify numerical degrees.}\n\\label{fig:predecessors}\n\\end{figure}\n\nWe check the hypotheses of Lemma~\\ref{lem:divisor} before applying it.\nSince \\(j<d\\), one has\n\\[\n \\frac{S}{2\\log S}\\le m<\\log X\\le D_XS\\le D_*S.\n\\]\nAlso\n\\[\n Y=Xe^{-\\eta m}\\ge X^{1-\\eta}\\ge\\sqrt X,\n \\qquad Y\\le X.\n\\]\nFinally, each shift \\(N=C_jt_{j,i}\\) is a positive integer and satisfies\n\\[\n N\\le CM\\le e^{(2D_C+D_M)S}<e^{D_*S}.\n\\]\nThus Lemma~\\ref{lem:divisor}, with the fixed parameters \\(D_*,r\\),\napplies uniformly at every level and to every list entry.\nH\\\"older's inequality gives\n\\begin{align}\n \\sum_{h\\in H_{j+1}}d_X(N+h)\n &\\le |H_{j+1}|^\\alpha\n       \\left(\\sum_{1\\le h\\le Y}d_X(N+h)^r\\right)^{1/r}\\notag\\\\\n &\\le Y\\,e^{S^{1/4}/r}\\delta_{j+1}^{\\alpha}.\n \\label{eq:descent-holder}\n\\end{align}\nThis also holds when \\(H_{j+1}\\) is empty.\nSubstitution in \\eqref{eq:bad-pair-count}, followed by division by \\(X\\),\nuses \\(Y=\\rho X\\) to cancel the factor \\(1/\\rho\\):\n\\[\n \\delta_j\\le e^{-c_*m}+\\rho\\delta_{j+1}\n                 +2e^{S^{1/4}/r}\\delta_{j+1}^{\\alpha}.\n\\]\nSince \\(\\delta_{j+1}\\le\\delta_{j+1}^{\\alpha}\\), for sufficiently large\n\\(S\\) we obtain the uniform recurrence\n\\begin{equation}\\label{eq:density-recurrence}\n \\delta_j\\le\\epsilon+A\\delta_{j+1}^{\\alpha},\n \\qquad\n \\epsilon=e^{-c_*m},\\qquad A=e^{2S^{1/4}}.\n\\end{equation}\n\n\\paragraph{Iterating the recurrence.}\nOur fixed choice of \\(r\\) ensures\n\\begin{equation}\\label{eq:alpha-depth}\n \\alpha^d\n \\ge e^{-2d/r}\n \\ge S^{-2K_d/r}\n \\ge S^{-1/4},\n\\end{equation}\nwhere we used \\(-\\log(1-1/r)\\le2/r\\) and\n\\eqref{eq:descent-depth}.\nFor nonnegative \\(a,b\\), the inequality\n\\((a+b)^\\alpha\\le a^\\alpha+b^\\alpha\\) permits us to unroll\n\\eqref{eq:density-recurrence} from \\(\\delta_d=0\\):\n\\begin{equation}\\label{eq:density-unrolled}\n \\delta_0\\le\n \\sum_{i=0}^{d-1}\n A^{(1-\\alpha^i)/(1-\\alpha)}\\epsilon^{\\alpha^i}\n \\le d\\exp\\!\\left(2rS^{1/4}-c_*mS^{-1/4}\\right).\n\\end{equation}\nIndeed, the exponent of \\(A\\) is at most \\(r\\), and\n\\(\\alpha^i\\ge\\alpha^d\\ge S^{-1/4}\\).\nThe right-hand side tends to zero: the negative term has size at least\n\\(c_*S^{3/4}/(2\\log S)\\), which dominates the fixed multiple\n\\(2rS^{1/4}\\) and \\(\\log d\\).\n\nFor all sufficiently large \\(S\\), we therefore have\n\\[\n |H_0|\\le X_0/8.\n\\]\nTake \\(G=G_0\\) and \\(X=X_0\\).  By\n\\eqref{eq:descent-depth} and \\eqref{eq:descent-length}, every \\(u\\in G\\)\nhas an expansion of \\(u/(MC)\\) with at most\n\\((B_0+K_d)\\log S\\) terms.  The size bounds on \\(M\\) come from\nLemma~\\ref{lem:residues}.  Every estimate above is uniform in the\nallowed integer \\(C\\), and all thresholds depend only on fixed absolute\nconstants.  Choosing \\(L=B_0+K_d\\) and then one sufficiently large\nabsolute \\(S_0\\) proves Proposition~\\ref{prop:density}.",
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
    "section": "From a dense set to every numerator",
    "proof": "We use Takenouchi's argument \\cite[Sections~II--III, pp.~79--80]{Takenouchi1921}.\nFor fixed \\(x>0\\) and \\(k\\), there are only finitely many nondecreasing\nlists of \\(k\\) denominators with reciprocal sum \\(x\\).\nIndeed, the first denominator is at most \\(k/x\\).\nOnce it is chosen, induction applies to the remaining positive sum and\nthe remaining \\(k-1\\) terms; when no terms remain the sum must be zero.\n\nIf a denominator occurs twice, apply one of the identities\n\\[\n \\frac2{2p}=\\frac1{p+1}+\\frac1{p(p+1)},\n \\qquad\n \\frac2{2p+1}=\\frac1{p+1}+\\frac1{(p+1)(2p+1)}.\n\\]\nBecause the total is less than \\(1\\), a denominator \\(1\\), or a repeated\ndenominator \\(2\\), is impossible.  Thus \\(p\\ge2\\) in the first identity\nand \\(p\\ge1\\) in the second.  Each replacement preserves the number of\nterms and increases the sum of their denominators: the increases are\n\\((p-1)^2\\) and \\(2p^2\\), respectively.  Finiteness of the set of lists\ntherefore forces termination, at which point all denominators are\ndistinct.  Positivity and the unchanged total exclude a denominator\n\\(1\\) throughout.",
    "deps": []
   },
   {
    "label": "lem:greedy",
    "kind": "lemma",
    "title": "Preparing the denominator",
    "statement": "Let \\(1\\le a<b\\) be integers and let \\(T>b\\) be real.\nAfter at most\n\\[\n 1+\\left\\lceil\\log_2\\left(\\frac{\\log T}{\\log 2}\\right)\\right\\rceil\n\\]\ngreedy steps, either \\(a/b\\) has been expressed as a sum of unit fractions,\nor its positive remainder can be written as \\(A/C\\), with integers\n\\[\n 1\\le A\\le a,\\qquad T\\le C<T^2.\n\\]\nAll unit denominators produced are at least \\(2\\).\nThe fractions used during this procedure need not be reduced.",
    "section": "From a dense set to every numerator",
    "proof": "For a positive remainder \\(A/C<1\\), set\n\\[\n z=\\left\\lceil\\frac CA\\right\\rceil,\\qquad\n A'=Az-C,\\qquad C'=Cz.\n\\]\nSubtracting \\(1/z\\) leaves \\(A'/C'\\).\nThe ceiling inequality gives \\(0\\le A'<A\\), while integrality of \\(A\\)\ngives \\(z\\le C\\) and hence \\(C'\\le C^2\\).\nThus the numerator never exceeds \\(a\\).\nStop at zero or at the first positive remainder whose denominator is at\nleast \\(T\\).  At such a first crossing, the preceding denominator was\nless than \\(T\\), so the new one is less than \\(T^2\\).\n\nTo bound the number of steps, write \\(x=A/C\\).  Since\n\\(\\lceil1/x\\rceil\\le 1+1/x\\),\n\\[\n 0\\le x-\\frac1{\\lceil1/x\\rceil}\n \\le \\frac{x^2}{1+x}.\n\\]\nThe first positive remainder is less than \\(1/2\\), and subsequent\nremainders decrease at least by squaring.  After \\(j\\ge1\\) positive\nsteps their values therefore satisfy\n\\[\n x_j\\le 2^{-2^{j-1}}.\n\\]\nIf the procedure has not yet stopped, its positive integer numerator\ngives \\(x_j\\ge 1/C_j>1/T\\).  This is impossible when\n\\(2^{j-1}\\log2\\ge\\log T\\), proving the stated bound.\nEvery current positive value is less than \\(1\\), so \\(z\\ge2\\).",
    "deps": []
   },
   {
    "label": "lem:divisor",
    "kind": "lemma",
    "title": "",
    "statement": "For every fixed pair of real numbers \\(D,r\\ge1\\), there is\n\\(S_0(D,r)\\) such that the following holds for \\(S\\ge S_0(D,r)\\).\nSuppose that \\(X,Y\\) are real numbers and \\(N\\) is a nonnegative integer\nsatisfying\n\\[\n \\frac{S}{2\\log S}\\le \\log X\\le DS,\\qquad\n X^{1/2}\\le Y\\le X,\\qquad N\\le e^{DS}.\n\\]\nThen\n\\begin{equation}\n \\sum_{1\\le h\\le Y}d_X(N+h)^r\\le Y\\exp(S^{1/4}).\n\\end{equation}",
    "section": "A uniform divisor moment",
    "proof": "Write \\(v=\\log X\\), \\(E=D+1\\), and\n\\[\n B=1+\\log(ES/v).\n\\]\nEvery integer \\(n=N+h\\) under consideration satisfies\n\\(1\\le n\\le2e^{DS}\\le e^{ES}\\) for sufficiently large \\(S\\).\nMoreover,\n\\begin{equation}\\label{eq:divisor-B}\n 1<B\\le1+\\log(2E\\log S)=O_D(\\log\\log S).\n\\end{equation}\nAll estimates below are uniform in \\(X,Y,N\\) in the stated ranges.\n\n\\smallskip\n\\noindent\\emph{Two elementary estimates.}\nFirst, consider divisors of \\(n\\) formed from primes at least \\(z\\ge2\\).\nList these prime factors with multiplicity, giving distinct labels to\nrepeated occurrences. There are at most\n\\(L=\\lfloor ES/\\log z\\rfloor\\) occurrences, and a divisor at most \\(X\\)\nuses at most \\(v/\\log z\\) of them. Counting subsets can only overcount\ndivisors. With \\(q=v/(ES)\\in(0,1)\\), their number is therefore at most\n\\begin{equation}\\label{eq:divisor-large-primes}\n \\sum_{0\\le j\\le v/\\log z}\\binom Lj\n \\le q^{-v/\\log z}(1+q)^L\n \\le \\exp\\left(\\frac{Bv}{\\log z}\\right).\n\\end{equation}\nHere the middle inequality follows by inserting the weights \\(q^j\\);\nthe last uses \\(Lq\\le v/\\log z\\).\n\nSplit the prime factors at \\(S^{1/2}\\).\nFor each smaller prime there are at most \\(1+ES/\\log2\\) possible\nexponents in a divisor of \\(n\\). Applying\n\\eqref{eq:divisor-large-primes} to the remaining primes gives\n\\[\n \\log d_X(n)\n \\le S^{1/2}\\log(1+ES/\\log2)+\\frac{2Bv}{\\log S}.\n\\]\nSince \\(v\\ge S/(2\\log S)\\), there is a function\n\\(\\varepsilon_D(S)\\to0\\), independent of \\(X,Y,N,h\\), such that\n\\begin{equation}\\label{eq:divisor-pointwise}\n d_X(n)^r\\le \\exp\\bigl(r\\varepsilon_D(S)v\\bigr),\n \\qquad\n \\varepsilon_D(S)\\ll_D\n \\frac{(\\log S)^2}{S^{1/2}}+\\frac{\\log\\log S}{\\log S}.\n\\end{equation}\n\nSecond, write \\(\\tau(d)\\) for the number of positive divisors of \\(d\\).\nFor fixed \\(r\\) and \\(3/4\\le\\sigma\\le1\\),\n\\begin{equation}\\label{eq:divisor-local-factor}\n \\log\\left(1+\\sum_{j\\ge1}(j+1)^r p^{-j\\sigma}\\right)\n \\le C_r p^{-\\sigma}\n\\end{equation}\nfor every prime \\(p\\).\nIndeed, the power series\n\\(\\sum_{j\\ge1}(j+1)^r x^{j-1}\\) is bounded on\n\\(0\\le x\\le2^{-3/4}<1\\).\nWe will also use the elementary estimate\n\\begin{equation}\\label{eq:prime-reciprocals}\n \\sum_{p\\le T}\\frac1p\\le e\\log(1+\\log T)\\qquad(T\\ge2).\n\\end{equation}\nTo prove it, set \\(s=1+1/\\log T\\) and\n\\(\\zeta(s)=\\sum_{a\\ge1}a^{-s}\\).\nEuler's absolutely convergent product and the integral bound\n\\(\\zeta(s)\\le1+1/(s-1)\\) give\n\\[\n \\sum_{p\\le T}\\frac1p\n \\le e\\sum_p p^{-s}\n \\le e\\log\\zeta(s)\n \\le e\\log(1+\\log T).\n\\]\nIn particular, multiplicativity and\n\\eqref{eq:divisor-local-factor} imply\n\\begin{equation}\\label{eq:divisor-harmonic}\n \\sum_{d\\le T}\\frac{\\tau(d)^r}{d}\n \\le \\prod_{p\\le T}\n       \\left(1+\\sum_{j\\ge1}(j+1)^r p^{-j}\\right)\n \\ll_r(\\log(2T))^{C_r}.\n\\end{equation}\n\n\\smallskip\n\\noindent\\emph{A prefix of the prime factorization.}\nFor \\(n>\\sqrt Y\\), order its prime factors with multiplicity and let\n\\(d\\) be the longest initial product at most \\(\\sqrt Y\\), allowing\n\\(d=1\\). Let \\(p\\) be the next prime. Then\n\\[\n d\\le\\sqrt Y<dp,\n\\]\nall prime factors of \\(d\\) are at most \\(p\\), and all those of \\(n/d\\)\nare at least \\(p\\).\nThe inequality\n\\[\n d_X(n)\\le \\tau(d)d_X(n/d)\n\\]\ndoes not require \\(d\\) and \\(n/d\\) to be coprime:\na divisor \\(a\\le X\\) of \\(n\\) determines\n\\[\n b=\\gcd(a,d),\\qquad c=a/b.\n\\]\nThen \\(b\\mid d\\), \\(c\\mid n/d\\), \\(c\\le X\\), and the pair \\((b,c)\\)\ndetermines \\(a\\).\nThus \\eqref{eq:divisor-large-primes} gives\n\\begin{equation}\\label{eq:divisor-prefix}\n d_X(n)^r\\le\\tau(d)^r\n          \\exp\\left(\\frac{rBv}{\\log p}\\right).\n\\end{equation}\nFor any fixed \\(d\\le\\sqrt Y\\), the number of its multiples in\n\\((N,N+Y]\\) is at most\n\\begin{equation}\\label{eq:divisor-multiples}\n \\frac Yd+1\\le\\frac{2Y}{d}.\n\\end{equation}\nWe now sum according to the size of the next prime \\(p\\). If \\(p\\)\nis large, the remaining factor \\(n/d\\) has few small divisors. If\n\\(p\\) is smaller, the condition \\(dp>\\sqrt Y\\) forces \\(d\\) to\nbe a large product of small primes. The total reciprocal weight of\nsuch prefixes is small, so \\eqref{eq:divisor-multiples} limits their\noccurrence in every shifted interval.\n\nIf \\(\\log p\\ge v^{15/16}\\), the exponential factor in\n\\eqref{eq:divisor-prefix} is at most \\(e^{rBv^{1/16}}\\).\nFor \\(n\\le\\sqrt Y\\), instead take \\(d=n\\) and use\n\\(d_X(n)\\le\\tau(d)\\). By \\eqref{eq:divisor-multiples} and\n\\eqref{eq:divisor-harmonic}, these two cases together contribute at most\n\\begin{align}\n 2Ye^{rBv^{1/16}}\\sum_{d\\le\\sqrt Y}\\frac{\\tau(d)^r}{d}\n &\\le Y\\exp\\!\\left(\n      O_{D,r}(S^{1/16}\\log\\log S+\\log S)\\right).\n \\label{eq:divisor-large-contribution}\n\\end{align}\n\nFor the remaining integers, \\(\\log p<v^{15/16}\\), so\n\\begin{equation}\\label{eq:divisor-prefix-lower}\n \\log d>\\tfrac12\\log Y-\\log p\n \\ge v/4-v^{15/16}>v/5\n\\end{equation}\nonce \\(S\\) is sufficiently large.\nThis large prefix makes integers with small next prime rare.\nWe estimate the ensuing smooth-prefix sums by Rankin's exponential\nweighting method; see \\cite[p.~414, (1.3)]{HildebrandTenenbaum1993}.\n\nIf \\(p<S^4\\), every prime factor of \\(d\\) is smaller than \\(S^4\\).\nMultiplying each summand by\n\\((d/e^{v/5})^{1/10}>1\\) gives\n\\[\n \\sum_{\\substack{d>e^{v/5}\\\\\n             \\ell\\mid d,\\ \\ell\\ {\\rm prime}\\Rightarrow\\ell<S^4}}\n       \\frac1d\n \\le e^{-v/50}\n       \\prod_{\\substack{\\ell<S^4\\\\\\ell\\ {\\rm prime}}}\n                      (1-\\ell^{-9/10})^{-1}.\n\\]\nThe logarithm of this product is \\(O(S^{2/5})\\), since\n\\[\n \\sum_{\\substack{\\ell<S^4\\\\\\ell\\ {\\rm prime}}}\\ell^{-9/10}\n \\le\\sum_{2\\le a<S^4}a^{-9/10}=O(S^{2/5}).\n\\]\nCounting multiples by \\eqref{eq:divisor-multiples} and bounding the\nentire summand by \\eqref{eq:divisor-pointwise}, we obtain a contribution\nat most\n\\begin{equation}\\label{eq:divisor-small-contribution}\n 2Y\\exp\\left(-v/50+O(S^{2/5})+\n                         r\\varepsilon_D(S)v\\right)\n \\le 2Ye^{-v/100}.\n\\end{equation}\nHere \\(S^{2/5}=o(v)\\), uniformly in the allowed range.\n\n\\smallskip\n\\noindent\\emph{The intermediate primes.}\nIt remains to treat\n\\(4\\log S\\le\\log p<v^{15/16}\\).\nPartition this range into intervals \\([t,2t)\\), where\n\\(t=2^j4\\log S\\le v^{15/16}\\).\nThere are \\(O_D(\\log S)\\) such intervals; the last may extend beyond\nthe upper endpoint. For one interval put\n\\[\n Q=\\frac vt,\\qquad \\lambda=\\frac{\\log Q}{10t}.\n\\]\nThen \\(Q\\ge v^{1/16}\\), and\n\\[\n 0<\\lambda\n \\le\\frac{\\log(DS/(4\\log S))}{40\\log S}<\\frac14\n\\]\nfor sufficiently large \\(S\\).\nEquations \\eqref{eq:divisor-prefix},\n\\eqref{eq:divisor-multiples}, and \\eqref{eq:divisor-prefix-lower}\nbound the contribution of this interval by\n\\[\n 2Ye^{rBQ}\n \\sum_{\\substack{d>e^{v/5}\\\\\n           \\ell\\mid d,\\ \\ell\\ {\\rm prime}\\Rightarrow\\ell\\le e^{2t}}}\n       \\frac{\\tau(d)^r}{d}.\n\\]\nThe last sum is at most\n\\[\n e^{-\\lambda v/5}\n \\prod_{\\substack{\\ell\\le e^{2t}\\\\\\ell\\ {\\rm prime}}}\n \\left(1+\\sum_{j\\ge1}(j+1)^r\\ell^{-j(1-\\lambda)}\\right).\n\\]\nBy \\eqref{eq:divisor-local-factor} and\n\\eqref{eq:prime-reciprocals}, the logarithm of this product is\nbounded by\n\\[\n C_r\\sum_{\\substack{\\ell\\le e^{2t}\\\\\\ell\\ {\\rm prime}}}\n                   \\ell^{-1+\\lambda}\n \\ll_r e^{2t\\lambda}\\log(2t)\n =Q^{1/5}O_r(\\log(2t)).\n\\]\nThe contribution of the interval is consequently at most\n\\begin{equation}\\label{eq:divisor-band}\n 2Y\\exp\\left(rBQ-\\frac{Q\\log Q}{50}\n                         +O_r(Q^{1/5}\\log(2t))\\right).\n\\end{equation}\nBoth positive terms in this exponent are uniformly negligible compared\nwith \\(Q\\log Q\\). Indeed, \\eqref{eq:divisor-B} and\n\\(Q\\ge v^{1/16}\\) give\n\\[\n \\frac{rB}{\\log Q}\n \\ll_{D,r}\\frac{\\log\\log S}{\\log S}\\longrightarrow0,\n \\qquad\n \\frac{Q^{1/5}\\log(2t)}{Q\\log Q}\n \\ll v^{-1/20}\\longrightarrow0.\n\\]\nThus \\eqref{eq:divisor-band} is at most\n\\(2Y\\exp(-Q\\log Q/100)\\le2Y\\), after increasing \\(S_0(D,r)\\).\nSumming the intervals costs \\(O_D(Y\\log S)\\).\n\nCombining this bound with \\eqref{eq:divisor-large-contribution}\nand \\eqref{eq:divisor-small-contribution} gives\n\\[\n \\sum_{1\\le h\\le Y}d_X(N+h)^r\n \\le Y\\exp\\!\\left(\n         O_{D,r}(S^{1/16}\\log\\log S+\\log S)\\right)\n       +2Ye^{-v/100}+O_D(Y\\log S).\n\\]\nThe logarithmic loss is \\(o(S^{1/4})\\), proving\n\\eqref{eq:divisor-moment}. Every enlargement of the threshold depended\nonly on the fixed \\(D,r\\); this completes the required uniformity check.",
    "deps": []
   },
   {
    "label": "lem:residues",
    "kind": "lemma",
    "title": "",
    "statement": "For all sufficiently large \\(S\\) and every integer \\(C\\) satisfying\n\\eqref{eq:C-range}, there are an integer \\(M\\) and indexed lists\n\\(T_0,T_1,\\ldots,T_R\\), each with \\(2^m\\) entries, such that:\n\\begin{enumerate}\n\\item\n\\(e^S<M\\le e^{D_MS}\\), and the least power of \\(2\\) at least\n\\(S^{D_0}\\) divides \\(M\\).  Every entry of every \\(T_i\\) divides \\(M\\).\n\\item\nFor each \\(0\\le j<d\\), let \\(T=T_0\\) if \\(X_j>e^S\\), and let\n\\(T=T_1\\) otherwise.  Apart from at most\n\\(X_j e^{-c_*m}\\) integers \\(u\\in(X_{j+1},X_j]\\), at least\n\\(\\rho |T|/2\\) entries \\(t\\in T\\) satisfy\n\\[\n h_{j,t}(u)\\le X_{j+1},\n \\qquad c_*=0.001.\n\\]\n\\item\nFor every integer \\(S^{D_0}<u\\le e^m\\), some entry \\(t\\) of one of\n\\(T_1,\\ldots,T_R\\) satisfies\n\\[\n u\\lceil t/u\\rceil-t\\le u^{1-\\eta}.\n\\]\n\\end{enumerate}\nRepeated values in a list are counted with their indices.\nThe threshold on \\(S\\) is independent of \\(C\\).",
    "section": "The denominator and the residue statement",
    "proof": "The construction already gives the required size of \\(M\\), its power of\ntwo, and divisibility of every list entry, for every realization of the\nsamples.  We prove the two residue properties.\n\nPut \\(H=\\lfloor e^{4\\eta m}\\rfloor\\).\nAt a level with \\(X_j>e^S\\), Lemma~\\ref{lem:deterministic} and Markov's\ninequality show that the number of integers\n\\(u\\in(X_{j+1},X_j]\\) for which\n\\[\n \\left|2^{-m}\\sum_{t\\in T_0}\\e(lCt/u)\\right|>e^{-3\\eta m}\n\\]\nat some \\(1\\le l\\le H\\) is at most\n\\[\n X_j H e^{6\\eta m}e^{-0.01m}\n \\le X_j e^{-0.009m}.\n\\]\nConjugation changes the Fourier sign without changing the absolute\nvalue.  Lemma~\\ref{lem:discrepancy}, with scale \\(m\\), therefore gives at\nleast \\(\\rho|T_0|/2\\) entries with\n\\[\n h_{j,t}(u)<\\rho u\\le X_{j+1}\n\\]\noutside that exceptional set.  This holds separately at every such\nlevel and requires no probabilistic selection.\n\nNext suppose \\(j<d\\) and \\(X_j\\le e^S\\).  Then \\(X_j>e^m\\), and every\n\\(u\\in(X_{j+1},X_j]\\) satisfies\n\\[\n (1-\\eta)m<\\log u\\le S,\\qquad\n w=\\min(m,\\log u)\\ge(1-\\eta)m.\n\\]\nFor sufficiently large \\(S\\), these integers satisfy the lower bound\nin Lemma~\\ref{lem:random}.  Moreover\n\\(4\\eta m\\le0.005w\\), so that Lemma applies to all \\(1\\le l\\le H\\).\nIn block \\(1\\), Markov's inequality followed by the frequency union\nbound shows that\n\\begin{align*}\n &\\Prob\\left(\n   \\max_{1\\le l\\le H}\n   \\left|2^{-m}\\sum_{t\\in T_1}\\e(lt/u)\\right|>e^{-3\\eta m}\n \\right)\\\\\n &\\hspace{2em}\\le\n \\exp\\bigl((10\\eta-0.01(1-\\eta))m\\bigr)\n =e^{-0.008999m}\\le e^{-0.005m}.\n\\end{align*}\nLet \\(B_j\\) count integers in this level that fail this Fourier bound.\nLinearity of expectation and another application of Markov give\n\\[\n \\E B_j\\le X_j e^{-0.005m},\n \\qquad\n \\Prob(B_j>X_j e^{-0.001m})\\le e^{-0.004m}.\n\\]\nAs \\(d=O(\\log S)\\), with probability \\(1-o(1)\\) these bounds hold at\nevery level under consideration.  No independence between different\nintegers or levels is needed.  Here \\(C_j=1\\), so\nLemma~\\ref{lem:discrepancy} again gives the required\n\\(\\rho|T_1|/2\\) entries outside the exceptional sets.\n\nFinally fix an integer \\(S^{D_0}<u\\le e^m\\).\nNow \\(w=\\log u\\), and Lemma~\\ref{lem:random}, Markov's inequality and\nthe union over \\(1\\le l\\le\\lfloor u^{4\\eta}\\rfloor\\) give\n\\begin{align*}\n &\n \\Prob\\left(\n  \\max_{1\\le l\\le\\lfloor u^{4\\eta}\\rfloor}\n   \\left|2^{-m}\\sum_{t\\in T_i}\\e(lt/u)\\right|>u^{-3\\eta}\n \\right)\\\\\n &\\hspace{2em}\\le u^{10\\eta-0.01}\n =u^{-0.009}\\le u^{-0.005}\n\\end{align*}\nin each block \\(i\\).  On success, Lemma~\\ref{lem:discrepancy}, with\nscale \\(\\log u\\), supplies a list entry for which\n\\[\n u\\lceil t/u\\rceil-t<u^{1-\\eta}.\n\\]\nThe \\(R=1000\\) blocks are independent for this fixed \\(u\\).\nThe probability that every block fails is therefore at most \\(u^{-5}\\).\nA union bound over all terminal integers shows that\n\\[\n \\Prob(\\text{some terminal integer has no successful block})\n \\le \\sum_{u>S^{D_0}}u^{-5}=o(1).\n\\]\nThus every terminal integer has a suitable divisor, simultaneously,\nwith probability tending to one.\n\nThe sum of this failure probability and the middle-level failure\nprobability is \\(o(1)\\).  Hence a realization satisfying both sets of\nrequirements exists.  Fix it and the resulting \\(M\\).\nSince \\(e^{-0.009m}\\le e^{-0.001m}\\), the same\n\\(c_*=0.001\\) is valid at every level.  This proves both properties for\none common \\(M\\), for the fixed \\(S\\) and \\(C\\).",
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
    "section": "Discrepancy and the deterministic list",
    "proof": "Apply \\eqref{eq:erdos-turan} to \\(x_t=-Qt/u\\) and\n\\(J=[0,e^{-\\eta w})\\).  Conjugation leaves the Fourier bounds\nunchanged.  The discrepancy is\n\\[\n O\\bigl(e^{-4\\eta w}+(1+4\\eta w)e^{-3\\eta w}\\bigr)\n =o(e^{-\\eta w}).\n\\]\nIt is therefore at most \\(e^{-\\eta w}/2\\) eventually.\nFinally,\n\\(\\{-Qt/u\\}=(u\\lceil Qt/u\\rceil-Qt)/u\\), including when the\nresidue is zero.",
    "deps": []
   },
   {
    "label": "lem:reciprocal-phase",
    "kind": "lemma",
    "title": "",
    "statement": "Fix \\(B\\ge4\\).  There are constants \\(A_B,\\delta_B>0\\) such that,\nfor every sufficiently large \\(U\\), every real \\(Z\\) with\n\\(U^4\\le |Z|\\le U^B\\), and every interval \\(I\\subset[U,2U]\\),\n\\[\n \\left|\\sum_{n\\in I}\\e(Z/n)\\right|\\le A_BU^{1-\\delta_B}.\n\\]",
    "section": "Discrepancy and the deterministic list",
    "proof": "We give the derivative argument, including the elementary estimates\nit uses.  This is the classical differencing method of van der Corput;\nsee \\cite[Lemma~2.5]{GrahamKolesnik1991} for differencing and\n\\cite[Theorem~2.2]{GrahamKolesnik1991} for the second-derivative estimate.\n\nFirst, if \\(|a_n|\\le1\\) is supported on an interval of length at most\n\\(U\\), then for \\(2\\le L\\le U\\),\n\\begin{equation}\\label{eq:differencing}\n U^{-2}\\left|\\sum_n a_n\\right|^2\n \\ll L^{-1}\n +\\max_{1\\le h<L}U^{-1}\n        \\left|\\sum_n a_{n+h}\\overline{a_n}\\right|.\n\\end{equation}\nTo see this, express the sum as\n\\(L^{-1}\\sum_n\\sum_{h=1}^L a_{n+h}\\), apply Cauchy--Schwarz in \\(n\\),\nand expand the square.  The outer support has length at most\n\\(U+L+2\\), the diagonal contributes \\(O(LU)\\), and the off-diagonal\nterms give \\eqref{eq:differencing}.\n\nWe also need the second derivative bound\n\\begin{equation}\\label{eq:second-derivative}\n \\left|\\sum_{n\\in J}\\e(g(n))\\right|\n \\ll_A U\\sqrt\\lambda+\\lambda^{-1/2}+1\n \\quad\\text{if}\\quad\n \\lambda\\le |g''(x)|\\le A\\lambda\n\\end{equation}\non an interval \\(J\\) of length at most \\(U\\), for \\(g\\in C^2(J)\\).\nHere is an elementary proof.  For \\(\\lambda\\) above a fixed positive\nconstant the trivial bound suffices.  Otherwise put\n\\(\\beta=\\sqrt\\lambda<1/4\\).\nThe derivative \\(g'\\) is monotone and traverses a range of length\n\\(O_A(U\\lambda)\\).  The portions where \\(g'\\) is within \\(\\beta\\)\nof an integer have \\(O_A(U\\lambda+1)\\) components and total length\n\\(O_A(U\\beta+\\beta/\\lambda)\\), since \\(|g''|\\ge\\lambda\\).\nTheir integer points contribute the same bound after adding the\nnumber of components.\n\nOn each remaining interval \\(g'\\) is monotone and stays between\n\\(q+\\beta\\) and \\(q+1-\\beta\\) for some integer \\(q\\).\nThe corresponding sum is \\(O(\\beta^{-1})\\).  Indeed the increments\n\\(g(n+1)-g(n)\\) are monotone in that same interval, and summation\nby parts in\n\\[\n \\e(g(n))=\n \\frac{\\e(g(n+1))-\\e(g(n))}\n      {\\e(g(n+1)-g(n))-1}\n\\]\ngives this bound: the reciprocal denominator has supremum and total\nvariation \\(O(\\beta^{-1})\\).  Boundary terms add at most a constant\nper interval.  Summing over the \\(O_A(U\\lambda+1)\\) intervals proves\n\\eqref{eq:second-derivative}.\n\nNow let \\(k\\) be a nearest integer to \\(\\log|Z|/\\log U\\), and set\n\\[\n Q_B=\\lceil B\\rceil+1,\\qquad\n r=k-2,\\qquad L=\\lfloor U^{1/(10k)}\\rfloor.\n\\]\nThere are only finitely many possible orders:\n\\begin{equation}\\label{eq:derivative-order}\n 4\\le k\\le Q_B,\\qquad\n U^{-3/2}\\le |Z|U^{-k-1}\\le U^{-1/2}.\n\\end{equation}\nApply \\eqref{eq:differencing} \\(r\\) times to\n\\(a_n=\\mathbf1_I(n)\\e(f(n))\\), where \\(f(x)=Z/x\\), extending the\nsequence by zero outside \\(I\\).  For positive shifts\n\\(h_1,\\ldots,h_r<L\\), the last phase is\n\\[\n g(x)=\\Delta_{h_1}\\cdots\\Delta_{h_r}f(x),\n \\qquad \\Delta_hf(x)=f(x+h)-f(x).\n\\]\nIts support is the interval on which both \\(x\\) and\n\\(x+h_1+\\cdots+h_r\\) belong to \\(I\\).\nAll intermediate points \\(x+t_1+\\cdots+t_r\\), \\(0\\le t_i\\le h_i\\),\ntherefore remain in \\([U,2U]\\).  Empty supports contribute zero.\n\nThe fundamental theorem of calculus gives\n\\[\n g''(x)=\n \\int_0^{h_1}\\!\\cdots\\!\\int_0^{h_r}\n f^{(k)}(x+t_1+\\cdots+t_r)\\,dt_r\\cdots dt_1.\n\\]\nSince \\(f^{(k)}(x)=(-1)^k k!Zx^{-k-1}\\) has constant sign,\n\\[\n \\frac{k!}{2^{k+1}}\\Lambda\n \\le |g''(x)|\\le k!\\Lambda,\n \\qquad \\Lambda=|Z|U^{-k-1}\\prod_{i=1}^r h_i.\n\\]\nBy \\eqref{eq:derivative-order} and the choice of \\(L\\),\n\\[\n U^{-3/2}\\le\\Lambda\n \\le U^{-1/2+(k-2)/(10k)}\\le U^{-2/5}.\n\\]\nThus \\eqref{eq:second-derivative} bounds each last correlation by\n\\(O_k(U^{4/5}+U^{3/4}+1)=O_k(U^{4/5})\\).\n\nFor clarity, normalize every correlation by \\(U\\), and let \\(\\sigma_j\\)\nbe their maximum after \\(j\\) shifts.  Then\n\\[\n \\sigma_{k-2}\\ll_k U^{-1/5},\n \\qquad \\sigma_j^2\\ll L^{-1}+\\sigma_{j+1}.\n\\]\nInduction, using \\(L\\ge U^{1/(10k)}/2\\) for large \\(U\\), yields\n\\[\n \\sigma_0\\ll_k U^{-1/(10k\\,2^{k-2})}.\n\\]\nTaking the largest implied constant over \\(4\\le k\\le Q_B\\) and,\nfor example, \\(\\delta_B=(10Q_B2^{Q_B})^{-1}\\) proves the lemma.\nIn particular, although \\(k\\) depends on \\(Z,U\\), the final constants\ndepend only on \\(B\\).",
    "deps": []
   },
   {
    "label": "lem:deterministic",
    "kind": "lemma",
    "title": "",
    "statement": "For the deterministic list \\(T_0\\) constructed above, every level\n\\(0\\le j<d\\) with \\(X=X_j>e^S\\), and every integer\n\\(1\\le\\ell\\le H:=\\lfloor e^{4\\eta m}\\rfloor\\), one has\n\\begin{equation}\n \\frac1X\\sum_{X_{j+1}<u\\le X}\n \\left|\\frac1{|T_0|}\\sum_{t\\in T_0}\\e(\\ell Ct/u)\\right|^2\n \\le e^{-0.01m}\n\\end{equation}\nfor all sufficiently large \\(S\\), uniformly in \\(C\\).",
    "section": "Discrepancy and the deterministic list",
    "proof": "Write \\(Y=X_{j+1}=\\rho X\\); then\n\\(Y>e^{S-\\eta m}\\ge e^{0.9S}\\).\nExpanding the square, the diagonal contributes at most \\(2^{-m}\\)\nbecause the \\(2^m\\) subset products are distinct.\nFor an off-diagonal pair put \\(Z=\\ell C(t-t')\\).\nThe difference \\(t-t'\\) is a nonzero integer, and\n\\eqref{eq:C-range} and \\eqref{eq:product-size} give\n\\[\n e^{D_CS}\\le |Z|\\le e^{(2D_C+K+2)S}.\n\\]\nSplit \\((Y,X]\\) into intersections with dyadic intervals \\([U,2U]\\).\nWe may take \\(Y/2\\le U\\le X\\), so for large \\(S\\),\n\\[\n e^{0.8S}\\le U\\le e^{D_XS},\\qquad\n U^4\\le |Z|\\le U^{3D_C}.\n\\]\nLemma~\\ref{lem:reciprocal-phase}, with the fixed value \\(B=3D_C\\),\nbounds the sum over each piece by\n\\(O(Ue^{-0.8\\delta_BS})\\).\nThe sum of the dyadic \\(U\\)'s is \\(O(X)\\).  Thus\n\\[\n \\left|\\sum_{Y<u\\le X}\\e(Z/u)\\right|\\ll Xe^{-cS}\n\\]\nfor an absolute \\(c>0\\).  Averaging over all off-diagonal pairs\ncancels their number against \\(|T_0|^2\\).  The left side of\n\\eqref{eq:deterministic-mean} is consequently at most\n\\[\n 2^{-m}+O(e^{-cS})\\le e^{-0.01m}\n\\]\neventually, since \\(S/m\\to\\infty\\).",
    "deps": [
     "lem:reciprocal-phase"
    ]
   },
   {
    "label": "lem:random",
    "kind": "lemma",
    "title": "",
    "statement": "Let \\(K=100\\), \\(D_0=100000\\), and \\(m=\\lfloor S/\\log S\\rfloor\\).\nLet \\(\\mathcal P\\) be a set of primes in \\([S^K,2S^K]\\) with\n\\(P=|\\mathcal P|\\ge S^{K-1}\\), and sample\n\\[\n p_{j,\\epsilon}\\qquad\n (1\\le j\\le m,\\ \\epsilon\\in\\{0,1\\})\n\\]\nindependently and uniformly from \\(\\mathcal P\\).  For\n\\(I\\in\\{0,1\\}^m\\), put \\(t_I=\\prod_{j=1}^m p_{j,I_j}\\).\nFor every integer \\(u\\) such that\n\\[\n D_0\\log S\\le V:=\\log u\\le S,\n \\qquad w=\\min(m,V),\n\\]\nand every integer \\(1\\le l\\le \\exp(0.005w)\\), one has\n\\begin{equation}\n \\E\\left|2^{-m}\\sum_{I\\in\\{0,1\\}^m}\\e(lt_I/u)\\right|^2\n \\le \\exp(-0.01w)\n\\end{equation}\nfor all sufficiently large \\(S\\).  The onset is absolute and uniform in\n\\(u,l,\\mathcal P\\).",
    "section": "Random products",
    "proof": "Expanding the square gives\n\\[\n 4^{-m}\\sum_{I,J\\in\\{0,1\\}^m}\n       \\E\\,\\e\\bigl(l(t_I-t_J)/u\\bigr).\n\\]\nFor uniformly counted pairs \\(I,J\\), their Hamming distance \\(B\\) has\ndistribution \\(\\operatorname{Bin}(m,1/2)\\).  The exponential Markov\ninequality gives\n\\[\n \\Prob(B<m/4)\n \\le 2^{m/4}\\E\\,2^{-B}\n =2^{m/4}(3/4)^m\n \\le e^{-m/16}.\n\\]\nWe bound these pairs trivially.  Fix any remaining pair, and set\n\\[\n s=\\left\\lfloor\\frac{0.75V}{K\\log S}\\right\\rfloor.\n\\]\nSince \\(V/(K\\log S)\\ge1000\\), and \\(V\\le S\\), we have\n\\begin{equation}\\label{eq:random-product-lengths}\n \\frac{0.74V}{K\\log S}\\le s\\le\\frac{0.75V}{K\\log S},\n \\qquad 2s\\le m/4\n\\end{equation}\nfor sufficiently large \\(S\\).\n\nSelect the first \\(2s\\) differing coordinates in increasing order, and\ndivide them into two sets of \\(s\\) coordinates each.  This choice depends\nonly on \\(I,J\\), not on the sampled primes.  Expose every labelled prime\nsample except the \\(I\\)-selected sample at these \\(2s\\) coordinates.\nThen \\(t_J\\) is fixed and\n\\[\n t_I=U_0U_1U_2,\n\\]\nwhere \\(U_0\\) is fixed by the exposure and \\(U_1,U_2\\) are independent\nproducts of \\(s\\) fresh uniform samples each.  Equal prime values cause\nno difficulty: the \\(I\\)-selected and \\(J\\)-selected variables at a\ndiffering coordinate are distinct independent samples.\n\nWrite\n\\[\n g=\\gcd(lU_0,u),\\qquad q=u/g.\n\\]\nThe coefficient \\(lU_0/u\\) reduces to a fraction with denominator\n\\(q\\). We will show that \\(q\\) is usually large enough for distinct\ninteger values of each fresh product to remain distinct modulo \\(q\\).\nTheir small point probabilities will then give cancellation by\nadditive-character orthogonality.\n\nWe first bound the probability, over the exposed variables, that\n\\(q<u^{0.9}\\).  Since \\(l\\le u^{0.005}\\) and\n\\(\\gcd(lU_0,u)\\le l\\gcd(U_0,u)\\), this event implies\n\\(\\gcd(U_0,u)>u^{0.095}\\).\nCall a sample contributing to \\(U_0\\) a hit if its prime value divides\n\\(u\\), and count hits with their sample multiplicities.  If their number\nis \\(B_0\\), then\n\\[\n \\gcd(U_0,u)\\le \\prod_{\\text{hit samples }p}p\n       \\le S^{(K+1)B_0}.\n\\]\nThus failure requires at least\n\\[\n k_0=\\left\\lceil\\frac{0.08V}{(K+1)\\log S}\\right\\rceil\n\\]\nhits.  At most \\(S\\) primes in the sampling interval divide \\(u\\), so\neach sample has hit probability at most\n\\(S/P\\le S^{-(K-2)}\\).  There are at most \\(m\\le S\\) independent samples\nin \\(U_0\\).  A union bound over sets of \\(k_0\\) positions yields\n\\begin{equation}\\label{eq:random-gcd}\n \\Prob(q<u^{0.9})\n \\le S^{-(K-3)k_0}\n \\le \\exp\\left(-\\frac{0.08(K-3)}{K+1}V\\right)\n \\le u^{-0.05}.\n\\end{equation}\nIf \\(k_0>m-2s\\), the event is empty.  This argument allows prime powers\nin \\(u\\) and repeated sampled primes.\n\nNow fix an exposure with \\(q\\ge u^{0.9}\\).  Every possible value of\neither fresh product is at most\n\\[\n (2S^K)^s\\le S^{(K+1)s}\\le u^{0.7575}<u^{0.8}<q.\n\\]\nBy unique factorization, an integer can arise as the product of at most\n\\(s!\\) ordered \\(s\\)-tuples of primes.  Consequently each atom in the\ndistribution of \\(U_i\\), for \\(i=1,2\\), has probability at most\n\\[\n \\frac{s!}{P^s}\\le S^{-(K-2)s}\n      \\le u^{-0.7252}\\le u^{-0.7}.\n\\]\nReduction modulo \\(q\\) is injective on these integer values.  The\nprobability vectors \\(\\alpha,\\beta\\) of \\(U_1,U_2\\) on\n\\(\\Z/q\\Z\\) therefore satisfy\n\\[\n \\|\\alpha\\|_2,\\|\\beta\\|_2\\le u^{-0.35}.\n\\]\n\nThe reduced fraction \\(lU_0/u=c/q\\) has \\(\\gcd(c,q)=1\\).\nComplete additive-character orthogonality gives\n\\[\n \\sum_{x\\bmod q}\\left|\\sum_{y\\bmod q}\\beta_y\\e(cxy/q)\\right|^2\n       =q\\sum_{y\\bmod q}|\\beta_y|^2.\n\\]\nIndeed the inner sum over \\(x\\) vanishes unless\n\\(q\\mid c(y-y')\\), equivalently \\(y=y'\\) modulo \\(q\\).\nThis identity holds for composite \\(q\\) as well.  Cauchy--Schwarz gives\n\\[\n \\left|\\sum_{x,y\\bmod q}\\alpha_x\\beta_y\\e(cxy/q)\\right|\n \\le \\sqrt q\\,\\|\\alpha\\|_2\\|\\beta\\|_2\n \\le u^{-0.2}.\n\\]\nThe factor \\(\\e(-lt_J/u)\\) is fixed under the exposure.  Averaging this\nconditional estimate and using \\eqref{eq:random-gcd} bounds the\ncontribution of our fixed pair \\(I,J\\) in absolute value by\n\\(u^{-0.05}+u^{-0.2}\\).\n\nCombining this with the Hamming exception, we obtain\n\\[\n \\E\\left|2^{-m}\\sum_I\\e(lt_I/u)\\right|^2\n \\le e^{-m/16}+u^{-0.05}+u^{-0.2}\n \\le 3e^{-0.05w}\n \\le e^{-0.01w}.\n\\]\nThe final inequality is uniform because\n\\(\\min(m,D_0\\log S)\\) tends to infinity with \\(S\\).",
    "deps": []
   },
   {
    "label": "lem:marked-cleanup",
    "kind": "lemma",
    "title": "",
    "statement": "Let $Q>1$ be odd. Suppose that a finite list of positive integers\n$m_1,\\ldots,m_t$ satisfies $\\sum_{i=1}^t1/m_i=1$ and contains a\nmultiple of $Q$. Then $1$ has a representation by at most $t$ distinct\npositive unit fractions, still with a denominator divisible by $Q$.",
    "section": "Counting representations of one",
    "proof": "Whenever a denominator $m$ occurs twice, replace those two terms by\n\\[\n \\frac2m=\\frac1{m/2}\\quad(m\\text{ even}),\n \\qquad\n \\frac2m=\\frac1{(m+1)/2}+\\frac1{m(m+1)/2}\n       \\quad(m\\text{ odd}).\n\\]\nThe sum stays equal to one and the length does not increase.\nThere remains a denominator divisible by $Q$: if no such denominator\nis removed it persists, while if $Q\\mid m$, the even replacement\n$m/2$ is a multiple of $Q$ because $Q$ is odd, and the larger odd\nreplacement is a multiple of $m$.\n\nThis invariant excludes a denominator one, since that would force the\nsingleton list $(1)$. It also excludes a repeated denominator two,\nsince two halves exhaust the sum and neither denominator is divisible\nby $Q$. Thus an odd repeated denominator is at least three. In an odd\nreplacement the smaller new denominator is strictly below $m$ and the\nlarger is strictly above $m$. The sorted denominator tuple therefore\nstrictly decreases lexicographically: all entries below $(m+1)/2$\nare unchanged, and one extra copy of $(m+1)/2$ is inserted.\nAt a fixed length such a descent in positive integer tuples terminates.\nIndeed, the first coordinate can decrease only finitely often, and\nafter it stabilizes the same argument applies successively to the other\ncoordinates. Even replacements strictly reduce length, so only finitely\nmany occur. The procedure consequently terminates with distinct\ndenominators and preserves the required multiple of $Q$.",
    "deps": []
   },
   {
    "label": "lem:marked-greedy-prefix",
    "kind": "lemma",
    "title": "A greedy prefix avoiding one denominator",
    "statement": "Let $m\\ge4$ and $T\\ge2m^2$ be integers.\nThere are integers $2\\le n_1<\\cdots<n_j$, none equal to $m$,\nand integers $q>0$ and $0\\le R<2m$ such that\n\\[\n  1=\\frac1m+\\sum_{i=1}^{j}\\frac1{n_i}+\\frac Rq,\n  \\qquad q=m\\prod_{i=1}^{j}n_i,\n  \\qquad\n  j<3+\\log_2\\log_2 T.\n\\]\nWriting $q_0=m$ and $q_i=m\\prod_{h=1}^{i}n_h$ for $1\\le i\\le j$,\nwe have $n_i\\le q_{i-1}+1$ for every $1\\le i\\le j$.\nIf $R>0$, then\n\\[\n  q\\ge T,\\qquad\n  \\frac Rq<\\frac{2m}{T}\\le\\frac1m,\n  \\qquad \\frac Rq<\\frac1{n_i}\\quad(1\\le i\\le j).\n\\]\nIn either case $q<T^2$.",
    "section": "Preserving a prescribed denominator",
    "proof": "Start with $(R_0,q_0)=(m-1,m)$ and $x_0=R_0/q_0$.\nWhenever $R_i>0$ and $q_i<T$, set\n\\[\n a=\\left\\lceil\\frac{q_i}{R_i}\\right\\rceil,\n \\qquad\n n_{i+1}=\\begin{cases}a,&a\\ne m,\\\\m+1,&a=m,\\end{cases}\n \\qquad\n (R_{i+1},q_{i+1})=(n_{i+1}R_i-q_i,n_{i+1}q_i).\n\\]\nDo not cancel common factors in this pair.  Thus\n$x_{i+1}=R_{i+1}/q_{i+1}=x_i-1/n_{i+1}$.\n\nFor an ordinary step, writing $n=n_{i+1}=a$ gives\n\\[\n  \\frac1n\\le x_i<\\frac1{n-1},\\qquad\n  0\\le R_{i+1}<R_i,\\qquad\n  0\\le x_{i+1}<\\frac1{n(n-1)}\\le\\frac1n.\n\\]\nMoreover $n<1/x_i+1$, so\n\\[\n x_{i+1}<x_i-\\frac{x_i}{1+x_i}\n          =\\frac{x_i^2}{1+x_i}<x_i^2.\n\\]\nIn the exceptional step $a=m$, we have\n$(m-1)R_i<q_i\\le mR_i$.  Consequently\n\\[\n  0<R_i\\le R_{i+1}<2R_i,\n  \\qquad\n  0<x_{i+1}\n   <\\frac2{(m-1)(m+1)}<\\frac1{m+1},\n\\]\nwhere the last inequality uses $m\\ge4$.\nEvery step therefore leaves a remainder smaller than the term just\nsubtracted.  The next denominator, if there is one, is strictly larger.\nAfter the exceptional step all later denominators exceed $m+1$, so that\nstep can occur at most once.  Before it, $R_i\\le m-1$; after it, the\nnumerator is less than $2(m-1)$ and decreases at every subsequent step.\nThus $0\\le R_i<2m$ throughout.\nSince $R_i\\ge1$ in an active step, $a\\le q_i$ and hence\n$n_{i+1}\\le q_i+1$.\n\nAll selected denominators are at least $2$, so $q_i$ at least doubles\nat each step.  The procedure thus stops after finitely many steps.\nIts first denominator is $2$, and\n$x_1=(m-2)/(2m)<1/2$.\nAll later steps square the upper bound for the remainder, apart from\nat most one step that still decreases it.  Therefore, whenever $i\\ge2$\nand the remainder is positive,\n\\[\n x_i\\le 2^{-2^{i-2}},\\qquad q_i\\ge\\frac1{x_i}\n                 \\ge2^{2^{i-2}}.\n\\]\nIf the final step has index $j\\ge3$, its preceding state is active,\nand hence\n\\[\n 2^{2^{j-3}}\\le q_{j-1}<T.\n\\]\nThis gives the asserted bound for $j$; it is immediate when $j\\le2$.\nThe same preceding state satisfies\n$q_j\\le q_{j-1}(q_{j-1}+1)<T^2$, since $T$ is an integer.\n\nThe displayed decomposition and product formula follow by telescoping.\nIf $R_j=0$, the decomposition is complete.  Otherwise the stopping rule\ngives $q_j\\ge T$ and $R_j<2m$, whence\n$R_j/q_j<2m/T\\le1/m$.\nAt each earlier step the new remainder was smaller than $1/n_i$,\nand subsequent steps only decrease it.  This proves all the claimed\nstrict inequalities.",
    "deps": []
   },
   {
    "label": "lem:exact-marker-padding",
    "kind": "lemma",
    "title": "Preserving a prescribed denominator while padding",
    "statement": "Let $r\\ge3$ be an integer, and suppose that\n\\[\n 1=\\sum_{i=1}^{r}\\frac1{n_i},\\qquad\n 1\\le n_1<\\cdots<n_r,\n\\]\nwhere the denominators are integers. For every\n$m\\in\\{n_1,\\ldots,n_r\\}$ there is a representation of $1$ by\nexactly $r+1$ distinct positive unit fractions that still contains\nthe exact denominator $m$. Consequently $D_r\\subseteq D_{r+1}$.",
    "section": "Preserving a prescribed denominator",
    "proof": "This is the padding lemma of van Doorn and Tang\n\\cite[Lemma~2.1]{vanDoornTang2026}; we include a proof.\nEvery denominator is at least two, since a term with denominator one\nwould already exhaust the sum. The identity\n\\[\n \\frac1b=\\frac1{b+1}+\\frac1{b(b+1)}\n\\]\nreplaces one term by two with distinct denominators larger than $b$.\nIf $m\\ne n_r$, apply it to $n_r$; the new denominators exceed all\nthe unchanged ones, and $m$ remains.\n\nSuppose that $m=v=n_r$, and let $s=n_{r-1}$.\nThe same split of $s$ works unless $v=s+1$ or $v=s(s+1)$,\nsince every other unchanged denominator is smaller than $s$.\nIn either exceptional case, if $s=ab$ with integers $a,b\\ge2$, use instead\n\\[\n \\frac1s=\\frac1{s+a}+\\frac1{b(s+a)}.\n\\]\nThe inequalities\n\\[\n s+1<s+a<b(s+a)<s(s+1)\n\\]\nshow that both new denominators avoid either exceptional value of\n$v$ and all the unchanged denominators below $s$.\n\nFinally, neither exceptional case can occur when $s=p$ is prime.\nThere are at least three original terms, so $p>n_{r-2}\\ge2$ and\nin particular $p$ is odd. All denominators other than $p$ and $v$\nare below $p$; write the sum of their reciprocals as $A/B$ with\n$p\\nmid B$. The two exceptional choices give respectively\n\\[\n 1-\\frac AB\n =\\frac1p+\\frac1{p+1}\n =\\frac{2p+1}{p(p+1)},\n \\qquad\\text{or}\\qquad\n 1-\\frac AB\n =\\frac1p+\\frac1{p(p+1)}\n =\\frac{p+2}{p(p+1)}.\n\\]\nAfter clearing denominators and reducing modulo $p$, these equations\ngive respectively $0\\equiv B\\pmod p$ and $0\\equiv2B\\pmod p$,\nboth impossible. Thus in every valid case an unmarked term can be\nreplaced by two distinct terms, preserving $m$ and increasing the\nlength by exactly one.",
    "deps": []
   },
   {
    "label": "prop:marked-length",
    "kind": "proposition",
    "title": "",
    "statement": "For every $\\varepsilon>0$ there is an integer $m_\\varepsilon$ such\nthat every integer $m\\ge m_\\varepsilon$ occurs as an exact denominator\nin a representation of $1$ by distinct positive unit fractions with\nat most\n\\[\n \\left(\\frac{257}{\\log 2}+\\varepsilon\\right)\\log\\log m\n\\]\nterms.",
    "section": "A quantitative prescribed-denominator bound",
    "proof": "Fix a sufficiently large integer $m$, put $L=\\log\\log m$, and take\n$K_m$ from Lemma~\\ref{lem:rational-divisor-supply}. Apply\nLemma~\\ref{lem:marked-greedy-prefix} with $T=2mK_m$, which is an\ninteger at least $2m^2$. It gives\n\\[\n 1=\\frac1m+\\sum_{i=1}^{j}\\frac1{n_i}+\\frac Rq,\n \\qquad 0\\le R<2m.\n\\]\nThe prefix is distinct and avoids $m$. By \\eqref{eq:supply-size},\n\\[\n \\log\\log(2mK_m)\\le L+O(\\log L),\n \\qquad\n j\\le\\frac{L}{\\log2}+O(\\log L)\n   =\\left(\\frac1{\\log2}+o(1)\\right)L.\n\\]\nIf $R=0$, the expansion is complete and already satisfies the asserted\nlength bound. Suppose henceforth that $R>0$.\n\nThe denominator $q$ is retained without cancellation, beginning at $m$\nand using multipliers at most the preceding denominator plus one.\nLemma~\\ref{lem:marked-divisor-density} therefore applies to this $q$.\nMoreover $q\\ge2mK_m$ and $R<2m$, so the integer $X=RK_m$ satisfies\n$1\\le X<q$. Lemma~\\ref{lem:marked-grouping}, with $B=16$ and the\nsupply from Lemma~\\ref{lem:rational-divisor-supply}, represents\n$X/(qK_m)=R/q$ as a sum of at most $16G$ unit fractions, where\n\\[\n G\\le\\frac{\\log(RK_m)}{2\\log m}+2\n \\le\\frac{\\log K_m+\\log(2m)}{2\\log m}+2\n \\le\\left(\\frac{16}{\\log2}+o(1)\\right)L.\n\\]\nThis count depends on $RK_m$, not on the potentially much larger $q$.\n\nApply Lemma~\\ref{lem:distinct} only to this tail. It makes its\ndenominators distinct without changing its number of terms. The tail\nsum is strictly below $1/m$ and every $1/n_i$ by\nLemma~\\ref{lem:marked-greedy-prefix}. Every reciprocal in any positive\nexpansion of that sum is at most the sum itself. Thus all denominators\nof the distinct tail exceed $m$ and every $n_i$, so adjoining it to the\nreserved term and prefix produces a distinct expansion of $1$.\nThere is one reserved term, $j$ prefix terms, and at most sixteen terms\nfor each of the $G$ groups. Its total length is therefore at most\n\\[\n 1+j+16G\n \\le\\left(\\frac{1+16\\cdot16}{\\log2}+o(1)\\right)L\n =\\left(\\frac{257}{\\log2}+o(1)\\right)\\log\\log m.\n\\]\nAll errors here tend to zero as $m$ tends to infinity through all\nintegers: the bound on $R$ removed any dependence on the chosen\nstopping numerator, and the supply covers both parities. Absorbing\nthe error into any prescribed $\\varepsilon>0$ proves the proposition.",
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
    "section": "A common supply of rational divisors",
    "proof": "The prime number theorem \\cite[p.~305, (1.1)]{Selberg1949} gives\n\\[\n \\log P(v)=(1+o(1))\\ell(v)\\log\\ell(v)\n \\ll\\log v\\log\\log v.\n\\]\nSince $\\ell(Y)=16\\log m/\\log 2+O(1)$, and\n$\\log(\\lfloor L\\rfloor!)=O(L\\log L)$, this proves\n\\eqref{eq:supply-size}.  Also $P(Y)\\geq2^{\\ell(Y)}\\geq Y^4$,\nso $K_m>m$ for large $m$.\n\nWe next prove an assertion whose threshold is independent of $m$.\nFix a sufficiently large odd integer $u$, and let $A$ be the set of positive\ndivisors of $P(u)$.  Write $N=|A|=2^{\\ell(u)}\\geq u^4$.\nWe estimate exceptional primes by counting congruent pairs, the\nmechanism underlying Gallagher's larger sieve \\cite{Gallagher1971}.\nThe coarse count below suffices.\nFor each prime $p\\leq u$, let $A_p$ be the image of $A$ in\n$\\mathbb F_p$.  Call $p$ exceptional when $|A_p|\\leq p^{3/4}$.\nIf $c_a$ is the number of members of $A$ in residue class $a$, then\nCauchy--Schwarz shows that the number of ordered pairs of distinct members\nof $A$ congruent modulo an exceptional prime is at least\n\\[\n \\sum_{a\\in\\mathbb F_p}c_a^2-N\n \\geq\\frac{N^2}{|A_p|}-N\n \\geq\\frac{N^2}{2u^{3/4}}.\n\\]\nFor any two distinct members $a,b\\in A$, the nonzero integer $|a-b|<P(u)$\nhas at most $\\log P(u)/\\log 2$ distinct prime divisors.\nCounting the same pairs prime by prime therefore bounds the number $B(u)$\nof exceptional primes by\n\\begin{equation}\\label{eq:supply-exceptional}\n B(u)\\leq \\frac{2u^{3/4}\\log P(u)}{\\log 2}\n \\ll u^{3/4}\\log u\\log\\log u.\n\\end{equation}\n\nWe use the quantitative form of Vinogradov's three-prime theorem: there is\nan absolute $c>0$ such that every sufficiently large odd integer $u$ has\nat least $cu^2/(\\log u)^3$ ordered representations as a sum of three\nprimes; see the statement in \\cite[(1)--(2)]{Kumchev1997}\nand the exposition in \\cite[Theorem~1 and Section~3.1]{KumchevTolev2005}.\nTo make the uniformity in odd $u$ explicit, its singular series is\n\\[\n \\mathfrak S(u)=\n \\prod_{p\\mid u}\\left(1-\\frac{1}{(p-1)^2}\\right)\n \\prod_{p\\nmid u}\\left(1+\\frac{1}{(p-1)^3}\\right).\n\\]\nFor odd $u$ its factor at $2$ is $2$, and\n\\[\n \\mathfrak S(u)\\geq\n 2\\prod_{p>2}\\left(1-\\frac{1}{(p-1)^2}\\right)>0.\n\\]\nThe infinite product is positive because the sum of the subtracted\nquantities converges.  Thus the asymptotic formula supplies an absolute\nlower bound with an absolute threshold, with no dependence on the\nfactorization of $u$.\n\nAt most $3uB(u)$ ordered prime triples summing to $u$ contain an\nexceptional prime: choose its position, its value, and one further entry;\nthe last entry is then fixed.  By \\eqref{eq:supply-exceptional},\n\\[\n 3uB(u)\\ll u^{7/4}\\log u\\log\\log u\n       =o\\left(\\frac{u^2}{(\\log u)^3}\\right).\n\\]\nConsequently every sufficiently large odd $u$ is the sum of three primes\nthat are not exceptional for this same set $A$.\n\nIt remains to represent each such prime using divisors of $P(u)^2$.\nFix one of them, say $p$, and put $H=A_p$ and $h=|H|>p^{3/4}$.\nLet $U$ be the product of two independent uniformly chosen members of\n$H$, and write $\\mathrm e_p(z)=\\exp(2\\pi i z/p)$.\nThe following classical bilinear estimate is recorded in\n\\cite[Proposition~1.1]{GlibichukKonyagin2007}; we give its short proof\nand the five-product consequence needed here.\nFor every nonzero $r\\in\\mathbb F_p$, orthogonality and\nCauchy--Schwarz give\n\\begin{align*}\n \\left|\\sum_{a,b\\in H}\\mathrm e_p(rab)\\right|^2\n &\\leq h\\sum_{a\\in\\mathbb F_p}\n       \\left|\\sum_{b\\in H}\\mathrm e_p(rab)\\right|^2\\\\\n &=ph^2.\n\\end{align*}\nAfter division by $h^4$, this says\n\\[\n \\left|\\mathbb E\\,\\mathrm e_p(rU)\\right|\n \\leq\\frac{\\sqrt p}{h}<p^{-1/4}.\n\\]\nFor five independent copies $U_1,\\ldots,U_5$, Fourier inversion now yields\n\\begin{align*}\n \\Pr(U_1+\\cdots+U_5=0)\n &=\\frac1p\\left(1+\\sum_{r\\ne0}\n                   (\\mathbb E\\,\\mathrm e_p(rU))^5\\right)\\\\\n &\\geq\\frac{1-(p-1)p^{-5/4}}p>0.\n\\end{align*}\nHere the lower bound follows by bounding the absolute value of the sum\nof the nonzero Fourier coefficients.\n\nChoose pairs of residues witnessing this positive probability and lift\neach residue to any positive member of $A$ representing it.  The five\ninteger products $e_1,\\ldots,e_5$ are positive divisors of $P(u)^2$,\nand their sum is divisible by $p$.  Hence\n\\[\n t=\\frac{e_1+\\cdots+e_5}{p}\\in\\mathbb Z_{>0},\\qquad\n p=\\sum_{i=1}^{5}\\frac{e_i}{t}.\n\\]\nThe three chosen primes thus represent $u$ in fifteen summands of the\nrequired kind.\n\nFor a sufficiently large integer $s$, use $u=s$ if $s$ is odd and\n$u=s-1$ otherwise.  In the even case append the summand $1=1/1$.\nThis uses at most sixteen summands.  If $s\\leq Y$, monotonicity of\n$\\ell$ implies $P(u)\\mid P(Y)$, so every numerator constructed above\ndivides $K_m$.\n\nFinally, all preceding thresholds concern $s$ alone and are absolute.\nChoose an integer $S_0$ above them.  For all sufficiently large $m$ we\nhave $\\lfloor L\\rfloor\\geq S_0$.  Each remaining integer\n$1\\leq s\\leq S_0$ then divides $\\lfloor L\\rfloor!$ and hence $K_m$,\nso it has the one-summand representation $s=s/1$.  This proves the\nassertion simultaneously for every $1\\leq s\\leq Y$.",
    "deps": []
   },
   {
    "label": "lem:marked-divisor-density",
    "kind": "lemma",
    "title": "",
    "statement": "Let $m\\ge2$ be an integer.  Suppose that $q$ is obtained from $m$ by a\nfinite sequence of replacements $q\\mapsto nq$, where at each replacement\n$n$ is a positive integer satisfying $n\\le q+1$.  Then, for every real\nnumber $w$ with $1\\le w\\le q$, there is a positive divisor $d$ of $q$ such\nthat\n\\[\n  \\frac wm\\le d\\le w.\n\\]",
    "section": "Grouping the remaining numerator",
    "proof": "For the initial value $q=m$, the divisor $1$ works throughout $[1,m]$.\nSuppose the property holds for $q$, and put $q'=nq$.  If $1\\le w\\le q$,\nuse a divisor of $q$, which is also a divisor of $q'$.  If $n\\le w\\le nq$,\napply the property at $w/n$ and multiply the resulting divisor by $n$.\nThese two cases cover $[1,nq]$ unless $q<n$ and $q<w<n$.  In that gap\nthe divisor $q$ itself works: $q<w$ and\n\\[\n  w<n\\le q+1\\le mq.\n\\]\nThis proves the induction, including the real points between consecutive\nintegers.",
    "deps": []
   },
   {
    "label": "lem:marked-grouping",
    "kind": "lemma",
    "title": "",
    "statement": "Let $m\\ge2$, $q\\ge1$, $K_m\\ge1$, and $B\\ge1$ be integers.  Suppose that, for every\nreal $w\\in[1,q]$, the integer $q$ has a divisor in $[w/m,w]$.  Suppose\nalso that each integer $s\\in[1,m^4]$ can be written as a sum of at most\n$B$ positive rational numbers $e/t$, where $e\\mid K_m$ and $t$ is a\npositive integer.  Then, for every integer $X$ with $1\\le X\\le q$, the\nrational number $X/(qK_m)$ is a sum of at most\n\\[\n  B\\left(\\frac{\\log X}{2\\log m}+2\\right)\n\\]\npositive unit fractions, with repetitions allowed.",
    "section": "Grouping the remaining numerator",
    "proof": "Write $X_0=X$, and repeatedly remove groups from the remaining integer.\nIf the current integer $X_i$ exceeds $m^4$, then\n$w=X_i/m^2$ lies in $[1,q]$.  Choose $d_i\\mid q$ with\n\\[\n  \\frac{X_i}{m^3}\\le d_i\\le\\frac{X_i}{m^2},\n  \\qquad s_i=\\left\\lfloor\\frac{X_i}{d_i}\\right\\rfloor.\n\\]\nThus $m^2\\le s_i\\le m^3\\le m^4$, and the integer remaining after the\ngroup $d_i s_i$ is removed satisfies\n\\[\n  0\\le X_{i+1}=X_i-d_i s_i<d_i\\le\\frac{X_i}{m^2}.\n\\]\nIf instead $0<X_i\\le m^4$, remove the final group with $d_i=1$ and\n$s_i=X_i$.  Stop immediately if the remaining integer is zero.\n\nEvery grouping step with $X_i>m^4$ decreases the remainder by a factor\nstrictly greater than $m^2$.  There are therefore at most\n$\\lceil\\log X/(2\\log m)\\rceil$ such steps, followed by at most one\nfinal group.  The number $G$ of groups satisfies\n\\[\n  G\\le\\left\\lceil\\frac{\\log X}{2\\log m}\\right\\rceil+1\n    \\le\\frac{\\log X}{2\\log m}+2.\n\\]\nThis bound also covers $X=1$ and a zero remainder before the final group.\n\nFor each group, use the assumed representation\n$s_i=\\sum_{a=1}^{b_i}e_{i,a}/t_{i,a}$, with $b_i\\le B$.\nDividing $X=\\sum_i d_i s_i$ by $qK_m$ gives\n\\[\n  \\frac{X}{qK_m}\n    =\\sum_i\\sum_{a=1}^{b_i}\n       \\frac{1}{(q/d_i)(K_m/e_{i,a})t_{i,a}}.\n\\]\nEach displayed denominator is a positive integer.  This uses the two\ndivisibilities $d_i\\mid q$ and $e_{i,a}\\mid K_m$; no divisibility between\n$t_{i,a}$ and $e_{i,a}$, or coprimality assumption, is needed.  The total\nnumber of terms is at most $BG$.",
    "deps": []
   }
  ],
  "flow": [
   {
    "type": "prose",
    "tex": "We prove a conjecture of Erd\\H{o}s: for every sufficiently large integer\n$b$, every rational number $a/b$ with $1\\le a<b$ is a sum of\n$O(\\log\\log b)$ distinct positive unit fractions, with an absolute implied\nconstant. This order is best possible when the numerator varies. We also\nshow that both the number of expansions of $1$ with exactly $k$ distinct\nterms and the least integer at least $2$ that never occurs as a denominator\nin such an expansion grow doubly exponentially in $k$: their double\nlogarithms have order $k$."
   },
   {
    "type": "section",
    "title": "Introduction"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:introduction}\n\nAn Egyptian-fraction expansion of a positive rational number is a finite\nsum of distinct reciprocals of positive integers. For integers\n$1\\le a<b$, let $N(a,b)$ be the least $k$ for which\n\\[\n \\frac ab=\\frac1{n_1}+\\cdots+\\frac1{n_k},\n \\qquad 2\\le n_1<\\cdots<n_k,\\qquad n_i\\in\\Z,\n\\]\nand put $N(b)=\\max_{1\\le a<b}N(a,b)$. The fractions $a/b$ need not be\nin lowest terms, and the denominators $n_i$ have no prescribed upper bound.\nThe greedy algorithm shows that such expansions exist. We determine\nthe order of their maximum minimum length. Individual numerators can\nhave much shorter expansions: for example, $N(1,b)=1$ for every $b\\ge2$."
   },
   {
    "type": "result",
    "label": "thm:main"
   },
   {
    "type": "prose",
    "tex": "Nakayama's study of $N(a,b)$ emphasized arithmetic criteria for\nexpansions with few terms \\cite[Section~I]{Nakayama1940}.\nThe uniform problem asks how these minimum lengths behave as the\nnumerator varies over a fixed denominator. In 1950, Erd\\H{o}s\nreported de Bruijn's bound $N(b)\\ll\\log b/\\log\\log\\log b$ and\nimproved it to $N(b)\\ll\\log b/\\log\\log b$\n\\cite[p.~195, Theorem~1]{Erdos1950}.\nHe proposed the double-logarithmic upper bound and proved the matching\nlower order, already for the numerator $b-1$\n\\cite[p.~195, Theorem~2]{Erdos1950}.\nThe question appears again in Erd\\H{o}s and Graham\n\\cite[pp.~37--38]{ErdosGraham1980} and is recorded as Erd\\H{o}s\nProblem~304 \\cite{Bloom304}.\nVose subsequently obtained $N(b)\\ll\\sqrt{\\log b}$ \\cite{Vose1985};\nan explicit modern statement of his uniform bound is given in\n\\cite[Lemma~2.2]{vanDoornTang2026}.\nTheorem~\\ref{thm:main} proves Erd\\H{o}s's conjecture affirmatively.\nThe lower bound is classical; the issue is the uniform upper bound.\n\nA related line of work controls the denominators as well as the\nlength. Tenenbaum and Yokota proved that, for each fixed\n$\\varepsilon>0$ and every sufficiently large $b$, every $a/b\\in(0,1)$\nhas a distinct expansion of length at most\n$(1+\\varepsilon)\\log b/\\log\\log b$, with all denominators at most\n$4b(\\log b)^2\\log\\log b$ \\cite[Theorem, p.~151]{TenenbaumYokota1990}.\nTheir length estimate serves this simultaneous constraint.\nHere we optimize only the order of the length and leave the\ndenominator sizes unrestricted.\n\nThe uniform theorem also determines the double-logarithmic order of\nthe number of representations of one. For each positive integer $k$, put\n\\[\n F(k)=\\#\\left\\{(n_1,\\ldots,n_k):\n  1\\le n_1<\\cdots<n_k,\\quad n_i\\in\\Z,\\quad\n  \\frac1{n_1}+\\cdots+\\frac1{n_k}=1\\right\\}.\n\\]\nHere too there is no upper bound on the denominators."
   },
   {
    "type": "result",
    "label": "cor:counting"
   },
   {
    "type": "prose",
    "tex": "Erd\\H{o}s and Graham asked for good estimates for this counting function\n\\cite[p.~32]{ErdosGraham1980}. Konyagin stated a lower bound with\ndouble logarithm of order $k/\\log k$ \\cite[Theorem~1]{Konyagin2014};\nElsholtz obtained this lower order even when every denominator is\ncongruent to $1$ or $-1$ modulo a fixed squarefree integer $P>1$:\nthe bound holds for every sufficiently large $k$, with $k$ required\nto be odd when $P$ is even, and its constant may depend on $P$\n\\cite[Theorem~1.1]{Elsholtz2016}. Elsholtz and Planitzer proved an upper\nbound with double logarithm $O(k)$, allowing repetitions as well\n\\cite[Corollary~3(2)]{ElsholtzPlanitzer2021}.\nCorollary~\\ref{cor:counting} determines the double-logarithmic order for\nunrestricted distinct denominators.\n\n\nWe can also ask which exact denominators occur among these expansions.\nFor each integer $k\\ge1$, let $D_k$ be the set of integers $m\\ge2$\nfor which there are positive integers $n_1<\\cdots<n_k$ satisfying\n\\[\n 1=\\sum_{i=1}^{k}\\frac1{n_i},\\qquad\n m\\in\\{n_1,\\ldots,n_k\\}.\n\\]\nSet\n\\[\n v(k)=\\min\\bigl(\\{2,3,\\ldots\\}\\setminus D_k\\bigr).\n\\]\nThe elementary denominator bound proved below makes $D_k$ finite, so\nthis minimum exists. Each $m\\in D_k$ may use a different expansion;\nmembership requires the exact denominator $m$ and exactly $k$ distinct\nterms."
   },
   {
    "type": "result",
    "label": "cor:prescribed"
   },
   {
    "type": "prose",
    "tex": "The prescribed-denominator question originates in Erd\\H{o}s and Graham\n\\cite[p.~35]{ErdosGraham1980}; see also Problem~293 \\cite{Bloom293}.\nVan Doorn and Tang prove the lower bound $v(k)\\ge\\exp(c k^2)$ for\nan absolute $c>0$ \\cite[Theorem~1.1]{vanDoornTang2026}. They also show\nthat an exact prescribed denominator can be\nretained while increasing the length of a distinct expansion\n\\cite[Lemma~2.1]{vanDoornTang2026} and anticipate the connection\nbetween uniform short expansions and a double-exponential lower bound\nfor $v(k)$ \\cite[Section~3]{vanDoornTang2026}. We give the required\nmarker-avoidance argument below, thereby deriving the qualitative order\nfrom Theorem~\\ref{thm:main}. A direct construction additionally gives\nthe numerical lower slope in Corollary~\\ref{cor:prescribed}, without\nquantifying the constant $c_2$ in the uniform theorem. The elementary\nupper bound is convenient rather than best known: sharper public upper\nbounds follow from the counting estimates of Elsholtz and Planitzer\n\\cite[Corollary~3(2)]{ElsholtzPlanitzer2021}.\n\nThe two consequences impose different requirements on a construction.\nTo obtain many expansions, it suffices to retain a denominator divisible\nby an integer with many prime factors. To include a prescribed integer\n$m$ in $D_k$, the exact term $1/m$ must survive. The latter requirement\ngoverns both the initial construction and the operation that increases\nits length."
   },
   {
    "type": "section",
    "title": "The proof in outline"
   },
   {
    "type": "prose",
    "tex": "Put $S=\\log b$. After $O(\\log S)$ greedy steps, either the expansion\nis complete or its remainder has the form $A/C$, where $A\\le b$ and\n$C$ lies in a prescribed exponential range in $S$.\nWe then construct an auxiliary integer $M$ with $e^S<M=\\exp(O(S))$\nand a large interval of numerators in which almost every fraction $u/(MC)$ has\nan expansion of length $O(\\log S)$. This dense family suffices for\nthe original numerator: a suitable integer multiple $gAM$ lies well\ninside the interval, and it is the sum of two numerators from that dense family.\nAdding their expansions and dividing by $g$ represents $A/C$.\n\nThe dense family is obtained by descending through $O(\\log S)$\nnumerator ranges. At a range whose upper endpoint exceeds $e^S$, we\nrepresent fractions $u/(MC)$; at lower ranges we represent $u/M$,\nwhich is still less than one. Write $Q=C$ or $Q=1$ for the denominator\nfactor in the current range. A divisor $t$ of $M$ gives the identity\n\\[\n \\frac{u}{MQ}\n =\\frac1{(M/t)z}+\\frac1z\\frac{h}{MQ},\n \\qquad z=\\left\\lceil\\frac{Qt}{u}\\right\\rceil,\n \\qquad h=uz-Qt.\n\\]\nThus one unit fraction reduces the problem to the residue of $-Qt$\nmodulo $u$. When the denominator factor changes from $C$ to $1$, an\nexpansion over $M$ can be transferred back over $MC$ by multiplying\nevery denominator by $C$. We choose $M$ so that, for most numerators\nat each range, many of its divisors give small residues. Deterministic products of\ndistinct primes provide the large-range estimate; independent random\nproducts provide the small-range estimate. At the bottom, the same\nconstruction gives a reduction for every remaining numerator, followed\nby a binary expansion.\n\nThe difficulty is to prevent the exceptional numerators from accumulating\nas these reductions are joined. For fixed $t$ and $h$, a predecessor\n$u$ must divide $Qt+h$. A uniform moment estimate for the number of\nsmall divisors in a shifted interval controls the total number of\npredecessors of a small exceptional set. H\\\"older's inequality then gives\na recurrence for the exceptional proportions that remains small throughout the descent.\nThis combination of residue distribution, uniform divisor moments,\nand the final passage from a dense family to every numerator is the\nmain mechanism of the proof.\n\nThe use of a common auxiliary denominator connects the proof to the\nclassical divisor method. Erd\\H{o}s's construction writes suitable\nintegers as sums of distinct divisors of a factorial and turns those\nsums into unit fractions \\cite[Section~1, pp.~199--203]{Erdos1950}.\nTenenbaum and Yokota obtain a shorter divisor decomposition by choosing\nsuccessive divisors close to the remaining numerator\n\\cite[Lemma~4 and Section~3]{TenenbaumYokota1990}.\nThe present descent instead selects divisors through the residues\nthey produce. Modular control by finite Fourier methods also occurs\nin Croot's work \\cite{Croot1999} and Martin's development of it\n\\cite[Section~4, Lemmas~11--13]{Martin2000}, where subset sums of\nmodular inverses remove large prime-power denominator factors.\nHere prime-product distributions supply many possible reductions,\nand a uniform divisor moment keeps their exceptional sets under\ncontrol across all levels. The moment proof uses the prime-factor\nsplitting method of Erd\\H{o}s \\cite[Section~3]{Erdos1952Divisors};\nthe truncation and shift uniformity needed here are established below.\n\nSection~\\ref{sec:elementary} isolates the dense-family statement and\ndeduces Theorem~\\ref{thm:main} from it. Section~\\ref{sec:divisors}\nproves the divisor estimate, Section~\\ref{sec:residues} constructs\nthe residue distributions, and Section~\\ref{sec:descent} completes\nthe dense-family argument. The construction constants are fixed first,\nthen a moment order large enough for the descent, and finally a\nsufficiently large lower bound on $S$.\nSection~\\ref{sec:counting} then deduces Corollary~\\ref{cor:counting}.\nTheorem~\\ref{thm:main} supplies a short expansion containing a denominator\nwith many prime factors. Splitting that denominator over its divisors\ngives many distinct expansions, and an injective padding operation gives\nevery sufficiently large prescribed length. Divisor-rich denominators\nand divisor-indexed splitting appear in Konyagin and Elsholtz\n\\cite{Konyagin2014,Elsholtz2016}; Konyagin explicitly records the padding\ninjection \\cite[p.~312]{Konyagin2014}.\n\n\nFor the prescribed-denominator consequence, Section~\\ref{sec:prescribed}\nreserves $1/m$ and uses a greedy prefix that skips denominator $m$.\nThe remaining sum is smaller than every reserved reciprocal, so any\npositive expansion of that remainder avoids all reserved denominators.\nApplying Theorem~\\ref{thm:main} gives a short marked expansion, and a\nseparate padding lemma retains the exact marker at every later length.\nFor an explicit length constant, Section~\\ref{sec:prescribed-quantitative}\ninstead constructs the tail from a common supply of rational numbers\nwhose numerators divide one auxiliary integer. Prime-product residue\ncollisions and the quantitative three-prime theorem provide this supply.\nA divisor-density property of the unreduced greedy denominator then\ngroups the remaining numerator into few pieces. The resulting length\ncoefficient $257/\\log2$ gives the lower slope after padding and absorbing\nthe finitely many small markers.\n\nThroughout, $\\N=\\{1,2,\\ldots\\}$, $\\log$ is the natural logarithm, $\\log_2 x=(\\log x)/(\\log 2)$,\n$\\e(x)=\\exp(2\\pi i x)$, and sums over real intervals have integer\nindices. The notations $O(\\cdot)$ and $\\ll$ have absolute implied\nconstants unless a dependence is indicated. Intermediate unit-fraction\nlists may contain repetitions. Lemma~\\ref{lem:distinct} removes them\nwhen the total is below one; Section~\\ref{sec:counting} supplies the\nargument at total one."
   },
   {
    "type": "section",
    "title": "From a dense set to every numerator"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:elementary}\n\nThe main construction produces short expansions for most numerators over a\ncarefully chosen denominator.  We first state exactly what is needed from\nthat construction, and then show why it suffices for every numerator."
   },
   {
    "type": "result",
    "label": "prop:density"
   },
   {
    "type": "prose",
    "tex": "Section~\\ref{sec:descent} proves Proposition~\\ref{prop:density}.\nIts constants and threshold are independent of \\(C\\); the integer \\(M\\)\nand the set \\(G\\) may depend on \\(C\\).\nThe proof of Theorem~\\ref{thm:main} from this proposition is elementary.\nWe record first how to remove repetitions and how to prepare a denominator\nin the required range."
   },
   {
    "type": "result",
    "label": "lem:distinct"
   },
   {
    "type": "proof",
    "proves": "lem:distinct",
    "title": "",
    "tex": "We use Takenouchi's argument \\cite[Sections~II--III, pp.~79--80]{Takenouchi1921}.\nFor fixed \\(x>0\\) and \\(k\\), there are only finitely many nondecreasing\nlists of \\(k\\) denominators with reciprocal sum \\(x\\).\nIndeed, the first denominator is at most \\(k/x\\).\nOnce it is chosen, induction applies to the remaining positive sum and\nthe remaining \\(k-1\\) terms; when no terms remain the sum must be zero.\n\nIf a denominator occurs twice, apply one of the identities\n\\[\n \\frac2{2p}=\\frac1{p+1}+\\frac1{p(p+1)},\n \\qquad\n \\frac2{2p+1}=\\frac1{p+1}+\\frac1{(p+1)(2p+1)}.\n\\]\nBecause the total is less than \\(1\\), a denominator \\(1\\), or a repeated\ndenominator \\(2\\), is impossible.  Thus \\(p\\ge2\\) in the first identity\nand \\(p\\ge1\\) in the second.  Each replacement preserves the number of\nterms and increases the sum of their denominators: the increases are\n\\((p-1)^2\\) and \\(2p^2\\), respectively.  Finiteness of the set of lists\ntherefore forces termination, at which point all denominators are\ndistinct.  Positivity and the unchanged total exclude a denominator\n\\(1\\) throughout."
   },
   {
    "type": "result",
    "label": "lem:greedy"
   },
   {
    "type": "proof",
    "proves": "lem:greedy",
    "title": "",
    "tex": "For a positive remainder \\(A/C<1\\), set\n\\[\n z=\\left\\lceil\\frac CA\\right\\rceil,\\qquad\n A'=Az-C,\\qquad C'=Cz.\n\\]\nSubtracting \\(1/z\\) leaves \\(A'/C'\\).\nThe ceiling inequality gives \\(0\\le A'<A\\), while integrality of \\(A\\)\ngives \\(z\\le C\\) and hence \\(C'\\le C^2\\).\nThus the numerator never exceeds \\(a\\).\nStop at zero or at the first positive remainder whose denominator is at\nleast \\(T\\).  At such a first crossing, the preceding denominator was\nless than \\(T\\), so the new one is less than \\(T^2\\).\n\nTo bound the number of steps, write \\(x=A/C\\).  Since\n\\(\\lceil1/x\\rceil\\le 1+1/x\\),\n\\[\n 0\\le x-\\frac1{\\lceil1/x\\rceil}\n \\le \\frac{x^2}{1+x}.\n\\]\nThe first positive remainder is less than \\(1/2\\), and subsequent\nremainders decrease at least by squaring.  After \\(j\\ge1\\) positive\nsteps their values therefore satisfy\n\\[\n x_j\\le 2^{-2^{j-1}}.\n\\]\nIf the procedure has not yet stopped, its positive integer numerator\ngives \\(x_j\\ge 1/C_j>1/T\\).  This is impossible when\n\\(2^{j-1}\\log2\\ge\\log T\\), proving the stated bound.\nEvery current positive value is less than \\(1\\), so \\(z\\ge2\\)."
   },
   {
    "type": "proof",
    "proves": "thm:main",
    "title": "Proof of Theorem~\\ref{thm:main}, assuming\nProposition~\\ref{prop:density}",
    "tex": "For the upper bound, fix \\(1\\le a<b\\), put \\(S=\\log b\\), and assume that\n\\(S\\) is sufficiently large.  Apply Lemma~\\ref{lem:greedy} with\n\\(T=e^{D_CS}\\).  This uses \\(O(\\log S)\\) terms.  If the procedure\nterminates, Lemma~\\ref{lem:distinct} gives the required upper bound.\nOtherwise its\nremainder \\(A/C\\) satisfies\n\\[\n 1\\le A<b,\\qquad e^{D_CS}\\le C<e^{2D_CS}.\n\\]\nChoose \\(M,G,X\\) from Proposition~\\ref{prop:density} for this \\(S,C\\).\nSince \\(D_X=D_M+2\\),\n\\[\n AM<e^{(D_M+1)S}<X.\n\\]\nLet \\(g=\\lfloor X/(AM)\\rfloor\\) and \\(n=gAM\\).  These are positive\nintegers, and the inequality \\(\\lfloor t\\rfloor\\ge t/2\\) for \\(t\\ge1\\)\ngives\n\\[\n \\frac X2\\le n\\le X.\n\\]\nWrite \\(H=\\{1,\\ldots,\\lfloor X\\rfloor\\}\\setminus G\\).\nAmong the \\(n-1\\) positive splits \\(n=u+(n-u)\\), at most \\(2|H|\\le X/4\\)\nhave an entry outside \\(G\\).  Since \\(n-1\\ge X/2-1>X/4\\) for large \\(S\\),\nsome split has both entries in \\(G\\).\nTheir expansions together express\n\\[\n \\frac{n}{MC}=\\frac{gA}{C}\n\\]\nusing at most \\(2L\\log S\\) unit fractions.  Multiplying every denominator\nby the integer \\(g\\) gives an expansion of \\(A/C\\) of the same length.\nAdjoin the greedy prefix and apply Lemma~\\ref{lem:distinct} to the total\n\\(a/b<1\\).  The resulting distinct expansion has \\(O(\\log S)\\) terms,\nuniformly in \\(a\\).  No reduction of \\(a/b\\), or restriction on the final\ndenominator sizes, has been used.\n\nFor the lower bound, consider an expansion of \\((b-1)/b\\) with \\(k\\)\nterms and append \\(1/b\\).  Sort the resulting \\(s=k+1\\) denominators as\n\\(d_1\\le\\cdots\\le d_s\\); repetitions are harmless here.\nPut \\(L_0=1\\) and \\(L_j=d_1\\cdots d_j\\).\nFor each \\(1\\le j\\le s\\), the amount remaining after the first \\(j-1\\)\nterms is positive and has denominator dividing \\(L_{j-1}\\).\nConsequently\n\\[\n \\frac1{L_{j-1}}\n \\le 1-\\sum_{i<j}\\frac1{d_i}\n =\\sum_{i=j}^s\\frac1{d_i}\n \\le\\frac{s}{d_j}.\n\\]\nIt follows that \\(d_j\\le sL_{j-1}\\) and \\(L_j\\le sL_{j-1}^2\\).\nInduction gives \\(L_j\\le s^{2^j-1}\\) and \\(d_j\\le s^{2^{j-1}}\\).\nAs \\(b\\) is one of these denominators,\n\\[\n b\\le d_s\\le s^{2^{s-1}}=(k+1)^{2^k}.\n\\]\nHence\n\\(\\log\\log b\\le k\\log2+\\log\\log(k+1)\\le(1+\\log2)k\\).\nThe numerator \\(b-1\\) therefore supplies the required lower bound for\n\\(N(b)\\)."
   },
   {
    "type": "section",
    "title": "A uniform divisor moment"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:divisors}\n\nWe need a divisor estimate for intervals that may be much shorter than\ntheir distance from zero. Only divisors up to a specified size are counted:\nfor \\(X\\ge1\\) and \\(n\\in\\N\\), put\n\\[\n d_X(n)=\\#\\{a\\in\\N:a\\le X,\\ a\\mid n\\}.\n\\]\nIn the descent, this count bounds how many larger numerators can\nlead to the same smaller residue. We need to control the combined\ncontribution of residues in a small exceptional set. H\\\"older's inequality\nturns an \\(r\\)th-moment bound into a bound proportional to\n\\(\\delta^{1-1/r}\\) for a set occupying a proportion \\(\\delta\\) of\nan interval. Choosing \\(r\\) large limits the cumulative weakening of\nthis bound through the \\(O(\\log S)\\) levels of the descent.\nThe moment exponent in the following lemma can be arbitrarily large,\nprovided it is fixed before the parameter \\(S\\) tends to infinity.\nThe proof follows the prime-factor splitting method of\nErd\\H{o}s \\cite[Section~3]{Erdos1952Divisors}; the uniform bound\nfor this truncated count is proved in full here."
   },
   {
    "type": "result",
    "label": "lem:divisor"
   },
   {
    "type": "proof",
    "proves": "lem:divisor",
    "title": "",
    "tex": "Write \\(v=\\log X\\), \\(E=D+1\\), and\n\\[\n B=1+\\log(ES/v).\n\\]\nEvery integer \\(n=N+h\\) under consideration satisfies\n\\(1\\le n\\le2e^{DS}\\le e^{ES}\\) for sufficiently large \\(S\\).\nMoreover,\n\\begin{equation}\\label{eq:divisor-B}\n 1<B\\le1+\\log(2E\\log S)=O_D(\\log\\log S).\n\\end{equation}\nAll estimates below are uniform in \\(X,Y,N\\) in the stated ranges.\n\n\\smallskip\n\\noindent\\emph{Two elementary estimates.}\nFirst, consider divisors of \\(n\\) formed from primes at least \\(z\\ge2\\).\nList these prime factors with multiplicity, giving distinct labels to\nrepeated occurrences. There are at most\n\\(L=\\lfloor ES/\\log z\\rfloor\\) occurrences, and a divisor at most \\(X\\)\nuses at most \\(v/\\log z\\) of them. Counting subsets can only overcount\ndivisors. With \\(q=v/(ES)\\in(0,1)\\), their number is therefore at most\n\\begin{equation}\\label{eq:divisor-large-primes}\n \\sum_{0\\le j\\le v/\\log z}\\binom Lj\n \\le q^{-v/\\log z}(1+q)^L\n \\le \\exp\\left(\\frac{Bv}{\\log z}\\right).\n\\end{equation}\nHere the middle inequality follows by inserting the weights \\(q^j\\);\nthe last uses \\(Lq\\le v/\\log z\\).\n\nSplit the prime factors at \\(S^{1/2}\\).\nFor each smaller prime there are at most \\(1+ES/\\log2\\) possible\nexponents in a divisor of \\(n\\). Applying\n\\eqref{eq:divisor-large-primes} to the remaining primes gives\n\\[\n \\log d_X(n)\n \\le S^{1/2}\\log(1+ES/\\log2)+\\frac{2Bv}{\\log S}.\n\\]\nSince \\(v\\ge S/(2\\log S)\\), there is a function\n\\(\\varepsilon_D(S)\\to0\\), independent of \\(X,Y,N,h\\), such that\n\\begin{equation}\\label{eq:divisor-pointwise}\n d_X(n)^r\\le \\exp\\bigl(r\\varepsilon_D(S)v\\bigr),\n \\qquad\n \\varepsilon_D(S)\\ll_D\n \\frac{(\\log S)^2}{S^{1/2}}+\\frac{\\log\\log S}{\\log S}.\n\\end{equation}\n\nSecond, write \\(\\tau(d)\\) for the number of positive divisors of \\(d\\).\nFor fixed \\(r\\) and \\(3/4\\le\\sigma\\le1\\),\n\\begin{equation}\\label{eq:divisor-local-factor}\n \\log\\left(1+\\sum_{j\\ge1}(j+1)^r p^{-j\\sigma}\\right)\n \\le C_r p^{-\\sigma}\n\\end{equation}\nfor every prime \\(p\\).\nIndeed, the power series\n\\(\\sum_{j\\ge1}(j+1)^r x^{j-1}\\) is bounded on\n\\(0\\le x\\le2^{-3/4}<1\\).\nWe will also use the elementary estimate\n\\begin{equation}\\label{eq:prime-reciprocals}\n \\sum_{p\\le T}\\frac1p\\le e\\log(1+\\log T)\\qquad(T\\ge2).\n\\end{equation}\nTo prove it, set \\(s=1+1/\\log T\\) and\n\\(\\zeta(s)=\\sum_{a\\ge1}a^{-s}\\).\nEuler's absolutely convergent product and the integral bound\n\\(\\zeta(s)\\le1+1/(s-1)\\) give\n\\[\n \\sum_{p\\le T}\\frac1p\n \\le e\\sum_p p^{-s}\n \\le e\\log\\zeta(s)\n \\le e\\log(1+\\log T).\n\\]\nIn particular, multiplicativity and\n\\eqref{eq:divisor-local-factor} imply\n\\begin{equation}\\label{eq:divisor-harmonic}\n \\sum_{d\\le T}\\frac{\\tau(d)^r}{d}\n \\le \\prod_{p\\le T}\n       \\left(1+\\sum_{j\\ge1}(j+1)^r p^{-j}\\right)\n \\ll_r(\\log(2T))^{C_r}.\n\\end{equation}\n\n\\smallskip\n\\noindent\\emph{A prefix of the prime factorization.}\nFor \\(n>\\sqrt Y\\), order its prime factors with multiplicity and let\n\\(d\\) be the longest initial product at most \\(\\sqrt Y\\), allowing\n\\(d=1\\). Let \\(p\\) be the next prime. Then\n\\[\n d\\le\\sqrt Y<dp,\n\\]\nall prime factors of \\(d\\) are at most \\(p\\), and all those of \\(n/d\\)\nare at least \\(p\\).\nThe inequality\n\\[\n d_X(n)\\le \\tau(d)d_X(n/d)\n\\]\ndoes not require \\(d\\) and \\(n/d\\) to be coprime:\na divisor \\(a\\le X\\) of \\(n\\) determines\n\\[\n b=\\gcd(a,d),\\qquad c=a/b.\n\\]\nThen \\(b\\mid d\\), \\(c\\mid n/d\\), \\(c\\le X\\), and the pair \\((b,c)\\)\ndetermines \\(a\\).\nThus \\eqref{eq:divisor-large-primes} gives\n\\begin{equation}\\label{eq:divisor-prefix}\n d_X(n)^r\\le\\tau(d)^r\n          \\exp\\left(\\frac{rBv}{\\log p}\\right).\n\\end{equation}\nFor any fixed \\(d\\le\\sqrt Y\\), the number of its multiples in\n\\((N,N+Y]\\) is at most\n\\begin{equation}\\label{eq:divisor-multiples}\n \\frac Yd+1\\le\\frac{2Y}{d}.\n\\end{equation}\nWe now sum according to the size of the next prime \\(p\\). If \\(p\\)\nis large, the remaining factor \\(n/d\\) has few small divisors. If\n\\(p\\) is smaller, the condition \\(dp>\\sqrt Y\\) forces \\(d\\) to\nbe a large product of small primes. The total reciprocal weight of\nsuch prefixes is small, so \\eqref{eq:divisor-multiples} limits their\noccurrence in every shifted interval.\n\nIf \\(\\log p\\ge v^{15/16}\\), the exponential factor in\n\\eqref{eq:divisor-prefix} is at most \\(e^{rBv^{1/16}}\\).\nFor \\(n\\le\\sqrt Y\\), instead take \\(d=n\\) and use\n\\(d_X(n)\\le\\tau(d)\\). By \\eqref{eq:divisor-multiples} and\n\\eqref{eq:divisor-harmonic}, these two cases together contribute at most\n\\begin{align}\n 2Ye^{rBv^{1/16}}\\sum_{d\\le\\sqrt Y}\\frac{\\tau(d)^r}{d}\n &\\le Y\\exp\\!\\left(\n      O_{D,r}(S^{1/16}\\log\\log S+\\log S)\\right).\n \\label{eq:divisor-large-contribution}\n\\end{align}\n\nFor the remaining integers, \\(\\log p<v^{15/16}\\), so\n\\begin{equation}\\label{eq:divisor-prefix-lower}\n \\log d>\\tfrac12\\log Y-\\log p\n \\ge v/4-v^{15/16}>v/5\n\\end{equation}\nonce \\(S\\) is sufficiently large.\nThis large prefix makes integers with small next prime rare.\nWe estimate the ensuing smooth-prefix sums by Rankin's exponential\nweighting method; see \\cite[p.~414, (1.3)]{HildebrandTenenbaum1993}.\n\nIf \\(p<S^4\\), every prime factor of \\(d\\) is smaller than \\(S^4\\).\nMultiplying each summand by\n\\((d/e^{v/5})^{1/10}>1\\) gives\n\\[\n \\sum_{\\substack{d>e^{v/5}\\\\\n             \\ell\\mid d,\\ \\ell\\ {\\rm prime}\\Rightarrow\\ell<S^4}}\n       \\frac1d\n \\le e^{-v/50}\n       \\prod_{\\substack{\\ell<S^4\\\\\\ell\\ {\\rm prime}}}\n                      (1-\\ell^{-9/10})^{-1}.\n\\]\nThe logarithm of this product is \\(O(S^{2/5})\\), since\n\\[\n \\sum_{\\substack{\\ell<S^4\\\\\\ell\\ {\\rm prime}}}\\ell^{-9/10}\n \\le\\sum_{2\\le a<S^4}a^{-9/10}=O(S^{2/5}).\n\\]\nCounting multiples by \\eqref{eq:divisor-multiples} and bounding the\nentire summand by \\eqref{eq:divisor-pointwise}, we obtain a contribution\nat most\n\\begin{equation}\\label{eq:divisor-small-contribution}\n 2Y\\exp\\left(-v/50+O(S^{2/5})+\n                         r\\varepsilon_D(S)v\\right)\n \\le 2Ye^{-v/100}.\n\\end{equation}\nHere \\(S^{2/5}=o(v)\\), uniformly in the allowed range.\n\n\\smallskip\n\\noindent\\emph{The intermediate primes.}\nIt remains to treat\n\\(4\\log S\\le\\log p<v^{15/16}\\).\nPartition this range into intervals \\([t,2t)\\), where\n\\(t=2^j4\\log S\\le v^{15/16}\\).\nThere are \\(O_D(\\log S)\\) such intervals; the last may extend beyond\nthe upper endpoint. For one interval put\n\\[\n Q=\\frac vt,\\qquad \\lambda=\\frac{\\log Q}{10t}.\n\\]\nThen \\(Q\\ge v^{1/16}\\), and\n\\[\n 0<\\lambda\n \\le\\frac{\\log(DS/(4\\log S))}{40\\log S}<\\frac14\n\\]\nfor sufficiently large \\(S\\).\nEquations \\eqref{eq:divisor-prefix},\n\\eqref{eq:divisor-multiples}, and \\eqref{eq:divisor-prefix-lower}\nbound the contribution of this interval by\n\\[\n 2Ye^{rBQ}\n \\sum_{\\substack{d>e^{v/5}\\\\\n           \\ell\\mid d,\\ \\ell\\ {\\rm prime}\\Rightarrow\\ell\\le e^{2t}}}\n       \\frac{\\tau(d)^r}{d}.\n\\]\nThe last sum is at most\n\\[\n e^{-\\lambda v/5}\n \\prod_{\\substack{\\ell\\le e^{2t}\\\\\\ell\\ {\\rm prime}}}\n \\left(1+\\sum_{j\\ge1}(j+1)^r\\ell^{-j(1-\\lambda)}\\right).\n\\]\nBy \\eqref{eq:divisor-local-factor} and\n\\eqref{eq:prime-reciprocals}, the logarithm of this product is\nbounded by\n\\[\n C_r\\sum_{\\substack{\\ell\\le e^{2t}\\\\\\ell\\ {\\rm prime}}}\n                   \\ell^{-1+\\lambda}\n \\ll_r e^{2t\\lambda}\\log(2t)\n =Q^{1/5}O_r(\\log(2t)).\n\\]\nThe contribution of the interval is consequently at most\n\\begin{equation}\\label{eq:divisor-band}\n 2Y\\exp\\left(rBQ-\\frac{Q\\log Q}{50}\n                         +O_r(Q^{1/5}\\log(2t))\\right).\n\\end{equation}\nBoth positive terms in this exponent are uniformly negligible compared\nwith \\(Q\\log Q\\). Indeed, \\eqref{eq:divisor-B} and\n\\(Q\\ge v^{1/16}\\) give\n\\[\n \\frac{rB}{\\log Q}\n \\ll_{D,r}\\frac{\\log\\log S}{\\log S}\\longrightarrow0,\n \\qquad\n \\frac{Q^{1/5}\\log(2t)}{Q\\log Q}\n \\ll v^{-1/20}\\longrightarrow0.\n\\]\nThus \\eqref{eq:divisor-band} is at most\n\\(2Y\\exp(-Q\\log Q/100)\\le2Y\\), after increasing \\(S_0(D,r)\\).\nSumming the intervals costs \\(O_D(Y\\log S)\\).\n\nCombining this bound with \\eqref{eq:divisor-large-contribution}\nand \\eqref{eq:divisor-small-contribution} gives\n\\[\n \\sum_{1\\le h\\le Y}d_X(N+h)^r\n \\le Y\\exp\\!\\left(\n         O_{D,r}(S^{1/16}\\log\\log S+\\log S)\\right)\n       +2Ye^{-v/100}+O_D(Y\\log S).\n\\]\nThe logarithmic loss is \\(o(S^{1/4})\\), proving\n\\eqref{eq:divisor-moment}. Every enlargement of the threshold depended\nonly on the fixed \\(D,r\\); this completes the required uniformity check."
   },
   {
    "type": "section",
    "title": "Divisors with small residues"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:residues}\n\nWe now construct the auxiliary denominator.\nIts useful divisors make most residues small at each of a sequence of\nscales.  At the smallest scales, several independent lists of divisors\nensure that every numerator has a suitable choice.\n\nThe underlying identity is elementary.  For positive integers \\(M,Q,u,t\\)\nwith \\(t\\mid M\\), set\n\\[\n z=\\left\\lceil\\frac{Qt}{u}\\right\\rceil,\n \\qquad h=uz-Qt.\n\\]\nThen \\(z\\ge1\\), \\(0\\le h<u\\), and\n\\begin{equation}\\label{eq:residue-step}\n \\frac{u}{MQ}=\\frac{1}{(M/t)z}+\\frac{h}{MQz}.\n\\end{equation}\nThus a small least nonnegative residue of \\(-Qt\\) modulo \\(u\\)\nleaves a small numerator.  A zero residue finishes the expansion.\n\nWe use this identity with two denominator factors. At high levels we\ntake \\(Q=C\\): the large factor \\(C\\) supplies cancellation in\nreciprocal phases as \\(u\\) varies. At lower levels we take \\(Q=1\\)\nand construct expansions of \\(u/M\\). Dividing such an expansion by\n\\(C\\) gives one of \\(u/(MC)\\), so the two regimes can be joined.\nThe switch below is made when the entire level cutoff is at most\n\\(e^S\\); then \\(u/M<1\\) because our construction ensures \\(M>e^S\\)."
   },
   {
    "type": "section",
    "title": "The denominator and the residue statement"
   },
   {
    "type": "prose",
    "tex": "Fix the absolute constants\n\\begin{equation}\\label{eq:residue-constants}\n \\begin{gathered}\n K=100,\\quad R=1000,\\quad D_0=100000,\\quad \\eta=10^{-4},\\\\\n D_M=(2R+2)(K+2),\\quad D_X=D_M+2,\\quad D_C=4D_X.\n \\end{gathered}\n\\end{equation}\nHere \\(K\\) sets the prime scale, \\(R\\) is the number of independent\nblocks, \\(D_0\\) sets the binary cutoff, and \\(\\eta\\) sets the rate of\ndescent. These numerical choices leave room in the estimates below.\nLet \\(S\\) tend to infinity, put \\(m=\\lfloor S/\\log S\\rfloor\\), and fix\nan integer\n\\begin{equation}\\label{eq:C-range}\n e^{D_CS}\\le C\\le e^{2D_CS}.\n\\end{equation}\nDefine\n\\begin{equation}\\label{eq:levels}\n \\begin{gathered}\n \\rho=e^{-\\eta m},\\qquad X_j=e^{D_XS}\\rho^j,\\\\\n d=\\min\\{j\\ge0:X_j\\le e^m\\},\\qquad\n C_j=\n \\begin{cases}\n C,&X_j>e^S,\\\\\n 1,&X_j\\le e^S.\n \\end{cases}\n \\end{gathered}\n\\end{equation}\nThese cutoffs need not be integers.  Every set or sum indexed by a\ncutoff below consists of integers in the indicated range.\nFor \\(0\\le j\\le d\\), write\n\\begin{equation}\\label{eq:least-residue}\n h_{j,t}(u)=u\\left\\lceil\\frac{C_jt}{u}\\right\\rceil-C_jt.\n\\end{equation}\nIn particular, \\(h_{j,t}(u)\\) is the least nonnegative residue of\n\\(-C_jt\\) modulo \\(u\\)."
   },
   {
    "type": "result",
    "label": "lem:residues"
   },
   {
    "type": "prose",
    "tex": "Here is the construction used to prove the lemma.\nLet \\(\\mathcal P\\) be the set of primes in \\([S^K,2S^K]\\), and put\n\\(P=|\\mathcal P|\\).  The prime number theorem gives\n\\(P\\ge S^{K-1}\\) for sufficiently large \\(S\\); see, for example,\n\\cite[p.~305, (1.1)]{Selberg1949}.\nChoose distinct \\(p_1,\\ldots,p_m\\in\\mathcal P\\),\nand let\n\\[\n T_0=\\left(\\prod_{j=1}^m p_j^{I_j}\\right)_{I\\in\\{0,1\\}^m}.\n\\]\nIts entries are distinct.  For each \\(1\\le i\\le R\\), choose\n\\(2m\\) independent uniform samples\n\\(p_{i,j,\\epsilon}\\in\\mathcal P\\), where\n\\(1\\le j\\le m\\) and \\(\\epsilon\\in\\{0,1\\}\\); all samples in different\nblocks are also independent.  Set\n\\[\n \\begin{gathered}\n T_i=\\left(\\prod_{j=1}^m p_{i,j,I_j}\\right)_{I\\in\\{0,1\\}^m},\\\\\n M=2^a\\prod_{j=1}^m p_j\n       \\prod_{i=1}^R\\prod_{j=1}^m p_{i,j,0}p_{i,j,1},\n \\end{gathered}\n\\]\nwhere \\(2^a\\) is the least power of \\(2\\) at least \\(S^{D_0}\\).\nSampling is with replacement.  Even when primes repeat, each list\nentry uses a submultiset of the factors of \\(M\\), so it divides \\(M\\).\n\nThe size bounds hold for every realization:\n\\[\n \\log M\\ge Km\\log S\\ge K(S-\\log S)>S,\n\\]\nwhereas\n\\[\n \\log M\n \\le D_0\\log S+\\log2+(2R+1)m(K\\log S+\\log2)\n \\le D_MS\n\\]\neventually.  The last inequality follows because\n\\((2R+1)K<D_M\\).  Every entry of every list also satisfies\n\\begin{equation}\\label{eq:product-size}\n 1\\le t\\le e^{(K+1)S}.\n\\end{equation}\n\nWe record the endpoint facts used below and in the descent.\nFor sufficiently large \\(S\\),\n\\begin{equation}\\label{eq:level-endpoints}\n \\begin{gathered}\n \\frac{S}{2\\log S}\\le m\\le\\frac S{\\log S},\\\\\n d=\\left\\lceil\\frac{D_XS-m}{\\eta m}\\right\\rceil\n       \\le K_d\\log S,\\qquad K_d=\\frac{3D_X}{\\eta},\\\\\n e^{(1-\\eta)m}<X_d\\le e^m,\\qquad\n X_{j+1}\\ge\\sqrt{X_j}\\quad(0\\le j<d).\n \\end{gathered}\n\\end{equation}\nIndeed, for \\(j<d\\), \\(\\log X_j>m\\), so\n\\(\\log X_{j+1}=\\log X_j-\\eta m\\ge(1-\\eta)\\log X_j\\).\nMoreover \\(C_d=1\\), and \\(C_{j+1}\\mid C_j\\).\n\nTable~\\ref{tab:regimes} summarizes the roles of the lists. The upper\ntwo rows are classified by the level cutoff \\(X_j\\), so a high level\nmay include some numerators below \\(e^S\\). The binary step is carried\nout in Section~\\ref{sec:descent}.\n\\begin{table}[ht]\n\\centering\n\\small\n\\begin{tabular}{@{}p{0.40\\linewidth}p{0.28\\linewidth}p{0.23\\linewidth}@{}}\n\\toprule\nRange and denominator factor & Divisors used & Coverage\\\\\n\\midrule\nHigh levels: \\(X_j>e^S\\), \\(C_j=C\\)\n & Deterministic list \\(T_0\\) & Most numerators at each level\\\\[3pt]\nMiddle levels: \\(e^m<X_j\\le e^S\\), \\(C_j=1\\)\n & The same random list \\(T_1\\) & Most numerators at each level\\\\[3pt]\nTerminal range: \\(S^{D_0}<u\\le e^m\\), factor \\(1\\)\n & Some list \\(T_i\\), \\(1\\le i\\le R\\) & Every numerator\\\\[3pt]\nBinary range: \\(1\\le u\\le S^{D_0}\\), factor \\(1\\)\n & Powers of \\(2\\) dividing \\(M\\) & Every numerator\\\\\n\\bottomrule\n\\end{tabular}\n\\caption{The four stages of the numerator descent. The precise residue\nguarantees are stated in Lemma~\\ref{lem:residues}.}\n\\label{tab:regimes}\n\\end{table}\n\nIt remains to select the samples so that the two residue assertions\nhold.  We first turn Fourier bounds into small residues, then prove\nthe needed bound for \\(T_0\\).\nLemma~\\ref{lem:random} treats the random lists, and\nSection~\\ref{subsec:selection} makes the common choice."
   },
   {
    "type": "section",
    "title": "Discrepancy and the deterministic list"
   },
   {
    "type": "prose",
    "tex": "We use the Erd\\H{o}s--Tur\\'an discrepancy inequality\n\\cite[Part~I, Theorem~III]{ErdosTuran1948}.\nFor any nonempty finite indexed list\n\\((x_t)_{t\\in T}\\) of real numbers, any interval \\(J\\subset[0,1)\\),\nand any integer \\(H\\ge1\\), it states that\n\\begin{equation}\\label{eq:erdos-turan}\n \\left|\n \\frac{\\#\\{t:\\{x_t\\}\\in J\\}}{|T|}-|J|\n \\right|\n \\ll \\frac1H+\n \\sum_{\\ell=1}^H\\frac1\\ell\n \\left|\\frac1{|T|}\\sum_{t\\in T}\\e(\\ell x_t)\\right|.\n\\end{equation}\nThe implied constant is absolute, and list multiplicities are retained.\nThe interval convention used below also retains entries at zero.\nFor a finite list, a sufficiently small common positive rotation sends\nmembership in $[0,\\delta)$ to membership in $(0,\\delta]$, including\nall repeated endpoint entries correctly, while preserving every Fourier\nmodulus. Thus the interval convention in the original proof\n\\cite[Part~II, Sections~11--16]{ErdosTuran1948} gives the form needed here."
   },
   {
    "type": "result",
    "label": "lem:discrepancy"
   },
   {
    "type": "proof",
    "proves": "lem:discrepancy",
    "title": "",
    "tex": "Apply \\eqref{eq:erdos-turan} to \\(x_t=-Qt/u\\) and\n\\(J=[0,e^{-\\eta w})\\).  Conjugation leaves the Fourier bounds\nunchanged.  The discrepancy is\n\\[\n O\\bigl(e^{-4\\eta w}+(1+4\\eta w)e^{-3\\eta w}\\bigr)\n =o(e^{-\\eta w}).\n\\]\nIt is therefore at most \\(e^{-\\eta w}/2\\) eventually.\nFinally,\n\\(\\{-Qt/u\\}=(u\\lceil Qt/u\\rceil-Qt)/u\\), including when the\nresidue is zero."
   },
   {
    "type": "prose",
    "tex": "At a level \\(X_j>e^S\\), the large factor \\(C\\) makes the reciprocal\nphases oscillate as \\(u\\) varies.  The following elementary estimate\nwill make that observation uniform."
   },
   {
    "type": "result",
    "label": "lem:reciprocal-phase"
   },
   {
    "type": "proof",
    "proves": "lem:reciprocal-phase",
    "title": "",
    "tex": "We give the derivative argument, including the elementary estimates\nit uses.  This is the classical differencing method of van der Corput;\nsee \\cite[Lemma~2.5]{GrahamKolesnik1991} for differencing and\n\\cite[Theorem~2.2]{GrahamKolesnik1991} for the second-derivative estimate.\n\nFirst, if \\(|a_n|\\le1\\) is supported on an interval of length at most\n\\(U\\), then for \\(2\\le L\\le U\\),\n\\begin{equation}\\label{eq:differencing}\n U^{-2}\\left|\\sum_n a_n\\right|^2\n \\ll L^{-1}\n +\\max_{1\\le h<L}U^{-1}\n        \\left|\\sum_n a_{n+h}\\overline{a_n}\\right|.\n\\end{equation}\nTo see this, express the sum as\n\\(L^{-1}\\sum_n\\sum_{h=1}^L a_{n+h}\\), apply Cauchy--Schwarz in \\(n\\),\nand expand the square.  The outer support has length at most\n\\(U+L+2\\), the diagonal contributes \\(O(LU)\\), and the off-diagonal\nterms give \\eqref{eq:differencing}.\n\nWe also need the second derivative bound\n\\begin{equation}\\label{eq:second-derivative}\n \\left|\\sum_{n\\in J}\\e(g(n))\\right|\n \\ll_A U\\sqrt\\lambda+\\lambda^{-1/2}+1\n \\quad\\text{if}\\quad\n \\lambda\\le |g''(x)|\\le A\\lambda\n\\end{equation}\non an interval \\(J\\) of length at most \\(U\\), for \\(g\\in C^2(J)\\).\nHere is an elementary proof.  For \\(\\lambda\\) above a fixed positive\nconstant the trivial bound suffices.  Otherwise put\n\\(\\beta=\\sqrt\\lambda<1/4\\).\nThe derivative \\(g'\\) is monotone and traverses a range of length\n\\(O_A(U\\lambda)\\).  The portions where \\(g'\\) is within \\(\\beta\\)\nof an integer have \\(O_A(U\\lambda+1)\\) components and total length\n\\(O_A(U\\beta+\\beta/\\lambda)\\), since \\(|g''|\\ge\\lambda\\).\nTheir integer points contribute the same bound after adding the\nnumber of components.\n\nOn each remaining interval \\(g'\\) is monotone and stays between\n\\(q+\\beta\\) and \\(q+1-\\beta\\) for some integer \\(q\\).\nThe corresponding sum is \\(O(\\beta^{-1})\\).  Indeed the increments\n\\(g(n+1)-g(n)\\) are monotone in that same interval, and summation\nby parts in\n\\[\n \\e(g(n))=\n \\frac{\\e(g(n+1))-\\e(g(n))}\n      {\\e(g(n+1)-g(n))-1}\n\\]\ngives this bound: the reciprocal denominator has supremum and total\nvariation \\(O(\\beta^{-1})\\).  Boundary terms add at most a constant\nper interval.  Summing over the \\(O_A(U\\lambda+1)\\) intervals proves\n\\eqref{eq:second-derivative}.\n\nNow let \\(k\\) be a nearest integer to \\(\\log|Z|/\\log U\\), and set\n\\[\n Q_B=\\lceil B\\rceil+1,\\qquad\n r=k-2,\\qquad L=\\lfloor U^{1/(10k)}\\rfloor.\n\\]\nThere are only finitely many possible orders:\n\\begin{equation}\\label{eq:derivative-order}\n 4\\le k\\le Q_B,\\qquad\n U^{-3/2}\\le |Z|U^{-k-1}\\le U^{-1/2}.\n\\end{equation}\nApply \\eqref{eq:differencing} \\(r\\) times to\n\\(a_n=\\mathbf1_I(n)\\e(f(n))\\), where \\(f(x)=Z/x\\), extending the\nsequence by zero outside \\(I\\).  For positive shifts\n\\(h_1,\\ldots,h_r<L\\), the last phase is\n\\[\n g(x)=\\Delta_{h_1}\\cdots\\Delta_{h_r}f(x),\n \\qquad \\Delta_hf(x)=f(x+h)-f(x).\n\\]\nIts support is the interval on which both \\(x\\) and\n\\(x+h_1+\\cdots+h_r\\) belong to \\(I\\).\nAll intermediate points \\(x+t_1+\\cdots+t_r\\), \\(0\\le t_i\\le h_i\\),\ntherefore remain in \\([U,2U]\\).  Empty supports contribute zero.\n\nThe fundamental theorem of calculus gives\n\\[\n g''(x)=\n \\int_0^{h_1}\\!\\cdots\\!\\int_0^{h_r}\n f^{(k)}(x+t_1+\\cdots+t_r)\\,dt_r\\cdots dt_1.\n\\]\nSince \\(f^{(k)}(x)=(-1)^k k!Zx^{-k-1}\\) has constant sign,\n\\[\n \\frac{k!}{2^{k+1}}\\Lambda\n \\le |g''(x)|\\le k!\\Lambda,\n \\qquad \\Lambda=|Z|U^{-k-1}\\prod_{i=1}^r h_i.\n\\]\nBy \\eqref{eq:derivative-order} and the choice of \\(L\\),\n\\[\n U^{-3/2}\\le\\Lambda\n \\le U^{-1/2+(k-2)/(10k)}\\le U^{-2/5}.\n\\]\nThus \\eqref{eq:second-derivative} bounds each last correlation by\n\\(O_k(U^{4/5}+U^{3/4}+1)=O_k(U^{4/5})\\).\n\nFor clarity, normalize every correlation by \\(U\\), and let \\(\\sigma_j\\)\nbe their maximum after \\(j\\) shifts.  Then\n\\[\n \\sigma_{k-2}\\ll_k U^{-1/5},\n \\qquad \\sigma_j^2\\ll L^{-1}+\\sigma_{j+1}.\n\\]\nInduction, using \\(L\\ge U^{1/(10k)}/2\\) for large \\(U\\), yields\n\\[\n \\sigma_0\\ll_k U^{-1/(10k\\,2^{k-2})}.\n\\]\nTaking the largest implied constant over \\(4\\le k\\le Q_B\\) and,\nfor example, \\(\\delta_B=(10Q_B2^{Q_B})^{-1}\\) proves the lemma.\nIn particular, although \\(k\\) depends on \\(Z,U\\), the final constants\ndepend only on \\(B\\)."
   },
   {
    "type": "result",
    "label": "lem:deterministic"
   },
   {
    "type": "proof",
    "proves": "lem:deterministic",
    "title": "",
    "tex": "Write \\(Y=X_{j+1}=\\rho X\\); then\n\\(Y>e^{S-\\eta m}\\ge e^{0.9S}\\).\nExpanding the square, the diagonal contributes at most \\(2^{-m}\\)\nbecause the \\(2^m\\) subset products are distinct.\nFor an off-diagonal pair put \\(Z=\\ell C(t-t')\\).\nThe difference \\(t-t'\\) is a nonzero integer, and\n\\eqref{eq:C-range} and \\eqref{eq:product-size} give\n\\[\n e^{D_CS}\\le |Z|\\le e^{(2D_C+K+2)S}.\n\\]\nSplit \\((Y,X]\\) into intersections with dyadic intervals \\([U,2U]\\).\nWe may take \\(Y/2\\le U\\le X\\), so for large \\(S\\),\n\\[\n e^{0.8S}\\le U\\le e^{D_XS},\\qquad\n U^4\\le |Z|\\le U^{3D_C}.\n\\]\nLemma~\\ref{lem:reciprocal-phase}, with the fixed value \\(B=3D_C\\),\nbounds the sum over each piece by\n\\(O(Ue^{-0.8\\delta_BS})\\).\nThe sum of the dyadic \\(U\\)'s is \\(O(X)\\).  Thus\n\\[\n \\left|\\sum_{Y<u\\le X}\\e(Z/u)\\right|\\ll Xe^{-cS}\n\\]\nfor an absolute \\(c>0\\).  Averaging over all off-diagonal pairs\ncancels their number against \\(|T_0|^2\\).  The left side of\n\\eqref{eq:deterministic-mean} is consequently at most\n\\[\n 2^{-m}+O(e^{-cS})\\le e^{-0.01m}\n\\]\neventually, since \\(S/m\\to\\infty\\)."
   },
   {
    "type": "prose",
    "tex": "The deterministic estimate controls the high levels for every\npermitted \\(C\\).  We next prove the random estimate for the lower\nlevels and for individual terminal numerators."
   },
   {
    "type": "section",
    "title": "Random products"
   },
   {
    "type": "prose",
    "tex": "\\label{subsec:random}\n\nFor the smaller moduli, two independent products of sampled primes supply\nthe cancellation.  Their integer values are smaller than a suitable\ndivisor of the modulus, so unique factorization controls their residue\ndistributions."
   },
   {
    "type": "result",
    "label": "lem:random"
   },
   {
    "type": "proof",
    "proves": "lem:random",
    "title": "",
    "tex": "Expanding the square gives\n\\[\n 4^{-m}\\sum_{I,J\\in\\{0,1\\}^m}\n       \\E\\,\\e\\bigl(l(t_I-t_J)/u\\bigr).\n\\]\nFor uniformly counted pairs \\(I,J\\), their Hamming distance \\(B\\) has\ndistribution \\(\\operatorname{Bin}(m,1/2)\\).  The exponential Markov\ninequality gives\n\\[\n \\Prob(B<m/4)\n \\le 2^{m/4}\\E\\,2^{-B}\n =2^{m/4}(3/4)^m\n \\le e^{-m/16}.\n\\]\nWe bound these pairs trivially.  Fix any remaining pair, and set\n\\[\n s=\\left\\lfloor\\frac{0.75V}{K\\log S}\\right\\rfloor.\n\\]\nSince \\(V/(K\\log S)\\ge1000\\), and \\(V\\le S\\), we have\n\\begin{equation}\\label{eq:random-product-lengths}\n \\frac{0.74V}{K\\log S}\\le s\\le\\frac{0.75V}{K\\log S},\n \\qquad 2s\\le m/4\n\\end{equation}\nfor sufficiently large \\(S\\).\n\nSelect the first \\(2s\\) differing coordinates in increasing order, and\ndivide them into two sets of \\(s\\) coordinates each.  This choice depends\nonly on \\(I,J\\), not on the sampled primes.  Expose every labelled prime\nsample except the \\(I\\)-selected sample at these \\(2s\\) coordinates.\nThen \\(t_J\\) is fixed and\n\\[\n t_I=U_0U_1U_2,\n\\]\nwhere \\(U_0\\) is fixed by the exposure and \\(U_1,U_2\\) are independent\nproducts of \\(s\\) fresh uniform samples each.  Equal prime values cause\nno difficulty: the \\(I\\)-selected and \\(J\\)-selected variables at a\ndiffering coordinate are distinct independent samples.\n\nWrite\n\\[\n g=\\gcd(lU_0,u),\\qquad q=u/g.\n\\]\nThe coefficient \\(lU_0/u\\) reduces to a fraction with denominator\n\\(q\\). We will show that \\(q\\) is usually large enough for distinct\ninteger values of each fresh product to remain distinct modulo \\(q\\).\nTheir small point probabilities will then give cancellation by\nadditive-character orthogonality.\n\nWe first bound the probability, over the exposed variables, that\n\\(q<u^{0.9}\\).  Since \\(l\\le u^{0.005}\\) and\n\\(\\gcd(lU_0,u)\\le l\\gcd(U_0,u)\\), this event implies\n\\(\\gcd(U_0,u)>u^{0.095}\\).\nCall a sample contributing to \\(U_0\\) a hit if its prime value divides\n\\(u\\), and count hits with their sample multiplicities.  If their number\nis \\(B_0\\), then\n\\[\n \\gcd(U_0,u)\\le \\prod_{\\text{hit samples }p}p\n       \\le S^{(K+1)B_0}.\n\\]\nThus failure requires at least\n\\[\n k_0=\\left\\lceil\\frac{0.08V}{(K+1)\\log S}\\right\\rceil\n\\]\nhits.  At most \\(S\\) primes in the sampling interval divide \\(u\\), so\neach sample has hit probability at most\n\\(S/P\\le S^{-(K-2)}\\).  There are at most \\(m\\le S\\) independent samples\nin \\(U_0\\).  A union bound over sets of \\(k_0\\) positions yields\n\\begin{equation}\\label{eq:random-gcd}\n \\Prob(q<u^{0.9})\n \\le S^{-(K-3)k_0}\n \\le \\exp\\left(-\\frac{0.08(K-3)}{K+1}V\\right)\n \\le u^{-0.05}.\n\\end{equation}\nIf \\(k_0>m-2s\\), the event is empty.  This argument allows prime powers\nin \\(u\\) and repeated sampled primes.\n\nNow fix an exposure with \\(q\\ge u^{0.9}\\).  Every possible value of\neither fresh product is at most\n\\[\n (2S^K)^s\\le S^{(K+1)s}\\le u^{0.7575}<u^{0.8}<q.\n\\]\nBy unique factorization, an integer can arise as the product of at most\n\\(s!\\) ordered \\(s\\)-tuples of primes.  Consequently each atom in the\ndistribution of \\(U_i\\), for \\(i=1,2\\), has probability at most\n\\[\n \\frac{s!}{P^s}\\le S^{-(K-2)s}\n      \\le u^{-0.7252}\\le u^{-0.7}.\n\\]\nReduction modulo \\(q\\) is injective on these integer values.  The\nprobability vectors \\(\\alpha,\\beta\\) of \\(U_1,U_2\\) on\n\\(\\Z/q\\Z\\) therefore satisfy\n\\[\n \\|\\alpha\\|_2,\\|\\beta\\|_2\\le u^{-0.35}.\n\\]\n\nThe reduced fraction \\(lU_0/u=c/q\\) has \\(\\gcd(c,q)=1\\).\nComplete additive-character orthogonality gives\n\\[\n \\sum_{x\\bmod q}\\left|\\sum_{y\\bmod q}\\beta_y\\e(cxy/q)\\right|^2\n       =q\\sum_{y\\bmod q}|\\beta_y|^2.\n\\]\nIndeed the inner sum over \\(x\\) vanishes unless\n\\(q\\mid c(y-y')\\), equivalently \\(y=y'\\) modulo \\(q\\).\nThis identity holds for composite \\(q\\) as well.  Cauchy--Schwarz gives\n\\[\n \\left|\\sum_{x,y\\bmod q}\\alpha_x\\beta_y\\e(cxy/q)\\right|\n \\le \\sqrt q\\,\\|\\alpha\\|_2\\|\\beta\\|_2\n \\le u^{-0.2}.\n\\]\nThe factor \\(\\e(-lt_J/u)\\) is fixed under the exposure.  Averaging this\nconditional estimate and using \\eqref{eq:random-gcd} bounds the\ncontribution of our fixed pair \\(I,J\\) in absolute value by\n\\(u^{-0.05}+u^{-0.2}\\).\n\nCombining this with the Hamming exception, we obtain\n\\[\n \\E\\left|2^{-m}\\sum_I\\e(lt_I/u)\\right|^2\n \\le e^{-m/16}+u^{-0.05}+u^{-0.2}\n \\le 3e^{-0.05w}\n \\le e^{-0.01w}.\n\\]\nThe final inequality is uniform because\n\\(\\min(m,D_0\\log S)\\) tends to infinity with \\(S\\)."
   },
   {
    "type": "section",
    "title": "A simultaneous choice of divisors"
   },
   {
    "type": "prose",
    "tex": "\\label{subsec:selection}\n\nWe now choose all random blocks at once.  One block will suffice at all\nintermediate levels outside small exceptional sets; the independent\nblocks together will cover every terminal integer."
   },
   {
    "type": "proof",
    "proves": "lem:residues",
    "title": "Proof of Lemma~\\ref{lem:residues}",
    "tex": "The construction already gives the required size of \\(M\\), its power of\ntwo, and divisibility of every list entry, for every realization of the\nsamples.  We prove the two residue properties.\n\nPut \\(H=\\lfloor e^{4\\eta m}\\rfloor\\).\nAt a level with \\(X_j>e^S\\), Lemma~\\ref{lem:deterministic} and Markov's\ninequality show that the number of integers\n\\(u\\in(X_{j+1},X_j]\\) for which\n\\[\n \\left|2^{-m}\\sum_{t\\in T_0}\\e(lCt/u)\\right|>e^{-3\\eta m}\n\\]\nat some \\(1\\le l\\le H\\) is at most\n\\[\n X_j H e^{6\\eta m}e^{-0.01m}\n \\le X_j e^{-0.009m}.\n\\]\nConjugation changes the Fourier sign without changing the absolute\nvalue.  Lemma~\\ref{lem:discrepancy}, with scale \\(m\\), therefore gives at\nleast \\(\\rho|T_0|/2\\) entries with\n\\[\n h_{j,t}(u)<\\rho u\\le X_{j+1}\n\\]\noutside that exceptional set.  This holds separately at every such\nlevel and requires no probabilistic selection.\n\nNext suppose \\(j<d\\) and \\(X_j\\le e^S\\).  Then \\(X_j>e^m\\), and every\n\\(u\\in(X_{j+1},X_j]\\) satisfies\n\\[\n (1-\\eta)m<\\log u\\le S,\\qquad\n w=\\min(m,\\log u)\\ge(1-\\eta)m.\n\\]\nFor sufficiently large \\(S\\), these integers satisfy the lower bound\nin Lemma~\\ref{lem:random}.  Moreover\n\\(4\\eta m\\le0.005w\\), so that Lemma applies to all \\(1\\le l\\le H\\).\nIn block \\(1\\), Markov's inequality followed by the frequency union\nbound shows that\n\\begin{align*}\n &\\Prob\\left(\n   \\max_{1\\le l\\le H}\n   \\left|2^{-m}\\sum_{t\\in T_1}\\e(lt/u)\\right|>e^{-3\\eta m}\n \\right)\\\\\n &\\hspace{2em}\\le\n \\exp\\bigl((10\\eta-0.01(1-\\eta))m\\bigr)\n =e^{-0.008999m}\\le e^{-0.005m}.\n\\end{align*}\nLet \\(B_j\\) count integers in this level that fail this Fourier bound.\nLinearity of expectation and another application of Markov give\n\\[\n \\E B_j\\le X_j e^{-0.005m},\n \\qquad\n \\Prob(B_j>X_j e^{-0.001m})\\le e^{-0.004m}.\n\\]\nAs \\(d=O(\\log S)\\), with probability \\(1-o(1)\\) these bounds hold at\nevery level under consideration.  No independence between different\nintegers or levels is needed.  Here \\(C_j=1\\), so\nLemma~\\ref{lem:discrepancy} again gives the required\n\\(\\rho|T_1|/2\\) entries outside the exceptional sets.\n\nFinally fix an integer \\(S^{D_0}<u\\le e^m\\).\nNow \\(w=\\log u\\), and Lemma~\\ref{lem:random}, Markov's inequality and\nthe union over \\(1\\le l\\le\\lfloor u^{4\\eta}\\rfloor\\) give\n\\begin{align*}\n &\n \\Prob\\left(\n  \\max_{1\\le l\\le\\lfloor u^{4\\eta}\\rfloor}\n   \\left|2^{-m}\\sum_{t\\in T_i}\\e(lt/u)\\right|>u^{-3\\eta}\n \\right)\\\\\n &\\hspace{2em}\\le u^{10\\eta-0.01}\n =u^{-0.009}\\le u^{-0.005}\n\\end{align*}\nin each block \\(i\\).  On success, Lemma~\\ref{lem:discrepancy}, with\nscale \\(\\log u\\), supplies a list entry for which\n\\[\n u\\lceil t/u\\rceil-t<u^{1-\\eta}.\n\\]\nThe \\(R=1000\\) blocks are independent for this fixed \\(u\\).\nThe probability that every block fails is therefore at most \\(u^{-5}\\).\nA union bound over all terminal integers shows that\n\\[\n \\Prob(\\text{some terminal integer has no successful block})\n \\le \\sum_{u>S^{D_0}}u^{-5}=o(1).\n\\]\nThus every terminal integer has a suitable divisor, simultaneously,\nwith probability tending to one.\n\nThe sum of this failure probability and the middle-level failure\nprobability is \\(o(1)\\).  Hence a realization satisfying both sets of\nrequirements exists.  Fix it and the resulting \\(M\\).\nSince \\(e^{-0.009m}\\le e^{-0.001m}\\), the same\n\\(c_*=0.001\\) is valid at every level.  This proves both properties for\none common \\(M\\), for the fixed \\(S\\) and \\(C\\)."
   },
   {
    "type": "section",
    "title": "Propagating the exceptional sets"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:descent}\n\nWe now prove Proposition~\\ref{prop:density}.  Lemma~\\ref{lem:residues}\nprovides many choices for making the numerator smaller.  Some of those\nchoices may land at numerators whose expansions are still unknown.  The\ndivisor moment in Lemma~\\ref{lem:divisor} bounds how often this can happen.\nAn individual residue may have many possible predecessors; the moment\nestimate controls their combined contribution over a small exceptional\nset of residues."
   },
   {
    "type": "proof",
    "proves": "prop:density",
    "title": "Proof of Proposition~\\ref{prop:density}",
    "tex": "Use the absolute constants and levels of Lemma~\\ref{lem:residues}.  Before\nchoosing \\(S\\), fix\n\\[\n K_d=\\frac{3D_X}{\\eta},\\qquad\n D_*=2D_C+D_M+1,\n \\qquad r\\in\\N,\\quad r\\ge \\max\\{2,8K_d\\},\n \\qquad \\alpha=1-\\frac1r.\n\\]\nAll subsequent lower bounds on \\(S\\) may depend on these fixed constants.\nIn particular, the moment order \\(r\\) is independent of \\(S\\).\nFor sufficiently large \\(S\\),\n\\begin{equation}\\label{eq:descent-depth}\n m\\ge\\frac{S}{2\\log S},\n \\qquad\n d=\\left\\lceil\\frac{D_XS-m}{\\eta m}\\right\\rceil\n \\le \\frac{2D_X}{\\eta}\\log S+1\n \\le K_d\\log S.\n\\end{equation}\nFix an integer \\(C\\) in the range of Proposition~\\ref{prop:density}, and\nchoose the common integer \\(M\\) supplied by Lemma~\\ref{lem:residues}.\n\nEvery fraction \\(u/(MC_j)\\) with \\(1\\le u\\le X_j\\) is less than one.\nIndeed, if \\(C_j=C\\), then \\(u\\le X_0=e^{D_XS}<MC\\); if \\(C_j=1\\),\nthen \\(u\\le e^S<M\\).  Moreover \\(C_d=1\\), since \\(X_d\\le e^m<e^S\\).\nWe first produce expansions at this last level, and then work backwards.\n\n\\paragraph{The last level.}\nThe power of two dividing \\(M\\) is at least \\(S^{D_0}\\).  For any integer\n\\(1\\le u\\le S^{D_0}\\), write \\(u\\) in binary.  Every power \\(2^k\\) that\noccurs divides \\(M\\), and\n\\[\n \\frac{2^k}{M}=\\frac1{M/2^k}.\n\\]\nThis gives an expansion of \\(u/M\\) with at most\n\\(1+D_0\\log S/\\log 2\\) terms.\n\nIf \\(S^{D_0}<u\\le e^m\\), the last part of Lemma~\\ref{lem:residues}\ngives a divisor \\(t\\mid M\\) for which\n\\[\n z=\\left\\lceil\\frac tu\\right\\rceil,\\qquad\n h=uz-t,\\qquad 0\\le h\\le u^{1-\\eta}.\n\\]\nThe identity\n\\begin{equation}\\label{eq:terminal-descent}\n \\frac uM=\\frac1{(M/t)z}+\\frac1z\\frac hM\n\\end{equation}\nadds one unit fraction.  If \\(h=0\\), the expansion ends; otherwise an\nexpansion of \\(h/M\\) can be divided by the positive integer \\(z\\).\nAs long as the numerator remains above \\(S^{D_0}\\), its logarithm\ndecreases by a factor at most \\(1-\\eta\\) at each step.  It starts at most\n\\(m\\le S\\), so after at most\n\\[\n 1+\\left\\lceil\\frac{\\log S}{-\\log(1-\\eta)}\\right\\rceil\n\\]\nsteps it has either vanished or entered the binary range.  Thus an absolute constant\n\\(B_0\\) bounds the length of every terminal expansion by \\(B_0\\log S\\).\nAll denominators are integers.  Since every term is positive and the\ntotal is less than one, every denominator is at least two.\n\n\\paragraph{Working backwards.}\nSet\n\\[\n G_d=\\{1,\\ldots,\\lfloor X_d\\rfloor\\}.\n\\]\nAt a level \\(j<d\\), write the list prescribed by\nLemma~\\ref{lem:residues} as \\((t_{j,i})_{i\\in I_j}\\):\nit is the deterministic list when \\(X_j>e^S\\), and the first random\nlist otherwise.  Its entries may coincide; their indices are always\nretained.  Having defined \\(G_{j+1}\\), let\n\\begin{equation}\\label{eq:good-backwards}\n \\begin{aligned}\n G_j=G_{j+1}\\ \\cup\\ \\bigl\\{u\\in\\N:\\ &1\\le u\\le X_j,\\\\\n &h_{j,t_{j,i}}(u)\\in G_{j+1}\\cup\\{0\\}\n       \\text{ for some }i\\in I_j\\bigr\\}.\n \\end{aligned}\n\\end{equation}\nThese sets have the asserted expansions.  For membership inherited\ndirectly from \\(G_{j+1}\\), divide the known expansion by the integer\n\\(C_j/C_{j+1}\\).  For membership obtained from a residue, put\n\\[\n z=\\left\\lceil\\frac{C_jt_{j,i}}u\\right\\rceil,\\qquad\n h=uz-C_jt_{j,i}.\n\\]\nThen\n\\begin{equation}\\label{eq:rescaled-descent}\n \\frac{u}{MC_j}\n =\\frac1{(M/t_{j,i})z}\n +\\frac1{zC_j/C_{j+1}}\\frac{h}{MC_{j+1}}.\n\\end{equation}\nBoth \\(M/t_{j,i}\\) and \\(zC_j/C_{j+1}\\) are positive integers.\nThis includes the possible transition from \\(C_j=C\\) to\n\\(C_{j+1}=1\\), where the second scaling factor is \\(zC\\).\nIf \\(h=0\\), the second term is absent.  Otherwise it uses the known\nexpansion for \\(h\\in G_{j+1}\\).  Consequently every member of \\(G_j\\)\nhas an expansion of length at most\n\\begin{equation}\\label{eq:descent-length}\n B_0\\log S+d-j.\n\\end{equation}\n\nIt remains to prove that almost all integers up to \\(X_0\\) belong to\n\\(G_0\\).  We have built expansions whenever a residue reaches a\npreviously treated numerator; the following count controls all other\nnumerators.\n\n\\paragraph{Counting unsuccessful numerators.}\nDefine\n\\[\n H_j=\\{1,\\ldots,\\lfloor X_j\\rfloor\\}\\setminus G_j,\n \\qquad\n \\delta_j=\\frac{|H_j|}{X_j}.\n\\]\nThus \\(0\\le\\delta_j\\le1\\) and \\(\\delta_d=0\\).\nFix \\(j<d\\), and abbreviate \\(X=X_j\\), \\(Y=X_{j+1}=\\rho X\\).\nThe inclusion \\(G_{j+1}\\subseteq G_j\\) gives\n\\[\n |H_j\\cap[1,Y]|\\le |H_{j+1}|.\n\\]\nApart from at most \\(Xe^{-c_*m}\\) exceptional integers, every\n\\(u\\in H_j\\cap(Y,X]\\) has at least \\(\\rho|I_j|/2\\) indices \\(i\\)\nwith \\(h_{j,t_{j,i}}(u)\\le Y\\).\nEach such residue lies in \\(H_{j+1}\\): a residue in\n\\(G_{j+1}\\cup\\{0\\}\\) would place \\(u\\) in \\(G_j\\).\n\nFor a fixed pair \\((h,i)\\), every predecessor \\(u\\) satisfies\n\\[\n u\\mid C_jt_{j,i}+h,\\qquad 1\\le u\\le X.\n\\]\nThere are at most \\(d_X(C_jt_{j,i}+h)\\) such predecessors.\nCounting pairs with their list indices therefore yields\n\\begin{equation}\\label{eq:bad-pair-count}\n |H_j|\\le Xe^{-c_*m}+|H_{j+1}|\n +\\frac{2}{\\rho|I_j|}\n   \\sum_{i\\in I_j}\\ \\sum_{h\\in H_{j+1}}\n       d_X(C_jt_{j,i}+h).\n\\end{equation}\nRepeated values of \\(t_{j,i}\\) create repeated summands on both sides\nof this count and require no adjustment. Figure~\\ref{fig:predecessors}\nshows why the index must be retained in this double count.\n\n\\begin{figure}[ht]\n\\centering\n\\begin{tikzpicture}[x=1cm,y=1cm,\n  every node/.style={font=\\small},\n  point/.style={circle,fill=blue!55!black,inner sep=2pt}]\n\\node[align=center] at (0,1.15) {Nonexceptional bad numerators\\\\$u\\in H_j\\cap(Y,X]$};\n\\node[align=center] at (6.4,1.15) {Indexed targets\\\\$(h,i)\\in H_{j+1}\\times I_j$};\n\\node[point,label=left:$u_1$] (u1) at (0,0.25) {};\n\\node[point,label=left:$u_2$] (u2) at (0,-0.6) {};\n\\node at (0,-1.25) {$\\vdots$};\n\\node[point,label=left:$u_a$] (ua) at (0,-2) {};\n\\node[point,label=right:{$(h_1,i_1)$}] (h1) at (6.4,0.25) {};\n\\node[point,label=right:{$(h_2,i_2)$}] (h2) at (6.4,-0.6) {};\n\\node at (6.4,-1.25) {$\\vdots$};\n\\node[point,label=right:{$(h_b,i_b)$}] (hb) at (6.4,-2) {};\n\\draw[gray] (u1)--(h1) (u1)--(h2) (u2)--(h1) (u2)--(hb) (ua)--(h2) (ua)--(hb);\n\\node[fill=white,align=center] at (3.2,-0.85)\n {$h=h_{j,t_{j,i}}(u)$\\\\$u\\mid C_jt_{j,i}+h$};\n\\node[align=center] at (0,-2.85) {Degree at least\\\\$\\rho|I_j|/2$};\n\\node[align=center] at (6.4,-2.85) {Degree at most\\\\$d_X(C_jt_{j,i}+h)$};\n\\end{tikzpicture}\n\\caption{Schematic of the indexed predecessor count. Summing the right\n degrees and dividing by the left-degree lower bound gives the last term\n in \\eqref{eq:bad-pair-count}. The Fourier-exception term\n $Xe^{-c_*m}$ and the inherited term $|H_{j+1}|$ are counted separately.\n Equal list values retain different indices. The drawn graph does not\n specify numerical degrees.}\n\\label{fig:predecessors}\n\\end{figure}\n\nWe check the hypotheses of Lemma~\\ref{lem:divisor} before applying it.\nSince \\(j<d\\), one has\n\\[\n \\frac{S}{2\\log S}\\le m<\\log X\\le D_XS\\le D_*S.\n\\]\nAlso\n\\[\n Y=Xe^{-\\eta m}\\ge X^{1-\\eta}\\ge\\sqrt X,\n \\qquad Y\\le X.\n\\]\nFinally, each shift \\(N=C_jt_{j,i}\\) is a positive integer and satisfies\n\\[\n N\\le CM\\le e^{(2D_C+D_M)S}<e^{D_*S}.\n\\]\nThus Lemma~\\ref{lem:divisor}, with the fixed parameters \\(D_*,r\\),\napplies uniformly at every level and to every list entry.\nH\\\"older's inequality gives\n\\begin{align}\n \\sum_{h\\in H_{j+1}}d_X(N+h)\n &\\le |H_{j+1}|^\\alpha\n       \\left(\\sum_{1\\le h\\le Y}d_X(N+h)^r\\right)^{1/r}\\notag\\\\\n &\\le Y\\,e^{S^{1/4}/r}\\delta_{j+1}^{\\alpha}.\n \\label{eq:descent-holder}\n\\end{align}\nThis also holds when \\(H_{j+1}\\) is empty.\nSubstitution in \\eqref{eq:bad-pair-count}, followed by division by \\(X\\),\nuses \\(Y=\\rho X\\) to cancel the factor \\(1/\\rho\\):\n\\[\n \\delta_j\\le e^{-c_*m}+\\rho\\delta_{j+1}\n                 +2e^{S^{1/4}/r}\\delta_{j+1}^{\\alpha}.\n\\]\nSince \\(\\delta_{j+1}\\le\\delta_{j+1}^{\\alpha}\\), for sufficiently large\n\\(S\\) we obtain the uniform recurrence\n\\begin{equation}\\label{eq:density-recurrence}\n \\delta_j\\le\\epsilon+A\\delta_{j+1}^{\\alpha},\n \\qquad\n \\epsilon=e^{-c_*m},\\qquad A=e^{2S^{1/4}}.\n\\end{equation}\n\n\\paragraph{Iterating the recurrence.}\nOur fixed choice of \\(r\\) ensures\n\\begin{equation}\\label{eq:alpha-depth}\n \\alpha^d\n \\ge e^{-2d/r}\n \\ge S^{-2K_d/r}\n \\ge S^{-1/4},\n\\end{equation}\nwhere we used \\(-\\log(1-1/r)\\le2/r\\) and\n\\eqref{eq:descent-depth}.\nFor nonnegative \\(a,b\\), the inequality\n\\((a+b)^\\alpha\\le a^\\alpha+b^\\alpha\\) permits us to unroll\n\\eqref{eq:density-recurrence} from \\(\\delta_d=0\\):\n\\begin{equation}\\label{eq:density-unrolled}\n \\delta_0\\le\n \\sum_{i=0}^{d-1}\n A^{(1-\\alpha^i)/(1-\\alpha)}\\epsilon^{\\alpha^i}\n \\le d\\exp\\!\\left(2rS^{1/4}-c_*mS^{-1/4}\\right).\n\\end{equation}\nIndeed, the exponent of \\(A\\) is at most \\(r\\), and\n\\(\\alpha^i\\ge\\alpha^d\\ge S^{-1/4}\\).\nThe right-hand side tends to zero: the negative term has size at least\n\\(c_*S^{3/4}/(2\\log S)\\), which dominates the fixed multiple\n\\(2rS^{1/4}\\) and \\(\\log d\\).\n\nFor all sufficiently large \\(S\\), we therefore have\n\\[\n |H_0|\\le X_0/8.\n\\]\nTake \\(G=G_0\\) and \\(X=X_0\\).  By\n\\eqref{eq:descent-depth} and \\eqref{eq:descent-length}, every \\(u\\in G\\)\nhas an expansion of \\(u/(MC)\\) with at most\n\\((B_0+K_d)\\log S\\) terms.  The size bounds on \\(M\\) come from\nLemma~\\ref{lem:residues}.  Every estimate above is uniform in the\nallowed integer \\(C\\), and all thresholds depend only on fixed absolute\nconstants.  Choosing \\(L=B_0+K_d\\) and then one sufficiently large\nabsolute \\(S_0\\) proves Proposition~\\ref{prop:density}."
   },
   {
    "type": "prose",
    "tex": "The proposition supplies short expansions on one common dense set of\nnumerators.  Section~\\ref{sec:elementary} transfers this density statement\nto every original fraction by writing a suitably scaled numerator as\nthe sum of two members of that set."
   },
   {
    "type": "section",
    "title": "Counting representations of one"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:counting}\n\nWe prove Corollary~\\ref{cor:counting} using the uniform upper bound\nin Theorem~\\ref{thm:main}, together with the prime number theorem and\nelementary identities. Divisor-rich denominators and divisor-indexed\nsplitting are also used by Konyagin and Elsholtz\n\\cite{Konyagin2014,Elsholtz2016}. The first step is\nto obtain a short distinct expansion of one with a denominator having\nmany divisors. Lemma~\\ref{lem:distinct} concerns totals below one; at\ntotal one we need a different repetition-removal argument, preserving\nan odd divisor of a denominator."
   },
   {
    "type": "result",
    "label": "lem:marked-cleanup"
   },
   {
    "type": "proof",
    "proves": "lem:marked-cleanup",
    "title": "",
    "tex": "Whenever a denominator $m$ occurs twice, replace those two terms by\n\\[\n \\frac2m=\\frac1{m/2}\\quad(m\\text{ even}),\n \\qquad\n \\frac2m=\\frac1{(m+1)/2}+\\frac1{m(m+1)/2}\n       \\quad(m\\text{ odd}).\n\\]\nThe sum stays equal to one and the length does not increase.\nThere remains a denominator divisible by $Q$: if no such denominator\nis removed it persists, while if $Q\\mid m$, the even replacement\n$m/2$ is a multiple of $Q$ because $Q$ is odd, and the larger odd\nreplacement is a multiple of $m$.\n\nThis invariant excludes a denominator one, since that would force the\nsingleton list $(1)$. It also excludes a repeated denominator two,\nsince two halves exhaust the sum and neither denominator is divisible\nby $Q$. Thus an odd repeated denominator is at least three. In an odd\nreplacement the smaller new denominator is strictly below $m$ and the\nlarger is strictly above $m$. The sorted denominator tuple therefore\nstrictly decreases lexicographically: all entries below $(m+1)/2$\nare unchanged, and one extra copy of $(m+1)/2$ is inserted.\nAt a fixed length such a descent in positive integer tuples terminates.\nIndeed, the first coordinate can decrease only finitely often, and\nafter it stabilizes the same argument applies successively to the other\ncoordinates. Even replacements strictly reduce length, so only finitely\nmany occur. The procedure consequently terminates with distinct\ndenominators and preserves the required multiple of $Q$."
   },
   {
    "type": "proof",
    "proves": "cor:counting",
    "title": "Proof of Corollary~\\ref{cor:counting}",
    "tex": "\\emph{A short initial expansion.}\nLet $r$ be a sufficiently large integer and let $Q$ be the product of\nthe first $r$ odd primes. The prime number theorem, already used in\nSection~\\ref{sec:residues}, gives\n\\[\n \\log Q=O(r\\log r),\\qquad \\log\\log Q=O(\\log r).\n\\]\nApply Theorem~\\ref{thm:main} to $(Q-1)/Q$ and append $1/Q$.\nLemma~\\ref{lem:marked-cleanup} produces a distinct expansion of one\nwhose denominator set $S$ has size $s=O(\\log r)$ and contains a\nmultiple $n$ of $Q$. Fix this one set $S$ and this one $n$.\nWriting $\\tau(n)$ for the number of positive divisors of $n$, we have\n$\\tau(n)\\ge 2^r$.\n\n\\emph{Branching over divisors.}\nFor every positive proper divisor $d$ of $n$, the identity\n\\begin{equation}\\label{eq:divisor-split}\n \\frac1n=\\frac1{n+d}+\\frac1{n+n^2/d}\n\\end{equation}\ngives two distinct integer denominators, with\n\\[\n n<n+d<2n<n+n^2/d.\n\\]\nFor each unchanged denominator in $S\\setminus\\{n\\}$, at most one\nchoice of $d$ makes it equal to $n+d$, and at most one makes it equal\nto $n+n^2/d$. Thus at least\n\\[\n \\tau(n)-1-2(s-1)\\ge 2^r-2s+1\n\\]\nchoices give distinct-denominator expansions of one, all of the same\nlength $\\ell=s+1$. They give different expansions: from any resulting\ndenominator set, remove the fixed set $S\\setminus\\{n\\}$; the smaller\nof the two remaining denominators is $n+d$, which recovers $d$.\nSorting each set therefore gives a different tuple counted by $F(\\ell)$.\n\n\\emph{Every sufficiently large length.}\nFor any distinct expansion of one with at least two terms, its largest\ndenominator $v$ exceeds one. Replace $v$ by $v+1$ and $v(v+1)$, using\n\\begin{equation}\\label{eq:padding-split}\n \\frac1v=\\frac1{v+1}+\\frac1{v(v+1)}.\n\\end{equation}\nThese are the two largest denominators of the new expansion. The\noperation is injective: delete those two denominators and reinsert\nthe second largest minus one. Iterating a fixed number of times is\ntherefore injective. Our initial set contains a multiple of $Q>1$,\nso it is not the singleton $\\{1\\}$; the operation applies to all\nthe expansions just constructed.\n\nChoose an absolute constant $B\\ge1$ such that $\\ell\\le B\\log r$ for\nall sufficiently large $r$. For each sufficiently large integer $k$,\ntake $r=\\lfloor\\exp(k/(2B))\\rfloor$. Then $\\ell\\le k$, and applying\n\\eqref{eq:padding-split} exactly $k-\\ell$ times to each of our\ncommon-length expansions gives\n\\[\n F(k)\\ge 2^r-2s+1\\ge 2^{r-1}.\n\\]\nSince $r\\ge\\tfrac12\\exp(k/(2B))$ for large $k$, this proves\n$\\log\\log F(k)\\ge k/(2B)+O(1)$, hence the desired lower bound\nfor every sufficiently large integer $k$.\n\n\\emph{The upper bound.}\nFix a tuple counted by $F(k)$ and put $P_0=1$ and\n$P_i=n_1\\cdots n_i$. Before the $i$th term, the positive remainder\n\\[\n R_i=1-\\sum_{j<i}\\frac1{n_j}=\\sum_{j=i}^k\\frac1{n_j}\n\\]\nis a rational number with a positive integer numerator over\n$P_{i-1}$. Ordering therefore gives\n\\[\n \\frac1{P_{i-1}}\\le R_i\\le\\frac{k}{n_i},\n \\qquad n_i\\le kP_{i-1},\\qquad P_i\\le kP_{i-1}^2.\n\\]\nInductively $P_i\\le k^{2^i-1}$ and $n_i\\le k^{2^{i-1}}$.\nCounting all integer choices in this larger box shows that $F(k)$ is\nfinite and\n\\[\n F(k)\\le\\prod_{i=1}^k k^{2^{i-1}}=k^{2^k-1}.\n\\]\nTogether with the lower bound, this yields\n$\\log\\log F(k)\\le k\\log2+\\log\\log k=O(k)$ for sufficiently\nlarge $k$, as required."
   },
   {
    "type": "section",
    "title": "Preserving a prescribed denominator"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:prescribed}\n\nMembership in $D_k$ requires the exact denominator $m$.\nLemma~\\ref{lem:marked-cleanup}, used for counting, preserves only a\nmultiple of a specified odd integer, so it does not ensure that the\nterm $1/m$ survives. We instead reserve $1/m$ and use a greedy\nconstruction that skips denominator $m$. It produces a distinct prefix\nand makes the remaining sum smaller than every reserved reciprocal.\nAny positive expansion of this remainder then avoids both the marker\nand the prefix denominators.\n\nWe use this prefix twice: the uniform theorem first gives a short tail,\nand a direct construction later gives the numerical bound in\nCorollary~\\ref{cor:prescribed}. Keeping the remainder unreduced retains\nthe divisors needed for that direct construction. In either case, a\nseparate padding argument will retain $m$ at every larger length."
   },
   {
    "type": "result",
    "label": "lem:marked-greedy-prefix"
   },
   {
    "type": "proof",
    "proves": "lem:marked-greedy-prefix",
    "title": "",
    "tex": "Start with $(R_0,q_0)=(m-1,m)$ and $x_0=R_0/q_0$.\nWhenever $R_i>0$ and $q_i<T$, set\n\\[\n a=\\left\\lceil\\frac{q_i}{R_i}\\right\\rceil,\n \\qquad\n n_{i+1}=\\begin{cases}a,&a\\ne m,\\\\m+1,&a=m,\\end{cases}\n \\qquad\n (R_{i+1},q_{i+1})=(n_{i+1}R_i-q_i,n_{i+1}q_i).\n\\]\nDo not cancel common factors in this pair.  Thus\n$x_{i+1}=R_{i+1}/q_{i+1}=x_i-1/n_{i+1}$.\n\nFor an ordinary step, writing $n=n_{i+1}=a$ gives\n\\[\n  \\frac1n\\le x_i<\\frac1{n-1},\\qquad\n  0\\le R_{i+1}<R_i,\\qquad\n  0\\le x_{i+1}<\\frac1{n(n-1)}\\le\\frac1n.\n\\]\nMoreover $n<1/x_i+1$, so\n\\[\n x_{i+1}<x_i-\\frac{x_i}{1+x_i}\n          =\\frac{x_i^2}{1+x_i}<x_i^2.\n\\]\nIn the exceptional step $a=m$, we have\n$(m-1)R_i<q_i\\le mR_i$.  Consequently\n\\[\n  0<R_i\\le R_{i+1}<2R_i,\n  \\qquad\n  0<x_{i+1}\n   <\\frac2{(m-1)(m+1)}<\\frac1{m+1},\n\\]\nwhere the last inequality uses $m\\ge4$.\nEvery step therefore leaves a remainder smaller than the term just\nsubtracted.  The next denominator, if there is one, is strictly larger.\nAfter the exceptional step all later denominators exceed $m+1$, so that\nstep can occur at most once.  Before it, $R_i\\le m-1$; after it, the\nnumerator is less than $2(m-1)$ and decreases at every subsequent step.\nThus $0\\le R_i<2m$ throughout.\nSince $R_i\\ge1$ in an active step, $a\\le q_i$ and hence\n$n_{i+1}\\le q_i+1$.\n\nAll selected denominators are at least $2$, so $q_i$ at least doubles\nat each step.  The procedure thus stops after finitely many steps.\nIts first denominator is $2$, and\n$x_1=(m-2)/(2m)<1/2$.\nAll later steps square the upper bound for the remainder, apart from\nat most one step that still decreases it.  Therefore, whenever $i\\ge2$\nand the remainder is positive,\n\\[\n x_i\\le 2^{-2^{i-2}},\\qquad q_i\\ge\\frac1{x_i}\n                 \\ge2^{2^{i-2}}.\n\\]\nIf the final step has index $j\\ge3$, its preceding state is active,\nand hence\n\\[\n 2^{2^{j-3}}\\le q_{j-1}<T.\n\\]\nThis gives the asserted bound for $j$; it is immediate when $j\\le2$.\nThe same preceding state satisfies\n$q_j\\le q_{j-1}(q_{j-1}+1)<T^2$, since $T$ is an integer.\n\nThe displayed decomposition and product formula follow by telescoping.\nIf $R_j=0$, the decomposition is complete.  Otherwise the stopping rule\ngives $q_j\\ge T$ and $R_j<2m$, whence\n$R_j/q_j<2m/T\\le1/m$.\nAt each earlier step the new remainder was smaller than $1/n_i$,\nand subsequent steps only decrease it.  This proves all the claimed\nstrict inequalities."
   },
   {
    "type": "prose",
    "tex": "To see directly how the uniform theorem supplies a prescribed denominator,\ntake $T=2m^2$.  The lemma gives $j=O(\\log\\log m)$ and either a\ncomplete marked expansion or a positive remainder $R/q$ with\n\\[\n  1\\le R<q,\\qquad 2m^2\\le q<4m^4.\n\\]\nFor sufficiently large $m$, the uniform upper bound in\nTheorem~\\ref{thm:main} applies to $R/q$, without requiring it to be\nreduced.  It supplies a distinct expansion with\n$O(\\log\\log q)=O(\\log\\log m)$ terms.  Each reciprocal in this\ntail is at most its total $R/q$, which is strictly below $1/m$ and\nevery $1/n_i$.  The tail therefore avoids the marker and all prefix\ndenominators.  Together these terms give a distinct expansion of $1$\ncontaining $1/m$, of length $O(\\log\\log m)$.\n\nThe same construction also supplies the finite exceptional values of\n$m$, independently of the cutoff $T$.  For any fixed $m\\ge4$, omit the condition\n$q_i<T$ and continue until the remainder is zero.  The nonnegative\ninteger $R_i$ decreases strictly at every ordinary step, and there is\nat most one exceptional step.  The process therefore terminates and\ngives a distinct expansion of $1$ containing $1/m$.  For $m=2,3$, use\n$1=1/2+1/3+1/6$.\n\nThe padding injection in Section~\\ref{sec:counting} may remove the\ndenominator we wish to preserve. The following lemma supplies the\ndifferent property needed here: it increases the length and retains\nany one prescribed denominator."
   },
   {
    "type": "result",
    "label": "lem:exact-marker-padding"
   },
   {
    "type": "proof",
    "proves": "lem:exact-marker-padding",
    "title": "",
    "tex": "This is the padding lemma of van Doorn and Tang\n\\cite[Lemma~2.1]{vanDoornTang2026}; we include a proof.\nEvery denominator is at least two, since a term with denominator one\nwould already exhaust the sum. The identity\n\\[\n \\frac1b=\\frac1{b+1}+\\frac1{b(b+1)}\n\\]\nreplaces one term by two with distinct denominators larger than $b$.\nIf $m\\ne n_r$, apply it to $n_r$; the new denominators exceed all\nthe unchanged ones, and $m$ remains.\n\nSuppose that $m=v=n_r$, and let $s=n_{r-1}$.\nThe same split of $s$ works unless $v=s+1$ or $v=s(s+1)$,\nsince every other unchanged denominator is smaller than $s$.\nIn either exceptional case, if $s=ab$ with integers $a,b\\ge2$, use instead\n\\[\n \\frac1s=\\frac1{s+a}+\\frac1{b(s+a)}.\n\\]\nThe inequalities\n\\[\n s+1<s+a<b(s+a)<s(s+1)\n\\]\nshow that both new denominators avoid either exceptional value of\n$v$ and all the unchanged denominators below $s$.\n\nFinally, neither exceptional case can occur when $s=p$ is prime.\nThere are at least three original terms, so $p>n_{r-2}\\ge2$ and\nin particular $p$ is odd. All denominators other than $p$ and $v$\nare below $p$; write the sum of their reciprocals as $A/B$ with\n$p\\nmid B$. The two exceptional choices give respectively\n\\[\n 1-\\frac AB\n =\\frac1p+\\frac1{p+1}\n =\\frac{2p+1}{p(p+1)},\n \\qquad\\text{or}\\qquad\n 1-\\frac AB\n =\\frac1p+\\frac1{p(p+1)}\n =\\frac{p+2}{p(p+1)}.\n\\]\nAfter clearing denominators and reducing modulo $p$, these equations\ngive respectively $0\\equiv B\\pmod p$ and $0\\equiv2B\\pmod p$,\nboth impossible. Thus in every valid case an unmarked term can be\nreplaced by two distinct terms, preserving $m$ and increasing the\nlength by exactly one."
   },
   {
    "type": "section",
    "title": "A quantitative prescribed-denominator bound"
   },
   {
    "type": "prose",
    "tex": "\\label{sec:prescribed-quantitative}\n\nThe uniform theorem gives the short marked expansion above with an\nunspecified absolute length constant. We now prove the following\nnumerical estimate by constructing the tail directly."
   },
   {
    "type": "result",
    "label": "prop:marked-length"
   },
   {
    "type": "prose",
    "tex": "The construction has two ingredients. A common integer $K_m$ supplies\nshort representations of small integers by positive rationals whose\nnumerators divide $K_m$. The unreduced denominator of the greedy\nremainder has divisors at every multiplicative scale. Combining these\nproperties gives a short expansion of the tail: divisors of the greedy\ndenominator control how many pieces are needed, and the rational\nrepresentations supplied by $K_m$ bound the number of unit fractions\nused for each piece."
   },
   {
    "type": "section",
    "title": "A common supply of rational divisors"
   },
   {
    "type": "prose",
    "tex": "We construct a moderately sized integer whose divisors, after division by\npositive integers, represent every integer in a prescribed initial interval\nwith a bounded number of summands.  The denominators of these rational\nsummands need not agree.  This freedom lets us first represent a positive\nmultiple of a prime and then divide by its integer multiplier."
   },
   {
    "type": "result",
    "label": "lem:rational-divisor-supply"
   },
   {
    "type": "proof",
    "proves": "lem:rational-divisor-supply",
    "title": "",
    "tex": "The prime number theorem \\cite[p.~305, (1.1)]{Selberg1949} gives\n\\[\n \\log P(v)=(1+o(1))\\ell(v)\\log\\ell(v)\n \\ll\\log v\\log\\log v.\n\\]\nSince $\\ell(Y)=16\\log m/\\log 2+O(1)$, and\n$\\log(\\lfloor L\\rfloor!)=O(L\\log L)$, this proves\n\\eqref{eq:supply-size}.  Also $P(Y)\\geq2^{\\ell(Y)}\\geq Y^4$,\nso $K_m>m$ for large $m$.\n\nWe next prove an assertion whose threshold is independent of $m$.\nFix a sufficiently large odd integer $u$, and let $A$ be the set of positive\ndivisors of $P(u)$.  Write $N=|A|=2^{\\ell(u)}\\geq u^4$.\nWe estimate exceptional primes by counting congruent pairs, the\nmechanism underlying Gallagher's larger sieve \\cite{Gallagher1971}.\nThe coarse count below suffices.\nFor each prime $p\\leq u$, let $A_p$ be the image of $A$ in\n$\\mathbb F_p$.  Call $p$ exceptional when $|A_p|\\leq p^{3/4}$.\nIf $c_a$ is the number of members of $A$ in residue class $a$, then\nCauchy--Schwarz shows that the number of ordered pairs of distinct members\nof $A$ congruent modulo an exceptional prime is at least\n\\[\n \\sum_{a\\in\\mathbb F_p}c_a^2-N\n \\geq\\frac{N^2}{|A_p|}-N\n \\geq\\frac{N^2}{2u^{3/4}}.\n\\]\nFor any two distinct members $a,b\\in A$, the nonzero integer $|a-b|<P(u)$\nhas at most $\\log P(u)/\\log 2$ distinct prime divisors.\nCounting the same pairs prime by prime therefore bounds the number $B(u)$\nof exceptional primes by\n\\begin{equation}\\label{eq:supply-exceptional}\n B(u)\\leq \\frac{2u^{3/4}\\log P(u)}{\\log 2}\n \\ll u^{3/4}\\log u\\log\\log u.\n\\end{equation}\n\nWe use the quantitative form of Vinogradov's three-prime theorem: there is\nan absolute $c>0$ such that every sufficiently large odd integer $u$ has\nat least $cu^2/(\\log u)^3$ ordered representations as a sum of three\nprimes; see the statement in \\cite[(1)--(2)]{Kumchev1997}\nand the exposition in \\cite[Theorem~1 and Section~3.1]{KumchevTolev2005}.\nTo make the uniformity in odd $u$ explicit, its singular series is\n\\[\n \\mathfrak S(u)=\n \\prod_{p\\mid u}\\left(1-\\frac{1}{(p-1)^2}\\right)\n \\prod_{p\\nmid u}\\left(1+\\frac{1}{(p-1)^3}\\right).\n\\]\nFor odd $u$ its factor at $2$ is $2$, and\n\\[\n \\mathfrak S(u)\\geq\n 2\\prod_{p>2}\\left(1-\\frac{1}{(p-1)^2}\\right)>0.\n\\]\nThe infinite product is positive because the sum of the subtracted\nquantities converges.  Thus the asymptotic formula supplies an absolute\nlower bound with an absolute threshold, with no dependence on the\nfactorization of $u$.\n\nAt most $3uB(u)$ ordered prime triples summing to $u$ contain an\nexceptional prime: choose its position, its value, and one further entry;\nthe last entry is then fixed.  By \\eqref{eq:supply-exceptional},\n\\[\n 3uB(u)\\ll u^{7/4}\\log u\\log\\log u\n       =o\\left(\\frac{u^2}{(\\log u)^3}\\right).\n\\]\nConsequently every sufficiently large odd $u$ is the sum of three primes\nthat are not exceptional for this same set $A$.\n\nIt remains to represent each such prime using divisors of $P(u)^2$.\nFix one of them, say $p$, and put $H=A_p$ and $h=|H|>p^{3/4}$.\nLet $U$ be the product of two independent uniformly chosen members of\n$H$, and write $\\mathrm e_p(z)=\\exp(2\\pi i z/p)$.\nThe following classical bilinear estimate is recorded in\n\\cite[Proposition~1.1]{GlibichukKonyagin2007}; we give its short proof\nand the five-product consequence needed here.\nFor every nonzero $r\\in\\mathbb F_p$, orthogonality and\nCauchy--Schwarz give\n\\begin{align*}\n \\left|\\sum_{a,b\\in H}\\mathrm e_p(rab)\\right|^2\n &\\leq h\\sum_{a\\in\\mathbb F_p}\n       \\left|\\sum_{b\\in H}\\mathrm e_p(rab)\\right|^2\\\\\n &=ph^2.\n\\end{align*}\nAfter division by $h^4$, this says\n\\[\n \\left|\\mathbb E\\,\\mathrm e_p(rU)\\right|\n \\leq\\frac{\\sqrt p}{h}<p^{-1/4}.\n\\]\nFor five independent copies $U_1,\\ldots,U_5$, Fourier inversion now yields\n\\begin{align*}\n \\Pr(U_1+\\cdots+U_5=0)\n &=\\frac1p\\left(1+\\sum_{r\\ne0}\n                   (\\mathbb E\\,\\mathrm e_p(rU))^5\\right)\\\\\n &\\geq\\frac{1-(p-1)p^{-5/4}}p>0.\n\\end{align*}\nHere the lower bound follows by bounding the absolute value of the sum\nof the nonzero Fourier coefficients.\n\nChoose pairs of residues witnessing this positive probability and lift\neach residue to any positive member of $A$ representing it.  The five\ninteger products $e_1,\\ldots,e_5$ are positive divisors of $P(u)^2$,\nand their sum is divisible by $p$.  Hence\n\\[\n t=\\frac{e_1+\\cdots+e_5}{p}\\in\\mathbb Z_{>0},\\qquad\n p=\\sum_{i=1}^{5}\\frac{e_i}{t}.\n\\]\nThe three chosen primes thus represent $u$ in fifteen summands of the\nrequired kind.\n\nFor a sufficiently large integer $s$, use $u=s$ if $s$ is odd and\n$u=s-1$ otherwise.  In the even case append the summand $1=1/1$.\nThis uses at most sixteen summands.  If $s\\leq Y$, monotonicity of\n$\\ell$ implies $P(u)\\mid P(Y)$, so every numerator constructed above\ndivides $K_m$.\n\nFinally, all preceding thresholds concern $s$ alone and are absolute.\nChoose an integer $S_0$ above them.  For all sufficiently large $m$ we\nhave $\\lfloor L\\rfloor\\geq S_0$.  Each remaining integer\n$1\\leq s\\leq S_0$ then divides $\\lfloor L\\rfloor!$ and hence $K_m$,\nso it has the one-summand representation $s=s/1$.  This proves the\nassertion simultaneously for every $1\\leq s\\leq Y$."
   },
   {
    "type": "section",
    "title": "Grouping the remaining numerator"
   },
   {
    "type": "prose",
    "tex": "The denominator retained by the greedy procedure has divisors at every\nmultiplicative scale.  We first record this property, then use it to reduce\nthe remaining numerator to a short list of integers within the range of\nthe rational-divisor supply."
   },
   {
    "type": "result",
    "label": "lem:marked-divisor-density"
   },
   {
    "type": "proof",
    "proves": "lem:marked-divisor-density",
    "title": "",
    "tex": "For the initial value $q=m$, the divisor $1$ works throughout $[1,m]$.\nSuppose the property holds for $q$, and put $q'=nq$.  If $1\\le w\\le q$,\nuse a divisor of $q$, which is also a divisor of $q'$.  If $n\\le w\\le nq$,\napply the property at $w/n$ and multiply the resulting divisor by $n$.\nThese two cases cover $[1,nq]$ unless $q<n$ and $q<w<n$.  In that gap\nthe divisor $q$ itself works: $q<w$ and\n\\[\n  w<n\\le q+1\\le mq.\n\\]\nThis proves the induction, including the real points between consecutive\nintegers."
   },
   {
    "type": "result",
    "label": "lem:marked-grouping"
   },
   {
    "type": "proof",
    "proves": "lem:marked-grouping",
    "title": "",
    "tex": "Write $X_0=X$, and repeatedly remove groups from the remaining integer.\nIf the current integer $X_i$ exceeds $m^4$, then\n$w=X_i/m^2$ lies in $[1,q]$.  Choose $d_i\\mid q$ with\n\\[\n  \\frac{X_i}{m^3}\\le d_i\\le\\frac{X_i}{m^2},\n  \\qquad s_i=\\left\\lfloor\\frac{X_i}{d_i}\\right\\rfloor.\n\\]\nThus $m^2\\le s_i\\le m^3\\le m^4$, and the integer remaining after the\ngroup $d_i s_i$ is removed satisfies\n\\[\n  0\\le X_{i+1}=X_i-d_i s_i<d_i\\le\\frac{X_i}{m^2}.\n\\]\nIf instead $0<X_i\\le m^4$, remove the final group with $d_i=1$ and\n$s_i=X_i$.  Stop immediately if the remaining integer is zero.\n\nEvery grouping step with $X_i>m^4$ decreases the remainder by a factor\nstrictly greater than $m^2$.  There are therefore at most\n$\\lceil\\log X/(2\\log m)\\rceil$ such steps, followed by at most one\nfinal group.  The number $G$ of groups satisfies\n\\[\n  G\\le\\left\\lceil\\frac{\\log X}{2\\log m}\\right\\rceil+1\n    \\le\\frac{\\log X}{2\\log m}+2.\n\\]\nThis bound also covers $X=1$ and a zero remainder before the final group.\n\nFor each group, use the assumed representation\n$s_i=\\sum_{a=1}^{b_i}e_{i,a}/t_{i,a}$, with $b_i\\le B$.\nDividing $X=\\sum_i d_i s_i$ by $qK_m$ gives\n\\[\n  \\frac{X}{qK_m}\n    =\\sum_i\\sum_{a=1}^{b_i}\n       \\frac{1}{(q/d_i)(K_m/e_{i,a})t_{i,a}}.\n\\]\nEach displayed denominator is a positive integer.  This uses the two\ndivisibilities $d_i\\mid q$ and $e_{i,a}\\mid K_m$; no divisibility between\n$t_{i,a}$ and $e_{i,a}$, or coprimality assumption, is needed.  The total\nnumber of terms is at most $BG$."
   },
   {
    "type": "proof",
    "proves": "prop:marked-length",
    "title": "Proof of Proposition~\\ref{prop:marked-length}",
    "tex": "Fix a sufficiently large integer $m$, put $L=\\log\\log m$, and take\n$K_m$ from Lemma~\\ref{lem:rational-divisor-supply}. Apply\nLemma~\\ref{lem:marked-greedy-prefix} with $T=2mK_m$, which is an\ninteger at least $2m^2$. It gives\n\\[\n 1=\\frac1m+\\sum_{i=1}^{j}\\frac1{n_i}+\\frac Rq,\n \\qquad 0\\le R<2m.\n\\]\nThe prefix is distinct and avoids $m$. By \\eqref{eq:supply-size},\n\\[\n \\log\\log(2mK_m)\\le L+O(\\log L),\n \\qquad\n j\\le\\frac{L}{\\log2}+O(\\log L)\n   =\\left(\\frac1{\\log2}+o(1)\\right)L.\n\\]\nIf $R=0$, the expansion is complete and already satisfies the asserted\nlength bound. Suppose henceforth that $R>0$.\n\nThe denominator $q$ is retained without cancellation, beginning at $m$\nand using multipliers at most the preceding denominator plus one.\nLemma~\\ref{lem:marked-divisor-density} therefore applies to this $q$.\nMoreover $q\\ge2mK_m$ and $R<2m$, so the integer $X=RK_m$ satisfies\n$1\\le X<q$. Lemma~\\ref{lem:marked-grouping}, with $B=16$ and the\nsupply from Lemma~\\ref{lem:rational-divisor-supply}, represents\n$X/(qK_m)=R/q$ as a sum of at most $16G$ unit fractions, where\n\\[\n G\\le\\frac{\\log(RK_m)}{2\\log m}+2\n \\le\\frac{\\log K_m+\\log(2m)}{2\\log m}+2\n \\le\\left(\\frac{16}{\\log2}+o(1)\\right)L.\n\\]\nThis count depends on $RK_m$, not on the potentially much larger $q$.\n\nApply Lemma~\\ref{lem:distinct} only to this tail. It makes its\ndenominators distinct without changing its number of terms. The tail\nsum is strictly below $1/m$ and every $1/n_i$ by\nLemma~\\ref{lem:marked-greedy-prefix}. Every reciprocal in any positive\nexpansion of that sum is at most the sum itself. Thus all denominators\nof the distinct tail exceed $m$ and every $n_i$, so adjoining it to the\nreserved term and prefix produces a distinct expansion of $1$.\nThere is one reserved term, $j$ prefix terms, and at most sixteen terms\nfor each of the $G$ groups. Its total length is therefore at most\n\\[\n 1+j+16G\n \\le\\left(\\frac{1+16\\cdot16}{\\log2}+o(1)\\right)L\n =\\left(\\frac{257}{\\log2}+o(1)\\right)\\log\\log m.\n\\]\nAll errors here tend to zero as $m$ tends to infinity through all\nintegers: the bound on $R$ removed any dependence on the chosen\nstopping numerator, and the supply covers both parities. Absorbing\nthe error into any prescribed $\\varepsilon>0$ proves the proposition."
   },
   {
    "type": "section",
    "title": "Every sufficiently large prescribed length"
   },
   {
    "type": "proof",
    "proves": "cor:prescribed",
    "title": "Proof of Corollary~\\ref{cor:prescribed}",
    "tex": "Set $A=257/\\log2$. Fix a real number $c$ with $0<c<1/A$, and\nchoose $\\varepsilon>0$ such that $c(A+\\varepsilon)<1$.\nProposition~\\ref{prop:marked-length} supplies an integer $M\\ge4$ such\nthat every integer $m\\ge M$ has a distinct marked expansion with\nat most $(A+\\varepsilon)\\log\\log m$ terms. The construction in\nSection~\\ref{sec:prescribed} also gives a finite distinct marked\nexpansion for each $2\\le m<M$. Fix one for each such $m$, and let\n$k_*$ be the maximum of their finitely many lengths.\n\nFor every integer $k\\ge k_*$ and every integer\n$2\\le m\\le\\exp(\\exp(ck))$, the chosen expansion has at most $k$\nterms. This is immediate for $m<M$; for $m\\ge M$ its length is at\nmost\n\\[\n (A+\\varepsilon)\\log\\log m\n \\le c(A+\\varepsilon)k<k.\n\\]\nA distinct expansion of $1$ containing a denominator $m\\ge2$ has\nat least three terms: denominator one would exhaust the sum, and two\ndistinct denominators at least two contribute at most $1/2+1/3<1$.\nThus Lemma~\\ref{lem:exact-marker-padding} may be iterated until the\nlength is exactly $k$, retaining the exact integer $m$. We have proved\n\\[\n \\{2,\\ldots,\\lfloor\\exp(\\exp(ck))\\rfloor\\}\\subseteq D_k.\n\\]\nThe first missing integer exceeds the real right endpoint, and hence\n$v(k)\\ge\\exp(\\exp(ck))$ for every sufficiently large integer $k$.\nBecause this holds for each fixed $c<\\log2/257$, it gives\n\\[\n \\liminf_{k\\to\\infty}\\frac{\\log\\log v(k)}{k}\n \\ge\\frac{\\log2}{257}.\n\\]\nIn particular $257/\\log2<600$, so taking $c=1/600$ gives the stated\neventual lower bound $v(k)\\ge\\exp(\\exp(k/600))$.\n\nFor the upper bound, the product recurrence in the proof of\nCorollary~\\ref{cor:counting} gives $n_i\\le k^{2^{i-1}}$ in every\ndistinct exact-$k$ expansion of $1$. Every denominator in such an\nexpansion is therefore at most $k^{2^{k-1}}$. Consequently $D_k$ is\nfinite for every $k\\ge1$, its complement in $\\{2,3,\\ldots\\}$ is\nnonempty, and\n\\[\n v(k)\\le1+k^{2^{k-1}}.\n\\]\nFor $k\\ge2$ this yields\n$\\log\\log v(k)\\le k\\log2+\\log\\log k$, and therefore\n\\[\n \\limsup_{k\\to\\infty}\\frac{\\log\\log v(k)}{k}\\le\\log2.\n\\]\nTogether the two bounds imply $\\log\\log v(k)=\\Theta(k)$."
   },
   {
    "type": "prose",
    "tex": "The lower slope above is the consequence of the length coefficient\nin Proposition~\\ref{prop:marked-length}. Its vanishing error does not\nimply an eventual inequality with the endpoint $c=\\log2/257$.\nNeither that endpoint inequality nor a limiting or sharp slope is\nasserted.\n\n\n\\begingroup\n\\small\n\n\n\\endgroup"
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
  ],
  "series": [
   [
    2,
    1
   ],
   [
    3,
    2
   ],
   [
    4,
    2
   ],
   [
    5,
    3
   ],
   [
    6,
    2
   ],
   [
    7,
    3
   ],
   [
    8,
    3
   ],
   [
    9,
    3
   ],
   [
    10,
    3
   ],
   [
    11,
    4
   ],
   [
    12,
    3
   ],
   [
    13,
    4
   ],
   [
    14,
    4
   ],
   [
    15,
    3
   ],
   [
    16,
    4
   ],
   [
    17,
    5
   ],
   [
    18,
    3
   ],
   [
    19,
    4
   ],
   [
    20,
    3
   ],
   [
    21,
    4
   ],
   [
    22,
    4
   ],
   [
    23,
    5
   ],
   [
    24,
    3
   ],
   [
    25,
    4
   ],
   [
    26,
    4
   ],
   [
    27,
    4
   ],
   [
    28,
    4
   ],
   [
    29,
    5
   ],
   [
    30,
    4
   ],
   [
    31,
    5
   ],
   [
    32,
    4
   ],
   [
    33,
    4
   ],
   [
    34,
    5
   ],
   [
    35,
    4
   ],
   [
    36,
    4
   ],
   [
    37,
    5
   ],
   [
    38,
    5
   ],
   [
    39,
    5
   ],
   [
    40,
    4
   ],
   [
    41,
    5
   ],
   [
    42,
    4
   ],
   [
    43,
    5
   ],
   [
    44,
    4
   ],
   [
    45,
    4
   ],
   [
    46,
    5
   ],
   [
    47,
    5
   ],
   [
    48,
    4
   ],
   [
    49,
    5
   ],
   [
    50,
    5
   ],
   [
    51,
    5
   ],
   [
    52,
    5
   ],
   [
    53,
    5
   ],
   [
    54,
    4
   ],
   [
    55,
    5
   ],
   [
    56,
    4
   ],
   [
    57,
    5
   ],
   [
    58,
    5
   ],
   [
    59,
    5
   ],
   [
    60,
    4
   ],
   [
    61,
    5
   ],
   [
    62,
    5
   ],
   [
    63,
    4
   ],
   [
    64,
    5
   ],
   [
    65,
    5
   ],
   [
    66,
    5
   ],
   [
    67,
    5
   ],
   [
    68,
    5
   ],
   [
    69,
    5
   ],
   [
    70,
    4
   ],
   [
    71,
    5
   ],
   [
    72,
    4
   ],
   [
    73,
    5
   ],
   [
    74,
    5
   ],
   [
    75,
    5
   ],
   [
    76,
    5
   ],
   [
    77,
    5
   ],
   [
    78,
    5
   ],
   [
    79,
    6
   ],
   [
    80,
    5
   ],
   [
    81,
    5
   ],
   [
    82,
    5
   ],
   [
    83,
    5
   ],
   [
    84,
    4
   ],
   [
    85,
    5
   ],
   [
    86,
    5
   ],
   [
    87,
    5
   ],
   [
    88,
    5
   ],
   [
    89,
    5
   ],
   [
    90,
    4
   ],
   [
    91,
    5
   ],
   [
    92,
    5
   ],
   [
    93,
    5
   ],
   [
    94,
    5
   ],
   [
    95,
    5
   ],
   [
    96,
    4
   ],
   [
    97,
    5
   ],
   [
    98,
    5
   ],
   [
    99,
    4
   ],
   [
    100,
    5
   ],
   [
    101,
    5
   ],
   [
    102,
    5
   ],
   [
    103,
    6
   ],
   [
    104,
    5
   ],
   [
    105,
    4
   ],
   [
    106,
    5
   ],
   [
    107,
    6
   ],
   [
    108,
    5
   ],
   [
    109,
    6
   ],
   [
    110,
    5
   ],
   [
    111,
    5
   ],
   [
    112,
    5
   ],
   [
    113,
    6
   ],
   [
    114,
    5
   ],
   [
    115,
    5
   ],
   [
    116,
    5
   ],
   [
    117,
    5
   ],
   [
    118,
    6
   ],
   [
    119,
    5
   ],
   [
    120,
    4
   ],
   [
    121,
    5
   ],
   [
    122,
    5
   ],
   [
    123,
    5
   ],
   [
    124,
    5
   ],
   [
    125,
    5
   ],
   [
    126,
    4
   ],
   [
    127,
    6
   ],
   [
    128,
    5
   ],
   [
    129,
    5
   ],
   [
    130,
    5
   ],
   [
    131,
    6
   ],
   [
    132,
    5
   ],
   [
    133,
    5
   ],
   [
    134,
    6
   ],
   [
    135,
    5
   ],
   [
    136,
    5
   ],
   [
    137,
    6
   ],
   [
    138,
    5
   ],
   [
    139,
    6
   ],
   [
    140,
    4
   ],
   [
    141,
    5
   ],
   [
    142,
    5
   ],
   [
    143,
    5
   ],
   [
    144,
    5
   ],
   [
    145,
    5
   ],
   [
    146,
    5
   ],
   [
    147,
    5
   ],
   [
    148,
    5
   ],
   [
    149,
    6
   ],
   [
    150,
    5
   ],
   [
    151,
    6
   ],
   [
    152,
    5
   ],
   [
    153,
    5
   ],
   [
    154,
    5
   ],
   [
    155,
    5
   ],
   [
    156,
    5
   ],
   [
    157,
    6
   ],
   [
    158,
    6
   ],
   [
    159,
    5
   ],
   [
    160,
    5
   ],
   [
    161,
    5
   ],
   [
    162,
    5
   ],
   [
    163,
    6
   ],
   [
    164,
    5
   ],
   [
    165,
    5
   ],
   [
    166,
    6
   ],
   [
    167,
    6
   ],
   [
    168,
    4
   ],
   [
    169,
    5
   ],
   [
    170,
    5
   ],
   [
    171,
    5
   ],
   [
    172,
    5
   ],
   [
    173,
    6
   ],
   [
    174,
    5
   ],
   [
    175,
    5
   ],
   [
    176,
    5
   ],
   [
    177,
    5
   ],
   [
    178,
    5
   ],
   [
    179,
    6
   ],
   [
    180,
    4
   ],
   [
    181,
    5
   ],
   [
    182,
    5
   ],
   [
    183,
    5
   ],
   [
    184,
    5
   ],
   [
    185,
    5
   ],
   [
    186,
    5
   ],
   [
    187,
    5
   ],
   [
    188,
    5
   ],
   [
    189,
    5
   ],
   [
    190,
    5
   ],
   [
    191,
    6
   ],
   [
    192,
    5
   ],
   [
    193,
    6
   ],
   [
    194,
    6
   ],
   [
    195,
    5
   ],
   [
    196,
    5
   ],
   [
    197,
    6
   ],
   [
    198,
    5
   ],
   [
    199,
    6
   ],
   [
    200,
    5
   ]
  ]
 }
};
