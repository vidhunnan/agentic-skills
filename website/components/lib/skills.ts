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
    note: "Code has git log. Design has nothing — a Figma file shows the winner and never what was tried, or why.",
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
        name: "design-decisions",
        desc: "Why is it like this? — records a design fork as an append-only ADR, including what you gave up and what would make you revisit. Where nobody remembers the reason, it writes (reason not stated) — in design there's no diff to catch a plausible fiction.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install design-decisions",
        answers: "Why is it like this?",
      },
      {
        name: "exploration-log",
        desc: "Did we already try that? — logs a round of iteration: what it tested, what changed, what you learned, and whether it was kept, killed or parked. Append-only, so the directions you abandoned are still readable a year later. Also answers the question back.",
        surfaces: ["Code", "Chat"],
        install: "/plugin install exploration-log",
        answers: "Did we already try that?",
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
 * Artifacts in this repo written by the skills themselves — the Proof section.
 * Lives here rather than in the component so all site content has one source
 * (ADR 0016); it was the last hardcoded content outside it.
 */
export interface Receipt {
  path: string;
  desc: string;
  by: string;
  /** Set on the one receipt that demonstrates the honest-gap behaviour. */
  highlight?: boolean;
}

export const RECEIPTS: Receipt[] = [
  {
    path: "design/decisions/0002-…",
    desc: "A real design fork in this repo — which typefaces the site uses. Its two alternatives were recovered from killed drafts; why the winner won was never written down. So the rationale reads (reason not stated), rather than a plausible sentence about serifs.",
    by: "design-decisions",
    highlight: true,
  },
  {
    path: "docs/concepts/website/",
    desc: "Three landing-page directions, including the one that was killed. Kept, not deleted — which is the only reason the decision above could name its alternatives at all.",
    by: "exploration-log",
  },
  {
    path: "design/briefs/positioning.md",
    desc: "The brief for this very page: the problem, the success criterion, and two anti-goals. Sections nobody could answer are marked, not filled in.",
    by: "design-brief",
  },
  {
    path: "docs/decisions/",
    desc: "ADRs explaining why this repo is shaped the way it is, each with the evidence it was drawn from.",
    by: "decisions-logger",
  },
  {
    path: "changelog/",
    desc: "Every substantive commit documented, with the diff and the reason.",
    by: "changelog-tracker",
  },
  {
    path: "handoff/",
    desc: "The briefs that carried this work between Claude.ai and Claude Code.",
    by: "handoff-generator",
  },
];

// The context stack — the five tiers from CLAUDE.md's routing table.
export type Trust =
  | "Hypothesis"
  | "Proposal"
  | "Truth"
  | "Snapshot"
  | "Evidence"
  | "History"
  | "Spec";

export interface Tier {
  folder: string;
  question: string;
  trust: Trust;
  /** short qualifier shown after the trust label */
  qualifier?: string;
}

export const CONTEXT_STACK: Tier[] = [
  {
    folder: "docs/concepts/",
    question: "What are we even trying to build?",
    trust: "Hypothesis",
    qualifier: "future tense, disposable",
  },
  {
    folder: "docs/prds/",
    question: "What are we still deciding?",
    trust: "Proposal",
    qualifier: "a concept worth building",
  },
  {
    folder: "docs/decisions/",
    question: "Why did we choose that?",
    trust: "Truth",
    qualifier: "past tense, append-only",
  },
  {
    folder: "handoff/",
    question: "Where did we leave off?",
    trust: "Snapshot",
    qualifier: "the latest one wins",
  },
  {
    folder: "changelog/",
    question: "What actually shipped?",
    trust: "Truth",
    qualifier: "generated from git",
  },
];

// The design stack — the seven tiers from CLAUDE.md's design routing table.
// Code has git log; design has nothing. These are the tiers that fix that.
export const DESIGN_STACK: Tier[] = [
  {
    folder: "design/briefs/",
    question: "What problem are we solving?",
    trust: "Proposal",
    qualifier: "the design PRD",
  },
  {
    folder: "design/research/",
    question: "What did we learn?",
    trust: "Evidence",
    qualifier: "observation ≠ interpretation",
  },
  {
    // Adopted, not canonical: the drafts already lived here and the design
    // stack is additive-only, so it never moved them. Must match the
    // Explorations row of CLAUDE.md's skill:design-setup routing table.
    folder: "docs/concepts/website/",
    question: "What did we try?",
    trust: "History",
    qualifier: "includes what was killed",
  },
  {
    folder: "design/decisions/",
    question: "Why did we choose this?",
    trust: "Truth",
    qualifier: "past tense, append-only",
  },
  {
    folder: "design/specs/",
    question: "What is it, exactly?",
    trust: "Spec",
    qualifier: "pinned to a source version",
  },
  {
    folder: "design/system/",
    question: "What's reusable?",
    trust: "Truth",
    qualifier: "the system of record",
  },
  {
    folder: "changelog/",
    question: "What actually shipped?",
    trust: "Truth",
    qualifier: "generated from git",
  },
];
