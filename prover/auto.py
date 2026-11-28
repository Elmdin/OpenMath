"""Close the easy holes mechanically before a model spends tokens on them.

Every `sorry` in a file is swapped for `om_auto` (a fixed tactic portfolio, see
lean/OpenMath/Auto.lean), the file is compiled once, and each hole the portfolio closed is
rewritten in the source with the tactic that closed it. Holes left open come back with their
goal state.
"""
from __future__ import annotations

import re
import tempfile
from dataclasses import dataclass
from pathlib import Path

from . import lean

SORRY = re.compile(r"(?<![\w.'])sorry(?![\w'])")
IMPORT = "import OpenMath.Auto\n"
TERM_PRECEDERS = (":=", "(", "⟨", ",", "fun", "=>")
CASE_ARM = re.compile(r"(^|\s)\|[^|]*=>\s*$")


@dataclass
class Hole:
    index: int
    line: int  # 1-based, in the original file
    column: int  # 0-based, in the original file
    term_position: bool
    new_column: int = 0  # column of `om_auto` in the instrumented file
    closed_by: str | None = None
    goal: str | None = None


def strip_comments(text: str) -> str:
    """Blank out comments, keeping every character position."""
    def blank(m: re.Match) -> str:
        return re.sub(r"[^\n]", " ", m.group(0))
    text = re.sub(r"/-.*?-/", blank, text, flags=re.S)
    return re.sub(r"--[^\n]*", blank, text)


def is_term_position(before: str) -> bool:
    """A `sorry` right after `:=`, `(`, `,` … stands for a term; after `by` or on its own line, a tactic."""
    b = before.rstrip()
    if b.endswith("=>"):
        return not CASE_ARM.search(b)  # `| zero => sorry` is a tactic arm, `fun x => sorry` a term
    return b.endswith(TERM_PRECEDERS)


def instrument(source: str) -> tuple[str, list[Hole]]:
    """Return the source with every `sorry` replaced by `om_auto`, plus where each one is."""
    clean = strip_comments(source)
    holes: list[Hole] = []
    out_lines = []
    for lineno, (raw, visible) in enumerate(zip(source.split("\n"), clean.split("\n")), start=1):
        shift = 0
        new = raw
        for m in SORRY.finditer(visible):
            term = is_term_position(visible[: m.start()])
            repl = "(by om_auto)" if term else "om_auto"
            start = m.start() + shift
            new = new[:start] + repl + new[start + len("sorry"):]
            holes.append(Hole(len(holes), lineno, m.start(), term, new_column=start + (4 if term else 0)))
            shift += len(repl) - len("sorry")
        out_lines.append(new)
    body = "\n".join(out_lines)
    # Put the helper import first; line numbers shift by one.
    return IMPORT + body, holes


def clean_tactic(found: str) -> str:
    found = found.replace("[apply]", "").strip()
    return " ".join(found.split())


def apply_results(source: str, holes: list[Hole]) -> str:
    """Rewrite closed holes in the original source with their winning tactic."""
    lines = source.split("\n")
    for h in sorted(holes, key=lambda h: (h.line, h.column), reverse=True):
        if not h.closed_by:
            continue
        repl = f"(by {h.closed_by})" if h.term_position else h.closed_by
        row = lines[h.line - 1]
        lines[h.line - 1] = row[: h.column] + repl + row[h.column + len("sorry"):]
    return "\n".join(lines)


def run_auto(path: Path | str, write: bool = True, timeout: int = 1800) -> tuple[list[Hole], lean.CheckResult]:
    """Try the portfolio on every hole of `path`. Rewrites the file when `write`."""
    path = Path(path).resolve()
    source = path.read_text()
    instrumented, holes = instrument(source)
    if not holes:
        return [], lean.check(path, timeout)
    with tempfile.NamedTemporaryFile("w", suffix=".lean", dir=path.parent, prefix=".auto_", delete=True) as tmp:
        tmp.write(instrumented)
        tmp.flush()
        result = lean.check(tmp.name, timeout)
    by_pos = {(h.line + 1, h.new_column): h for h in holes}  # +1 for the added import line
    for d in result.infos + result.warnings:
        h = by_pos.get((d.line, d.column))
        if h is None:
            continue
        if d.message.startswith("om_auto closed:"):
            h.closed_by = clean_tactic(d.message.split(":", 1)[1])
        elif d.message.startswith("om_auto open:"):
            h.goal = d.message.split(":", 1)[1].strip()
    if write and any(h.closed_by for h in holes) and not result.timed_out:
        path.write_text(apply_results(source, holes))
    return holes, result


def render(holes: list[Hole], result: lean.CheckResult) -> str:
    if result.timed_out:
        return "auto: timed out"
    closed = [h for h in holes if h.closed_by]
    lines = [f"auto: closed {len(closed)} of {len(holes)} hole(s)"]
    for h in holes:
        if h.closed_by:
            lines.append(f"  {h.line}:{h.column} closed by `{h.closed_by}`")
        else:
            goal = (h.goal or "(no goal reported; the file may not compile up to here)").replace("\n", "\n      ")
            lines.append(f"  {h.line}:{h.column} OPEN\n      {goal}")
    for d in result.errors[:10]:
        lines.append("  " + d.short(600).replace("\n", "\n    "))
    return "\n".join(lines)
