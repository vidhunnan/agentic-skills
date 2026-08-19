import SkillList from "./SkillList";
import { SKILLS_COPY } from "./lib/content";
import styles from "./Skills.module.css";

/**
 * The catalogue. One shape for all fourteen — it scales by rows, and at the
 * thirty-two on the roadmap it is thirty-two rows rather than eleven screens.
 */
export default function Skills() {
  return (
    <section id="skills" className={`shell ${styles.sec}`}>
      <div className={styles.head}>
        <h2>{SKILLS_COPY.heading}</h2>
        <p className={styles.sub}>{SKILLS_COPY.sub}</p>
      </div>
      <SkillList />
    </section>
  );
}
