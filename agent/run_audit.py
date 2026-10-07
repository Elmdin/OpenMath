"""Run the statement audit and its seeded-defect eval for one paper; write web/audit.js."""
import json
import sys
import time
from pathlib import Path

from agent import agent37, openai_model
from agent.agent37 import load_env
from agent.audit import run_eval


def paper_claim(paper_dir, label="thm:main"):
    """The introduction up to the end of the main theorem: its statement plus the definitions it uses."""
    intro = (Path(paper_dir) / "tex" / "introduction.tex").read_text(encoding="utf-8")
    marker = "\\label{" + label + "}"
    if marker not in intro:
        raise ValueError(f"{label} not found in introduction.tex")
    end = intro.index("\\end{theorem}", intro.index(marker)) + len("\\end{theorem}")
    return intro[:end]


def build_model(provider, model_name):
    env = load_env()
    if provider == "agent37":
        return agent37.make_model(env.get("AGENT37_API_KEY"), model_name)
    if provider == "openai":
        return openai_model.make_model(env.get("OPENAI_API_KEY"), model_name or "gpt-5.5")
    raise ValueError(f"unknown provider {provider!r}; use agent37 or openai")


def main(paper_dir, out_path, provider, model_name):
    paper_dir = Path(paper_dir)
    lean = sorted(paper_dir.glob("*.lean"))[0].read_text(encoding="utf-8")
    started = time.time()
    report = run_eval(paper_claim(paper_dir), lean, build_model(provider, model_name))
    report = {**report, "model": model_name or "default", "provider": provider, "seconds": round(time.time() - started, 1)}
    Path(out_path).write_text("window.AUDIT = " + json.dumps(report, indent=1, ensure_ascii=False) + ";\n", encoding="utf-8")
    return report


if __name__ == "__main__":
    if len(sys.argv) not in (4, 5):
        sys.exit("usage: python -m agent.run_audit <paper-dir> <out.js> <agent37|openai> [model]")
    result = main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) == 5 else None)
    print(f"defects caught {result['caught']}/{result['total']}; controls clean {result['controls_clean']}/{result['controls']}; {result['seconds']}s")
    for row in result["results"]:
        print(f"  {row['id']:15} defect={row['is_defect']!s:5} mismatch_raised={row['caught']!s:5} rejected={len(row['rejected'])}")
