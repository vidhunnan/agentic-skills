import { REPO_URL } from "./lib/skills";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`wrap ${styles.foot}`}>
      <span className="s">&lt;!-- </span>
      Built by{" "}
      <a href="https://vidhunnan.design" className={styles.author}>
        Vidhunnan Murugan
      </a>{" "}
      · MIT licensed · authored in Markdown, no code ·{" "}
      <a href={REPO_URL}>[github]</a>
      <span className="s"> --&gt;</span>
    </footer>
  );
}
