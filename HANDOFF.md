# Notion dev-platform 1:1 conversion — HANDOFF (read me first)

Self-contained continuation doc for a **fresh Claude Code session with no prior
context**. Read this + `CONVERSION_PLAYBOOK.md` (method details), then continue.

---

## 0. What this project is
`public/notion-mirror/dev.html` is a scraped mirror of the live page
**https://www.notion.com/product/dev**. Goal: rebuild it as a **proper Next.js
App-Router component tree** that is **pixel- and animation-exact 1:1** with the
original, reusing the original compiled CSS verbatim. After parity the user
rebrands via CSS variables in `public/tokens.css`. They reject approximations —
fidelity is the hard requirement.

`dev.html` = the original DOM with asset paths rewritten to `/notion-mirror/*`.
`dev.original.html` = same DOM, original `/front-static` `/_next` paths. Build/
compare against **dev.html**.

---

## 1. How to run & verify (do this first)
- `npm run dev` → Next dev server. A `.claude/launch.json` config named `dev`
  runs it on **:3400** (preview MCP). The user also runs their own on :3001 — same app.
- Verify with the **Claude_Preview MCP** (`preview_start` name `dev`, then
  `preview_eval`/`preview_screenshot`). NOT Bash for servers.
- The original mirror renders at **http://localhost:3400/notion-mirror/dev.html**
  (same origin → identical hashed CSS selectors → A/B compare numerically).
- **Both pages auto-scroll on load.** Always `window.scrollTo(0,0)` first and
  measure absolute coords: `r.top + window.scrollY`.
- **JS widgets only render when scrolled into view** (IntersectionObserver).
  Scroll the section into view, wait ~4s, then capture/measure.
- **Long awaiting `preview_eval`s TIME OUT (~30s).** To record an animation
  timeline, start a `setInterval` that pushes to `window.__x` and return
  immediately; read `window.__x` in a later eval.
- Set an explicit viewport: `preview_resize {width:1280,height:900}` (headless
  default reports 0×0). Pause infinite CSS anims before screenshots:
  inject `*{animation:none!important;transition:none!important}`.
- Verification = compare `getBoundingClientRect()` of key elements on rebuild vs
  mirror at matching viewports; numbers match ⇒ 1:1.

---

## 2. Two ROOT-CAUSE gotchas (both already fixed — keep in mind for new widgets)
1. **Dynamically-loaded CSS chunks.** The static HTML links only 11 CSS chunks
   (`app/layout.tsx` PAGE_STYLES); the original JS loads MORE on demand as
   components mount. Missing them ⇒ JS widgets render unstyled / wrong size.
   Already added: `8ad8ed8f553031b2` (database) + `741ca564029b831d` (chat).
   **When a new JS widget looks wrong, scroll the mirror through every section,
   then diff `[...document.styleSheets].map(s=>s.href)` vs the 11 to find the
   chunk(s) to add to layout.tsx.** NDS design tokens (`--sizing-36`,`--spacing-8`,
   `--text-body`,`--radius-4`,…) are scoped via `@scope(.nds){:scope{…}}` in base
   chunk `ec32f51b3360f9b3` (already linked) and only apply inside `.nds` subtrees.
2. **`--direction`** is registered at runtime by Notion via JS
   `CSS.registerProperty` (typed `<number>`, inherits, initial 1). It's in NO css
   file. Without it every `translate: …var(--direction)…` (connector icons,
   arrows, captions) silently drops. Replicated as `@property --direction` in
   `public/custom.css`.

---

## 3. STATUS

### DONE & verified pixel-exact 1:1
- **Shell** `app/page.tsx`: theme wrapper (`base_theme… devPlatform_palette_theme…
  theme_theme…`, `display:contents`), `globalNavigation_scrollSentinel`, `<SiteNav>`,
  `<main class="layout_layoutBase layout_xl dev_page">` (**real main has NO
  `id="top"`** — old code wrongly added it), `snackBar`, dark footer wrapper.
- **Sections, all real TSX** (original hashed class names kept verbatim):
  `components/`: `Hero.tsx`, `SiteNav.tsx`, `LogoWall.tsx`, `SyncSection.tsx`,
  `SyncDatabase.tsx`. `components/dev/`: `ToolsSection.tsx`, `WebhooksSection.tsx`,
  `WorkersSection.tsx`, `Ticker.tsx`, `ConnectorOverlay.tsx`,
  `ExternalAgentsSectionReal.tsx`, `PlatformSectionReal.tsx`, `EndcapSectionReal.tsx`,
  `Footer.tsx`, plus `ToolChat.tsx`, `SlotMachine.tsx`.
- **Sync database** (`SyncDatabase.tsx`): real `NDSDatabasePreviewContent` DOM
  (3 cols, chat icon, colored select badges). Container 486×236, cell 36px = mirror.
  Staggered row fade-in + terminal sequence driven by `SyncSection.tsx`'s captured
  timeline (intro→syncing→done at 0/1227/3206ms; "Connecting. Found 5 new
  tickets… → Syncing 5 tickets… → Done. Synced 5 tickets in 764 ms.").
- **Tool-chat** (`components/dev/ToolChat.tsx`): real `NDSChatPreviewContent`, 8
  fadeIn + 2 fadeUp items revealed on scroll, header "Thinking"→"Thought", robot
  avatars, thought rail steps, reply, PitchDeck.pptx download card. Wired into the
  active (slide-1) chat slot of `ToolsSection.tsx`.
- **Webhooks slot machine** (`components/dev/SlotMachine.tsx`, client controller
  rendered in `page.tsx`): drives the real reels in WebhooksSection — event reel
  cycles forward through the 5 triggers, action reel lands random, center label =
  webhook name per event (shipPR/cancelAccount/signOffer/signContract/issueEsc),
  ~0.85s ease-out spin / ~2.5s hold. cellH=96, 5-cell window, center slot=2.
  **Lever** (faithful to the original `en`/`O` in the dev bundle): pulls (class
  `icons_leverPulling__LtvVs` → shaft/handle pull keyframes, 0.9s) ONCE on initial
  reveal (~300ms in, silent, with the first spin) and on every CLICK (with the slot
  sound `front-static/pages/dev/slot/slot.mp3`, faded out from 720ms); a click also
  spins + resets the auto cadence. NOT pulled on the periodic auto-advance. Class
  clears on `animationend` (+ 950ms timeout fallback) so it re-arms. NOTE: the
  headless preview keeps the page `document.hidden` → the CSS animation freezes at
  currentTime 0 and timers throttle, so verify the lever by DOM/getComputedStyle
  (class added + animationName set), not by watching it move — it animates fully in
  a real visible browser.
- Removed the old approximations from `components/dev/DevPlatformAnimations.tsx`
  (hydrateSyncDatabase, hydrateToolChat, sync-terminal sequence).
- Fidelity fixes: `@property --direction` in `public/custom.css`; 2 dynamic CSS
  chunks linked in `app/layout.tsx`.

### footer agent-run game (#8) — A2 DONE ✓ ; A1 = next
User chose "reuse Notion's original game JS". **A2 is implemented & verified 1:1.**

**Why the mirror runs the game (the key insight):** `dev.html` is NOT a static
snapshot — it boots the *entire* original Notion Pages-Router app. `static-frontend
-guard.js` rewrites every `/_next/static/` + `/front-static/` URL to `/notion-mirror/*`
(so even lazy chunks load locally) and stubs analytics/auth network calls to `{}`.
The full bundle hydrates (`webpack`→`framework`→`main`→**`_app`**→`pages/product/dev`);
**`_app` mounts ALL the providers** (`IntlProvider`, theme, Statsig flags). The footer
game is SSR'd as just `<div class="agentRunGame_placeholder">LOADING…</div>`; on scroll
the page lazy-imports chunk **64204** (`AgentRunGameClient`) into
`.dev_footerGameSection__QFwm_` inside that provider tree → no IntlProvider error.
**This is exactly why the standalone `game.html` fails** (bare module, no `_app`
providers) and why A2 works (reuses `_app`'s providers wholesale).

- **A2 (DONE):** `components/dev/FooterGame.tsx` (client) — lazy-mounts a same-origin
  `<iframe src="/notion-mirror/dev.html">`, sizes it to full page height (so the inner
  game IO fires), matches its render width to our host, and `translate()`s it up so the
  inner `.dev_footerGameSection` aligns to a `overflow:hidden` crop window → only the
  real game shows, fully interactive. Mount trigger = IntersectionObserver (real users)
  **+ scroll/slow-poll proximity fallback** (IO delivery is suppressed when the page is
  backgrounded; timers still fire). Wired into `Footer.tsx` (replaced the placeholder);
  `DevPlatformAnimations.hydrateFooterGame` (old canvas approx) **deleted**.
  - **Crop target = the inner `.dev_footerGameSection` (514px), NOT the shell (450px)**
    — the section's 32px top/bottom padding comes from a CSS chunk we don't link, so
    cropping to the section reproduces it 1:1 (our outer host has 0 padding).
  - **VERIFIED (DOM measurement @1280px):** host 1265×514, real `agentRunGame_shell`+
    `agentRunGame_canvas` 1265×450, placeholder gone, full-bleed (left 0), "Click to
    play" button present, no horizontal overflow from the embed. Matches the mirror's
    section numbers exactly. Console shows only the iframe's stubbed-analytics noise
    (Statsig/Amplitude/CSP) — harmless, identical to the mirror offline.
  - **Headless verify caveat:** the preview backgrounds the page (`document.hidden`),
    pausing rAF/IO and timing out screenshots — so animated pixels + click SFX can't be
    captured here, but were proven to render on `dev.html` directly (canvas 1265×450).
- **A1 (NEXT, user wants it tried):** lighter alternative — extend `public/game.html`
  to render `AgentRunGameClient` wrapped in the REAL `<IntlProvider locale="en"
  defaultLocale="en" messages={…} onError={()=>{}}>` (+ theme/flag providers as needed)
  pulled from the bundle. Game = module **64204** (`64204.bad928abc388b73a.js`, exports
  `AgentRunGameClient`; deps 785893/667294/688624+406518/447358; react-dom createRoot =
  **620745**). `game.html` already captures `__webpack_require__` via the chunk-push
  trick `self.webpackChunk_N_E.push([["x"],{},function(req){window.__wreq=req}])` and
  resolves all modules; **blocker was** `[React Intl] Could not find required intl
  object`. Find the provider at runtime by scanning
  `__wreq.m[id].toString().includes("IntlProvider")`. If A1 works it replaces A2's heavy
  full-bundle iframe with a slim game-only iframe; if it spirals into rebuilding the
  whole `_app` provider tree, A2 already ships the real game.

### PENDING
- **Tools carousel slides 2 & 3** (data-warehouse + web-browser chats) and the
  accordion **auto-advance** are NOT built — only slide 1 (`ToolChat`) is done.
  Other 5 chat slots in `ToolsSection.tsx` still have empty placeholder divs.
- **`DevPlatformAnimations.tsx`** now drives ONLY the tool-demo terminal cycling
  (`toolDemo_terminalLine__PpS8W`, an approximation) — the footer-game canvas was
  removed (game is now real via `FooterGame.tsx`). Make the tools terminal faithful
  (capture real sequence) or fold into ToolChat, then this file can be retired.
- **Phase 3 cleanup (#9):** the page no longer uses the raw-HTML-dump machinery —
  delete `components/dev/originalHtml.ts`, `ExactOriginalSection.tsx`,
  `ExactConnectorChild.tsx`, and dump wrappers `FeatureSurface.tsx`,
  `ExternalAgentsSection.tsx`, `PlatformSection.tsx`, `EndcapSection.tsx`,
  `FooterSection.tsx` (verify nothing imports them first). Remove dead
  `.syncDatabase_*` rules from `public/custom.css` (the new SyncDatabase doesn't use
  them). Retire DevPlatformAnimations once the game + tools terminal are moved out.
- **Run `npm run build`** — never done; fix any TS/lint errors (e.g. confirm no
  controlled-input warnings; PlatformSectionReal inputs use `readOnly={true}`).
- Consider copying still-referenced assets out of `public/notion-mirror/` so the
  mirror can eventually be deleted (later cleanup phase).

---

## 4. Tooling built (in `scripts/`)
- **`scripts/html-to-jsx.mjs`** — HTML→JSX transformer. `node scripts/html-to-jsx.mjs
  <file.html> --name <Comp> --out <path.tsx> --doc "<comment>"` emits a full
  component file. Handles class→className, style→object w/ `as CSSProperties`, SVG
  camelCase, boolean attrs `={true}`, `<pre>`→dangerouslySetInnerHTML, asset paths.
- **`scripts/dump-sections.mjs`** — slices each top-level section of `dev.html` into
  `scripts/_sections/*.html` for transforming. `scripts/inspect-*.mjs` enumerate
  structure. These + `scripts/_sections/` are throwaway.

## 5. Method (per the playbook, for JS-rendered widgets)
1. Scroll the mirror to the widget, wait, capture its settled `innerHTML` (it's
   styled by the chunks in §2).
2. Reproduce as a **data-driven React component** keeping the exact NDS class names
   + inline styles (colors are original LTR values, e.g. `rgb(19,19,186)` brand,
   `rgb(203,203,239)` tint — rebrand later).
3. Capture the animation timeline with the non-blocking recorder; replay as React
   state (fadeIn→fadeInVisible etc.) gated by an IntersectionObserver. **Observe a
   SIZED element**, not the `.nds` root (it's `display:contents`, ratio 0 → IO
   never fires).
4. Remove any conflicting `innerHTML` hack from `DevPlatformAnimations.tsx`.
5. Verify rebuild vs mirror by `getBoundingClientRect()` numbers + screenshot.
