"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

const CLIPBOARD_PATH =
  "M11.5 1.5c.768 0 1.41.534 1.58 1.25h.67c1.174 0 2.125.951 2.125 2.125v10.5A2.125 2.125 0 0 1 13.75 17.5h-7.5a2.125 2.125 0 0 1-2.125-2.125v-10.5c0-1.174.951-2.125 2.125-2.125h.67c.17-.716.812-1.25 1.58-1.25zM6.25 4a.875.875 0 0 0-.875.875v10.5c0 .483.392.875.875.875h7.5a.875.875 0 0 0 .875-.875v-10.5A.875.875 0 0 0 13.75 4h-.67a1.626 1.626 0 0 1-1.58 1.25h-3c-.768 0-1.41-.534-1.58-1.25zM8.5 2.75a.375.375 0 0 0-.375.375v.5c0 .207.168.375.375.375h3a.375.375 0 0 0 .375-.375v-.5a.375.375 0 0 0-.375-.375z";

type Props = {
  command: string;
  analyticsName?: string;
  analyticsContext?: string;
};

/**
 * A read-only command field with a copy button. Clicking copies the command to
 * the clipboard and briefly shows "Copied!" in THIS field only (scoped per
 * instance). Adds the overflow-fade modifier when the command is wider than the
 * field, matching the original behaviour.
 */
export default function CommandCopy({ command, analyticsName, analyticsContext }: Props) {
  const [copied, setCopied] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const check = () => setOverflowing(el.scrollWidth > el.clientWidth + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [command]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(command).catch(() => {});
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="pt-8 pb-8 ps-16 pe-48 surface surfaceAccent surface-surface-accent command-cta-command-container">
      <div className={`command-cta-command-mask${overflowing ? " command-cta-is-overflowing" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          readOnly
          aria-label="Install command"
          spellCheck={false}
          autoComplete="off"
          className="command-cta-command"
          value={copied ? "Copied!" : command}
        />
      </div>
      <button
        title={copied ? "Copied!" : "Copy to clipboard"}
        type="button"
        aria-label="Copy to clipboard"
        onClick={copy}
        className="icon-button-icon-button icon-button-background-size-fill command-cta-copy-button"
        data-analytics-name={analyticsName}
        data-analytics-context={analyticsContext}
      >
        <span aria-hidden="true" className="icon-button-icon">
          <span
            className="graphic-graphic command-cta-clipboard-icon"
            style={{ "--graphic-icon-size": "var(--dimension-spacing-20)" } as CSSProperties}
          >
            <svg
              aria-hidden="true"
              role="graphics-symbol"
              viewBox="0 0 20 20"
              style={{ width: "100%", height: "100%", display: "block", fill: "inherit", flexShrink: "0" } as CSSProperties}
              className="clipboard"
            >
              <path d={CLIPBOARD_PATH} />
            </svg>
          </span>
        </span>
        <span aria-hidden="true" className="icon-button-focus-ring" />
      </button>
    </div>
  );
}
