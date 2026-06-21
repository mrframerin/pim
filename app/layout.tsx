import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Build with the Developer Platform",
  description: "Exact 1:1 recreation rebuilt as a Next.js component tree."
};

/*
 * The page's original compiled stylesheets, loaded verbatim so the recreated
 * DOM matches 1:1 (resets, @layer order, fonts, keyframes all preserved).
 * url() references inside them resolve under /vendor/ which is served
 * from public/. Rebrand later by overriding the CSS custom properties
 * (design tokens) in app/tokens.css — see that file.
 *
 * Order matters (cascade); this is the exact order dev.html links them.
 */
const PAGE_STYLES = [
  "ac65860a9aeeaaf7",
  "94892b9a79ccabf3",
  "d8d4aca52a52fdd4",
  "8d863ea59d112cb3",
  "7273fcb60fdde4f3",
  "0a5ce03fb1063ef0",
  "ec32f51b3360f9b3",
  "b7d43c5e3eac98e1",
  "e5043d4403a0fb6e",
  "25a0c6d2da3f048d",
  "a0a0ab254c58ee78",
  // Code-split component stylesheets the original loads on demand (NDS design
  // system): database preview (8ad8ed8f) + chat preview (741ca564). Needed for
  // the sync database and tool-chat to render 1:1.
  "8ad8ed8f553031b2",
  "741ca564029b831d"
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {PAGE_STYLES.map((id) => (
          <link
            key={id}
            rel="stylesheet"
            href={`/vendor/_next/static/css/${id}.css`}
          />
        ))}
        <link rel="stylesheet" href="/tokens.css" />
        <link rel="stylesheet" href="/custom.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
