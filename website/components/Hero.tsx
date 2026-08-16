import CopyButton from "./CopyButton";
import { MARKETPLACE_CMD, REPO_URL, SPECIMEN, TOTAL_SKILLS } from "./lib/skills";
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

        {/* A verbatim fragment of a real ADR in this repo — see SPECIMEN. */}
        <figure className={styles.specimen}>
          <div className={styles.specimenHead}>
            <span className={styles.specimenPath}>{SPECIMEN.source}</span>
            <span className={styles.specimenTag}>written by the skill</span>
          </div>
          {/* Raw Markdown reads badly aloud ("hash hash What we gave up",
              "asterisk paren none identified"), and the figcaption below
              carries the meaning. Visual specimen, described in text. */}
          <div className={styles.specimenBody} aria-hidden="true">
            {SPECIMEN.lines.map((l, i) => (
              <span key={i} className={styles[l.kind]}>
                {l.text}
              </span>
            ))}
          </div>
          <figcaption className={styles.specimenCaption}>
            {SPECIMEN.caption}{" "}
            <a href={SPECIMEN.href} target="_blank" rel="noreferrer">
              Read it →
            </a>
          </figcaption>
        </figure>

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
