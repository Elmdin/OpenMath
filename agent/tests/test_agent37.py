import pytest

from agent.agent37 import Agent37, Agent37Error, extract_json, load_env


def test_extract_json_strips_fences_and_prose():
    assert extract_json('Here you go:\n```json\n{"flags": []}\n```\nDone.') == '{"flags": []}'


def test_extract_json_without_object_raises():
    with pytest.raises(Agent37Error):
        extract_json("no braces here")


def test_client_rejects_missing_key():
    with pytest.raises(Agent37Error):
        Agent37("")


def test_load_env_reads_file_without_overriding_environment(tmp_path, monkeypatch):
    env_file = tmp_path / ".env"
    env_file.write_text("# comment\nA_KEY='from-file'\nB_KEY=also\n")
    monkeypatch.setenv("A_KEY", "from-env")
    env = load_env(env_file)
    assert env["A_KEY"] == "from-env" and env["B_KEY"] == "also"
