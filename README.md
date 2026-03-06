# Doppio

> **"20 minutes from ChatGPT Googler to AI coworker boss — curated through crowd knowledge, no coding required."**

Doppio is a Progressive Web App built for the **Skool Hackathon** (March 6–8, 2026). It transforms non-technical workers — office professionals, managers, small business owners — from people who use ChatGPT like a Google search into confident AI coworker managers, in 20 minutes, using only natural language.

No prompting tips. No coding. No app store. Just a shareable URL.

**Live**: [doppio.kookyos.com](https://doppio.kookyos.com)

---

## Table of Contents

1. [What Doppio Does](#what-doppio-does)
2. [Tech Stack](#tech-stack)
3. [How This Project Was Built — The AI Workflow](#how-this-project-was-built--the-ai-workflow)
4. [The m2c1 Skill — What It Is and How It Works](#the-m2c1-skill--what-it-is-and-how-it-works)
5. [Subagents Launched by m2c1](#subagents-launched-by-m2c1)
6. [Obsidian as a Human-Friendly Project Interface](#obsidian-as-a-human-friendly-project-interface)
7. [Environment Variables and Secrets](#environment-variables-and-secrets)
8. [Context Management: /handoff and /pickup](#context-management-handoff-and-pickup)
9. [Claude Code Status Bar and Context Progress](#claude-code-status-bar-and-context-progress)
10. [Project Structure](#project-structure)
11. [Getting Started](#getting-started)
12. [Hackathon Context](#hackathon-context)

---

## What Doppio Does

Doppio curates existing high-quality social video demos (TikTok, YouTube Shorts, Reels) into a structured 3-level learning path. Users watch real people doing real things with AI tools, then immediately try it themselves.

### The 3 Levels

| Level | Theme | AI Tool | Example Card |
|-------|-------|---------|-------------|
| **1 — Beginner** | ChatGPT beyond Google search | ChatGPT | "Scan this receipt and make a meal plan" |
| **2 — Intermediate** | Simple AI delegation | Claude.ai | "Clean my Downloads folder" |
| **3 — Advanced** | Full AI agents | Claude Cowork + Perplexity | "Take 5 receipts → expense report" |

Each card has: (1) an embedded social video demo, (2) a "Try it" CTA that opens the AI tool in a new tab with a prefilled natural-language prompt, (3) a clipboard copy fallback.

### Key Features

- **PWA** — installs to iOS/Android home screen directly from browser, no App Store
- **Progress persistence** — localStorage (offline) synced to Supabase in background
- **Confetti + completion badge** — gamified experience, shareable on completion
- **Zero backend AI** — pure static curation, no LLM calls, ships in a day
- **Swappable content** — all video IDs live in `content.json`, no code changes needed to update videos

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| PWA | vite-plugin-pwa v0.21.x + Workbox |
| PWA Icons | @vite-pwa/assets-generator |
| Database + Auth | Supabase (anonymous auth only) |
| Analytics | Vercel Analytics + Supabase custom events |
| Routing | React Router v6 |
| Video (YouTube) | lite-youtube-embed (facade/lazy pattern) |
| Video (TikTok) | Direct iframe embed |
| Confetti | canvas-confetti (~6 kB) |
| Deployment | Vercel Hobby (free) |

---

## How This Project Was Built — The AI Workflow

This project was built entirely within [Claude Code](https://claude.ai/claude-code) (Anthropic's CLI) using an AI-driven development workflow. The goal was to go from a raw idea to a production-ready PWA in under 72 hours, with Claude acting as both orchestrator and implementer.

### The Workflow in Plain English

1. **Brain dump to Claude** — A raw brain dump from a Perplexity brainstorming session was pasted directly into Claude Code. No formal specification, just messy ideas.
2. **m2c1 skill activated** — The `m2c1` orchestration skill was invoked to structure the brain dump into a proper development pipeline.
3. **PRD generated** — Claude produced a `PRD.md` (Product Requirements Document) from the brain dump.
4. **Research wave** — Multiple subagents ran in parallel, each researching a different technical domain.
5. **Discovery document** — After research, a `DISCOVERY.md` was created through 3 rounds of Q&A with Claude, resolving all open questions.
6. **Implementation skills created** — Specialized skill files were written for each major technical domain, so future Claude sessions always have the right context loaded.

Everything is tracked in `.claude/orchestration-doppio/`. The Obsidian vault makes all of this human-readable without opening a terminal.

---

## The m2c1 Skill — What It Is and How It Works

**m2c1** (short for "meta-to-code, one pass") is an open-source Claude Code skill created by [@grandamenium](https://github.com/grandamenium/m2c1). It is an orchestration meta-skill that converts a raw brain dump into a fully-structured, phased software development pipeline — automatically.

You can find it here: [github.com/grandamenium/m2c1](https://github.com/grandamenium/m2c1)

### What m2c1 Does

When you invoke m2c1 with a brain dump or project description, it runs a structured multi-phase workflow:

| Phase | Name | What Happens |
|-------|------|-------------|
| 0 | Setup | Initializes project structure, configures orchestration directory |
| 1 | Brain Dump → PRD | Converts raw ideas into a structured Product Requirements Document |
| 2 | Research Wave | Spawns parallel subagents to research each technical domain |
| 3 | Discovery | Conducts structured Q&A rounds to resolve open questions, produces `DISCOVERY.md` |
| 4+ | Implementation | Creates per-domain skill files; guides phased implementation |

### How Subagents Are Launched

m2c1 uses Claude Code's **Task tool** to spawn specialized subagents. Each subagent is an independent Claude instance given a specific research or implementation mission. They run in parallel, each writing their output to a file in `.claude/orchestration-doppio/research/`. The orchestrator then reads their findings and synthesizes them.

Think of it as: Claude acting as the project manager, and the subagents as specialized contractors — one knows PWA implementation, another knows Supabase, another knows gamification UX. Each does their job and reports back.

This approach:
- **Keeps the main context clean** — heavy research stays in subagent memory, not clogging the main session
- **Enables parallelism** — 7 research domains investigated simultaneously instead of sequentially
- **Creates persistent knowledge** — research outputs are written to files, surviving across sessions

### How to Invoke m2c1

```
/m2c1 [your brain dump or project description]
```

Or just tell Claude: _"Let's use the m2c1 skill to start a new project"_ and then paste your brain dump when prompted.

---

## Subagents Launched by m2c1

During the research phase, m2c1 spawned the following subagents. Each produced a detailed research document in `.claude/orchestration-doppio/research/`:

| Agent | Output File | What It Researched |
|-------|-------------|-------------------|
| `supabase-sync` agent | `research/supabase-sync.md` | Anonymous auth, progress schema, localStorage-first sync pattern, free tier limits |
| `video-embedding` agent | `research/video-embedding.md` | YouTube IFrame API, TikTok oEmbed, facade/lazy-load pattern, Instagram/X limitations |
| `analytics` agent | `research/analytics.md` | Vercel Analytics setup, Supabase custom events table, 7 key event definitions |
| `pwa-implementation` agent | `research/pwa-implementation.md` | vite-plugin-pwa, Workbox, iOS Safari install prompt workarounds, icon requirements |
| `ai-video-generation` agent | `research/ai-video-generation.md` | Nano Banana workflow for teaser video creation, Sora alternatives, FFmpeg compression |
| `gamification-ux` agent | `research/gamification-ux.md` | canvas-confetti usage, card completion animations, badge share mechanics |
| `content-curation` agent | `research/content-curation.md` | Best YouTube channels per level, specific search queries, backup video strategy |

After the research phase, m2c1 also generated **8 implementation skill files** (in `.claude/skills/`), one per technical domain. These are loaded into future Claude sessions as needed, so the agent always has domain-specific context without you having to re-explain anything.

| Skill | Purpose |
|-------|---------|
| `doppio-architecture` | Overall app structure, data flows, key decisions |
| `supabase-anonymous-progress` | localStorage→Supabase sync implementation |
| `doppio-analytics` | Analytics instrumentation for both layers |
| `pwa-vite-setup` | Full PWA configuration with Vite |
| `vercel-deploy-custom-domain` | Vercel deployment + Hostgator DNS setup |
| `video-embed-facade` | Facade pattern for multi-platform video embeds |
| `canvas-confetti-gamification` | Confetti, level completion UX |
| `doppio-content-schema` | `content.json` schema and video card data model |

---

## Obsidian as a Human-Friendly Project Interface

All project files live in `/Users/you/Projects/KOOKY/Doppio/`. Obsidian was configured to treat this directory as a **vault** — meaning every `.md` file in the project is directly accessible through Obsidian's visual editor, graph view, and search.

### Why This Matters

Claude Code writes and reads files in the terminal. Obsidian gives you a beautiful, human-friendly UI to:
- Read the PRD, DISCOVERY.md, and research files without touching the terminal
- Write notes, append to brain dumps, or annotate research — Claude picks it up on the next session
- See the `PROJECT_TIMELINE.md` update in real time
- Navigate between linked documents visually using Obsidian's graph view

### How to Set It Up

1. Install [Obsidian](https://obsidian.md) (free)
2. Open Obsidian → **"Open folder as vault"**
3. Navigate to your project root (e.g., `~/Projects/KOOKY/Doppio`)
4. Click **Open**

That's it. Obsidian will index all markdown files. The `.obsidian/` folder (auto-created) stores your workspace preferences. It is excluded from git tracking (except for `core-plugins.json`).

> **Tip**: You can write directly in Obsidian and Claude will read your changes on the next prompt. It's a two-way interface to the same files.

---

## Environment Variables and Secrets

**Never commit secrets to GitHub.** This project uses a `.env` file for sensitive configuration.

### Setup

Create a `.env` file in the project root (it is gitignored):

```bash
# .env — never commit this file
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

Copy `.env.example` as your starting point:

```bash
cp .env.example .env
```

Then fill in your values from the [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API.

### Notes on These Specific Keys

Supabase's `anon` key is intentionally designed to be safe for client-side use — it is governed by your Row Level Security (RLS) policies on the database. It is not the same as an admin/service key. Still, keep it in `.env` and out of git as a habit.

### `.env.example`

The `.env.example` file is committed to git and contains all required variable names with blank or placeholder values. **Always update `.env.example` when you add a new environment variable.** This is the contract for anyone cloning the repo.

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Context Management: /handoff and /pickup

When working with Claude Code on a large project, the AI's context window (working memory) fills up over time. Once it approaches ~60–80% capacity, response quality can degrade and important earlier context may be dropped.

The solution is two complementary commands built into this workflow:

### `/handoff`

Run this command when:
- Your context usage reaches ~60–70% (visible in the status bar — see below)
- You're ending a work session and want to resume later
- You're switching between tools (Claude Code → Claude.ai → back)
- You've just completed a major milestone

**What it does:**
1. Summarizes everything accomplished in the current session
2. Lists all files created or modified, with their paths
3. Records the current git state (commits, branch, staged changes)
4. Captures all outstanding tasks and their status
5. Documents what was decided, what is in progress, and what comes next
6. Writes a timestamped handoff file to the project directory
7. Generates a compact "pickup prompt" — a single block of text you paste into the next session to restore full context instantly

Think of it as Claude writing a shift-change report for its future self.

### `/pickup`

Run this at the **start** of a new session (or after opening a fresh Claude Code window):

```
/pickup
```

**What it does:**
1. Finds the most recent handoff file
2. Reads and summarizes what was accomplished before
3. Restores your task list to its last-known state
4. Presents the "next steps" so you know exactly where to pick up
5. Reloads relevant context so Claude is oriented immediately

### The Recommended Rhythm

```
Start session → /pickup → work → [60% context] → /handoff → new session → /pickup → ...
```

This keeps every session fresh while preserving complete project continuity across unlimited sessions.

---

## Claude Code Status Bar and Context Progress

Claude Code supports a customizable **status bar** that appears in your terminal while the CLI is running. One of the most useful things to put in it is a **context usage progress bar** — a visual indicator of how full Claude's context window currently is.

### Why It Matters

The context window is Claude's working memory. Once it fills up:
- Responses get slower
- Earlier context (e.g., your PRD decisions) may be dropped
- The AI can start hallucinating or contradicting earlier decisions

The progress bar lets you see at a glance when to run `/handoff` — before it becomes a problem.

### How It Was Set Up

Claude Code's status bar is configured via the `statusline` setting in your Claude Code config. To set it up:

1. In Claude Code, run:
   ```
   /statusline
   ```
2. Choose what to display — select **context usage** to get the progress bar
3. The bar appears at the bottom of your terminal session, updating in real time as context fills

The display looks something like:
```
[████████░░░░░░░░░░░░] 42% context
```

When it hits ~60%, that's your cue to run `/handoff`.

> **Tip**: You can also type `/usage` at any time inside a Claude Code session to see a snapshot of your current context consumption.

---

## Project Structure

```
Doppio/
├── .claude/
│   ├── orchestration-doppio/         # m2c1 orchestration output
│   │   ├── PRD.md                    # Product Requirements Document
│   │   ├── DISCOVERY.md              # Resolved decisions (source of truth)
│   │   └── research/                 # Subagent research outputs
│   │       ├── supabase-sync.md
│   │       ├── video-embedding.md
│   │       ├── analytics.md
│   │       ├── pwa-implementation.md
│   │       ├── ai-video-generation.md
│   │       ├── gamification-ux.md
│   │       └── content-curation.md
│   └── skills/                       # Per-domain implementation skills
│       ├── doppio-architecture/
│       ├── supabase-anonymous-progress/
│       ├── doppio-analytics/
│       ├── pwa-vite-setup/
│       ├── vercel-deploy-custom-domain/
│       ├── video-embed-facade/
│       ├── canvas-confetti-gamification/
│       └── doppio-content-schema/
├── scripts/
│   └── update_timeline.sh            # Auto-updates PROJECT_TIMELINE.md every 30 min
├── .obsidian/                        # Obsidian vault config (auto-generated)
├── .env                              # Local secrets — NEVER commit
├── .env.example                      # Template — always keep updated
├── .gitignore
├── Brain Dump.md                     # Original raw idea document
├── Budget.md                         # Budget constraints
├── PROJECT_TIMELINE.md               # Chronological project log (auto-updated)
├── README.md                         # This file
└── Step By Step.md                   # Session workflow notes
```

> **Note**: The `src/` app code directory will be created during the implementation phase. The structure above reflects the planning and research phase.

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier)
- A [Vercel](https://vercel.com) account (free Hobby tier)

### Local Development

```bash
# Clone the repo
git clone https://github.com/rgoulartai/doppio
cd doppio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start dev server
npm run dev
```

### Supabase Setup

In your Supabase project, run this migration:

```sql
-- Enable anonymous auth first in Supabase Dashboard → Auth → Providers

create table public.user_progress (
  id           uuid default gen_random_uuid() primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  level        smallint not null check (level between 1 and 3),
  card         smallint not null check (card between 1 and 3),
  completed_at timestamptz not null default now(),
  constraint unique_user_level_card unique (user_id, level, card)
);

alter table public.user_progress enable row level security;

create policy "Users can read their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Then add your environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

For the custom domain `doppio.kookyos.com`, add a CNAME record in your DNS provider (Hostgator) pointing to Vercel's target after Vercel provides it.

---

## Hackathon Context

- **Event**: Skool Hackathon (hosted by Marcin & Sabrina)
- **Start**: March 6, 2026 at 1 PM EST
- **Deadline**: March 8, 2026 at 12:00 PM (noon) EST
- **Prizes**: $6,000
- **Submission**: Project name, team, 1-sentence description, 1-sentence target audience, 2-minute demo video (uploaded directly to Skool), AI tools used, live link
- **Judging philosophy**: "Small + working + clear demo beats big + broken"
- **AI requirement**: Must use at least one AI tool in the build ✓

---

## Additional Recommendations

A few things not yet set up that are worth considering:

**`CHANGELOG.md`** — Start logging what changes between sessions. Even a one-liner per session compounds into something very useful for the demo video script and for anyone reviewing the repo after the hackathon.

**Git commits per phase** — Commit after each major phase (after PRD, after research, after each implementation skill). Right now the repo has no commits yet. Small, frequent commits make it easy to roll back if something breaks at 2am before a deadline.

**Demo video script** — The `DISCOVERY.md` already contains the perfect 2-minute script structure: problem → solution → 3 levels → live demo → share badge. Start drafting it early so it doesn't become a last-minute scramble.

**`content.json` first** — Before writing any React, curate the 9 videos and write `content.json`. It's the heart of the app and will inform every component you build. Getting this wrong wastes UI work.

**Test on real iOS Safari** — The PWA install flow on iOS Safari is the trickiest part of the stack. Test it on a real device early, not just in a desktop Chrome DevTools simulation.

---

*Built with [Claude Code](https://claude.ai/claude-code) + [m2c1](https://github.com/grandamenium/m2c1) during the Skool Hackathon, March 2026.*
