import io
import urllib.error

import pytest

from agent import publish as module
from agent.publish import latest, publish

ENV = {"SUPABASE_URL": "https://example.supabase.co/", "SUPABASE_ANON_KEY": "anon-secret"}


class FakeTransport:
    def __init__(self, result=None, error=None):
        self.result, self.error, self.calls = result, error, []

    def __call__(self, method, url, headers, body):
        self.calls.append((method, url, headers, body))
        if self.error:
            raise self.error
        return self.result


def test_publish_posts_row_and_returns_it():
    row = {"id": 7, "created_at": "2026-10-07T00:00:00Z", "title": "Family 025", "spec": {"a": 1}}
    transport = FakeTransport([row])
    spec = {"a": 1, "nested": {"b": [1, 2]}}
    assert publish(" Family 025 ", spec, env=ENV, transport=transport) == row
    method, url, headers, body = transport.calls[0]
    assert method == "POST"
    assert url == "https://example.supabase.co/rest/v1/papers"
    assert headers == {"apikey": "anon-secret", "Authorization": "Bearer anon-secret",
                       "Content-Type": "application/json", "Prefer": "return=representation"}
    assert body == {"title": "Family 025", "spec": spec}


def test_publish_does_not_mutate_or_share_arguments():
    spec = {"nested": {"b": [1]}}
    transport = FakeTransport([{"id": 1}])
    publish("t", spec, env=ENV, transport=transport)
    sent = transport.calls[0][3]["spec"]
    sent["nested"]["b"].append(2)
    assert spec == {"nested": {"b": [1]}}
    assert ENV == {"SUPABASE_URL": "https://example.supabase.co/", "SUPABASE_ANON_KEY": "anon-secret"}


def test_latest_builds_feed_query():
    rows = [{"id": 2, "created_at": "x", "title": "b"}, {"id": 1, "created_at": "w", "title": "a"}]
    transport = FakeTransport(rows)
    assert latest(limit=5, env=ENV, transport=transport) == rows
    method, url, headers, body = transport.calls[0]
    assert method == "GET" and body is None
    assert url == ("https://example.supabase.co/rest/v1/papers"
                   "?select=id,created_at,title&spec->card=not.is.null&order=created_at.desc&limit=5")
    assert headers["apikey"] == "anon-secret"


@pytest.mark.parametrize("title", ["", "   ", None, 3])
def test_publish_rejects_bad_title(title):
    transport = FakeTransport([{}])
    with pytest.raises(ValueError, match="title"):
        publish(title, {}, env=ENV, transport=transport)
    assert transport.calls == []


@pytest.mark.parametrize("spec", [None, "{}", [1], {"x": object()}])
def test_publish_rejects_bad_spec(spec):
    with pytest.raises(ValueError, match="spec"):
        publish("t", spec, env=ENV, transport=FakeTransport([{}]))


@pytest.mark.parametrize("limit", [0, 101, -1, 1.5, "10", True, None])
def test_latest_rejects_bad_limit(limit):
    with pytest.raises(ValueError, match="limit"):
        latest(limit=limit, env=ENV, transport=FakeTransport([]))


@pytest.mark.parametrize("env,name", [
    ({"SUPABASE_ANON_KEY": "k"}, "SUPABASE_URL"),
    ({"SUPABASE_URL": "https://x.supabase.co"}, "SUPABASE_ANON_KEY"),
    ({"SUPABASE_URL": " ", "SUPABASE_ANON_KEY": ""}, "SUPABASE_URL, SUPABASE_ANON_KEY"),
])
def test_missing_env_raises_without_calling(env, name):
    transport = FakeTransport([])
    with pytest.raises(RuntimeError, match=name):
        latest(env=env, transport=transport)
    assert transport.calls == []


def test_bad_url_scheme_rejected():
    with pytest.raises(RuntimeError, match="SUPABASE_URL"):
        latest(env={"SUPABASE_URL": "example.supabase.co", "SUPABASE_ANON_KEY": "k"}, transport=FakeTransport([]))


def test_transport_errors_propagate():
    boom = RuntimeError("Supabase HTTP 404: relation does not exist")
    with pytest.raises(RuntimeError, match="HTTP 404"):
        latest(env=ENV, transport=FakeTransport(error=boom))
    with pytest.raises(RuntimeError, match="HTTP 404"):
        publish("t", {}, env=ENV, transport=FakeTransport(error=boom))


@pytest.mark.parametrize("result", [[], None, {"id": 1}, ["x"]])
def test_publish_rejects_empty_or_odd_response(result):
    with pytest.raises(RuntimeError, match="no row"):
        publish("t", {}, env=ENV, transport=FakeTransport(result))


def test_latest_rejects_non_list_response():
    with pytest.raises(RuntimeError, match="not a list"):
        latest(env=ENV, transport=FakeTransport({"message": "nope"}))


def test_default_transport_reports_status_and_truncated_body_without_key(monkeypatch):
    payload = ("echo anon-secret " + "x" * 1000).encode()

    def fake_urlopen(request, timeout):
        assert timeout == 30
        raise urllib.error.HTTPError(request.full_url, 404, "Not Found", {}, io.BytesIO(payload))

    monkeypatch.setattr(module.urllib.request, "urlopen", fake_urlopen)
    with pytest.raises(RuntimeError) as caught:
        latest(limit=1, env=ENV)
    message = str(caught.value)
    assert message.startswith("Supabase HTTP 404: ")
    assert "anon-secret" not in message
    assert len(message) <= len("Supabase HTTP 404: ") + 300


def test_default_transport_wraps_network_failure(monkeypatch):
    def fake_urlopen(request, timeout):
        raise urllib.error.URLError("no route")

    monkeypatch.setattr(module.urllib.request, "urlopen", fake_urlopen)
    with pytest.raises(RuntimeError, match="Supabase GET failed"):
        latest(limit=1, env=ENV)
