# 0021. Design skills record and check; they never make the design decision

- **Status:** **Accepted**
- **Date:** 2026-08-16

## Context

Opening the library to design work raised a question the repo skills never had to
answer. `changelog-tracker` reads git. `decisions-logger` mines a repo. Neither is
ever tempted to *do the work* — nobody expects a changelog tool to write code.

Design is different. A model asked for a design brief will produce excellent-sounding
jobs-to-be-done and success metrics for a problem it knows nothing about. Asked why
a layout was chosen, it will produce a fluent paragraph about hierarchy and balance.
Asked to critique, it will generate confident craft feedback with no reference to
anything the project actually wanted. All of it reads exactly like the real thing.

[0014](./0014-never-invent-a-rationale.md) already established that an invented
rationale is worse than an honest gap. But that decision was made about code, where
there is a backstop: an invented reason can eventually be checked against a diff, a
commit, a config file. **In design there is no diff.** A fabricated reason for a
spacing choice is indistinguishable from a real one to every future reader, forever.
The tier that was supposed to answer "why is it like this?" would answer it wrongly
and confidently.

## Decision

Every skill in the design territory is restricted to four verbs: **interview,
record, structure, check.** None of them makes a design decision, generates a
visual, proposes a direction, or supplies a success criterion, a user need, or a
rationale the user has not stated.

The rule is enforced in each skill rather than left as a principle: `design-brief`
marks unanswered sections `*(not stated)*` and offers "I don't know yet" on every
question; `design-decisions` requires the Fork Test, offers "I don't remember" on
every question, and inherits `decisions-logger`'s source firewall so a rule-stating
document can surface a candidate without being allowed to justify it. Both carry it
in their frontmatter description and their edge cases.

## Alternatives considered

- **Let the skills propose, clearly labelled as a proposal.** The obvious middle
  ground, and genuinely tempting — a suggested success metric is a useful prompt,
  and the label warns the reader. It lost because the label does not survive. The
  proposal gets accepted with a "yeah, that", the marker is dropped on the next
  edit, and six months later it is indistinguishable from something the team
  decided. There is no mechanism that keeps a caveat attached to a sentence.
- **Allow generation for briefs but not for decisions.** Briefs are forward-looking
  and revisable, so the stakes look lower. It lost because the brief is precisely
  what every later skill cites as *stated intent* — a fabricated success criterion
  becomes the thing the work is judged against, which is the highest-leverage place
  to be wrong, not the lowest.
- **Trust the model and rely on the user to correct it.** It lost on asymmetry: the
  user can only correct what they notice, and fluent plausible design rationale is
  specifically the kind of thing that does not read as wrong.

## Consequences

- The skills are less immediately impressive. `design-brief` can return a document
  with several `*(not stated)*` sections, which looks like it did less work than a
  tool that filled them in. That is the intended trade.
- They are correspondingly more trustworthy: anything in a design record is
  something a human said, and gaps are visible as gaps.
- **What this costs:** it puts the effort back on the user at the moment they least
  want it — before a deadline, in the middle of the work. That is the main reason
  these skills might go unused, and it is a real risk rather than a hypothetical
  one. Both skills mitigate it by capping the interview, never by relaxing the rule.
- It sets the boundary for the seventeen unbuilt design skills. `design-critique`
  in particular inherits it: it may only review against a written brief, because
  reviewing against nothing is exactly the generation this decision forbids.

## Evidence

- **Primary:** `skills/design-decisions/SKILL.md` — the governing rule, stated at
  the top of the skill.
  > "In code, an invented rationale can eventually be checked against a diff. **A
  > plausible reason for a layout choice is indistinguishable from a real one to
  > every future reader, forever.** There is nothing to check it against."
- **Corroborating:** `skills/design-brief/SKILL.md` §Step 4, the stated/not-stated
  classification · `docs/concepts/design-context-stack.md` §The line these skills do
  not cross · [0014](./0014-never-invent-a-rationale.md), which this extends from
  code to design.
- **Rationale:** stated by the owner during planning on 2026-08-16.

## Follow-up

*Append-only. Everything above this heading is **frozen**. Entries below are dated
and additive — evidence that the world moved, not a revision of what was decided.*

*(none yet)*

---

_Append-only. If this turns out to be wrong, **do not edit it** — write a new
decision that supersedes it and links back._
