"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  glow: number;
};

type Constellation = {
  stars: Star[];
};

const CONSTELLATION_PATTERNS = [
  [[0, 0], [45, -25], [90, -5], [130, -45], [170, -20]],
  [[0, 0], [35, 40], [80, 25], [115, 70], [155, 55]],
  [[0, 0], [50, 20], [95, -10], [140, 15], [190, -5], [230, 35]],
  [[0, 0], [40, -35], [85, -20], [120, 15], [165, 5]],
  [[0, 0], [55, 5], [90, 45], [130, 20], [170, 55]],
];

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const stars = useRef<Star[]>([]);
  const constellations = useRef<Constellation[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const safeCtx = ctx;
    const safeCanvas = canvas;

    function resize() {
      safeCanvas.width = window.innerWidth;
      safeCanvas.height = window.innerHeight;
      createStars();
      createConstellations();
    }

    function createStars() {
      stars.current = Array.from({ length: 260 }).map(() => ({
        x: Math.random() * safeCanvas.width,
        y: Math.random() * safeCanvas.height,
        z: Math.random() * 1.5 + 0.25,
        size: Math.random() * 1.8 + 0.35,
        speed: Math.random() * 0.12 + 0.025,
        glow: Math.random() * 0.7 + 0.3,
      }));
    }

    function createConstellations() {
      constellations.current = Array.from({ length: 9 }).map(() => {
        const pattern =
          CONSTELLATION_PATTERNS[
            Math.floor(Math.random() * CONSTELLATION_PATTERNS.length)
          ];

        const baseX = Math.random() * safeCanvas.width;
        const baseY = Math.random() * safeCanvas.height;

        return {
          stars: pattern.map(([px, py]) => ({
            x: baseX + px,
            y: baseY + py,
            z: Math.random() * 0.8 + 0.8,
            size: Math.random() * 1.5 + 1,
            speed: Math.random() * 0.07 + 0.02,
            glow: Math.random() * 0.6 + 0.4,
          })),
        };
      });
    }

    function drawStar(star: Star, parallaxX: number, parallaxY: number) {
      const x = (star.x + parallaxX * star.z + safeCanvas.width) % safeCanvas.width;
      const y =
        (star.y + parallaxY * star.z + scrollY.current * star.speed + safeCanvas.height) %
        safeCanvas.height;

      const gradient = safeCtx.createRadialGradient(x, y, 0, x, y, star.size * 5);
      gradient.addColorStop(0, `rgba(255, 235, 190, ${star.glow})`);
      gradient.addColorStop(0.45, `rgba(255, 220, 160, ${star.glow * 0.28})`);
      gradient.addColorStop(1, "rgba(255, 220, 160, 0)");

      safeCtx.fillStyle = gradient;
      safeCtx.beginPath();
      safeCtx.arc(x, y, star.size * 5, 0, Math.PI * 2);
      safeCtx.fill();

      safeCtx.fillStyle = `rgba(255, 248, 225, ${star.glow})`;
      safeCtx.beginPath();
      safeCtx.arc(x, y, star.size, 0, Math.PI * 2);
      safeCtx.fill();
    }

    function draw() {
      safeCtx.clearRect(0, 0, safeCanvas.width, safeCanvas.height);

      const parallaxX = (mouse.current.x - safeCanvas.width / 2) * 0.025;
      const parallaxY = (mouse.current.y - safeCanvas.height / 2) * 0.025;

      const bg = safeCtx.createLinearGradient(0, 0, safeCanvas.width, safeCanvas.height);
      bg.addColorStop(0, "rgba(255, 246, 250, 0.95)");
      bg.addColorStop(0.45, "rgba(255, 239, 247, 0.92)");
      bg.addColorStop(1, "rgba(246, 238, 255, 0.95)");
      safeCtx.fillStyle = bg;
      safeCtx.fillRect(0, 0, safeCanvas.width, safeCanvas.height);

      stars.current.forEach((star) => drawStar(star, parallaxX, parallaxY));

      constellations.current.forEach((group) => {
        const points = group.stars.map((star) => ({
          x: (star.x + parallaxX * star.z + safeCanvas.width) % safeCanvas.width,
          y:
            (star.y +
              parallaxY * star.z +
              scrollY.current * star.speed +
              safeCanvas.height) %
            safeCanvas.height,
        }));

        safeCtx.strokeStyle = "rgba(184, 132, 167, 0.22)";
        safeCtx.lineWidth = 0.8;
        safeCtx.beginPath();

        points.forEach((point, index) => {
          if (index === 0) safeCtx.moveTo(point.x, point.y);
          else safeCtx.lineTo(point.x, point.y);
        });

        safeCtx.stroke();

        group.stars.forEach((star) => drawStar(star, parallaxX, parallaxY));
      });

      animationRef.current = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }

    function handleScroll() {
      scrollY.current = window.scrollY;
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-50 h-screen w-screen"
      aria-hidden="true"
    />
  );
}