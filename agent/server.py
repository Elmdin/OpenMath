"""Local app server: serves web/ and answers questions about one result through Agent37.

    python -m agent.server            # http://127.0.0.1:8765

Binds to 127.0.0.1 only. The API key stays on this machine; the browser never sees it.
"""
import json
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from agent.agent37 import Agent37, Agent37Error, extract_json, load_env
from agent import publish
from agent.card import build_card
from agent.run import EXAMPLE

MAX_BODY = 8_000
MAX_QUESTION = 600
MAX_PROOF_CHARS = 7_000

PROMPT = """You are a patient tutor helping a mathematician review one step of a machine-written paper.
Answer the question about this step in at most 130 words of plain language. Write mathematics in
LaTeX between \\( and \\). Do not use tools, do not browse, do not write files. Do not say whether the
proof is correct; say what it claims and how it fits. If the text below does not answer the question,
say so.

Paper: {paper}
Section: {section}
{kind} {label}{title}
It relies on: {deps}

Statement:
{statement}

Proof:
{proof}

Question: {question}"""


TEST_PROMPT = """You are helping a mathematician sanity-check one step of a machine-written paper by experiment.
Write a short Python 3 script (standard library only, exact arithmetic with fractions or integers,
under 60 lines, finishing in under 20 seconds) that tests the statement below on small concrete
cases, then RUN it in your sandbox with your code-execution tool. Reply in this exact layout:

WHAT I TESTED: one or two plain sentences.
SCRIPT:
<the script you ran>
OUTPUT:
<the real output, copied exactly, at most 25 lines>
READING: one or two sentences on what the output does and does not show. Small cases are not a proof.

If the statement cannot be tested numerically (for example it is purely asymptotic or its
objects are not computable), say so in one sentence instead and do not invent output. If you
could not actually run code, say that plainly.

Paper: {paper}
{kind} {label}{title}

Statement:
{statement}

Proof (for the definitions it uses):
{proof}

{question}"""


SHOW_PROMPT = """You are choosing a picture to help a mathematician understand one step of a paper about
Egyptian fractions (writing a/b as a sum of distinct unit fractions). You cannot draw. You pick
one picture from this library and its inputs, and the page draws it exactly:

- "shortest": a glass filled to a/b using the fewest distinct unit-fraction cups.
- "greedy": the greedy procedure on a/b, one bar per step, showing denominators exploding.
- "none": no picture in the library fits this step.

Choose the fraction a/b (integers, 1 <= a < b <= 200) that best illustrates THIS step, not a
generic one. Reply with JSON only:
{{"picture": "shortest" | "greedy" | "none", "a": <int>, "b": <int>, "caption": "<one or two plain sentences: what to notice, and how it relates to this step>"}}
For "none", set a and b to 1 and 2 and use the caption to say why no picture fits.

Paper: {paper}
{kind} {label}{title}

Statement:
{statement}

Proof:
{proof}

{question}"""

PICTURES = ("shortest", "greedy", "none")


def parse_spec(raw):
    """Validate the agent's picture choice; the page only ever draws from this fixed library."""
    try:
        spec = json.loads(extract_json(raw))
    except (Agent37Error, json.JSONDecodeError) as error:
        raise ValueError(f"picture spec is not JSON: {error}") from error
    picture, a, b, caption = spec.get("picture"), spec.get("a"), spec.get("b"), spec.get("caption")
    if picture not in PICTURES:
        raise ValueError("unknown picture")
    if not all(isinstance(v, int) and not isinstance(v, bool) for v in (a, b)) or not 1 <= a < b <= 200:
        raise ValueError("need integers with 1 <= a < b <= 200")
    if not isinstance(caption, str) or not caption.strip():
        raise ValueError("missing caption")
    return {"picture": picture, "a": a, "b": b, "caption": caption.strip()[:400]}


def build_prompt(card, label, question, mode="ask"):
    """Validate the request and build the tutor prompt; raises ValueError with a user-facing message."""
    nodes = {node["label"]: node for node in card["map"]["nodes"]}
    if not isinstance(label, str) or label not in nodes:
        raise ValueError("unknown result")
    if not isinstance(question, str) or not question.strip():
        raise ValueError("ask a question first")
    if len(question) > MAX_QUESTION:
        raise ValueError(f"keep the question under {MAX_QUESTION} characters")
    node = nodes[label]
    proof = node["proof"] or "(no proof text)"
    if len(proof) > MAX_PROOF_CHARS:
        proof = proof[:MAX_PROOF_CHARS] + "\n[proof truncated]"
    if mode not in ("ask", "test", "show"):
        raise ValueError("unknown mode")
    template = {"ask": PROMPT, "test": TEST_PROMPT, "show": SHOW_PROMPT}[mode]
    return template.format(paper=card["paper"], section=node["section"] or "(none)", kind=node["kind"].capitalize(),
                         label=label, title=f" ({node['title']})" if node["title"] else "",
                         deps=", ".join(node["deps"]) or "nothing else", statement=node["statement"],
                         proof=proof, question=question.strip())


class Handler(SimpleHTTPRequestHandler):
    card = None
    ask = None  # callable prompt -> answer text

    def _send(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path != "/api/feed":
            return super().do_GET()
        try:
            rows = publish.latest(8)
        except (RuntimeError, ValueError) as error:
            print(f"feed failed: {error}", file=sys.stderr)
            return self._send(502, {"success": False, "data": None, "error": "the feed is not reachable"})
        return self._send(200, {"success": True, "data": rows, "error": None, "meta": {"limit": 8}})

    def do_POST(self):
        if self.path != "/api/ask":
            return self._send(404, {"success": False, "data": None, "error": "not found"})
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            length = -1
        if not 0 < length <= MAX_BODY:
            return self._send(413, {"success": False, "data": None, "error": "request too large or empty"})
        try:
            body = json.loads(self.rfile.read(length))
            if not isinstance(body, dict):
                raise ValueError("send a JSON object")
            mode = body.get("mode", "ask")
            prompt = build_prompt(self.card, body.get("label"), body.get("question"), mode)
        except (ValueError, UnicodeDecodeError) as error:
            return self._send(400, {"success": False, "data": None, "error": str(error)})
        try:
            answer = self.ask(prompt)
        except Agent37Error as error:
            print(f"ask failed: {error}", file=sys.stderr)
            return self._send(502, {"success": False, "data": None, "error": "the agent did not answer; try again"})
        data = {"answer": answer, "provider": "agent37", "mode": mode}
        if mode == "show":
            try:
                data = {**data, "spec": parse_spec(answer)}
            except ValueError as error:
                print(f"bad picture spec: {error}", file=sys.stderr)
                return self._send(502, {"success": False, "data": None, "error": "the agent chose a picture we cannot draw; try again"})
        return self._send(200, {"success": True, "data": data, "error": None})


def make_ask(env):
    client = Agent37(env.get("AGENT37_API_KEY"))
    found = [i for i in client.list_instances() if i.get("name") == "openmath-auditor"]
    if not found:
        raise Agent37Error("no openmath-auditor instance; run python -m agent.run first")
    instance_id = found[0]["id"]
    client.wait_healthy(instance_id)
    return lambda prompt: client.respond(instance_id, prompt)["output_text"].strip()


def main(paper_dir="data/family-025", port=8765):
    Handler.card = build_card(paper_dir, "thm:main", EXAMPLE)
    Handler.ask = staticmethod(make_ask(load_env()))
    web = Path(__file__).resolve().parents[1] / "web"
    server = ThreadingHTTPServer(("127.0.0.1", port), partial(Handler, directory=str(web)))
    print(f"OpenMath on http://127.0.0.1:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()


if __name__ == "__main__":
    main()
