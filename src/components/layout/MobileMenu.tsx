"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { NavigationItem } from "@/lib/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navigationItems?: NavigationItem[];
};

export default function MobileMenu({
  isOpen,
  onClose,
  navigationItems = [],
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2F1F2D]/40 backdrop-blur-sm lg:hidden">
      <div className="ml-auto h-full w-80 max-w-[85vw] bg-[#F6EEE8] p-6 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-display text-2xl text-[#5C3A57]">
            Astrogyan
          </p>

          <button
            onClick={onClose}
            className="rounded-full border border-[#E6C89C]/50 p-2 text-[#5C3A57]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="rounded-2xl border border-[#E6C89C]/40 bg-white/50 px-4 py-3 text-[#5C3A57]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}