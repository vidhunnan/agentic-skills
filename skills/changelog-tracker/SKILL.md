---
name: changelog-tracker
description: Documents every substantive commit into a per-commit changelog file plus a rolling CHANGELOG index, mirroring a Keep-a-Changelog layout. Use after Claude makes a commit, or when the user says "update the changelog", "document this commit", "log this commit", "changelog this", or runs /changelog-tracker. Claude Code only — needs git and a filesystem.
argument-hint: "[commit-ref]"
allowed-tools: Read, Write, Edit, Bash, AskUserQuestion
disable-model-invocation: false
---

# changelog-tracker

Turns commits into a durable, human-readable record. For each substantive commit it writes a per-commit file at `changelog/commits/NNN-slug.md` (the full "what changed and why") and adds an entry to a rolling `changelog/CHANGELOG.md` index. This is what keeps a project's history legible long after the diffs scroll out of view.

The guiding rule is **faithful, not generative**: every fact comes from git. Never invent a rationale, a file, or a hash.

## Instructions

### Step 0 — Detect your surface

Decide where you're running before doing anything, using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem + git repo. Proceed with the full flow.
- **Claude.ai** — no Bash, no git. You can't read commits here. Offer instead to format a per-commit entry from `git show` / `git log` output the user pastes in, and skip all file writes and CLAUDE.md registration. Don't error — degrade gracefully.

Confirm you're in a git repo: `git rev-parse --show-toplevel`. If it fails, tell the user this isn't a git repository and stop.

### Step 1 — Resolve which commit(s) to document

- Default target is `HEAD` (the just-made commit) when invoked after a commit or via `/changelog-tracker` with no argument.
- If a `[commit-ref]` or range is given, use it.
- Detect what's already documented: scan `changelog/commits/*.md` for recorded hashes. If several undocumented commits exist, list them and confirm which to document (AskUserQuestion) rather than guessing.

### Step 2 — Filter (keep the log clean)

Skip commits that shouldn't be documented, and say why when you skip:

- **Merge commits** — `git log -1 --format=%P <ref>` returns 2+ parents.
- **Changelog-only commits** — `git show --stat --format='' <ref>` touches only paths under `changelog/`. This is how the log avoids chasing its own tail (the commit that adds a changelog entry never gets its own entry).

### Step 3 — Gather data from git (never invent)

Per commit, pull everything from git:

- Metadata + message: `git log -1 --format='%H%n%h%n%an%n%ad%n%s%n%b' --date=short <ref>` → full hash, short hash, author, date (`YYYY-MM-DD`), subject, body.
- PR number: parse `(#NN)` from the subject/body. If none, omit the PR line entirely — don't fabricate one.
- Diffstat: `git show --stat --format='' <ref>`.
- Per-file "what + why": read the diff (`git show <ref>` or per file). Describe what changed and why. Take "why" from the commit message or the evident intent of the diff; if the rationale genuinely isn't recoverable, describe the *what* and note the reason isn't stated — never make one up.

### Step 4 — Compute the number and slug

- **NNN** = (highest existing 3-digit prefix in `changelog/commits/`) + 1, zero-padded to 3 digits (`001`, `017`, `126`). If the folder is empty/new, start at `001`.
- **slug** = kebab-case of the commit subject (lowercase, spaces→hyphens, strip anything not `[a-z0-9-]`, trim length to keep the filename reasonable).
- Re-scan the folder immediately before writing and bump NNN on collision — never overwrite an existing numbered file.

### Step 5 — Ensure the scaffold exists

If `changelog/` or `changelog/CHANGELOG.md` is missing, ask before creating it (AskUserQuestion). On yes: `mkdir -p changelog/commits` and seed `changelog/CHANGELOG.md` with a short preamble and the empty per-commit table header (see Step 7). Never create silently.

### Step 6 — Write `changelog/commits/NNN-slug.md`

Use this exact structure:

```md
# {commit subject / title}

- **Commit:** `{full-hash}` (`{short-hash}`)
- **Author:** {author}
- **Date:** {YYYY-MM-DD}
- **PR:** #{NN}

## Commit message

{verbatim commit message body}

## Changes in detail

### `{path/to/file}` (new | modified | deleted)
- What changed in this file.
- Why it changed (from the message or evident intent).

### `{path/to/another}`
- …

## Files changed

```
{git diffstat output}
```
```

Omit the `**PR:**` line if there's no PR number. Keep the per-file subsections prose (what + why), not a line-by-line diff.

### Step 7 — Update `changelog/CHANGELOG.md` (Edit, in place)

Two updates:

1. **Per-commit table** — add a row at the top (newest-first):
   `| [{NNN}](./commits/{NNN}-{slug}.md) | \`{short-hash}\` | {YYYY-MM-DD} | {subject} |`
   The table header (create it when seeding in Step 5):
   ```md
   | # | Commit | Date | Subject |
   |---|--------|------|---------|
   ```
2. **Dated section** — under a `## {YYYY-MM-DD}` heading (create it if today's isn't there yet), add a Keep-a-Changelog-style bullet under the right group:
   `### {Added|Changed|Fixed|Removed}` → `- **{Title}** (\`{short-hash}\`) — {one-line summary}.`
   Infer the group from the commit type prefix (`feat`→Added, `fix`→Fixed, `docs`/`refactor`/etc.→Changed, revert/remove→Removed); default to **Changed**.

### Step 8 — Register the changelog protocol in the project's CLAUDE.md

So future sessions follow this automatically, register a protocol block (Claude Code only; on Claude.ai, print it and ask the user to paste it in):

1. Locate CLAUDE.md: `git rev-parse --show-toplevel` → `<root>/CLAUDE.md` (accept `.claude/CLAUDE.md`; prefer an existing file over inventing a new location).
2. **If CLAUDE.md exists:** Read it and search for the literal `<!-- BEGIN skill:changelog-tracker -->`.
   - **Absent** → show the block below, ask permission (AskUserQuestion). On yes, insert it under a `## Skill protocols` heading (create that heading at the end of the file if it doesn't exist). Never blind-append.
   - **Present** → replace only the text between this skill's markers if it differs from the canonical block; otherwise report "already registered." Never touch other skills' blocks.
3. **If CLAUDE.md is missing entirely:** do NOT write a stub. Offer to generate a real one (analyze README, package manifests, build/test config, directory layout, and `git log` for workflow signals — the equivalent of `/init`) and only do so on explicit confirmation. Then insert the block.

Canonical block:
```md
<!-- BEGIN skill:changelog-tracker -->
### Changelog protocol
After every substantive commit (skip merge commits and changelog-only commits), document it: create `changelog/commits/NNN-slug.md` (NNN = next zero-padded 3-digit number, slug = kebab-case of the subject) and update `changelog/CHANGELOG.md` (per-commit table newest-first, plus the dated section). Pull all data from git (`git log -1`, `git show --stat`). Run `/changelog-tracker` if unsure of the format.
<!-- END skill:changelog-tracker -->
```

### Step 9 — Confirm back

Report the exact file(s) written/updated and any commits you skipped, with the reason (merge / changelog-only / already documented).

### Step 10 — Edge cases

- **Nothing new to document** — say so and stop; don't manufacture an entry.
- **Not a git repo** — `git rev-parse` fails → explain and stop.
- **Numbering race** — re-scan and bump `NNN` right before writing; never overwrite.
- **Already documented** — skip and report which commit and where it lives.
- **Very large diffstat** — truncate the fenced diffstat with a `… (N more files)` note, but keep the per-file prose for the significant files.
- **Missing author / PR** — omit the field, don't invent it.
- **User declines the scaffold** — print the assembled per-commit entry inline instead of writing.
