# PRD — design-critique

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Design feedback from a model fails in two directions, and both are worse than
silence.

It **flatters**: every finding hedged into a suggestion, every section opening with
what's working, nothing an author would actually change. Or it produces a
**checklist of generic improvements** — "improve hierarchy", "consider consistent
spacing" — that would apply equally to any interface ever built, and therefore says
nothing about this one.

What a good design critic does instead is name how the thing *reads* to someone
encountering it for the first time, and only then say what to do about it. *"Five
chips floating in an empty card read as browser tabs rather than an iteration
canvas"* is a sentence a fix follows from. "Consider adjusting the spacing" is not.

There is a second, quieter failure. The most common good design move in practice is
**removal** — the redundant CTA, the caption explaining what the UI already shows,
the greyed-out button that is never enabled. A model asked to critique almost always
adds.

Underneath both sits the gate.
[ADR 0021](../decisions/0021-design-skills-never-make-the-design-decision.md) names
this skill directly: it *"may only review against a written brief, because reviewing
against nothing is exactly the generation this decision forbids."* Critique is a
**check**, and a check with nothing to check against is taste delivered with
authority.

## 2. Goals

- Review against a **stated** intent, never against taste.
- Force a perceptual diagnosis before any prescription.
- Make **Delete** a first-class verdict, listed first.
- Rank by severity and cap the report at what can be acted on.
- Protect what works, so a fix doesn't take it out.
- Stay narrowly scoped against two already-installed skills.
- Make the gate cheap to check before it bites, via `check` mode.

## Non-goals (v1)

- **Critiquing without an intent doc.** Inherited from ADR 0021: reviewing against
  nothing is the generation that decision forbids. The only fallback is a labelled
  constraint-free read with no verdicts.
- **Accessibility and Web Interface Guidelines.** Handed to `web-design-guidelines`.
  A partial accessibility pass reads as coverage and isn't.
- **Supplying aesthetic direction.** Handed to `frontend-design`.
- **Applying the fixes.** It reports; the user chooses. Applying every finding
  unreviewed is an unrequested redesign.
- **Code quality, performance, component structure.**
- **Recording the outcome.** `exploration-log` and `design-decisions` own that. When
  reviewing a `design-explore` round, this skill does not declare a winner.

## 3. Primary user

Someone who has built a surface — often by dogfooding it — and wants to know
honestly whether it matches what they set out to make.

## 4. Core workflow

1. Detect surface; find the stated intent, and refuse if there is none. *(`check`
   stops here and reports.)*
2. Take in the artefact, preferring a rendered view; ask which states matter.
3. Diagnose perceptually, then test the hard constraints literally.
4. Assign verdict and severity; cap at ~7 findings.
5. Name what must survive.
6. Print inline; offer once to persist.

## 5. Output template

```md
# Design critique — {target}

Reviewed against: {path to the intent doc} · Date: {YYYY-MM-DD}
Reviewed from: {screenshot · running app at {url} · source only}

## What must survive
- {The thing a fix must not destroy.}

## Findings

### 🔴 {short title}
**Reads as:** {X rather than Y.}
**Against:** {the stated rule or line it violates, quoted from the intent doc.}
**Verdict:** {Delete · Reduce · Restructure · Refine · Leave alone}
**Fix:** {One or two sentences. Concrete.}

### 🟡 {…}

## Set aside
{Anything real but below the line, one line each — so it isn't lost.}

## Not covered here
- Accessibility and Web Interface Guidelines → `web-design-guidelines`
- Aesthetic direction where none is stated → `frontend-design`

## Overrides
- **{date}** — {finding} overruled by request. {The reason, if given.}
```

## 6. Functional requirements

| Surface | Trigger | Sources | Output |
|---|---|---|---|
| Claude Code | `/design-critique [check\|<path\|url>]`, or natural phrasing ("critique this", "review this design", "does this match the direction") | the `design-language` doc, else a `design-brief`, else tokens with rules in comments, else intent stated and confirmed in the conversation; plus the artefact — a screenshot, a running URL, or source | the report **inline by default**; on an accepted offer, `{explorations}/{slug}/critique-{date}.md` or an appended `/exploration-log` round |
| Claude.ai | explicit mention or description-match | whatever the user pastes or attaches | the same report inline, or a downloadable artifact if long. **The intent search covers only what was pasted — an absent doc does not mean none exists, and the skill says so rather than assuming.** |

**Modes:** *(none, or a path/url)* full flow · `check` Step 1 plus a report, zero
writes and no review.

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST refuse to critique with no stated intent, and MUST offer `/design-language`. | Claude Code, Claude.ai |
| R2 | Where the user insists, the skill MUST produce only a labelled constraint-free read with no verdicts, severities or fixes. | Claude Code, Claude.ai |
| R3 | Every finding MUST carry a "reads as X rather than Y" diagnosis before its fix. A finding without one MUST be dropped. | Claude Code, Claude.ai |
| R4 | The skill MUST test each row of the intent doc's Hard constraints table literally and lead with violations. | Claude Code |
| R5 | Verdicts MUST be drawn from Delete · Reduce · Restructure · Refine · Leave alone, with Delete considered first. | Claude Code, Claude.ai |
| R6 | The skill MUST rank findings by severity and cap at roughly seven, stating how many were set aside. | Claude Code, Claude.ai |
| R7 | The skill MUST state in the header whether it reviewed a rendered view or source only. | Claude Code, Claude.ai |
| R8 | The skill MUST ask which states matter (empty, loading, error, long content, narrow) before reviewing. | Claude Code, Claude.ai |
| R9 | The skill MUST include a "What must survive" section, or say explicitly that nothing qualifies. | Claude Code, Claude.ai |
| R10 | The skill MUST record an overruled finding as an override rather than deleting it. | Claude Code, Claude.ai |
| R11 | The skill MUST hand accessibility to `web-design-guidelines` and undirected aesthetics to `frontend-design`, and MUST NOT include partial coverage of either. | Claude Code, Claude.ai |
| R12 | The skill MUST print inline by default and MUST NOT write a file without an accepted offer. | Claude Code |
| R13 | Where everything matches the intent, the skill MUST say so and stop rather than manufacture a finding. | Claude Code, Claude.ai |
| R14 | Every finding MUST cite the intent it violates in its `Against:` line; a finding with an empty one MUST be moved to Set aside or dropped. | Claude Code, Claude.ai |
| R15 | In `check` mode the skill MUST report which intent sources were found, the constraints they state, and whether a real critique is possible — with **zero writes and no review performed**. | Claude Code |

## 7. Success criteria

- Every finding's diagnosis sentence is specific enough that the fix follows from it.
- At least some reviews return Delete verdicts — if none ever do, the bias the skill
  was built against has survived.
- The user acts on findings rather than reading and discarding them.
- No review contains accessibility findings.
- Running `check` on a project with no intent doc explains the gate in one screen,
  rather than the user discovering it mid-critique.

## 8. Risks

- **Diagnosis theatre** — a fabricated "reads as" sentence wrapping a generic
  suggestion. Mitigated by R3's drop rule and the "can't diagnose it" edge case.
- **Flattery creep** — "What must survive" turning into a praise section. Mitigated
  by framing it as protection and capping it at a line each.
- **Scope leak into `web-design-guidelines`.** Mitigated by R11 and by the report's
  explicit "Not covered here" section.
- **Reviewing from source and asserting how something reads.** Mitigated by R7 and
  by phrasing source-only findings as questions.
- **The gate makes the skill unusable** where no intent doc exists — which is most
  projects, and the most likely reason this skill goes unused. Mitigated by R2, by
  the offer being a single line once, and by `check` surfacing the gate before the
  user has invested in a review. Not eliminated: the concept doc's open question —
  *is `design-critique` reviewable by a model at all?* — remains open, and the honest
  answer is that only the constraint-checking half is verifiable.

## 9. Open questions for v2

- Should it drive a browser to capture the states it asks about, rather than
  requesting screenshots?
- Should repeated findings across reviews escalate in severity?
- Should overrides accumulate in a per-surface file rather than per-report?
- Should the perceptual half be split out, so what ships is only the mechanically
  checkable constraint pass — the scoping-down the concept doc anticipated?
