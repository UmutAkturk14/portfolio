import { useEffect, useRef } from "react";
import "./App.css";

import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import TechGrid from "./components/sections/TechGrid";
import ProjectsCarousel from "./components/projects/projectsCarousel";

const App = () => {
  /* canvas overlay */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    /* ── cursor + trail data ───────────────────────────── */
    let mouseMoved = false;
    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };

    const params = {
      pointsNumber: 40,
      widthFactor: 0.15,
      spring: 0.4,
      friction: 0.5,
    };

    interface Point {
      x: number;
      y: number;
      dx: number;
      dy: number;
    }
    const trail: Point[] = Array.from({ length: params.pointsNumber }, () => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }));

    /* ── helpers ───────────────────────────────────────── */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const updatePointer = (x: number, y: number) => {
      pointer.x = x;
      pointer.y = y;
    };
    const onMouseMove = (e: MouseEvent) => {
      mouseMoved = true;
      updatePointer(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      mouseMoved = true;
      const t = e.touches[0];
      updatePointer(t.clientX, t.clientY);
    };

    /* ── animation loop ────────────────────────────────── */
    let rafId = 0;
    const update = (t: number) => {
      // intro demo motion
      if (!mouseMoved) {
        pointer.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.forEach((p, idx) => {
        const prev = idx === 0 ? pointer : trail[idx - 1];
        const spring = idx === 0 ? 0.4 * params.spring : params.spring;

        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail[0].x, trail[0].y);

      for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.strokeStyle = `hsl(${(t / 20 + i * 5) % 360},80%,60%)`;
        ctx.stroke();
      }
      ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      ctx.stroke();

      rafId = requestAnimationFrame(update);
    };

    /* ── init ──────────────────────────────────────────── */
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.body.style.cursor = "none"; // hide system cursor
    rafId = requestAnimationFrame(update);

    /* ── cleanup ───────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Canvas overlay for cursor trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />

      {/* Main site */}
      <Navbar />
      <Hero />
      <TechGrid />
      <ProjectsCarousel />
    </>
  );
};

export default App;
