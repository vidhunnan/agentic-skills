# Add repo-setup skill and scaffold this repo's context stack

- **Commit:** `32e425a386ed3551cc12b9edb615e09366e93393` (`32e425a`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-13

## Commit message

Adds `repo-setup`, a skill that scaffolds a project's context stack — the tiered docs folders (concepts, PRDs, decisions, handoffs, changelog, optional phases) that let an agent with no memory be briefed on a project. Each tier declares the question it answers and how much an agent should trust it.

Two principles govern it:

- Detect, map, confirm — never impose. It surveys the repo first, maps existing folders onto tiers via a name lexicon confirmed by a content sniff, and adopts existing names. Canon only fills gaps. A confidence ladder keeps the interview short: only genuinely ambiguous mappings become questions.
- Additive only. It never moves, renames, deletes, or overwrites. If the right answer requires moving files, it says so and lets the human do it.

Path resolution runs declared-in-CLAUDE.md > exists-on-disk > canon. That is how repo-setup and handoff-generator can disagree about the default handoff location (`docs/handoffs/` vs `handoff/`) without either being wrong — an existing path wins, so no duplicate folder is ever created.

`changelog/` deliberately sits outside `docs/`: docs/ is hand-written hypothesis, changelog/ is generated truth. The folder layout is the done-vs-explored rule.

Also dogfoods the skill on this repo: creates docs/concepts/ and docs/decisions/, adds a README + _TEMPLATE.md to all five tiers (adopting the existing handoff/, docs/prds/, and changelog/ rather than duplicating them), and registers the context-stack routing table in CLAUDE.md. The handoffs and changelog templates are copies of the shapes handoff-generator and changelog-tracker already own, so the stack cannot drift from the skills that fill it.

The CLAUDE.md block is a table rather than the usual one-line rule — a deliberate departure justified in the PRD: every other block encodes one rule, this one encodes a namespace map, and the routing table is the payload.

## Changes in detail

### `skills/repo-setup/SKILL.md` (new)

- The skill itself, in the house Step 0–10 shape. Step 0 detects the surface by Bash availability and resolves the argument mode (*none* = full flow, `check` = survey and report with zero writes, `add <tier>` = one tier).
- Steps 1–2 are the heart of it: a read-only survey drawing on four sources in descending authority (CLAUDE.md protocol blocks → directory census → root markdown → repo-shape flags), then a mapping stage that pairs a name lexicon with a content sniff and sorts results on a confidence ladder. Only LOW-confidence mappings become interview questions, which is what keeps a clean repo down to a single question.
- Step 4 is a hard write gate — the proposed mapping, the "left alone" list, and the exact file list are presented before anything is written.
- Steps 9–10 cover re-run reconciliation (diff the declared stack against the disk; restore only what's missing) and the edge cases, including a published-docs site (where adding `docs/concepts/` would ship hypothesis to production), monorepos, macOS case-insensitivity, and the hard invariant: never `mv`, never `rm`, never rename.

### `docs/prds/repo-setup.md` (new)

- The PRD, per the repo's "write a PRD for anything non-trivial" rule. Records the six tiers and the question each answers, the path-resolution order, the per-surface trigger/output table, and the risks.
- §7 justifies the one deliberate break from house style — the CLAUDE.md block carries a table rather than a one-line rule, because it encodes a namespace map rather than a single rule and an agent must resolve a lookup against it in one read.

### `skills/repo-setup/.claude-plugin/plugin.json` (new)

- Standard plugin manifest at `0.1.0`, so the skill folder is installable as a plugin on its own.

### `.claude-plugin/marketplace.json` (modified)

- Adds the `repo-setup` entry with `source` pointing at `./skills/repo-setup`, so it is installable from the marketplace.

### `README.md` (modified)

- Adds the `repo-setup` row to the Skills table and a `/plugin install repo-setup` line to the Install block.

### `CLAUDE.md` (modified)

- Adds `repo-setup` to the list of skills that register a protocol block, and adds the live `skill:repo-setup` block to Active protocols. The block carries the routing table (which doc type lives at which path, and how far to trust it) plus the done-vs-explored rule.
- The table is rendered from this repo's *confirmed* mapping rather than the canon, so the handoffs row reads `handoff/` — the existing folder — rather than the canonical `docs/handoffs/`.

### `docs/concepts/`, `docs/decisions/` (new)

- The two tiers this repo was missing, each with a `README.md` (stating the tier's question, tense, truth-vs-hypothesis status, author, and lifecycle) and a `_TEMPLATE.md`.

### `docs/prds/README.md`, `handoff/README.md`, `changelog/README.md` + templates (new)

- READMEs and templates for the three tiers that already existed and were adopted under their current names. Nothing in those folders was moved or renamed.
- The handoff and changelog templates reproduce the shapes `handoff-generator` and `changelog-tracker` already own, so the scaffold cannot drift from the skills that fill it.

## Files changed

```
 .claude-plugin/marketplace.json              |   5 +
 CLAUDE.md                                    |  17 +-
 README.md                                    |   2 +
 changelog/README.md                          |  34 ++++
 changelog/_TEMPLATE.md                       |  35 ++++
 docs/concepts/README.md                      |  26 +++
 docs/concepts/_TEMPLATE.md                   |  33 ++++
 docs/decisions/README.md                     |  25 +++
 docs/decisions/_TEMPLATE.md                  |  33 ++++
 docs/prds/README.md                          |  25 +++
 docs/prds/_TEMPLATE.md                       |  54 ++++++
 docs/prds/repo-setup.md                      | 101 ++++++++++
 handoff/README.md                            |  29 +++
 handoff/_TEMPLATE.md                         |  33 ++++
 skills/repo-setup/.claude-plugin/plugin.json |   8 +
 skills/repo-setup/SKILL.md                   | 278 +++++++++++++++++++++++++++
 16 files changed, 737 insertions(+), 1 deletion(-)
```
