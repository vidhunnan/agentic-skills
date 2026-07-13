# PRD — handoff-generator

Status: Draft v0.4 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

Work moves between Claude Chat (ideation, decisions, back-and-forth) and Claude Code (execution), and neither surface remembers the other. Context gets manually re-typed or lost when crossing between them — in *either* direction. There's no portable artifact that carries the *full* state of a project — its progress, features, decisions, and what just changed — from a session to its continuation. A five-line brief loses too much; the receiver still has to reconstruct where the project actually is.

## 2. Goals

- A single trigger runs a short, guided flow that captures the full state of the work — what it is, where it stands, how it got here, its features, decisions, what this session changed, open questions, and next actions — then produces a **comprehensive project handoff** (~10 sections), in the shape of the reference Reviz handoffs.
- **Bidirectional and surface-aware:** works chat→code, code→chat, or to any destination (a fresh chat, a teammate, another Claude Code session). The section shape is identical on both surfaces; the *sourcing* differs — on Claude Code the handoff is verified against the repo (git, changelog, decisions, PRDs); on Claude.ai it's drawn from the conversation.
- Works as the first proof-of-concept skill for the `agentic-skills` repo — establishes the pattern (SKILL.md + `plugin.json` + marketplace entry) for every skill after it.
- Reliable enough to actually use daily, not just a demo.

## Non-goals (v1)

- No live/automatic sync between Claude.ai and Claude Code — the two surfaces don't share skills or state today, so this is a **manual bridge**, not a sync mechanism.
- No auto-detection of "this chat is winding down" — the trigger is explicit.
- Not a generative report — the handoff is **faithful, not generative**. Nothing is invented to fill a section; on Claude Code, git and the changelog are truth and a PRD/concept is never cited as proof something shipped.
- No multi-skill orchestration (chaining into other skills) yet.

## 3. Primary user

Vids — ideates in Claude Chat, executes in Claude Code, and moves work both ways. Later: anyone who installs the skill from the public repo with the same habit.

## 4. Core workflow

1. Work happens on one surface (chat or code).
2. User triggers the skill ("generate a handoff", "hand this off to chat/code", or `/handoff-generator`).
3. **The skill interviews the user first — it does not run autonomously.** It inspects the conversation/project and asks a short, relevant, context-aware set of questions, always covering: the **destination** (where the handoff is going), the **focus** (what the receiver should prioritize), and any thread-specific ambiguity. It waits for answers before generating.
4. Skill gathers material and extracts, faithfully (no invention). On **Claude Code** it first collects real repo facts (git log, changelog, decisions, workspaces, repo state); on **Claude.ai** it works from the conversation. It then fills the comprehensive section set:
   - What this is (definition + goal)
   - Snapshot — current state
   - Progress & Timeline (Code: from `git log`; Chat: the conversation's arc)
   - Features / Components (status per area/workspace)
   - Decisions made (+ why; Code cross-refs `docs/decisions/` ADRs)
   - What this session changed (Code: changelog/commit delta; Chat: artifacts produced)
   - Open questions / unresolved items
   - Files, repos, or tools referenced (verbatim)
   - Concrete next actions (aimed at the destination)
   - Notes for the receiver (conventions, repo state, stale-doc warnings)
5. Skill assembles the handoff using the direction-aware template below.
6. Delivery by surface:
   - **Claude Code:** writes to `handoff/handoff-{from}-to-{to}-{date}-{slug}.md`. Always targets the `handoff/` folder; if the folder is missing it **prompts the user** to create it (never silently). If a prior handoff exists, it offers to **resume** — reading the latest one and continuing from that point rather than repeating. Confirms the final path back to the user.
   - **Claude.ai:** renders a downloadable markdown artifact (chat has no persistent folder; no folder/resume logic).
7. The receiver opens the handoff as starting context and continues without re-explaining anything.

## 5. Output template

Same ten sections on both surfaces; only the *sourcing* differs (§6). The `Status:` and `Continued from:` header lines are conditional.

```md
# Handoff Brief — {project / topic}
From: {from}   To: {to}
Date: {date}
Status: {phase / stage}                 # omit if none
Continued from: {prev filename}         # only when resuming

## What this is
{one-line definition + 2–4 sentences: what the project/work is and its goal}

## Snapshot — current state
{where it stands right now: what's live / built / in-progress / not started, current phase}

## Progress & Timeline
{how it got here — a few dated milestones}

## Features / Components
| Area | What it is | Status |
|---|---|---|
| {area} | {what} | {live / built / in progress / not started} |

## Decisions Made
- {decision} — {why}        {on Code, cite [ADR NNNN] + status when one exists}

## What this session changed
{the delta since the last handoff — changelog-style; on Code, a commit table reads well}

## Open Questions
- {unresolved item}         {optionally tagged by priority / area}

## Files / Repos Referenced
- {path or URL, verbatim}

## Next Actions for {to}
- [ ] {action}

## Notes for the receiver
{orientation: conventions, working style, repo state, stale-doc warnings}
```

Empty sections keep their header and use an explicit "None" line rather than being omitted — the fixed shape is a stable contract for the receiver.

## 6. Functional requirements

| Surface | Trigger | Interview | Sourcing | Output |
|---|---|---|---|---|
| Claude Code | `/handoff-generator {optional-slug}` or natural phrasing ("generate a handoff", "hand this off to chat", "resume a handoff") | Asks destination + focus + thread-specific questions; prompts before creating `handoff/`; offers to resume if a prior handoff exists | **Verified against the repo** — `git log` (timeline), `changelog/` (session delta), `docs/decisions/` (decision cross-ref), workspaces / `docs/phases/` (features), repo state (branch / unpushed / version), CLAUDE.md protocols (conventions); best-effort with graceful fallback when a source is absent | Writes `handoff/handoff-{from}-to-{to}-{date}-{slug}.md` (numeric-counter suffix on collision); prints inline if user declines the folder |
| Claude.ai | Explicit mention or description-match auto-trigger | Same questions, asked conversationally in plain text | **From the conversation** — the arc/pivots become the timeline, artifacts produced become the session delta; no filesystem/git access | Downloadable `handoff-{from}-to-{to}-{date}-{slug}.md` artifact |

**Direction model:** `from` = the surface the skill runs on (`chat` on Claude.ai, `code` on Claude Code). `to` = the destination the user names in the interview (default: the opposite surface; free-form values like `teammate` allowed). Surface is detected via **Bash availability** (available → Claude Code; unavailable → Claude.ai).

**Frontmatter:**
```yaml
---
name: handoff-generator
description: Interactive, bidirectional handoff-brief generator that bridges Claude.ai chat and Claude Code. Interviews the user first, then writes a structured brief so work can move between surfaces without re-explaining. Triggers when the user says "generate a handoff", "hand this off to code", "hand this off to chat", "prep this for Claude Code", "resume a handoff", or runs /handoff-generator.
argument-hint: "[optional-slug]"
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion
disable-model-invocation: false
---
```

### CLAUDE.md registration (v0.3)

After delivering the brief, the skill offers to register a `<!-- BEGIN skill:handoff-generator -->…<!-- END -->` protocol block under a `## Skill protocols` heading in the project's CLAUDE.md, so future sessions check `handoff/` and use the skill when moving work across surfaces. Idempotent (match on the literal markers, update-in-place, never duplicate); if CLAUDE.md is missing, offer a full `/init`-style generation (confirmation-gated) first. This is best-effort and never blocks brief delivery. On Claude.ai, the block is printed for the user to paste. This shared registration mechanism is used by every skill in the library.

## 7. Success criteria

- Ending a session, running the trigger, then opening the destination with the brief produces a first response that correctly reflects prior decisions — no re-explaining.
- The skill always interviews before generating; it never dumps a brief without first establishing destination and focus.
- Resume works: a second handoff the same day continues from the previous one instead of repeating it.
- Filenames encode direction and date; collisions never overwrite.
- Auto-trigger fires on natural phrasing, not just the exact slash command.

## 8. Open questions for v2

- Should this auto-fire when a chat looks like it's wrapping up, instead of waiting for an explicit trigger?
- Worth a Cursor-compatible `.mdc` counterpart, or is that out of scope for a Claude-first tool?
- Multi-file handoffs (e.g. attaching relevant code snippets) vs. text-only brief.
- Should resume optionally chain across *multiple* prior handoffs (a running thread) rather than just the latest one?
