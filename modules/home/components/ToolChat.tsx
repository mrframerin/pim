"use client";

import { useEffect, useRef, useState } from "react";
import home from "@/modules/home/content/home.json";

const c = home.toolChat;

/*
 * The agent tool-chat in the tools demo (NDSChatPreviewContent). Uses the
 * design-system class names, styled by the chat CSS chunk linked in layout.tsx
 * (741ca564).
 * Items reveal in document order on scroll-in (fadeIn -> fadeInVisible, and the
 * reply rows fadeUp -> fadeUpVisible); the thought header reads "Thinking" until
 * the steps finish, then "Thought".
 */

const INK = "rgb(19, 19, 186)";
const TINT = "rgb(203, 203, 239)";

/** 36px pixel-robot avatar (exact original paths). */
function Robot() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M23.5 0.5V2.5H27.5V4.5H29.5V6.5H31.5V8.5H33.5V12.5H35.5V23.5H33.5V27.5H31.5V29.5H29.5V31.5H27.5V33.5H23.5V35.5H12.5V33.5H8.5V31.5H6.5V29.5H4.5V27.5H2.5V23.5H0.5V12.5H2.5V8.5H4.5V6.5H6.5V4.5H8.5V2.5H12.5V0.5H23.5Z" fill="#CBCBEF" stroke="#F6F6FC" />
      <path d="M26 28H10V26H26V28Z" fill="#1313BA" />
      <path d="M10 26H8V10H10V26Z" fill="#1313BA" />
      <path d="M28 26H26V12H28V26Z" fill="#1313BA" />
      <path d="M18 24H16V22H18V24Z" fill="#1313BA" />
      <path d="M16 22H14V19H16V22Z" fill="#1313BA" />
      <path d="M20 22H18V18H20V22Z" fill="#1313BA" />
      <path d="M14 19H12V17H14V19Z" fill="#1313BA" />
      <path d="M22 18H20V14H22V18Z" fill="#1313BA" />
      <path d="M14 15H12V12H14V15Z" fill="#1313BA" />
      <path d="M18 15H16V12H18V15Z" fill="#1313BA" />
      <path d="M24 14H22V12H24V14Z" fill="#1313BA" />
      <path d="M26 12H24V10H26V12Z" fill="#1313BA" />
      <path d="M24 10H10V8H24V10Z" fill="#1313BA" />
      <path d="M28 10H26V8H28V10Z" fill="#1313BA" />
    </svg>
  );
}

/** "Pitch deck" link chip (paper-plane noticon + underlined label). */
function PitchLink() {
  return (
    <span className="nds-chat-preview-content-link-segment" style={{ color: INK }}>
      <span className="nds-chat-preview-content-link-noticon">
        <svg height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" className="notion-icon-svg-wrapper-icon">
          <path d="M15 11.25V15h-1.25l-1.875-1.875V15h-3.75v-1.875L6.25 15H5v-3.75l3.125-3.125v-3.75c0-2.119.719-3.125 1.875-3.125s1.875 1.006 1.875 3.125v3.75zm-5 4.688c-.69 0-1.25.559-1.25 1.25 0 .69.331 1.056 1.25 2.187.919-1.131 1.25-1.497 1.25-2.187 0-.691-.56-1.25-1.25-1.25" fill="currentColor" />
        </svg>
      </span>
      <span className="nds-chat-preview-content-body-medium nds-chat-preview-content-link-text" style={{ textDecorationColor: TINT }}>
        {c.pitchLinkLabel}
      </span>
    </span>
  );
}

function Rail({ topHidden = false, bottomHidden = false }: { topHidden?: boolean; bottomHidden?: boolean }) {
  const line = (hidden: boolean) =>
    `${hidden ? "nds-chat-preview-content-thought-rail-line-hidden " : ""}nds-chat-preview-content-thought-rail-line`;
  return (
    <div className="nds-chat-preview-content-thought-rail">
      <div className={line(topHidden)} style={{ backgroundColor: TINT }} />
      <div className="nds-chat-preview-content-thought-rail-gap" />
      <div className="nds-chat-preview-content-thought-dot" style={{ backgroundColor: TINT }} />
      <div className="nds-chat-preview-content-thought-rail-gap" />
      <div className={line(bottomHidden)} style={{ backgroundColor: TINT }} />
    </div>
  );
}

const Connector = () => (
  <div className="nds-chat-preview-content-thought-step-connector-rail">
    <div className="nds-chat-preview-content-thought-step-connector-line" style={{ backgroundColor: TINT }} />
  </div>
);

/** Reveal offsets (ms from scroll-in) for the 10 staged items. */
const OFFSETS = [200, 700, 1200, 1500, 2000, 2300, 2800, 3500, 3900, 4300];

export default function ToolChat() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // .nds root is display:contents (no box), so observe the sized container.
    const target = el.querySelector(".nds-chat-preview-content-container") ?? el;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(OFFSETS.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let started = false;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            OFFSETS.forEach((ms, i) => timers.push(setTimeout(() => setRevealed(i + 1), ms)));
            io.disconnect();
          }
        }),
      { threshold: 0.3 }
    );
    io.observe(target);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  const fadeIn = (i: number) =>
    `nds-chat-preview-content-fade-in${i < revealed ? " nds-chat-preview-content-fade-in-visible" : ""}`;
  const fadeUp = (i: number) =>
    `nds-chat-preview-content-fade-up${i < revealed ? " nds-chat-preview-content-fade-up-visible" : ""}`;
  const thinking = revealed < 7;

  return (
    <div ref={rootRef} className="nds nds-island-provider-root" data-display-mode="light">
      <div className="nds-chat-preview-content-container" style={{ color: INK, backgroundColor: "rgb(255, 255, 255)" }}>
        {/* 0 — user prompt */}
        <div className={fadeIn(0)}>
          <div className="nds-chat-preview-content-fade-clip">
            <div className="nds-chat-preview-content-user-row">
              <div className="nds-chat-preview-content-user-bubble" style={{ backgroundColor: "rgb(246, 246, 252)", color: INK }}>
                <span className="nds-chat-preview-content-body-regular">{c.userPromptBefore}</span>
                <PitchLink />
                <span className="nds-chat-preview-content-body-regular">{c.userPromptAfter}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1 — agent thought (with nested steps 2-6) */}
        <div className={fadeIn(1)}>
          <div className="nds-chat-preview-content-fade-clip nds-chat-preview-content-chat-item-spacing">
            <div className="nds-chat-preview-content-agent-row">
              <div className="nds-chat-preview-content-agent-icon-slot"><Robot /></div>
              <div className="nds-chat-preview-content-thought-container" style={{ color: "rgba(19, 19, 186, 0.66)" }}>
                <div className="nds-chat-preview-content-thought-header-row">
                  <span className={`nds-chat-preview-content-body-regular${thinking ? " nds-shimmer-text" : ""}`}>
                    {thinking ? c.thinkingLabel : c.thoughtLabel}
                  </span>
                  <span className="nds-chat-preview-content-thought-header-chevron">
                    <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="arrowChevronSingleDown" style={{ width: "14px", height: "14px", display: "block", fill: "currentcolor", flexShrink: 0 }}>
                      <path d="M9.558 13.442c.244.244.64.244.884 0l5.4-5.4a.625.625 0 0 0-.884-.884L10 12.116 5.042 7.158a.625.625 0 1 0-.884.884z" />
                    </svg>
                  </span>
                </div>
                <div className="nds-chat-preview-content-thought-steps">
                  <div className={fadeIn(2)}>
                    <div className="nds-chat-preview-content-fade-clip nds-chat-preview-content-thought-step">
                      <Rail topHidden />
                      <div>
                        <span className="nds-chat-preview-content-body-regular">{c.stepLoadedPage}</span>
                        <PitchLink />
                      </div>
                    </div>
                  </div>
                  <div className={fadeIn(3)}>
                    <div className="nds-chat-preview-content-fade-clip nds-chat-preview-content-thought-step-connector"><Connector /></div>
                  </div>
                  <div className={fadeIn(4)}>
                    <div className="nds-chat-preview-content-fade-clip nds-chat-preview-content-thought-step">
                      <Rail />
                      <div>
                        <span className="nds-chat-preview-content-body-regular">{c.stepCalledTool}</span>
                        <span className="nds-chat-preview-content-body-medium" style={{ color: INK }}>{c.stepToolName}</span>
                      </div>
                    </div>
                  </div>
                  <div className={fadeIn(5)}>
                    <div className="nds-chat-preview-content-fade-clip nds-chat-preview-content-thought-step-connector"><Connector /></div>
                  </div>
                  <div className={fadeIn(6)}>
                    <div className="nds-chat-preview-content-fade-clip nds-chat-preview-content-thought-step">
                      <Rail bottomHidden />
                      <div>
                        <span className="nds-chat-preview-content-body-regular">{c.stepFinalized}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7 — agent reply + download (rows 8-9 fadeUp) */}
        <div className={fadeIn(7)}>
          <div className="nds-chat-preview-content-fade-clip nds-chat-preview-content-chat-item-spacing">
            <div className="nds-chat-preview-content-agent-row">
              <div className="nds-chat-preview-content-agent-icon-slot"><Robot /></div>
              <div className="nds-chat-preview-content-response-column">
                <div className={`nds-chat-preview-content-response-step-row ${fadeUp(8)}`}>
                  <div className="nds-chat-preview-content-fade-clip">
                    <span className="nds-chat-preview-content-body-regular">{c.replyText}</span>
                  </div>
                </div>
                <div className={`nds-chat-preview-content-response-step-row ${fadeUp(9)}`}>
                  <div className="nds-chat-preview-content-fade-clip">
                    <div className="nds-chat-preview-content-card-outer" style={{ borderColor: "rgba(203, 203, 239, 0.44)", backgroundColor: "rgb(255, 255, 255)" }}>
                      <div className="nds-chat-preview-content-card-column">
                        <div>
                          <span className="nds-chat-preview-content-body-regular">{c.cardCreatedLabel}</span>
                          <span className="nds-chat-preview-content-body-medium" style={{ color: INK }}>{c.cardFileName}</span>
                        </div>
                        <span className="nds-chat-preview-content-card-badge" style={{ backgroundColor: "rgba(203, 203, 239, 0.44)", color: INK }}>{c.cardBadgeLabel}</span>
                      </div>
                      <div className="nds-chat-preview-content-card-icon-slot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48">
                          <path fill="#cbcbef" d="m27.3 25.38-2.25-16.5h-.168c-8.182.025-14.808 6.651-14.832 14.833v.168z" />
                          <path fill="#f6f6fc" d="M25.218 8.88h-.168v15l7.5 3 7.5-3v-.167C40.026 15.53 33.4 8.905 25.218 8.88" />
                          <path fill="#1313ba" fillOpacity=".66" d="M40.05 23.88v.166c-.024 8.183-6.652 14.811-14.835 14.835h-.33c-8.184-.024-14.812-6.652-14.835-14.835v-.165z" />
                          <path fill="#1313ba" d="M25.8 16.253v16.005a1.38 1.38 0 0 1-1.373 1.373H13.59a11 11 0 0 1-.6-.75 14.7 14.7 0 0 1-2.94-8.835v-.33a14.67 14.67 0 0 1 2.415-8.085c.165-.255.337-.51.525-.75h11.437a1.383 1.383 0 0 1 1.373 1.372" opacity=".1" />
                          <path fill="#1313ba" d="M25.05 17.003v16.005a1.38 1.38 0 0 1-1.373 1.372h-9.405a13 13 0 0 1-.682-.75 11 11 0 0 1-.6-.75 14.7 14.7 0 0 1-2.94-8.834v-.33a14.67 14.67 0 0 1 2.415-8.085h11.212a1.383 1.383 0 0 1 1.373 1.372" opacity=".2" />
                          <path fill="#1313ba" d="M25.05 17.003v14.505a1.383 1.383 0 0 1-1.373 1.373H12.99a14.7 14.7 0 0 1-2.94-8.835v-.33a14.67 14.67 0 0 1 2.415-8.085h11.212a1.383 1.383 0 0 1 1.373 1.372" opacity=".2" />
                          <path fill="#1313ba" d="M24.3 17.003v14.505a1.383 1.383 0 0 1-1.373 1.373H12.99a14.7 14.7 0 0 1-2.94-8.835v-.33a14.67 14.67 0 0 1 2.415-8.085h10.462a1.383 1.383 0 0 1 1.373 1.372" opacity=".2" />
                          <path fill="#1313ba" d="M9.175 15.63h13.75c.76 0 1.375.616 1.375 1.376v13.75c0 .76-.616 1.375-1.375 1.375H9.175c-.76 0-1.375-.616-1.375-1.375v-13.75c0-.76.615-1.375 1.375-1.375" />
                          <path fill="#fff" d="M16.2 19.298a3.78 3.78 0 0 1 2.503.733 2.62 2.62 0 0 1 .872 2.125c.01.56-.14 1.11-.43 1.588-.294.47-.718.844-1.22 1.078a4.14 4.14 0 0 1-1.836.386H14.35v3.232H12.57v-9.142zm-1.851 4.513h1.533a2 2 0 0 0 1.355-.404 1.5 1.5 0 0 0 .458-1.183q0-1.51-1.756-1.511h-1.59z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
