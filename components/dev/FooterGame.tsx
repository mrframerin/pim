"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Footer agent-run game — approach **A2** ("iframe the real boot").
 *
 * The scraped mirror `public/notion-mirror/dev.html` is not a static snapshot:
 * it boots the *entire* original Notion Pages-Router app (webpack → framework →
 * `_app` → `pages/product/dev`). `_app` mounts all the providers the game needs
 * (`IntlProvider`, theme, feature flags), and the page lazy-imports the game
 * chunk (`AgentRunGameClient`, webpack module 64204) into
 * `.dev_footerGameSection__QFwm_` when it scrolls into view — replacing the
 * `LOADING…` placeholder with the real `agentRunGame_shell` + `<canvas>` + SFX.
 *
 * So instead of re-mounting the bare game module ourselves (which throws
 * `[React Intl] Could not find required intl object` because it has no provider
 * tree — see approach A1), we embed the mirror in a same-origin iframe and crop
 * the viewport down to just the game shell. The actual original game runs 1:1.
 *
 * Mechanics:
 *  - Lazy-mount the (heavy) iframe only once the footer scrolls near, so the
 *    full mirror bundle isn't loaded on initial page load.
 *  - Size the iframe to the mirror's full page height so the whole document is
 *    "in view" → the game's IntersectionObserver fires and it renders.
 *  - Match the iframe's render width to our host width so the game lays out at
 *    the identical width (the canvas sizes to its container).
 *  - Translate the iframe up by the shell's offset and clip with an
 *    `overflow:hidden` wrapper, so only the game is visible and interactive.
 */

const MIRROR_SRC = "/notion-mirror/dev.html";
const SHELL_SELECTOR = ".agentRunGame_shell__HAx6M";
const SECTION_SELECTOR = ".dev_footerGameSection__QFwm_";
// SSR/initial fallback height before the iframe game renders and we measure the
// real section. The original section is 32px padding + 450px game + 32px = 514.
const FALLBACK_HEIGHT = 514;

export default function FooterGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);

  // Lazy-mount the mirror iframe only when the footer game scrolls near, so we
  // don't pull the full original bundle on initial page load.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let done = false;
    const near = () => {
      const r = wrap.getBoundingClientRect();
      return r.top < window.innerHeight + 800 && r.bottom > -800;
    };
    const mount = () => {
      if (done) return;
      done = true;
      cleanup();
      setMounted(true);
    };

    // Primary trigger for real (visible) users: IntersectionObserver.
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) mount();
        },
        { rootMargin: "800px 0px" }
      );
      io.observe(wrap);
    }
    // Fallback: IO callback delivery is tied to frame production and is
    // suppressed when the page is backgrounded. A passive scroll listener plus
    // a slow proximity poll (timers still fire when hidden) keep the mount
    // reliable in those environments.
    const onScroll = () => near() && mount();
    window.addEventListener("scroll", onScroll, { passive: true });
    const poll = window.setInterval(() => near() && mount(), 500);
    if (near()) mount();

    function cleanup() {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(poll);
    }
    return cleanup;
  }, []);

  // Once mounted, position the iframe so only the game shell shows, cropped 1:1.
  useEffect(() => {
    if (!mounted) return;
    const iframe = iframeRef.current;
    const wrap = wrapRef.current;
    if (!iframe || !wrap) return;

    let cancelled = false;
    let pollTimer = 0;

    const position = (): boolean => {
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      if (!win || !doc) return false;

      // Match the iframe's render width to our host so the game lays out at the
      // same width, then size it to the full page so the game is "in view".
      const targetWidth = wrap.clientWidth;
      if (targetWidth > 0) iframe.style.width = `${targetWidth}px`;
      const fullHeight = doc.documentElement.scrollHeight;
      if (fullHeight > 0) iframe.style.height = `${fullHeight}px`;
      win.scrollTo(0, 0); // keep content pinned (the mirror auto-scrolls on load)

      // Gate on the game shell existing (it lazy-renders after `_app` hydrates
      // and the section is in view), but crop to the *section* — it carries the
      // original 32px top/bottom padding (from a dynamically-loaded CSS chunk we
      // don't link in our layout), so cropping to it reproduces the full 514px
      // section 1:1 rather than just the 450px game.
      const shell = doc.querySelector<HTMLElement>(SHELL_SELECTOR);
      const section = doc.querySelector<HTMLElement>(SECTION_SELECTOR);
      if (!shell || !section) return false;

      const rect = section.getBoundingClientRect();
      if (rect.height < 1) return false;

      const top = rect.top + win.scrollY;
      const left = rect.left + win.scrollX;
      iframe.style.transform = `translate(${-left}px, ${-top}px)`;
      wrap.style.height = `${rect.height}px`;
      return true;
    };

    const onLoad = () => {
      let tries = 0;
      const tick = () => {
        if (cancelled) return;
        const ok = position();
        // The game renders lazily after `_app` hydrates and the section is in
        // view; keep re-positioning until the shell exists and is sized.
        if (!ok && tries++ < 80) {
          pollTimer = window.setTimeout(tick, 100);
        }
      };
      tick();
    };

    iframe.addEventListener("load", onLoad);
    // In case the iframe already fired load before this effect ran.
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    const onResize = () => position();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.clearTimeout(pollTimer);
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted]);

  return (
    <div
      ref={wrapRef}
      style={{ position: "relative", width: "100%", height: FALLBACK_HEIGHT, overflow: "hidden" }}
    >
      {!mounted && (
        <div className="agentRunGame_placeholder__5TozG" aria-hidden="true">
          LOADING...
        </div>
      )}
      {mounted && (
        <iframe
          ref={iframeRef}
          src={MIRROR_SRC}
          title="Agent run game"
          scrolling="no"
          tabIndex={0}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            border: 0,
            width: "100%",
            height: FALLBACK_HEIGHT,
            background: "transparent",
            transformOrigin: "top left",
          }}
        />
      )}
    </div>
  );
}
