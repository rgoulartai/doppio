# kooky-outlaw Integration Briefing

> **For:** Claude Code working on the Doppio project
> **Goal:** kooky-outlaw fetches YouTube AI videos daily, ranks top 5 for non-technical learners, writes to Supabase
> **Deadline:** MVP demo tomorrow

---

## Architecture

```
kooky-outlaw (Hostinger VPS, Docker)
  LLM: qwen2.5:7b via Ollama on RunPod (Tailscale 100.90.24.91)
  Tools: web_fetch, bash_executor
    │
    │ 1. Fetch YouTube Data API
    │ 2. LLM ranks top 5 for non-technical learners
    │ 3. POST results to Supabase
    ▼
Doppio's Supabase → youtube_ai_videos table
    ▼
Doppio frontend reads + displays
```

---

## ⚠️ Known Limitation: HEARTBEAT.md Bug

The heartbeat system has a mismatch between its parser and the engine prompt template:

- The parser extracts `instructions` from `- Instructions:` lines in HEARTBEAT.md
- The engine **ignores** `instructions` — it builds the LLM prompt using `task.get('run', '')` and `task.get('purpose', '')`, which are never populated by the parser
- Result: every heartbeat task fires with a nearly empty prompt — the bot only sees the task name

**This means HEARTBEAT.md is unreliable for complex LLM tasks out of the box.**

**For the MVP demo: use the HTTP Gateway instead.** It lets you send a full, explicit prompt in the request body. The bot receives it exactly as written.

---

## Integration Path: HTTP Gateway (use this for the MVP)

### Step 1 — Enable the Gateway on the VPS

SSH into the VPS:
```bash
ssh -i ~/.ssh/id_ed25519 root@100.94.51.9
```

Edit `/opt/kooky-outlaw/.env`, add/update:
```
ENABLE_GATEWAY=true
GATEWAY_SECRET=doppio-kooky-secret-2026   # pick any strong secret
GATEWAY_PORT=8080
```

Restart the container:
```bash
cd /opt/kooky-outlaw
docker compose up --force-recreate -d
```

Verify it's up:
```bash
curl http://localhost:8080/health
# Expected: {"status":"ok"}
```

### Step 2 — Create Supabase Table (in Doppio's Supabase project)

```sql
CREATE TABLE youtube_ai_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fetched_at TIMESTAMPTZ DEFAULT now(),
  rank INTEGER,
  title TEXT,
  channel TEXT,
  url TEXT,
  reason TEXT  -- why the bot ranked it for non-technical learners
);
```

### Step 3 — The Prompt to Send

When Doppio calls the gateway, send this as `content`:

```
Search YouTube for AI videos published in the last 7 days. Use web_fetch to call this URL:
https://www.googleapis.com/youtube/v3/search?part=snippet&q=AI+tools+beginners+tutorial&type=video&order=viewCount&publishedAfter=SEVEN_DAYS_AGO&maxResults=20&key=YOUTUBE_API_KEY

Replace SEVEN_DAYS_AGO with the ISO 8601 date 7 days ago (e.g. 2026-03-01T00:00:00Z).
Replace YOUTUBE_API_KEY with the actual key.

From the results, identify the 5 videos most useful for non-technical users who are new to AI — people who use ChatGPT like Google Search and want to learn to use AI as a real tool. Prioritize practical tutorials, demos, and explainers over research or developer content.

For each of the 5 selected videos, call web_fetch to POST to:
https://SUPABASE_REF.supabase.co/rest/v1/youtube_ai_videos

Headers: apikey: SUPABASE_ANON_KEY, Content-Type: application/json, Prefer: return=minimal
Body: {"rank": N, "title": "...", "channel": "...", "url": "https://youtube.com/watch?v=VIDEO_ID", "reason": "one sentence explaining why this helps non-technical users"}

Post each video one at a time. Confirm each POST succeeds (HTTP 201) before moving to the next.
```

Replace `YOUTUBE_API_KEY`, `SUPABASE_REF`, and `SUPABASE_ANON_KEY` with real values before sending.

### Step 4 — Call the Gateway

```bash
curl -X POST http://100.94.51.9:8080/webhook \
  -H "Content-Type: application/json" \
  -H "X-Gateway-Secret: doppio-kooky-secret-2026" \
  -d '{
    "content": "FULL PROMPT FROM STEP 3",
    "sender_id": "doppio"
  }'
```

Response: `{"queued": true, "message_id": "..."}` — the bot processes async. Watch logs:
```bash
docker compose logs -f
```

Results appear in Supabase within ~2–5 minutes (LLM + multiple web_fetch calls).

---

## Credentials Needed

| Credential | Where to get it |
|-----------|----------------|
| YouTube Data API v3 key | Google Cloud Console → APIs & Services → Credentials. Free tier: 10,000 units/day, search = 100 units, so 100 queries/day free. Enable "YouTube Data API v3". |
| Supabase URL + anon key | Doppio's Supabase project → Settings → API |
| VPS SSH key | `~/.ssh/id_ed25519` on Renato's Mac (already registered in RunPod + VPS) |
| Gateway secret | You define it — set in VPS `.env` and match in your curl call |

---

## For the Demo

Since the gateway is fire-and-forget (no synchronous result), the demo flow is:

1. **Before the demo:** Run the curl command once. Wait 2–5 minutes for results to appear in Supabase.
2. **During the demo:** Show the Doppio frontend reading from `youtube_ai_videos` table.

If you want to trigger it live during the demo, you can wrap the curl in a Doppio UI button (calls a Vercel serverless function which calls the gateway), but that's optional for MVP.

---

## VPS Access Summary

```
Hostinger VPS Tailscale IP: 100.94.51.9
SSH: ssh -i ~/.ssh/id_ed25519 root@100.94.51.9
Bot directory: /opt/kooky-outlaw/
Bot .env: /opt/kooky-outlaw/.env
Logs: cd /opt/kooky-outlaw && docker compose logs -f
Restart: cd /opt/kooky-outlaw && docker compose up --force-recreate -d
```

---

## After the MVP (Production Path)

Once the demo is done, the HEARTBEAT.md approach can be made to work properly — it just requires a one-line fix in kooky-outlaw's `engine.py` to use `task.get('instructions', '')` in the prompt template instead of `task.get('run', '')`. That fix lives in the kooky-outlaw repo and is a separate task.

The gateway approach also works long-term if triggered by a daily Vercel cron function or a GitHub Actions schedule — both are free on the plans Doppio is already on.
