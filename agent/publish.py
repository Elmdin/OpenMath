"""Supabase publisher: store finished review cards and read them back as a feed (stdlib only)."""
import json
import urllib.error
import urllib.request
from typing import Any, Callable, Mapping

from agent.agent37 import load_env

Transport = Callable[[str, str, dict, Any], Any]
TIMEOUT = 30
MAX_LIMIT = 100


def _redact(text: str, headers: Mapping[str, str]) -> str:
    """Remove any credential that a server might echo back."""
    secrets = {headers.get("apikey", ""), headers.get("Authorization", "")}
    for secret in sorted((s for s in secrets if s), key=len, reverse=True):
        text = text.replace(secret, "[redacted]")
    return text


def _urllib_transport(method: str, url: str, headers: dict, body: Any) -> Any:
    data = json.dumps(body).encode() if body is not None else None
    request = urllib.request.Request(url, data=data, method=method, headers=dict(headers))
    try:
        with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
            return json.loads(response.read().decode() or "null")
    except urllib.error.HTTPError as error:
        detail = _redact(error.read().decode(errors="replace"), headers)[:300]
        raise RuntimeError(f"Supabase HTTP {error.code}: {detail}") from error
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise RuntimeError(f"Supabase {method} failed: {_redact(str(error), headers)}") from error


def _config(env: Mapping[str, str] | None) -> tuple[str, dict]:
    """Return (table URL, headers) from env; raise if either credential is missing."""
    source = load_env() if env is None else env
    base = str(source.get("SUPABASE_URL") or "").strip().rstrip("/")
    key = str(source.get("SUPABASE_ANON_KEY") or "").strip()
    missing = [name for name, value in (("SUPABASE_URL", base), ("SUPABASE_ANON_KEY", key)) if not value]
    if missing:
        raise RuntimeError(f"Missing Supabase setting(s): {', '.join(missing)}")
    if not base.startswith(("https://", "http://")):
        raise RuntimeError("SUPABASE_URL must start with https:// or http://")
    headers = {"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json",
               "Prefer": "return=representation"}
    return f"{base}/rest/v1/papers", headers


def publish(title: str, spec: dict, env: Mapping[str, str] | None = None,
            transport: Transport | None = None) -> dict:
    """Insert one review card and return the inserted row."""
    if not isinstance(title, str) or not title.strip():
        raise ValueError("title must be a non-empty string")
    if not isinstance(spec, dict):
        raise ValueError("spec must be a dict")
    try:
        body = {"title": title.strip(), "spec": json.loads(json.dumps(spec))}
    except (TypeError, ValueError) as error:
        raise ValueError(f"spec is not JSON-serialisable: {error}") from error
    url, headers = _config(env)
    rows = (transport or _urllib_transport)("POST", url, headers, body)
    if not isinstance(rows, list) or not rows or not isinstance(rows[0], dict):
        raise RuntimeError("Supabase insert returned no row")
    return rows[0]


def latest(limit: int = 10, env: Mapping[str, str] | None = None,
           transport: Transport | None = None) -> list:
    """Return the newest published cards (id, created_at, title), newest first."""
    if isinstance(limit, bool) or not isinstance(limit, int) or not 1 <= limit <= MAX_LIMIT:
        raise ValueError(f"limit must be an integer between 1 and {MAX_LIMIT}")
    url, headers = _config(env)
    query = f"?select=id,created_at,title&order=created_at.desc&limit={limit}"
    rows = (transport or _urllib_transport)("GET", url + query, headers, None)
    if not isinstance(rows, list):
        raise RuntimeError("Supabase feed response was not a list")
    return rows
