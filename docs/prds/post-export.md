# PRD — post-export

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

The record answers what shipped and why it was chosen. It does not hold the
material a post is actually built from: the third attempt that failed and why,
what the flow looked like before it was fixed, the output of the run that broke.

Those details are freshest the day the work happens and effectively gone a
fortnight later. By the time someone sits down to write, the interesting part has
already evaporated, and what remains is a commit message.

There is a second loss, and it is worse because it is irreversible. **Git holds the
before-state of code. It holds nothing of the rendered before** — the screenshot of
the old flow, the doc as it read last week, the failing terminal output. Those are
overwritten, and only something running at that moment can catch them.

## 2. Goals

- Capture postable material **while the work is warm**, at four different moments,
  one of which must cost nothing.
- **Type** every item, because the type is what tells `post-generator` how a post
  breaks into frames.
- Snapshot the before-state before it is overwritten.
- Keep an indexed backlog with status, so the material is findable weeks later and
  the loop closes when something gets posted.
- Answer questions back — a backlog that can only be written to is not a backlog.

## Non-goals (v1)

- **Writing a post.** No copy, no angle, no frame. This produces raw material.
- **Judging the material.** It records what happened and asks why it was
  interesting. It never rates an item or ranks the backlog.
- **Inventing a learning.** Most stretches of work teach nothing crisp.
- **Briefing a successor.** That is `handoff-generator`, and the distinction is
  load-bearing: a handoff is state-oriented and complete, an export is
  reader-oriented and selective.
- **Reading a session it was not present for**, beyond what git and the record show.

## 3. Primary user

Someone mid-project who will want to post about this in three weeks and will not
remember any of it by then.

## 4. Core workflow

1. Detect surface. Resolve `posts/material/`, and read the index for the next number.
2. Establish the mode: session, interjection, range, or handed material from
   another skill.
3. Gather. Session and range modes read git, the changelog, decisions and
   explorations over the window; every mode also reads the conversation.
4. Scan the work against the type checklist and ask about the shapes that seem to
   have hit, rather than asking what was interesting.
5. Offer to snapshot anything about to be overwritten.
6. Write the items and update the index.
7. Report what was captured, and what is now answerable that was not before.

**Interjection mode short-circuits steps 3 to 6:** it writes the item `untyped`
from what was just said and returns immediately.

## 5. Output template

`posts/material/NNN-slug.md`:

```md
# {one line: the thing itself, not a description of the session}

Type: {reframe} · Captured: {YYYY-MM-DD} · Status: unused | drafted | posted
Expires: {YYYY-MM-DD or —}
Sources: {paths into the record, or *(from conversation, not the record)*}
Artifacts: {posts/material/assets/NNN-before.png, or *(none)*}

## What happened

## Why it's interesting to someone who wasn't here

## What I'd have to check before posting it
```

Index at `posts/material/README.md`: a table of item, type, captured, expires and
status, plus a one-line count of unused / drafted / posted.

### The type checklist

| Type | What it is | Composition it suits |
|---|---|---|
| Reframe | "I thought the problem was A, it was actually B" | Strong opener, any platform |
| Failed attempt | What didn't work, and why | Thread or long-form |
| Trade | Chose X, gave up Y | Single frame, quotable |
| Before → after | A flow, a layout, a structure | Carousel or split panorama |
| Surprise | Didn't behave as expected | Short text post |
| Technique | A move someone else could copy | Carousel |
| Number | Real, and from a source | Single frame |
| Mistake | What you got wrong and fixed | Text, no visual needed |
| Constraint | "Had to fit in X, which killed Y" | Pairs with a before/after |
| Dead end | No resolution, interesting problem shape | Text |
| `other` | None of the above | Decided at angle time |

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | Every item MUST carry a type from the checklist or the literal `other`. `untyped` is permitted only for interjection-mode items and MUST be resolved before the session ends. | Claude Code, Claude.ai |
| R2 | Interjection mode MUST NOT interview, confirm, or block. It writes and returns. | Claude Code |
| R3 | The skill MUST NOT invent a learning. Where a stretch of work produced no finding it MUST write `*(nothing conclusive)*`. | Claude Code, Claude.ai |
| R4 | Every item MUST carry a `Sources` line. Material drawn from conversation rather than the record MUST be labelled `*(from conversation, not the record)*`. | Claude Code, Claude.ai |
| R5 | Every item MUST carry a `What I'd have to check before posting it` section. An empty one MUST read `*(nothing)*` rather than being omitted. | Claude Code, Claude.ai |
| R6 | The skill MUST offer to snapshot a before-state that the work is about to overwrite, and MUST store it under `material/assets/` referenced from the item. | Claude Code |
| R7 | Item numbers MUST continue the index sequence and MUST NOT be reused, even where a file was deleted. | Claude Code |
| R8 | Items MUST be append-only in substance. Status and `Expires` are the only fields the skill may later change. | Claude Code |
| R9 | The skill MUST support retrieval — answering what is unused, what is stale, and whether the backlog holds anything on a subject — citing item numbers. | Claude Code |
| R10 | Range mode MUST state plainly that anything unrecorded in the window is already lost, rather than implying the export is complete. | Claude Code |
| R11 | The skill MUST NOT capture anything unreleased, client-named, credentialed or marked internal into the postable sections; such detail goes under a `Not postable yet` heading or is refused. | Claude Code, Claude.ai |
| R12 | Where `posts/material/` does not exist the skill MUST recommend `/post-setup` rather than creating the tier silently. | Claude Code |
| R13 | On Claude.ai the skill MUST emit items as downloadable artifacts, MUST state that retrieval against the existing backlog is unavailable, and MUST NOT guess the next item number. | Claude.ai |

## 7. Success criteria

- A session's material is captured in under three minutes, and interjection
  capture in under ten seconds.
- Three weeks later, a post is drafted from the backlog without the author
  reconstructing anything from memory.
- A before/after post is possible because the before was snapshotted, not
  described.
- "Have I got anything unposted about X" is answerable, with item numbers.

## 8. Risks

- **It doesn't get run.** The dominant risk, as with every capture tool.
  Mitigation: interjection mode, the protocol block's end-of-session offer, and
  handing off from other skills so it costs nothing.
- **Invented insight.** Asked what a session taught, a model supplies a plausible
  lesson. Mitigation: R3, and the scan checklist replacing the open question.
- **Backlog rot.** Items accumulate, none get used, the index becomes noise.
  Mitigation: `Expires`, status counts, and retrieval surfacing stale items.
- **Confidentiality leak.** The skill's whole job is moving detail toward an
  audience. Mitigation: R11, and `What I'd have to check` as a second net.
- **The material only exists in the user's head.** Git and the conversation may not
  contain the failed third attempt at all. This turns capture into an interview,
  which is acceptable, but it means the skill must ask rather than extract.

## 9. Open questions for v2

- Should captured items ever be promoted into the record — a `Mistake` that is
  really an ADR, a `Dead end` that belongs in the explorations tier?
- Can staleness be detected rather than declared, by noticing the code an item
  describes has since changed?
- Should snapshots be pruned once an item is posted, or kept indefinitely?
