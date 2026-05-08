"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  text: string;
  rating: number;
};

export default function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [paused, setPaused] = useState(false);

  const loopItems = [...testimonials, ...testimonials];

  if (testimonials.length === 0) return null;

  return (
    <div
      className="overflow-hidden py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex gap-6"
        animate={paused ? { x: undefined } : { x: ["0%", "-50%"] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loopItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
            className="min-w-[320px] rounded-[2rem] border border-[#D8A7B1]/40 bg-[#F6EEE8]/70 p-7 shadow-sm backdrop-blur-md sm:min-w-[420px]"
          >
            <p className="text-[#B784A7]">
              {"★".repeat(item.rating || 5)}
            </p>

            <p className="mt-4 text-lg leading-8 text-[#6F5B69]">
              “{item.text}”
            </p>

            <p className="mt-6 font-semibold text-[#5C3A57]">
              {item.name}
            </p>

            {item.role && (
              <p className="mt-1 text-sm text-[#B784A7]">
                {item.role}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}