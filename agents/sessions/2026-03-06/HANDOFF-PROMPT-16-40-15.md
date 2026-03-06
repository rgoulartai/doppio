# Doppio — Session Handoff

**Date:** 2026-03-06
**Session Duration:** ~2.5h (14:20 → 16:40)
**Agent:** Claude Code (claude-sonnet-4-6)
**Status:** Milestone Complete — Planning & Tooling Phase Done, Scaffold Ready
**Hackathon Deadline:** Sunday March 8, 2026 at 12:00 PM EST

---

## ✅ Session Accomplishments

### What Was Built This Session

1. **Brain Dump → PRD → DISCOVERY** via m2c1 orchestration skill
   - Raw Perplexity brain dump processed into structured PRD.md
   - 7 parallel research subagents completed across all technical domains
   - DISCOVERY.md generated (3 rounds Q&A — all architectural decisions resolved, authoritative source of truth)
   - 8 implementation skill files generated for future Claude sessions

2. **Full Documentation Suite**
   - `README.md` — comprehensive: product, m2c1 workflow, all 7 subagents, Obsidian setup, .env best practices, /handoff + /pickup guide, statusline context bar
   - `CHANGELOG.md` — session-by-session log format established
   - `PROJECT_TIMELINE.md` — chronological project history with auto-update section

3. **Automation Infrastructure (3 launchd jobs)**
   - `com.kooky.doppio.timeline` — updates PROJECT_TIMELINE.md every 30 min
   - `com.kooky.doppio.autocommit` — git commit + push to GitHub every 30 min
   - `com.kooky.doppio.budget` — Playwright screenshot of credit balance, appended to Budget.md, every hour from 5pm until March 8 noon (then self-unloads)

4. **Git Repository**
   - Initialized, pushed to https://github.com/rgoulartai/doppio
   - 3 commits on `main`
   - Auto-commit job handles ongoing pushes every 30 min

5. **Content Architecture**
   - `src/content.json` — fully structured: all 9 cards with prompts, try-it URLs, clipboard fallback, curation metadata, search queries per card
   - `videoId` fields are `"TBD"` — 9 YouTube searches needed (see Next Steps)
   - "How Videos Are Curated" section in README (weighted scoring: views 35% / recency 30% / sentiment 20% / authority 15%)
   - `completionResources` array with 5 curated learning links

6. **React App Scaffolded** ⬅ NEW (not yet committed)
   - `package.json` with ALL production deps already installed:
     - `react@19`, `react-dom`, `react-router-dom@7`, `vite@7`
     - `@supabase/supabase-js@2` ✓
     - `@vercel/analytics` ✓
     - `canvas-confetti` ✓
     - `lite-youtube-embed` ✓
     - `react-hot-toast` ✓
   - Vite scaffold: `src/App.tsx`, `src/main.tsx`, `index.html`, TypeScript config
   - `vite.config.ts` basic (PWA plugin NOT yet added)
   - `node_modules/` present but NOT committed (gitignored)

7. **Budget Screenshot Tracker**
   - `scripts/budget_screenshot.py` — Playwright, headless Chrome, auth via saved cookies
   - **REQUIRES ONE-TIME SETUP:** `python3 scripts/budget_screenshot.py --setup`
   - Saves screenshots to `screenshots/budget_YYYY-MM-DD_HH-MM.png`
   - Appends to Budget.md with embedded image + balance text

---

## 📋 Task Status

### ✅ Completed
- Brain dump processing and ideation
- PRD generation
- Research wave (all 7 domains)
- DISCOVERY.md (all decisions resolved)
- 8 implementation skill files
- README, CHANGELOG, PROJECT_TIMELINE
- Git repo + GitHub push
- 3 launchd automation jobs
- content.json skeleton
- React app scaffold + all deps installed

### 🔄 In Progress / Immediate Next
- **Fill in 9 video IDs** in `src/content.json` (user action: 9 YouTube searches)
- **Budget auth setup** (user action: run setup command once before 5pm)
- **Commit the scaffold** (git add -A && commit the new React files)

### ⏭️ Pending (Implementation Phase)
- Add `vite-plugin-pwa` to vite.config.ts
- Build React components (LandingPage, LevelView, CardView, CompletionScreen)
- Implement `useProgress` hook (localStorage + Supabase sync)
- VideoCard facade component (lite-youtube-embed + TikTok fallback)
- Supabase project creation + schema migration
- Set up `.env` with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Vercel deployment + doppio.kookyos.com DNS setup
- Landing teaser video (Nano Banana — user deliverable post-UI)
- 2-minute demo video for submission (REMINDER: script based on DISCOVERY.md structure)

### 🚫 Blocked
- 9 video IDs — cannot build VideoCard component without real IDs to test
- Supabase env vars — needed before testing progress sync

---

## 🎯 Current Phase

**Phase:** Transition from Planning → Implementation
**Focus:** React app build (all planning artifacts complete)
**Next milestone:** Working UI with hardcoded content.json (no backend needed for first render)

**Hackathon timeline:**
- March 6 (now): Planning done ✓ → Start UI build tonight
- March 7: Full build day — PWA, Supabase, all components
- March 8 by 6am: App live at doppio.kookyos.com
- March 8 by noon: Submit to Skool

---

## 🔑 Key Context & Decisions

### Architecture (from DISCOVERY.md — authoritative)
- React 18 + Vite + Tailwind CSS
- `vite-plugin-pwa` v0.21.x + Workbox (CacheFirst, autoUpdate)
- Supabase anonymous auth only (`supabase.auth.signInAnonymously()`)
- localStorage first (never block UI on network) → background Supabase sync
- Merge strategy: union (additive, cards never un-completed)
- React Router v6, client-side only
- YouTube: `lite-youtube-embed` web component (facade/lazy)
- TikTok: direct iframe `https://www.tiktok.com/embed/v2/{VIDEO_ID}`
- Confetti: `canvas-confetti` on level completion only (3x max)
- Deploy: Vercel Hobby, custom domain `doppio.kookyos.com` (Hostgator DNS CNAME)
- NO backend AI processing, NO user accounts, NO app store
- Teaser video: self-hosted in `/public`, user creates in Nano Banana post-UI

### Supabase Schema (ready to apply)
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
-- RLS policies: users read/insert own rows only
```

### Routes
- `/` — landing page (teaser video + "Start Level 1" CTA)
- `/learn` — current level (reads progress from localStorage)
- `/complete` — final screen (confetti + badge + resource links)
- `/?ref=badge` — badge landing (same as `/` with banner)

### Env Vars Needed
```
VITE_SUPABASE_URL=https://<ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

### content.json Video IDs — TBD (9 searches)
Each card in `src/content.json` has `videoId: "TBD"` and `videoSearchQuery` + `videoSearchChannels`.
Criteria: 2025–2026, 50K+ views (10K for L3), under 3 min, like ratio >90%.

| Card | Search Query | Priority Channel |
|------|-------------|-----------------|
| L1C1 | `ChatGPT receipt photo meal plan 2025` | Skill Leap AI |
| L1C2 | `ChatGPT summarize PDF bullet points 2025` | Matt Wolfe |
| L1C3 | `ChatGPT professional email decline 2025` | Jeff Su |
| L2C1 | `Claude Cowork file management demo 2026` | Anthropic |
| L2C2 | `Claude agent autonomous web task 2025` | Anthropic |
| L2C3 | `Claude document form filling 2025` | Riley Brown |
| L3C1 | `Claude Cowork expense report multi-step 2026` | Anthropic |
| L3C2 | `Perplexity deep research demo 2025` | Perplexity AI |
| L3C3 | `Perplexity comparison table research 2025` | Perplexity AI |

---

## 📁 Important File Locations

| File | Purpose |
|------|---------|
| `.claude/orchestration-doppio/DISCOVERY.md` | **Source of truth** — all architectural decisions |
| `.claude/orchestration-doppio/PRD.md` | Product requirements |
| `src/content.json` | All 9 cards — edit videoId fields to fill videos |
| `.claude/skills/doppio-architecture/SKILL.md` | Load at start of every build session |
| `.claude/skills/pwa-vite-setup/SKILL.md` | Load when configuring vite-plugin-pwa |
| `.claude/skills/supabase-anonymous-progress/SKILL.md` | Load when building useProgress hook |
| `.claude/skills/video-embed-facade/SKILL.md` | Load when building VideoCard component |
| `.claude/skills/canvas-confetti-gamification/SKILL.md` | Load for completion screens |
| `.claude/skills/doppio-analytics/SKILL.md` | Load when wiring analytics events |
| `scripts/budget_screenshot.py` | Run `--setup` before 5pm for auth |
| `Budget.md` | Balance log + screenshots appended hourly from 5pm |
| `.env.example` | Copy to `.env`, fill Supabase vars |

---

## 🚀 Next Steps (Priority Order)

### Immediate (before starting next session)
1. **Run budget auth setup:** `python3 scripts/budget_screenshot.py --setup` ← before 5pm
2. **Commit scaffold:** `git add -A && git commit -m "feat: React+Vite scaffold with all deps"`
3. **Fill 9 video IDs** in `src/content.json` (YouTube, filter 2025–2026, under 3 min)

### Next Session Kickoff Prompt
```
/pickup

Then: let's start building the Doppio React app. Load the doppio-architecture skill first.
Start with: vite-plugin-pwa setup, then content.json loading hook, then LandingPage component.
All architectural decisions are in DISCOVERY.md — follow it exactly.
```

### Build Order (recommended)
1. `vite.config.ts` — add vite-plugin-pwa (use `doppio-architecture` + `pwa-vite-setup` skills)
2. `tailwind.config.js` + CSS globals
3. `src/content.json` → `useContent()` hook
4. `src/hooks/useProgress.ts` — localStorage first, Supabase background sync
5. `src/components/VideoCard.tsx` — lite-youtube-embed facade
6. `src/pages/LandingPage.tsx`
7. `src/pages/LevelPage.tsx` (cards 1-3, progress bar, try-it CTA)
8. `src/pages/CompletionPage.tsx` (confetti, badge, resources)
9. `src/App.tsx` — router wiring
10. Supabase project + schema + env vars
11. Vercel deploy + DNS
12. PWA manifest + icons (`@vite-pwa/assets-generator`)
13. Analytics events wiring

---

## 💡 Session Insights

- **m2c1 skill** was the key unlock — 2.5 hours of planning that would have taken days manually was compressed into ~1 hour via parallel subagents
- **The launchd infrastructure** (3 jobs) means the repo self-documents and self-commits throughout the hackathon — less mental overhead
- **DISCOVERY.md overrides everything** — if any decision is unclear during build, check that file first before asking
- **content.json is build-blocking** — the VideoCard component cannot be realistically tested without real video IDs. Do the 9 YouTube searches before starting the UI.
- **`lite-youtube-embed` is a web component** — it needs `import 'lite-youtube-embed'` in main.tsx and `customElements` to register before it renders

---

## ⚠️ Known Issues & Warnings

- `vite.config.ts` has NO PWA plugin yet — first thing to add next session
- `budget_auth.json` does not exist yet — script will fail until `--setup` is run
- The `phase-1/scaffold` branch was created by m2c1 and merged to main — no action needed but worth noting git history shows it
- Screenshots directory exists but is empty — first screenshot fires at 5pm today
- `node_modules/` is present and gitignored correctly — do not commit it
- Instagram Reels and X/Twitter video embeds are OUT OF SCOPE (API restrictions confirmed in DISCOVERY.md D29)
- Daily streaks are OUT OF SCOPE (confirmed DISCOVERY.md D39 — wrong mechanic for single-session app)

---

*Generated by Claude Code (claude-sonnet-4-6) | /handoff skill | 2026-03-06 16:40*
