"use client";

import { useEffect, useMemo, useRef } from "react";

type StepFn = () => void;

// Ported from ArtPlum.vue (Vue) to React/TSX
export function ArtPlum({
  minLength = 5,
  maxLength = 8,
}: {
  minLength?: number;
  maxLength?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep a stable mask value
  const mask = useMemo(
    () => "radial-gradient(circle, transparent, black)",
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const { ctx } = initCanvas(canvas, window.innerWidth, window.innerHeight);
    const { width, height } = canvas;

    // Subtle light purple hue
    const color = "rgba(167, 139, 250, 0.18)"; // ~purple-400 @ 18% alpha
    const r180 = Math.PI;
    const r90 = Math.PI / 2;
    const r15 = Math.PI / 12;
    const MIN_BRANCH = 30;

    const { random } = Math;

    let steps: StepFn[] = [];
    let prevSteps: StepFn[] = [];

    const step = (
      x: number,
      y: number,
      rad: number,
      counter: { value: number } = { value: 0 },
    ) => {
      const length =
        maxLength > minLength
          ? minLength + random() * (maxLength - minLength)
          : minLength;
      counter.value += 1;

      const [nx, ny] = polar2cart(x, y, length, rad);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      const rad1 = rad + random() * r15;
      const rad2 = rad - random() * r15;

      // out of bounds
      if (
        nx < -100 ||
        nx > window.innerWidth + 100 ||
        ny < -100 ||
        ny > window.innerHeight + 100
      )
        return;

      const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5;

      // left branch
      if (random() < rate) steps.push(() => step(nx, ny, rad1, counter));

      // right branch
      if (random() < rate) steps.push(() => step(nx, ny, rad2, counter));
    };

    let lastTime = performance.now();
    const interval = 1000 / 40; // ~40 fps
    let rafId = 0;
    let running = false;
    let firstFrame = true;

    const frame = () => {
      if (!running) return;
      rafId = requestAnimationFrame(frame);
      if (performance.now() - lastTime < interval) return;

      prevSteps = steps;
      steps = [];
      lastTime = performance.now();

      if (!prevSteps.length) {
        pause();
        return;
      }

      // Execute all the steps from the previous frame
      prevSteps.forEach((i) => {
        if (firstFrame) {
          // Ensure all four seed branches appear at least once
          i();
        } else {
          // 50% chance to keep the step for the next frame, to create a more organic look
          if (random() < 0.5) steps.push(i);
          else i();
        }
      });
      firstFrame = false;
    };

    const pause = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const resume = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };

    const randomMiddle = () => random() * 0.6 + 0.2; // 0.2 - 0.8

    const start = () => {
      pause();
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      prevSteps = [];
      steps = [
        () => step(randomMiddle() * window.innerWidth, -5, r90),
        () => step(randomMiddle() * window.innerWidth, window.innerHeight + 5, -r90),
        () => step(-5, randomMiddle() * window.innerHeight, 0),
        () => step(window.innerWidth + 5, randomMiddle() * window.innerHeight, r180),
      ];
      if (window.innerWidth < 500) steps = steps.slice(0, 2);
      resume();
    };

    start();

    const handleResize = () => {
      initCanvas(canvas, window.innerWidth, window.innerHeight);
      start();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      pause();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 pointer-events-none print:hidden"
      style={{ zIndex: -1 as any, maskImage: mask as any, WebkitMaskImage: mask as any }}
    >
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
}

function initCanvas(
  canvas: HTMLCanvasElement,
  width = 400,
  height = 400,
  _dpi?: number,
) {
  const ctx = canvas.getContext("2d")!;
  const dpr = window.devicePixelRatio || 1;
  const dpi = _dpi || dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before scaling
  ctx.scale(dpi, dpi);
  return { ctx, dpi };
}

function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta);
  const dy = r * Math.sin(theta);
  return [x + dx, y + dy] as const;
}

export default ArtPlum;


