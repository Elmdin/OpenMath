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


RELEVANCE = ("should_cite", "background", "unrelated")

ASSESS_PROMPT = """A machine-written mathematics paper does not cite the works listed below, which a search
returned as related. Judging only from each title (and author and year where given), say how
it relates to the paper. Do not use tools. Reply with JSON only:
{{"items": [{{"index": <number from the list>, "relevance": "should_cite" | "background" | "unrelated",
            "reason": "<one plain sentence>"}}]}}
"should_cite": it appears to address the same question or a result the paper builds on or
improves. "background": same area, not the same question. "unrelated": different topic.
You have not read these works; say so in the reason if the title alone is not enough.

The paper: {query}

Uncited works:
{listing}"""


def assess(prior, model):
    """Ask a model which uncited hits look like they should have been cited. Returns a new result dict."""
    uncited = [i for i, hit in enumerate(prior["hits"]) if not hit["cited_by_paper"]]
    if not uncited:
        return {**prior, "assessed": True}
    listing = "\n".join(f"{i}. {prior['hits'][i]['title']}" + (f" ({prior['hits'][i]['author']})" if prior["hits"][i].get("author") else "")
                        + (f", {prior['hits'][i]['year']}" if prior["hits"][i].get("year") else "") for i in uncited)
    try:
        data = json.loads(model(ASSESS_PROMPT.format(query=prior["query"], listing=listing)))
    except (TypeError, json.JSONDecodeError) as error:
        raise RuntimeError(f"relevance assessment was not JSON: {error}") from error
    verdicts = {}
    for item in data.get("items", []) if isinstance(data, dict) else []:
        if (isinstance(item, dict) and item.get("index") in uncited and item.get("relevance") in RELEVANCE
                and isinstance(item.get("reason"), str) and item["reason"].strip()):
            verdicts[item["index"]] = {"relevance": item["relevance"], "reason": item["reason"].strip()[:300]}
    hits = [{**hit, **verdicts.get(i, {})} for i, hit in enumerate(prior["hits"])]
    return {**prior, "hits": hits, "assessed": True}
