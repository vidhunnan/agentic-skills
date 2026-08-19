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

/* ===========================================================================
   Command palette index
   ---------------------------------------------------------------------------
   Derived from the constants above — never a second copy of the content. Add
   a skill or a tier and it appears in the palette with no further work, which
   is the same rule that stopped the site's copy going stale (see TOTAL_SKILLS).
   =========================================================================== */

export interface CommandItem {
  id: string;
  /** The skill name. */
  label: string;
  /** The question it answers — what tells you whether it's the one you want. */
  detail: string;
  /** Its group, shown as quiet context. */
  group: string;
  /** Matched against but not displayed. */
  keywords: string;
  /** The whole point: the install command. */
  copy: string;
}

/**
 * Skills only, and one action: copy the install command.
 *
 * An earlier version also indexed tiers, page sections and Proof records with
 * three modifier-key actions each. It was more than the job needed — the site
 * is not big enough to warrant navigating by palette, and the nav already
 * does that. See design ADR 0005, which supersedes 0004.
 */
export function buildCommandIndex(): CommandItem[] {
  return SKILL_GROUPS.flatMap((group) =>
    group.skills.map((s) => ({
      id: s.name,
      label: s.name,
      detail: s.answers ?? s.desc,
      group: group.title,
      // desc, surfaces and the group's note are matched but not shown, so
      // "figma", "append-only" and "chat" all find the right skill. The note
      // matters more than it looks: "a Figma file shows the winner" lives
      // there, and dropping it silently lost the query "figma" entirely.
      keywords: `${s.desc} ${s.surfaces.join(" ")} ${group.title} ${group.note}`,
      copy: s.install,
    })),
  );
}

/**
 * Ranked match. Deliberately not a fuzzy-search dependency — the index is
 * ~35 items, and the site ships with no runtime deps beyond React.
 *
 * Bands, highest first: exact label · label prefix · word-start in label ·
 * substring in label · substring in detail · substring in keywords ·
 * subsequence in label. Ties break on shorter labels, so "design-brief"
 * outranks "design-decisions" for the query "design-b".
 *
 * Subsequence ranks **last** and is gated to short, single-word queries. It
 * earns its place on "dsn" → design-setup, but ungated it ranked
 * changelog-tracker above every Chat skill for the query "chat" (c-h-a…t
 * appears in order), which is worse than no fuzzy matching at all.
 */
export function scoreItem(item: CommandItem, q: string): number {
  if (!q) return 0;
  const query = q.toLowerCase().trim();
  const label = item.label.toLowerCase();
  const detail = item.detail.toLowerCase();
  const keywords = item.keywords.toLowerCase();

  if (label === query) return 1000;
  if (label.startsWith(query)) return 900 - label.length;

  // word-start: after a space, hyphen or slash
  if (new RegExp(`(^|[\\s\\-/])${escapeRe(query)}`).test(label)) {
    return 800 - label.length;
  }
  if (label.includes(query)) return 700 - label.length;
  if (detail.includes(query)) return 500;
  if (keywords.includes(query)) return 400;
  const fuzzyEligible = query.length <= 6 && !query.includes(" ");
  if (fuzzyEligible && isSubsequence(query, label)) return 300 - label.length;
  return -1;
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** "dsn" matches "design-setup" — cheap fuzzy, in order, not necessarily adjacent. */
function isSubsequence(needle: string, hay: string): boolean {
  let i = 0;
  for (const ch of hay) {
    if (ch === needle[i]) i += 1;
    if (i === needle.length) return true;
  }
  return needle.length === 0;
}

export function searchCommands(
  index: CommandItem[],
  q: string,
): CommandItem[] {
  // Empty query: every skill, in the order the page lists them.
  if (!q.trim()) return index;
  return index
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}

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
