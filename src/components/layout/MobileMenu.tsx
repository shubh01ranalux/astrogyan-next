"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { navigationItems } from "@/data/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm border-l border-[#E6C89C]/40 bg-[#F6EEE8]/95 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-[#E6C89C]/40 px-6 py-5">
        <h2 className="font-display text-2xl text-[#5C3A57]">
          Astrogyan
        </h2>

        <button onClick={onClose}>
          <X className="text-[#5C3A57]" />
        </button>
      </div>

      <div className="flex flex-col gap-6 px-6 py-10">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-lg text-[#5C3A57]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}