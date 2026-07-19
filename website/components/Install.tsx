import { MARKETPLACE_CMD, ALL_INSTALL_LINES } from "./lib/skills";
import CopyButton from "./CopyButton";
import styles from "./Install.module.css";

export default function Install() {
  return (
    <section id="install" className={styles.section}>
      <div className="wrap">
        <p className="eyebrow">Get started</p>
        <h2 className={styles.title}>Install.</h2>
        <p className={styles.intro}>
          Add the marketplace once. Then install the skills you want — each is a
          separate plugin, so take one or take all six.
        </p>

        <div className={styles.block}>
          <div className={styles.lineRow}>
            <code className={styles.line}>
              <span className={styles.prompt}>$</span> {MARKETPLACE_CMD}
            </code>
            <CopyButton text={MARKETPLACE_CMD} />
          </div>

          <div className={styles.rem}># then, any combination of —</div>

          {ALL_INSTALL_LINES.map((cmd) => (
            <div className={styles.lineRow} key={cmd}>
              <code className={styles.line}>
                <span className={styles.prompt}>$</span> {cmd}
              </code>
              <CopyButton text={cmd} />
            </div>
          ))}

          <div className={styles.alt}>
            <strong>On Claude.ai —</strong> zip a skill folder and upload it
            under Settings → Customize → Skills. Skills marked{" "}
            <span className={styles.chat}>Chat</span> have a Claude.ai path; the
            rest need a filesystem and git.
          </div>
        </div>
      </div>
    </section>
  );
}
