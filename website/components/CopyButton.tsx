"use client";

import { useState } from "react";
import styles from "./CopyButton.module.css";

export default function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
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
      className={`${styles.btn} ${copied ? styles.copied : ""}`}
      onClick={copy}
      aria-label={copied ? "Copied to clipboard" : `Copy: ${text}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
