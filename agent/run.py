"""One unattended run for one paper: card, audit with self-evaluation, publish to the feed.

    python -m agent.run data/family-025 "Family 025: Short Egyptian fractions" <agent37|openai>
"""
import json
import sys
from pathlib import Path

from agent import priorwork, publish, run_audit
from agent.agent37 import load_env
from agent.card import build_card

EXAMPLE = {"a": 5, "b": 181, "denominators": [39, 507, 91767]}


def run(paper_dir, title, provider, web_dir="web"):
    card = build_card(paper_dir, "thm:main", EXAMPLE)
    Path(web_dir, "card.js").write_text("window.CARD = " + json.dumps(card, indent=1) + ";\n", encoding="utf-8")
    audit = run_audit.main(paper_dir, Path(web_dir, "audit.js"), provider, None)
    tex_dir = Path(paper_dir, "tex")
    env = {**load_env(Path(__file__).resolve().parents[2] / ".env"), **load_env()}
    prior = priorwork.search(priorwork.paper_query(tex_dir), env.get("MONID_API_KEY") or env.get("MONDI_API_KEY"),
                             priorwork.bib_titles(tex_dir))
    Path(web_dir, "prior.js").write_text("window.PRIOR = " + json.dumps(prior, indent=1) + ";\n", encoding="utf-8")
    row = publish.publish(title, {"card": card, "audit": audit, "prior_work": prior})
    Path(web_dir, "run.js").write_text("window.RUN = " + json.dumps({"row_id": row.get("id"), "provider": provider}) + ";\n",
                                       encoding="utf-8")
    return {"row_id": row.get("id"), "prior_hits": len(prior["hits"]),
            "prior_uncited": sum(not h["cited_by_paper"] for h in prior["hits"]), "caught": audit["caught"], "total": audit["total"],
            "controls_clean": audit["controls_clean"], "controls": audit["controls"], "seconds": audit["seconds"]}


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    print(json.dumps(run(sys.argv[1], sys.argv[2], sys.argv[3])))
