---
name: design-language
description: Interviews you into a written visual direction — the surface and whether it wears the brand, the references you're pulling from and the one you're explicitly not, the hard constraints stated as rules that can be broken, and the vocabulary that's in and out of bounds — then writes it to the system tier so exploration and critique have a stated visual intent to work against. Asks what you want it to look like rather than proposing a look for you. Use when the user says "what should this look like", "define the visual direction", "set the design language", "what's the style for this", "before we design this", or runs /design-language. Claude Code writes the file; on Claude.ai it produces a downloadable artifact.
when_to_use: 'Also fires on: "pin down the aesthetic", "what are our design rules", "what are we referencing", "define the brand for this surface". For the problem being solved rather than how it should look, use design-brief. For generating directions from this doc, use design-explore. For judging built work against it, use design-critique.'
argument-hint: "[check|<optional-slug>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# design-language

Writes the other half of the brief. `design-brief` captures what problem you're
solving and for whom; it never asks what the thing should look like — brand appears
there as one row of a constraints table. This skill captures the visual intent: the
surface, the references, the rules, the words.

It exists because of a specific failure. Asked to design something with no stated
visual intent, a model produces the median of everything it has seen — competent,
plausible, and indistinguishable from every other generated interface. The fix is
not a better prompt. It is having written down, before anything is generated, what
you are aiming at and what you are aiming away from.

This doc is also the **gate** on `design-explore`. Under
[ADR 0022](../../docs/decisions/0022-generation-is-allowed-only-into-explorations.md),
a generating skill may not run without a written visual intent — which means the
quality of this document sets the ceiling on everything generated from it.

Three rules govern this skill:

- **Ask, never propose.** The user's taste is the input. The moment you supply the
  aesthetic — even as "a starting point to react to" — the document records your
  median instead of their intent, and everything downstream is judged against it.
  Offering one example to show the register is fine; drafting the direction and
  taking a "yeah, that" is not.
- **The negative does half the work.** *"Dark, editorial, designer-tool energy —
  similar to Linear, Vercel, Raycast. **Not startup cliché.**"* Strip the "not" and
  the references become decoration. Always get the anti-reference.
- **A constraint you can't break isn't a constraint.** "Clean and modern" cannot be
  violated, so it cannot guide anything. "Exactly one accent colour" and "content
  never touches the edges — 14% horizontal, 5% vertical" can be violated, which is
  precisely what makes them useful to `design-explore` and checkable by
  `design-critique`.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow: resolve the
  tier, harvest existing tokens, write the file.
- **Claude.ai** — no filesystem. Run the same interview against whatever the user
  pastes, then emit the doc as a **downloadable artifact**. Skip tier resolution and
  the revision logic. **Say plainly that tier resolution, token harvesting and
  revision detection are unavailable here — do not guess at them.** Don't error.

**Argument modes:**

- *(no argument)* — the default: the full flow, Steps 1–7.
- `check` — Steps 1–2 plus a report, with **zero writes**. Answers "is there a
  stated visual intent for this project, and how complete is it?" A lint you can run
  any time, and the thing to run before `/design-explore`.
- `<slug>` — the default flow, with the slug supplied rather than derived.

### Step 1 — Resolve the system path (Claude Code)

In descending authority — this is
[ADR 0010](../../docs/decisions/0010-a-declared-path-beats-an-existing-folder-beats-canon.md):

1. **A path declared in a CLAUDE.md protocol block** — `skill:design-setup`'s
   routing table row for System. A declared path beats everything, including a
   folder that exists on disk under a canonical name.
2. **An existing folder on disk** — `design/system/`, `design-system/`, `system/`,
   `brand/`. Match **case-insensitively**.
3. **Canon** — `design/system/`.

If **nothing exists**: do not create it silently. Say the tier is missing and
recommend `/design-setup add system` — **`design-setup` owns the tier's README and
`_TEMPLATE.md`**, and authoring them here is the stale-copy failure that skill
forbids. If the user declines, offer to create just the folder and the doc.

### Step 2 — Read the room before asking anything

Half these answers are already on disk. Asking for them anyway is how a five-minute
interview becomes an interrogation.

- **Existing tokens.** Grep for CSS custom properties and theme config before asking
  about colour or type: `globals.css`, `tokens.css`, `theme.css`, `tailwind.config.*`,
  `**/*.css` for `--accent`, `--bg`, `--text`. If you find a palette, don't ask
  "what colours?" — show what's there and ask whether this surface **inherits it or
  deliberately departs from it**. That single question is worth more than four.
- **The brief.** If a `design-brief` exists for this work, read it. Its constraints
  row and its anti-goals feed straight in; don't re-ask them.
- **The current conversation.** If the user has spent ten turns describing the look,
  draft from that and confirm, rather than starting from zero.
- **Existing language docs in the tier** — is this a new surface, or a revision of
  one? Two live language docs for one surface is a contradiction; catch it here.
- **The README** — for what the product is.

**In `check` mode, stop here** and report: the resolved tier path and which rule
resolved it, every `language-*.md` found with its `Status:` and date, the count of
`*(not stated)*` sections in each, and whether §"Hard constraints" and
§"Explicitly not" are populated — those two are what `design-explore` generates
against and `design-critique` checks against. Close with one line on whether the
project is ready for `/design-explore`. **Write nothing. Ask nothing.**

### Step 3 — Interview, in two rounds

Cap at **two rounds, four questions each**. Use `AskUserQuestion` on Claude Code,
plain text on Claude.ai. **Every question carries a "not decided yet" option** — the
moment it doesn't, the gap gets filled with your median taste, which is the exact
failure this skill exists to prevent.

**Round 1 — the feel:**

1. **What is this, and does it wear the brand?** Two parts, one question. The
   surface (marketing site · product UI · tooling that sits inside someone else's
   app · deck · demo · docs), and whether it carries the brand or deliberately
   doesn't. The second half is the one people haven't considered, and it is often
   the most consequential answer in the document — a tool that lives on the user's
   own app usually *shouldn't* wear your colours, because it needs to read as
   tooling laid on top rather than as part of their product.
2. **Three references you're pulling from — and one you're explicitly not.** Push
   once if the negative is skipped; it is not optional. Accept products, not just
   design work: "feels like Linear" is a real answer. If they name a reference, ask
   **what specifically** they're taking from it — the density, the type, the
   restraint, the motion — because "like Stripe" means six different things.
3. **Three adjectives for the first two seconds.** Before anyone reads a word. If
   you get more than three, ask which one they'd drop.
4. **Inherit or greenfield?** Skip if Step 2 already answered it. Otherwise: is
   there an existing token set, brand, or sibling surface this extends — or is this
   starting clean?

**Round 2 — the rules:**

5. **Hard constraints, stated as rules that can be broken.** Prompt with the axes
   people forget: how many accent colours · how many text levels · light, dark, or
   both · density · corner radius · motion appetite · margin or grid rule · type
   pairing. Ask for the ones that would actually kill a direction, not a wish list.
   Push once on anything unfalsifiable: *how would I know if a design broke this?*
6. **Vocabulary.** Two parts: the **one noun this thing runs on** — the word used in
   the UI, the docs, and the API, which the copy should not drift from — and the
   words that are **out of bounds**. Internal jargon that leaked into the interface
   belongs on the out list.
7. **What would make this fail even if it looked good?** The visual anti-goal, and
   the question that catches what nobody says out loud. "Beautiful but reads as a
   toy." "Polished enough that people assume it's finished."

### Step 4 — Mark every section stated or not stated

Before assembling, classify each section:

- **Stated** — the user said it, or you drafted it from the conversation or from
  tokens on disk and they confirmed it.
- **Not stated** — renders literally `*(not stated)*`.

Two things that are **not** "stated": an aesthetic you inferred from the product
category, and one the user agreed to after you proposed it whole. A language doc
with honest gaps is worth more than one carrying your defaults under their name,
because `design-explore` will treat every line here as an instruction.

### Step 5 — Assemble

```md
# Design language — {title}

Status: active · Date: {YYYY-MM-DD}

## The surface
{What this is and where it lives.}

**Brand posture:** {wears the brand · deliberately doesn't — and why}

## References
**Pulling from:** {reference — and what specifically is being taken from it}
**Explicitly not:** {the anti-reference}

## The first two seconds
{Three adjectives.}

## Hard constraints
| Rule | Value | Why it's load-bearing |
|---|---|---|
| {Accent colours} | {Exactly one} | {…} |
| {Text levels} | {Three} | {…} |

## Vocabulary
**The noun this runs on:** {…}
**Out of bounds:** {…}

## Inheritance
{The token set or surface this extends, with its file path — or "Greenfield".}

## What would count as failure
{Failure even if it looks good.}

## Open questions
- {Unresolved — and who could answer it.}
```

Keep every heading even when empty; write `*(not stated)*` rather than dropping the
section. A stable shape is what makes this citable by `design-explore` and
`design-critique`.

**On Claude Code, get the date from `date +%F`. Never guess it.**

### Step 6 — One confirmation before writing (the write gate)

**Nothing is written before this.** Print the file plan and the two load-bearing
sections verbatim:

```
Design language for {surface}

WRITE   {system}/language-{slug}.md        (new)      # or (revision — see below)

Hard constraints
  - {rule} — {value}
  - {rule} — {value}

Explicitly not: {the anti-reference}

Sections not stated: {list, or "none"}
```

Show §"Hard constraints" and §"Explicitly not" back **because those two do the most
work downstream**, and they are the two most likely to have drifted from what the
user meant — `design-explore` generates from them and `design-critique` cites them
as the intent a finding violates.

Then `AskUserQuestion`: **Write it** / **Edit a section** (loops back, don't force a
decline to fix one line) / **Print inline, write nothing**.

### Step 7A — Claude Code: write the file

1. Slug: kebab-case, 3–5 words, from the argument if given, else the surface.
2. Path: `{system}/language-{slug}.md`.
3. **If the file exists**, this is a revision, not a rewrite — see Step 8.
4. Write, then confirm the exact path back and name what will use it:
   *"`/design-explore` will generate directions against this; `/design-critique`
   will review against it."*

### Step 7B — Claude.ai: produce a downloadable artifact

Emit `design-language-{slug}.md` as a downloadable Markdown artifact. Say it can be
dropped into `design/system/` in the project. Attempt no writes, skip revisions.

### Step 8 — Revising an existing language doc

Taste moves. The record of how it moved is worth keeping — a constraint that was
relaxed once will be argued about again. **Reconcile, never rebuild.**

- **Never silently replace prior content.** Update what changed, then append under a
  `## Revisions` heading:
  ```md
  - **{date}** — {what changed, and why}. Previously: "{the prior text, verbatim}".
  ```
- Before writing a revision, **assert the sections you are not touching are
  byte-identical to what you read**. If anything else differs, abort and report.
  "Be careful" is not a mechanism.
- If a **hard constraint** is being relaxed, say so plainly in the revision note and
  mention that anything already judged against it may now read as inconsistent, and
  that explorations generated under the old rule are still valid history — they are
  not retroactively wrong.
- If this is a **different surface** rather than a changed opinion, that's a new
  doc, not a revision. Say so and offer to write one that links back.

### Step 9 — Edge cases

- **"You're the designer, just pick something."** Decline the substance, not the
  help. Explain that a supplied aesthetic becomes the thing the work is judged
  against, and that this is exactly how output ends up looking generated. Then offer
  the cheapest real path: pull three references **they** name, or point at a product
  they already like and work backwards from it.
- **Nothing to go on** — a trigger with no conversation and no answers. Don't emit a
  doc of nine `*(not stated)*` sections; say the direction isn't there yet and ask
  what prompted this. A legitimate outcome, not a failure.
- **Only adjectives, no rules** — "clean, modern, premium". Record them under The
  first two seconds, then ask once for one thing that would *violate* it. One
  falsifiable rule beats ten adjectives, and asking for a violation is the fastest
  way to surface one.
- **Every reference is the same product** — three flavours of one influence isn't a
  direction, it's an inheritance. Say so, and ask what this must *not* look like
  instead.
- **The surface already has tokens and the user wants to change them** — this is a
  fork, not a language doc. Write the doc, then point at `/design-decisions` to
  record why the old system was departed from.
- **Brand posture contradicts the constraints** — e.g. "deliberately doesn't wear
  the brand" alongside "use our brand accent". Surface the contradiction once and
  let them resolve it; don't quietly pick one.
- **Not a git repo, or no repo at all** — `git rev-parse --show-toplevel` fails.
  Tier resolution has nothing to resolve against. Say so, run the interview anyway,
  and offer the doc inline or at a path the user names.
- **The tier doesn't exist** — never create it silently (Step 1).
- **Two live language docs for one surface** — the contradiction the tier exists to
  prevent. Surface both, and offer revision (Step 8) rather than a third file.
- **Secrets in the conversation** — never carry unreleased naming, client
  identities under NDA, or commercial terms into the doc. Replace with `[redacted]`.
- **User declines to write** — print the doc inline. A legitimate outcome, not a
  failure.
