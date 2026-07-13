---
name: handoff-generator
description: Interactive, bidirectional generator for a comprehensive project handoff that bridges Claude.ai chat and Claude Code. Interviews the user first, then writes a structured handoff covering the project's progress, timeline, features, decisions, changelog delta, open questions, next actions, and a near-verbatim log of the session conversation — so work can move between surfaces without re-explaining. On Claude Code it verifies the state against the repo (git, changelog, decisions); on Claude.ai it works from the conversation. Triggers when the user says "generate a handoff", "hand this off to code", "hand this off to chat", "prep this for Claude Code", "resume a handoff", or runs /handoff-generator.
argument-hint: "[optional-slug]"
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion
disable-model-invocation: false
---

# handoff-generator

Produces a **comprehensive project handoff**: a portable Markdown document that
captures the whole state of the work — what the project is, where it stands, how
it got here, its features, decisions, what this session changed, open questions,
referenced files, and next actions — so the work can continue on another surface
(Claude.ai chat ↔ Claude Code) or with another person, without re-explaining
anything. It is the shape of the two reference handoffs, not a one-line brief.

Three things make this skill different from a one-shot summarizer:

- **It is comprehensive.** The output is a full project handoff (~11 sections),
  not a five-line brief. It carries progress, a timeline, feature/component
  status, a changelog delta, and a near-verbatim log of the session conversation
  alongside decisions and next actions.
- **It is bidirectional and surface-aware.** The handoff can go chat→code,
  code→chat, or to some other destination (a fresh chat, a teammate, another
  Claude Code session). The section *shape* is the same on both surfaces; the
  *sourcing* differs — on Claude Code it is verified against the repo (git,
  changelog, decisions, PRDs); on Claude.ai it is drawn from the conversation.
  You decide the destination *with the user* and shape the handoff for it.
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

### Step 3 — Gather the material and extract the sections

You are building a comprehensive project handoff. Be **faithful, not
generative** — every line must trace to a real source (the conversation, or on
Claude Code the repo). Invent nothing. Where a "why" or a fact was never
recorded, say so (`(reason not stated)`) rather than filling the gap.

The same eleven sections are produced on both surfaces; only where you *get* the
material differs. On **Claude Code the handoff is verified against the repo** —
git and the changelog are truth; a PRD or concept doc is a hypothesis, so never
cite one as evidence that something shipped. On **Claude.ai** every section is
drawn from the conversation.

#### Step 3A — Claude Code only: gather repo facts first

Before writing, collect the real state with the Bash tool (all best-effort —
see graceful degradation below). Suggested reads:

- **Repo state:** `git rev-parse --abbrev-ref HEAD` (branch),
  `git status --short` (working tree), `git log @{upstream}..HEAD --oneline`
  (unpushed commits), and the `version` from `package.json` if present.
- **Timeline:** `git log --date=short --format='%ad %h %s'` — compress into a
  handful of dated milestones, don't transcribe every commit.
- **Session delta (what changed):** if `changelog/commits/` exists, summarize the
  entries newer than the last handoff's date; otherwise
  `git log --since=<last-handoff-date> --oneline` (or the last ~20 commits).
- **Decisions cross-reference:** if `docs/decisions/` exists, read its
  `README.md` index (or list the `NNNN-*.md` ADRs) so decisions can cite
  `[ADR NNNN]` and its status; note real-but-unlogged decisions from
  `docs/decisions/0000-not-logged.md` if present.
- **Features / plan:** workspaces / packages in the repo, and any
  `docs/phases/` task tables, for the Features and Snapshot sections.
- **Conventions:** the target `CLAUDE.md` `## Skill protocols` blocks, for the
  Notes-for-the-receiver section.

#### Step 3B — The sections

1. **What this is** — a one-line definition plus 2–4 sentences: what the project
   or work is and what it is working toward. A zero-memory receiver reads this
   first.
2. **Snapshot — current state** — where it stands *right now*: what is live /
   built / in-progress / not started, and the current phase or stage.
3. **Progress & Timeline** — how it got here, as a few dated milestones. Code:
   summarized from `git log`. Chat: the arc and pivots of the conversation.
4. **Features / Components** — per-area / subsystem / workspace status, ideally a
   `| Area | What it is | Status |` table. Code: real workspaces / phases. Chat:
   the planned features and scope discussed.
5. **Decisions Made** — settled choices, each as `{decision} — {why}`. Include a
   decision only if it was genuinely resolved; `(reason not stated)` if the
   reason was never given; debated items go under Open Questions instead. On
   Code, cite `[ADR NNNN]` and its status when a matching decision record exists.
6. **What this session changed** — the delta since the last handoff, changelog-
   style. Code: the changelog entries / commits since the previous handoff
   (a `| # | Commit | Subject |` table reads well). Chat: the files or artifacts
   produced this session.
7. **Open Questions** — unresolved items, things explicitly deferred, and
   in-flight debates; tag by priority or area where it helps. Code: also
   reconcile the prior handoff's open questions (what's now closed vs. still open).
8. **Files / Repos Referenced** — only paths, filenames, repos, or URLs that
   actually appeared (in the conversation, or as real repo paths), copied
   **verbatim**. Never guess or fabricate a path.
9. **Next Actions for {to}** — concrete, imperative next steps aimed at the
   destination ("Add X to Y", "Refactor Z"). When resuming, reconcile against the
   previous handoff's actions and focus on what is new or changed.
10. **Notes for the receiver** — how to orient: conventions, working style, and
    (Code) an orientation map, **stale-doc findings**, and **exact repo state**
    (branch / unpushed commits / version). Optional but encouraged; use an
    explicit "None." if there's genuinely nothing.
11. **Session Log** — a chronological, **near-verbatim** log of *this* session's
    key exchanges: the asks, the options explored, what was chosen and why, and
    the follow-ups — in the words actually used. This is the one section that
    preserves the back-and-forth itself, not just its conclusions. Rules:
    - **Near-verbatim, not fabricated** — quote what was really said; never
      invent, embellish, or paraphrase an exchange into something never said.
    - **The meaningful beats** — log the substantive turns; compress trivial or
      administrative ones. A long session captures the load-bearing exchanges,
      not literally every message.
    - **Redact secrets** — never log credentials, tokens, or clearly sensitive
      content verbatim; replace with `[redacted]`.
    - If there was essentially no back-and-forth, use an explicit `- None.`.

#### Per-surface sourcing

| Section | Claude Code source | Claude.ai source |
|---|---|---|
| What this is | conversation + repo `README` / PRD | conversation |
| Snapshot | repo state, changelog head, phase docs | conversation (decided / built / assumed) |
| Progress & Timeline | `git log --date=short` → milestones | the conversation's arc / pivots |
| Features / Components | workspaces, `docs/phases/` tables, subsystems | planned features / scope discussed |
| Decisions Made | conversation + cross-ref `docs/decisions/` ADRs (cite #, status) | conversation |
| What this session changed | `changelog/commits/` since last handoff + `git log` delta | files / artifacts produced this session |
| Open Questions | conversation + prior handoff's unresolved + `docs/decisions/0000-not-logged.md` | conversation |
| Files / Repos Referenced | verbatim from conversation + key repo paths | verbatim from conversation |
| Next Actions | conversation, reconciled against prior handoff's actions | conversation |
| Notes for the receiver | CLAUDE.md `## Skill protocols`, orientation map, stale-doc findings, exact repo state | working-style + how-to-use notes |
| Session Log | the current Claude Code session's conversation, near-verbatim | the chat conversation, near-verbatim |

**Graceful degradation (target projects are not this repo).** `changelog/`,
`docs/decisions/`, and `docs/phases/` are conventions of *this* library, not
universal. On Claude Code, treat every repo read as best-effort: if the source
exists, summarize it; if it's absent, fall back to `git log` plus the
conversation, or populate the section from whatever is available. **Never
fabricate** a timeline, changelog, or feature status that isn't backed by git or
the conversation — a smaller honest handoff beats a padded invented one.

**Quality bar:** every line traces to a real source; when unsure, leave it out.
No hedging filler. Keep decided (Decisions) separate from undecided (Open
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
  title case (e.g. "Auth token refresh"). For a whole-project handoff this is the
  project name; for a scoped one it's the work's title.
- **Status** (`{status}`), a short phase / stage label for the header line (e.g.
  "Pre-beta · Validation", "Phase 9 shipped", "MVP in progress"). Derive it from
  the conversation, or on Claude Code from the repo (current phase, latest
  release, what's live). If there's no meaningful stage to state, omit the
  `Status:` line rather than guessing.

### Step 5 — Assemble the handoff

Fill this exact template. Keep the heading structure and order unchanged. The
`Status:` and `Continued from:` header lines are conditional — omit `Status:` if
there's no meaningful stage to state, and omit `Continued from:` unless you are
resuming.

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

## Session Log
{chronological, near-verbatim log of this session's key exchanges — the meaningful back-and-forth, redact secrets}
- **{who}:** {what was asked / said, near-verbatim}
- **Explored:** {options considered} → chose {X} — {why}
- **{who}:** {follow-up / correction}
```

If a section has nothing, keep the header and write an explicit line rather than
leaving it blank or omitting it — e.g. `- None.` / `- None yet.` /
`- None referenced in this conversation.` / `- [ ] (none identified — clarify
scope with the user)`. (For the Features table, an explicit `_None._` line in
place of rows is fine.) A stable shape makes the handoff reliable for the
receiver.

### Step 6A — Claude Code: write the file

1. Target filename: `handoff/handoff-{from}-to-{to}-{date}-{slug}.md`
   (e.g. `handoff/handoff-code-to-chat-2026-07-12-auth-token-refresh.md`).
   The `{slug}` (from Step 4) keeps same-day handoffs on different topics
   distinct.
2. The `handoff/` folder must already exist or have been approved by the user in
   Step 1. Run `mkdir -p handoff` only after that approval.
3. Avoid overwriting: check whether the target name is taken
   (e.g. `ls handoff/handoff-{from}-to-{to}-{date}-{slug}*.md`). If so, append a
   numeric counter before `.md`: `-2`, `-3`, … and use the first free name.
4. Write the assembled brief to that path with the Write tool.
5. Confirm back to the user with the exact final path, e.g. "Handoff brief written
   to `handoff/handoff-code-to-chat-2026-07-12-auth-token-refresh.md`."
6. **If the user declined to create `handoff/`:** skip writing and print the full
   brief inline in your reply instead, so nothing is lost.

### Step 6B — Claude.ai: produce a downloadable artifact

There is no project folder to write into. Output the brief as a downloadable
Markdown artifact named `handoff-{from}-to-{to}-{date}-{slug}.md`. Present the full brief
content and make clear it can be saved and dropped into the destination (e.g.
Claude Code) as starting context. Do not attempt to run Bash or write to a
filesystem path, and skip resume logic.

### Step 6C — Register the handoff protocol in CLAUDE.md (Claude Code only)

After the brief is delivered, offer to register a short handoff-protocol block in
the project's CLAUDE.md so future sessions know to check `handoff/` and use this
skill when moving work across surfaces. This is **best-effort — never let it block
or delay delivery of the brief itself.**

1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept
   `.claude/CLAUDE.md`; prefer an existing file).
2. **Exists** → Read it and search for the literal `<!-- BEGIN skill:handoff-generator -->`.
   If absent, show the block below and ask permission (AskUserQuestion); on yes,
   insert it under a `## Skill protocols` heading (create the heading at the end of
   the file if needed) — never blind-append. If present but outdated, update only
   the text between this skill's markers; else report "already registered." Never
   touch other skills' blocks.
3. **Missing entirely** → don't write a stub; offer a full `/init`-style analysis
   (confirmation-gated) to generate a real CLAUDE.md, then insert the block.

On Claude.ai, skip the write — print the block and tell the user to paste it into
their project's CLAUDE.md.

Canonical block:
```md
<!-- BEGIN skill:handoff-generator -->
### Handoff protocol
When work moves between Claude.ai chat and Claude Code (or to a teammate/another session), generate a handoff brief with `/handoff-generator`. Briefs live in `handoff/handoff-{from}-to-{to}-{date}-{slug}.md`. When resuming, check `handoff/` for the latest relevant brief first.
<!-- END skill:handoff-generator -->
```

### Step 7 — Edge cases

- **Empty / very thin conversation:** if there's essentially nothing to hand off,
  don't fabricate a handoff. Say the conversation is too thin for a useful one
  and ask what the user wants captured.
- **Any section empty:** keep the header and use the explicit "None" line from
  Step 5. Never invent content to fill a section.
- **Missing repo sources (Claude Code):** if `changelog/`, `docs/decisions/`, or
  `docs/phases/` don't exist, degrade gracefully — populate the affected sections
  from `git log` plus the conversation, or mark them from what's available. Never
  invent a timeline, changelog delta, or feature status that isn't backed by git
  or the conversation.
- **Very long conversation / large repo:** prioritize the most recent and most
  load-bearing material; compress older exploration and the timeline into
  milestones. "What this is" stays 2–4 sentences regardless of size — favor what
  the receiver needs over completeness. The **Session Log** likewise captures the
  substantive beats, not every message — compress trivial or repetitive turns.
- **Secrets in the conversation:** never carry credentials, API keys, tokens, or
  clearly sensitive content into the handoff — the Session Log especially. Replace
  with `[redacted]`.
- **User declines the `handoff/` folder:** print the handoff inline (Step 6A.6)
  rather than erroring.
