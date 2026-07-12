---
name: branch-naming
description: Suggests and optionally creates a context-appropriate git branch name that follows the project's convention. Reads the convention from CLAUDE.md, else infers it from existing branches, else helps you define one. Use when the user says "create a branch", "start work on X", "what should I name this branch", "name this branch", or runs /branch-naming. Claude Code only — needs git.
argument-hint: "[work-description]"
allowed-tools: Read, Edit, Bash, AskUserQuestion
disable-model-invocation: false
---

# branch-naming

Names branches consistently. It figures out the project's branch convention, reads the current work context, proposes a conforming name, and — only after you confirm — can create the branch. The convention it uses is recorded in CLAUDE.md so it stays consistent across sessions and people.

This skill only Edits CLAUDE.md and creates branches via git — it authors no standalone files.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:
- **Claude Code** — full flow (git + CLAUDE.md).
- **Claude.ai** — no git. You can still *suggest* names as text following whatever convention the user describes, but you can't read `git branch`, read CLAUDE.md, or create the branch. Say so.

Confirm a git repo: `git rev-parse --show-toplevel`. If it fails, tell the user and stop.

### Step 1 — Determine the convention (in priority order)

1. **From CLAUDE.md** — Read the project's CLAUDE.md. If it states a branch convention (a `<!-- BEGIN skill:branch-naming -->` block, or prose like `<area>/<type>/<slug>`), use it.
2. **Infer from existing branches** — `git branch -a`. Detect the dominant pattern: number of segments, separator, casing, common `type` tokens. Use the most common shape.
3. **Help the user define one** — if there's no signal, ask (AskUserQuestion) offering common shapes: `type/slug` (e.g. `feat/…`), `area/type/slug` (e.g. `web/feat/…`), `user/type/slug`. Record the choice in CLAUDE.md via Step 5.

### Step 2 — Gather the work context

Derive the name from real signals, not invention:
- The conversation (what's being worked on).
- `git status` and `git diff --name-only` — which files/areas are touched.
- The optional `[work-description]` argument, if given.

Map these to the convention's parts: `area` (workstream/directory), `type` (`feat`/`fix`/`chore`/`docs`/… per the convention), `slug` (short kebab-case description).

### Step 3 — Propose name(s) and confirm

Offer 1–3 candidates that conform to the convention. Present via AskUserQuestion so the user picks or edits one. **Wait** — never create a branch silently.

### Step 4 — Create on confirmation (optional)

If the user picks a name and wants it created:
- `git checkout -b <name>`.
- **Warn first** if the working tree is dirty (offer to stash or to branch from the current state) or if you'd be branching off a protected/default base like `prod-stable` or `main` (confirm that's intended).
If the user only wanted a suggestion, stop after proposing.

### Step 5 — Register the branch-naming protocol in CLAUDE.md

Idempotent registration (Claude Code only), substituting the convention you determined:
1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept `.claude/CLAUDE.md`; prefer existing).
2. **Exists** → Read; search for `<!-- BEGIN skill:branch-naming -->`. Absent: show the block, ask (AskUserQuestion), insert under `## Skill protocols` (create the heading if needed), never blind-append. Present: update in place only if the convention changed; else "already registered." Don't touch other skills' blocks.
3. **Missing** → don't stub; offer a full `/init`-style analysis (confirmation-gated) to generate a real CLAUDE.md, then insert.

This matters most when Step 1 had to *define* a new convention — Step 5 persists it so it's used consistently next time.

Canonical block (fill `<CONVENTION>` with what you determined):
```md
<!-- BEGIN skill:branch-naming -->
### Branch naming
Branches follow: <CONVENTION> (e.g. `<area>/<type>/<slug>`, kebab-case). Before creating a branch, derive a name from the work context and this convention, then confirm with the user. Use `/branch-naming` to generate one.
<!-- END skill:branch-naming -->
```

### Step 6 — Edge cases

- **Not a git repo** — stop with an explanation.
- **Detached HEAD** — note it; branching still works but confirm the base.
- **Name already exists** — offer a variant or offer to `git checkout` the existing branch.
- **Protected/default base** (`prod-stable`/`main`) — warn and confirm before branching off it.
- **No clear area** — fall back to `type/slug`.
- **Ambiguous inferred convention** — ask rather than guess.
- **Claude.ai** — suggest-only; can't read git or create the branch.
