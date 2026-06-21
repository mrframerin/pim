"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import CommandCopy from "@/components/global/CommandCopy";

type Agent = { label: string; command: string };

/**
 * The MCP card's command row: a copy field whose command switches with the
 * selected agent (Claude / Codex / Other), plus the agent dropdown. The
 * per-agent commands come from home.json (platform.mcp.agents).
 */
export default function McpCommand({ agents }: { agents: Agent[] }) {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = agents[selected] ?? agents[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="flex flex-row items-center justify-start flex-nowrap inline-auto max-inline-full gap-0 dev-platform-card-cta">
      <CommandCopy command={current.command} analyticsName="dev_platform_mcp_copy" analyticsContext="platform" />
      <div ref={wrapRef} style={{ position: "relative" }}>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((o) => !o)}
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
        {open && (
          <div style={{ position: "absolute", top: "100%", insetInlineStart: 0, zIndex: 30 }} role="menu">
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
          </div>
        )}
      </div>
    </div>
  );
}
