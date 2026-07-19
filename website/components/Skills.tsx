import { SKILL_GROUPS } from "./lib/skills";
import CopyButton from "./CopyButton";
import Reveal from "./Reveal";
import styles from "./Skills.module.css";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Skills() {
  let counter = 0;
  return (
    <section id="skills" className={styles.section}>
      <div className="wrap">
        <p className="eyebrow">Install one, or all six</p>
        <h2 className={styles.title}>The skills.</h2>
        <p className={styles.intro}>
          Each is a separate plugin. Every fact each one writes is pulled from
          your repo — git, CLAUDE.md, the files themselves — never invented.
        </p>

        {SKILL_GROUPS.map((group) => (
          <div key={group.title} className={styles.group}>
            <div className={styles.groupHead}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <p className={styles.groupNote}>{group.note}</p>
            </div>

            <ul className={styles.list}>
              {group.skills.map((skill) => {
                counter += 1;
                return (
                  <Reveal
                    as="li"
                    key={skill.name}
                    className={styles.row}
                  >
                    <span className={styles.num}>{pad(counter)}</span>
                    <div className={styles.main}>
                      <div className={styles.nameLine}>
                        <span className={styles.name}>{skill.name}</span>
                        <span className={styles.surfaces}>
                          {skill.surfaces.join(" · ")}
                        </span>
                      </div>
                      <p className={styles.desc}>{skill.desc}</p>
                      <div className={styles.install}>
                        <code>{skill.install}</code>
                        <CopyButton text={skill.install} />
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
