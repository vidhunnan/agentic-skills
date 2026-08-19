"use client";

import { useState } from "react";
import styles from "./CopyButton.module.css";

/**
 * `variant="primary"` is the hero's call to action: the command is the button.
 * Round 3 wrapped it in a three-row ```sh fence, which read as a sketch of a
 * terminal rather than as something to press, and gave the fold no visible CTA.
 *
 * The aria-label stays `Copy: <text>` in both variants — two specs select on it.
 */
export default function CopyButton({
  text,
  label = "Copy",
  variant = "chip",
}: {
  text: string;
  label?: string;
  variant?: "chip" | "primary";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard blocked (e.g. insecure context) — no-op
    }
  }

  return (
    <button
      type="button"
      className={`${styles.btn} ${variant === "primary" ? styles.primary : ""} ${
        copied ? styles.copied : ""
      }`}
      onClick={copy}
      aria-label={copied ? "Copied to clipboard" : `Copy: ${text}`}
    >
      {variant === "primary" ? (
        <>
          <code className={styles.cmd}>{text}</code>
          <span className={styles.action} aria-hidden="true">
            {copied ? "copied" : "copy"}
          </span>
        </>
      ) : copied ? (
        "Copied"
      ) : (
        label
      )}
    </button>
  );
}
