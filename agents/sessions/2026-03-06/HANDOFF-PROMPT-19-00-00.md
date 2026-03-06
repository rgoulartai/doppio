# Doppio — Session Handoff (Merged)

**Date:** 2026-03-06
**Session:** Two parallel instances merged into one
**Agent:** Claude Code (claude-sonnet-4-6)
**Status:** Phase 2 halfway done, analytics foundation built — ready for Task 2.3
**Hackathon Deadline:** Sunday March 8, 2026 at 12:00 PM EST

---

## ✅ Completed (7/29 tasks)

### Phase 1: Scaffolding & Infrastructure — COMPLETE ✅
- **1.1** React 19 + Vite 7 + Tailwind v3 + React Router v7 scaffolded
- **1.2** vite-plugin-pwa, 4 icon sizes, iOS/Android install banners
- **1.3** Supabase schema (user_progress + analytics_events + RLS), supabase.ts + auth.ts
- **1.4** vercel.json (CSP headers + SPA rewrites), deployed to https://doppio-gold.vercel.app
- **1.R** Regression passed. Tag: `v0.1.0-phase1-complete`

### Phase 2: Content Layer — In Progress
- **2.1** src/types/content.ts (4 interfaces), content.json (9 cards + 5 resources), resolveJsonModule
- **2.2** All 9 YouTube video IDs — official Anthropic/Perplexity channels, all verified embeddable

### Analytics Foundation (Task 5.1 partial)
- **src/lib/analytics.ts** — `track()` with session_id in sessionStorage, silent fail
- **src/hooks/usePageTracking.ts** — `page_view` fires on every route change
- **src/App.tsx** — split into AppRoutes (inside Router) + App, usePageTracking wired

---

## 📹 Final Video IDs (content.json — official channels)

| Card | Video ID | Title | Duration |
|------|----------|-------|----------|
| L1C1 | `yo42ayzL41U` | AI fridge photo meal plan | 1:08 |
| L1C2 | `SlZLZRJ450M` | Upload PDF to ChatGPT | 2:15 |
| L1C3 | `MFuvf3JxEQ0` | ChatGPT professional email | 4:21 |
| L2C1 | `d6iawCYuuEE` | Claude Cowork: Organize Desktop | 1:13 |
| L2C2 | `rBJnWMD0Pho` | Anthropic official: Claude in browser | 1:36 |
| L2C3 | `jqx18KgIzAE` | Anthropic official: Claude computer use | 2:05 |
| L3C1 | `UAmKyyZ-b9E` | Anthropic official: Introducing Cowork | 1:09 |
| L3C2 | `Z1_M2XtsUwY` | Perplexity official: Deep Research | 0:54 |
| L3C3 | `YeldJ4UezDQ` | Perplexity official: Introducing Comet | 1:13 |

---

## ✅ Human Actions Done
- Supabase anonymous sign-ins: ENABLED ✅
- Hostgator DNS A record: doppio → 76.76.21.21 ✅

---

## 🎯 Next Steps (in order)

1. **Task 2.3** — Verify Try-it URL patterns (ChatGPT/Claude/Perplexity ?q= pre-fill via Playwright)
2. **Task 2.R** — Phase 2 regression
3. **Task 3.1** — Landing Page
4. **Task 3.2** — VideoCard component (lite-youtube-embed facade)
5. **Task 3.3** — "Try it" CTA button + remaining track() calls
6. **Task 3.4** — useProgress hook (localStorage-first + Supabase sync)
7. Continue through Phases 4–6

---

## 🔑 Key Context

### Production
- Live: https://doppio-gold.vercel.app (working)
- Target: https://doppio.kookyos.com (DNS may still be propagating)

### Supabase
- Project ref: `tqknjbjvdkipszyghfgj`
- URL: `https://tqknjbjvdkipszyghfgj.supabase.co`
- Anon key in `.env.local` (gitignored)
- Anonymous auth: ENABLED ✅
- Tables: user_progress + analytics_events (both with RLS)

### Vercel
- CLI authenticated as `renatog-1103`
- Deploy: `vercel --prod --yes`

### Git
- Branch: `main`
- HEAD: `2fcaa62`
- All work on main (linear history, no open PRs)

### Key Files
| File | Purpose |
|------|---------|
| `PROGRESS.md` | Task tracker |
| `CLAUDE.md` | Agent orientation |
| `.claude/orchestration-doppio/DISCOVERY.md` | TOP AUTHORITY |
| `src/data/content.json` | 9 video cards with real IDs |
| `src/types/content.ts` | TypeScript interfaces |
| `src/lib/analytics.ts` | track() helper |
| `src/lib/supabase.ts` | Supabase client |
| `src/lib/auth.ts` | Anonymous auth |
| `src/hooks/usePageTracking.ts` | page_view on route change |
| `.env.local` | Supabase credentials (gitignored) |

---

## ⚠️ Remaining Manual Actions
- **Nano Banana** — 15s teaser video (after UI is built)
- **Demo video** — 2-min recording for Skool #Submissions (before March 8 noon EST)

---

*Generated 2026-03-06 19:00 — merged from two parallel Claude Code sessions*
