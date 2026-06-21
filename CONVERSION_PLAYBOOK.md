# 1:1 HTML → Next.js Conversion Playbook

How we convert each scraped section into a pixel-exact, animation-exact Next.js
(TSX) component. The principle: **the rendered page is the source of truth.**
We extract the real DOM, real CSS, and real animation timings from the running
page and reconstruct from those — 1:1 by construction, not by eye.

Rebrand happens *after* parity, by overriding CSS variables in
`public/tokens.css` (loaded last, so it wins the cascade).

---

## Architecture (already set up)

- `app/layout.tsx` — links the page's **real compiled stylesheets** verbatim
  (original order) + `public/tokens.css`. This gives byte-exact resets,
  `@layer` cascade, fonts, and keyframes.
- `app/page.tsx` — recreates the real **body wrapper structure** (theme wrapper,
  scroll sentinel, sticky nav, `main.dev_page`) so layout variables like
  `--layout-gutter` / `--layout-max` are present.
- `components/*` — one component per section, real DOM ported to TSX with the
  **original class names/ids untouched** (that's what makes the real CSS apply).
- `public/tokens.css` — the single rebrand surface (override brand variables).
- Assets/CSS currently come from `public/notion-mirror/`; a cleanup phase later
  copies what's used into the app's own assets so the mirror can be deleted.

---

## The 5-step loop (per section)

### 1. Extract the exact DOM
In the browser (preview/devtools), grab the section's `outerHTML`
(`document.querySelector('main').children[N]`). Convert to TSX:
- `class` → `className`, `for` → `htmlFor`
- inline `style="..."` → style objects (CSS custom props as string keys, cast
  `as CSSProperties`)
- self-close `img`/`input`/`source`/`path`; `srcset`→`srcSet`,
  `readonly`→`readOnly`, `fetchpriority`→`fetchPriority`, etc.
- **Keep the hashed class names exactly** (`devHeroAsset_…`, `surface_…`).

### 2. Reuse the real CSS (never rebuild it)
The stylesheets are already linked globally in `layout.tsx`, so a new section
usually needs **no new CSS**. If you ever extract rules, the matcher must
**recurse into grouping rules** (`@layer`, `@media`, `@supports`, `@container`)
— the important rules are nested inside `@layer`, not at top level.

### 3. Rebuild the real wrapper structure
Sections rely on ancestor classes for layout variables and theme palette.
Render the section inside the same `main.dev_page` wrapper. Missing wrappers =
broken spacing (this caused the early hero spacing drift).

### 4. Verify by measurement, not by looking
At the same viewport, read `getBoundingClientRect()` for key elements on **both**
the rebuild and the original, and compare the numbers:
```js
function rect(sel){var e=document.querySelector(sel);var r=e.getBoundingClientRect();
  return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};}
```
When the numbers match, it's 1:1 — provably. Check desktop + tablet + mobile.
Compare against the **deployed** original when image optimization / responsive
sources are involved (the local mirror can fall back to different assets).

### 5. Capture JS-driven motion from the live page
- CSS animations (shimmer, entrance, marquee) come free with the linked CSS.
- For JS-driven motion, **poll the original's DOM** and log every change with
  timestamps, then replay that data:
```js
// sample a value every 120ms for N seconds, record transitions with ms offsets
```
This is how we got the dev-tool status sequences, the ~1.8s step interval, and
the per-card stagger. Reproduce with a small hook/state machine.

---

## Per-section difficulty

- **Static/animated-by-CSS sections** (most feature blocks): steps 1, 3, 4 only.
- **JS-interactive sections** need extra capture (step 5):
  - Tabbed CLI/API/MCP/SDK block (tab switching + code swap)
  - Agent-run-game (slot machine + SFX)
  - Carousels / sliders

## Gotchas log (things that bit us)
- `@layer`-nested rules require recursive CSS extraction.
- Layout variables come from `main.dev_page` wrapper — don't skip it.
- Responsive `<picture>`: the deployed original may show a different image than
  the local mirror (optimizer behavior differs). Match the **deployed** look.
- Client components must import every hook they use (a missing `useEffect`
  import threw a client-side exception).
- Infinite CSS animations make screenshot tools time out — verify via DOM
  measurement instead, or pause animations before capturing.
