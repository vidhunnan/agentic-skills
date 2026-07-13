# Add decisions-logger skill

- **Commit:** `d6ee98657d0dd8d0e9dbb6df0d4ee0f04f6ffca4` (`d6ee986`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-13

## Commit message

Adds `decisions-logger`, which fills the decisions tier repo-setup creates: it mines a project for choices that were actually made and writes each as a numbered ADR with the evidence it came from.

The whole design problem is one risk. Decisions are the truth tier, and mining a repo for "why we chose X" is exactly where a model invents rationale that sounds right — a plausible fabricated reason is indistinguishable from a real one to every future reader, and it poisons the tier the rest of the project trusts. A survey of this repo found ~22 real decisions: 18 with a recoverable why, and 4 without. Those 4 are the trap.

The central mechanism is a source firewall: a candidate may be BORN in a weak source, but may never be JUSTIFIED by one. CLAUDE.md's protocol blocks state rules with no reasoning ("No area segment") — they read exactly like decisions. A ban on reading them would make those 4 decisions unfindable, so instead their prose is forbidden from reaching an ADR's Context, Alternatives, or Consequences. A candidate sourced only from that tier is stamped NOT STATED by construction and routed to the interview, where "I don't remember" is always an offered answer and produces a real ADR reading "(reason not stated)". A decision with an honest gap is worth more than one with a plausible fiction.

Two further invariants: a PRD is never sufficient evidence (proposal != truth — require a commit, a changelog entry, or the artifact on disk), and the Primary citation is ranked by originality rather than recency, so an ADR's "why" is never a paraphrase of a paraphrase.

Also resolves the append-only tension. A superseded ADR still reading "Accepted" lies to the next reader, so append-only is scoped to the REASONING, not the POINTERS: the frozen region is Context/Decision/Alternatives/Consequences, and exactly two mutations are permitted — the Status line and appends under Follow-up. Enforced by a byte-identical check on the frozen body, not by good intentions. The authoritative forward link lives in the append-only Follow-up entry, so nothing load-bearing depends on the one edit allowed.

Updates docs/decisions/_TEMPLATE.md (adds Evidence with a verbatim-quote citation rule, and the Follow-up section) and rewords docs/decisions/README.md to state the two permitted mutations precisely.

## Changes in detail

### `skills/decisions-logger/SKILL.md` (new)

- The skill, in the house Step 0–15 shape. Steps 0–2 detect the surface, resolve the decisions path via `repo-setup`'s order (declared-in-CLAUDE.md → existing folder → canon), and load the existing ADRs plus the reject ledger as the idempotency baseline.
- Step 3 carries the **source firewall** — a tier table governing what each source is *allowed to contribute*. Tier S (MODEL-STRATEGY, handoff §Decisions Made, tier READMEs, CLAUDE.md narrative prose) may supply reasoning; Tier D (protocol blocks, README conventions, CONTRIBUTING) may supply only the rule, never a word of Context, Alternatives, or Consequences.
- Step 4 holds the significance filter. The Fork Test is a hard gate — name the alternative a reasonable person would have chosen, or it's a fact, not a decision. Plus the granularity rule (one fork, one ADR, tested by independent reversal) and the anti-rule that co-location is not co-reasoning.
- Step 5 folds dedup and supersession into a single comparison over a normalized claim, with a four-class reject ledger. `declined` is permanent; `deferred` is a snooze — which is what stops rejected candidates resurfacing on every run forever.
- Step 7 mandates that every interview question offer "I don't remember", producing an ADR with the reason recorded as `(reason not stated)`. Removing that option is what makes a model fill the gap.
- Step 9 defines the two permitted mutations and the byte-identical frozen-body check that enforces them.

### `docs/prds/decisions-logger.md` (new)

- The PRD. §5 states the firewall and the three invariants (no confabulation; proposal ≠ truth; one Primary, ranked by originality not recency), each mapped to the failure mode it kills. §7 makes append-only precise. §9's success criteria are adversarial — the confabulation test, the noise test, and the laundering test each name a specific real line in this repo that must come out a specific way.

### `docs/decisions/_TEMPLATE.md` (modified)

- Adds `## Evidence` (a Primary citation carrying a **verbatim quote as well as a path**, because paths rot; plus a Rationale line that can read *not recoverable*) and `## Follow-up` (dated, append-only). States two citation rules inline: a PRD may never be the Primary source, and never cite a summary as the source of a why it is summarising.
- The Alternatives section now carries the Fork Test in prose, and the footer names the two mutations that may ever change the file.

### `docs/decisions/README.md` (modified)

- Rewords the lifecycle rule from a flat "never edit a decision" to the precise version: the *reasoning* is frozen, the Status line is a navigational pointer, and Follow-up is append-only. Reserves `0000` for the reject ledger.

### `.claude-plugin/marketplace.json`, `README.md` (modified)

- Registers the plugin and adds the Skills-table row plus the install line.

### `CLAUDE.md` (modified)

- Adds the live `skill:decisions-logger` block. Three paragraphs: the append-only rule, the **proactive trigger** (offer to log a decision before a commit that changes a convention, or at the end of a substantial piece of work — but offer *once*, and take no for an answer), and the anti-confabulation clause, which must survive into every future session even if the skill is never invoked.

## Files changed

```
 .claude-plugin/marketplace.json                    |   5 +
 CLAUDE.md                                          |  11 +-
 README.md                                          |   2 +
 docs/decisions/README.md                           |  19 +-
 docs/decisions/_TEMPLATE.md                        |  73 ++++-
 docs/prds/decisions-logger.md                      | 139 ++++++++
 skills/decisions-logger/.claude-plugin/plugin.json |   8 +
 skills/decisions-logger/SKILL.md                   | 355 +++++++++++++++++++++
 8 files changed, 595 insertions(+), 17 deletions(-)
```
