---
name: design-critique
description: Reviews a built interface against its stated design intent — naming how the thing reads before proposing any fix, ranking findings by severity, and treating removal as a first-class verdict rather than an afterthought. Refuses to critique without a written intent, because critique against nothing is just taste with extra steps. Use when the user says "critique this", "review this design", "does this match the direction", "what's wrong with this screen", "design review", or runs /design-critique. Claude Code reads files, screenshots and running URLs; on Claude.ai paste or attach them.
when_to_use: 'Also fires on: "be honest about this UI", "what''s off about this", "review this against the brief", "tear this apart". For accessibility and Web Interface Guidelines compliance use web-design-guidelines; for aesthetic direction with no stated intent use frontend-design. For defining the intent in the first place use design-language or design-brief; for recording what a review changed use exploration-log, and for the fork it triggers use design-decisions.'
argument-hint: "[check|<path|url>]"
allowed-tools: Read, Bash, Glob, Grep, Write, Edit, AskUserQuestion
disable-model-invocation: false
---

# design-critique

Judges a built thing against what you said you wanted. One question, asked
seriously: **does this match the stated intent, and where it doesn't, how does it
actually read?**

Design feedback from a model fails in two directions and this skill is shaped
against both. It flatters — every finding hedged into a suggestion, every section
opening with what's working — or it produces a checklist of generic improvements
that would apply equally to any interface ever built. Both are useless. What's
useful is the thing a good design critic does: name how the thing *reads* to
someone encountering it, then say what to do about it.

The hard gate in Step 1 is this skill's expression of
[ADR 0021](../../docs/decisions/0021-design-skills-never-make-the-design-decision.md),
which closes by naming this skill directly: it *"may only review against a written
brief, because reviewing against nothing is exactly the generation this decision
forbids."* Critique is a **check**, and a check needs something to check against.

Three rules govern this skill:

- **Diagnosis before prescription.** Every finding must first name how the thing
  reads — in the form *"reads as X rather than Y"* — before any fix is proposed.
  **No diagnosis, no finding.** This is not a stylistic preference: a fix without a
  diagnosis is a guess, and it's how critique turns into an arbitrary list of
  changes. *Five chips floating in an empty card "read as browser tabs rather than
  an iteration canvas."* That sentence is the entire value of a critique; the fix
  follows from it in a way it never does from "consider adjusting the spacing".
- **Delete is a verdict, and it's first in the list.** Most model critique only ever
  adds — another affordance, another label, another explanatory line. In practice
  the most common good design move is removal: the redundant CTA, the feature card
  promising something that doesn't ship yet, the caption explaining what the UI
  already shows, the greyed-out button that's never enabled.
- **Against intent, not against taste.** With no written intent this becomes your
  aesthetic preferences delivered with authority. That's why the gate in Step 1 is
  hard rather than advisory.

## Instructions

### Step 0 — Detect your surface

Using **Bash availability**:

- **Claude Code** — Bash works and there's a real filesystem. Read the code, open
  screenshots, curl a running URL. Full flow.
- **Claude.ai** — no filesystem. Work from what the user pastes or attaches: a
  screenshot, a component, a URL's markup. Same method, same report, delivered
  inline or as an artifact. **Say plainly that the intent search of Step 1 can only
  cover what was pasted — do not assume an absent doc means none exists.** Don't
  error.

**Argument modes:**

- *(no argument, or a path/url)* — the default: the full flow, Steps 1–9.
- `check` — Step 1 only, plus a report, with **zero writes and no review.** Answers
  the one question that decides whether a critique is even possible: *is there a
  stated intent to review against, and what does it say?* Run it before asking for a
  critique, so the gate doesn't surprise you.

### Step 1 — Find the stated intent (hard gate)

Look, in order, for:

1. A **`design-language` doc** for this surface — `design/system/language-*.md` or
   whatever `skill:design-setup`'s routing table declares for System. A declared
   path beats a canonical one
   ([ADR 0010](../../docs/decisions/0010-a-declared-path-beats-an-existing-folder-beats-canon.md)).
2. A **`design-brief`** — its constraints and anti-goals are usable intent.
3. **Design tokens with rules attached** — a `globals.css` or `tokens.css` whose
   comments state the system ("three text levels", "comparison-only hues").
4. **Intent stated by the user in this conversation** — acceptable, but read it back
   and get it confirmed before using it as the yardstick.

**If none of these exist, do not critique.** Say plainly that reviewing against
nothing produces taste dressed as judgement, and offer `/design-language` — it is a
two-round interview and it makes every future review possible. If the user insists,
you may do **one** thing: a **constraint-free read**, clearly labelled, that reports
only how the interface reads and asks whether that's the intent. No verdicts, no
severity, no fixes. That's an observation, not a critique, and it must say so.

**In `check` mode, stop here** and report: which of the four sources were found and
where, the hard constraints the intent states (quoted), anything marked
`*(not stated)*` that would leave a review unanchored, and one line on whether a
real critique is possible. **Write nothing. Review nothing.**

### Step 2 — Take in the artefact

Accept any of these, and prefer the most rendered one available:

- **A screenshot or a running URL.** Best input. Design problems are perceptual, and
  most of them are invisible in source. If the project runs locally, ask for the URL
  or the screenshot rather than reading components and imagining the result.
- **Component or page source** — fine, and necessary for spacing-scale and token
  drift, but say in the report that it was reviewed from code if you never saw it
  rendered. That caveat is load-bearing.
- **A design file export.**

Ask which **states** matter before reviewing: empty, loading, error, long content,
narrow viewport. Missing states are one of the highest-value findings and they are
invisible in a single happy-path screenshot.

### Step 3 — Diagnose before you prescribe

For each problem, write the diagnosis first, and make it perceptual:

> **Reads as** {what a first-time viewer would take it for} **rather than** {what it
> is meant to be}.

Good diagnoses are concrete and slightly uncomfortable: *"reads as a jumble"*,
*"reads as browser tabs rather than an iteration canvas"*, *"reads as three
unrelated controls that happen to share a row"*, *"the chevrons are ambiguous about
direction"*. Bad ones are categories: "hierarchy could be improved", "spacing feels
inconsistent". If you cannot write the sentence, you do not yet have a finding —
keep looking or drop it.

Then check the stated rules **literally**. Open the language doc's Hard constraints
table and test each row against what's in front of you. A rule that says "exactly
one accent colour" is a grep, not an opinion. Constraint violations are the most
defensible findings in the report; lead with them.

### Step 4 — Assign a verdict and a severity

**Verdicts, in this order:**

| Verdict | When |
|---|---|
| **Delete** | It doesn't earn its space. Ask this first, every time. |
| **Reduce** | The idea is right, the volume is wrong. |
| **Restructure** | The parts are right, the relationships aren't. |
| **Refine** | Right in kind, wrong in degree. Spacing, weight, timing. |
| **Leave alone** | Named explicitly when it's the thing the user expected you to flag. |

**Severity:** 🔴 breaks the stated intent or the interface · 🟡 works but reads
wrong · 🟢 polish.

Order the report by severity, not by where things appear on the page.

Cap the report at what the user can act on — roughly **seven findings**. If you have
twenty, you're listing rather than critiquing; pick the ones that change the thing,
and say how many you set aside.

### Step 5 — Say what must survive

One short section, before the findings. Not praise — **protection.** Name the two or
three things a fix must not destroy, because the most common way a critique makes an
interface worse is by fixing a real problem and taking out what was working with it.
Keep it to a line each. If nothing qualifies, say so; don't pad it.

### Step 6 — Assemble

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

**Every finding cites the intent it violates.** A finding whose **Against:** line is
empty is a preference, not a finding — move it to Set aside or drop it.

**On Claude Code, get the date from `date +%F`. Never guess it.**

### Step 7A — Claude Code: deliver

Print the report **inline by default** — critique is read in the moment, and a file
nobody opens is worse than a message. Then offer, **once**, to persist it:

```
Persist this critique?

  1. Write to {explorations}/{slug}/critique-{date}.md   next to the round it reviews
  2. Append to an /exploration-log round
  3. No — inline only
```

**Never write without the offer being accepted.** Declining is a legitimate outcome,
not a failure. If option 1 is taken, resolve the explorations path exactly as
`design-explore` Step 1 does, and never create the tier silently.

### Step 7B — Claude.ai: deliver

Same report inline. Offer it as a downloadable Markdown artifact if it's long.

### Step 8 — Record overrides as overrides

When the user overrules a finding — keeps the thing, rejects the diagnosis, decides
the rule was wrong — **say so in the record rather than quietly deleting the
finding.** *"(Naming stays 'Early Access' by request.)"* An overruled finding that
disappears makes the next review re-litigate it from scratch.

If the override is that a **stated rule is wrong**, that's not an override — it's a
change to the intent. Point at `/design-language` to revise the doc, or
`/design-decisions` if it's a genuine fork.

### Step 9 — Stay in scope

Fix a collision by scoping, never by broadening. This skill answers one question:
**does the built thing match what you said you wanted?**

- **Accessibility, contrast ratios, focus order, Web Interface Guidelines** — hand
  off to `web-design-guidelines`. Name it and move on; do not include a partial
  accessibility pass, which reads as coverage and isn't.
- **Aesthetic direction where none is stated** — hand off to `frontend-design`.
- **Code quality, performance, component structure** — out of scope entirely.

### Step 10 — Edge cases

- **No intent doc and the user insists** — the constraint-free read of Step 1, and
  only that. Labelled as an observation, no verdicts.
- **The intent doc is stale** — the built thing departs from it consistently and
  deliberately. That's not twelve findings; it's one, and it's *"the direction has
  moved and the doc hasn't"*. Say it once and point at `/design-language`'s revision
  flow rather than reporting the same violation twelve times.
- **Only source, no rendered view** — review it, and say in the header it was
  reviewed from code. Don't assert how something reads if you never saw it render;
  phrase those findings as questions instead.
- **A screenshot mid-animation or mid-load** — say so and ask for a settled one
  rather than critiquing a transient state.
- **Everything genuinely matches the intent** — say that, in one line, and stop.
  A manufactured finding to justify the run is worse than a short report. Offer the
  next useful thing: which states haven't been reviewed.
- **The user wants the fixes applied** — this skill critiques; it doesn't rebuild.
  Report first, then let them choose what to act on. Applying every finding
  unreviewed is how a critique becomes an unrequested redesign.
- **Something is wrong but you can't diagnose why** — say exactly that, in one line,
  under Set aside. An honest "something about this row reads off and I can't name
  it" is a real contribution; a fabricated diagnosis is not.
- **Not a git repo, or no repo at all** — `git rev-parse --show-toplevel` fails. The
  intent search has nowhere to look. Ask the user to paste the intent, and if there
  is none, the Step 1 gate applies unchanged.
- **Reviewing a `design-explore` round** — the directions are candidates, not the
  record ([ADR 0022](../../docs/decisions/0022-generation-is-allowed-only-into-explorations.md)).
  Review them against the same language doc they were generated from, and do not
  declare a winner: the verdict belongs to `/exploration-log`.
- **Secrets in the artefact** — never carry credentials, real customer data, or
  unreleased naming into the report. Replace with `[redacted]`.
