"""One unattended run for one paper: card, audit with self-evaluation, publish to the feed.

    python -m agent.run data/family-025 "Family 025: Short Egyptian fractions" <agent37|openai>
"""
import json
import sys
from pathlib import Path

from agent import publish, run_audit
from agent.card import build_card

EXAMPLE = {"a": 5, "b": 181, "denominators": [39, 507, 91767]}


def run(paper_dir, title, provider, web_dir="web"):
    card = build_card(paper_dir, "thm:main", EXAMPLE)
    Path(web_dir, "card.js").write_text("window.CARD = " + json.dumps(card, indent=1) + ";\n", encoding="utf-8")
    audit = run_audit.main(paper_dir, Path(web_dir, "audit.js"), provider, None)
    row = publish.publish(title, {"card": card, "audit": audit})
    return {"row_id": row.get("id"), "caught": audit["caught"], "total": audit["total"],
            "controls_clean": audit["controls_clean"], "controls": audit["controls"], "seconds": audit["seconds"]}


if __name__ == "__main__":
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    print(json.dumps(run(sys.argv[1], sys.argv[2], sys.argv[3])))
