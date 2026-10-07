from pathlib import Path

from agent.proofmap import build_proof_map, load_tex, spine

SAMPLE = r"""
Intro prose citing Lemma~\ref{lem:b} which must not count.
\begin{theorem}\label{thm:main}
Big claim.
\end{theorem}
\begin{lemma}[Helper]\label{lem:a}
Statement with \begin{equation}\label{eq:a} x \end{equation}
\end{lemma}
\begin{proof}
Uses Lemma~\ref{lem:b}.
\end{proof}
\begin{lemma}\label{lem:b}
Base fact.
\end{lemma}
\begin{lemma}\label{lem:unused}
Never cited.
\end{lemma}
\begin{proof}[Proof of Theorem~\ref{thm:main}]
By \eqref{eq:a} and itself \ref{thm:main}.
\end{proof}
"""

FAMILY_025 = Path(__file__).resolve().parents[2] / "data" / "family-025" / "tex"


def by_label(proof_map):
    return {n["label"]: n for n in proof_map["nodes"]}


def test_nodes_and_kinds():
    nodes = by_label(build_proof_map(SAMPLE))
    assert set(nodes) == {"thm:main", "lem:a", "lem:b", "lem:unused"}
    assert nodes["lem:a"]["kind"] == "lemma"
    assert nodes["lem:a"]["title"] == "Helper"
    assert "Big claim." in nodes["thm:main"]["statement"]


def test_dependencies_follow_proofs_and_equation_labels():
    nodes = by_label(build_proof_map(SAMPLE))
    assert nodes["lem:a"]["deps"] == ["lem:b"]
    # the late proof is attributed to the theorem; eq:a resolves to lem:a; no self-loop
    assert nodes["thm:main"]["deps"] == ["lem:a"]
    assert nodes["lem:b"]["deps"] == []


def test_spine_is_transitive_and_drops_unused():
    assert spine(build_proof_map(SAMPLE), "thm:main") == ["thm:main", "lem:a", "lem:b"]


def test_spine_unknown_root_raises():
    try:
        spine(build_proof_map(SAMPLE), "nope")
    except KeyError:
        return
    raise AssertionError("expected KeyError")


def test_family_025_real_paper():
    proof_map = build_proof_map(load_tex(FAMILY_025))
    nodes = by_label(proof_map)
    assert "thm:main" in nodes
    assert len(nodes) == 19
    path = spine(proof_map, "thm:main")
    assert 1 < len(path) <= 19


def test_proof_of_unlabeled_result_is_not_credited_to_previous():
    text = (r"\begin{lemma}\label{l:a}A\end{lemma}\begin{lemma}\label{l:b}B\end{lemma}"
            r"\begin{lemma}U\end{lemma}\begin{proof}\ref{l:a}\end{proof}")
    assert by_label(build_proof_map(text))["l:b"]["deps"] == []


def test_equation_label_inside_proof_resolves_to_its_result():
    text = (r"\begin{lemma}\label{l:a}A\end{lemma}"
            r"\begin{proof}\begin{equation}\label{eq:x}y\end{equation}\end{proof}"
            r"\begin{lemma}\label{l:b}B\end{lemma}\begin{proof}By \eqref{eq:x}.\end{proof}")
    assert by_label(build_proof_map(text))["l:b"]["deps"] == ["l:a"]


def test_comment_after_line_break_is_stripped(tmp_path):
    (tmp_path / "main.tex").write_text("x \\\\% see \\ref{l:a}\nkept 50\\% \\ref{l:b}\n")
    text = load_tex(tmp_path)
    assert "l:a" not in text
    assert "l:b" in text


FLOW_SAMPLE = r"""\begin{document}
\begin{abstract}We prove things.\end{abstract}
\section{Introduction}
Some motivation.
\begin{theorem}\label{t}Claim.\end{theorem}
\section{Tools}\label{sec:tools}
\begin{lemma}\label{l}Fact.\end{lemma}
\begin{proof}Because \ref{t} is not needed.\end{proof}
Bridging remark.
\begin{proof}[Proof of Theorem~\ref{t}]By \ref{l}.\end{proof}
\end{document}"""


def test_nodes_carry_proof_and_section():
    nodes = by_label(build_proof_map(FLOW_SAMPLE))
    assert nodes["t"]["section"] == "Introduction" and nodes["l"]["section"] == "Tools"
    assert "By \\ref{l}." in nodes["t"]["proof"]
    assert nodes["l"]["proof"].startswith("Because")


def test_flow_lists_every_block_in_paper_order():
    flow = build_proof_map(FLOW_SAMPLE)["flow"]
    kinds = [(b["type"], b.get("label") or b.get("proves") or b.get("title") or "") for b in flow]
    assert kinds == [("prose", ""), ("section", "Introduction"), ("prose", ""), ("result", "t"),
                     ("section", "Tools"), ("result", "l"), ("proof", "l"), ("prose", ""), ("proof", "t")]
    assert "We prove things." in flow[0]["tex"] and flow[7]["tex"] == "Bridging remark."


def test_family_025_flow_covers_all_results_and_sections():
    proof_map = build_proof_map(load_tex(FAMILY_025))
    flow = proof_map["flow"]
    assert sum(b["type"] == "result" for b in flow) == 19
    assert sum(b["type"] == "proof" for b in flow) == 19
    assert sum(b["type"] == "section" for b in flow) >= 6
    assert all(n["proof"] for n in proof_map["nodes"])
