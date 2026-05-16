"use client";

import { useEffect, useState } from "react";

const constellations = [
  { x: "6%", y: "12%", type: "orion", size: "h-40 w-52", rotate: 8 },
  { x: "70%", y: "10%", type: "ursa", size: "h-36 w-56", rotate: -18 },
  { x: "14%", y: "58%", type: "cassiopeia", size: "h-32 w-52", rotate: 22 },
  { x: "78%", y: "64%", type: "scorpio", size: "h-44 w-56", rotate: -28 },
  { x: "42%", y: "25%", type: "leo", size: "h-36 w-52", rotate: 14 },
  { x: "55%", y: "76%", type: "pisces", size: "h-40 w-60", rotate: -8 },
  { x: "28%", y: "84%", type: "taurus", size: "h-36 w-52", rotate: 31 },
  { x: "88%", y: "36%", type: "aquarius", size: "h-36 w-56", rotate: 12 },
];

function ConstellationSvg({ type }: { type: string }) {
  const common = "drop-shadow-[0_0_8px_rgba(92,58,87,0.25)]";

  if (type === "orion") {
    return (
      <svg className={common} viewBox="0 0 220 160" fill="none">
        <path d="M58 22 L92 62 L126 64 L164 26" stroke="#5C3A57" strokeWidth="1" />
        <path d="M92 62 L76 112 L112 92 L146 116 L126 64" stroke="#5C3A57" strokeWidth="1" />
        <path d="M92 62 L108 76 L126 64" stroke="#B784A7" strokeWidth="1" />
        {[["58","22"],["92","62"],["126","64"],["164","26"],["76","112"],["112","92"],["146","116"],["108","76"]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#5C3A57" />
        ))}
      </svg>
    );
  }

  if (type === "ursa") {
    return (
      <svg className={common} viewBox="0 0 240 150" fill="none">
        <path d="M30 84 L68 64 L104 78 L142 52 L176 62 L204 34" stroke="#5C3A57" strokeWidth="1" />
        <path d="M104 78 L108 112 L146 118 L142 52" stroke="#B784A7" strokeWidth="1" />
        {[["30","84"],["68","64"],["104","78"],["142","52"],["176","62"],["204","34"],["108","112"],["146","118"]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#5C3A57" />
        ))}
      </svg>
    );
  }

  if (type === "cassiopeia") {
    return (
      <svg className={common} viewBox="0 0 220 130" fill="none">
        <path d="M24 70 L62 34 L102 78 L144 36 L188 72" stroke="#5C3A57" strokeWidth="1" />
        {[["24","70"],["62","34"],["102","78"],["144","36"],["188","72"]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="#5C3A57" />
        ))}
      </svg>
    );
  }

  if (type === "scorpio") {
    return (
      <svg className={common} viewBox="0 0 240 180" fill="none">
        <path d="M32 40 L70 62 L108 58 L136 84 L128 118 L154 142 L196 126 L214 92" stroke="#5C3A57" strokeWidth="1" />
        <path d="M196 126 L226 138" stroke="#B784A7" strokeWidth="1" />
        {[["32","40"],["70","62"],["108","58"],["136","84"],["128","118"],["154","142"],["196","126"],["214","92"],["226","138"]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#5C3A57" />
        ))}
      </svg>
    );
  }

  if (type === "leo") {
    return (
      <svg className={common} viewBox="0 0 220 150" fill="none">
        <path d="M32 92 L70 48 L116 54 L154 92 L190 70" stroke="#5C3A57" strokeWidth="1" />
        <path d="M70 48 C82 22 122 18 116 54" stroke="#B784A7" strokeWidth="1" />
        {[["32","92"],["70","48"],["116","54"],["154","92"],["190","70"]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#5C3A57" />
        ))}
      </svg>
    );
  }

  if (type === "pisces") {
    return (
      <svg className={common} viewBox="0 0 250 150" fill="none">
        <path d="M42 42 C76 16 112 30 126 62 C142 102 94 122 54 96" stroke="#5C3A57" strokeWidth="1" />
        <path d="M204 42 C170 16 134 30 120 62 C104 102 152 122 192 96" stroke="#5C3A57" strokeWidth="1" />
        <path d="M126 62 L120 62" stroke="#B784A7" strokeWidth="1" />
        {[["42","42"],["54","96"],["126","62"],["204","42"],["192","96"],["120","62"]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#5C3A57" />
        ))}
      </svg>
    );
  }

  if (type === "taurus") {
    return (
      <svg className={common} viewBox="0 0 220 150" fill="none">
        <path d="M40 92 L76 68 L112 82 L150 52 L188 36" stroke="#5C3A57" strokeWidth="1" />
        <path d="M76 68 L54 34" stroke="#B784A7" strokeWidth="1" />
        <path d="M150 52 L166 104" stroke="#B784A7" strokeWidth="1" />
        {[["40","92"],["76","68"],["112","82"],["150","52"],["188","36"],["54","34"],["166","104"]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#5C3A57" />
        ))}
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 240 150" fill="none">
      <path d="M34 74 L70 42 L108 72 L146 40 L184 76 L214 54" stroke="#5C3A57" strokeWidth="1" />
      <path d="M70 104 L108 72 L146 104" stroke="#B784A7" strokeWidth="1" />
      {[["34","74"],["70","42"],["108","72"],["146","40"],["184","76"],["214","54"],["70","104"],["146","104"]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#5C3A57" />
      ))}
    </svg>
  );
}

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
  <div
    key={index}
    className={`absolute ${item.size} opacity-[0.24]`}
    style={{
      left: item.x,
      top: item.y,
      transform: `rotate(${item.rotate}deg)`,
    }}
  >
    <ConstellationSvg type={item.type} />
  </div>
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