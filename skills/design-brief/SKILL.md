---
name: design-brief
description: Interviews you into a short, structured design brief — the problem, who feels it, jobs to be done, constraints, what success looks like, and the non-goals — then writes it to the briefs tier so later critique and decisions have a stated intent to cite. Captures what you actually hold and marks what you don't, rather than inventing plausible success metrics. Use when the user says "write a design brief", "start a new design", "frame this problem", "what are we actually solving", "brief for this project", or runs /design-brief. Claude Code writes the file; on Claude.ai it produces a downloadable artifact.
argument-hint: "[optional-slug]"
allowed-tools: Read, Write, Edit, Bash, Glob, AskUserQuestion
disable-model-invocation: false
---

# design-brief

Writes the document design work usually starts without: what this is for, who it's
for, and what would count as having worked.

Everything downstream depends on it. `design-critique` reviews *against* a brief —
without one, feedback has nothing to be measured against and collapses into taste,
where the loudest preference wins. `design-decisions` cites it for the constraints
a fork was weighed under. `case-study-writer` opens with it. A model asked to
critique or decide without a stated intent will guess at the intent, and a guessed
intent produces confident, generic, useless output.

Two rules govern this skill, and the first one is the whole design problem:

- **Never invent the brief.** Asked for a design brief, a model will happily produce
  excellent-sounding jobs-to-be-done and success metrics for a problem it knows
  nothing about — and they will read exactly like real ones. Every section traces to
  something the user said, or it renders `*(not stated)*`. **A brief with honest
  gaps is worth more than one with plausible fiction**, because later work gets
  judged against whatever this document says.
- **It has to be cheap.** A brief that takes an afternoon doesn't get written before
  a deadline, which is exactly when it matters. Two capped rounds, and leaving a
  section empty is always allowed.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow: resolve the
  tier, read prior briefs, write the file.
- **Claude.ai** — no filesystem. Run the same interview, then emit the brief as a
  **downloadable artifact**. Skip tier resolution and the revision logic. Don't
  error.

### Step 1 — Resolve the briefs path (Claude Code)

In descending authority:

1. **A path declared in a CLAUDE.md protocol block** — `skill:design-setup`'s
   routing table row for Briefs. A declared path beats everything.
2. **An existing folder on disk** — `design/briefs/`, `briefs/`, `design-briefs/`.
   Match **case-insensitively**.
3. **Canon** — `design/briefs/`.

If **nothing exists**: do not create it silently. Say the tier is missing and
recommend `/design-setup add briefs` — **`design-setup` owns the tier's README and
`_TEMPLATE.md`**, and authoring them here is the stale-copy failure that skill
forbids. If the user declines, offer to create just the folder and the brief.

### Step 2 — Read the room before asking anything

The fastest interview is the one that skips what you already know.

- **The current conversation.** If the user has been describing the problem for ten
  turns, you already have most of §1 and §2. Don't ask them to repeat it — draft
  from what they said and confirm.
- **Existing briefs in the tier** — is this a new brief or a revision of one? If a
  brief with a similar slug or subject exists, say so and ask before starting a
  second one.
- **The project README** — for what the product is, so you don't ask.

### Step 3 — Interview, in two rounds

Cap at **two rounds, four questions each**. Use `AskUserQuestion` on Claude Code,
plain text on Claude.ai. **Every question carries an "I don't know yet" option** —
the moment it doesn't, the gap gets filled with fiction.

**Round 1 — the problem:**

1. **What's wrong today?** Push for the observable version. "The onboarding is
   confusing" is a conclusion; "62% of new users never complete step 3" or "support
   gets the same question every week" is the problem. If they only have the
   conclusion, that's fine — record it as the conclusion, not as evidence.
2. **Who feels it, and when?** A role and a moment. "Everyone" means it hasn't been
   thought about yet; say so gently and ask again once.
3. **What are they trying to get done?** Shape as jobs: *when {situation}, they want
   to {motivation}, so they can {outcome}*. Two or three at most.

**Round 2 — the boundaries:**

4. **Constraints** — technical, brand, time. Ask for the ones that would actually
   kill a direction, not a wish list.
5. **What would success look like?** The one people answer with adjectives. Push
   once for something observable: *how would you know, without asking anyone's
   opinion?* If the honest answer is "we wouldn't", record that — an honest
   `*(not stated)*` is a finding, and it tells the next reader the work cannot be
   evaluated yet.
6. **Non-goals** — what this deliberately does not do. Prompt with the adjacent
   things a reasonable person would assume were in scope.
7. **Anti-goals** — different from non-goals, and worth asking separately: what
   would count as **failure even if it tested well**? ("Faster signup, by hiding the
   pricing.") This is the question that catches the thing nobody says out loud.

### Step 4 — Mark every section stated or not stated

Before assembling, go through each section and classify it:

- **Stated** — the user said it, or you drafted it from the conversation and they
  confirmed it.
- **Not stated** — renders literally `*(not stated)*`.

Two things that are **not** "stated": something you inferred from the product
category, and something the user agreed to when you proposed it wholesale. Offering
one example to show the register is fine; drafting the whole section and getting a
"yeah, that" is not, and you should ask the question again rather than take it.

### Step 5 — Assemble

```md
# Design brief — {title}

Status: active · Date: {YYYY-MM-DD}

## The problem
{Concrete, present tense, observable where possible.}

## Who feels it
{The people, and the moment they hit it.}

## Jobs to be done
- When {situation}, they want to {motivation}, so they can {outcome}.

## Constraints
| Kind | Constraint |
|---|---|
| Technical | {…} |
| Brand | {…} |
| Time | {…} |

## What success looks like
- {Observable. If it can't be observed, it isn't a success criterion.}

## Non-goals
- {What this deliberately does not do.}

## Anti-goals
- {What would count as failure even if it tested well.}

## Open questions
- {Unresolved — and who could answer it.}
```

Keep every heading even when empty; write `*(not stated)*` or `- None.` rather than
dropping the section. A stable shape is what makes the brief citable by the sibling
skills.

**On Claude Code, get the date from `date +%F`. Never guess it.**

**Show §"What success looks like" and §"Non-goals" back explicitly** before writing.
They are the two people get wrong, and the two everything downstream leans on.

### Step 6A — Claude Code: write the file

1. Slug: kebab-case, 3–5 words, from the argument if given, else the title.
2. Path: `{briefs}/{slug}.md`.
3. **If the file exists**, this is a revision, not a rewrite — see Step 7.
4. Write, then confirm the exact path back and name what will cite it:
   *"`/design-critique` will review against this; `/design-decisions` will cite its
   constraints."*

### Step 6B — Claude.ai: produce a downloadable artifact

Emit `design-brief-{slug}.md` as a downloadable Markdown artifact. Say it can be
dropped into `design/briefs/` in the project. Attempt no writes, skip revisions.

### Step 7 — Revising an existing brief

Understanding moves; the record of how it moved is worth keeping.

- **Never silently replace prior content.** Update the sections that changed, then
  append under a `## Revisions` heading:
  ```md
  - **{date}** — {what changed, and why}. Previously: "{the prior text, verbatim}".
  ```
- If the work has ended, set `Status: closed` and add a final revision note saying
  how it ended. A closed brief is still the intent the work was judged against.
- If the *problem itself* changed — not the framing of it — that is a new brief, not
  a revision. Say so and offer to write one that links back.

### Step 8 — Edge cases

- **The user wants the brief written for them** ("you know the product, just write
  it") — decline the substance, not the help. Explain that an invented success
  metric becomes the thing the work is judged against, then offer to draft *from
  their own words in this conversation*, section by section, confirming each.
- **Nothing to go on** — a trigger with no conversation behind it and no answers.
  Don't produce a brief-shaped document with seven `*(not stated)*` sections; say
  the framing isn't there yet and ask what problem prompted this.
- **The answer to "what's wrong" is a solution** ("we need a new dashboard") — ask
  once what breaks without it. If they hold the solution and not the problem,
  record it in Open questions as an unexamined premise rather than reverse-engineer
  a problem to fit.
- **Success criteria are all adjectives** — ask once for the observable version,
  then record what they gave. Don't convert "feels premium" into a fake metric.
- **The tier doesn't exist** — never create it silently (Step 1).
- **A brief already exists for this work** — offer revision (Step 7) rather than a
  second file. Two live briefs for one problem is the contradiction the tier exists
  to prevent.
- **Secrets in the conversation** — never carry credentials, customer names under
  NDA, or unreleased commercial terms into the brief. Replace with `[redacted]`.
- **User declines to write** — print the brief inline. A legitimate outcome.
