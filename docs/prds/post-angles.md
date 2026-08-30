# PRD — post-angles

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Having material is not the same as knowing what to say about it. A backlog of ten
typed items and a changelog of thirty commits does not answer *what is worth a
post this week, and to whom.*

The failure this prevents is the one that stops people building in public: sitting
down with a full record, finding nothing that feels postable, and closing the tab.
The material was there. The angle was missing, and the angle is the part the
record cannot supply because it is a claim about a reader, not about the work.

The opposite failure matters as much. Asked for post ideas, a model will always
produce four, including in a week where nothing happened. **A tool that cannot say
"nothing here yet" is a tool for posting about nothing.**

## 2. Goals

- Read the backlog and the record over a window and propose **three or four
  angles**, each with its tension, its reader, and its sources.
- Make the sourcing visible, so a proposed angle can be checked rather than
  trusted.
- Be able to decline. "Nothing here is worth a post yet" is a first-class output.
- Hand the chosen angle to `post-generator` in a form it can draft from directly.

## Non-goals (v1)

- **Drafting copy.** An angle is a proposition, not a post.
- **Deciding composition.** How the argument breaks into frames is
  `post-generator`'s call.
- **Ranking or scoring.** It proposes; the user picks. No angle is presented as
  the best one.
- **Predicting performance.** No engagement estimates, no "this will do well". The
  skill has no evidence for that and inventing it would poison every other output.
- **Capturing new material.** That is `post-export`.

## 3. Primary user

Someone with a full backlog and no idea which thread to pull, once a week or once
a month.

## 4. Core workflow

1. Detect surface. Resolve `posts/material/`.
2. Establish the window — a date range, a project, or "since I last posted".
3. Read the backlog items in the window, then the record behind them: changelog,
   decisions, explorations, handoffs.
4. Read `posts/` for what has already been said, so nothing is proposed twice.
5. Group related items. An angle usually spans two or three, and the connection
   between them is often the angle itself.
6. Propose three or four, or decline.
7. On selection, write the chosen angle into a stub `post-generator` can open.

## 5. Output template

```md
# Angles — {window}

Read: {N} backlog items, {N} commits, {N} decisions. Already posted: {N}.

## Angle 1 — {the claim, in one line}

**Tension:** {what is at odds, and why a reader would care}
**For:** {who specifically. "developers" is not an answer}
**Built from:** {item numbers and record paths}
**Type:** {the dominant material type, which suggests the composition}
**Weakest point:** {the thing that would make this a bad post}

## Angle 2 — …

## Not proposed, and why

- {item or theme} — {already posted / too thin / not public / no reader}
```

When declining:

```md
# Angles — {window}

**Nothing here is worth a post yet.**

Read: {N} backlog items, {N} commits. What's there: {one honest line}.
What would change it: {the specific thing that would make a post possible}.
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | Every angle MUST cite the backlog items and record paths it is built from. | Claude Code, Claude.ai |
| R2 | The skill MUST NOT propose an angle it cannot source. Where an angle comes from the conversation it MUST be labelled `*(from conversation, not the record)*`. | Claude Code, Claude.ai |
| R3 | The skill MUST be able to return zero angles, and MUST do so rather than padding to three. | Claude Code, Claude.ai |
| R4 | Every angle MUST name a specific reader. A generic audience is not an acceptable value. | Claude Code, Claude.ai |
| R5 | Every angle MUST carry a `Weakest point`. | Claude Code, Claude.ai |
| R6 | The skill MUST read existing posts and MUST NOT propose an angle already covered; near-duplicates MUST be listed under `Not proposed`. | Claude Code |
| R7 | The skill MUST NOT rank, score, or recommend among the angles it proposes. | Claude Code, Claude.ai |
| R8 | The skill MUST NOT estimate reach, engagement or performance. | Claude Code, Claude.ai |
| R9 | The skill MUST exclude any item marked not-yet-postable, and MUST say that it did without restating the confidential detail. | Claude Code, Claude.ai |
| R10 | The skill MUST NOT modify backlog items other than to record that an angle drew on them. | Claude Code |
| R11 | Where the backlog is empty the skill MUST fall back to the record alone and say that it did, and where neither exists it MUST recommend `/post-export` rather than interviewing from nothing. | Claude Code |
| R12 | On Claude.ai the skill MUST work from the conversation, MUST state that it cannot check against prior posts, and MUST NOT claim a record it cannot read. | Claude.ai |

## 7. Success criteria

- A week with real work in it produces at least one angle the user would actually
  write.
- A week without produces a decline, and the user agrees with it.
- No angle is ever proposed twice across sessions.
- The chosen angle is enough for `post-generator` to start drafting with no further
  questions about subject matter.

## 8. Risks

- **It always finds four.** The single most likely failure, and it destroys trust
  in every other output the family produces. Mitigation: R3, and the decline
  template being a designed artifact rather than an error path.
- **It gets eaten by its neighbours.** A typed, indexed backlog already does much
  of the surfacing this skill was designed for, and in the by-hand test run the
  material went straight to draft without ever reaching an angles step. Mitigation:
  the grouping in step 5 — the connection *between* items is the part the backlog
  does not hold. If v1 shows that grouping adds nothing, this skill should be
  folded into `post-generator` rather than kept for symmetry.
- **Generic readers.** "Designers" and "developers" are not readers. Mitigation: R4,
  and pushing once for specificity.
- **Angle inflation.** Every item made to sound like a story. Mitigation: R5, and
  `Not proposed` giving thin material somewhere honest to go.

## 9. Open questions for v2

- Should it learn from which angles were chosen and which were ignored?
- Should a declined window be recorded, so the next run does not re-read it?
- Is "since I last posted" resolvable automatically from post status, or does the
  user always name the window?
