from pathlib import Path

import pytest

from agent.priorwork import bib_titles, paper_query, search

TEX = Path(__file__).resolve().parents[2] / "data" / "family-025" / "tex"


def fake(results, status="COMPLETED"):
    calls = []

    def transport(body, api_key):
        calls.append((body, api_key))
        return {"status": status, "output": {"results": results}}

    transport.calls = calls
    return transport


def test_query_comes_from_title_and_abstract():
    query = paper_query(TEX)
    assert query.startswith("Short Egyptian fractions. We prove a conjecture of Erd")
    assert "\\" not in query and "$" not in query


def test_bibliography_titles_are_read():
    titles = bib_titles(TEX)
    assert len(titles) >= 20
    assert any("Old and New Problems" in t for t in titles)


def test_hits_are_tagged_against_the_bibliography():
    transport = fake([{"title": "Old and new problems and results in combinatorial number theory", "url": "u1",
                       "publishedDate": "1980-01-01T00:00:00.000Z", "author": "Erdos, Graham"},
                      {"title": "Something the paper never mentions", "url": "u2"}, {"url": "u3"}])
    out = search("q", "k", bib_titles(TEX), limit=3, transport=transport)
    assert [h["cited_by_paper"] for h in out["hits"]] == [True, False, False]
    assert out["hits"][0]["year"] == "1980" and out["hits"][2]["title"] == "(untitled)"
    body, key = transport.calls[0]
    assert key == "k" and body["provider"] == "exa" and body["input"]["numResults"] == 3


def test_incomplete_run_raises():
    with pytest.raises(RuntimeError):
        search("q", "k", [], transport=fake([], status="FAILED"))


@pytest.mark.parametrize("query,key,limit", [("", "k", 5), ("q", "", 5), ("q", "k", 0), ("q", "k", 26)])
def test_bad_inputs_raise(query, key, limit):
    with pytest.raises((ValueError, RuntimeError)):
        search(query, key, [], limit=limit, transport=fake([]))
