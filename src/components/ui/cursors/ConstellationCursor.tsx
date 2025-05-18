import { useEffect, useRef, useState } from "react";

type Props = {
  /** Color override (set "none" to disable glow) */
  color?: string;
};

export default function ConstellationCursor({ color }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    const MAX_DIST = 100;
    const stars = 120;

    const pts = Array.from({ length: stars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      col: isDark
        ? `hsl(${200 + Math.random() * 55}, 80%, 80%)`
        : `hsl(0, 0%, ${10 + Math.random() * 20}%)`,
      r: 1 + Math.random() * 2,
    }));

    const pointer = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      for (let i = 0; i < stars; i++) {
        const a = pts[i];
        const dToPointer = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (dToPointer < MAX_DIST) {
          ctx.strokeStyle = isDark
            ? `rgba(150,180,255,${1 - dToPointer / MAX_DIST})`
            : `rgba(60,60,60,${1 - dToPointer / MAX_DIST})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }

        for (let j = i + 1; j < stars; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < MAX_DIST) {
            ctx.strokeStyle = isDark
              ? `rgba(150,180,255,${1 - d / MAX_DIST})`
              : `rgba(60,60,60,${0.9 - d / MAX_DIST})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const [i, p] of pts.entries()) {
        const pulse = 0.6 + 0.4 * Math.sin(Date.now() * 0.002 + i);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.shadowColor = p.col;
        ctx.shadowBlur = 6 * pulse;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (color !== "none") {
        const fallbackColor = isDark ? "#cce6ff" : "#2a2a2a"; // Darker gray for light mode
        const cursorColor = isDark ? color ?? fallbackColor : fallbackColor;

        const glow = cursorColor + "80";
        const grad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          20
        );
        grad.addColorStop(0, glow);
        grad.addColorStop(1, `${cursorColor}00`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = cursorColor;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 6, 0, Math.PI * 2);
        ctx.shadowColor = cursorColor;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
