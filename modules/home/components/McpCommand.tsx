"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties } from "react";
import CommandCopy from "@/components/global/CommandCopy";

type Agent = { label: string; command: string };

/**
 * The MCP card's command row: a copy field whose command switches with the
 * selected agent (Claude / Codex / Other), plus the agent dropdown. The
 * per-agent commands come from home.json (platform.mcp.agents).
 *
 * The menu is rendered into a portal and positioned with `fixed` coordinates
 * anchored to the trigger button. The card it lives in has `overflow: clip`
 * ancestors, which would otherwise cut the menu off at the card edge — the
 * portal lets it float above everything, like the original's top-layer popover.
 */
export default function McpCommand({ agents }: { agents: Agent[] }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = agents[selected] ?? agents[0];

  const place = () => {
    const b = buttonRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    setCoords({ top: r.bottom, left: r.left, width: r.width });
  };

  const toggle = () => {
    if (!open) place();
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const reflow = () => place();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", reflow, true);
    window.addEventListener("resize", reflow);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", reflow, true);
      window.removeEventListener("resize", reflow);
    };
  }, [open]);

  const menu =
    open && coords
      ? createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: "fixed",
              top: coords.top,
              insetInlineStart: coords.left,
              minInlineSize: coords.width,
              zIndex: 1000
            } as CSSProperties}
          >
            <div className="popover-popover-inner command-cta-popover">
              <div className="pt-8 pb-8 ps-8 pe-8 surface surfaceBase surface-surface-base">
                <ul className="flex flex-col items-stretch justify-start flex-nowrap inline-full gap-0 ps-0 mt-0 mb-0 menu-list-menu-list">
                  {agents.map((a, i) => (
                    <li key={a.label} className="menu-list-menu-list-item">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={i === selected}
                        onClick={() => {
                          setSelected(i);
                          setOpen(false);
                        }}
                        className="grid items-center inline-full gap-y-0 menu-list-menu-list-item-button menu-list-variant-primary"
                      >
                        <span className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-list-item-label menu-list-label">
                          {a.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0 dev-platform-card-cta">
      <CommandCopy command={current.command} analyticsName="dev_platform_mcp_copy" analyticsContext="platform" />
      <div ref={wrapRef} style={{ position: "relative" }}>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={toggle}
          className="semantic-typography-semantic-typography semantic-typography-variant-interaction-menu-button menu-button-menu-button menu-button-selected command-cta-menu-button"
        >
          {current.label}
          <svg
            aria-hidden="true"
            role="graphics-symbol"
            viewBox="0 0 20 20"
            style={{ width: "1em", height: "auto", display: "inline-block", fill: "inherit", flexShrink: "0", verticalAlign: "middle", transform: open ? "rotate(180deg)" : undefined } as CSSProperties}
            className="arrowChevronSingleDown menu-button-menu-marker-icon"
          >
            <path d="M9.558 13.442c.244.244.64.244.884 0l5.4-5.4a.625.625 0 0 0-.884-.884L10 12.116 5.042 7.158a.625.625 0 1 0-.884.884z" />
          </svg>
        </button>
      </div>
      {menu}
    </div>
  );
}
