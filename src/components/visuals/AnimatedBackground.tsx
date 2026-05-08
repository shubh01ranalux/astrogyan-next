"use client";

import { useEffect, useState } from "react";

const constellations = [
  { x: "8%", y: "16%" },
  { x: "72%", y: "12%" },
  { x: "18%", y: "62%" },
  { x: "82%", y: "68%" },
  { x: "45%", y: "28%" },
  { x: "58%", y: "78%" },
  { x: "32%", y: "86%" },
  { x: "90%", y: "38%" },
];

export default function AnimatedBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F6EEE8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#D8A7B1_0%,transparent_32%),radial-gradient(circle_at_80%_10%,#7FB8B4_0%,transparent_28%),radial-gradient(circle_at_75%_75%,#5C3A57_0%,transparent_34%),radial-gradient(circle_at_25%_85%,#E6C89C_0%,transparent_30%)] opacity-35" />

      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(92,58,87,0.16),transparent_35%,rgba(216,167,177,0.22),transparent_72%,rgba(127,184,180,0.18))]" />

      <div
        className="absolute inset-[-8%] transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mouse.x}px, ${mouse.y}px) scale(1.04)`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.28] bg-[radial-gradient(circle,#ffffff_0_1px,transparent_1.6px)] [background-size:42px_42px]" />

        <div className="absolute inset-0 opacity-[0.16] bg-[radial-gradient(circle,#5C3A57_0_1px,transparent_1.8px)] [background-size:96px_96px]" />

        {constellations.map((item, index) => (
          <svg
            key={index}
            className="absolute h-32 w-44 opacity-[0.22]"
            style={{
              left: item.x,
              top: item.y,
              transform: `rotate(${index * 31}deg)`,
            }}
            viewBox="0 0 180 130"
            fill="none"
          >
            <path
              d="M18 92 L48 42 L88 58 L124 24 L158 72"
              stroke="#5C3A57"
              strokeWidth="1"
            />
            <circle cx="18" cy="92" r="3" fill="#5C3A57" />
            <circle cx="48" cy="42" r="3" fill="#5C3A57" />
            <circle cx="88" cy="58" r="3" fill="#5C3A57" />
            <circle cx="124" cy="24" r="3" fill="#5C3A57" />
            <circle cx="158" cy="72" r="3" fill="#5C3A57" />
          </svg>
        ))}

        <div className="absolute right-[-10%] top-[3%] h-[760px] w-[760px] rounded-full border border-[#E6C89C]/25 opacity-50">
          <div className="absolute inset-10 rounded-full border border-[#B784A7]/20" />
          <div className="absolute inset-24 rounded-full border border-[#5C3A57]/15" />
          <div className="absolute inset-40 rounded-full border border-[#E6C89C]/20" />
          <div className="absolute inset-56 rounded-full border border-[#7FB8B4]/15" />
        </div>
      </div>

      <div
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6EEE8]/20 blur-3xl transition-all duration-500 ease-out"
        style={{
          left: `calc(50% + ${mouse.x * 8}px)`,
          top: `calc(50% + ${mouse.y * 8}px)`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EEE8]/15 via-[#F6EEE8]/40 to-[#F6EEE8]/80" />
    </div>
  );
}