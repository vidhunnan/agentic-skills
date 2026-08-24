# docs(decisions): log ADR 0026 — versions are per skill, bumped only what changed

- **Commit:** `6bbbd5b2e3bb10f103b165765b63358f4e6aaada` (`6bbbd5b`)
- **Author:** Claude
- **Date:** 2026-08-24

## Commit message

The fork behind 55ebabc, written down before it goes invisible. Fourteen skills
sat at 0.1.0 and handoff-generator at 0.5.0 with no record of why, which is the
condition this tier exists for.

Two alternatives lost and both are named fairly: one library-wide version (real
simplicity, lost on the consumption model — a user reinstalling branch-naming
would be told a design skill's change was theirs) and per-skill versions with no
baseline row (lost because today's numbers are the only record of what shipped
before today).

The Rationale line does not overstate what happened. The owner selected this
option over two named alternatives; the reasoning recorded is the reasoning
presented with it, not wording they supplied. ADR 0014 makes that distinction
load-bearing, so it is kept rather than smoothed into "the owner argued that".

Also corrects the README's ADR count, which said 21 when 25 existed.

## Changes in detail

### `docs/decisions/0026-versions-are-per-skill-bumped-only-when-that-skill-changes.md` (new)
- The decision `55ebabc` made and did not explain: per-skill versions, bumped only when
  that skill changes, new skills at `0.1.0`, released version = a commit on `prod-stable`.
- **Context is written as the state that forced the choice, not as a plan**: fourteen skills
  at `0.1.0` and one at `0.5.0` with no record of why, and nothing forcing the question
  until `version-manager` — whose whole argument is that a version is a claim about what
  shipped — had to be dogfooded on a repo that couldn't say what its own numbers meant.
- **Both alternatives are argued for before they are dismissed.** The library-wide version
  gets its real advantages stated (one number, one row per release, no two skills
  disagreeing about "current") and loses on one specific thing: a user reinstalling
  `branch-naming` would see a bump caused by a design skill they never installed. The
  no-baseline variant loses because today's numbers are the only surviving record of what
  shipped before today.
- **Consequences name the cost twice, because there are two.** There is no "version of
  agentic-skills" anyone can cite; and a cross-cutting change — the shared protocol-block
  mechanism, the surface-detection step every skill carries — now means fifteen bumps in
  one commit, with `/version-manager status` as a mitigation rather than a guarantee.
- **The Rationale line is the careful part.** The owner picked this option from three; the
  reasoning in the ADR is the reasoning that was presented *with* the option. Recording it
  as "the owner argued X" would be a small, plausible, unfalsifiable fiction of exactly the
  kind [0014](../../docs/decisions/0014-never-invent-a-rationale.md) exists to forbid, so
  the record says what actually happened: they chose it, they did not argue it.
- Primary source is `docs/VERSIONING.md`, quoted verbatim — not the PRD, which the template
  forbids as a primary, and not the commit message, which summarises rather than states.

### `docs/decisions/README.md` (modified)
- Index row for `0026`, and the summary line moves from *"25 decisions logged; 22 stand"* to
  *"26 … 23 stand"*. The supersession paragraph is untouched: this decision supersedes
  nothing and nothing supersedes it.

### `README.md` (modified)
- *"21 ADRs"* → *"26 ADRs"*. The claim was already wrong before this commit — 25 existed —
  and adding one made it wronger. A public README stating a count it can't source is the
  same defect the site's committed counts were built to prevent.

### `website/components/lib/counts.json` (generated)
- `decisions` 25 → 26. Derived by `website/scripts/build-counts.mjs` as numbered files minus
  one for the reject ledger; `counts.spec.ts` is what catches it going stale.

## Files changed

```
 README.md                                          |   2 +-
 ...er-skill-bumped-only-when-that-skill-changes.md | 105 +++++++++++++++++++++
 docs/decisions/README.md                           |   3 +-
 website/components/lib/counts.json                 |   4 +-
 4 files changed, 110 insertions(+), 4 deletions(-)
```
