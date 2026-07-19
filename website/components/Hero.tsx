import CopyButton from "./CopyButton";
import { MARKETPLACE_CMD, REPO_URL } from "./lib/skills";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <header className={styles.hero} id="top">
      <div className="wrap">
        <p className="eyebrow">Six skills · all live · MIT</p>
        <h1 className={styles.title}>
          An agent starts every session with no memory of the last one.
        </h1>
        <p className={styles.sub}>
          It doesn&rsquo;t need a better prompt — it needs{" "}
          <em>a briefing</em>. These skills author the context files a project
          should have anyway: a changelog of what shipped, a decision log of
          why, a handoff for where you left off.{" "}
          <strong>All Markdown. None of it is code.</strong>
        </p>

        <div className={styles.command}>
          <code>
            <span className={styles.prompt}>$</span> {MARKETPLACE_CMD}
          </code>
          <CopyButton text={MARKETPLACE_CMD} />
        </div>

        <div className={styles.ctas}>
          <a className={styles.primary} href="#skills">
            Browse the six skills
          </a>
          <a
            className={styles.ghost}
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            View source →
          </a>
        </div>
      </div>
    </header>
  );
}
