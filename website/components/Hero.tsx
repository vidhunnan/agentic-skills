import CopyButton from "./CopyButton";
import Specimens from "./Specimens";
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
          These skills author the record a project should keep anyway: what
          shipped, why you chose it, and — for design —{" "}
          <strong>the directions you killed and what they cost.</strong>
        </p>

        {/* Verbatim fragments of real files in this repo — see SPECIMENS. */}
        <Specimens />

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
          <a className={styles.secondary} href="#design">
            The design stack →
          </a>
          <a
            className={styles.ghost}
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
        </div>
      </div>
    </header>
  );
}
