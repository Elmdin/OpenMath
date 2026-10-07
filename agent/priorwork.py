"""Prior-work search through Monid (routes to Exa), cross-checked against the paper's bibliography.

Each hit is tagged with whether the paper already cites it, by title. Docs: https://monid.ai/docs
"""
import json
import re
import urllib.error
import urllib.request
from pathlib import Path

URL = "https://api.monid.ai/v1/run"


def _http(body, api_key, timeout=90):
    request = urllib.request.Request(URL, data=json.dumps(body).encode(), method="POST", headers={
        "Authorization": f"Bearer {api_key}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.loads(response.read())
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"Monid HTTP {error.code}: {error.read().decode(errors='replace')[:300]}") from error
    except (urllib.error.URLError, TimeoutError) as error:
        raise RuntimeError(f"Monid call failed: {error}") from error


def _plain(tex):
    text = re.sub(r"\\[a-zA-Z]+\*?|[{}$\\\"'`^~]", " ", tex)
    return re.sub(r"\s+", " ", text).strip()


def _key(title):
    return re.sub(r"[^a-z0-9]", "", _plain(title).lower())


def paper_query(tex_dir):
    """Title plus the first sentence of the abstract, with the TeX stripped. No model involved."""
    main = (Path(tex_dir) / "main.tex").read_text(encoding="utf-8")
    title = re.search(r"\\title\{(.+?)\}\s*\n", main)
    abstract = re.search(r"\\begin\{abstract\}(.+?)\\end\{abstract\}", main, re.DOTALL)
    if not title or not abstract:
        raise ValueError("main.tex needs a \\title and an abstract")
    return f"{_plain(title.group(1))}. {_plain(abstract.group(1)).split('. ')[0]}."


def bib_titles(tex_dir):
    bib = (Path(tex_dir) / "references.bib").read_text(encoding="utf-8")
    return [m.group(1) for m in re.finditer(r"^\s*title\s*=\s*\{(.+)\},?\s*$", bib, re.MULTILINE)]


def search(query, api_key, cited_titles, limit=8, transport=_http):
    if not api_key:
        raise RuntimeError("Monid API key is missing")
    if not query.strip() or not 1 <= limit <= 25:
        raise ValueError("need a non-empty query and a limit between 1 and 25")
    run = transport({"provider": "exa", "endpoint": "/search",
                     "input": {"query": query, "numResults": limit, "category": "research paper"}}, api_key)
    if run.get("status") != "COMPLETED" or not isinstance(run.get("output", {}).get("results"), list):
        raise RuntimeError(f"Monid run did not complete: {str(run)[:300]}")
    cited = [_key(t) for t in cited_titles]
    hits = []
    for item in run["output"]["results"]:
        key = _key(item.get("title") or "")
        hits.append({"title": item.get("title") or "(untitled)", "url": item.get("url"),
                     "author": item.get("author"), "year": (item.get("publishedDate") or "")[:4] or None,
                     "cited_by_paper": bool(key) and any(key in c or c in key for c in cited if c)})
    return {"query": query, "provider": "monid/exa", "hits": hits}
