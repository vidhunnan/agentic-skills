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

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  /** Focus returns here on close — a palette that drops focus is a keyboard trap. */
  const restoreRef = useRef<HTMLElement | null>(null);

  const index = useMemo(() => buildCommandIndex(), []);
  const results = useMemo(() => searchCommands(index, query), [index, query]);

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

  useEffect(() => {
    function isTyping(el: EventTarget | null) {
      const n = el as HTMLElement | null;
      if (!n) return false;
      const tag = n.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        n.isContentEditable
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
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open, close, show]);

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
    listRef.current
      ?.querySelector<HTMLElement>('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  useEffect(() => setActive(0), [query]);

  async function copyInstall(item: CommandItem) {
    try {
      await navigator.clipboard.writeText(item.copy);
      setCopied(item.id);
      // Stay open — copying two commands is a normal thing to want.
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      /* insecure context or denied — fail quiet, same as CopyButton */
    }
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
      case "Enter": {
        e.preventDefault();
        const item = results[active];
        if (item) copyInstall(item);
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

  const activeId = results[active] ? `cmd-${results[active].id}` : undefined;

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Find a skill and copy its install command"
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
            placeholder="Find a skill…"
            aria-label="Find a skill"
            aria-controls="cmd-results"
            aria-activedescendant={activeId}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.esc}>esc</kbd>
        </div>

        <p className={styles.srOnly} role="status" aria-live="polite">
          {results.length} skill{results.length === 1 ? "" : "s"}
          {copied ? ", install command copied to clipboard" : ""}
        </p>

        {results.length === 0 ? (
          <p className={styles.empty}>
            No skill matches <strong>{query}</strong>. Try what you want it to
            answer — &ldquo;why did we choose this&rdquo;, &ldquo;what did we
            try&rdquo;.
          </p>
        ) : (
          <ul
            ref={listRef}
            id="cmd-results"
            className={styles.list}
            role="listbox"
            aria-label="Skills"
          >
            {results.map((item, i) => {
              const isActive = i === active;
              const isCopied = copied === item.id;
              return (
                <li
                  key={item.id}
                  id={`cmd-${item.id}`}
                  role="option"
                  aria-selected={isActive}
                  data-active={isActive}
                  className={`${styles.row} ${isActive ? styles.isActive : ""}`}
                  onMouseMove={() => setActive(i)}
                  onClick={() => copyInstall(item)}
                >
                  <span className={styles.rowMain}>
                    <span className={styles.label}>
                      {highlight(item.label, query)}
                    </span>
                    <span className={styles.detail}>{item.detail}</span>
                  </span>
                  <span
                    className={isCopied ? styles.copied : styles.group}
                    aria-hidden="true"
                  >
                    {isCopied ? "copied ✓" : isActive ? "↵ copy" : item.group}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
