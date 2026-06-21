"use client";

import { useEffect } from "react";
import home from "@/modules/home/content/home.json";

const c = home.toolDemo;

function cycleTerminalLines() {
  // NOTE: the sync-demo terminal + database are driven by SyncSection/
  // SyncDatabase. Only the tools-demo terminal remains here until ToolsSection
  // gets the same treatment.
  const sequences = [
    {
      selector: ".toolDemo_terminalLine__PpS8W",
      messages: c.terminalMessages
    }
  ];

  const timers = sequences.map((sequence) => {
    const lines = Array.from(document.querySelectorAll<HTMLElement>(sequence.selector));
    let index = 0;

    const render = () => {
      lines.forEach((line, lineIndex) => {
        const active = lineIndex === index % Math.max(lines.length, 1);
        const message = sequence.messages[index % sequence.messages.length];
        line.dataset.visible = active ? "true" : "false";
        line.style.opacity = active ? "1" : "0";
        if (active && message) {
          line.innerHTML = `<span class="shimmerText_shimmerText___M45a">${message}</span>`;
        }
      });

      index += 1;
    };

    render();
    return window.setInterval(render, 1800);
  });

  return () => timers.forEach((timer) => window.clearInterval(timer));
}

// NOTE: the footer agent-run game is rendered by components/dev/FooterGame.tsx.
// The previous hand-built canvas approximation (hydrateFooterGame) has been
// removed; recover it from git history if ever needed.

export default function DevPlatformAnimations() {
  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const stopTerminalLines = cycleTerminalLines();

    return () => {
      stopTerminalLines();
    };
  }, []);

  return null;
}
