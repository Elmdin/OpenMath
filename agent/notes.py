"""Copilot notes: a short reviewer's note for each result of a paper, grounded in quotes.

The model proposes a role and up to three things a referee should verify; this module keeps a
check only if its quote really occurs in the result's statement or proof. `model` is any
callable prompt -> JSON text, so the provider stays swappable.
"""
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from agent.audit import _squash

MAX_CHECKS = 3

PROMPT = """You are helping a mathematician review a machine-written paper. They are reading one
result at a time and want a short reviewer's note for the result below. Do NOT judge whether the
proof is correct, and do not say that a step is right or wrong: only say what the result does and
where a referee should look.

Result: {kind} {label} {title}

Statement (LaTeX):
<statement>
{statement}
</statement>

Proof (LaTeX; may be empty):
<proof>
{proof}
</proof>

Reply with JSON only, in exactly this shape:
{{"role": "<one plain-English sentence: what this result does in the argument>", "checks": [{{"point": "<one thing a referee should verify in this step, plain English>", "quote": "<exact copy of a short span, at most ~200 chars, from the statement or proof that the point is about>"}}]}}
Give at most {max_checks} checks; an empty list is fine. Every quote must be copied character for
character from the LaTeX above (same symbols, same commands, no paraphrase, no ellipsis), and must
come from a single contiguous span. Because the reply is JSON, write each LaTeX backslash as two
backslashes inside JSON strings."""


def build_prompt(node):
    return PROMPT.format(kind=node.get("kind", "result"), label=node["label"], title=node.get("title") or "",
                         statement=node.get("statement") or "", proof=node.get("proof") or "",
                         max_checks=MAX_CHECKS)


# A JSON escape we keep as is: an escaped backslash, quote or slash, a \uXXXX, or a control escape
# that is not the start of a LaTeX command (\n is a newline, \nu and \frac are LaTeX).
_ESCAPE = re.compile(r'''\\(\\|["/]|u[0-9a-fA-F]{4}|[bfnrt](?![A-Za-z]))|\\''')


def _repair_escapes(raw):
    """Models copy LaTeX into JSON without doubling backslashes: \\log is an invalid escape and
    \\frac silently becomes a form feed. Double every backslash that is not a plausible JSON escape."""
    return _ESCAPE.sub(lambda match: match.group(0) if match.group(1) else "\\\\", raw)


_NOISE = re.compile(r"\x1b\[[0-9;]*[A-Za-z]|[\x00-\x08\x0b-\x1f\x7f]")


def _plain(text):
    """Prose for display: hosted agents leak terminal colour codes into their answers."""
    return _NOISE.sub("", text).strip()


def _parse(raw):
    try:
        data = json.loads(raw)
    except (TypeError, json.JSONDecodeError) as error:
        raise ValueError(f"model did not return JSON: {error}") from error
    if not isinstance(data, dict):
        raise ValueError("model output must be a JSON object")
    role, checks = data.get("role"), data.get("checks")
    if not isinstance(role, str) or not role.strip():
        raise ValueError("model output needs a non-empty 'role' string")
    if not isinstance(checks, list):
        raise ValueError("model output needs a 'checks' list")
    for item in checks:
        if not isinstance(item, dict) or not all(
                isinstance(item.get(key), str) and item[key].strip() for key in ("point", "quote")):
            raise ValueError(f"malformed check: {item!r}")
    return role.strip(), checks[:MAX_CHECKS]


def _readings(raw):
    """The reply as written, then with LaTeX backslashes repaired; the first is preferred.
    Raises the as-written error if neither reading is valid."""
    readings, first_error = [], None
    for text in dict.fromkeys([raw, _repair_escapes(raw)] if isinstance(raw, str) else [raw]):
        try:
            readings.append(_parse(text))
        except ValueError as error:
            first_error = first_error or error
    if not readings:
        raise first_error
    return readings


def review_result(node, model):
    """Return {"label", "role", "checks", "rejected"}; rejected counts checks quoting text that is not there."""
    source = _squash((node.get("statement") or "") + "\n" + (node.get("proof") or ""))
    readings = _readings(model(build_prompt(node)))
    role, proposed = readings[0]
    checks = []
    for index, item in enumerate(proposed):
        # the same check under each reading: as written it may hold a form feed where \frac was meant
        versions = [reading[1][index] for reading in readings if index < len(reading[1])]
        grounded = next((v for v in versions if _squash(v["quote"]) in source), None)
        if grounded is not None:
            checks.append({"point": _plain(grounded["point"]), "quote": grounded["quote"]})
    return {"label": node["label"], "role": _plain(role), "checks": checks, "rejected": len(proposed) - len(checks)}


def _review_or_error(node, model):
    try:
        return review_result(node, model)
    except Exception as error:  # one bad result must not sink the paper; the error is recorded, not hidden
        return {"label": node["label"], "error": f"{type(error).__name__}: {error}"[:500]}


def review_paper(proof_map, model, max_workers=6):
    """label -> note for every node, in node order; a failed result becomes {"label", "error"}."""
    nodes = list(proof_map["nodes"])
    if not nodes:
        return {}
    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        notes = list(pool.map(lambda node: _review_or_error(node, model), nodes))
    return {node["label"]: note for node, note in zip(nodes, notes)}


def summary(notes):
    done = [note for note in notes.values() if "error" not in note]
    return (f"results reviewed {len(done)}; results with errors {len(notes) - len(done)}; "
            f"grounded checks {sum(len(note['checks']) for note in done)}; "
            f"rejected checks {sum(note['rejected'] for note in done)}")


def main(paper_dir, out_path, provider):
    from agent.proofmap import build_proof_map, load_tex
    from agent.run_audit import build_model

    proof_map = build_proof_map(load_tex(Path(paper_dir) / "tex"))
    started = time.time()
    notes = review_paper(proof_map, build_model(provider, None))
    report = {"provider": provider, "seconds": round(time.time() - started, 1), "notes": notes}
    Path(out_path).write_text("window.NOTES = " + json.dumps(report, indent=1, ensure_ascii=False) + ";\n",
                              encoding="utf-8")
    return report


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit("usage: python -m agent.notes <paper-dir> <out.js> <agent37|openai>")
    result = main(sys.argv[1], sys.argv[2], sys.argv[3])
    print(f"{summary(result['notes'])}; {result['provider']}; {result['seconds']}s")
