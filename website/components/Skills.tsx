import SkillList from "./SkillList";
import styles from "./Skills.module.css";

/**
 * The catalogue. One shape for all fifteen — it scales by rows, and at the
 * thirty-two on the roadmap it is thirty-two rows rather than eleven screens.
 *
 * The heading lives inside SkillList because the filter sits beside it and owns
 * the query state.
 */
export default function Skills() {
  return (
    <section id="skills" className={`shell ${styles.sec}`}>
      <SkillList />
    </section>
  );
}
