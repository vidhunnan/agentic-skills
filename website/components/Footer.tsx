import { REPO_URL } from "./lib/skills";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.row}`}>
        <span className={styles.tag}>
          MIT licensed · authored in Markdown, no code
        </span>
        <div className={styles.links}>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href={`${REPO_URL}/blob/prod-stable/LICENSE`}
            target="_blank"
            rel="noreferrer"
          >
            License
          </a>
          <a
            href={`${REPO_URL}/blob/prod-stable/README.md`}
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
