import CopyButton from "./CopyButton";
import { SKILLS_COPY } from "./lib/content";
import { SKILL_GROUPS, type Skill } from "./lib/skills";
import styles from "./Skills.module.css";

/**
 * Fourteen rows, all closed. Open one for its description and its command.
 *
 * Round 3 showed three as cards and eleven as an index, and it read as
 * congested — two shapes doing the same job, and the cards were tall enough
 * that three of them filled a screen. One shape scales: at the thirty-two on
 * the roadmap this is thirty-two rows, not eleven screens.
 *
 * <details>/<summary> rather than a JS disclosure, deliberately. It is keyboard
 * accessible for free, and it works with JS off — which matters because this
 * repo's rule is that JS may enhance but never reveal, and a JS toggle would
 * ship a control that does nothing for a reader without it.
 *
 * WHAT THIS GIVES UP: the lead card, and with it the "start with this one"
 * signal. decisions-logger stays first in the list, but a first row is a much
 * weaker recommendation than a card three times the size of its neighbours.
 * Install.tsx's own comment calls a flat menu "a paralysis machine"; this is
 * one, mitigated only by ordering.
 */
const FIRST = "decisions-logger";

const ALL: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);
const ORDERED: Skill[] = [
  ...ALL.filter((s) => s.name === FIRST),
  ...ALL.filter((s) => s.name !== FIRST),
];

function Surfaces({ skill }: { skill: Skill }) {
  const chat = skill.surfaces.includes("Chat");
  return (
    <span className={styles.surf}>
      <span className={styles.on}>Code</span> <span className="s">·</span>{" "}
      <span className={chat ? styles.on : styles.off}>Chat</span>
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={`shell ${styles.sec}`}>
      <div className={styles.head}>
        <h2>{SKILLS_COPY.heading}</h2>
        <p className={styles.sub}>{SKILLS_COPY.sub}</p>
      </div>

      <ul className={styles.list}>
        {ORDERED.map((s) => (
          <li key={s.name}>
            <details className={styles.row}>
              <summary className={styles.summary}>
                <span className={styles.text}>
                  <span className={styles.top}>
                    <span className={styles.nm}>{s.name}</span>
                    <Surfaces skill={s} />
                  </span>
                  {/* Clamped to two lines closed, released when open. The
                      description is the same string either way — nothing is
                      withheld, it is only cropped. */}
                  <span className={styles.desc}>{s.desc}</span>
                </span>
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <div className={styles.body}>
                <div className={styles.cmdRow}>
                  <code className={styles.cmd}>{s.install}</code>
                  <CopyButton text={s.install} label="copy" />
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
