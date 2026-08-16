import CopyButton from "./CopyButton";
import { MARKETPLACE_CMD, REPO_URL, TOTAL_SKILLS } from "./lib/skills";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <header className={styles.hero} id="top">
      <div className="wrap">
        {/* One text node on purpose: .eyebrow is display:flex, so React's
            split text nodes become separate anonymous flex items and the
            leading space in " skills" is stripped — it renders "11skills". */}
        <p className="eyebrow">
          {`${TOTAL_SKILLS} skills · code & design · all live · MIT`}
        </p>
        <h1 className={styles.title}>
          An agent starts every session with no memory of the last one.
        </h1>
        <p className={styles.sub}>
          It doesn&rsquo;t need a better prompt — it needs <em>a briefing</em>.
          These skills author the record a project should keep anyway: a
          changelog of what shipped, a decision log of why —{" "}
          <strong>and, for design work, the directions you killed</strong> and
          what they cost. <strong>All Markdown. None of it is code.</strong>
        </p>

        <div className={styles.command}>
          <code>
            <span className={styles.prompt}>$</span> {MARKETPLACE_CMD}
          </code>
          <CopyButton text={MARKETPLACE_CMD} />
        </div>

        <div className={styles.ctas}>
          <a className={styles.primary} href="#skills">
            Browse all {TOTAL_SKILLS} skills
          </a>
          <a className={styles.ghost} href="#design">
            The design stack →
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
