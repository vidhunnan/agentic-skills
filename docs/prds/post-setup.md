# PRD — post-setup

Status: Draft v0.1 · Owner: Vidhunnan Murugan · Repo: vidhunnan/agentic-skills

## 1. Problem

Four skills in the working-in-public family need somewhere to write, and two of
them need a profile that does not exist until somebody sits down and defines it.
Without a voice file, a drafting skill falls back on the model's defaults, which
is the exact register the family exists to avoid. Without a card direction, a
frame generator invents a look nobody chose.

There is a second problem, and it is the one that bites. **A voice profile is
personal data.** Most repos a skill gets run in are public or shared, and a file
describing how someone writes should not be published by accident.

## 2. Goals

- Scaffold `posts/` — the derived tier — without moving, renaming or overwriting
  anything that already exists.
- Capture the voice by **interview plus real samples**, because a described voice
  and a demonstrated one are different things.
- Pre-fill the card direction from an existing design system where one exists, and
  confirm it rather than assume it.
- Make the privacy default safe: personal profiles gitignored, committing offered.
- Register a protocol block so a new session knows the tier exists and what tense
  it is.

## Non-goals (v1)

- **Drafting anything.** This skill writes no copy and renders no frame.
- **Inventing a voice.** If the user supplies neither samples nor answers, the
  positive half of `VOICE.md` stays empty and says so. A plausible voice nobody
  chose is worse than an admitted gap.
- **Owning the record tiers.** `repo-setup` and `design-setup` own `docs/` and
  `design/`. This skill reports what they built and never creates them.
- **Publishing, scheduling, or contacting any platform.**

## 3. Primary user

Someone about to use the family for the first time in a project, and the same
person in a second project six months later who wants their voice to carry over.

## 4. Core workflow

1. Detect surface. Confirm the repo.
2. Survey read-only: an existing `posts/`, `content/` or `social/`; `design/system/`
   or a `design-language` output; CLAUDE.md protocol blocks; which record tiers
   exist, so the report can say what the drafting skills will have to work from.
3. Interview for voice — the rules, plus three to five real posts pasted in.
4. Interview for card direction, pre-filled from the design system where one exists.
5. Write the gaps. Never touch what is already there.
6. Set the privacy default and confirm it.
7. Register the protocol block.
8. Report the paths, and say plainly what the drafting skills can and cannot source.

## 5. Output template

```
posts/
  README.md              tense: derived. It cites the record, never a source
  VOICE.md               captured profile — gitignored by default
  VOICE.example.md       the shape, plus the banned-moves list — committed
  CARD.md                card direction — gitignored by default
  CARD.example.md        committed
  material/README.md     the backlog index
  material/assets/       snapshots
  cards/
```

`VOICE.md` carries three sections: **Carries over** (traits observed in the
samples, each citing how many samples showed it), **Stripped** (traits observed
and explicitly not wanted, recording the disagreement rather than hiding it), and
**Banned moves** (hard-coded, identical for every installer).

## 6. Functional requirements

| ID | Requirement | Surface |
|---|---|---|
| R1 | The skill MUST be additive only. It MUST NOT move, rename, delete or overwrite any existing file. | Claude Code |
| R2 | The skill MUST adopt an existing folder name where one is found, and use canon only to fill gaps. | Claude Code |
| R3 | The skill MUST NOT write a positive voice trait that is not evidenced by a supplied sample or stated by the user. Absent both, the section MUST render as uncaptured. | Claude Code, Claude.ai |
| R4 | Each trait under **Carries over** MUST cite its evidence (how many of how many samples). | Claude Code, Claude.ai |
| R5 | Where a user instruction contradicts the samples, the instruction MUST win, and the contradiction MUST be recorded in **Stripped** rather than silently resolved. | Claude Code, Claude.ai |
| R6 | `VOICE.md` and `CARD.md` MUST be gitignored by default, and the skill MUST offer committing as an explicit choice. | Claude Code |
| R7 | The skill MUST NOT ship, copy, or seed any captured voice from another project or user. | Claude Code, Claude.ai |
| R8 | The card direction MUST be pre-filled from `design/system/` or a `design-language` output where one exists, and MUST be confirmed before use. | Claude Code |
| R9 | The skill MUST state which record tiers exist, and MUST warn when none do, since the drafting skills will then run in conversation-sourced mode. | Claude Code |
| R10 | The protocol block MUST be delimited by the literal `BEGIN skill:post-setup` / `END` markers, matched on the markers and never the title, inserted under `## Skill protocols`, updated in place when changed, and never duplicated. | Claude Code |
| R11 | Where CLAUDE.md is absent the skill MUST offer a full `/init`-style generation, confirmation-gated, rather than stubbing one. | Claude Code |
| R12 | On Claude.ai the skill MUST run the interviews conversationally and emit the scaffold as downloadable artifacts plus a block to paste, and MUST skip every write. | Claude.ai |
| R13 | `check` MUST perform the survey and a drift report with zero writes. | Claude Code |

## 7. Success criteria

- A fresh project is scaffolded in under ten minutes of conversation, and the
  first draft the family produces reads like the user rather than like a model.
- Running it twice changes nothing the second time.
- A user who skips the samples gets an honest empty file, not a generic one.
- No captured voice is ever committed without the user having said yes.

## 8. Risks

- **The voice interview is skipped.** The most likely failure, and the one that
  makes every downstream draft generic. Mitigation: the interview is short, the
  samples do most of the work, and a skipped capture is stated loudly in the file
  and repeated by `post-generator` on every draft.
- **Samples in the wrong genre.** Announcement posts captured as a build-log voice
  produce announcement-register build-logs. Mitigation: R4's evidence citations,
  and a **Register** section that must name the genre of the samples and mark any
  register with no samples as uncaptured.
- **A committed voice in a public repo.** Mitigation: R6.
- **The scaffold outliving its accuracy.** A `posts/README.md` that claims a tense
  the project stopped honouring. Mitigation: `check`.

## 9. Open questions for v2

- Should the voice live outside the project (`~/.claude/`) so it is captured once
  and reused everywhere, at the cost of breaking the output-lives-with-the-project
  pattern?
- Should `check` be able to detect voice drift — that recent posts no longer match
  the captured profile?
- Should the samples themselves be stored, so a later re-capture can rerun against
  the same evidence?
