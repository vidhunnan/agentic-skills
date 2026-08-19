// Single source of truth for the site's content.
// Sourced from README.md and each skills/<name>/SKILL.md — keep in sync with the repo.

export const REPO = "vidhunnan/agentic-skills";
export const REPO_URL = `https://github.com/${REPO}`;
export const MARKETPLACE_CMD = `/plugin marketplace add ${REPO}`;

export type Surface = "Code" | "Chat";

export interface Skill {
  name: string;
  /** one-line description, from the skill's SKILL.md / README */
  desc: string;
  surfaces: Surface[];
  install: string;
  /** short label for the "what it answers" column */
  answers?: string;
}

export interface SkillGroup {
  title: string;
  /** one line on why the group exists */
  note: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Set up the repo",
    note: "Start here. It builds the folders the rest of them fill.",
    skills: [
      {
        name: "repo-setup",
        desc: "Scaffolds your context stack — concepts, PRDs, decisions, handoffs, changelog. Surveys what you already have, adopts your existing folder names, and never moves or overwrites a thing.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install repo-setup",
        answers: "Where does this doc go?",
      },
    ],
  },
  {
    title: "Keep the record",
    note: "The three questions a teammate with amnesia will ask.",
    skills: [
      {
        name: "changelog-tracker",
        desc: "What actually shipped? — documents every substantive commit into a per-commit file plus a rolling index. Every fact comes from git.",
        surfaces: ["Code"],
        install: "/plugin install changelog-tracker",
        answers: "What actually shipped?",
      },
      {
        name: "decisions-logger",
        desc: "Why did we choose that? — mines the project for decisions that were really made and writes each as an ADR with its evidence. Where the reasoning was never written down, it asks rather than inventing one.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install decisions-logger",
        answers: "Why did we choose that?",
      },
      {
        name: "handoff-generator",
        desc: "Where did we leave off? — an interactive, bidirectional Chat↔Code project handoff: progress, timeline, features, decisions, changelog delta, open questions, next actions, and a near-verbatim session log. Interviews you first; on Claude Code it verifies against the repo.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install handoff-generator",
        answers: "Where did we leave off?",
      },
    ],
  },
  {
    title: "Working conventions",
    note: "Two small habits, made to stick across sessions.",
    skills: [
      {
        name: "branch-naming",
        desc: "Suggests and creates a branch name that follows your project's convention — read from CLAUDE.md, or inferred from your existing branches. Always confirms before creating.",
        surfaces: ["Code"],
        install: "/plugin install branch-naming",
        answers: "What do I call this branch?",
      },
      {
        name: "model-strategy",
        desc: "Builds docs/MODEL-STRATEGY.md — which Claude model for which kind of work, tailored by interview, with a mandatory review rule.",
        surfaces: ["Code"],
        install: "/plugin install model-strategy",
        answers: "Which model for this work?",
      },
    ],
  },
  {
    title: "Design work",
    note: "Code has git log. Design has nothing — a Figma file shows the winner and never what was tried, what was given up, or why. These write the record design doesn't leave behind.",
    skills: [
      {
        name: "design-setup",
        desc: "Scaffolds the design context stack — briefs, research, explorations, decisions, specs, system. Same rules as repo-setup: adopts your existing folder names, never moves a thing. The explorations tier is the one no design tool has: a durable record of the directions you killed, and why.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install design-setup",
        answers: "Where does this design doc go?",
      },
      {
        name: "design-brief",
        desc: "What are we actually solving? — interviews you into a brief: problem, who feels it, jobs to be done, constraints, success criteria, non-goals. The stated intent everything downstream cites. Marks what you couldn't answer instead of inventing it.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install design-brief",
        answers: "What are we actually solving?",
      },
      {
        name: "design-language",
        desc: "What should it look like? — interviews you into a written visual direction: the surface and whether it wears the brand, the references and the one you're explicitly not pulling from, constraints stated as rules that can be broken. Asks what you want rather than proposing a look for you.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install design-language",
        answers: "What should it look like?",
      },
      {
        name: "design-explore",
        desc: "What are the options? — generates three directions that differ on named structural axes, not on hue, each with its thesis, its bet and its risk. Refuses to generate against nothing, and hands the verdict to the skills that record it.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install design-explore",
        answers: "What are the options?",
      },
      {
        name: "exploration-log",
        desc: "Did we already try that? — logs a round of iteration: what it tested, what changed, what you learned, and whether it was kept, killed or parked. Append-only, so the directions you abandoned are still readable a year later. Also answers the question back.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install exploration-log",
        answers: "Did we already try that?",
      },
      {
        name: "design-critique",
        desc: "Does this match what we said? — reviews built work against its stated intent, naming how the thing reads before proposing any fix. Delete is a first-class verdict, listed first. Refuses to critique without a written intent, because that's just taste with extra steps.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install design-critique",
        answers: "Does this match what we said?",
      },
      {
        name: "design-decisions",
        desc: "Why is it like this? — records a design fork as an append-only ADR, including what you gave up and what would make you revisit. Where nobody remembers the reason, it writes (reason not stated) — in design there's no diff to catch a plausible fiction.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install design-decisions",
        answers: "Why is it like this?",
      },
    ],
  },
  {
    title: "Build the skills themselves",
    note: "The library, building itself.",
    skills: [
      {
        name: "skill-scaffold",
        desc: "Wires a new skill into this library — all seven touchpoints, from the PRD to this website's own entry. Interviews for the trigger phrases rather than inventing them, because a description that matches nothing fails silently. For authoring skill content in general, use Anthropic's skill-creator instead.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install skill-scaffold",
        answers: "How do I add another one?",
      },
    ],
  },
];

export const ALL_INSTALL_LINES = SKILL_GROUPS.flatMap((g) =>
  g.skills.map((s) => s.install),
);

/**
 * Derived, never hardcoded. The site said "six skills" in six places long after
 * there were eleven, because ADR 0016 made the skill *data* single-source and
 * left the copy *about* it as string literals. Anything that states a count
 * reads it from here.
 */
export const TOTAL_SKILLS = SKILL_GROUPS.reduce(
  (n, g) => n + g.skills.length,
  0,
);

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

/** Spelled-out count for prose; falls back to digits past twenty. */
export function spellCount(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/** e.g. "eleven" — for sentences. Use TOTAL_SKILLS where a numeral reads better. */
export const TOTAL_SKILLS_WORD = spellCount(TOTAL_SKILLS);

/**
 * The hero specimens — verbatim fragments of real files in this repo.
 *
 * Not illustrative copy. Every line below is quoted from a file committed
 * here, by the skill named in `by`. Together they are the fastest way to show
 * what these skills produce *and* that they decline to invent — which is the
 * one behaviour that distinguishes them.
 *
 * THE RULE: quoted exactly, never paraphrased. Trimming at a sentence or
 * markdown soft-wrap boundary is typesetting and is allowed; dropping words
 * from the middle is not. If a source is superseded or rewritten, re-quote it
 * or drop that specimen — a specimen that no longer matches its file is worse
 * than no specimen, because the whole page rests on this being checkable.
 * Every line here was verified with `grep -F` against its source.
 *
 * ORDER MATTERS: [0] ships in the static HTML and is the one a JS-off or
 * reduced-motion visitor sees. It stays the ADR that says it doesn't know.
 */
export type SpecimenLineKind = "heading" | "gap" | "body" | "blank";

export interface Specimen {
  /** Display path, elided if long — the card head is narrow. */
  source: string;
  /** Deep link to the file on prod-stable. */
  href: string;
  /** The skill that wrote it. Shown in the card head, so it names a plugin. */
  by: string;
  lines: { text: string; kind: SpecimenLineKind }[];
  caption: string;
}

const blob = (path: string) => `${REPO_URL}/blob/prod-stable/${path}`;

/**
 * `kind: "gap"` paints a line in --red, which in this palette means
 * hypothesis, failure, the unrecorded reason — never decoration
 * (design/system/palette.md). So it is reserved for a real honest gap:
 * *(reason not stated)*, *(not stated)*, *(none identified)*. Three of the
 * six specimens below have no red line at all. Making them uniform would
 * destroy the signal that makes the first one mean anything.
 */
export const SPECIMENS: Specimen[] = [
  {
    source: "design/decisions/0002",
    href: blob(
      "design/decisions/0002-a-three-family-type-system-for-the-site.md",
    ),
    by: "design-decisions",
    lines: [
      { text: "## What we gave up", kind: "heading" },
      { text: "*(none identified)*", kind: "gap" },
      { text: "— the trade was never articulated.", kind: "body" },
      { text: "", kind: "blank" },
      { text: "**Rationale:**", kind: "heading" },
      { text: "*(reason not stated)*", kind: "gap" },
      { text: "— no reason was ever recorded.", kind: "body" },
    ],
    caption:
      "A real decision in this repo. Nobody remembered why — so it says so, instead of inventing a reason.",
  },
  {
    source: "docs/decisions/0000-not-logged",
    href: blob("docs/decisions/0000-not-logged.md"),
    by: "decisions-logger",
    lines: [
      { text: "## Below the bar", kind: "heading" },
      { text: "**Fork Test.**", kind: "heading" },
      { text: 'The loser would be "commit `.DS_Store`".', kind: "body" },
      { text: "", kind: "blank" },
      { text: "**Policy, not instance.**", kind: "heading" },
      {
        text: "A record of *complying* with a rule is not a decision — the rule is.",
        kind: "body",
      },
    ],
    caption:
      "A ledger of the decisions the log deliberately does not contain, and why — so a re-run never proposes them again.",
  },
  {
    source: "design/briefs/positioning",
    href: blob("design/briefs/positioning.md"),
    by: "design-brief",
    lines: [
      { text: "## Anti-goals", kind: "heading" },
      {
        text: "*What would count as failure even if it tested well:*",
        kind: "body",
      },
      { text: "- **Engineers bounce.**", kind: "heading" },
      { text: "", kind: "blank" },
      { text: "## Constraints", kind: "heading" },
      { text: "| Time | *(not stated)* |", kind: "gap" },
    ],
    caption:
      "The brief for this page. It asks what failure looks like — and leaves the constraint nobody answered blank.",
  },
  {
    source: "handoff/…-skills-library-as-a-system",
    href: blob(
      "handoff/handoff-code-to-chat-2026-07-13-skills-library-as-a-system.md",
    ),
    by: "handoff-generator",
    lines: [
      { text: "## Open Questions", kind: "heading" },
      {
        text: "- **The changelog protocol has a hole, and it will recur.**",
        kind: "heading",
      },
      { text: "Fixing entry 007 does not fix the mechanism.", kind: "body" },
      { text: "", kind: "blank" },
      { text: "- **`docs/concepts/` is empty.**", kind: "heading" },
      { text: "The tier exists with a README and template;", kind: "body" },
      { text: "nothing has been filed in it.", kind: "body" },
    ],
    caption:
      "The brief that carried this work between Claude.ai and Claude Code — including the hole it found in its own protocol.",
  },
  {
    source: "changelog/commits/022-…",
    href: blob(
      "changelog/commits/022-run-design-brief-and-design-decisions-for-real.md",
    ),
    by: "changelog-tracker",
    lines: [
      { text: "design/decisions/0002 -- THE TEST.", kind: "heading" },
      {
        text: "ADR 0017 states the site's typefaces and never justifies them;",
        kind: "body",
      },
      { text: "the owner did not remember why when asked.", kind: "body" },
      { text: "", kind: "blank" },
      { text: "No rationale was invented.", kind: "heading" },
      { text: "Zero hits on the tripwire phrases;", kind: "body" },
      { text: "every named loser traces to a file on disk.", kind: "body" },
    ],
    caption:
      "Every substantive commit documented from git. This one records a deliberate test: would the skill invent a reason if it had none?",
  },
  {
    source: "docs/concepts/website/type-system",
    href: blob("docs/concepts/website/type-system.md"),
    by: "exploration-log",
    lines: [
      { text: "### Verdict", kind: "heading" },
      {
        text: "**Killed** — superseded by round 3's three-family system.",
        kind: "body",
      },
      { text: "*(reason not stated)*", kind: "gap" },
      { text: "", kind: "blank" },
      { text: "### Verdict", kind: "heading" },
      { text: "**Kept** — shipped, and still live.", kind: "body" },
      { text: "*(reason not stated)*", kind: "gap" },
    ],
    caption:
      "The rounds that lost, kept on disk rather than deleted — the only reason the decision above could name its alternatives at all.",
  },
];

/* ─────────────────────────────────────────────────────────────────
   The matrix — nine questions a project has to answer.

   Replaces CONTEXT_STACK + DESIGN_STACK, which rendered as two parallel
   sections and printed `changelog/` and `decisions/` twice with identical
   text. See design ADR 0011.

   `answeredToday` is deliberately not absolute. Plenty of teams write some
   of this down; a reader who does will bounce off a table telling them they
   don't. `hasAnswerToday: false` is what paints the redline.
   ───────────────────────────────────────────────────────────────── */

export interface MatrixRow {
  question: string;
  /** what answers it today, without this library. Never a flat "nothing". */
  answeredToday: string;
  /** the tier this library adds */
  addedBy: string;
  /** false → the row is marked in redline: nothing answers it today */
  hasAnswerToday: boolean;
}

export const MATRIX: MatrixRow[] = [
  {
    question: "What did we try?",
    answeredToday: "git history, badly",
    addedBy: "explorations",
    hasAnswerToday: true,
  },
  {
    question: "Why did we choose that?",
    answeredToday: "commit messages, badly",
    addedBy: "decisions",
    hasAnswerToday: true,
  },
  {
    question: "What is it, exactly?",
    answeredToday: "the code itself",
    addedBy: "specs",
    hasAnswerToday: true,
  },
  {
    question: "What's reusable?",
    answeredToday: "the package system",
    addedBy: "system",
    hasAnswerToday: true,
  },
  {
    question: "What actually shipped?",
    answeredToday: "git, properly",
    addedBy: "changelog",
    hasAnswerToday: true,
  },
  {
    question: "What are we trying to build?",
    answeredToday: "whatever someone remembered",
    addedBy: "concepts · briefs",
    hasAnswerToday: false,
  },
  {
    question: "What are we still deciding?",
    answeredToday: "whatever someone remembered",
    addedBy: "prds · briefs",
    hasAnswerToday: false,
  },
  {
    question: "What did we learn?",
    answeredToday: "nothing, by default",
    addedBy: "research",
    hasAnswerToday: false,
  },
  {
    question: "Where did we leave off?",
    answeredToday: "nothing, by default",
    addedBy: "handoffs",
    hasAnswerToday: false,
  },
];

/* ─────────────────────────────────────────────────────────────────
   The loop — one skill, end to end.

   The mechanism this library runs on has never appeared on the site.
   Step 4 is the one nothing else does: the skill installs a capability
   AND the standing instruction to use it.
   ───────────────────────────────────────────────────────────────── */

export interface LoopStep {
  title: string;
  detail: string;
}

export const LOOP_STEPS: LoopStep[] = [
  {
    title: "It reads the evidence",
    detail: "git log, the config that changed, the PR thread. Never recollection.",
  },
  {
    title: "It asks what it can't find",
    detail:
      '"why did Tailwind lose?" — and every question offers "I don\'t remember."',
  },
  {
    title: "It writes the record",
    detail:
      "docs/decisions/0018-….md — with the option that lost named, or it isn't a decision.",
  },
  {
    title: "It registers the rule",
    detail:
      "a block in CLAUDE.md, the file your agent re-reads at the start of every session.",
  },
  {
    title: "Next session, unasked",
    detail:
      "it offers to log the next one. You never have to remember the habit.",
  },
];
