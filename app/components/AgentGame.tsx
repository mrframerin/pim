"use client";

import { useEffect, useRef, useState } from "react";

type Obstacle = { x: number; w: number; h: number };

export function AgentGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let y = 150;
    let vy = 0;
    let score = 0;
    let tick = 0;
    let obstacles: Obstacle[] = [{ x: 620, w: 36, h: 48 }];

    function jump() {
      if (y >= 150) vy = -13;
    }

    function draw() {
      if (!ctx || !canvas) return;
      tick += 1;
      score += 1;
      vy += 0.65;
      y = Math.min(150, y + vy);

      obstacles = obstacles
        .map((obstacle) => ({ ...obstacle, x: obstacle.x - 5 }))
        .filter((obstacle) => obstacle.x > -80);
      if (tick % 92 === 0) obstacles.push({ x: 640, w: 28 + (tick % 4) * 8, h: 34 + (tick % 3) * 10 });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1313ba";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 192);
      ctx.lineTo(canvas.width, 192);
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.fillRect(72, y, 34, 42);
      ctx.fillStyle = "#1313ba";
      ctx.fillRect(82, y + 11, 5, 5);
      ctx.fillRect(96, y + 11, 5, 5);
      ctx.fillRect(86, y + 26, 16, 4);

      obstacles.forEach((obstacle) => {
        ctx.fillStyle = "#fff";
        ctx.fillRect(obstacle.x, 192 - obstacle.h, obstacle.w, obstacle.h);
      });

      ctx.fillStyle = "#fff";
      ctx.font = "16px NotionInter, Arial";
      ctx.fillText(`SCORE ${Math.floor(score / 10)}`, 24, 32);
      ctx.fillText("SPACE / CLICK", 470, 32);

      raf = window.requestAnimationFrame(draw);
    }

    function onKey(event: KeyboardEvent) {
      if (event.code === "Space") jump();
    }

    if (running) {
      window.addEventListener("keydown", onKey);
      canvas.addEventListener("pointerdown", jump);
      draw();
    } else {
      ctx.fillStyle = "#1313ba";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "20px NotionInter, Arial";
      ctx.fillText("Press start to run the footer game", 152, 112);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", jump);
    };
  }, [running]);

  return (
    <div className="agentGame">
      <canvas className="game-canvas" ref={canvasRef} width={640} height={240} />
      <button type="button" onClick={() => setRunning((value) => !value)}>
        {running ? "Pause" : "Start"}
      </button>
    </div>
  );
}
