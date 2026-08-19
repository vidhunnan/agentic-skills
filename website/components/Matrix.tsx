import { MATRIX } from "./lib/skills";
import Reveal from "./Reveal";
import styles from "./Matrix.module.css";

/**
 * Nine questions, three columns. Replaces the two parallel stack sections,
 * which printed `changelog/` and `decisions/` twice — design ADR 0011.
 *
 * Redline marks only the rows where nothing answers the question today. It is
 * the same signal the records use for a reason nobody recorded, so it must not
 * be spent on anything else here.
 */
export default function Matrix() {
  return (
    <section id="written" className={`wrap ${styles.sec}`}>
      <div className={styles.rule} aria-hidden="true" />
      <h2 className={styles.h2}>
        <span className="s">## </span>What gets written
      </h2>
      <p className={styles.sub}>
        Nine questions a project has to answer. Most of them already have an
        answer — it&rsquo;s just nowhere you can read it.
      </p>

      <div className={styles.head} aria-hidden="true">
        <span>Question</span>
        <span className={styles.pipe}>│</span>
        <span>What answers it today</span>
        <span className={styles.pipe}>│</span>
        <span>This adds</span>
      </div>

      <ul className={styles.rows}>
        {MATRIX.map((r, i) => (
          <Reveal as="li" key={r.question} index={i} className={styles.row}>
            <span className={styles.q}>{r.question}</span>
            <span className={styles.pipe} aria-hidden="true">
              │
            </span>
            <span
              className={`${styles.today} ${r.hasAnswerToday ? styles.has : ""}`}
            >
              <span className={styles.mLabel}>today: </span>
              {r.answeredToday}
            </span>
            <span className={styles.pipe} aria-hidden="true">
              │
            </span>
            <span className={styles.adds}>
              <span className={styles.mLabel}>adds: </span>
              {r.addedBy}
            </span>
          </Reveal>
        ))}
      </ul>

      <p className={styles.note}>
        <span className="s">&gt; </span>
        <span className={styles.red}>Red</span> is not styling. It marks the
        rows where nothing answers the question today — the same signal the
        records use for a reason nobody recorded.
      </p>
    </section>
  );
}
