# PRD — exploration-log

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

`design/explorations/` is the tier with no equivalent in any design tool, and the
one the whole design territory rests on: **a durable record of the directions that
were tried and killed, and why.**

`design-setup` creates the folder and its template. Nothing writes into it.

The failure it exists to prevent is specific and recurring. A designer runs four
passes at a layout, keeps the fourth, and deletes the other three. Six months later
somebody proposes direction two again. Nobody can say whether it was already tried,
or why it lost — so it gets tried again, at full cost. Meanwhile the surviving
design carries details that were load-bearing decisions in round two and are
invisible leftovers by round five.

Git solves this for code by accident: the rejected approach is in the history
whether you wanted it there or not. Design has no equivalent. The alternative is
deleted from the file and gone.

## 2. Goals

- Record a round of design iteration as an append-only entry: what it was testing,
  what changed, what was learned, and **kept or killed — and why**.
- Make "did we already try that?" answerable, months later, by someone who wasn't
  there.
- Cost less than a slack message, or it will not get written mid-project.
- Serve retrieval as a first-class mode, not just capture — the tier is worthless
  if it can only be written to.

## Non-goals (v1)

- **Evaluating the work.** It records what a round tested and what was concluded.
  It does not judge whether the direction was good — that is `design-critique`,
  and only against a written brief.
- **Deciding what to keep.** The kept/killed call is the user's. The skill records
  it and asks why; it never recommends.
- **Reading design tools.** No Figma connector in v1. Frame and version links are
  recorded as URLs the user supplies, unresolved.
- **Generating images or thumbnails.** The log is Markdown and links.
- **Scaffolding the tier.** `design-setup` owns the folder, its README and its
  template.

## 3. Primary user

A designer mid-project, at the end of a round — and the same designer, or a
successor, six months later asking whether something was already tried.

## 4. Core workflow

1. Detect surface; resolve the explorations path.
2. Read the log so far — round numbering, and what has already been tried.
3. **Branch by intent:** capture a round, or answer a retrieval question.
4. Capture: interview for what it tested, what changed, what was learned, and the
   kept/killed verdict with its reason.
5. Assemble and append. Never modify a prior round.
6. Confirm the path, and say what the entry now makes answerable.

## 5. Output template

```md
## Round {N} — {title}

**Date:** {YYYY-MM-DD}
**Testing:** {the question this round was trying to answer}
**Links:** {frame / version / prototype URLs, verbatim}

### What changed
{what was different from the previous round}

### What we learned
{the finding. `*(nothing conclusive)*` is a real and useful answer.}

### Verdict
**{Kept | Killed | Parked}** — {why}
```

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | Entries MUST be append-only; the skill MUST NOT edit or delete a prior round. | Claude Code |
| R2 | Every entry MUST carry a `Verdict` of Kept, Killed or Parked **with a reason**; where the reason was never stated it MUST render `*(reason not stated)*` rather than an invented one. | Claude Code, Claude.ai |
| R3 | The skill MUST support a retrieval mode that answers "have we tried X?" from the log, citing the round it found. | Claude Code |
| R4 | The skill MUST resolve the explorations path from a CLAUDE.md declared path, then an existing folder, then canon `design/explorations/`. | Claude Code |
| R5 | If the tier does not exist the skill MUST recommend `/design-setup add explorations` rather than creating it silently. | Claude Code |
| R6 | Round numbers MUST continue the existing sequence and MUST NOT be reused, even where a round file was deleted. | Claude Code |
| R7 | The skill MUST NOT invent what a round was testing or what was learned; unknown fields render `*(not stated)*`. | Claude Code, Claude.ai |
| R8 | Links MUST be recorded verbatim as supplied and MUST NOT be fabricated or guessed. | Claude Code, Claude.ai |
| R9 | On Claude.ai the skill MUST emit the entry as a downloadable artifact and MUST state that retrieval against prior rounds is unavailable. | Claude.ai |

## 7. Success criteria

- Logging a round takes under two minutes of conversation.
- "Did we already try a left rail?" is answered from the log, with a round number
  and a reason, by someone who wasn't there.
- Killed directions are still readable a year later.
- Re-running never rewrites a prior round.

## 8. Risks

- **It doesn't get written.** The dominant risk, and the reason the interview is
  four questions and permits `*(not stated)*` everywhere. A log that costs ten
  minutes per round is a log that stops after round two.
- **Invented learnings.** Asked what a round taught, a model will happily supply a
  plausible design insight. Mitigation: R7, and `*(nothing conclusive)*` offered
  explicitly as an answer — most rounds genuinely teach nothing crisp.
- **Verdict inflation.** Everything gets marked Kept because nothing was formally
  killed. Mitigation: Parked as a third option, so "we stopped working on it" has
  somewhere honest to go.
- **Log rot.** Links to frames that later move or get deleted. Mitigation: record
  the link *and* enough prose that the entry survives the link dying.

## 9. Open questions for v2

- One file per round, or one appended file per exploration thread? v1 uses one
  file per thread with appended `## Round N` sections, so a thread reads as a
  narrative.
- Should retrieval read `design/decisions/` too, since a killed direction often has
  an ADR explaining the fork?
- Should it prompt at the end of a work session rather than waiting to be called?
