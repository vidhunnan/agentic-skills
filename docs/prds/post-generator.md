# PRD — post-generator

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Turning real work into a post that reads like a person wrote it fails in two
directions at once.

**It goes generic.** A model drafting a post reaches for the register it has seen
most, which is LinkedIn announcement copy: em dashes, "excited to share", emoji
bullets, a hashtag stack. It is recognisable within one line and it undoes the
credibility the content was supposed to earn.

**It goes untrue.** Softly, and in a way that is hard to catch. A concept becomes a
plan, a plan becomes a launch, an exploration acquires a conclusion it never
reached. Nobody lies; the draft simply tightens, and the tightened version is
wrong. In the by-hand test of this family, the very first draft described five
unbuilt skills in language that read as shipped.

There is a third problem specific to visuals. The same content wants a different
shape on each platform. A chart is one landscape image on LinkedIn and, on
Instagram, either a lossy portrait crop, a three-frame walkthrough, or a wide
image split across grid tiles. Those are different posts, and **the copy has to
change with the shape** — which is why composition cannot be left to the frame
renderer.

## 2. Goals

- Draft per-platform copy from a sourced angle, in the user's captured voice.
- Decide **composition** as a first-class step, proposing concepts that differ on
  where the argument gets cut rather than on cosmetics.
- Write one Markdown file that is the contract `post-card` renders from.
- Make every factual claim traceable, and make the refusals visible rather than
  silent.

## Non-goals (v1)

- **Publishing, scheduling, or queueing.** Permanently, on every surface. Nothing
  in this family has an outbound side effect.
- **Rendering frames.** That is `post-card`.
- **Finding the angle.** That is `post-angles`, or the user.
- **Estimating performance.** No predicted reach, no best-time-to-post.
- **Writing in a voice it was not given.** Where `VOICE.md` is uncaptured the draft
  is generic and says so; it does not improvise a personality.
- **Optimising for a platform's algorithm.** It writes for a reader.

## 3. Primary user

Someone with a chosen angle and twenty minutes, who wants a draft they will edit
rather than a draft they will rewrite.

## 4. Core workflow

1. Detect surface. Read `posts/VOICE.md`, the angle, and the sources behind it.
2. Read existing posts, so nothing repeats.
3. Interview, in order:
   1. **What are you trying to get across, and to whom?** First, always. The record
      answers what happened; only the user has the angle.
   2. Which platforms.
   3. Composition — proposed, not picked.
   4. Anything the record cannot know, offered as optional.
4. Draft the arc, then cut it to each platform separately.
5. Assemble the file, including what was refused.
6. Write, and report what went into `Not claimed` and why.

### The arc

Four beats, one spine. The mode changes which beat carries the weight, not the
structure.

1. **The tension** — what wasn't working.
2. **The move** — what was done about it.
3. **What it's showing** — what surfaced. **This beat may say nothing conclusive
   yet**, and that is where the family's honesty rule survives contact with social
   media.
4. **Where it goes** — the outcome being chased.

The arc is also the frame structure: four beats is a four-slide carousel; a single
frame is the arc compressed, with the card carrying one beat and the caption the
rest.

## 5. Output template

`posts/{date}-{slug}.md`:

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
{things the skill surfaced and refused to decide}
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST write the file for every post, including text-only ones. | Claude Code |
| R2 | The interview MUST begin by establishing intent and audience, before platform or composition. | Claude Code, Claude.ai |
| R3 | The skill MUST NOT describe anything as shipped, launched or released unless the changelog or git carries it. | Claude Code |
| R4 | The skill MUST NOT state a metric that no source contains. | Claude Code, Claude.ai |
| R5 | The skill MUST NOT resolve an exploration the record leaves open. | Claude Code, Claude.ai |
| R6 | Every claim excluded under R3–R5 MUST appear under `Not claimed` with its reason. An empty section MUST read `*(nothing)*`. | Claude Code, Claude.ai |
| R7 | Copy MUST satisfy the banned-moves list unconditionally, `VOICE.md` overrides included only where the user set them there explicitly. | Claude Code, Claude.ai |
| R8 | Where `VOICE.md` is uncaptured the skill MUST label the draft as generic and MUST NOT invent a register. | Claude Code, Claude.ai |
| R9 | Each platform MUST get its own copy, drafted to its own constraints. A single draft reused across platforms is not acceptable. | Claude Code, Claude.ai |
| R10 | Composition MUST be proposed as two or three concepts differing on a named structural axis, with the alternatives and the reason against each recorded. Where one composition is obviously right the skill MUST offer one and say why, rather than manufacturing three. | Claude Code, Claude.ai |
| R11 | The visual plan MUST record frame count, dimensions, and the beat each frame carries. | Claude Code, Claude.ai |
| R12 | Alt text MUST be written for every frame. | Claude Code, Claude.ai |
| R13 | The skill MUST verify the post is publicly disclosable before drafting, and MUST refuse to draft from anything unreleased, client-named, credentialed or marked internal. | Claude Code, Claude.ai |
| R14 | The skill MUST NOT publish, schedule, or transmit a draft to any platform or service. | Claude Code, Claude.ai |
| R15 | Where an item's `What I'd have to check before posting it` is non-empty, the skill MUST surface it rather than silently resolving it. | Claude Code |
| R16 | Backlog items drawn on MUST be moved to `drafted`. | Claude Code |
| R17 | On Claude.ai the skill MUST emit the file as a downloadable artifact and MUST state that it could not verify claims against the record. | Claude.ai |

## 7. Success criteria

- The draft is edited before posting, not rewritten.
- `Not claimed` is non-empty on most posts, and the user agrees with what is in it.
- A reader of the file can check any claim against a source without asking.
- Composition changes the copy, visibly, between platforms.
- A draft written with a captured voice reads measurably less generic than one
  written without it — the comparison that gated this family's graduation.

## 8. Risks

- **Soft overclaiming.** The failure that already occurred once in testing.
  Mitigation: R3–R6, with `Not claimed` making the refusals visible instead of
  silent.
- **Voice pattern-matching off the surrounding repo.** A skill drafting inside a
  docs folder will absorb its register. Mitigation: `VOICE.md` is the post voice,
  explicitly not the repo voice, and R7 bans the tells regardless.
- **Stale platform constraints.** A wrong character limit or aspect ratio fails
  silently — it looks fine locally and crops wrong in the feed. Mitigation: limits
  live in one place, are verified at build, and are re-checked periodically.
- **Composition theatre.** Three concepts manufactured for a single-line reframe
  that only ever needed one frame. Mitigation: the escape in R10.
- **Interview fatigue.** Four questions before any words appear. Mitigation: skip
  anything the conversation already answered and confirm rather than re-ask.

## 9. Open questions for v2

- On plan drift — the user cuts a four-frame carousel to two and the copy no longer
  matches — does this skill re-draft, or does `post-card` refuse to render?
  Current lean: refuse and report, because silently rendering a mismatch is only
  caught after posting.
- Should per-frame copy be written at plan time, or only the beat and a treatment
  note with the words decided at card time? Current lean: the latter, since writing
  frame text early produces filler for frames that only needed an image.
- Should a posted draft record where and when it went, closing the loop the
  backlog's status half-opens?
