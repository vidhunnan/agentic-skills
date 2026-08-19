import CopyButton from "./CopyButton";
import { MARKETPLACE_CMD } from "./lib/skills";
import styles from "./Install.module.css";

/**
 * A sequence, not a menu. The old section printed one command per skill —
 * fifteen near-identical rows, each already present on its own catalogue row,
 * and thirty copy buttons for fourteen commands.
 *
 * Fourteen equal options is a paralysis machine; the library has an obvious
 * entry point and this says so.
 */
const FIRST = "/plugin install repo-setup";

export default function Install() {
  return (
    <section id="install" className={`wrap ${styles.sec}`}>
      <div className={styles.rule} aria-hidden="true" />
      <h2 className={styles.h2}>
        <span className="s">## </span>Install
      </h2>
      <p className={styles.sub}>
        Read a couple of the records above before you trust it with your repo —
        including the one that says it doesn&rsquo;t know.
      </p>

      <div className={styles.fence}>
        <div className={styles.tick}>```sh</div>
        <div className={styles.block}>
          <p className={styles.comment}># once</p>
          <div className={styles.cmdRow}>
            <code className={styles.cmd}>{MARKETPLACE_CMD}</code>
            <CopyButton text={MARKETPLACE_CMD} />
          </div>

          <p className={styles.comment}>
            # start here — it builds the folders the rest fill
          </p>
          <div className={styles.cmdRow}>
            <code className={styles.cmd}>{FIRST}</code>
            <CopyButton text={FIRST} />
          </div>

          <p className={styles.comment}>
            # then add the rest as you hit the need for them
          </p>
        </div>
        <div className={styles.tick}>```</div>
      </div>

      <p className={styles.body}>
        <b>Claude Code gives you the system. Claude.ai gives you the artifact.</b>{" "}
        On Claude.ai a skill interviews you and hands back a document — there is
        no folder to write into and no rule registered, so nothing happens next
        session unless you paste the block in yourself. Skills marked{" "}
        <span className={styles.chat}>Chat</span> above have that path; the rest
        need git.
      </p>
    </section>
  );
}
