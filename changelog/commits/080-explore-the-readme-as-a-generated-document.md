# docs: explore the README as a generated document

- **Commit:** `9efe7b82cbf6e45cc53b63050afd9be36c44a04a` (`9efe7b8`)
- **Author:** Claude
- **Date:** 2026-09-05

## Commit message

This library holds one rule as absolute — a document that states facts about
the repo is generated, never hand-edited. `changelog/` says it. `VERSION-LOG.md`
says it. The rule stops at the front door: `README.md` is the highest-traffic
fact-bearing document here and the only one written entirely by hand.

Written into `docs/concepts/` because the central question is unresolved and
picking either answer now would be guessing: is this a generator that owns
delimited regions, or a checker that verifies claims and rewrites nothing?

## Changes in detail

### `docs/concepts/readme-sync.md` (new, 153 lines)
- Names the inconsistency the concept exists to close: `skills.ts` derives every count
  it prints, while `README.md` hand-types "Twenty" twice and `content.ts` a third time.
  Three hand-typed counts and one derived one, in one repo, is an unfinished convention.
- Refuses the easy reading of "automatically". This repo has **no per-event hook, by
  design**, so the word is broken into a four-rung ladder — `check`, `sync`, a CLAUDE.md
  protocol block, CI — and only the last rung, which lives outside the skill, earns it.
- Records **where the seam actually falls** as the shaky assumption rather than burying
  it: a README row's name, link and install line are derivable, but its *"What it does"*
  sentence is the best writing in the file and no file holds it. Frontmatter
  `description` is trigger-phrase copy for the matcher, not readable prose.
- Proposes a reframe worth testing before the generator: a **claim checker** that
  verifies and reports but never rewrites — general enough for a project with no
  `skills/` folder, and honest about what it cannot verify.
- Names the overlap instead of assuming past it: `skill-audit` and `context-audit` are
  already proposed in the expansion concept, and three skills sharing 80% of their logic
  is how a library becomes a directory.
- States a graduation **test**, not a feeling: rename or remove one skill, do the README
  update by hand, and list every place a machine could not have known what to write.
