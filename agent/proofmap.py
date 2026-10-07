"""Deterministic proof map: parse a paper's LaTeX into a dependency graph of its results.

No model is involved. A node is a theorem/lemma/proposition/corollary; an edge A -> B means
the statement or proof of A cites B (directly, or via an equation labelled inside B).
"""
import json
import re
import sys
from pathlib import Path

KINDS = ("theorem", "lemma", "proposition", "corollary")

_INPUT = re.compile(r"\\input\{([^}]+)\}")
_BLOCK = re.compile(
    r"\\begin\{(?P<env>" + "|".join(KINDS + ("proof",)) + r")\}(?P<body>.*?)\\end\{(?P=env)\}",
    re.DOTALL,
)
_OPT = re.compile(r"\s*\[(?P<opt>(?:[^\[\]]|\{[^}]*\})*)\]")
_LABEL = re.compile(r"\\label\{([^}]+)\}")
_REF = re.compile(r"\\(?:eq|c|C|auto)?ref\{([^}]+)\}")
_COMMENT = re.compile(r"(?<!\\)((?:\\\\)*)%.*")


def load_tex(tex_dir, root="main.tex"):
    """Return the root file with every \\input inlined, comments stripped."""
    tex_dir = Path(tex_dir)

    def read(name):
        path = tex_dir / (name if name.endswith(".tex") else name + ".tex")
        if not path.is_file():
            raise FileNotFoundError(f"missing TeX input: {path}")
        text = _COMMENT.sub(r"\1", path.read_text(encoding="utf-8"))
        return _INPUT.sub(lambda m: read(m.group(1)), text)

    return read(root)


def _split_optional(body):
    match = _OPT.match(body)
    return (match.group("opt").strip(), body[match.end():]) if match else ("", body)


def _refs(text):
    return [label for group in _REF.findall(text) for label in group.split(",")]


_SECTION = re.compile(r"\\(?:sub)*section\*?\{((?:[^{}]|\{[^{}]*\})*)\}")
_BODY = re.compile(r"\\begin\{document\}(.*?)\\end\{document\}", re.DOTALL)
_FRONT = re.compile(r"\\(?:maketitle|tableofcontents)\b|\\(?:begin|end)\{abstract\}|\\bibliography(?:style)?\{[^}]*\}")


def _prose(flow, chunk):
    chunk = _FRONT.sub("", chunk).strip()
    if _LABEL.sub("", chunk).strip():
        flow.append({"type": "prose", "tex": chunk})


def build_proof_map(text):
    body = _BODY.search(text)
    text = body.group(1) if body else text
    results = []  # each: label, kind, title, statement, section, proofs, cited (raw labels)
    owner = {}  # any label -> label of the result it sits inside
    flow = []  # every block of the paper, in order
    current, section, cursor = None, "", 0
    tokens = sorted(list(_SECTION.finditer(text)) + list(_BLOCK.finditer(text)), key=lambda m: m.start())
    for token in tokens:
        if token.start() < cursor:
            continue  # a heading inside an environment we already consumed
        _prose(flow, text[cursor:token.start()])
        cursor = token.end()
        if token.re is _SECTION:
            section = token.group(1).strip()
            flow.append({"type": "section", "title": section})
            continue
        optional, body_text = _split_optional(token.group("body"))
        if token.group("env") == "proof":
            named = [owner[r] for r in _refs(optional) if r in owner]
            target = named[0] if named else current
            if target is not None:
                target_result = next(r for r in results if r["label"] == target)
                target_result["cited"].extend(_refs(body_text))
                target_result["proofs"].append(body_text.strip())
                for label in _LABEL.findall(body_text):
                    owner.setdefault(label, target)
            flow.append({"type": "proof", "proves": target, "title": optional, "tex": body_text.strip()})
            continue
        labels = _LABEL.findall(body_text)
        if not labels:
            current = None
            flow.append({"type": "result", "label": None, "kind": token.group("env"), "title": optional,
                         "tex": body_text.strip()})
            continue
        current = labels[0]
        for label in labels:
            owner[label] = current
        results.append({
            "label": current,
            "kind": token.group("env"),
            "title": optional,
            "statement": _LABEL.sub("", body_text).strip(),
            "section": section,
            "proofs": [],
            "cited": _refs(body_text),
        })
        flow.append({"type": "result", "label": current})
    _prose(flow, text[cursor:])

    nodes = []
    for result in results:
        deps = []
        for cited in result["cited"]:
            dep = owner.get(cited.strip())
            if dep and dep != result["label"] and dep not in deps:
                deps.append(dep)
        nodes.append({k: result[k] for k in ("label", "kind", "title", "statement", "section")}
                     | {"proof": "\n\n".join(result["proofs"]), "deps": deps})
    return {"nodes": nodes, "flow": flow}


def spine(proof_map, root):
    """Labels reachable from root through deps, in breadth-first order."""
    deps = {node["label"]: node["deps"] for node in proof_map["nodes"]}
    if root not in deps:
        raise KeyError(f"no result labelled {root!r}")
    order = [root]
    for label in order:
        order.extend(d for d in deps[label] if d not in order)
    return order


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: python -m agent.proofmap <tex-dir>")
    json.dump(build_proof_map(load_tex(sys.argv[1])), sys.stdout, indent=2)
