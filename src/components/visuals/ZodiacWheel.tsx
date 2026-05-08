"use client";

import { motion } from "framer-motion";
import StatBadge from "@/components/ui/StatBadge";
import { siteConfig } from "@/data/site";

const zodiacSigns = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

export default function ZodiacWheel() {
  return (
    <div className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center sm:h-[420px] sm:w-[420px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-[#E6C89C]/70 bg-white/25 shadow-[0_0_80px_rgba(230,200,156,0.45)] backdrop-blur-sm"
      >
        <div className="absolute inset-5 rounded-full border border-[#B784A7]/40" />
        <div className="absolute inset-16 rounded-full border border-[#7FB8B4]/40" />

        {zodiacSigns.map((sign, index) => {
          const angle = (index / zodiacSigns.length) * 360;
          return (
            <span
              key={sign}
              className="absolute left-1/2 top-1/2 text-2xl text-[#5C3A57]"
              style={{
                transform: `rotate(${angle}deg) translate(0, -145px) rotate(-${angle}deg)`,
              }}
            >
              {sign}
            </span>
          );
        })}
      </motion.div>

      <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full border border-[#E6C89C] bg-[#F6EEE8]/90 text-center shadow-xl backdrop-blur-md sm:h-44 sm:w-44">
        <div>
          <p className="font-display text-3xl text-[#5C3A57]">ॐ</p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-[#B784A7]">
            Astrogyan
          </p>
        </div>
      </div>

      <div className="absolute -left-3 top-8 z-20">
        <StatBadge value={siteConfig.stats[0].value} label={siteConfig.stats[0].label} />
      </div>

      <div className="absolute -right-3 top-32 z-20">
        <StatBadge value={siteConfig.stats[1].value} label={siteConfig.stats[1].label} />
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <StatBadge value={siteConfig.stats[2].value} label={siteConfig.stats[2].label} />
      </div>
    </div>
  );
}