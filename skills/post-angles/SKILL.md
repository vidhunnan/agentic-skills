---
name: post-angles
description: Reads your material backlog and the record over a window and proposes three or four angles worth posting — each with its tension, the specific reader it is for, and the sources behind it. Declines outright when nothing is worth a post yet, rather than padding to three. Use when the user says "what should I post about", "is there a post in this", "post ideas from this week", "anything worth posting", or runs /post-angles. Claude Code primary; on Claude.ai it works from the conversation.
when_to_use: 'Also fires on: "give me post ideas", "what could I write about this", "anything postable from this month", "help me find an angle". This proposes angles only — it writes no copy. To capture material use post-export, to draft the post use post-generator, to render frames use post-card. It never ranks its own proposals and never estimates reach or engagement.'
argument-hint: "[<window>]"
allowed-tools: Read, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# post-angles

Answers the question a full backlog does not: **what is worth a post this week, and
to whom.**

Having material is not the same as knowing what to say about it. Ten typed items
and thirty commits do not produce a post, because the angle is a claim about a
reader and the record only holds claims about the work. This is what stops people
building in public: sitting down with a complete record, finding nothing that feels
postable, and closing the tab. The material was there. The angle was missing.

The opposite failure matters as much and is the one a model will commit
automatically. **Asked for post ideas, it will always produce four** — including in
a week where nothing happened. A tool that cannot say *nothing here yet* is a tool
for posting about nothing, and it poisons every other output in the family, because
after the third invented angle nobody trusts the sourced ones either.

Three rules govern this skill:

- **It can decline, and declining is a designed output, not an error path.**
- **It proposes and never ranks.** No angle is presented as the best one, and none
  is scored. The user picks.
- **It never estimates performance.** No predicted reach, no "this will do well",
  no best-time-to-post. There is no evidence for any of it, and inventing it here
  would contaminate a skill whose whole value is that its claims are checkable.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow.
- **Claude.ai** — no filesystem. Work from the conversation, and **say plainly that
  you cannot check against prior posts**, so a repeat is possible. Never claim a
  record you cannot read. Don't error.

### Step 1 — Resolve the sources

1. **The backlog** — `posts/material/`, resolved the way `post-export` resolves it:
   a CLAUDE.md declared path, then an existing folder, then canon.
2. **The record** — `changelog/`, `docs/decisions/`, the explorations tier,
   `handoff/`.
3. **What has already been said** — `posts/*.md`.

**If the backlog is empty**, fall back to the record alone **and say that you did**.
If neither exists, recommend `/post-export` rather than interviewing an angle out
of nothing — this skill reads, it does not capture.

### Step 2 — Establish the window

A date range, a project, or "since I last posted". If the user didn't name one,
ask once and offer the obvious defaults. A window that is too wide produces a
survey; too narrow produces a decline that isn't true.

### Step 3 — Read, and read properly

Read the backlog items **in full**, not just their titles — the type and the
"why it's interesting" line are the raw material, and both sit below the heading.
Then read the record behind them, so an angle can be checked rather than trusted.

Read the existing posts too. An angle already covered is not an angle.

### Step 4 — Group before you propose

**This is the step that justifies the skill existing separately.** A typed, indexed
backlog already surfaces individual items; what it does not hold is the
**connection between them**, and that connection is very often the angle itself.
Two trades made in the same week for opposite reasons is a better post than either
trade. A reframe and the failed attempt that produced it are one story.

So group related items first, and let an angle span two or three. An angle that is
just one item restated is a weak angle, and if every proposal comes out that way,
say so — see Step 8.

### Step 5 — Propose, or decline

Three or four angles. **If there are two, propose two.** If there are none, decline.

```md
# Angles — {window}

Read: {N} backlog items, {N} commits, {N} decisions. Already posted: {N}.

## Angle 1 — {the claim, in one line}

**Tension:** {what is at odds, and why a reader would care}
**For:** {who specifically}
**Built from:** {item numbers and record paths}
**Type:** {the dominant material type, which suggests the composition}
**Weakest point:** {the thing that would make this a bad post}

## Angle 2 — …

## Not proposed, and why

- {item or theme} — {already posted / too thin / not public / no reader}
```

Declining:

```md
# Angles — {window}

**Nothing here is worth a post yet.**

Read: {N} backlog items, {N} commits. What's there: {one honest line}.
What would change it: {the specific thing that would make a post possible}.
```

Four fields do real work:

- **For** — a named reader. *"Designers"* and *"developers"* are not readers;
  *"a designer who has been asked to justify a design system to a sceptical PM"*
  is. Push once for specificity, then take what you're given.
- **Built from** — the citation. An angle you cannot source is not proposed;
  where it comes from the conversation, label it
  `*(from conversation, not the record)*`.
- **Weakest point** — every angle has one. Naming it is what stops the list reading
  like advocacy.
- **Not proposed** — where thin material goes honestly, instead of being inflated
  into a fourth angle.

### Step 6 — Hand over

On selection, write a stub `post-generator` can open: the angle line, the reader,
the sources, and the dominant type. Nothing else — composition and copy are that
skill's job, and pre-empting them here just means it gets overridden.

Mark the backlog items as drawn on. **Change nothing else about them.**

### Step 7 — Exclusions

Any item marked not-yet-postable is excluded. **Say that you excluded something
without restating the confidential detail** — "one item held back as not yet
public" is the entire message.

### Step 8 — Edge cases

- **A quiet window** — decline. Name what is actually there in one honest line, and
  what would change it. This is the skill working.
- **Every angle is one item restated** — say so. It means the backlog is doing the
  surfacing and the grouping added nothing, which is worth knowing: this skill's
  own PRD records that if grouping never adds anything it should be folded into
  `post-generator` rather than kept for symmetry.
- **The user asks which one is best** — decline once and explain why: the angle is
  a claim about their reader, and they know their reader. Offer to say what each
  one costs instead, which is a different and answerable question.
- **The user asks how a post will perform** — decline plainly. You have no evidence
  and a confident guess here would be indistinguishable from the invented metrics
  the whole family bans.
- **A near-duplicate of an existing post** — `Not proposed`, naming the post it
  duplicates. Angles repeat across windows and this is the only thing that catches
  it.
- **An angle spanning material that isn't public** — drop it, note the exclusion,
  don't hint at the content.
- **The backlog is huge** — narrow the window rather than reading two hundred
  items, and say that you narrowed it.
