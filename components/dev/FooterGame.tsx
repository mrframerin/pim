"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Footer agent-run game — approach **A1** ("slim game-only iframe").
 *
 * Instead of embedding the whole mirror page and cropping to the game (A2), we
 * embed `public/game.html`, which boots ONLY what the game needs: the webpack
 * runtime + framework + `_app` (for its modules) + the dev-page chunk + the game
 * chunk (64204, `AgentRunGameClient`). The game calls `useIntl()`, so `game.html`
 * renders it inside react-intl's real `<IntlProvider>` (pulled from the bundle by
 * displayName) — resolving the `[React Intl] Could not find required intl object`
 * error that blocked a naive standalone mount. webpack's publicPath is baked to
 * `/vendor/_next/`, so all assets/lazy chunks resolve against the mirror.
 *
 * The game shell is `inline-size:100%` with `aspect-ratio:900/320` (desktop, the
 * footer look) — so at our full-bleed host width it renders ~1265×450, matching
 * the original. The iframe is just the game (no cropping), with 32px top/bottom
 * padding on the wrapper to reproduce the original `.dev_footerGameSection`
 * spacing (that padding lives in a CSS chunk we don't link in our app).
 */

const GAME_SRC = "/game.html";
const SHELL_SELECTOR = ".agentRunGame_shell__HAx6M";
// Original section padding (32px top + 32px bottom) around the game.
const SECTION_PAD = 32;
// Pre-measurement fallback shell height (≈ full-bleed width × 320/900).
const FALLBACK_SHELL_HEIGHT = 450;

export default function FooterGame() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);

  // Lazy-mount the game iframe only when the footer scrolls near, so the game
  // bundle isn't pulled on initial page load.
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
    // Fallback: IO delivery is tied to frame production and is suppressed when
    // the page is backgrounded. A passive scroll listener plus a slow proximity
    // poll (timers still fire when hidden) keep the mount reliable.
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

  // Once mounted, size the iframe to the rendered game shell height (the shell
  // derives its own height from its aspect-ratio at our host width).
  useEffect(() => {
    if (!mounted) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    let pollTimer = 0;
    let wheelDoc: Document | null = null;

    // The game iframe's own content can't scroll, so wheel events over it would
    // be swallowed and the user couldn't scroll the page. Same-origin lets us
    // forward wheel deltas to the parent (instant, so it stays native-feeling
    // under the page's scroll-behavior: smooth). Clicks reach the game untouched.
    const LINE_HEIGHT = 16;
    const forwardWheel = (e: WheelEvent) => {
      const factor = e.deltaMode === 1 ? LINE_HEIGHT : e.deltaMode === 2 ? window.innerHeight : 1;
      window.scrollBy({ top: e.deltaY * factor, left: e.deltaX * factor, behavior: "instant" });
    };
    const bindWheel = () => {
      const doc = iframe.contentDocument;
      if (!doc || wheelDoc === doc) return;
      wheelDoc = doc;
      doc.addEventListener("wheel", forwardWheel, { passive: true });
    };

    const sizeToShell = (): boolean => {
      const doc = iframe.contentDocument;
      if (!doc) return false;
      const shell = doc.querySelector<HTMLElement>(SHELL_SELECTOR);
      if (!shell) return false;
      const h = shell.getBoundingClientRect().height;
      if (h < 1) return false;
      iframe.style.height = `${h}px`;
      return true;
    };

    const onLoad = () => {
      bindWheel();
      let tries = 0;
      const tick = () => {
        if (cancelled) return;
        bindWheel();
        // The shell renders after the bundle boots and the game mounts; keep
        // re-measuring until it exists and is sized.
        if (!sizeToShell() && tries++ < 80) {
          pollTimer = window.setTimeout(tick, 100);
        }
      };
      tick();
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    const onResize = () => sizeToShell();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.clearTimeout(pollTimer);
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      wheelDoc?.removeEventListener("wheel", forwardWheel);
    };
  }, [mounted]);

  return (
    <div
      ref={wrapRef}
      style={{ width: "100%", padding: `${SECTION_PAD}px 0`, boxSizing: "border-box" }}
    >
      {!mounted && (
        <div
          className="agentRunGame_placeholder__5TozG"
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: FALLBACK_SHELL_HEIGHT,
            fontFamily: "monospace",
            fontSize: 12,
            letterSpacing: "0.08em",
          }}
        >
          LOADING...
        </div>
      )}
      {mounted && (
        <iframe
          ref={iframeRef}
          src={GAME_SRC}
          title="Agent run game"
          scrolling="no"
          tabIndex={0}
          style={{
            display: "block",
            width: "100%",
            height: FALLBACK_SHELL_HEIGHT,
            border: 0,
            background: "transparent",
          }}
        />
      )}
    </div>
  );
}
