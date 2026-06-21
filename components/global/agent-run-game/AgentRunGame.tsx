"use client";

import { useEffect, useRef } from "react";
import {
  PALETTE,
  TITLE_PALETTE,
  CLOUD_PALETTE,
  FACES,
  OBSTACLES,
  CLOUD,
  AGENT_FRAMES,
  SPARK,
  COIN_PICKUP,
  CHIP,
  TITLE,
  CONSTANTS as K,
  type SpriteDef,
} from "./sprites";

/*
 * "ntn run" — a small pixel-art endless-runner rendered to a <canvas>. Native
 * React + Canvas2D + Web Audio implementation. Sprite art, palette, physics
 * constants, scoring, and SFX are in ./sprites.ts. Drawing happens in a fixed
 * logical coordinate space (900x320 desktop / 450x320 mobile); a single
 * setTransform maps it onto the DPR-scaled backing store.
 */

const SFX_BASE = "/vendor/front-static/pages/dev/agent-run-game/sfx";
const SFX = {
  jump: `${SFX_BASE}/jump.ogg`,
  pickup: `${SFX_BASE}/pickup.ogg`,
  hit: `${SFX_BASE}/hit.ogg`,
  power: `${SFX_BASE}/power.ogg`,
};
function playSound(url: string) {
  try {
    const a = new Audio(url);
    a.play().catch(() => {});
  } catch {
    /* no-op */
  }
}

/** Bake a sprite definition to an offscreen canvas at integer `scale`. */
function bake(def: SpriteDef, scale: number, palette: Record<string, string>): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = def.w * scale;
  c.height = def.h * scale;
  const g = c.getContext("2d")!;
  g.imageSmoothingEnabled = false;
  for (let y = 0; y < def.h; y++) {
    const row = def.rows[y] ?? "";
    for (let x = 0; x < def.w; x++) {
      const color = palette[row[x] ?? ""];
      if (color !== undefined) {
        g.fillStyle = color;
        g.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
  return c;
}

type Coin = { x: number; y: number; width: number; height: number; vy: number; grounded: boolean; flip: number };
type Tile = { key: string; dx: number; dy: number };
type Obstacle = { x: number; y: number; width: number; height: number; tiles: Tile[] };
type Mover = { x: number; y: number; width: number; height: number };
type Confetti = { x: number; y: number; vx: number; vy: number; life: number; age: number; size: number; color: string };
type Popup = { x: number; y: number; age: number; text: string };

type Game = {
  coin: Coin;
  obstacles: Obstacle[];
  pickups: Mover[];
  chips: Mover[];
  confetti: Confetti[];
  popups: Popup[];
  clouds: { x: number; y: number; speed: number }[];
  speed: number;
  distance: number;
  score: number;
  scoreBonus: number;
  spawnTimer: number;
  spawnCount: number;
  pickupCount: number;
  chipCount: number;
  agentScaleBonus: number;
  started: boolean;
  running: boolean;
};

function newGame(W: number): Game {
  return {
    coin: { x: 72, y: 195, width: 48, height: 51, vy: 0, grounded: true, flip: 0 },
    obstacles: [],
    pickups: [],
    chips: [],
    confetti: [],
    popups: [],
    clouds: [
      { x: 0.178 * W, y: 72, speed: K.cloudSpeeds[0] },
      { x: 0.578 * W, y: 46, speed: K.cloudSpeeds[1] },
      { x: 0.867 * W, y: 86, speed: K.cloudSpeeds[2] },
    ],
    speed: K.initialSpeed,
    distance: 0,
    score: 0,
    scoreBonus: 0,
    spawnTimer: K.spawnTimerInit,
    spawnCount: 0,
    pickupCount: 0,
    chipCount: 0,
    agentScaleBonus: 0,
    started: false,
    running: true,
  };
}

const OBSTACLE_KEYS = Object.keys(OBSTACLES);

function spawnObstacle(g: Game, W: number) {
  const pick = () => OBSTACLE_KEYS[(Math.random() * OBSTACLE_KEYS.length) | 0]!;
  const r = Math.random();
  let tiles: Tile[];
  let width: number;
  let height: number;
  const jx = () => Math.round((Math.random() - 0.5) * 10); // ±5
  if (r < 0.35) {
    tiles = [{ key: pick(), dx: 0, dy: 0 }];
    width = 32; height = 32;
  } else if (r < 0.6) {
    tiles = [{ key: pick(), dx: jx(), dy: 0 }, { key: pick(), dx: 0, dy: 32 }];
    width = 32; height = 64;
  } else if (r < 0.78) {
    tiles = [{ key: pick(), dx: jx(), dy: 0 }, { key: pick(), dx: jx(), dy: 32 }, { key: pick(), dx: jx(), dy: 64 }];
    width = 32; height = 96;
  } else if (r < 0.92) {
    tiles = [{ key: pick(), dx: 0, dy: 32 }, { key: pick(), dx: 32, dy: 32 }, { key: pick(), dx: 16, dy: 0 }];
    width = 64; height = 64;
  } else if (r < 0.96) {
    tiles = [{ key: pick(), dx: 0, dy: 0 }, { key: pick(), dx: 32, dy: 0 }, { key: pick(), dx: 64, dy: 0 }];
    width = 96; height = 32;
  } else {
    tiles = [
      { key: pick(), dx: 0, dy: 0 }, { key: pick(), dx: 32, dy: 0 },
      { key: pick(), dx: 0, dy: 32 }, { key: pick(), dx: 32, dy: 32 },
    ];
    width = 64; height = 64;
  }
  g.obstacles.push({ x: W + 32, y: K.groundBaseline - height, width, height, tiles });
  g.spawnCount += 1;
  if (g.spawnCount % K.pickupSpawnEvery === 0) g.pickups.push({ x: W + 96, y: 166, width: 32, height: 32 });
  if (g.spawnCount % K.chipSpawnEvery === 0) g.chips.push({ x: W + 160, y: 206, width: 32, height: 32 });
}

function overlaps(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

type Props = { analyticsName?: string };

export default function AgentRunGame({ analyticsName = "dev_platform_game_start" }: Props) {
  const shellRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const jumpRef = useRef<(() => void) | null>(null);
  const releaseRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Logical size (desktop vs mobile).
    const mq = window.matchMedia(K.mobileMediaQuery);
    let W = K.canvasDesktop.w;
    let H = K.canvasDesktop.h;
    const dims = () => {
      W = mq.matches ? K.canvasMobile.w : K.canvasDesktop.w;
      H = mq.matches ? K.canvasMobile.h : K.canvasDesktop.h;
    };
    dims();

    // Bake sprites.
    const faces = FACES.map((f) => bake(f, 3, PALETTE));
    const obstacleSprites: Record<string, HTMLCanvasElement> = {};
    for (const k of OBSTACLE_KEYS) obstacleSprites[k] = bake(OBSTACLES[k]!, 2, PALETTE);
    const cloudImg = bake(CLOUD, 5, CLOUD_PALETTE);
    const agentFrames = AGENT_FRAMES.map((a) => bake(a, 3, PALETTE)); // [m(blink), x(open)]
    const sparkImg = bake(SPARK, 1, PALETTE);
    const coinImg = bake(COIN_PICKUP, 2, PALETTE);
    const chipImg = bake(CHIP, 2, PALETTE);
    const titleImg = bake(TITLE, 3, TITLE_PALETTE);

    // Best score (localStorage).
    let best = 0;
    try {
      best = Number(localStorage.getItem(K.bestScoreKey) ?? 0) || 0;
    } catch {
      /* ignore */
    }

    let game = newGame(W);
    let faceIndex = (Math.random() * faces.length) | 0;
    let blink = 0;
    let inView = true;
    let last = 0;
    let raf = 0;

    const isMobile = () => mq.matches;
    const promptText = () => (isMobile() ? "TAP TO CONTINUE _" : "PRESS SPACE TO CONTINUE _");

    const resize = () => {
      dims();
      const dpr = window.devicePixelRatio || 1;
      const cw = shell.clientWidth || W;
      const ch = shell.clientHeight || H;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };

    const reset = () => {
      game = newGame(W);
      let next = (Math.random() * faces.length) | 0;
      if (next === faceIndex && faces.length > 1) next = (next + 1) % faces.length;
      faceIndex = next;
    };

    const jump = () => {
      if (!game.running) reset(); // restart from game over
      const c = game.coin;
      if (!game.started) {
        game.started = true;
      }
      game.running = true;
      if (c.grounded) {
        c.vy = K.jumpVelocity;
        c.grounded = false;
        c.flip = K.flipImpulse;
        playSound(SFX.jump);
      }
    };
    const releaseJump = () => {
      const c = game.coin;
      if (!c.grounded && c.vy < K.shortHopCap) c.vy = K.shortHopCap;
    };

    const update = (dt: number) => {
      const g = game;
      const c = g.coin;
      // player physics
      c.vy += K.gravity * dt;
      c.y += c.vy * dt;
      const floor = K.groundBaseline - c.height;
      if (c.y >= floor) {
        c.y = floor;
        c.vy = 0;
        c.grounded = true;
      }
      if (!c.grounded) c.flip += K.flipSpinRate * dt;

      // speed + score
      g.speed = K.initialSpeed + Math.min(K.speedRampMax, K.speedRampFactor * g.score);
      g.distance += g.speed * dt;
      g.score = g.distance / K.scoreDivisor;

      // spawning
      g.spawnTimer -= dt;
      if (g.spawnTimer <= 0) {
        spawnObstacle(g, W);
        const n = Math.max(0.68, 360 / g.speed);
        g.spawnTimer = (0.95 + 0.7 * Math.random()) * n;
      }

      // move + cull
      for (const o of g.obstacles) o.x -= g.speed * dt;
      for (const p of g.pickups) p.x -= g.speed * dt;
      for (const ch of g.chips) ch.x -= g.speed * dt;
      g.obstacles = g.obstacles.filter((o) => o.x + o.width > -20);
      g.pickups = g.pickups.filter((p) => p.x + p.width > -20);
      g.chips = g.chips.filter((ch) => ch.x + 32 > -20);

      // collisions — inset hitboxes
      const ph = { x: c.x + 8, y: c.y + 8, width: c.width - 16, height: c.height - 16 };
      for (const o of g.obstacles) {
        const oh = { x: o.x + 4, y: o.y + 4, width: o.width - 8, height: o.height - 4 };
        if (overlaps(ph, oh)) {
          g.running = false;
          playSound(SFX.hit);
          const total = Math.floor(g.score) + g.scoreBonus;
          if (total > best) {
            best = total;
            try { localStorage.setItem(K.bestScoreKey, String(best)); } catch { /* ignore */ }
          }
          break;
        }
      }
      // pickups
      g.pickups = g.pickups.filter((p) => {
        if (overlaps(ph, p)) {
          g.scoreBonus += K.pickupBonus;
          g.pickupCount += 1;
          g.popups.push({ x: p.x + 16, y: p.y, age: 0, text: `+${K.pickupBonus}` });
          playSound(SFX.pickup);
          return false;
        }
        return true;
      });
      // chips
      g.chips = g.chips.filter((ch) => {
        if (overlaps(ph, ch)) {
          g.scoreBonus += K.chipBonus;
          g.chipCount += 1;
          g.agentScaleBonus = K.agentScaleBonus;
          g.popups.push({ x: ch.x + 16, y: ch.y, age: 0, text: `+${K.chipBonus}` });
          playSound(SFX.power);
          for (let i = 0; i < K.confettiCount; i++) {
            const ang = Math.random() * Math.PI * 2;
            const spd = 70 + 230 * Math.random();
            g.confetti.push({
              x: ch.x + 16, y: ch.y + 16,
              vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 80,
              life: 0.55 + 0.4 * Math.random(), age: 0,
              size: Math.random() < 0.5 ? 2 : 4,
              color: K.confettiColors[(Math.random() * K.confettiColors.length) | 0]!,
            });
          }
          return false;
        }
        return true;
      });

      // decay scale bonus
      if (g.agentScaleBonus > 0) g.agentScaleBonus = Math.max(0, g.agentScaleBonus - K.agentScaleDecay * dt);

      // confetti + popups
      for (const f of g.confetti) {
        f.vy += K.confettiGravity * dt;
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.age += dt;
      }
      g.confetti = g.confetti.filter((f) => f.age < f.life);
      for (const p of g.popups) p.age += dt;
      g.popups = g.popups.filter((p) => p.age < K.popupLifetime);

      // clouds
      for (const cl of g.clouds) {
        cl.x -= cl.speed * dt;
        if (cl.x < -120) {
          cl.x = W + 180 * Math.random();
          cl.y = 42 + 62 * Math.random();
        }
      }
    };

    const drawCoin = () => {
      const c = game.coin;
      const cx = c.x + c.width / 2;
      const cy = c.y + c.height / 2;
      // landing shadow
      if (!c.grounded) {
        const t = Math.min(1, (195 - c.y) / 120);
        const s = 36 * (1 - t) + 8 * t;
        ctx.fillStyle = "#cbcbef";
        ctx.fillRect(cx - s / 2, 245.5, s, 3);
      }
      const sx = c.grounded ? 1 : Math.max(K.minVisualSquash, Math.abs(Math.cos(c.flip)));
      const o = 1 + game.agentScaleBonus;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx * o, o);
      ctx.rotate(c.grounded ? game.distance / K.spinDivisor : 0);
      ctx.drawImage(faces[faceIndex]!, -c.width / 2, -c.height / 2, c.width, c.height);
      ctx.restore();
      // jump spark
      if (!c.grounded) ctx.drawImage(sparkImg, cx - 10, c.y - 12, 20, 8);
    };

    const drawText = (text: string, x: number, y: number, align: CanvasTextAlign, color: string) => {
      ctx.fillStyle = color;
      ctx.font = K.font;
      ctx.textAlign = align;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(text, x, y);
    };

    const render = () => {
      const g = game;
      // background
      ctx.fillStyle = K.scoreboardScreen;
      ctx.fillRect(0, 0, W, H);

      // clouds
      g.clouds.forEach((cl, i) => {
        ctx.drawImage(cloudImg, cl.x - 5, cl.y - 30, 80, 80);
        if (i === 2) {
          const frame = blink >= 3 ? agentFrames[0]! : agentFrames[1]!;
          ctx.drawImage(frame, cl.x + 24, cl.y - 32, 48, 48);
        }
      });

      // ground line + dashes
      ctx.strokeStyle = K.scoreboardInk;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, K.groundLineY);
      ctx.lineTo(W, K.groundLineY);
      ctx.stroke();
      ctx.fillStyle = K.scoreboardGroundDash;
      const off = Math.floor(g.distance % K.groundDashPeriod);
      for (let e = -off; e < W; e += K.groundDashPeriod) {
        ctx.fillRect(e + 18, 264, 28, 3);
        ctx.fillRect(e + 58, 280, 14, 3);
      }

      // obstacles
      for (const o of g.obstacles) {
        for (const t of o.tiles) {
          const img = obstacleSprites[t.key];
          if (img) ctx.drawImage(img, o.x + t.dx, o.y + t.dy, 32, 32);
        }
      }
      // pickups + chips (bob)
      for (const p of g.pickups) ctx.drawImage(coinImg, p.x, p.y + 4 * Math.sin(g.distance / 50), 32, 32);
      for (const ch of g.chips) ctx.drawImage(chipImg, ch.x, ch.y + 4 * Math.sin(g.distance / 75), 32, 32);

      // confetti
      for (const f of g.confetti) {
        ctx.globalAlpha = Math.max(0, 1 - (1.3 * f.age) / f.life);
        ctx.fillStyle = f.color;
        ctx.fillRect(f.x, f.y, f.size, f.size);
      }
      ctx.globalAlpha = 1;

      // popups
      for (const p of g.popups) {
        const t = p.age / K.popupLifetime;
        ctx.globalAlpha = Math.max(0, 1 - 1.4 * t);
        drawText(p.text, p.x, p.y - 38 * t, "center", K.scoreboardInk);
      }
      ctx.globalAlpha = 1;

      drawCoin();

      // scoreboard
      const pad5 = (v: number) => String(Math.floor(v)).padStart(5, "0");
      const total = Math.floor(g.score) + g.scoreBonus;
      drawText("SCORE", W - 170, 26, "right", K.scoreboardInk);
      drawText("BEST", W - 54, 26, "right", K.scoreboardInk);
      drawText(pad5(total), W - 170, 46, "right", K.scoreboardInk);
      drawText(pad5(best), W - 54, 46, "right", K.scoreboardInk);

      // idle / game-over overlay
      if (!g.started || !g.running) {
        ctx.globalAlpha = 0.67;
        ctx.fillStyle = K.scoreboardScreen;
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
        ctx.drawImage(titleImg, Math.round((W - 210) / 2), 66, 210, 48);
        drawText(promptText(), W / 2, 128, "center", K.scoreboardInk);
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(K.deltaClamp, last ? (now - last) / 1000 : 0);
      last = now;
      // Skip work while scrolled off-screen (cheap idle).
      if (inView) {
        blink += dt;
        if (blink >= K.agentBlinkCycle) blink = 0;
        if (game.started && game.running && !reduceMotion) update(dt);
        render();
      }
      raf = requestAnimationFrame(loop);
    };

    // input
    const allowHotkey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return false;
      const el = e.target as HTMLElement | null;
      if (el && el.closest('input, textarea, select, [contenteditable="true"]') && !el.closest('[data-agent-run-allow-hotkeys="true"]')) {
        return false;
      }
      return true;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (!allowHotkey(e)) return;
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        if (e.repeat) return;
        jump();
      } else if (e.key === "Enter" && !game.running) {
        e.preventDefault();
        jump();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") releaseJump();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(shell);
    resize();

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) inView = en.isIntersecting;
        // bind/unbind keyboard with visibility
        if (inView) {
          window.addEventListener("keydown", onKeyDown);
          window.addEventListener("keyup", onKeyUp);
        } else {
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("keyup", onKeyUp);
        }
      },
      { threshold: [0, 0.6] }
    );
    io.observe(shell);

    raf = requestAnimationFrame(loop);

    // expose pointer handlers to the overlay button
    jumpRef.current = jump;
    releaseRef.current = releaseJump;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div ref={shellRef} className="agentRunGame_shell__HAx6M" role="presentation" data-analytics-name={analyticsName}>
      <canvas ref={canvasRef} className="agentRunGame_canvas__F6zn_" width={900} height={320} aria-hidden="true" />
      <button
        type="button"
        className="agentRunGame_overlayButton__HcigL"
        aria-label="Click to play"
        data-agent-run-allow-hotkeys="true"
        onPointerDown={() => jumpRef.current?.()}
        onPointerUp={() => releaseRef.current?.()}
        onPointerCancel={() => releaseRef.current?.()}
      />
    </div>
  );
}
