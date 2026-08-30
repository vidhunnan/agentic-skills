---
name: post-generator
description: Drafts per-platform copy from a sourced angle in your captured voice, and decides how the post breaks into frames — proposing composition concepts rather than picking one. Writes one Markdown file that is the contract post-card renders from, including a Not claimed section listing what it refused to say and why. Use when the user says "draft a post about this", "write this up for LinkedIn", "turn this into a post", or runs /post-generator. Claude Code primary; on Claude.ai it produces the file as a downloadable artifact.
when_to_use: 'Also fires on: "write a post about this", "draft something for X", "make this into a thread", "write the caption for this", "post about what we just did". It never publishes, schedules or queues anything — drafts only, on every surface, permanently. To capture material use post-export, to find an angle use post-angles, to render the frames use post-card.'
argument-hint: "[<slug>]"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion
disable-model-invocation: false
---

# post-generator

Turns a sourced angle into per-platform copy, and decides **how the post breaks up**
— which is a copy decision, not a rendering one.

Two failures sit on either side of this job. **It goes generic:** a model drafting a
post reaches for the register it has seen most, which is LinkedIn announcement
copy, recognisable within one line and corrosive to the credibility the content was
supposed to earn. **It goes untrue:** softly, and in a way that is hard to catch. A
concept becomes a plan, a plan becomes a launch, an exploration acquires a
conclusion it never reached. Nobody lies. The draft simply tightens, and the
tightened version is wrong.

That second failure is not hypothetical. In the by-hand test that produced this
family, the very first draft described five unbuilt skills in language that read as
shipped.

Three rules govern this skill:

- **Every refusal is visible.** What the draft would not say, and why, goes in
  `## Not claimed`. A silent refusal is indistinguishable from an oversight, and it
  is the section that lets you add something back deliberately with knowledge the
  record doesn't have.
- **Composition is proposed, never picked.** How an argument is cut across frames
  changes what each frame says, so it is decided here, with the copy — and offered
  as concepts that differ on a named structural axis, not on cosmetics.
- **Nothing publishes.** No posting, no scheduling, no queueing, no transmission to
  any platform or service, on any surface, permanently. A bad post cannot be
  un-posted, and pasting it yourself is the last honest review step.

## The arc

Four beats, one spine. The mode changes which beat carries the weight, not the
structure.

1. **The tension** — what wasn't working.
2. **The move** — what was done about it.
3. **What it's showing** — what surfaced. **This beat may say nothing conclusive
   yet.** It is where the honesty rule survives contact with social media, or
   doesn't.
4. **Where it goes** — the outcome being chased.

A **shipped** post lands on beats 2 and 3. An **exploring** post lands on 1 and 4
and stays honest about 3. A **decision** post puts the trade in beat 3.

**The arc is also the frame structure.** Four beats is a four-slide carousel almost
for free; a single-frame post is the same arc compressed, with the card carrying
one beat and the caption the rest. That is why copy and visual cannot be decided
separately.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Full flow, verified
  against the record.
- **Claude.ai** — no filesystem. Draft from the conversation, emit the file as a
  **downloadable artifact**, and **say plainly that you could not verify any claim
  against the record**. Every source line is labelled
  `*(from conversation, not the record)*`. Don't error.

### Step 1 — Read before drafting

- `posts/VOICE.md` — the post voice. **Not the repo's voice.** A skill drafting
  inside a docs folder absorbs the register around it unless the post voice is
  written down separately.
- The angle and the sources behind it, in full.
- Existing `posts/*.md`, so nothing repeats.
- Any backlog item's `What I'd have to check before posting it`.

**If `VOICE.md` is uncaptured**, say so now and again at the end: the draft will be
generic, and that is a fact about the input, not a style choice. **Do not
improvise a personality to fill the gap.**

### Step 2 — Check it is disclosable

Before drafting anything, establish that the subject is public. **Refuse to draft
from anything unreleased, client-named, credentialed, or marked internal** — by
default, not on suspicion.

This library gets installed in repos that are not the one it was written in. The
"nothing internal" convention protects one repo; a drafting skill has no such
protection and its entire job is moving information outward.

### Step 3 — Interview, in this order

**Order matters.** Skip anything the conversation already answered, and confirm
rather than re-ask.

1. **What are you trying to get across, and to whom?** First, always. The record
   answers *what happened*; only the user has the angle. Everything downstream is
   steered by this, so it is not a formality and it is not fourth.
2. **Which platforms.** Each gets its own copy.
3. **Composition** — see Step 5. Proposed, not picked.
4. **Anything the record cannot know**, offered as optional: the reaction from a
   user, why the obvious approach was never tried, how long it actually took.

### Step 4 — Draft the arc, then cut it per platform

Draft the four beats once, then cut separately for each platform. **A single draft
trimmed four ways is not four posts** — the constraint changes which beat survives,
and a 280-character cut is a different argument from a 1,300-character one.

Voice rules apply in this order: the **banned moves** unconditionally, then
`VOICE.md`'s **Stripped** table, then its **Carries over** traits. A user override
only beats a banned move where they put it in `VOICE.md` explicitly.

### Step 5 — Propose composition

The same content wants a different shape on each platform, and the shape follows
from the content *and* the platform, not either alone. A chart is one landscape
image on LinkedIn; on Instagram the same chart is a portrait crop that loses the
axis labels, a three-frame walkthrough, or a wide image split across grid tiles.

| Composition | Where it fits | What it does to the copy |
|---|---|---|
| Text only | X, Threads | The whole arc is in the words |
| Single frame | LinkedIn, X | Card carries one beat; caption carries the rest |
| Carousel | Instagram, LinkedIn document posts | One beat per frame; the caption becomes a lead-in, not a summary |
| Split panorama | Instagram grid | One wide image cut into aligned tiles |
| Portrait vs landscape | Everywhere | Changes how much text a frame holds before it stops being readable |

Offer **two or three concepts differing on a named structural axis** — where the
argument gets cut, how much load the caption carries. Record the alternatives and
the honest reason against each.

**Where one composition is obviously right, offer one and say why.** Three concepts
manufactured for a single-line reframe that only ever needed one frame is theatre,
and the user will stop reading the options.

The material's **type** is a strong hint: a before/after wants frames, a mistake
wants words.

**Platform sizes and limits drift.** Verify them rather than trusting a value
memorised at training time — a stale limit fails silently, looking fine locally and
cropping wrong in the feed.

### Step 6 — Assemble

```md
# Post — {title}

Date: {YYYY-MM-DD} · Status: draft
Mode: exploring | shipped | decision | release
Angle: {what I'm trying to get across, and to whom}

## Sources
- {paths, or *(from conversation, not the record)*}

## Copy
### X
### LinkedIn
### Instagram / Threads

## Visual plan
Composition: {carousel, 4 frames} · {1080×1350 portrait}

Considered and not chosen:
- {composition} — {the honest reason against it}

| # | Beat | What this frame carries | Treatment note |
|---|---|---|---|

## Alt text
- Frame 1: {…}

## Not claimed
{facts deliberately left out, because no source supports them}

## Editorial calls left to the author
{things surfaced and deliberately not decided}
```

**On Claude Code, get the date from `date +%F`. Never guess it.**

**The file is written for every post, including text-only ones**, because it is the
contract `post-card` reads and the record of what was refused.

**The visual plan carries the beat and a treatment note per frame, not the frame's
words.** Writing frame text this early produces filler for frames that only needed
an image; the words are decided at card time, when the treatment is known.

**Alt text is written for every frame.** Not optional, not deferred.

### Step 7 — Fill `Not claimed` honestly

Three things never enter the copy:

- **Anything described as shipped, launched or released that the changelog or git
  does not carry.** A PRD is not evidence. A concept is not a plan.
- **Any metric no source contains.** No engagement figures, no "cut my time by X",
  no counts you did not read.
- **A conclusion the record leaves open.** An exploration that hasn't concluded says
  so.

Each exclusion goes in `Not claimed` **with its reason**. An empty section reads
`*(nothing)*` rather than being omitted — an absent section looks like the check
wasn't run.

Anything from an item's `What I'd have to check before posting it` goes to
`## Editorial calls left to the author`. **Surface it; do not resolve it.**

### Step 8A — Claude Code: write the file

1. `posts/{date}-{slug}.md`, numeric suffix on collision — never overwrite.
2. Move the backlog items drawn on to `Status: drafted`.
3. Confirm the path, then report what went into `Not claimed` and why. **That
   report is the deliverable**, as much as the copy is.

### Step 8B — Claude.ai: produce a downloadable artifact

Emit `{date}-{slug}.md`. State that claims could not be verified against the
record, that backlog status was not updated, and that `Not claimed` was built from
the conversation alone.

### Step 9 — Edge cases

- **No `VOICE.md`** — draft anyway, label the output generic, say it twice. Never
  invent a register to fill the gap.
- **No record at all** — draft from the conversation with every source labelled.
  This is supported and honest; what is not supported is drafting from conversation
  and presenting it as sourced.
- **"Just make it punchy"** — tighten rhythm, never claims. Punchy is a sentence
  length; it is not permission to drop a hedge that was load-bearing.
- **The user adds a claim you cannot source** — take it, and move it from
  `Not claimed` into the copy attributed to them. Their knowledge is a legitimate
  source; your inference is not.
- **The angle is thin** — say so once and offer to go back to `post-angles` rather
  than inflating it. A thin angle produces a padded post, and padding is where
  invented claims arrive.
- **A platform the voice has no samples for** — draft it, and flag that the register
  is being carried across from another platform's evidence.
- **The user asks you to post it** — decline plainly, every time. Explain that
  nothing in the family publishes and hand them the copy to paste.
- **The user asks for hashtags and `VOICE.md` bans them** — the file wins. Say which
  rule you are following and offer to change the file, which is a different and
  deliberate act.
- **A repeat of an existing post** — say which post, and offer the angle that has
  not been used instead.
