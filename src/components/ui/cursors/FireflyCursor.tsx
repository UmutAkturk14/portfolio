import { useEffect, useRef } from "react";

/**
 * Firefly style cursor-trail (desktop only, ignores ≤ 767 px).
 * Mount it once; it adds / cleans up its own listeners.
 */
export default function FireflyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    /* ── bail out on phones / tablets ──────────────────── */
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    /* ── data structures ──────────────────────────────── */
    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const trailLen = 40;
    const trail = Array.from({ length: trailLen }, () => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }));

    /* ── helpers ──────────────────────────────────────── */
    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
    const setPointer = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
    };

    let mouseMoved = false;
    const onMouseMove = (e: MouseEvent) => {
      mouseMoved = true;
      setPointer(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      mouseMoved = true;
      const t = e.touches[0];
      setPointer(t.clientX, t.clientY);
    };

    /* ── animation loop ───────────────────────────────── */
    let raf = 0;
    const update = (t: number) => {
      /* idle demo when no movement yet */
      if (!mouseMoved) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* physics */
      const SPRING = 0.4;
      const FRICTION = 0.5;
      trail.forEach((p, i) => {
        const prev = i ? trail[i - 1] : pointer;
        const s = i ? SPRING : SPRING * 0.4;
        p.dx += (prev.x - p.x) * s;
        p.dy += (prev.y - p.y) * s;
        p.dx *= FRICTION;
        p.dy *= FRICTION;
        p.x += p.dx;
        p.y += p.dy;
      });

      /* glowing firefly style */
      const dark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < trailLen; i++) {
        const p = trail[i];
        const fade = 1 - i / trailLen;
        const radius = 4 * fade * (1 + 0.5 * Math.sin(t / 100 + i));

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        ctx.fillStyle = dark
          ? `hsl(${(t / 10 + i * 8) % 360},100%,70%)`
          : "rgba(0,0,0,0.45)";

        ctx.globalAlpha = fade * 0.9;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10 + Math.random() * 15;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(update);
    };

    /* ── init & listeners ─────────────────────────────── */
    resize();
    addEventListener("resize", resize);
    addEventListener("mousemove", onMouseMove);
    addEventListener("touchmove", onTouchMove, { passive: true });
    document.body.style.cursor = "none";
    raf = requestAnimationFrame(update);

    /* ── cleanup ───────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("touchmove", onTouchMove);
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
