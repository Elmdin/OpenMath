# Setup checklist

## Only you can do these (accounts and keys)
- [ ] Agent37: sign up, create an API key (`sk_live_...`). Ask at kickoff for hackathon credits.
- [ ] Create one Agent37 instance now and wait for health; cold start is the main demo risk.
- [ ] OpenAI: API key with credit. Ask the OpenAI people at kickoff about hackathon credits.
- [ ] Supabase: new project, run `supabase/schema.sql`, copy the URL and anon key.
- [x] GitHub: repo `Elmdin/OpenMath` (created; currently private, make it public before submitting if the rules need a public repo). Do not push anything from naturefind (private).
- [ ] `cp .env.example .env` and fill it in.

## Agent37 calls (from https://www.agent37.com/docs/llms-full.txt, not yet run by us)
- Create: `POST https://api.agent37.com/v1/instances`, header `Authorization: Bearer <key>`,
  body `{ user, name, budget: { credit_micros } }` -> returns `id`
- Health: `GET https://<id>.agent37.app/v1/health`, header `X-Agent37-Key`, wait for `healthy: true`
- Run:    `POST https://<id>.agent37.app/v1/responses`, header `X-Agent37-Key`, body `{ input }`
          -> check `status === "completed"`, read `output_text`

## Machine
Node 22 and Python 3.13 were confirmed in the cloud workspace only. Your laptop was not checked.

## Ask at kickoff (2:20 PM)
- Judging criteria, and whether prior work or ideas are allowed
- Team size
- Whether credits are provided for Agent37 and OpenAI

## Schedule
2:30 build starts · 4:40 submissions close · 4:50 finalist demos
