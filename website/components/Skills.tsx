import CopyButton from "./CopyButton";
import Reveal from "./Reveal";
import { SKILL_GROUPS, TOTAL_SKILLS_WORD, type Skill } from "./lib/skills";
import styles from "./Skills.module.css";

/**
 * Three shown properly, the rest as a one-line index. Fourteen full rows was
 * ~2,400px and would be ~5,400px at the thirty-two on the roadmap; the index
 * scales by rows instead of by screens.
 *
 * The three are chosen to cover the three evidence sources — from git, from
 * you, and from the record itself — not to be the "best" three.
 */
const FEATURED = ["decisions-logger", "exploration-log", "changelog-tracker"];

const ALL: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);
const featured = FEATURED.map((n) => ALL.find((s) => s.name === n)).filter(
  (s): s is Skill => Boolean(s),
);
const rest = ALL.filter((s) => !FEATURED.includes(s.name));

function Surfaces({ skill }: { skill: Skill }) {
  const chat = skill.surfaces.includes("Chat");
  return (
    <span className={styles.surf}>
      <span className={styles.on}>Code</span>{" "}
      <span className="s">·</span>{" "}
      <span className={chat ? styles.on : styles.off}>Chat</span>
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={`wrap ${styles.sec}`}>
      <div className={styles.rule} aria-hidden="true" />
      <h2 className={styles.h2}>
        <span className="s">## </span>The skills
      </h2>
      <p className={styles.sub}>
        {TOTAL_SKILLS_WORD.charAt(0).toUpperCase() + TOTAL_SKILLS_WORD.slice(1)},
        each a separate plugin. Three worth reading properly; the rest are one
        line each.
      </p>

      {featured.map((s, i) => (
        <Reveal key={s.name} index={i} className={styles.skill}>
          <div className={styles.top}>
            <span className={styles.nm}>{s.name}</span>
            <Surfaces skill={s} />
          </div>
          {s.answers && <div className={styles.ans}>{s.answers}</div>}
          <p className={styles.desc}>{s.desc}</p>
          <div className={styles.fence}>
            <div className={styles.tick}>```sh</div>
            <div className={styles.cmdRow}>
              <code className={styles.cmd}>{s.install}</code>
              <CopyButton text={s.install} />
            </div>
            <div className={styles.tick}>```</div>
          </div>
        </Reveal>
      ))}

      <ul className={styles.idx}>
        {rest.map((s, i) => (
          <Reveal as="li" key={s.name} index={i} className={styles.row}>
            <span className={styles.nm}>{s.name}</span>
            <span className={styles.ansInline}>{s.answers}</span>
            <Surfaces skill={s} />
            {/* The index is the only place these eleven commands live. */}
            <CopyButton text={s.install} label="copy" />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
