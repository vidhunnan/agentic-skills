# Concept — Working in public: the library's first outbound skills

Status: exploring · Date: 2026-08-30

> Hypothesis, not a plan. Nothing here is committed. Do not cite this document as
> evidence that anything exists or has been decided.

## The hunch

Every skill in this library is **inbound**. It reads the work and writes the
record: what shipped, why we chose it, what we tried, where we left off. Fifteen
skills, all pointing the same direction.

None of them point outward. The record gets written and then it sits there, read
by the next session and nobody else.

The hunch is that there's a family of skills on the other side of that: **the
record, aimed at an audience.** You shipped something, or you're mid-exploration
and something interesting just surfaced. That's a post. The facts are already
written down by the skills you already run. What's missing is the thing that
turns a changelog entry and an ADR into three hundred words a human would
actually read.

## The tension this has to survive

The library's identity is *faithful, never generative*. `exploration-log` refuses
to invent what a round taught. `decisions-logger` writes `*(reason not stated)*`
rather than a plausible fiction. `handoff-generator` will not cite a PRD as
evidence something exists.

A social post is generative by nature, and social media is where language models
are at their worst: hollow announcements, manufactured struggle arcs, invented
metrics, "excited to share".

So the family only belongs here if it inherits the rule rather than exempting
itself from it:

> **The post is sourced from the record, not from vibes.** It reads `changelog/`,
> `docs/decisions/`, the explorations tier and `handoff/` — the tiers the other
> skills already wrote — and drafts from real facts. Every factual claim traces
> to a line in a source. Nothing is described as shipped unless the changelog
> says so. An exploration with no conclusion yet says it has no conclusion yet.

That also makes this the **first family that consumes other skills' output.**
Cross-skill composition was listed as a non-goal in `handoff-generator`'s PRD.
If it's ever worth doing, this is the case for it: the stack is the input.

## The skills

Split by question, the way the design cluster splits. Five so far, and the family
is open-ended — it grows by finding another distinct question, not by adding modes
to an existing skill.

| Question | Skill | Output |
|---|---|---|
| Where does any of this go? | `post-setup` | Scaffolds `posts/`, runs the voice interview, captures the card direction, registers the protocol block |
| What was postable about this work? | `post-export` | A typed, indexed backlog captured while the work is warm — with the before-state snapshotted before it's overwritten |
| What's even worth posting? | `post-angles` | Three or four angles, each with its tension and its audience |
| How do I say it, and how does it break up? | `post-generator` | One Markdown file: per-platform copy on the storytelling arc, plus the **visual plan** — how many frames, what each one carries |
| What does each frame look like? | `post-card` | Reads that plan and renders the frames as self-contained HTML at real dimensions, to PNG where a browser is available |

`post-setup` mirrors `repo-setup` and `design-setup`: detect, map, confirm, never
impose; additive only. It is what makes the rest have somewhere to write.

The flow runs one way and each step is optional: capture material, find an angle,
draft the copy and its plan, render the frames. You can enter at any point. A post
you already know how to write skips straight to `post-generator`.

## The storytelling arc

The modes — shipped, exploring, decision, release — would not be four separate
templates. They'd be one spine, with a different beat carrying the weight:

1. **The tension.** What wasn't working. What bugged you enough to act.
2. **The move.** What you did about it.
3. **What it's showing.** What surfaced — *and this beat is allowed to say
   nothing conclusive yet.* This is where the library's honesty rule survives
   contact with social media, or doesn't.
4. **Where it goes.** The outcome being chased.

A shipped post lands on beats 2 and 3. An exploration post lands on 1 and 4 and
stays honest about 3. A decision post puts the trade in beat 3.

The arc has a useful second life: **it is also the frame structure.** Four beats
is a four-slide carousel almost for free. A single-image post is the same arc
compressed, with the card carrying one beat and the caption carrying the rest.
That's the link between the copy and the visual, and the reason the two can't be
decided independently.

The interview would open before any of it, with the question that steers
everything downstream: **what are you trying to get across, and to whom?** Not
"what happened" — the record already answers that. The angle is the part only the
human has.

## Composition: the decision the platforms force

The same content wants a different shape on each platform, and the shape is a
function of the content *and* the platform, not either alone.

A chart is one landscape image on LinkedIn. On Instagram the same chart is either
a portrait crop that loses the axis labels, a three-frame carousel that walks
through it, or a wide image split across three grid tiles. Those are three
different posts, and the copy has to change with them.

So `post-generator` would carry composition as a first-class decision, roughly:

| Composition | Where it fits | What it does to the copy |
|---|---|---|
| Text only | X, Threads | The whole arc is in the words |
| Single frame | LinkedIn, X | Card carries one beat; caption carries the rest |
| Carousel | Instagram, LinkedIn document posts | One beat per frame; the caption becomes a lead-in, not a summary |
| Split panorama | Instagram grid | One wide image cut into aligned tiles; reads as one thing on the profile |
| Portrait vs landscape | Everywhere | Changes how much text a frame can hold before it stops being readable |

**And it proposes rather than picks.** This is `design-explore`'s move: two or
three composition concepts that differ on a *named structural axis* — where the
argument gets cut, how much load the caption carries — not on cosmetics. The user
chooses. If the honest answer is that one composition is obviously right, it says
so and offers one, rather than manufacturing three.

Platform dimensions and limits would need verifying at build time and periodically
after. They drift, and a skill that hardcodes a stale aspect ratio fails silently
in the worst way: it produces something that looks fine and crops wrong.

## The Markdown file is the contract

`post-generator` always writes `posts/{date}-{slug}.md`, even for a text-only
post. `post-card` reads it. That file is the interface between the two skills,
which is what lets them be separate skills at all.

```md
# Post — {title}

Date: {YYYY-MM-DD} · Status: draft
Mode: exploring | shipped | decision | release
Angle: {what I'm trying to get across, and to whom}

## Sources
- {path into changelog/, docs/decisions/, explorations — the lines this is drawn from}

## Copy
### X
### LinkedIn
### Instagram / Threads

## Visual plan
Composition: {carousel, 4 frames} · {1080×1350 portrait}

| # | Beat | What this frame carries | Treatment note |
|---|---|---|---|
| 1 | Tension | ... | type only |

## Alt text
- Frame 1: {...}

## Not claimed
{facts deliberately left out, because no source supports them}
```

Two sections are load-bearing beyond their size. **Sources** is what makes the
draft auditable — you can check any claim against the tier it came from.
**Not claimed** is the honesty rule made visible in the artifact: the things it
wanted to say and wouldn't, so you can add them deliberately with your own
knowledge rather than have them appear on their own.

`post-card` would also run standalone, without a plan file, by interviewing for
what it's missing. Not every card starts life as a post.

## Voice

Two things, kept separate.

**A banned-moves list, hard-coded, before any user config loads.** No em dashes.
No "excited to announce" or "thrilled to share". No emoji bullets, no hashtag
stacks. No rhetorical-question openers. No "here's what I learned:" listicle
scaffolding. No invented metrics. No manufactured struggle arc. None of
"game-changer", "unlock", "leverage", "dive deep".

**A `posts/VOICE.md`, captured once by interview and seeded from real posts the
user pastes in.** A described voice and a demonstrated one are different things,
so it would want both: the interview for the rules, three to five real posts for
the patterns the user can't articulate.

Worth naming a trap: this repo's own prose is dense with em dashes. A skill
drafting inside it will pattern-match off the surrounding docs unless the post
voice is written down as a separate thing. `VOICE.md` is the post voice, not the
repo voice.

## The card

Instagram and Threads are visual-first, so text-only output would be half a
skill there.

`post-card` takes the visual plan and renders each frame as a self-contained HTML
file, inline CSS, at real dimensions — then to PNG where a headless browser exists,
falling back to open-it-and-screenshot where one doesn't. That keeps it installable
for people who don't have Chromium lying around, and keeps each frame a single
readable file the user can restyle by hand.

**It brainstorms too, on a different axis than `post-generator`.** The plan says
*frame 2 carries the move*; it does not say whether that frame is a screenshot, a
chart, a pull quote, a code block or type on a flat ground. So `post-card` would
propose two or three treatments for a plan and let the user choose — same
propose-don't-pick rule, one level down.

| Skill | Brainstorms | Axis |
|---|---|---|
| `post-angles` | What to say | Which story the record supports |
| `post-generator` | How it breaks up | Where the argument gets cut |
| `post-card` | How each frame reads | Treatment: type, chart, screenshot, quote |

A carousel is a sequence, not a set, so treatment has to hold across frames —
frame 3 can't arrive in a different visual language than frame 1. The direction
gets decided once and applies to the run.

The visual direction itself would come from an interview, in the way
`design-language` refuses to propose a look for you. Where the project already has
`design/system/` or a `design-language` output, that pre-fills the interview and
gets confirmed rather than assumed.

This is one of two places the family strains the library's "all Markdown, no code"
line, the other being `post-export`'s snapshots. They widen it differently: a card
is **generated**, a snapshot is **preserved**. The defence for the card is that
it's a single static file with no build step and no dependency, closer to a
Markdown document than to an application. Both are real widenings and worth saying
out loud rather than discovering later.

## The `posts/` tier

`posts/{date}-{slug}.md` for the copy, `posts/cards/{slug}.html` for the visual,
committed, with a README declaring its tense:

> **Derived.** It cites the record. It is never a source.

A post must never be citable as evidence that something shipped, or the family
quietly reintroduces the exact failure the done-vs-explored rule exists to
prevent. Note that this makes `posts/` **downstream of** the context stack rather
than a tier *in* it — it doesn't get a row in the routing table.

## The disclosure gate

The one that worries me most, because it's easy to skip and expensive once.

This library gets installed in repos that are not this one. The "nothing
internal, employer-specific or unreleased" rule protects *this* repo by
convention; a drafting skill installed elsewhere has no such protection and its
entire job is to move information outward.

So: an explicit gate before drafting. *Is this public?* Refuse to draft from
anything unreleased, client-named, credentialed, or marked internal, and refuse
by default rather than on suspicion.

## The skills, in detail

Conditional throughout. This is the shape being proposed, not a spec — a PRD per
skill is what turns any of it into a commitment.

### `post-setup`

**Would trigger on** "set up posts", "where do my posts go", "set up this repo
for working in public", `/post-setup`, `/post-setup check`.

**Reads** the repo for anything that already exists: a `posts/`, `content/` or
`social/` folder; `design/system/` or a `design-language` output for the card
direction; `CLAUDE.md` for protocol blocks; the record tiers, so it can report
what the drafting skills will actually have to work from.

**Interviews for** the voice — the questions plus three to five real posts pasted
in, because a described voice and a demonstrated one differ — and the card
direction, pre-filled from the design system where one exists.

**Writes** `posts/README.md` (declaring the derived tense), `posts/VOICE.md`,
`posts/CARD.md`, `posts/cards/`, and a `skill:post-setup` protocol block.
Additive only, adopts existing folder names, never renames anyone's repo. Same
two principles as `repo-setup` and `design-setup`, because they are the same two
problems.

**Refuses to** invent a voice. If the user skips the samples and the interview,
it writes the banned-moves list and an explicitly empty positive half rather than
a plausible-sounding voice nobody chose.

### `post-export`

The one that isn't about posting. It's about **capturing the material before it
evaporates.**

The record answers what shipped and why it was chosen. It does not hold *the third
attempt failed because the API returned stale reads, and that's the interesting
part*, or how a flow looked before versus after. Those are the details a post is
actually built from, they are freshest the day the work happens, and they are gone
a fortnight later when you sit down to write.

**Would trigger on** "export this for content", "capture that", "what did we learn
in this session", `/post-export`, `/post-export --since 2w`.

#### Four ways a capture starts

| Trigger | When | Why it's here |
|---|---|---|
| End of a session | You ran it, or the protocol block offered | The core case. The details are still warm |
| Mid-session interjection | "capture that", the moment a reframe lands | The absolute freshest point. Must be cheap or it derails the work |
| Over a named range | `--since 2w` — reads git, changelog, decisions | Catching up. Everything unrecorded is already gone by then, and it should say so |
| From another skill | `exploration-log` kills a direction, `decisions-logger` writes an ADR | The strongest composition in the library, and zero extra effort |

The mid-session mode has a hard constraint: **it captures and gets out of the
way.** No interview, no confirmation loop. It writes what was just said, marks the
item `untyped`, and the typing happens at the end of the session. A capture step
that interrupts is a capture step that gets turned off.

#### Typing the material

Every item carries a type. **This is required**, with `other` as an explicit
escape, because the type is what feeds `post-generator`'s composition decision —
leave it blank and the two skills stop composing.

| Type | What it is | Post shape it suits |
|---|---|---|
| Reframe | "I thought the problem was A, it was actually B" | The strongest opener there is. Works anywhere |
| Failed attempt | What didn't work, and why | Thread or long-form |
| Trade | Chose X, gave up Y | Single card, quotable |
| Before → after | A flow, a layout, a structure | Carousel or split panorama |
| Surprise | Didn't behave as expected | Short text post |
| Technique | A move someone else could copy | Carousel — this is the type that gets saved |
| Number | Real, and from a source | Single frame, big type |
| Mistake | What you got wrong and fixed | Text. Highest trust, needs no visual |
| Constraint | "Had to fit in X, which killed Y" | Pairs with a before/after |
| Dead end | No resolution, but the problem shape is interesting | Honest, and rarely posted |
| `other` | None of the above, and that's fine | Decided at angle time |

The list is also a **scan checklist**. Rather than asking "what was interesting",
which produces nothing, the skill walks the work against these shapes and asks
about the ones that seem to have hit.

#### Snapshotting the before

Git holds the before-state of *code*. It does not hold the **rendered** before:
the screenshot of the old flow, the doc as it read last week, the terminal output
of the failing run. By the time you write the post, the before has been
overwritten, and only a skill running at that moment can catch it.

So `post-export` would capture artifacts, not just prose — a copy of the prior
version of a changed file, the failing output verbatim, and a prompt to drop in a
screenshot with somewhere to put it. Stored beside the item and referenced from it.

**This is the family's second widening past Markdown**, after the HTML cards, and
the two are different in kind: a card is generated, a snapshot is preserved. The
defence for this one is the same as `exploration-log`'s: the artifact is
unrecoverable later, which is exactly why capturing it is the job.

#### What it writes

Index plus one file per item, mirroring how `changelog/CHANGELOG.md` sits over
`changelog/commits/`. Each item is atomic, so it can move through the pipeline on
its own.

`posts/material/README.md`:

| Item | Type | Captured | Expires | Status |
|---|---|---|---|---|
| `003-arc-is-the-carousel` | Reframe | 2026-08-30 | — | unused |
| `002-post-vs-handoff` | Trade | 2026-08-30 | — | drafted |

`posts/material/NNN-slug.md`:

```md
# {one line: the thing itself, not a description of the session}

Type: {reframe} · Captured: {YYYY-MM-DD} · Status: unused | drafted | posted
Expires: {YYYY-MM-DD or —}
Sources: {paths, or *(from conversation, not the record)*}
Artifacts: {posts/material/assets/003-before.png}

## What happened
## Why it's interesting to someone who wasn't here
## What I'd have to check before posting it
```

That third section is the one doing unusual work. It's where a half-remembered
number, an unverified claim or a name that might not be public goes — held next to
the material instead of quietly entering a draft two weeks later.

**Status closes the loop.** Once items carry `unused | drafted | posted`, the
backlog is answerable: *fourteen unused, three over sixty days old*. And material
genuinely expires — a technique that's now obsolete, an embargo that lifted, a
launch that already happened — so `Expires` beats a backlog that rots silently.

#### Retrieval

The second mode, the way `exploration-log` has one. *"What have I got that I
haven't posted?"* *"Anything about caching?"* A backlog that can only be written
to is a backlog nobody reads.

**Refuses to** invent a learning. `*(nothing conclusive)*` carries over from
`exploration-log` verbatim, and for the same reason: most stretches of work teach
nothing crisp, and a backlog full of manufactured insight is worse than an empty
one.

`post-angles` then reads **both** the record and this backlog. The backlog is
where the good material lives; the record is what makes it checkable.

### `post-angles`

**Would trigger on** "what should I post about", "is there a post in this", "post
ideas from this week", `/post-angles`.

**Reads** the record over a window the user names — `changelog/` for what
shipped, `docs/decisions/` for the forks, the explorations tier for what got
killed, `handoff/` for where things stand.

**Proposes** three or four angles. Each carries its tension, who it's for, and
the source lines behind it. An angle with no source is either dropped or marked
`*(from conversation, not the record)*` so the difference stays visible.

**Refuses to** manufacture an angle out of a quiet week. "Nothing here is worth a
post yet" is a real answer and the skill should be able to give it, or it becomes
a machine for posting about nothing.

### `post-generator`

**Would trigger on** "draft a post about this", "write this up for LinkedIn",
"turn this into a post", `/post-generator`.

**Reads** the chosen angle, the sources behind it, `posts/VOICE.md`, and the
existing `posts/` so it can notice you already covered this.

**Interviews**, in order:

1. **What are you trying to get across, and to whom?** First, always. The record
   answers *what happened*; only the human has the angle.
2. **Which platforms?** Each has its own copy, not one draft trimmed four ways.
3. **Composition** — proposed, not picked. Two or three concepts differing on
   where the argument gets cut and how much load the caption carries.
4. **Anything the record can't know**, offered as optional. The reaction from a
   user, why the obvious approach was never tried, how long it actually took.

**Writes** `posts/{date}-{slug}.md` — the contract file above — always, including
for text-only posts, so there is one artifact per post whether or not it has a
visual.

**Refuses to** state anything as shipped that the changelog doesn't carry, to
report a metric no source contains, or to resolve an exploration that hasn't
concluded. Those go to `## Not claimed` instead of into the copy.

### `post-card`

**Would trigger on** "make the cards", "render the carousel", "make an image for
this post", `/post-card`.

**Reads** the plan file's `## Visual plan` and `## Alt text`, plus `posts/CARD.md`
for the direction.

**Proposes** two or three treatments per plan — type only, chart, screenshot,
pull quote, code — held consistent across every frame in a run, since a carousel
is a sequence and not a set.

**Writes** `posts/cards/{slug}-{n}.html`, one self-contained file per frame,
inline CSS, no build step and no dependency. Renders to PNG where a headless
browser is available; where one isn't, it says so plainly and tells the user to
open and screenshot rather than failing.

**Refuses to** render against a plan whose frame count no longer matches its copy
— see the drift question below — and to fabricate a chart. If a frame calls for
data, the data comes from a source or the frame gets a different treatment.

### Platform reference

Needed by both drafting skills, and the thing most likely to be quietly wrong.

| Platform | Frame size | Composition it supports |
|---|---|---|
| X | 1200×675 landscape | Text only, or up to four images. No swipe carousel |
| LinkedIn | 1200×627 landscape, 1080×1350 portrait for document posts | Single, multi-image, or a document/carousel post |
| Instagram | 1080×1350 portrait | Single, carousel, or a wide image split into aligned grid tiles |
| Threads | 1080×1350 portrait | Single or multi-image |

**These drift, and a stale aspect ratio fails silently** — it produces something
that looks fine locally and crops wrong in the feed. They'd need verifying when
the skills are built and re-checking periodically, not hardcoding once and
trusting forever.

## Why it might matter

- The library's argument is that a complete record makes the next session cheap.
  If the record is good enough to brief an agent, it should be good enough to
  brief a reader. This tests whether that's true or whether the record is only
  ever legible to a machine.
- It closes a real loop: the reason to keep a changelog honest goes up when the
  changelog feeds something you put your name on.
- It's the first thing in the library a non-engineer would install for its own
  sake.

## What we'd have to believe

- That a post drafted from the record reads better than one drafted from memory.
  Plausible for shipped work. Much shakier for explorations, where the
  interesting part is often the thing nobody wrote down.
- That a written voice file actually holds. Voice capture is the step most likely
  to produce something that looks right and reads generic.
- That four skills is the right cut and not two skills plus wishful symmetry.
  `post-angles` in particular could turn out to be a phase of `post-generator`
  rather than its own thing.
- That the honesty rules survive the incentive. Every other skill in the library
  is read by one person. This one is read by an audience, and that is exactly
  the pressure that turns "nothing conclusive yet" into a claim.

## Positions taken so far

Settled in brainstorming, not logged as decisions. This is the concepts tier —
**none of these are ADRs and none should be cited as one.** If the family
graduates, they're what `decisions-logger` would be pointed at first.

**No record is not a refusal.** Most projects worth posting about have no
changelog and no ADRs. The family degrades to an interview and drafts from the
conversation, but labels it: `*(from conversation, not the record)*` in the
Sources section. The thesis survives because the artifact says which mode it ran
in, so a reader can tell a sourced claim from a remembered one. Declining outright
was the alternative, and it would make the family unusable outside repos that
already run this library.

**Nothing ever publishes.** Drafts only, on every surface, permanently. Every
skill here is Markdown with no outbound side effect, a bad post cannot be
un-posted, and pasting it yourself is the last honest review step. Pushing to a
drafts queue was considered and rejected for v1 on the same grounds.

**Nudge to capture, never to post.** The protocol block would offer `post-export`
at the end of a stretch of work in any project — capture is cheap, low-stakes, and
the material is perishable. It must not depend on `version-manager` or any other
skill being installed. Nothing in the family ever suggests you should be posting
more; that's a stance about how you work, and not one a skill gets to take.

**An export is not a handoff.** Both read a session and write down what happened,
which is why the overlap needed settling. The difference is completeness: a
**handoff is state-oriented and complete** — everything the receiver needs,
including the dull parts. An **export is reader-oriented and selective** — only
what a stranger would find interesting, deliberately incomplete. A handoff that
omits boring-but-necessary context is broken; an export that includes it is
useless. Different failure modes, so different skills.

**Graduation is gated on one real post.** Not on the doc feeling finished. The
flow gets run by hand, end to end, on real work; if the output is publishable
without a rewrite the family graduates into PRDs, and if it isn't we learned that
for the price of one post instead of five specs.

## Open questions

- Does `post-angles` earn its own skill, or is it the first phase of drafting?
  Weaker now that `post-export` exists, since the backlog does much of the
  surfacing work an angles skill was going to do.
- Is HTML output a one-time exception or the start of the library generating
  code?
- Who owns composition when the user overrides it? If they take a proposed
  four-frame carousel down to two, the copy no longer matches the plan. Does
  `post-generator` re-draft, or does `post-card` flag the drift and refuse?
  **Leaning refuse-and-report** — silently rendering a mismatch is the failure
  you only catch after posting, which is the one time it can't be fixed.
- Does a carousel need per-frame copy in the file, or just the beat and a
  treatment note? Writing the frame text at plan time is more useful and much
  more likely to produce filler for frames that only needed an image.
  **Leaning beat plus treatment note**, with frame text written at card time
  where the treatment is known.
- Is `posts/CARD.md` its own file or a section of `posts/VOICE.md`? One voice
  covering words and visuals is tidier; splitting them means `post-card` can run
  in a project that never drafts copy.
- How much of a session can `post-export` actually see? On Claude Code it has
  git and the conversation; the "third attempt failed because X" detail may only
  exist in the user's head, which turns capture into an interview rather than an
  extraction.

## Graduate or kill

**Graduate** into PRDs — one per skill — when the flow has been run by hand, end
to end, on one real piece of work: capture the material, find the angle, draft the
copy and its plan, render a frame. The bar is that the output is worth publishing
without a rewrite.

**Kill** it when the honest answer after that test is that the record didn't help
— that the post came out of the head, not the changelog, and the skill was doing
formatting rather than sourcing.
