"""Minimal Agent37 client (stdlib only). Docs: https://www.agent37.com/docs/llms-full.txt

The hosting API creates instances; each instance serves its own chat API at {id}.agent37.app.
"""
import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

HOSTING = "https://api.agent37.com"


class Agent37Error(RuntimeError):
    pass


def load_env(path=".env"):
    """Read KEY=VALUE lines into a dict, without touching os.environ."""
    env = dict(os.environ)
    file = Path(path)
    if file.is_file():
        for line in file.read_text(encoding="utf-8").splitlines():
            if "=" in line and not line.lstrip().startswith("#"):
                key, value = line.split("=", 1)
                env.setdefault(key.strip(), value.strip().strip("'\""))
    return env


def _call(method, url, headers, body=None, timeout=60):
    data = json.dumps(body).encode() if body is not None else None
    request = urllib.request.Request(url, data=data, method=method,
                                     headers={"Content-Type": "application/json", **headers})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return json.loads(response.read().decode() or "{}")
    except urllib.error.HTTPError as error:
        detail = error.read().decode(errors="replace")[:500]
        raise Agent37Error(f"{method} {url} -> HTTP {error.code}: {detail}") from error
    except (urllib.error.URLError, TimeoutError) as error:
        raise Agent37Error(f"{method} {url} failed: {error}") from error


class Agent37:
    def __init__(self, api_key):
        if not api_key or not api_key.startswith("sk_"):
            raise Agent37Error("AGENT37_API_KEY is missing or malformed")
        self._key = api_key

    def list_instances(self):
        return _call("GET", f"{HOSTING}/v1/instances", {"Authorization": f"Bearer {self._key}"}).get("data", [])

    def create_instance(self, name, credit_micros):
        body = {"template": "agent37-hermes", "name": name, "user": "openmath",
                "budget": {"credit_micros": credit_micros}}
        return _call("POST", f"{HOSTING}/v1/instances", {"Authorization": f"Bearer {self._key}"}, body, timeout=300)

    def _instance(self, instance_id, method, path, body=None, timeout=60):
        return _call(method, f"https://{instance_id}.agent37.app{path}", {"X-Agent37-Key": self._key}, body, timeout)

    def wait_healthy(self, instance_id, attempts=40, delay=5):
        for _ in range(attempts):
            try:
                if self._instance(instance_id, "GET", "/v1/health").get("healthy") is True:
                    return
            except Agent37Error:
                pass
            time.sleep(delay)
        raise Agent37Error(f"instance {instance_id} did not become healthy")

    def models(self, instance_id):
        return self._instance(instance_id, "GET", "/v1/models")

    def respond(self, instance_id, prompt, model=None, timeout=600):
        body = {"input": prompt, "stream": False, **({"model": model} if model else {})}
        result = self._instance(instance_id, "POST", "/v1/responses", body, timeout)
        if result.get("status") != "completed":
            raise Agent37Error(f"turn ended as {result.get('status')}: {result.get('error')}")
        return result


def extract_json(text):
    """Agents wrap answers in prose or code fences; return the outermost {...} block."""
    start, end = text.find("{"), text.rfind("}")
    if start == -1 or end <= start:
        raise Agent37Error(f"no JSON object in agent output: {text[:200]!r}")
    return text[start:end + 1]


def make_model(api_key, model=None, instance_name="openmath-auditor", credit_micros=1_000_000):
    """Find or create the worker instance and return a prompt -> JSON text callable that runs on it."""
    client = Agent37(api_key)
    existing = [i for i in client.list_instances() if i.get("name") == instance_name]
    instance = existing[0] if existing else client.create_instance(instance_name, credit_micros)
    client.wait_healthy(instance["id"])

    def call(prompt):
        return extract_json(client.respond(instance["id"], prompt, model=model)["output_text"])

    call.instance_id = instance["id"]
    return call
