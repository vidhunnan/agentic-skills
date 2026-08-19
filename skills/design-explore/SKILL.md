---
name: design-explore
description: Generates three genuinely distinct design directions from a written visual direction — each committed to a named structural axis, each carrying its thesis, its bet and its risk, ending in a comparison matrix you can judge by eye rather than by description. Refuses to generate against nothing, and refuses to ship three colourways of one idea as three directions. Use when the user says "show me some directions", "explore this design", "give me options for this", "what could this look like", "mock this up a few ways", or runs /design-explore. Claude Code writes the artifacts to the explorations tier; on Claude.ai it emits them as artifacts.
when_to_use: 'Also fires on: "let''s explore this", "three versions of this", "some concepts for", "I want options". This skill *generates* candidate directions. To *record* a round that already happened — what it tested, what was kept or killed — use exploration-log; for the fork and its rationale use design-decisions. This skill never records the verdict. For defining the visual intent it generates against, use design-language.'
argument-hint: "[check|<slug>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# design-explore

Produces the thing that's missing between a written direction and a built screen:
**options you can actually look at.** Three directions, each committed to a
different structural idea, laid out so the choice is made by eye rather than by
reading three paragraphs describing three things that don't exist yet.

The failure this is built against is specific and extremely common. Asked for
"a few options", a model produces one layout in three colourways, describes them in
confident prose, and calls it an exploration. Nothing was explored: the same
structural decision was made three times and painted differently. A real
exploration commits each direction to a different bet, and makes the bets visible.

## Why this skill is allowed to generate at all

Every other skill in this territory is restricted to *interview, record, structure,
check* by
[ADR 0021](../../docs/decisions/0021-design-skills-never-make-the-design-decision.md).
This one generates, which
[ADR 0022](../../docs/decisions/0022-generation-is-allowed-only-into-explorations.md)
permits — **into the explorations tier only, under three conditions that all must
hold.** They are not framing; they are the reason the skill is permitted:

1. **A written visual intent exists first.** No language doc, no generation. Step 2
   is a gate, not a lookup.
2. **The artifacts are candidates, never the record.** They are material to look at
   and reject. Nothing here is evidence that anything was decided or shipped.
3. **The verdict belongs to another skill.** `exploration-log` records what was kept
   or killed; `design-decisions` records why. Step 8.

Drop any one of the three and ADR 0021's original objection applies again — and the
fix is to restore the condition, not to proceed anyway.

Four rules govern the work itself:

- **Never generate against nothing.** With no stated visual intent, what comes out
  is the median of everything the model has seen — competent and anonymous. Read the
  `design-language` doc first, or run a compressed version of that interview. This
  is the whole difference between exploration and autocomplete.
- **Distinct on structure, not on hue.** Every direction is assigned a **named axis**
  it commits to, and the axis is stated in the matrix. **Two directions may not
  differ only in colour.**
- **No strawmen.** The classic three-option failure is two real directions and one
  obviously-worse filler that exists to make the favourite win. If you can't argue
  for a direction, it doesn't ship as one of the three.
- **The answer may be a merge.** Directions are lettered so "take B's structure with
  C's type" is a sayable sentence. Say so out loud at the end — the best outcome
  here is frequently a combination, not a winner.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow: resolve the
  tier, write the artifacts, tell the user how to open them.
- **Claude.ai** — no filesystem. Same interview and the same three directions,
  emitted as **artifacts** (an HTML artifact renders directly). Skip tier resolution.
  **Say plainly that tier resolution and prior-round detection are unavailable here —
  do not guess at them.** Don't error.

**Argument modes:**

- *(no argument)* — the default: the full flow, Steps 1–8.
- `check` — Steps 1–2 plus a report, with **zero writes**. Answers "is this project
  ready to explore, and what has already been tried?" Run it before committing to a
  round.
- `<slug>` — the default flow, with the slug supplied rather than derived.

### Step 1 — Resolve the explorations path (Claude Code)

In descending authority — this is
[ADR 0010](../../docs/decisions/0010-a-declared-path-beats-an-existing-folder-beats-canon.md):

1. **A path declared in a CLAUDE.md protocol block** — `skill:design-setup`'s
   routing table row for Explorations. **A declared path beats everything**,
   including a canonically-named folder sitting on disk. Projects that adopted an
   existing folder will have a non-obvious path here; use it.
2. **An existing folder on disk** — `design/explorations/`, `explorations/`,
   `iterations/`, `rounds/`. Match **case-insensitively**. Also check for an
   existing prototype folder the project already uses for throwaway HTML
   (`html-artifacts/`, `prototypes/`, `mockups/`) and offer it if found.
3. **Canon** — `design/explorations/`.

If nothing exists, recommend `/design-setup add explorations` rather than creating
the tier silently — **`design-setup` owns the tier's README and `_TEMPLATE.md`**. If
declined, offer to create just the folder.

### Step 2 — Load the visual intent (the gate)

**This is condition 1 of ADR 0022. It is not a formality.** Look for a
`design-language` doc for this surface (the System tier, resolved the same way as
Step 1), then for a `design-brief`.

- **Found** — read it, and say which document you're generating against. Every hard
  constraint in it is now binding.
- **Not found** — say so and offer `/design-language` first, in one line, once. If
  the user would rather keep moving, run a **compressed inline version**: four
  questions only — *the surface and whether it wears the brand · three references
  and one anti-reference · the hard constraints · the one word this thing runs on* —
  then offer at the end to write it up properly. The compressed interview satisfies
  the gate; skipping the questions does not.
- **Refused entirely** — generate, but stamp `Generated against: unanchored` in the
  matrix and say plainly that the directions have no stated intent behind them and
  that `/design-critique` will not be able to review them. Don't invent a direction
  doc to fill the hole.

**In `check` mode, stop here** and report: the resolved explorations path and which
rule resolved it, whether a language doc exists and which hard constraints it states,
any existing rounds for this slug with their dates, and one line on whether the
project is ready to explore. **Write nothing. Ask nothing.**

### Step 3 — Ask the output form

This is a real question, not an assumption. Ask it every run — the right answer
changes with the stage of the work.

| Form | What lands | Good when |
|---|---|---|
| **Live HTML** | Three standalone single-file pages + a contact sheet | You want to judge by eye. The default for anything visual. |
| **Token sets** | Three token blocks + written rationale | The structure is settled and the question is the system. |
| **Prose** | Three written directions, no pixels | Very early, or the medium isn't web. |
| **Figma** | Pushed via the Figma MCP tools | It needs to land where the rest of the design lives. |

Ask alongside it whether three is right — three is the default and usually correct;
two when the fork is genuinely binary, four when the space is wide and the surface
is small.

**On live HTML:** single-file, no build step, no CDN dependencies, openable with
`open`. Inline the CSS. This matches how throwaway design artifacts already work in
most repos, and it means the user can look at it in five seconds.

### Step 4 — Choose the axes, and say them before generating

Pick one axis per direction from:

**Density** · **Type contrast** · **Chrome weight** · **Colour strategy** ·
**Layout structure** · **Motion** · **Imagery** · **Voice**

State the three axes to the user *before* generating, in one line each. This is a
cheap checkpoint: if the axes are wrong, you find out before spending the work, and
the user often reacts to the axes faster than to the output.

Hard rules at this step:

- **No two directions share an axis.** If two would, one of them isn't a direction.
- **Colour strategy may be at most one of the three.** It is the axis that most
  often disguises three variations as three directions.
- **Every direction honours every hard constraint** in the language doc. A direction
  that breaks a stated rule is a bug, not a bold choice. If the constraints are
  tight enough that three distinct directions don't fit, **say so and ask whether to
  relax one named rule** — never break one silently and call it exploration.

### Step 5 — Generate

Each direction carries five things, and all five appear in the matrix:

- **Name** — a real one, two or three words. "Direction A" is not a name; a name
  that describes the bet ("Editorial", "Instrument Panel", "Quiet Utility") makes
  the option discussable a week later.
- **Thesis** — one line: what this direction believes.
- **The bet** — what it's optimising for, and what it's willing to give up for it.
- **The risk** — how it fails. Every direction has one; a direction with no stated
  risk hasn't been thought through.
- **The axis** — from Step 4.

Then build it. In HTML mode, build the **same content** in all three — different
content across directions makes them incomparable, which is the second most common
way an exploration fails.

### Step 6 — Assemble the comparison matrix

```md
# Design exploration — {title}

Date: {YYYY-MM-DD} · Generated against: {path to the language doc, or "unanchored"}

> Candidates, not a record. Nothing here is evidence that anything was decided or
> shipped. `/exploration-log` records the verdict; `/design-decisions` records why.

## The question this round is asking
{One line. What the three directions are actually testing.}

## The directions

| | A — {name} | B — {name} | C — {name} |
|---|---|---|---|
| **Axis** | {…} | {…} | {…} |
| **Thesis** | {…} | {…} | {…} |
| **The bet** | {…} | {…} | {…} |
| **The risk** | {…} | {…} | {…} |

## A — {name}
{Two or three sentences. What to look at, and what to look for.}
{Link to the artifact.}

## B — {name}
…

## C — {name}
…

## Merging
{The combinations worth considering, named — e.g. "B's structure with C's type
scale". State them; the answer is often here rather than in a single column.}

## Constraints honoured
{The hard constraints from the language doc, each confirmed — or, if one was
relaxed by agreement, which one and why.}
```

The candidates-not-a-record blockquote is **condition 2 of ADR 0022** and is not
optional. It is what stops a generated artifact being cited a year later as
evidence of a decision.

**On Claude Code, get the date from `date +%F`. Never guess it.**

### Step 7A — Claude Code: one confirmation, then write the artifacts

**Nothing is written before this.** Present the full file plan:

```
Design exploration — {title}
Generated against: {path to the language doc, or "unanchored"}

Axes:  A {axis} · B {axis} · C {axis}

WRITE   {explorations}/{slug}/directions.md
WRITE   {explorations}/{slug}/a-{name}.html
WRITE   {explorations}/{slug}/b-{name}.html
WRITE   {explorations}/{slug}/c-{name}.html
WRITE   {explorations}/{slug}/index.html          contact sheet

Nothing existing is touched. Prior rounds for this slug: {list, or "none"}
```

Then `AskUserQuestion`: **Generate** / **Change an axis** (loops back to Step 4) /
**Print inline, write nothing**.

`index.html` must be openable straight from disk with no server. Keep it plain —
the directions are the work, the contact sheet is a table of contents. After
writing, confirm the paths back and give the exact command: `open {path}/index.html`.

### Step 7B — Claude.ai: produce artifacts

Emit each direction as its own artifact so they render, plus `directions.md` as a
downloadable Markdown artifact. Say they can be dropped into
`design/explorations/{slug}/`. Attempt no writes.

### Step 8 — Hand off, and stop

End the run by naming the next moves, in one short block:

- *"Pick, merge, or ask for another axis."*
- *"`/exploration-log` records what this round tested and whether it was kept,
  killed or parked."*
- *"`/design-decisions` records the fork once you've chosen — it wants the option
  that lost and why."*

**This skill never records the verdict itself** — condition 3 of ADR 0022. Which
direction won, and why, is the sibling skills' territory; writing it here produces
two records that drift, and makes one skill both the author and the judge of its own
output. If the user states a preference in the same breath, acknowledge it and point
at `/exploration-log` rather than writing it down.

### Step 9 — Edge cases

- **"Just give me the best one."** Say once why three is the point — a single
  proposal is a guess wearing the costume of an answer, and there is nothing to
  compare it against. Then comply: build one direction properly, and state which
  axis it committed to so the next round has something to differ from.
- **The three directions came out too similar.** You'll see it in the output before
  the user does. Say so, name which two collapsed, and regenerate that one against a
  different axis. Shipping them anyway teaches the user that exploration is theatre.
- **A hard constraint blocks a genuinely good direction.** Show it as a **fourth,
  clearly labelled out-of-bounds option** with the rule it breaks named. Never
  smuggle it in as one of the three. The rule may deserve to change, but that's a
  decision, not a silent edit.
- **The surface already exists and this is a redesign.** Include the current state
  as an unlettered baseline column in the matrix so the directions are read as
  departures rather than as a fresh start.
- **The user reacts to one detail and wants it changed everywhere** — that's a
  merge, not a revision. Name it as such, and offer a second round rather than
  editing all three in place; the log is more useful when rounds stay distinct.
- **Figma mode with no Figma connection** — say the connector isn't available and
  offer live HTML instead. Don't half-produce.
- **An exploration already exists for this slug** — read it. **Reconcile, never
  rebuild:** say which round this is and what changed, write to a new round rather
  than over the old one, and never overwrite a prior round's artifacts. A killed
  direction is never deleted from this tier — that record is the point of it.
- **Not a git repo, or no repo at all** — `git rev-parse --show-toplevel` fails.
  Tier resolution has nothing to resolve against. Say so, and offer the directions
  inline or at a path the user names.
- **The user asks this skill to record which one won** — decline and route to
  `/exploration-log`. Condition 3 of ADR 0022; a skill that judges its own output is
  the thing the condition exists to prevent.
- **Secrets in the content** — never carry unreleased naming, client identities
  under NDA, or real customer data into a generated artifact. Use placeholders.
- **User declines to write** — print the matrix inline and offer the directions as
  code blocks. A legitimate outcome, not a failure.
