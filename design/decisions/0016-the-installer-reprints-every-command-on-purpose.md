# 0016. The installer prints every command the catalogue prints, on purpose

- **Status:** **Accepted**
- **Date:** 2026-08-19

## Context

The revamp brief listed this among **three things on the page duplicated or untrue**,
verifiably:

> *"Every install command appears twice (catalog chip and Install section), and the
> `answers` question renders twice on ten of fourteen skill rows."*

The rebuild in `git:fcea6dd` (2026-08-19) fixed it by deleting the second list. The
install block became a **sequence** rather than a menu — the marketplace command, then
`/plugin install repo-setup` as the named entry point, then a comment telling the reader
to add the rest as they hit the need. `changelog/commits/037-*.md` records what that
replaced:

> *"The comment records what it replaces — fifteen near-identical rows and thirty copy
> buttons for fourteen commands, each already present on its own catalogue row."*

The number was the defect's name. **Thirty copy buttons for fourteen commands** is how
the problem was written down, and `website/tests/home.spec.ts` was built to hold the
line at *"each command at most once page-wide"* with a `REPEATS` allowlist of exactly two
sanctioned exceptions, and a warning attached:

> *"If a third command ever needs adding here, that is duplication returning."*

Round 5, later the same day, reverses it deliberately. The page-wide copy-button count
goes **17 → 30** — the historical defect's own number, arrived at from the other
direction.

## Options considered

| Option | The bet | Why it lost |
|---|---|---|
| Keep the sequence — marketplace, `repo-setup`, and a comment saying add the rest as you need them | It is the recorded fix for a recorded defect, it holds the count at 17, and it needs no argument to defend: the commands are already on the catalogue rows | **`*(reason not stated)*`** as a deliberation. On the record it arrives as one of *"six pieces of feedback"* in round 5, and `git:10b64af` argues the **result** rather than the change — *"you read about a skill in one and install it from the other"* |
| Cycle all fourteen with the marketplace command inside the cycle | One list, one control, nothing pinned; the marketplace line is just step zero | Stated, in `InstallSteps.tsx`: *"putting it in the cycle made people step past the only command that is not optional"* |
| **Cycle all fourteen, marketplace command pinned above the cycle — chosen** | The two lists print the same strings while doing different jobs, and the one-time step is never something you can step past | — |

## Decision

The installer is **two deliberately unequal parts**. The marketplace command sits at the
top and never moves. Below it, all fourteen skills, one at a time, `← prev` / `next →`
**wrapping** so the reader circles back rather than dead-ending at either edge, starting
at `repo-setup` as the entry point. Every per-skill command is therefore on the page
twice: once on its catalogue row, where you read about the skill, and once in the
installer, where you install it. The derived page-wide budget is `TOTAL_SKILLS * 2 + 2`
= **30**.

Progressive enhancement is unchanged: before mount every skill is stacked and there are
no controls, so the static export carries all fourteen and no dead control ships to a
reader without JS.

### The enforcement is the test contract, not the count

This is the part that makes the decision safe to hold, so it is quoted rather than
summarised. `website/tests/home.spec.ts` now opens:

> *"THE CONTRACT: each per-skill command appears exactly once per surface, and there are
> exactly two surfaces — the catalogue (#skills) and the installer (#install).*
>
> *This replaces "at most once page-wide", which round 5 broke deliberately. The original
> defect was "thirty copy buttons for fourteen commands": one list of commands rendered
> twice with nothing to tell the two apart. The installer now cycles all fourteen on
> purpose — you read about a skill in the catalogue and you install it from the installer
> — so the page-wide count is thirty again, and the number alone no longer distinguishes
> the defect from the design.*
>
> *What distinguishes it is per-surface uniqueness, which is what this now asserts. It
> still fails loudly if either surface prints a command twice, and it still fails if a
> THIRD place starts printing commands — which is what "the duplication is back" would
> actually look like."*

The `REPEATS` allowlist is gone entirely rather than extended. That matters: the old
contract's escape hatch was a list of sanctioned exceptions, and a list of exceptions is
a thing that grows. The new contract has no exceptions — it is an invariant per surface
plus a fixed count of surfaces, and the assertion runs against `<code>` text as well as
copy buttons, so a command printed without a button still fails it.

## What we gave up

- **The number as a signal.** *"Thirty copy buttons for fourteen commands"* is how this
  defect is written down in `changelog/commits/037-*.md`, and it is what the brief's
  duplication finding resolves to. Anyone who reads either record and counts buttons on
  the live page now finds the defect's exact number and a green test suite. The
  distinction between the defect and the design lives only in a test comment and in this
  file.
- **A contract anyone could evaluate by counting.** *"At most once page-wide"* needs no
  context to check. *"Exactly once per surface, and there are exactly two surfaces"*
  requires knowing which two surfaces are sanctioned and why — and if a third is ever
  added innocently, the fix looks like editing a test rather than reversing a decision.
  The contract is stronger and less legible, and those are not the same thing.
- **The claim that `fcea6dd`'s shape was the right answer.** The sequence shipped as the
  fix for a named defect at 15:46 and was replaced at 19:29 the same day. It never got a
  reader.
- **Half of the brief's own duplication finding, reinstated on purpose.** The brief named
  two duplications in one bullet; this decision re-adopts the first of them. Anyone
  auditing the page against the brief will find the brief correct and the page
  deliberately non-compliant, which is a state that only works while somebody remembers
  why.
- **One right answer to "where do I get the command."** There are now two, and the page
  relies on section context to tell a reader which one they are looking at.

## What would make us revisit

- **A third place starts printing install commands.** The test fails, and that failure is
  the real signal — it is what the duplication returning actually looks like. Any pressure
  to widen the contract from two surfaces to three is this decision coming due.
- **The two lists stop doing different jobs.** The entire justification is that the
  catalogue is for reading and the installer is for installing. If the installer grows
  descriptions until it is a second catalogue, or a catalogue row grows install prose
  until it is a second installer, the duplication is back in substance while the test
  still passes — and the test cannot see that.
- **The catalogue passes ~30 rows.** Thirty skills is sixty-two copy buttons and sixty-two
  `<code>` blocks. Reprinting is cheap at fourteen; it is not obviously cheap at thirty,
  and that is the size at which [0009](./0009-the-command-palette-is-retired.md) already
  said the page's answers to length stop scaling.
- **Someone reads the brief or changelog 037, counts thirty, and files it as a
  regression.** That is a reasonable reading of the record as it stands. If it happens,
  the record needs the work, not the page.

## Evidence

- **Primary:** `git:10b64af` (2026-08-19), the commit message:
  > *"The installer cycles all fourteen, wrapping, with the marketplace command pinned
  > above the cycle where it cannot be stepped past. This deliberately reprints every
  > command the catalogue prints, and the page-wide copy-button count goes 17 → 30 — which
  > is the exact number the original defect was recorded as. The difference is that the two
  > lists now do different jobs: you read about a skill in one and install it from the
  > other."*
  >
  > *"So the test contract changed rather than the number being bumped. It was "each command
  > at most once page-wide"; it is now "exactly once per surface, and there are exactly two
  > surfaces"."*
- **Corroborating:** `website/tests/home.spec.ts` — the contract comment quoted in full
  above, and the removal of the `REPEATS` allowlist it replaces ·
  `website/components/InstallSteps.tsx` — the two-unequal-parts docstring and the reason
  the marketplace line is pinned · [`../briefs/website-revamp.md`](../briefs/website-revamp.md)
  §Three things duplicated or untrue — *"Every install command appears twice"* ·
  [`changelog/commits/037-rebuild-in-terminal-rendered-markdown.md`](../../changelog/commits/037-rebuild-in-terminal-rendered-markdown.md)
  — *"thirty copy buttons for fourteen commands"*.
- **Rationale:** **the outcome is argued; the trigger is not.** Why the reprint is
  acceptable is stated in both the commit and the component, and why the marketplace line
  is pinned outside the cycle is stated in the component. **Why the sequence stopped being
  enough — what the feedback actually said — is `*(reason not stated)*`.** It appears only
  as one of six unattributed pieces of feedback in a round.

## Follow-up

*Append-only. Everything above is **frozen**. Entries below are dated and additive.*

*(none yet)*

---

_**Exactly two things in this file may ever change:** the `**Status:**` line and
additions under `## Follow-up`. If this turns out to be wrong, do not edit it —
supersede it with a new decision that links back._
