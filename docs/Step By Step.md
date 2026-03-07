1- Brain storm idea with Perplexity (https://www.perplexity.ai/search/i-ll-be-participating-on-a-72-ahC6A.jrQb2_JpS_uckEtA)
2- Created public github repository (https://github.com/rgoulartai/doppio)
3- Open Antigravity
4- On new terminal window: ENABLE_TOOL_SEARCH=true claude
5-  First prompt to Sonnet 4.6: let's use the m2c1 skill to start a new project (https://github.com/grandamenium/m2c1) at 3:09PM
6- Second prompt:  I'll post this inittally. Let me know if you need more: Paste Brain Dump from Perplexity
- Phase 0: Setup
- Phase 1: Brain Dump to PRD
7- Skills created PRD.MD
8- Follow prompts and start phases.
- Phase 2: First Research Wave
- Phase 3: DISCOVERY.md
9- When final sync with Vercel
10- Create Chronological timestamp

---

## Why We Did NOT Use Plan Mode with m2c1

Claude Code's built-in **plan mode** is designed for single-task planning — it pauses execution, shows you a proposed approach, and waits for your approval before proceeding. It's the right tool when you want human review before the agent writes code.

**m2c1 is itself a planning system.** It already implements a richer, multi-phase planning pipeline:

- Phase 0: Setup & orientation
- Phase 1: Brain Dump → PRD (structured product requirements)
- Phase 2: Multi-domain research wave (7 parallel research files)
- Phase 3: DISCOVERY.md (authoritative decisions, Q&A locked)
- Phase 4: PHASES.md (29 tasks across 6 phases with full specs)

Using plan mode *inside* m2c1 would interrupt this autonomous pipeline at every step, requiring manual approval for work that m2c1 is already structuring safely. The two systems would conflict: m2c1 expects to run sequentially and autonomously; plan mode expects human approval gates.

**Rule of thumb:** Use plan mode for ad-hoc tasks. Use m2c1 for full projects — it IS the plan mode, at a much larger scale.

---

## Why Use Opus (Superior Model) When Creating a PRD

The PRD and DISCOVERY.md are the **most consequential documents in the entire project.** Every architectural decision, scope constraint, and technical trade-off made here propagates through all 29 tasks. A mistake at this layer is the most expensive kind.

**Opus (Claude's most capable model) excels at:**
- Synthesizing many competing requirements into a coherent vision
- Identifying scope gaps and hidden edge cases before they become blockers
- Making nuanced architectural trade-offs with long-horizon reasoning
- Asking the right clarifying questions in DISCOVERY Q&A rounds

**Sonnet is faster and cheaper** — ideal for execution tasks like writing code, file operations, and testing. But planning requires deeper reasoning, not speed.

The cost difference between Opus and Sonnet on a PRD session is negligible compared to the cost of rebuilding 10 tasks because a foundational decision was wrong.

**Best practice:** Use Opus for `/generate-agent-prd` and the DISCOVERY Q&A phase. Switch to Sonnet for all implementation tasks (/start and subagents).

---

## UI Design — Apple.com Aesthetic

Goal: the app should feel clean, premium, and minimal — like apple.com. Use the `frontend-design` skill when refining any UI component. Key principles:

- **Typography**: large, confident headlines; SF Pro or system-sans fallback; generous line-height
- **Whitespace**: breathe — sections have room, nothing feels crowded
- **Color**: near-white backgrounds, deep near-black text, one accent color used sparingly
- **Motion**: subtle, purposeful — fade-ins, no spinning loaders
- **Cards**: clean borders or subtle shadows, never both; rounded corners (12-16px)
- **CTAs**: pill-shaped primary buttons, high contrast, centered or left-aligned
- **No gradients** unless very subtle (like Apple's hero sections)
- **Mobile-first**: every component starts from 375px and scales up
