# PRD — changelog-tracker

Status: Draft v0.1 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

Commits capture *what* changed but rarely the *why*, and that context evaporates as history grows. There's no durable, human-readable narrative of a project's evolution — reading `git log` months later is archaeology. The `reviz.tools` repo solved this by hand with a `changelog/` convention; this skill makes that convention reusable and automatic.

## 2. Goals

- Every substantive commit gets a per-commit file at `changelog/commits/NNN-slug.md` with the full story (hash, author, date, PR, verbatim message, per-file what+why, diffstat).
- A rolling `changelog/CHANGELOG.md` index stays current (per-commit table newest-first + dated Keep-a-Changelog sections).
- All data comes from git — faithful, never fabricated.
- Registers itself in the project's CLAUDE.md so future sessions document commits without being asked.

## Non-goals (v1)

- Not a release-notes / version-bump generator — it records commits, not releases.
- Not automatic without the CLAUDE.md protocol block — there are no git hooks (see §9).
- No whole-history backfill in v1 (one commit / small range at a time).

## 3. Primary user

Vids and anyone maintaining a repo who wants a legible commit narrative. Mirrors the `reviz.tools/changelog/` discipline.

## 4. Core workflow

1. Claude makes a commit (or the user runs `/changelog-tracker`).
2. Resolve target commit(s); skip merge and changelog-only commits.
3. Gather metadata, message, per-file changes, and diffstat from git.
4. Compute the next `NNN` and a kebab slug.
5. Ensure `changelog/` scaffold exists (ask first).
6. Write `changelog/commits/NNN-slug.md`.
7. Update `changelog/CHANGELOG.md` (table row + dated entry).
8. Register the changelog protocol in CLAUDE.md.
9. Confirm paths and report skips.

## 5. Output templates

**Per-commit file** (`changelog/commits/NNN-slug.md`):
```md
# {subject}

- **Commit:** `{full}` (`{short}`)
- **Author:** {author}
- **Date:** {YYYY-MM-DD}
- **PR:** #{NN}

## Commit message
{verbatim body}

## Changes in detail
### `{path}` (new | modified | deleted)
- what + why

## Files changed
```
{diffstat}
```
```

**Index** (`changelog/CHANGELOG.md`): preamble; a "Per-commit documentation" table (`# | Commit | Date | Subject`, newest-first, `#` links to the commit file); dated `## YYYY-MM-DD` sections with `### Added/Changed/Fixed/Removed` bullets `**Title** (\`hash\`) — summary`.

## 6. Functional requirements

| Surface | Trigger | Data source | Output |
|---|---|---|---|
| Claude Code | after a commit, or `/changelog-tracker [commit-ref]` | git (`git log -1`, `git show --stat`) | `changelog/commits/NNN-slug.md` + updated `CHANGELOG.md` |
| Claude.ai | explicit mention | pasted `git show`/`git log` output | formatted entry printed inline (no file writes) |

## 7. CLAUDE.md registration

Idempotent injection of a `<!-- BEGIN skill:changelog-tracker -->…<!-- END -->` block under `## Skill protocols`, matched on the literal markers (never the title). If CLAUDE.md is missing, offer a full `/init`-style generation (confirmation-gated) before inserting.

## 8. Success criteria

- Every substantive commit gets a correctly-numbered file matching the reference format; merge and changelog-only commits are skipped.
- `NNN` is monotonic and never overwrites.
- The index table is newest-first and links resolve.
- The protocol block lands in CLAUDE.md once (idempotent on re-run).

## 9. Risks

- **"After commit" auto-invocation isn't guaranteed** — there's no hook. The registered CLAUDE.md block is the (soft) mitigation; without it, the skill only runs on explicit `/changelog-tracker`.
- **Numbering races** — mitigated by re-scan + bump immediately before write.
- **Documenting its own commit** — mitigated by the changelog-only-diff filter.

## 10. Open questions for v2

- Whole-history backfill mode.
- Enrich entries from the PR body / linked issues.
- Multi-repo or monorepo-scoped changelogs.
