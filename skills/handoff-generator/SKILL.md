---
name: handoff-generator
description: Interactive, bidirectional handoff-brief generator that bridges Claude.ai chat and Claude Code. Interviews the user first, then writes a structured brief so work can move between surfaces without re-explaining. Triggers when the user says "generate a handoff", "hand this off to code", "hand this off to chat", "prep this for Claude Code", "resume a handoff", or runs /handoff-generator.
argument-hint: "[optional-slug]"
allowed-tools: Read, Write, Bash, AskUserQuestion
disable-model-invocation: false
---

# handoff-generator

Produces a **handoff brief**: a portable Markdown document that captures what a
session was about — context, decisions, open questions, referenced files, and
next actions — so the work can continue on another surface (Claude.ai chat ↔
Claude Code) or with another person, without re-explaining anything.

Two things make this skill different from a one-shot summarizer:

- **It is bidirectional.** The handoff can go chat→code, code→chat, or to some
  other destination (a fresh chat, a teammate, another Claude Code session). You
  decide the destination *with the user* and shape the brief for it.
- **It never runs autonomously.** You always interview the user briefly first,
  gather the real intent and context, and only then generate. Do not rush
  straight to output.

## Instructions

### Step 0 — Detect your surface

You run on two surfaces that behave differently. Decide which one you are on
before anything else, using **Bash availability** as the discriminator:

- **Claude Code** — you have a working **Bash** tool and a real project
  filesystem. If you can run a shell command, you are on Claude Code. Use the
  file + folder + resume behavior below.
- **Claude.ai** — you have **no** shell/Bash and no persistent project folder.
  If Bash is unavailable, you are on Claude.ai. Produce a downloadable artifact
  instead of writing a file; skip all folder and resume logic.

Steps 1–5 are shared. Only Step 6 (delivery) differs by surface.

### Step 1 — Interview the user first (do NOT generate yet)

Never dump a brief immediately. First look at the current conversation and the
project to understand what's going on, then ask a **short, relevant** set of
questions tailored to *this* context. Keep it to the few questions that actually
matter — skip anything the user's trigger already answered.

Always establish these before generating:

1. **Destination (`to`)** — where is this handoff going? e.g. Claude Code, a
   fresh Claude chat, a teammate, another agent. This sets the direction and the
   filename.
2. **Focus** — what should the receiver prioritize, watch out for, or pick up
   first? What's the single most important thing to carry over?
3. **Anything thread-specific that's ambiguous** — ask context-aware questions
   drawn from the actual work (e.g. "Should the auth refactor decision be
   recorded as final or still open?"). These should feel specific to the
   project, not generic.

On **Claude Code**, prefer the `AskUserQuestion` tool for the structured choices
(destination, resume yes/no, folder-create yes/no). On **Claude.ai**, ask the
same things conversationally in plain text. Either way, **wait for answers**
before continuing.

**Claude Code — folder + resume checks (fold into the interview):**

- If a `handoff/` folder does **not** exist, ask the user whether to create it.
  Do not silently create it. Only `mkdir -p handoff` after they say yes. If they
  decline, fall back to printing the brief inline (Step 6A).
- If `handoff/` **does** exist and already contains handoff file(s), tell the
  user the most recent one's date and topic, and ask whether to **continue from
  it** (resume) or start fresh.

### Step 2 — Determine direction and resume source

- **`from`** = your current surface: `chat` on Claude.ai, `code` on Claude Code.
- **`to`** = the destination the user gave in Step 1. Normalize to a short
  kebab token for the filename: `code`, `chat`, `teammate`, etc. Keep the
  human-readable form for the brief header.
- **Resume (Claude Code only):** if the user chose to continue, **Read** the most
  recent `handoff/*.md` file and note what it already captured — its date,
  decisions, and next actions. The new brief should *continue* from there:
  capture what has changed or progressed since, not repeat what's already
  recorded.

### Step 3 — Review the conversation and extract the sections

Read the whole conversation. You are recording what actually happened in *this*
session — be **faithful, not generative**. Every line must trace to something
that was really said. Invent nothing.

Extract:

1. **Context** — 2–4 sentences a zero-memory receiver on the destination side can
   read to understand the situation and what's being worked toward.
2. **Decisions Made** — concrete, settled choices, each as `{decision} — {why}`.
   Include a decision only if the thread genuinely resolved it. If the reason was
   never stated, write `(reason not stated)` rather than inventing one. Things
   still under debate do **not** go here.
3. **Open Questions** — unresolved items, things explicitly deferred, and any
   in-flight debates.
4. **Files / Repos Referenced** — only paths, filenames, repos, or URLs that
   actually appeared in the conversation, copied **verbatim**. Never guess or
   fabricate a path.
5. **Next Actions for {to}** — concrete, imperative next steps aimed at the
   destination ("Add X to Y", "Refactor Z"). When resuming, focus on what is
   new or changed since the previous handoff.

**Quality bar:** every line traces to the thread; when unsure, leave it out. No
hedging filler. Keep decided (Decisions) separate from undecided (Open
Questions).

### Step 4 — Derive date, slug, and topic

- **Date** (`{date}`), format `YYYY-MM-DD`:
  - Claude Code: run `date +%F` via Bash and use the exact output. Never guess.
  - Claude.ai: use today's date from context.
- **Slug** (`{slug}`), kebab-case, lowercase, filesystem-safe:
  - If the user passed an argument (`/handoff-generator my-slug`), normalize it:
    lowercase, spaces→hyphens, strip anything that isn't `[a-z0-9-]`.
  - Otherwise auto-derive from the main topic: 3–5 kebab-case words (e.g.
    `auth-token-refresh`, `pricing-page-redesign`).
- **Topic** (`{topic}`), a human-readable title for the heading, in natural
  title case (e.g. "Auth token refresh").

### Step 5 — Assemble the brief

Fill this exact template. Keep the heading structure and order unchanged. Omit
the `Continued from:` line unless you are resuming.

```md
# Handoff Brief — {topic}
From: {from}   To: {to}
Date: {date}
Continued from: {prev filename}

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

If a section has nothing, keep the header and write an explicit line rather than
leaving it blank or omitting it: `- None yet.` / `- None.` /
`- None referenced in this conversation.` / `- [ ] (none identified — clarify
scope with the user)`. A stable shape makes the brief reliable for the receiver.

### Step 6A — Claude Code: write the file

1. Target filename: `handoff/handoff-{from}-to-{to}-{date}.md`
   (e.g. `handoff/handoff-code-to-chat-2026-07-12.md`).
2. The `handoff/` folder must already exist or have been approved by the user in
   Step 1. Run `mkdir -p handoff` only after that approval.
3. Avoid overwriting: check whether the target name is taken
   (e.g. `ls handoff/handoff-{from}-to-{to}-{date}*.md`). If so, append a numeric
   counter before `.md`: `-2`, `-3`, … and use the first free name.
4. Write the assembled brief to that path with the Write tool.
5. Confirm back to the user with the exact final path, e.g. "Handoff brief written
   to `handoff/handoff-code-to-chat-2026-07-12.md`."
6. **If the user declined to create `handoff/`:** skip writing and print the full
   brief inline in your reply instead, so nothing is lost.

### Step 6B — Claude.ai: produce a downloadable artifact

There is no project folder to write into. Output the brief as a downloadable
Markdown artifact named `handoff-{from}-to-{to}-{date}.md`. Present the full brief
content and make clear it can be saved and dropped into the destination (e.g.
Claude Code) as starting context. Do not attempt to run Bash or write to a
filesystem path, and skip resume logic.

### Step 7 — Edge cases

- **Empty / very thin conversation:** if there's essentially nothing to hand off,
  don't fabricate a brief. Say the conversation is too thin for a useful handoff
  and ask what the user wants captured.
- **No decisions / no files / no actions:** keep the section header and use the
  explicit "None" line from Step 5. Never invent content to fill a section.
- **Very long conversation:** prioritize the most recent and most load-bearing
  decisions; compress older exploration. Context stays 2–4 sentences regardless
  of length — favor what the receiver needs over completeness.
- **User declines the `handoff/` folder:** print the brief inline (Step 6A.6)
  rather than erroring.
