# PRD — handoff-generator

Status: Draft v0.2 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

Work moves between Claude Chat (ideation, decisions, back-and-forth) and Claude Code (execution), and neither surface remembers the other. Context gets manually re-typed or lost when crossing between them — in *either* direction. There's no lightweight, portable artifact that bridges a session to its continuation.

## 2. Goals

- A single trigger runs a short, guided flow that captures what a session was about and what to do next, then produces a structured brief.
- **Bidirectional:** works chat→code, code→chat, or to any destination (a fresh chat, a teammate, another Claude Code session) — not just chat→code.
- Works as the first proof-of-concept skill for the `agentic-skills` repo — establishes the pattern (SKILL.md + `plugin.json` + marketplace entry) for every skill after it.
- Reliable enough to actually use daily, not just a demo.

## Non-goals (v1)

- No live/automatic sync between Claude.ai and Claude Code — the two surfaces don't share skills or state today, so this is a **manual bridge**, not a sync mechanism.
- No auto-detection of "this chat is winding down" — trigger is explicit.
- No multi-skill orchestration (chaining into other skills) yet.

## 3. Primary user

Vids — ideates in Claude Chat, executes in Claude Code, and moves work both ways. Later: anyone who installs the skill from the public repo with the same habit.

## 4. Core workflow

1. Work happens on one surface (chat or code).
2. User triggers the skill ("generate a handoff", "hand this off to chat/code", or `/handoff-generator`).
3. **The skill interviews the user first — it does not run autonomously.** It inspects the conversation/project and asks a short, relevant, context-aware set of questions, always covering: the **destination** (where the handoff is going), the **focus** (what the receiver should prioritize), and any thread-specific ambiguity. It waits for answers before generating.
4. Skill reviews the conversation and extracts, faithfully (no invention):
   - Context / session summary
   - Decisions made (+ why)
   - Open questions / unresolved items
   - Files, repos, or tools referenced
   - Concrete next actions (aimed at the destination)
5. Skill assembles the brief using the direction-aware template below.
6. Delivery by surface:
   - **Claude Code:** writes to `handoff/handoff-{from}-to-{to}-{date}.md`. Always targets the `handoff/` folder; if the folder is missing it **prompts the user** to create it (never silently). If a prior handoff exists, it offers to **resume** — reading the latest brief and continuing from that point rather than repeating. Confirms the final path back to the user.
   - **Claude.ai:** renders a downloadable markdown artifact (chat has no persistent folder; no folder/resume logic).
7. The receiver opens the brief as starting context and continues without re-explaining anything.

## 5. Output template

```md
# Handoff Brief — {topic}
From: {from}   To: {to}
Date: {date}
Continued from: {prev filename}        # only when resuming

## Context
{2-4 sentence summary for the receiver}

## Decisions Made
- {decision} — {why}

## Open Questions
- {unresolved item}

## Files / Repos Referenced
- {path or URL}

## Next Actions for {to}
- [ ] {action}
```

Empty sections keep their header and use an explicit "None" line rather than being omitted — the fixed shape is a stable contract for the receiver.

## 6. Functional requirements

| Surface | Trigger | Interview | Output |
|---|---|---|---|
| Claude Code | `/handoff-generator {optional-slug}` or natural phrasing ("generate a handoff", "hand this off to chat", "resume a handoff") | Asks destination + focus + thread-specific questions; prompts before creating `handoff/`; offers to resume if a prior handoff exists | Writes `handoff/handoff-{from}-to-{to}-{date}.md` (numeric-counter suffix on collision); prints inline if user declines the folder |
| Claude.ai | Explicit mention or description-match auto-trigger | Same questions, asked conversationally in plain text | Downloadable `handoff-{from}-to-{to}-{date}.md` artifact |

**Direction model:** `from` = the surface the skill runs on (`chat` on Claude.ai, `code` on Claude Code). `to` = the destination the user names in the interview (default: the opposite surface; free-form values like `teammate` allowed). Surface is detected via **Bash availability** (available → Claude Code; unavailable → Claude.ai).

**Frontmatter:**
```yaml
---
name: handoff-generator
description: Interactive, bidirectional handoff-brief generator that bridges Claude.ai chat and Claude Code. Interviews the user first, then writes a structured brief so work can move between surfaces without re-explaining. Triggers when the user says "generate a handoff", "hand this off to code", "hand this off to chat", "prep this for Claude Code", "resume a handoff", or runs /handoff-generator.
argument-hint: "[optional-slug]"
allowed-tools: Read, Write, Bash, AskUserQuestion
disable-model-invocation: false
---
```

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
