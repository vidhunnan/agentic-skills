# Scaffold the design context stack on this repo, by running design-setup

- **Commit:** `419fc6ab5cb1e8749e9446974846f86de92788b9` (`419fc6a`)
- **Author:** Claude
- **Date:** 2026-08-16

## Commit message

The first real execution of design-setup, against an adversarial case rather
than a clean one.

Survey found no design tier anywhere, and the only design material -- three
landing-page drafts plus the talk deck -- sitting in docs/concepts/website/,
inside a tier skill:repo-setup declares. All six tiers scaffolded; the
explorations tier ADOPTS docs/concepts/website/ rather than moving anything,
because this stack is additive-only.

That adoption exposed a sharper problem than the path-collision rule the
skill already had. docs/concepts/ is declared "hypothesis, disposable" and
its README says delete or graduate; explorations is append-only and a killed
direction is never deleted. Nested, the two routing tables would tell an
agent the same files are both disposable and undeletable.

Resolved in both places rather than left latent: the adopted folder's README
carries an exemption notice, and one sentence is added to skill:repo-setup's
block exempting that subfolder. Editing another skill's block is the one
sanctioned exception in design-setup Step 10 and required explicit
confirmation, which the approved plan supplied.

Two defects found and fixed in design-setup:
- 2f (new): no rule for nested adoption, and no check for contradictory
  trust labels between two stacks. Now: name the conflict before writing,
  resolve in both places, and decline the adoption if the user declines the
  exemption -- an unreconciled contradiction is worse than an empty tier.
- Step 3: the scope question and the Step 4 write gate were adjacent
  AskUserQuestions, so a greenfield repo got asked twice about the same
  thing. Scope now folds into the gate when it is the only open question.

README gains a design stack section alongside the context stack.

Verified: 0 renames, 0 deletions; re-run reports no drift; four
pre-existing CLAUDE.md blocks byte-identical, repo-setup's changed only by
the exemption sentence.

## Changes in detail

### `CLAUDE.md` (modified)

- Two new protocol blocks — skill:design-setup (the seven-tier routing table, rendered from the confirmed paths) and skill:design-decisions. Plus one sentence added to skill:repo-setup's block exempting docs/concepts/website/ from the concepts tier's disposable lifecycle. That edit to another skill's block is the sanctioned exception in design-setup Step 10 and required explicit confirmation.

### `README.md` (modified)

- The design stack section: seven tiers as a trust table, the two distinctions code doesn't need, and why there is deliberately no design changelog.

### `design/briefs/README.md` (new)

- Tier README — five canon fields, what goes here, what does not.

### `design/briefs/_TEMPLATE.md` (new)

- Brief template. Non-goals and anti-goals are separate sections; every section keeps its heading even when empty.

### `design/decisions/README.md` (new)

- Tier README, including why this tier is harder than the architectural log: design leaves no evidence to mine.

### `design/decisions/_TEMPLATE.md` (new)

- Design ADR shape — adds `What we gave up` and `What would make us revisit` to the standard ADR sections.

### `design/research/README.md` (new)

- Tier README. States the observation/interpretation split that is the tier's reason to exist.

### `design/research/_TEMPLATE.md` (new)

- Research template with Observations and Interpretation as separate, clearly-labelled sections, plus a Premises section for recording when a study's context expires.

### `design/specs/README.md` (new)

- Tier README. A spec that does not name its source version is a spec nobody can trust.

### `design/specs/_TEMPLATE.md` (new)

- Spec template. The States table enumerates empty/loading/error/disabled/overflow — the states nobody draws and that ship broken.

### `design/system/README.md` (new)

- Tier README, carrying the warning that a rule stated without reasoning is the highest-risk input in the stack.

### `design/system/_TEMPLATE.md` (new)

- System template with a mandatory `When not to use it` section.

### `docs/concepts/website/README.md` (new)

- The adopted explorations tier's README, carrying the exemption notice and an inventory of what in the folder is an exploration and what is not.

### `docs/concepts/website/_TEMPLATE.md` (new)

- Exploration thread template — rounds with Testing / What changed / What we learned / Verdict.

### `skills/design-setup/SKILL.md` (modified)

- Two defects fixed from the run: new Step 2f covering nested adoption and contradictory trust labels between two stacks; and Step 3's scope question now folds into the Step 4 gate when it is the only open question, instead of asking twice in a row.

## Files changed

```
 CLAUDE.md                          | 30 ++++++++++++++++++++
 README.md                          | 26 +++++++++++++++++
 design/briefs/README.md            | 29 +++++++++++++++++++
 design/briefs/_TEMPLATE.md         | 54 +++++++++++++++++++++++++++++++++++
 design/decisions/README.md         | 37 ++++++++++++++++++++++++
 design/decisions/_TEMPLATE.md      | 58 ++++++++++++++++++++++++++++++++++++++
 design/research/README.md          | 28 ++++++++++++++++++
 design/research/_TEMPLATE.md       | 40 ++++++++++++++++++++++++++
 design/specs/README.md             | 27 ++++++++++++++++++
 design/specs/_TEMPLATE.md          | 53 ++++++++++++++++++++++++++++++++++
 design/system/README.md            | 33 ++++++++++++++++++++++
 design/system/_TEMPLATE.md         | 49 ++++++++++++++++++++++++++++++++
 docs/concepts/website/README.md    | 54 +++++++++++++++++++++++++++++++++++
 docs/concepts/website/_TEMPLATE.md | 37 ++++++++++++++++++++++++
 skills/design-setup/SKILL.md       | 30 ++++++++++++++++++++
 15 files changed, 585 insertions(+)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
