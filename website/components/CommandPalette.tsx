"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  buildCommandIndex,
  searchCommands,
  type CommandItem,
} from "./lib/skills";
import styles from "./CommandPalette.module.css";

/** Nav dispatches this; the palette listens. One consumer, so no context. */
export const OPEN_EVENT = "agentic-skills:open-palette";

const KIND_LABEL: Record<CommandItem["kind"], string> = {
  skill: "Skill",
  tier: "Tier",
  section: "Go to",
  record: "Record",
};

/** Splits a label so a substring match can be marked without dangerouslySetInnerHTML. */
function highlight(label: string, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return label;
  const i = label.toLowerCase().indexOf(query);
  if (i < 0) return label;
  return (
    <>
      {label.slice(0, i)}
      <mark className={styles.mark}>{label.slice(i, i + query.length)}</mark>
      {label.slice(i + query.length)}
    </>
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  /** Focus returns here on close — a palette that drops focus is a keyboard trap. */
  const restoreRef = useRef<HTMLElement | null>(null);

  const index = useMemo(() => buildCommandIndex(), []);
  const results = useMemo(
    () => searchCommands(index, query),
    [index, query],
  );

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform ?? ""));
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    setCopied(null);
    restoreRef.current?.focus?.();
  }, []);

  const show = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  /* ---- global shortcuts ------------------------------------------------- */
  useEffect(() => {
    function isTyping(el: EventTarget | null) {
      const n = el as HTMLElement | null;
      if (!n) return false;
      const tag = n.tagName;
      return (
        tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || n.isContentEditable
      );
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open ? close() : show();
        return;
      }
      // "/" is a convention, but never steal it from a real input.
      if (!open && e.key === "/" && !isTyping(e.target) && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        show();
      }
    }
    function onOpenEvent() {
      show();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpenEvent);
    };
  }, [open, close, show]);

  /* ---- focus + scroll lock ---------------------------------------------- */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Keep the active row in view when arrowing past the fold. */
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  useEffect(() => setActive(0), [query]);

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      /* insecure context or denied — fail quiet, same as CopyButton */
    }
  }

  function run(item: CommandItem, mode: "go" | "copy" | "external") {
    if (mode === "copy" && item.copy) {
      copyToClipboard(item.copy);
      return; // stay open so you can copy another
    }
    if (mode === "external" && item.external) {
      window.open(item.external, "_blank", "noopener,noreferrer");
      close();
      return;
    }
    if (item.href.startsWith("#")) {
      close();
      // after close, so focus restore doesn't fight the scroll
      window.requestAnimationFrame(() => {
        document.querySelector(item.href)?.scrollIntoView({ block: "start" });
        window.history.replaceState(null, "", item.href);
      });
      return;
    }
    window.open(item.href, "_blank", "noopener,noreferrer");
    close();
  }

  function onKeyDown(e: ReactKeyboardEvent) {
    const last = results.length - 1;
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => (i >= last ? 0 : i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => (i <= 0 ? last : i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter": {
        e.preventDefault();
        const item = results[active];
        if (!item) return;
        if (e.metaKey || e.ctrlKey) run(item, "copy");
        else if (e.shiftKey) run(item, "external");
        else run(item, "go");
        break;
      }
      case "Tab":
        // Single focusable element, so the trap is simply: stay put.
        e.preventDefault();
        break;
      default:
        break;
    }
  }

  if (!open) return null;

  const mod = isMac ? "⌘" : "Ctrl";
  const activeId = results[active] ? `cmd-${results[active].id}` : undefined;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Search skills, tiers and sections"
        onKeyDown={onKeyDown}
      >
        <div className={styles.inputRow}>
          <span className={styles.prompt} aria-hidden="true">
            /
          </span>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, tiers, records…"
            aria-label="Search"
            aria-controls="cmd-results"
            aria-activedescendant={activeId}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.esc}>esc</kbd>
        </div>

        <p className={styles.srOnly} role="status" aria-live="polite">
          {results.length} result{results.length === 1 ? "" : "s"}
          {copied ? ", copied to clipboard" : ""}
        </p>

        {results.length === 0 ? (
          <p className={styles.empty}>
            Nothing matches <strong>{query}</strong>. Try a skill name, a folder,
            or what you want to answer — &ldquo;why did we choose this&rdquo;.
          </p>
        ) : (
          <ul
            ref={listRef}
            id="cmd-results"
            className={styles.list}
            role="listbox"
            aria-label="Results"
          >
            {results.map((item, i) => {
              const isActive = i === active;
              return (
                <li
                  key={item.id}
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={isActive}
                  data-active={isActive}
                  className={`${styles.row} ${isActive ? styles.isActive : ""}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item, "go")}
                >
                  <span className={styles.rowMain}>
                    <span className={styles.label}>
                      {highlight(item.label, query)}
                    </span>
                    <span className={styles.detail}>{item.detail}</span>
                  </span>
                  <span className={styles.rowMeta}>
                    {copied && copied === item.copy ? (
                      <span className={styles.copied}>copied</span>
                    ) : (
                      <span className={styles.kind}>
                        {KIND_LABEL[item.kind]}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        <div className={styles.footer}>
          <span>
            <kbd>↵</kbd> go
          </span>
          {results[active]?.copy ? (
            <span>
              <kbd>{mod}</kbd>
              <kbd>↵</kbd> copy install
            </span>
          ) : null}
          {results[active]?.external ? (
            <span>
              <kbd>⇧</kbd>
              <kbd>↵</kbd> open on GitHub
            </span>
          ) : null}
          <span className={styles.footerEnd}>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
        </div>
      </div>
    </div>
  );
}
