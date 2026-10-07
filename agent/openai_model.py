"""OpenAI as the audit model: prompt in, JSON text out (stdlib only)."""
import json
import urllib.error
import urllib.request

URL = "https://api.openai.com/v1/chat/completions"


def make_model(api_key, model="gpt-5.5", timeout=300):
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is missing")

    def call(prompt):
        body = {"model": model, "messages": [{"role": "user", "content": prompt}],
                "response_format": {"type": "json_object"}}
        request = urllib.request.Request(URL, data=json.dumps(body).encode(), method="POST", headers={
            "Authorization": f"Bearer {api_key}", "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(request, timeout=timeout) as response:
                return json.loads(response.read())["choices"][0]["message"]["content"]
        except urllib.error.HTTPError as error:
            raise RuntimeError(f"OpenAI HTTP {error.code}: {error.read().decode(errors='replace')[:400]}") from error
        except (urllib.error.URLError, TimeoutError, KeyError, IndexError) as error:
            raise RuntimeError(f"OpenAI call failed: {error}") from error

    return call
