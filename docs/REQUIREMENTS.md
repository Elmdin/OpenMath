# Hackathon requirements

"Build an Agent" Hackathon, Corgi Cafe (office area), 9 Claude Ln, San Francisco, 7 Oct 2026.
Source: the event page, https://luma.com/b54ojqhl. Judging criteria are announced at kickoff
and are NOT published; fill in the section at the bottom when known.

## Hard requirements
- [ ] Uses Agent37 Cloud APIs (mandatory for prize eligibility)
- [ ] Uses at least one sponsor in the app: OpenAI, Supabase, InstaCloud, Monid ("the more, the better")
- [ ] Submitted by 4:40 PM with:
  - [ ] team members
  - [ ] the workflow replaced
  - [ ] demo video link
  - [ ] sponsor integrations used
  - [ ] live project or repo link (judges must open it without requesting access)
  - [ ] at most five files, 10 MB each
- [ ] Repo made public before submitting (it is private now), or a live link submitted instead

## Theme
"What's the workflow you never want to do again?" They want agents you can sell.
Finalists show: what they replaced, how the agent works, how much time it saves.

## Schedule
2:00 doors · 2:20 kickoff · 2:30 build · 4:40 submissions close · 4:50 finalist demos ·
5:20 winners · 5:30 wrap

## Sponsor plan (build in this order; stop when time runs out)
| # | Sponsor | Job in the app | Needed for |
|---|---|---|---|
| 1 | Agent37 | The unattended worker: takes a paper, runs the pipeline, returns the briefing | Eligibility |
| 2 | OpenAI | Structured output: claim, status label, picture spec, open questions | Eligibility (one sponsor) |
| 3 | Supabase | Stores finished briefings; the page reads them as a feed | Core demo |
| 4 | Monid | The agent's tool access: search for prior work on the result (e.g. via Exa) for a "prior work" panel | Bonus; answers the attribution concern |
| 5 | InstaCloud | Hosts the web app, giving the live link judges can open | Bonus; replace with any host if setup is slow |

Notes: Monid offers Skill, MCP or CLI integration, usage-billed, $1 free credit for new users.
InstaCloud setup is `npx -y insta@latest setup agent`; pricing and free tier not confirmed.
Neither has been tried by us.

## What the pitch must answer
- **Workflow replaced:** making sense of a machine-written math paper by hand: finding the
  claim, checking its verification status, and building a picture of it.
- **How it works:** paper in, briefing and playable picture out, no human step, with a self-check.
- **Time saved:** measure on the demo paper before stating a number.
- **Who buys it:** see below.

## Who would pay (hypotheses, none validated)
- Journals and preprint servers triaging machine-written submissions
- Research labs and R&D teams tracking AI-generated results in their field
- University departments (site licence)
Mathematics is the first demonstration; the same shape fits any field where agents write
papers faster than people can read them. No customer has been asked yet.

## Ask at kickoff
- Judging criteria: originality, business use case, working prototype, user experience (as relayed during the build)
- Team size, solo entry allowed: ______
- Prior work / pre-written code allowed: ______
- How the $100 OpenAI credits are delivered: ______
