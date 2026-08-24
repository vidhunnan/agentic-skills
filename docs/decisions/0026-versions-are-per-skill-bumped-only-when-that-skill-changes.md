# 0026. Versions are per skill, bumped only when that skill changes

- **Status:** **Accepted**
- **Date:** 2026-08-24

## Context

Every skill in this library carries a `version` in its own
`skills/<name>/.claude-plugin/plugin.json` — that has been true since
[0001](./0001-each-skill-folder-is-also-a-plugin.md) made each folder a plugin. What was
never decided is what those numbers *mean*, and the evidence is that nobody knew: on
2026-08-24, fourteen skills sat at `0.1.0` and `handoff-generator` at `0.5.0`, with no
record anywhere of why one had moved four times and the others not at all.

Nothing forced the question until `version-manager` was built (`git:06cc137`). Its whole
argument is that a version is a claim about what shipped, and a repo that cannot say what
its own numbers mean cannot install a skill that says so. Dogfooding it required answering
the question first.

The constraint that decides it is how these are consumed. A skill installs **individually**
— `/plugin install branch-naming` — so the version a user sees is attached to one skill,
not to the library it came from.

## Decision

We chose per-skill versions, bumped **only when that skill changes**. A release that
touches `design-critique` moves `design-critique` and nothing else; new skills start at
`0.1.0`; the released version is a commit on `prod-stable`, since installs resolve from the
default branch. `changelog/VERSION-LOG.md` carries the part a scattered set of numbers
cannot state on its own — which skills moved, and when.

## Alternatives considered

- **One library-wide version, moved on every release.** Genuinely simpler: one number to
  reason about, one row per release in the ledger, no possibility of two skills
  disagreeing about what "current" means, and the count of skills stops mattering. It lost
  on the consumption model — a user who reinstalls `branch-naming` and sees it go `0.4.0` →
  `0.5.0` has been told something changed in a skill they hold, when what changed was a
  design skill they never installed. A version that moves for reasons unrelated to the
  thing it labels teaches the reader to ignore it.
- **Per-skill versions, but leave today's numbers untouched — no baseline row.** The same
  rule going forward, with the ledger starting at the next real bump. It lost because the
  numbers as they stand are the only record of what shipped before today; a ledger that
  starts without them starts by omitting the one fact it exists to preserve.

## Consequences

- A version bump on any skill now means something specific: **that skill** changed. The
  uneven numbers stop being an anomaly and become the record — `handoff-generator` at
  `0.5.0` is a legible statement that it has been revised five times.
- The ledger can answer "which skills moved in this release", which a single library
  version could never express.
- **There is no "version of agentic-skills."** Nobody can cite one, in an issue, a README,
  or a support conversation; the honest answer is always fifteen numbers. This is the cost,
  and it was accepted knowingly.
- **A cross-cutting change now means fifteen bumps in one commit.** Edit the shared
  protocol-block mechanism, or the surface-detection step every skill shares, and every
  affected `plugin.json` moves — which is more bookkeeping than a single number, and more
  chances to miss one. `/version-manager status` is the mitigation, not a guarantee.
- Fifteen version fields is fifteen places to drift. What limits the damage is that
  `plugin.json` is the **only** file carrying a version — the marketplace entry, `skills.ts`
  and the README row carry none, so they are a registration check, not a version surface.

## Evidence

- **Primary:** `docs/VERSIONING.md` §"The unit of release is the skill, not the library" —
  written at the decision, in the file the decision created.
  > Each skill installs on its own (`/plugin install <name>`), so each carries **its own
  > version, bumped only when that skill changes**. A library-wide bump would tell someone
  > reinstalling `branch-naming` that something changed in a skill they don't have.
  >
  > This is why the versions are uneven and should stay uneven: `handoff-generator` is at
  > `0.5.0` because it has been revised five times; everything else is at `0.1.0` because
  > it has shipped once.
- **Corroborating:** `git:55ebabc` (2026-08-24), the commit that adopted the policy and
  seeded `changelog/VERSION-LOG.md` · `changelog/VERSION-LOG.md` §Baseline, which records
  the fourteen versions as read from disk and states outright that the reasoning behind
  `handoff-generator`'s four bumps is not recoverable ·
  [0001](./0001-each-skill-folder-is-also-a-plugin.md), which made each folder a plugin and
  so created the version field this decision gives meaning to ·
  `skills/version-manager/references/profiles.md` §"Claude Code plugin / skill", the
  general form of the same rule.
- **Rationale:** **supplied by the owner on 2026-08-24, by selecting this option over two
  named alternatives** in the session that built `version-manager`. The reasoning recorded
  above is the reasoning that was *presented with* the option, not wording the owner
  supplied — they chose it, they did not argue it. Per
  [0014](./0014-never-invent-a-rationale.md) that distinction is kept rather than smoothed
  over: the record of a choice is not the same as a record of the arguing behind it.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated and
additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new decision that
supersedes it and links back. Being wrong on the record is more useful to the next reader
than a clean file._

_**Exactly two things in this file may ever change:** the `**Status:**` line (to point at a
superseding decision) and additions under `## Follow-up`. The Status line is a convenience —
the authoritative forward link is the dated Follow-up entry. Everything else is frozen._
