---
name: post-export
description: Captures postable material from a stretch of work while it is still warm — the attempt that failed and why, what a flow looked like before, the decision and what it cost — as typed, indexed backlog items, and snapshots the before-state before it is overwritten. Use when the user says "capture that for a post", "export this for content", "save this for a post", "what did we learn in this session", or runs /post-export. Claude Code primary; on Claude.ai it produces items as downloadable artifacts.
when_to_use: 'Also fires on: "capture this for later", "add that to the backlog", "anything postable in this", "/post-export --since 2w", "what have I got that I haven''t posted". This produces raw material, never a post — for an angle use post-angles, for copy use post-generator. It is NOT a handoff: to brief whoever picks the work up use handoff-generator, which is complete and state-oriented where this is selective and reader-oriented. To log a round of design iteration use exploration-log.'
argument-hint: "[--since <window>|<slug>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# post-export

The skill in this family that is not about posting. It captures **the material a
post gets built from, on the day it happens.**

The record answers what shipped and why it was chosen. It does not hold the third
attempt that failed and why, what the flow looked like before it was fixed, or the
output of the run that broke. Those are the parts a reader finds interesting, they
are freshest the day the work happens, and they are effectively gone a fortnight
later when someone sits down to write.

One loss is worse because it is irreversible. **Git holds the before-state of code.
It holds nothing of the rendered before** — the screenshot of the old flow, the doc
as it read last week, the failing terminal output. Those are overwritten, and only
something running at that moment can catch them.

Three rules govern this skill:

- **Never invent a learning.** Asked what a session taught, a model supplies a
  plausible lesson. Most stretches of work teach nothing crisp, and
  `*(nothing conclusive)*` is a real, useful entry. A backlog full of manufactured
  insight is worse than an empty one, because the empty one doesn't lie.
- **It competes with the work it captures, and loses.** Any structure demanded in
  the moment is structure you will not get. So interjection mode writes and gets
  out of the way; typing happens later.
- **It is not a handoff.** A handoff is state-oriented and complete — everything
  the receiver needs, dull parts included. An export is reader-oriented and
  selective — only what someone who wasn't there would find interesting. A handoff
  that omits boring-but-necessary context is broken; an export that includes it is
  useless.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow, including
  snapshots and retrieval.
- **Claude.ai** — no filesystem. Run the capture conversationally and emit each
  item as a **downloadable artifact**. **Say plainly that retrieval is unavailable**
  and that you cannot know the next item number, so the user must set it. Never
  guess a number — a duplicate item number is worse than an unnumbered one. Skip
  snapshots and say why.

### Step 1 — Resolve the backlog and read the index

In descending authority:

1. **A path declared in a CLAUDE.md `skill:post-setup` block.**
2. **An existing folder** — `posts/material/`, `content/material/`, `material/`.
   Match case-insensitively.
3. **Canon** — `posts/material/`.

If **nothing exists**, do not create it silently: recommend `/post-setup`, which
owns the tier's README and templates. If the user declines, offer to create just
the folder and the item.

Then read `README.md` for the highest item number. **Numbers continue the sequence
and are never reused**, even where a file was deleted. A burned number costs
nothing; two items called 007 costs the index.

### Step 2 — Decide which mode you are in

Four ways a capture starts. Read the trigger.

| Mode | Looks like | Go to |
|---|---|---|
| **Interjection** | "capture that", mid-work, no ceremony | Step 3 |
| **Session** | "export this for content", at the end of a stretch | Step 4 |
| **Range** | `--since 2w`, "anything postable this month" | Step 4 |
| **Handed over** | another skill offering its own output | Step 4 |
| **Retrieval** | "what have I got that I haven't posted" | Step 9 |

If genuinely ambiguous, ask once, two options. Capture writes and retrieval does
not.

### Step 3 — Interjection mode: write and leave

**No interview. No confirmation. No follow-up question.** Write the item from what
was just said, with `Type: untyped`, and return in one line: the item number and
nothing else. Then get out of the way — the user is mid-task and you are not the
task.

Typing is resolved at the end of the session, or the next time the skill runs. An
`untyped` item is a valid intermediate state and an invalid final one.

### Step 4 — Gather

- **Session mode** — the conversation, plus `git log`/`git show` for what actually
  changed, plus the record tiers for what was already written down.
- **Range mode** — `git log --since`, the changelog, decisions and explorations
  over the window. **Say plainly that anything unrecorded in that window is already
  lost.** A range export is a salvage operation, not a complete one, and implying
  otherwise makes the backlog look more trustworthy than it is.
- **Handed over** — take the material the calling skill offers and treat it as one
  candidate item, not as pre-approved.

### Step 5 — Scan against the checklist, don't ask what was interesting

"What was interesting about this session?" reliably produces nothing. Walk the work
against these shapes instead, and ask about the ones that look like they hit.

| Type | What it is | Composition it suits |
|---|---|---|
| Reframe | "I thought the problem was A, it was actually B" | Strongest opener there is, any platform |
| Failed attempt | What didn't work, and why | Thread or long-form |
| Trade | Chose X, gave up Y | Single frame, quotable |
| Before → after | A flow, a layout, a structure | Carousel or split panorama |
| Surprise | Didn't behave as expected | Short text post |
| Technique | A move someone else could copy | Carousel — the type that gets saved |
| Number | Real, and from a source | Single frame, big type |
| Mistake | What you got wrong and fixed | Text. Highest trust, needs no visual |
| Constraint | "Had to fit in X, which killed Y" | Pairs with a before/after |
| Dead end | No resolution, interesting problem shape | Text, and rarely posted |
| `other` | None of the above, and that's fine | Decided at angle time |

**Every item carries a type**, `other` included. The type is what tells
`post-generator` how a post breaks into frames, so a blank one breaks the handoff
between the two skills.

The type is also often obvious from the work and does not need asking. Draft it,
show it, let the user correct it.

### Step 6 — Offer to snapshot the before

Before anything gets overwritten, ask:

- **A file about to change** — copy the current version into `material/assets/`.
- **Output that will not survive** — a failing test run, an error, a timing. Capture
  it verbatim now.
- **A rendered state** — you cannot screenshot for the user, so **tell them to, and
  say why it is now or never.** Record where they put it.

Store under `{material}/assets/NNN-{what}.{ext}` and reference it from the item.
This is the one thing in the family that cannot be done later.

### Step 7 — Assemble

```md
# {one line: the thing itself, not a description of the session}

Type: {reframe} · Captured: {YYYY-MM-DD} · Status: unused | drafted | posted
Expires: {YYYY-MM-DD or —}
Sources: {paths into the record, or *(from conversation, not the record)*}
Artifacts: {posts/material/assets/003-before.png, or *(none)*}

## What happened

## Why it's interesting to someone who wasn't here

## What I'd have to check before posting it
```

**On Claude Code, get the date from `date +%F`. Never guess it.**

Three sections earn their place:

- **Sources** — every item says where it came from. Material drawn from the
  conversation rather than the record is labelled
  `*(from conversation, not the record)*`, so a later reader can tell a sourced
  claim from a remembered one.
- **Why it's interesting to someone who wasn't here** — the question that separates
  material from a diary entry. `*(nothing conclusive)*` is a legitimate answer.
- **What I'd have to check before posting it** — the half-remembered number, the
  unverified claim, the name that might not be public. Held next to the material
  instead of quietly entering a draft two weeks later. An empty one reads
  `*(nothing)*` rather than being omitted.

**Set `Expires` where the material has a shelf life** — a technique about to be
obsolete, an embargo, a launch that will have happened. Most items have none.

### Step 8A — Claude Code: write the items and update the index

1. `{material}/NNN-slug.md`, numbers continuing the sequence.
2. Update `{material}/README.md`: one row per item (item, type, captured, expires,
   status) and the count line — *N items. N unused, N drafted, N posted.*
3. **Items are append-only in substance.** Once written, only `Status` and
   `Expires` may change. A correction is a new item that links back.
4. Confirm the item numbers, then say **what is now answerable that was not
   before** — that is the point of having captured it.

### Step 8B — Claude.ai: produce downloadable artifacts

Emit each item as `material-{slug}.md`. State that the number must be set by the
user, that the index was not updated, and that no snapshot was taken.

### Step 9 — Retrieval mode

A backlog that can only be written to is not a backlog.

1. **"What have I got?"** — read the index. Answer with counts and the unused items,
   flagging anything past `Expires` or older than sixty days.
2. **"Anything about X?"** — `Grep` the items for the distinctive terms, then read
   the matches in full. Don't answer from a grep hit; the interesting part is
   several lines below it.
3. **Answer with the item number and its type**, quoting the line that matters.
4. **If it isn't there, say so plainly.** Do not infer from the code that something
   was or wasn't captured. Absence of a record is not evidence of absence, and
   guessing puts a fabricated fact into the one place meant to be reliable.

### Step 10 — Edge cases

- **The tier doesn't exist** — never create it silently (Step 1).
- **"Just capture it, you know what we did"** — decline the substance. Draft from
  what was actually said, section by section, and confirm.
- **Nothing happened** — capture nothing and say so. A session that produced no
  postable material is the common case, not a failure.
- **Everything comes out as a `Reframe`** — flag it once. Either the work really is
  all reframes, or the checklist is being pattern-matched rather than applied.
- **Unreleased, client-named, credentialed or internal detail** — never into the
  postable sections. It goes under a `Not postable yet` heading naming only that it
  exists, or it is refused outright. The skill's whole job is moving detail toward
  an audience, which is exactly why this gate is not optional.
- **Retro-capturing several sessions at once** — allowed, but date each from its own
  evidence, mark inferred dates `(approx.)`, and say plainly that they were written
  after the fact. An item captured in the moment and one reconstructed a month later
  are not the same artifact.
- **The user wants to delete or rewrite an item** — a dead end that went nowhere is
  still the record that it went nowhere. Offer a superseding item that links back,
  or a status change.
- **A snapshot that would be huge** — a video, a large binary. Record the path and
  what it shows rather than copying it in, and say the reference will rot.
- **An item's source file later moves** — expected. This is why the prose must
  stand alone; never let an item be nothing but a path.
