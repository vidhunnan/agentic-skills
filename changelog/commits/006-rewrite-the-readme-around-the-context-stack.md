# Rewrite the README around the context stack

- **Commit:** `4ab3c740a7390ca826acf42b697c0c55261a868d` (`4ab3c74`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-07-13

## Commit message

The README had fallen behind the repo. It still opened by calling handoff-generator "the first skill", listed six skills as a flat inventory, and said nothing about the decision log, the changelog, or the context stack that now exist.

Three fixes:

- The install section was one fenced block holding the marketplace command and all six installs together, so copying it ran all six and installing just one meant hand-editing the paste. It is now three independent blocks — add the marketplace, install what you want, and the standalone copy path — each with its own copy button. The per-skill /plugin install command also sits next to the skill's name in the table, where you are already looking.

- The Status column read "Implemented (PRD)" on every row. A column whose cells are all identical carries no information. Status is now Live, and the PRD links are replaced by a single pointer to docs/prds/.

- The Skills table is grouped by job rather than listed flat: repo-setup builds the context stack, changelog-tracker / decisions-logger / handoff-generator fill it, and branch-naming / model-strategy hold the working conventions. The grouping is the mental model — repo-setup is the front door.

Adds two sections. "The context stack" states what each folder is for and how far to trust it, with the done-vs-explored rule: changelog/ is what shipped, everything under docs/ is what we thought. "This repo runs on its own skills" points at the output — the 14 ADRs, the changelog, the model strategy, the handoffs — so a reader can see the result before installing anything. It also links the five decisions whose reasoning was never recorded, which is the part worth being honest about.

## Changes in detail

### `README.md` (modified)

- **Intro rewritten.** The old opening ("The first skill, `handoff-generator`, is implemented and ready to use") was stale — there are six skills now. It leads instead with the premise the library is built on: an agent starts every session with no memory, so it needs a briefing rather than a better prompt, and these skills author that briefing.
- **Install split into three fenced blocks.** Previously a single block mixed `/plugin marketplace add` with all six `/plugin install` lines, so GitHub's copy button copied all seven commands at once. Now: add the marketplace, install what you want, and the standalone `cp -r` path, each independently copyable. The per-skill install command was also added inside each Skills-table row (via `<br>` under the skill name), so a reader can grab one command without leaving the table.
- **Skills table grouped by job** — "Set up the repo" (`repo-setup`), "Keep the record" (`changelog-tracker`, `decisions-logger`, `handoff-generator`), "Working conventions" (`branch-naming`, `model-strategy`). The flat list hid the fact that `repo-setup` builds the folders the other skills fill; the grouping makes that the first thing you see.
- **Status column** changed from `Implemented ([PRD](…))` — identical on every row, and therefore uninformative — to `Live`. The per-row PRD links are replaced by one pointer to `docs/prds/` below the tables.
- **New section: "The context stack."** A table of the five tiers — the question each answers, its folder, and how far to trust it — followed by the done-vs-explored rule. Every path is a link, so it doubles as the repo's "where do I find things" map.
- **New section: "This repo runs on its own skills."** Points at the artifacts the skills produced here: the 14 ADRs in `docs/decisions/`, the per-commit changelog, `docs/MODEL-STRATEGY.md`, the handoff briefs, and the live protocol blocks in `CLAUDE.md`. Includes the link to `0000-not-logged.md` and the five decisions whose reasoning was never recorded — surfacing the gaps rather than hiding them.
- **Repo conventions** trimmed by one bullet (the PRD location, now covered by the Skills section).

### `CLAUDE.md` (modified)

- Step 5 of "Adding a new skill" said "Add a row to the Skills table in `README.md`." There is no longer a single Skills table. Updated to name the three grouped tables and to require adding the skill's `/plugin install` line to the Install block, so the next skill lands in the right group instead of recreating a flat list.

## Files changed

```
 CLAUDE.md |  2 +-
 README.md | 98 ++++++++++++++++++++++++++++++++++++++++++++++++++-------------
 2 files changed, 80 insertions(+), 20 deletions(-)
```
