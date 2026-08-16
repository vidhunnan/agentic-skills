---
name: exploration-log
description: Records a round of design iteration into the explorations tier — what it was testing, what changed, what was learned, and whether it was kept, killed or parked, with the reason. Append-only, so a direction you abandoned is still readable a year later. Also answers "have we tried this before?" from the log. Use when the user says "log this round", "record this iteration", "log v3", "note what changed this round", "what did we try", or "did we already try this". Claude Code writes the file; on Claude.ai it produces a downloadable artifact.
when_to_use: 'Also fires on: "log this exploration", "add to the exploration log", "record round 2", "this is the third pass", "why did we kill that direction", "we''re killing this direction", "log why this didn''t work", or /exploration-log. For the design fork itself and its rationale use design-decisions; for reviewing work against a brief use design-critique.'
argument-hint: "[round-slug]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# exploration-log

Writes the tier no design tool has: **a durable record of what was tried and
killed, and why.**

The failure it prevents is specific. You run four passes at a layout, keep the
fourth, delete the other three. Six months later someone proposes direction two
again — and nobody can say whether it was already tried or why it lost, so it gets
tried again at full cost. Meanwhile the surviving design carries details that were
load-bearing decisions in round two and read as invisible leftovers by round five.

Git solves this for code by accident: the rejected approach stays in the history
whether you wanted it or not. **Design has no equivalent.** The alternative is
deleted from the file and gone.

Three rules govern this skill:

- **Append-only. A killed direction is never deleted.** That record *is* the tier.
  Prior rounds are frozen; new rounds are appended.
- **Never invent what a round taught.** Asked what an iteration proved, a model
  will supply a plausible design insight. Most rounds genuinely teach nothing
  crisp, and `*(nothing conclusive)*` is a real, useful answer.
- **It has to be cheap.** Four questions. A log costing ten minutes a round stops
  after round two, and a tier nobody writes into is worse than no tier.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow, including
  retrieval against prior rounds.
- **Claude.ai** — no filesystem. Run the interview and emit the entry as a
  **downloadable artifact**. **Say plainly that retrieval is unavailable** — you
  cannot answer "have we tried this?" without the log. Don't guess at it.

### Step 1 — Resolve the explorations path (Claude Code)

In descending authority:

1. **A path declared in a CLAUDE.md protocol block** — `skill:design-setup`'s
   routing table row for Explorations.
2. **An existing folder** — `design/explorations/`, `explorations/`, `iterations/`,
   `rounds/`. Match **case-insensitively**.
3. **Canon** — `design/explorations/`.

If **nothing exists**: do not create it silently. Recommend
`/design-setup add explorations` — that skill owns the tier's README and
`_TEMPLATE.md`. If the user declines, offer to create just the folder and the entry.

### Step 2 — Read the log before writing to it

Always, both modes:

- List the existing thread files and read the most recent one — you need the
  highest round number and what the last round concluded.
- **Round numbers continue the sequence and are never reused**, even if a file was
  deleted. A burned number is cheaper than two rounds called 3.

### Step 3 — Decide which mode you're in

The same skill answers two different questions. Read the trigger:

- **Capture** — "log this round", "record this iteration", "log v3". Go to Step 4.
- **Retrieval** — "have we tried this?", "did we already try a left rail?", "why
  did we kill that direction?". Go to Step 7.

If genuinely ambiguous, ask — one question, two options. Don't guess, because
capture writes and retrieval doesn't.

### Step 4 — Interview (capture mode)

**Four questions, one round.** Skip anything the conversation already answered —
if the user has been describing the round for ten turns, draft from that and
confirm rather than re-asking. Every question carries a "not sure" option.

1. **What was this round testing?** The question the pass was trying to answer, not
   a description of what you made. "Whether the rail can hold six items without a
   scroll" is a test; "a new sidebar" is not. If the honest answer is "just
   exploring", record that — it's a legitimate kind of round.
2. **What changed from last time?** Read the previous round's entry and ask against
   it. On round 1 this is "what's the starting point".
3. **What did you learn?** Offer `*(nothing conclusive)*` explicitly and without
   judgement. Most rounds don't produce a finding, and a log that pretends
   otherwise is a log full of invented insight.
4. **Kept, killed, or parked — and why?**
   - **Kept** — carried into the next round.
   - **Killed** — deliberately abandoned. **The reason is the most valuable
     sentence in the entry.** Push once for it.
   - **Parked** — stopped without a verdict. The honest option, and the one that
     stops everything getting marked Kept by default.

   If the reason was never articulated, write `*(reason not stated)*`. Do not
   reconstruct one.

Also ask for **links** — frame, version, prototype URLs — and record them
**verbatim**. Never guess or construct a URL.

### Step 5 — Assemble

One file per exploration **thread**, with rounds appended as sections, so a thread
reads as a narrative rather than scattering across files.

```md
# Exploration — {thread title}

Status: {active | closed} · Started: {YYYY-MM-DD}

> Append-only. Rounds below are frozen; new rounds go at the bottom. A killed
> direction is never deleted — that record is the point of this file.

## Round {N} — {title}

**Date:** {YYYY-MM-DD}
**Testing:** {the question this round was trying to answer}
**Links:** {URLs, verbatim} — or `*(none)*`

### What changed
{what was different from the previous round}

### What we learned
{the finding, or `*(nothing conclusive)*`}

### Verdict
**{Kept | Killed | Parked}** — {why, or `*(reason not stated)*`}
```

**On Claude Code, get the date from `date +%F`. Never guess it.**

### Step 6A — Claude Code: append the round

1. Thread file: `{explorations}/{slug}.md`. If the argument named a slug, use it;
   otherwise match against existing threads by subject and **ask before starting a
   new thread** — thread sprawl is what makes the tier unreadable.
2. **If the thread exists:** read it, append the new `## Round N` section at the
   end, and **assert every prior byte is unchanged**. If anything above your
   insertion point differs from what you read, abort and report. "Be careful" is
   not a mechanism.
3. **If it's a new thread:** write the header plus Round 1.
4. Confirm the path and round number, then say what the entry now makes
   answerable — e.g. *"'Did we try a top bar?' is now answerable from round 2."*

### Step 6B — Claude.ai: produce a downloadable artifact

Emit `exploration-{slug}.md` as a downloadable Markdown artifact containing the
round. Say it should be appended to the existing thread file rather than replacing
it, and that you could not check it against prior rounds.

### Step 7 — Retrieval mode

The tier is worthless if it can only be written to.

1. Search the thread files for the subject — `Grep` across `{explorations}/` on the
   distinctive terms, then read the matching rounds in full. Don't answer from a
   grep hit alone; the verdict is what matters and it's several lines below.
2. Answer with **the round, the verdict, and the reason**, quoting the entry:

   > Yes — thread `nav-placement`, round 2 (2026-05-04). Killed: *"the top bar
   > couldn't hold the sixth item without wrapping on 13-inch."*

3. **If it isn't in the log, say so plainly** — "nothing in the explorations log
   about a left rail." Do **not** infer from the current design that something was
   or wasn't tried. Absence of a record is not evidence of absence, and saying
   otherwise puts a fabricated fact into the one tier meant to be reliable.
4. If a decision ADR exists for the same fork, point at it — `design/decisions/`
   holds the *why we chose*, this tier holds the *what we tried*.

### Step 8 — Edge cases

- **The tier doesn't exist** — never create it silently (Step 1).
- **"Just log it, you know what we did"** — decline the substance. Draft from what
  was actually said in this conversation, section by section, and confirm. An
  invented learning is worse than a thin entry, because the tier's only value is
  that it can be trusted a year later.
- **Every round comes out Kept** — flag it once. If nothing was ever killed, either
  the work isn't exploring or the killed directions aren't being logged, and both
  are worth knowing.
- **A round that was abandoned mid-way** — Parked, with what stopped it. Rounds
  that end because the sprint ended are still rounds.
- **Retro-logging several rounds at once** — allowed, but date each from its own
  evidence, not today, and mark inferred dates `(approx.)`. Say plainly that the
  entries were written after the fact; a round logged in the moment and one
  reconstructed weeks later are not the same artifact.
- **The user wants to delete or rewrite a prior round** — refuse, and explain: the
  killed directions are the point. Offer a new round that supersedes it, or a
  correction appended to the thread with today's date.
- **Links that later die** — expected. This is why the prose has to stand alone;
  never let an entry be nothing but a URL.
- **Thread has thirty rounds** — offer to close it (`Status: closed`) and start a
  successor thread linking back, rather than letting one file grow unreadable.
- **Secrets in the links or notes** — never record credentialed prototype URLs or
  unreleased commercial detail. Replace with `[redacted]`.
