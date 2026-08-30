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

## The four skills

Split by question, the way the design cluster splits.

| Question | Skill | Output |
|---|---|---|
| Where does any of this go? | `post-setup` | Scaffolds `posts/`, runs the voice interview, captures the card direction, registers the protocol block |
| What's even worth posting? | `post-angles` | Three or four angles, each with its tension and its audience |
| How do I say it? | `post-generator` | Per-platform copy on the storytelling arc, in the captured voice |
| What does it look like? | `post-card` | A self-contained HTML card at the platform's real dimensions, rendered to PNG where a browser is available |

`post-setup` mirrors `repo-setup` and `design-setup`: detect, map, confirm, never
impose; additive only. It is what makes the other three have somewhere to write.

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

The interview would open before any of it, with the question that steers
everything downstream: **what are you trying to get across, and to whom?** Not
"what happened" — the record already answers that. The angle is the part only the
human has.

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

`post-card` would write one self-contained HTML file, inline CSS, at real
dimensions — 1080×1350 Instagram portrait, 1200×675 X, 1200×627 LinkedIn — then
render to PNG where a headless browser exists and fall back to
open-it-and-screenshot where one doesn't. That keeps it installable for people
who don't have Chromium lying around, and keeps the artifact a single readable
file the user can restyle by hand.

The visual direction would come from an interview, in the way `design-language`
refuses to propose a look for you. Where the project already has `design/system/`
or a `design-language` output, that pre-fills the interview and gets confirmed
rather than assumed.

This is the one place the family strains the library's "all Markdown, no code"
line. HTML is not Markdown. The defence would be that it's a single static file
with no build step and no dependency, which is closer to a Markdown document than
to an application — but it is a real widening and worth saying out loud.

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

## Open questions

- Does `post-angles` earn its own skill, or is it the first phase of drafting?
- Should publishing ever be in scope? A Typefully-style integration is
  technically easy and would make this the only skill in the library with an
  outbound side effect. The instinct is no for v1: drafts only, the human posts.
- How does the family handle a project with **no record**? Most projects someone
  would post about have no changelog and no ADRs. Does it degrade to a plain
  interview, or does it decline the way `design-critique` declines to critique
  without a written intent?
- Is HTML output a one-time exception or the start of the library generating
  code?
- Does `post-setup` deserve a protocol block, given the other setup skills have
  one, or is "offer to draft a post after a release" a nudge too far?

## Graduate or kill

**Graduate** into PRDs when the storytelling arc and the voice capture have been
tried by hand, on one real post, and the output is something worth publishing
without a rewrite.

**Kill** it when the honest answer after that test is that the record didn't help
— that the post came out of the head, not the changelog, and the skill was doing
formatting rather than sourcing.
