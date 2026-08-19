import type { Skill } from "./lib/skills";
import styles from "./Tags.module.css";

/**
 * Only the surfaces a skill actually has.
 *
 * Until round 5 every row printed "Code · Chat" and struck Chat through when it
 * was unavailable, which put the same two words on all fourteen rows and made
 * the column read as decoration. The absence of a tag is the information.
 */
export default function Tags({ skill }: { skill: Skill }) {
  return (
    <span className={styles.tags}>
      {skill.surfaces.map((s) => (
        <span key={s} className={styles.tag}>
          {s}
        </span>
      ))}
    </span>
  );
}
