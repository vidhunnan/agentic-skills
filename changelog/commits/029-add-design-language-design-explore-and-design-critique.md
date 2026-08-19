# feat(skills): add design-language, design-explore and design-critique

- **Commit:** `0606be989cbe422bad34ab7df6491773115dc3fa` (`0606be9`)
- **Author:** Vidhunnan Murugan
- **Date:** 2026-08-19

## Commit message

Ports the three skills incubated in a consuming repo into the library, with a
rigor pass against the bar set by design-setup and design-decisions.

They fill the gap between "write a brief" and "log the decision": design-language
states the visual intent, design-explore generates candidate directions against it,
design-critique checks built work against it. Each was already written to the house
shape (Step 0 surface detection, A/B delivery split, Edge cases last); what they
lacked was check mode, an explicit write gate, and ADR-grounded path resolution.

Added to all three:

- `check` mode — read-only, zero writes. Answers the one question that decides
  whether the skill can run at all: is there a stated intent yet?
- One confirmation gate before any write, printing the full file plan, with the
  house "Nothing is written before this" invariant.
- Path resolution cites ADR 0010 explicitly, so an adopted tier path beats a
  canonical folder sitting on disk.
- Edge cases for no-git, missing tier, reconcile-never-rebuild, and secrets.

design-explore carries the three ADR 0022 conditions in the skill body, not only in
the ADR — they are what make it legal here, so they belong where an author editing
the skill will see them. Its matrix template stamps a candidates-not-a-record
blockquote for the same reason.

design-critique cites ADR 0021, which named it directly, and now requires every
finding to cite the intent it violates — a finding with an empty `Against:` line is
a preference, not a finding.

`exploration-log` gains one reciprocal `when_to_use` pointer so the shared word
"explore" routes by tense: it records a round that happened, design-explore
generates candidates. Scoped, not broadened.

## Changes in detail

### `skills/design-language/SKILL.md` (new)

- Interviews into a written visual direction and writes `{system}/language-{slug}.md`
  — surface and brand posture, references and the anti-reference, constraints as
  falsifiable rules, vocabulary, and the failure condition.
- Three governing rules kept from the source: *ask, never propose*; *the negative
  does half the work*; *a constraint you can't break isn't a constraint*.
- New in this port: `check` mode (Steps 1–2 plus a report, zero writes), a Step 6
  write gate showing Hard constraints and the anti-reference back before writing,
  and a revision path that asserts untouched sections are byte-identical before
  appending.
- States that it is the ADR 0022 gate on `design-explore`, so its quality sets the
  ceiling on anything generated from it.

### `skills/design-explore/SKILL.md` (new)

- Generates three directions differing on named structural axes, each with a name,
  thesis, bet, risk and axis, into `{explorations}/{slug}/` alongside a contact
  sheet.
- Carries a dedicated `## Why this skill is allowed to generate at all` section
  stating the three ADR 0022 conditions as a numbered list, with the line that drop
  any one and 0021's objection applies again.
- The `directions.md` template stamps a candidates-not-a-record blockquote; Step 8
  hands the verdict to `exploration-log` / `design-decisions` and an edge case
  declines if the user asks this skill to record a winner.
- New in this port: `check` mode, a full-file-plan write gate, and an edge case for
  a non-git working directory.

### `skills/design-critique/SKILL.md` (new)

- Reviews built work against stated intent — perceptual diagnosis before any fix,
  Delete listed first among the five verdicts, findings ranked by severity and
  capped at roughly seven.
- The Step 1 hard gate is cited to ADR 0021, which named this skill directly.
- New in this port: `check` mode that surfaces the gate before a user invests in a
  review; a rule that every finding must cite the intent it violates or be dropped;
  an explicit three-option persist offer with never-write-without-acceptance; and an
  edge case for reviewing a `design-explore` round without declaring a winner.

### `skills/design-{language,explore,critique}/.claude-plugin/plugin.json` (new)

- Four keys each in house order, `version: "0.1.0"`, one-line descriptions carrying
  no trigger phrases or surface note.

### `skills/exploration-log/SKILL.md` (modified)

- One clause added to `when_to_use`, routing the generative sense of "explore" to
  the new sibling. Frontmatter only; no Step changed.

## Files changed

```
 skills/design-critique/.claude-plugin/plugin.json |   8 +
 skills/design-critique/SKILL.md                   | 268 +++++++++++++++++++
 skills/design-explore/.claude-plugin/plugin.json  |   8 +
 skills/design-explore/SKILL.md                    | 310 ++++++++++++++++++++++
 skills/design-language/.claude-plugin/plugin.json |   8 +
 skills/design-language/SKILL.md                   | 300 +++++++++++++++++++++
 skills/exploration-log/SKILL.md                   |   2 +-
 7 files changed, 903 insertions(+), 1 deletion(-)
```

---

_Generated by `/changelog-tracker` from `git log -1` and `git show --stat`. Every
fact here comes from git: **faithful, not generative.**_
