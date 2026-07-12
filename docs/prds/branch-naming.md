# PRD — branch-naming

Status: Draft v0.1 · Owner: Vids · Repo: vidhunnan/agentic-skills

## 1. Problem

Branch names drift — everyone invents their own shape, and the "real" convention lives only in a maintainer's head. Inconsistent names make history and automation harder. `reviz.tools` documents a `<area>/<type>/<slug>` convention in CLAUDE.md; this skill reads (or establishes) such a convention and applies it.

## 2. Goals

- Propose a branch name that fits the project's convention and the current work.
- Determine the convention automatically (CLAUDE.md → infer from branches → help define).
- Always confirm before creating; never branch silently.
- Persist a newly-defined convention in CLAUDE.md.

## Non-goals (v1)

- Not a full git-flow manager — it doesn't push, open PRs, or manage merges.
- Doesn't rename existing branches.

## 3. Primary user

Vids and contributors who want consistent, low-friction branch names.

## 4. Core workflow

1. Determine the convention (CLAUDE.md → `git branch -a` → ask).
2. Gather work context (conversation + changed files + optional arg).
3. Propose 1–3 conforming candidates; user confirms/edits.
4. Optionally `git checkout -b` on confirmation (with protected-base/dirty-tree warnings).
5. Register/record the convention in CLAUDE.md.

## 5. Convention-resolution order

1. **CLAUDE.md** — explicit `skill:branch-naming` block or prose convention.
2. **Infer** — dominant pattern in `git branch -a` (segments, separator, casing, type tokens).
3. **Define** — offer `type/slug`, `area/type/slug`, `user/type/slug`; record the choice.

## 6. Functional requirements

| Surface | Trigger | Convention source | Output / side-effect |
|---|---|---|---|
| Claude Code | `/branch-naming [work-description]`, "create a branch", "start work on X" | CLAUDE.md / inferred / defined | proposed name(s); optional `git checkout -b`; convention recorded in CLAUDE.md |
| Claude.ai | explicit mention | user-described | suggested name(s) as text only |

## 7. CLAUDE.md registration + convention recording

Idempotent `<!-- BEGIN skill:branch-naming -->…<!-- END -->` block under `## Skill protocols`, with `<CONVENTION>` substituted. Full `/init`-style generation offered (confirmation-gated) if CLAUDE.md is absent.

## 8. Success criteria

- Proposed names match the resolved convention.
- The user always confirms before a branch is created.
- A newly-defined convention is persisted and reused next session.

## 9. Risks

- **Protected base** — mitigated by warning before branching off `prod-stable`/`main`.
- **Ambiguous inferred convention** — mitigated by asking rather than guessing.

## 10. Open questions for v2

- Derive names from ticket/issue IDs.
- Integrate with worktrees for parallel branches.
