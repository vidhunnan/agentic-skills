# 0003. Surface detection is Bash availability

- **Status:** Accepted
- **Date:** 2026-07-12

## Context

Skills in this library run on two surfaces that share no state: Claude Code (a real filesystem, git, a project folder) and Claude.ai (no shell, no persistent project folder). The same skill has to produce different output mechanics depending on where it runs — writing a file into the repo on one, producing a downloadable artifact on the other.

A skill therefore has to know, at runtime, which surface it is on.

## Decision

Detect the surface by **Bash availability**: if the Bash tool works, you are on Claude Code; if it does not, you are on Claude.ai. Every multi-surface skill opens with a `Step 0 — Detect your surface` that makes this check before doing anything else.

## Alternatives considered

- **A frontmatter flag or config value declaring the surface** — it lost because it has to be set correctly by someone, and a stale or wrong value fails silently in the direction that does the most damage (attempting a file write where there is no filesystem).
- **Asking the user which surface they're on** — an extra question, on every single run, to learn something the environment already knows.

## Consequences

- The signal is a clean binary that maps exactly onto the capability the branch actually needs: the thing gated is filesystem access, and Bash availability *is* filesystem access. There is nothing to configure and nothing to keep in sync.
- The check is implicit rather than declared, so a reader of a `SKILL.md` has to know the convention to understand why Step 0 looks the way it does. Mitigated by every skill spelling it out in the same words.

## Evidence

- **Primary:** `handoff/handoff-code-to-chat-2026-07-12-build-publish-skill.md` §Decisions Made
  > Surface detection = Bash availability (available → Claude Code; unavailable → Claude.ai) — clean binary signal mapping to the capabilities each branch needs.
- **Corroborating:** `skills/handoff-generator/SKILL.md` Step 0 — *"If you can run a shell command, you are on Claude Code."* · `git:dca4561` (2026-07-12) — shipping evidence. Now present in all six skills.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-13** — Scope widened to every skill in the library. `repo-setup` and `decisions-logger` both open on the same Bash-availability check. Evidence: `git:32e425a`, `git:d6ee986`.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
