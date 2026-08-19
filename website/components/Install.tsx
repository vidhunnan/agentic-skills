import CopyButton from "./CopyButton";
import { INSTALL_COPY } from "./lib/content";
import { MARKETPLACE_CMD } from "./lib/skills";
import styles from "./Install.module.css";

/**
 * A sequence, not a menu. The old section printed one command per skill —
 * fifteen near-identical rows, each already on its own catalogue row, and thirty
 * copy buttons for fourteen commands. Fourteen equal options is a paralysis
 * machine; the library has an obvious entry point and this says so.
 */
const FIRST = "/plugin install repo-setup";

export default function Install() {
  return (
    <section id="install" className={`${styles.sec} band`}>
      <div className="shell">
        <div className={styles.grid}>
          <div>
            <h2>
              <span className="s">## </span>
              {INSTALL_COPY.heading}
            </h2>
            <p className={styles.sub}>{INSTALL_COPY.sub}</p>
            <p className={styles.body}>
              <b>{INSTALL_COPY.bodyLead}</b>
              {INSTALL_COPY.bodyRestBefore}
              <span className={styles.chat}>{INSTALL_COPY.bodyChat}</span>
              {INSTALL_COPY.bodyRestAfter}
            </p>
          </div>

          <div className={styles.fence}>
            <div className={styles.tick}>```sh</div>
            <div className={styles.block}>
              <p className={styles.comment}>{INSTALL_COPY.comments[0]}</p>
              <div className={styles.cmdRow}>
                <code className={styles.cmd}>{MARKETPLACE_CMD}</code>
                <CopyButton text={MARKETPLACE_CMD} />
              </div>

              <p className={styles.comment}>{INSTALL_COPY.comments[1]}</p>
              <div className={styles.cmdRow}>
                <code className={styles.cmd}>{FIRST}</code>
                <CopyButton text={FIRST} />
              </div>

              <p className={`${styles.comment} ${styles.last}`}>
                {INSTALL_COPY.comments[2]}
              </p>
            </div>
            <div className={styles.tick}>```</div>
          </div>
        </div>
      </div>
    </section>
  );
}
