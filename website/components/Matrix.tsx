import { MATRIX_COPY } from "./lib/content";
import { MATRIX } from "./lib/skills";
import Reveal from "./Reveal";
import styles from "./Matrix.module.css";

/**
 * Nine questions in one bordered panel. Replaces the two parallel stack
 * sections, which printed `changelog/` and `decisions/` twice — design ADR 0011.
 *
 * Redline marks only the rows where nothing answers the question today. Same
 * signal the records use for a reason nobody recorded, so it must not be spent
 * on anything else here.
 *
 * The rows are <li> and every value stays visible at 390px. Both are asserted by
 * tests/matrix-mobile.spec.ts, which guards a real defect: the pre-rebuild
 * section hid the trust qualifier below 720px, deleting its entire argument.
 */
export default function Matrix() {
  return (
    <section id="written" className={`shell ${styles.sec}`}>
      <div className={styles.head}>
        <h2>{MATRIX_COPY.heading}</h2>
        <p className={styles.sub}>{MATRIX_COPY.sub}</p>
      </div>

      <div className={styles.panel}>
        <div className={styles.colHead} aria-hidden="true">
          {MATRIX_COPY.columns.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>

        <ul className={styles.rows}>
          {MATRIX.map((r, i) => (
            <Reveal as="li" key={r.question} index={i} className={styles.row}>
              <span className={styles.q}>{r.question}</span>
              <span
                className={`${styles.today} ${r.hasAnswerToday ? styles.has : ""}`}
              >
                <span className={styles.mLabel}>{MATRIX_COPY.labelToday}</span>
                {r.answeredToday}
              </span>
              <span className={styles.adds}>
                <span className={styles.mLabel}>{MATRIX_COPY.labelAdds}</span>
                {r.addedBy}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <p className={styles.note}>
        <span className={styles.red}>{MATRIX_COPY.noteRed}</span>
        {MATRIX_COPY.note}
      </p>
    </section>
  );
}
