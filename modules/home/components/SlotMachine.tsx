"use client";

import { useEffect } from "react";

import home from "@/modules/home/content/home.json";

/*
 * Drives the webhooks slot machine (reels rendered statically in
 * WebhooksSection): the event reel cycles forward through the 5 triggers, the
 * action reel lands on a random action, the center label shows that trigger's
 * webhook name; ~0.85s ease-out spin + ~2.5s hold. Animates via transform on
 * .reelTrack and .cellActive on the centred cell.
 *
 * Lever: the lever pulls — class `icons_leverPulling__LtvVs`, which runs the shaft/handle
 * pull keyframes — ONCE on initial reveal (with the first spin, silent) and on
 * every manual click (with the slot sound). It does NOT pull on the periodic
 * auto-advance. `animationend` clears the class so it can replay. A click also
 * triggers an immediate spin and resets the auto-cycle timer.
 */

const c = home.slotMachine;

// Event reel order (5) -> webhook name shown in the center label.
const HOOKS = c.hooks;
const N_EVENTS = 5;
const N_ACTIONS = 10;
const CELL = 96;
const CENTER = 2; // centre slot index within the 5-cell window
const SPIN_MS = 850;
const HOLD_MS = 2500;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const ACTIVE = "slotMachine_cellActive__20Hi5";
const LEVER = "icons_lever__2zQae";
const PULLING = "icons_leverPulling__LtvVs";
const SLOT_SOUND = c.slotSound;
const INITIAL_PULL_MS = 300; // original pulls the lever ~300ms after the section enters view

export default function SlotMachine() {
  useEffect(() => {
    const sm = document.querySelector<HTMLElement>(".slotMachine_slotMachine__USLkJ");
    if (!sm) return;
    const tracks = Array.from(sm.querySelectorAll<HTMLElement>(".slotMachine_reelTrack__J2uLL"));
    if (tracks.length < 2) return;
    const [eventTrack, actionTrack] = tracks;
    const eventCells = Array.from(eventTrack.children) as HTMLElement[];
    const actionCells = Array.from(actionTrack.children) as HTMLElement[];
    const tool = sm.querySelector<HTMLElement>(".slotMachine_centerLabelTool__EQBFd");
    const lever = sm.querySelector<HTMLButtonElement>(`.${LEVER}`);

    let posE = 20;
    let posA = 20;
    let evt = 0;
    let stopped = false;
    let spinning = false;
    let autoTimer = 0;
    let pullClearTimer = 0;
    const timers: number[] = [];

    const place = (track: HTMLElement, gi: number, animate: boolean) => {
      track.style.transition = animate ? `transform ${SPIN_MS}ms ${EASE}` : "none";
      track.style.transform = `translateY(${-(gi - CENTER) * CELL}px)`;
    };
    const setActive = (cells: HTMLElement[], gi: number) => {
      cells.forEach((c) => c.classList.remove(ACTIVE));
      cells[gi]?.classList.add(ACTIVE);
    };
    // smallest index >= pos + whir that lands on `target` (mod), keeps spinning forward
    const advance = (pos: number, mod: number, target: number, whir: number) => {
      let gi = pos + whir;
      while (gi % mod !== target) gi += 1;
      return gi;
    };
    // wrap back by whole cycles once near the end of the reel (content repeats, so invisible)
    const wrap = (track: HTMLElement, pos: number, len: number, mod: number) => {
      if (pos <= len - 8) return pos;
      const np = pos - Math.floor((pos - 8) / mod) * mod;
      place(track, np, false);
      return np;
    };

    // Lever pull animation — add the class, restart if mid-animation. The class
    // is cleared on animationend (primary, fires at the 0.9s mark) with a timeout
    // fallback so the lever always re-arms even if the event is missed.
    const clearPull = () => {
      window.clearTimeout(pullClearTimer);
      lever?.classList.remove(PULLING);
    };
    const pullLever = () => {
      if (!lever) return;
      window.clearTimeout(pullClearTimer);
      lever.classList.remove(PULLING);
      void lever.offsetWidth; // force reflow so the animation can restart
      lever.classList.add(PULLING);
      pullClearTimer = window.setTimeout(clearPull, 950);
    };
    lever?.addEventListener("animationend", clearPull);

    // Slot sound: play at full volume, fade out starting at 720ms (−0.1 / 20ms), then stop.
    const playSlotSound = () => {
      try {
        const audio = new Audio(SLOT_SOUND);
        audio.volume = 1;
        let fadeInterval = 0;
        const reset = () => {
          window.clearTimeout(fadeTimeout);
          if (fadeInterval) window.clearInterval(fadeInterval);
        };
        const fadeTimeout = window.setTimeout(() => {
          fadeInterval = window.setInterval(() => {
            audio.volume = Math.max(0, audio.volume - 0.1);
            if (audio.volume <= 0) {
              reset();
              audio.pause();
              audio.currentTime = 0;
            }
          }, 20);
        }, 720);
        audio.addEventListener("ended", reset, { once: true });
        void audio.play().catch(() => {});
      } catch {
        /* autoplay blocked or Audio unavailable — ignore */
      }
    };

    // One spin: advance both reels, optionally pull the lever / play the sound.
    const spin = ({ pull = false, sound = false } = {}) => {
      if (stopped || spinning) return;
      spinning = true;
      evt = (evt + 1) % N_EVENTS;
      const act = Math.floor(Math.random() * N_ACTIONS);
      posE = advance(posE, N_EVENTS, evt, 7);
      posA = advance(posA, N_ACTIONS, act, 9);
      place(eventTrack, posE, true);
      place(actionTrack, posA, true);
      if (pull) pullLever();
      if (sound) playSlotSound();
      timers.push(
        window.setTimeout(() => {
          posE = wrap(eventTrack, posE, eventCells.length, N_EVENTS);
          posA = wrap(actionTrack, posA, actionCells.length, N_ACTIONS);
          setActive(eventCells, posE);
          setActive(actionCells, posA);
          if (tool) tool.textContent = `(${HOOKS[evt]})`;
          spinning = false;
        }, SPIN_MS + 40)
      );
    };

    // Auto-advance loop (no lever pull, no sound).
    const scheduleAuto = () => {
      window.clearTimeout(autoTimer);
      autoTimer = window.setTimeout(() => {
        spin();
        scheduleAuto();
      }, SPIN_MS + HOLD_MS);
    };

    // Manual lever pull: animate + spin + sound, then restart the auto cadence.
    const onLeverClick = () => {
      if (stopped || spinning || lever?.classList.contains(PULLING)) return;
      pullLever();
      spin({ sound: true });
      scheduleAuto();
    };
    lever?.addEventListener("click", onLeverClick);

    // initial settled state
    place(eventTrack, posE, false);
    place(actionTrack, posA, false);
    setActive(eventCells, posE);
    setActive(actionCells, posA);
    if (tool) tool.textContent = `(${HOOKS[evt]})`;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let started = false;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            if (reducedMotion) return;
            // initial lever pull + first spin (silent), then begin auto-cycling
            timers.push(
              window.setTimeout(() => {
                spin({ pull: true });
                scheduleAuto();
              }, INITIAL_PULL_MS)
            );
          }
        }),
      { threshold: 0.3 }
    );
    io.observe(sm);

    return () => {
      stopped = true;
      io.disconnect();
      window.clearTimeout(autoTimer);
      window.clearTimeout(pullClearTimer);
      timers.forEach(clearTimeout);
      lever?.removeEventListener("click", onLeverClick);
      lever?.removeEventListener("animationend", clearPull);
    };
  }, []);

  return null;
}
