from pathlib import Path

import pytest

import json

from agent.priorwork import assess, bib_titles, paper_query, search

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


def test_assess_tags_only_uncited_hits_and_ignores_bad_items():
    prior = {"query": "q", "provider": "x", "hits": [{"title": "A", "cited_by_paper": True}, {"title": "B", "cited_by_paper": False},
                                                     {"title": "C", "cited_by_paper": False}]}
    reply = json.dumps({"items": [{"index": 1, "relevance": "should_cite", "reason": " Same question. "},
                                  {"index": 0, "relevance": "should_cite", "reason": "already cited"},
                                  {"index": 2, "relevance": "maybe", "reason": "bad label"}]})
    out = assess(prior, lambda prompt: reply)
    assert out["hits"][1]["relevance"] == "should_cite" and out["hits"][1]["reason"] == "Same question."
    assert "relevance" not in out["hits"][0] and "relevance" not in out["hits"][2]
    assert "relevance" not in prior["hits"][1]


def test_assess_rejects_non_json():
    prior = {"query": "q", "hits": [{"title": "B", "cited_by_paper": False}]}
    with pytest.raises(RuntimeError):
        assess(prior, lambda prompt: "nope")
