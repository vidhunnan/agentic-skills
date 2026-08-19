import { INSTALL_COPY } from "./lib/content";
import InstallSteps from "./InstallSteps";
import styles from "./Install.module.css";

/**
 * A sequence, not a menu. The old section printed one command per skill —
 * fifteen near-identical rows and thirty copy buttons for fourteen commands.
 */
export default function Install() {
  return (
    <section id="install" className={`${styles.sec} band`}>
      <div className="shell">
        <div className={styles.grid}>
          <div>
            <h2>{INSTALL_COPY.heading}</h2>
            <p className={styles.sub}>{INSTALL_COPY.sub}</p>
            <p className={styles.body}>
              <b>{INSTALL_COPY.bodyLead}</b>
              {INSTALL_COPY.bodyRestBefore}
              <span className={styles.chat}>{INSTALL_COPY.bodyChat}</span>
              {INSTALL_COPY.bodyRestAfter}
            </p>
          </div>
          <InstallSteps />
        </div>
      </div>
    </section>
  );
}
