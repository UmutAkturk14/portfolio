// src/components/ui/SparkyCursor.tsx
import { useEffect, useRef } from "react";

export default function SparkyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    /* ───────────────────────────── desktop only ─────────────────────────── */
    if (innerWidth < 768) return;

    /* canvas + ctx */
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    /* ────────────────────────── pointer / trail data ────────────────────── */
    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const tail = 40;
    const trail = Array.from({ length: tail }, () => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }));

    type Spark = { x: number; y: number; dx: number; dy: number; life: number };
    let sparks: Spark[] = [];

    /* extra-glow toggle (true while hovering an interactive element) */
    let boosted = false;

    /* ────────────────────────────── helpers ─────────────────────────────── */
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    const move = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
    };

    /* decide if a DOM element counts as “interactive” */
    const isInteractive = (el: Element | null) =>
      !!el &&
      (el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.getAttribute("role") === "button" ||
        getComputedStyle(el).cursor === "pointer");

    /* ───────────────────────── event listeners ──────────────────────────── */
    let touched = false;
    const pushSparks = (amount: number, x: number, y: number, speed = 4) => {
      for (let i = 0; i < amount; i++) {
        sparks.push({
          x,
          y,
          dx: (Math.random() - 0.5) * speed,
          dy: (Math.random() - 0.5) * speed,
          life: 30 + Math.random() * 30,
        });
      }
    };

    const handleMove = (x: number, y: number) => {
      move(x, y);
      touched = true;

      /* add a few sparks on every move, more when boosted */
      pushSparks(boosted ? 10 : 4, x, y, boosted ? 6 : 4);
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) =>
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onClick = (e: MouseEvent) =>
      pushSparks(boosted ? 30 : 15, e.clientX, e.clientY, boosted ? 8 : 6);

    /* watch what’s under the cursor to toggle boost */
    const onPointerOver = (e: PointerEvent) => {
      boosted = isInteractive(e.target as Element);
    };
    /* ensure boost ends when leaving the element */
    const onPointerOut = () => {
      boosted = false;
    };

    /* ─────────────────────────── animation loop ─────────────────────────── */
    let raf = 0;
    const loop = (t: number) => {
      /* idle attractor (demo) */
      if (!touched) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* physics */
      trail.forEach((p, i) => {
        const prev = i ? trail[i - 1] : pointer;
        const spring = i ? 0.4 : 0.4 * 0.4;
        p.dx = (p.dx + (prev.x - p.x) * spring) * 0.5;
        p.dy = (p.dy + (prev.y - p.y) * spring) * 0.5;
        p.x += p.dx;
        p.y += p.dy;
      });

      /* theme-aware colours */
      const dark = document.documentElement.classList.contains("dark");
      const baseStroke = dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
      const glowStroke = dark ? "#fff" : "#000";

      /* trail */
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < tail; i++) {
        const xc = (trail[i].x + trail[i - 1].x) / 2;
        const yc = (trail[i].y + trail[i - 1].y) / 2;
        ctx.quadraticCurveTo(trail[i - 1].x, trail[i - 1].y, xc, yc);
      }
      ctx.lineWidth = boosted ? 6 : 3;
      ctx.strokeStyle = baseStroke;
      ctx.stroke();

      /* subtle outer glow while boosted */
      if (boosted) {
        ctx.lineWidth = 12;
        ctx.strokeStyle = glowStroke;
        ctx.globalAlpha = 0.08;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      /* fireflies */
      trail.forEach((p, i) => {
        const fade = 1 - i / tail;
        ctx.beginPath();
        ctx.arc(p.x, p.y, fade * (boosted ? 5 : 3), 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `hsl(${(t / 20 + i * 6) % 360},100%,70%)`
          : `rgba(0,0,0,${0.3 + 0.4 * fade})`;
        ctx.fill();
      });

      /* sparks */
      sparks = sparks.filter((s) => s.life-- > 0);
      sparks.forEach((s) => {
        s.x += s.dx;
        s.y += s.dy;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(255,255,255,${s.life / 60})`
          : `rgba(0,0,0,${s.life / 60})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(loop);
    };

    /* init & listeners */
    resize();
    addEventListener("resize", resize);
    addEventListener("mousemove", onMouseMove);
    addEventListener("touchmove", onTouchMove, { passive: true });
    addEventListener("click", onClick);
    addEventListener("pointerover", onPointerOver);
    addEventListener("pointerout", onPointerOut);
    document.body.style.cursor = "none";
    raf = requestAnimationFrame(loop);

    /* cleanup */
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("touchmove", onTouchMove);
      removeEventListener("click", onClick);
      removeEventListener("pointerover", onPointerOver);
      removeEventListener("pointerout", onPointerOut);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
