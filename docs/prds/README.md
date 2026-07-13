# PRDs — What are we still deciding?

**Question:** What are we still deciding?
**Tense:** imperative
**Status:** proposal
**Written by:** human (an agent may draft)
**Lifecycle:** draft → accepted (spawns decisions, and phases if the build is large) → superseded. Requirements are numbered `R1`, `R2`, … so other docs can cite them.

A proposal — a concept that graduated. It's committed enough to write a spec for, but it is **not evidence that anything exists**. A PRD describes what *should* be true. Only the changelog and the code describe what *is*.

## What goes here

- One file per non-trivial skill or feature: `docs/prds/<name>.md`.
- Problem, goals, non-goals, workflow, output templates, numbered requirements, success criteria, risks, open questions.
- Kept in sync when the scope changes. A PRD that lies is worse than no PRD.

## What does NOT go here

- Brainstorming and hunches — that's `../concepts/`.
- The reasoning behind a settled choice — that's `../decisions/`.
- What actually shipped — that's `../../changelog/`. **Never cite a PRD as proof a feature exists.**

## Template

Copy `_TEMPLATE.md`. Note the house quirk the existing PRDs share: `## Non-goals (v1)` is deliberately unnumbered, sitting between `## 2. Goals` and `## 3. Primary user`.
