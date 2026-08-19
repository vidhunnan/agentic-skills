import CopyButton from "./CopyButton";
import Reveal from "./Reveal";
import { SKILLS_COPY } from "./lib/content";
import { SKILL_GROUPS, type Skill } from "./lib/skills";
import styles from "./Skills.module.css";

/**
 * One lead card, two beside it, eleven as a two-column index.
 *
 * Equal thirds is the docs-template shape; an asymmetric grid says which skill
 * to read first. decisions-logger leads because it is the one the page's own
 * argument rests on — the hero specimen is its output.
 *
 * The three are chosen to cover the three evidence sources — from git, from you,
 * and from the record itself — not to be the "best" three.
 */
const LEAD = "decisions-logger";
const BESIDE = ["exploration-log", "changelog-tracker"];

const ALL: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);
const byName = (n: string) => ALL.find((s) => s.name === n);

const lead = byName(LEAD);
const beside = BESIDE.map(byName).filter((s): s is Skill => Boolean(s));
const rest = ALL.filter((s) => s.name !== LEAD && !BESIDE.includes(s.name));

function Surfaces({ skill }: { skill: Skill }) {
  const chat = skill.surfaces.includes("Chat");
  return (
    <span className={styles.surf}>
      <span className={styles.on}>Code</span> <span className="s">·</span>{" "}
      <span className={chat ? styles.on : styles.off}>Chat</span>
    </span>
  );
}

function Command({ skill }: { skill: Skill }) {
  return (
    <div className={styles.cmdRow}>
      <code className={styles.cmd}>{skill.install}</code>
      <CopyButton text={skill.install} />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={`shell ${styles.sec}`}>
      <div className={styles.head}>
        <h2>
          <span className="s">## </span>
          {SKILLS_COPY.heading}
        </h2>
        <p className={styles.sub}>{SKILLS_COPY.sub}</p>
      </div>

      <div className={styles.feat}>
        {lead && (
          <article className={`${styles.skill} ${styles.lead}`}>
            <div className={styles.top}>
              <span className={styles.nm}>{lead.name}</span>
              <Surfaces skill={lead} />
            </div>
            <div className={styles.body}>
              <p className={styles.leadTag}>{SKILLS_COPY.leadTag}</p>
              {lead.answers && <p className={styles.ans}>{lead.answers}</p>}
              <p className={styles.desc}>{lead.desc}</p>
              <p className={styles.desc}>
                <span className="s">&gt; </span>
                {SKILLS_COPY.leadNote}
              </p>
              <p className={styles.out}>
                <span className="s">{SKILLS_COPY.leadOutputPrefix}</span>
                {SKILLS_COPY.leadOutput}
                <span className="s">{SKILLS_COPY.leadOutputSuffix}</span>
              </p>
            </div>
            <Command skill={lead} />
          </article>
        )}

        {beside.map((s) => (
          <article key={s.name} className={styles.skill}>
            <div className={styles.top}>
              <span className={styles.nm}>{s.name}</span>
              <Surfaces skill={s} />
            </div>
            <div className={styles.body}>
              {s.answers && <p className={styles.ans}>{s.answers}</p>}
              <p className={styles.desc}>{s.desc}</p>
            </div>
            <Command skill={s} />
          </article>
        ))}
      </div>

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
