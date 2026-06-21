import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Build with the Developer Platform",
  description: "Build tools, agents, and integrations on the developer platform."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Design-system styles (resets, @layer cascade, fonts, keyframes, tokens),
            then rebrand overrides in tokens.css, then app-specific styles. */}
        <link rel="stylesheet" href="/styles/site.css" />
        <link rel="stylesheet" href="/tokens.css" />
        <link rel="stylesheet" href="/custom.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
