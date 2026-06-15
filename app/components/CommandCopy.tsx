"use client";

import { useState } from "react";

export function CommandCopy({ context }: { context: string }) {
  const [copied, setCopied] = useState(false);
  const command = "curl -fsSL https://ntn.dev | bash";

  async function copy() {
    await navigator.clipboard?.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="command" data-context={context}>
      <input aria-label="Install command" value={command} readOnly />
      <button type="button" onClick={copy} aria-label="Copy install command">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
