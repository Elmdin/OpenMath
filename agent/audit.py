"""Statement audit: does the Lean statement say what the paper claims?

The model proposes flags; this module only keeps a flag if both of its quotes really occur in
the sources. `model` is any callable prompt -> JSON text, so the provider stays swappable.
"""
import json
import re
from concurrent.futures import ThreadPoolExecutor

SEVERITIES = ("mismatch", "note")

# One seeded change each: (id, what changed, text to find, replacement, is it a real defect?).
# A real defect makes the Lean statement fail to establish the paper's theorem. Two changes are controls:
# allow_one is equivalent (for a/b < 1 a term 1/1 can never appear) and drop_threshold is stronger.
DEFECTS = (
    ("drop_threshold", "holds for every b >= 2 (stronger: still implies the theorem)", "∀ b : ℕ, b₀ ≤ b →", "∀ b : ℕ, 2 ≤ b →", False),
    ("exists_b", "holds for some b instead of all large b", "∀ b : ℕ, b₀ ≤ b →", "∃ b : ℕ, b₀ ≤ b ∧", True),
    ("log_upper", "upper bound is log b instead of log log b",
     "≤ c₂ * Real.log (Real.log (b : ℝ))", "≤ c₂ * Real.log (b : ℝ)", True),
    ("drop_lower", "lower bound removed",
     "c₁ * Real.log (Real.log (b : ℝ)) ≤ (maxMinLength b : ℝ) ∧", "", True),
    ("allow_one", "denominator 1 allowed (equivalent, since a/b < 1)", "(∀ n ∈ ns, 2 ≤ n)", "(∀ n ∈ ns, 1 ≤ n)", False),
    ("not_distinct", "repeated denominators allowed", "ns.Pairwise (· < ·)", "ns.Pairwise (· ≤ ·)", True),
)

PROMPT = """You are auditing a formal statement against a paper's claim. Do not judge the proof.

Paper text (LaTeX). The claim under audit is the theorem environment only; the text before it
is there for its definitions and notation, and is not itself a claim the Lean statement must contain:
<paper>
{claim}
</paper>

Lean 4 source (definitions and statement; the proof is omitted):
<lean>
{lean}
</lean>

List every place where the Lean statement is weaker than, stronger than, or different from the
paper claim, including differences hidden in the definitions. Reply with JSON only:
{{"flags": [{{"severity": "mismatch" | "note", "summary": "...", "paper_quote": "...", "lean_quote": "..."}}]}}
Use "mismatch" only when proving the Lean statement would NOT establish the paper's theorem
(it is weaker, or about different objects). Use "note" for everything else a reader should know:
extra conjuncts, facts the paper states outside the theorem, totalised definitions, and rewrites
that are mathematically equivalent on the theorem's domain. Check equivalence before flagging. Each quote must be copied exactly from the text above. Return an empty list if they agree."""


def build_prompt(claim, lean):
    return PROMPT.format(claim=claim, lean=lean)


def seeded_variants(lean):
    variants = []
    for defect_id, description, old, new, is_defect in DEFECTS:
        if lean.count(old) != 1:
            raise ValueError(f"defect {defect_id!r}: expected exactly one occurrence of {old!r}")
        variants.append({"id": defect_id, "description": description, "is_defect": is_defect,
                         "lean": lean.replace(old, new)})
    return variants


def _squash(text):
    return re.sub(r"\s+", " ", text).strip()


def _quotable(text):
    """Squash whitespace and drop inline-math delimiters, which models omit when quoting LaTeX."""
    return _squash(re.sub(r"\$|\\[()]", "", text))


# A backslash that is not a JSON escape the model plausibly meant: \", \\, \uXXXX, or \n not starting a LaTeX command.
_LATEX_BACKSLASH = re.compile(r'\\(?!["\\]|u[0-9a-fA-F]{4}|n(?![a-zA-Z]))')


def _loads(raw):
    """Models copy LaTeX into JSON without doubling backslashes; repair that only if the reply is invalid as written."""
    try:
        return json.loads(raw)
    except TypeError as error:
        raise ValueError(f"model did not return JSON: {error}") from error
    except json.JSONDecodeError:
        try:
            return json.loads(_LATEX_BACKSLASH.sub(r"\\\\", raw))
        except json.JSONDecodeError as error:
            raise ValueError(f"model did not return JSON: {error}") from error


def _parse(raw):
    data = _loads(raw)
    if not isinstance(data, dict) or not isinstance(data.get("flags"), list):
        raise ValueError("model output must be an object with a 'flags' list")
    for item in data["flags"]:
        if not isinstance(item, dict) or item.get("severity") not in SEVERITIES or not all(
                isinstance(item.get(key), str) and item[key].strip() for key in ("summary", "paper_quote", "lean_quote")):
            raise ValueError(f"malformed flag: {item!r}")
    return data["flags"]


def audit(claim, lean, model):
    """Return {"flags": [...], "rejected": [...]}; rejected flags quote text that is not there."""
    claim_text, lean_text = _quotable(claim), _squash(lean)
    flags, rejected = [], []
    for item in _parse(model(build_prompt(claim, lean))):
        grounded = _quotable(item["paper_quote"]) in claim_text and _squash(item["lean_quote"]) in lean_text
        (flags if grounded else rejected).append(dict(item))
    return {"flags": flags, "rejected": rejected}


def _has_mismatch(result):
    return any(item["severity"] == "mismatch" for item in result["flags"])


def run_eval(claim, lean, model):
    """Seeded-defect eval. A real defect is caught if any grounded 'mismatch' flag is raised;
    a control (an equivalent rewrite, or the original) is correct if none is."""
    variants = seeded_variants(lean)
    with ThreadPoolExecutor(max_workers=len(variants) + 1) as pool:
        original_future = pool.submit(audit, claim, lean, model)
        outcomes = list(pool.map(lambda v: audit(claim, v["lean"], model), variants))
    original = original_future.result()
    results = []
    for variant, outcome in zip(variants, outcomes):
        results.append({"id": variant["id"], "description": variant["description"],
                        "is_defect": variant["is_defect"], "caught": _has_mismatch(outcome), "flags": outcome["flags"], "rejected": outcome["rejected"]})
    defects = [r for r in results if r["is_defect"]]
    controls = [r for r in results if not r["is_defect"]]
    return {"total": len(defects), "caught": sum(r["caught"] for r in defects),
            "controls": len(controls) + 1,
            "controls_clean": sum(not r["caught"] for r in controls) + (not _has_mismatch(original)),
            "false_flag_on_original": _has_mismatch(original), "original": original, "results": results}
