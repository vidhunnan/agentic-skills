# 0011. `repo-setup`'s CLAUDE.md block is a routing table, not a one-line rule

- **Status:** Accepted
- **Date:** 2026-07-13

## Context

The house pattern for a protocol block, established by [0002](./0002-enforce-conventions-in-claude-md-not-git-hooks.md), is one delimited block holding a short prose rule of roughly one to five lines. Every skill that registers a convention follows it: *document every commit*, *name branches this way*, *follow the model policy*.

`repo-setup`'s convention is not a rule of that shape. What it needs a future session to know is **six paths, each with a trust level** — where a concept goes, where a PRD goes, and how far to believe each one. That is a namespace, not a rule.

## Decision

`repo-setup`'s block carries a **routing table** — a row per tier, with the question it answers, its path, and its status — plus the done-vs-explored rule stated once in bold. It is longer than every other protocol block in the library, deliberately.

## Alternatives considered

- **Render the six paths as prose, matching the house one-line form** — the consistent choice. It lost on both of the axes that matter: as prose it would be *longer* than the table, and less parseable. An agent has to resolve "where does this doc go?" in a single lookup, and a table is what a lookup wants.
- **Skip the block and let the folder READMEs carry the routing** — rejected because a README is only read if you already know to open that folder, which is precisely what the agent doesn't know.

## Consequences

- An agent can route a document in one read, without opening six READMEs.
- The library's protocol blocks are no longer uniform in shape, so "a protocol block is a short rule" stops being a reliable generalisation about this repo.
- The departure was justified in the PRD and flagged in the pull request rather than made quietly — the precedent being set is that a block may take whatever shape its payload actually needs, provided the reason is written down.

## Evidence

- **Primary:** `skills/repo-setup/SKILL.md` Step 6
  > This block is longer than the one-rule blocks the sibling skills register, and deliberately so: every other block encodes a single rule, while this one encodes a **namespace map**. The routing table *is* the payload — an agent must be able to resolve "where does this doc go?" in one lookup. Rendered as prose it would be both longer and less parseable.
- **Corroborating:** `docs/prds/repo-setup.md` §7 CLAUDE.md registration · `CLAUDE.md` `skill:repo-setup` block (the artifact itself) · `git:32e425a` (2026-07-13) — shipping evidence.
- **Rationale:** stated in the primary source

## Follow-up

*Append-only. Everything above this heading is frozen.*

- **2026-07-13** — Precedent used. `decisions-logger`'s block is also longer than the house norm (three paragraphs: the rule, the proactive trigger, the anti-confabulation clause). Evidence: `CLAUDE.md` `skill:decisions-logger` block, `git:d6ee986`.

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that supersedes it and links back._

_**Exactly two things in this file may ever change:** the `**Status:**` line and additions under `## Follow-up`._
