# Doppio — Session Handoff

**Date:** 2026-03-06
**Session Duration:** ~16:40 → 18:00 (this session)
**Agent:** Claude Code (claude-sonnet-4-6)
**Status:** User Request — video search complete, awaiting approval to write content.json
**Hackathon Deadline:** Sunday March 8, 2026 at 12:00 PM EST

---

## ✅ Session Accomplishments

1. **Budget screenshot tracker — fully fixed and working**
   - Fixed `/usr/bin/python3` → `/usr/local/bin/python3` in launchd plist (playwright was missing)
   - Fixed `wait_until="networkidle"` → `"domcontentloaded"` + 3s JS wait (page timeout)
   - Fixed crop logic: now walks DOM to find balance container, uses `page.screenshot(clip=...)` instead of element screenshot
   - Result: clean cropped screenshot of just the "$123.44 Remaining Balance" card
   - Confirmed working at 17:13 and 17:24 — Budget.md has entries

2. **DISCOVERY.md — 3 new decisions documented (D62, D63, D51 updated)**
   - D62: TikTok ✅ Instagram ❌ — technical reason (Facebook App OAuth token required, infeasible client-side)
   - D63: Webpages as optional `resourceLink` per card + expanded `completionResources`
   - D51: Instagram exclusion note updated to reference D62

3. **content.json schema expanded**
   - Added `resourceLink: { title, url } | null` field to all 9 cards
   - 6 cards have real links (Anthropic docs, Perplexity guides, OpenAI help)
   - `completionResources` expanded: 5 → 7 entries, added Anthropic Claude Courses + Google AI Essentials
   - Added `type` field to each completion resource (`course` / `youtube` / `community`)

4. **PRD.md updated**
   - Status changed to "Superseded by DISCOVERY.md"
   - Instagram Reels + X/Twitter struck through with D62 reference
   - Open questions resolved inline
   - Note at top explaining authority hierarchy

5. **README.md — 2 new sections added**
   - "MCP Servers That Made This Possible" — 7 MCPs actually used in this project (accurate, not exhaustive install list)
   - "Full Autonomy Mode: --dangerously-skip-permissions" — command, pros/cons, why user doesn't use it (written in first person: approvals are checkpoints for staying aligned with DISCOVERY.md)

6. **Video search — all 9 cards researched**
   - Ran 5 parallel search passes across YouTube and TikTok
   - Discovered key constraint: 50K views + <3 min + 2025-2026 barely exists
   - User approved Option A (relax view count thresholds)
   - Final candidates identified — awaiting user approval before writing to content.json

---

## 📋 Task Status

### ✅ Completed This Session
- Budget screenshot tracker: auth setup + Python path fix + crop fix
- DISCOVERY.md: D62, D63 added
- content.json: resourceLink schema added
- PRD.md: superseded note + Instagram strikethrough
- README.md: MCP section + dangerously-skip-permissions section
- Video search: all 9 candidates found

### 🔄 Pending User Approval
- **Write 9 video IDs to content.json** — full table presented, awaiting "approve all 9"

### ⏭️ Next (Implementation Phase)
- `vite.config.ts` — add vite-plugin-pwa
- `tailwind.config.js` + CSS globals
- `src/hooks/useProgress.ts` — localStorage-first + Supabase background sync
- `src/components/VideoCard.tsx` — lite-youtube-embed facade + TikTok iframe
- Pages: LandingPage → LevelPage → CompletionPage
- `src/App.tsx` — React Router v6 wiring
- Supabase env vars setup (user needs to provide VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY)
- Vercel deploy + doppio.kookyos.com DNS

---

## 🎯 IMMEDIATE NEXT ACTION

**Approve or reject the 9 video candidates, then write to content.json.**

Full table (presented at end of last session):

| Card | Title | Channel | ID | Views | Date | Duration |
|------|-------|---------|-----|-------|------|----------|
| L1C1 | How to Upload Photos in ChatGPT | Click & Play | `A-o__WKlAWg` | 2K | Apr 2025 | 2:14 |
| L1C2 | How To Upload Files To ChatGPT | Matt Crawford | `3KVir824798` | 1.5K | Sep 2025 | 2:41 |
| L1C3 | How To Use ChatGPT for Gmail 2025 | Learn with Freddie | `rnh0M3qqSgc` | 393 | Jun 2025 | 2:30 |
| L2C1 | First Look at Claude Cowork | Datadog Community | `gT8GyrZ__Mw` | 107 | Jan 2026 | 12:50 |
| L2C2 | Claude AI Browser Agent: Automate ANYTHING? | Julian Goldie SEO | `2pUJG-M0Cu4` | 3.7K | Dec 2025 | 8:30 |
| L2C3 | Process Receipts with AI (Claude Cowork) | Hector Garcia CPA | `5C-d-8LSEI4` | 1.9K | Jan 2026 | 7:48 |
| L3C1 | Claude Cowork: The AI That Actually Does Your Work | The Tech Girl | `pXR_bShli10` | 237K | Feb 2026 | 8:56 |
| L3C2 | How to Use Perplexity's Deep Research | Andy Stapleton | `UobQwGTli5w` | 72K | Mar 2025 | 9:37 |
| L3C3 | Every Perplexity AI Feature Explained | Skill Leap AI | `LnURCxwsB34` | 136K | Aug 2025 | 19:47 |

**Note on L3C3**: 19:47 duration — longest in the set. Skill Leap AI is a priority channel (136K views). If user wants shorter, swap to GODWIN TECH (`XwQLF7ziRS4`, 483 views, 15:47).

---

## 🔑 Key Context & Decisions

### Architecture (unchanged — DISCOVERY.md is authoritative)
- React 18 + Vite + Tailwind CSS
- `vite-plugin-pwa` v0.21.x + Workbox
- Supabase anonymous auth only
- localStorage-first → background Supabase sync
- YouTube: `lite-youtube-embed` web component
- TikTok: direct iframe `https://www.tiktok.com/embed/v2/{VIDEO_ID}`
- Confetti: `canvas-confetti` on level completion only
- Deploy: Vercel Hobby → `doppio.kookyos.com`

### content.json Schema (current)
Each card now has:
- `videoPlatform`: `"youtube"` or `"tiktok"`
- `videoId`: 11-char ID (currently `"TBD"` for all 9)
- `resourceLink`: `{ title, url }` or `null`
- `badge`: `null`

### Budget Tracker (fixed and running)
- Fires every hour at `:00` via launchd
- Window: March 6 5pm → March 8 noon
- Python path: `/usr/local/bin/python3`
- Auth: `scripts/budget_auth.json` (59 cookies)
- Output: `screenshots/budget_YYYY-MM-DD_HH-MM.png` (cropped balance card)
- Log: `scripts/budget_screenshot.log`

### Supabase Schema (ready to apply — not yet done)
```sql
create table public.user_progress (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  level        smallint not null check (level between 1 and 3),
  card         smallint not null check (card between 1 and 3),
  completed_at timestamptz not null default now(),
  constraint unique_user_level_card unique (user_id, level, card)
);
alter table public.user_progress enable row level security;
```

---

## 📁 Important File Locations

| File | Purpose |
|------|---------|
| `.claude/orchestration-doppio/DISCOVERY.md` | **Source of truth** |
| `src/data/content.json` | All 9 cards — videoId fields still TBD |
| `scripts/budget_screenshot.py` | Budget tracker (fixed) |
| `scripts/budget_screenshot.log` | Tracker run log |
| `screenshots/` | Hourly balance screenshots |
| `Budget.md` | Balance log with embedded screenshots |
| `agents/sessions/2026-03-06/HANDOFF-PROMPT-17-59-00.md` | This file |

---

## 🚀 Next Session Kickoff

```
/pickup

Then: approve or swap any of the 9 video candidates in the table above.
Once approved, write all videoIds to src/data/content.json and start the UI build.
Load doppio-architecture skill first, then pwa-vite-setup.
```

### Build Order After Videos
1. `vite.config.ts` — add vite-plugin-pwa
2. `tailwind.config.js` + CSS globals
3. `src/hooks/useProgress.ts`
4. `src/components/VideoCard.tsx`
5. `src/pages/LandingPage.tsx`
6. `src/pages/LevelPage.tsx`
7. `src/pages/CompletionPage.tsx`
8. `src/App.tsx` — router wiring
9. Supabase env vars + schema apply
10. Vercel deploy + DNS

---

## ⚠️ Known Issues & Warnings

- All 9 `videoId` fields in `content.json` are still `"TBD"` — blocking VideoCard component testing
- User needs to create Supabase project and provide `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
- L1 ChatGPT videos have low view counts (best available for 2025 — user approved Option A)
- L3C3 video is 19:47 (long) — user may want to swap
- `vite.config.ts` has NO PWA plugin yet
- `.gitignore` has uncommitted modifications (minor)
- Hackathon deadline: **March 8, 2026 noon EST** (~42 hours from now)

---

*Generated by Claude Code (claude-sonnet-4-6) | /handoff skill | 2026-03-06 17:59*
