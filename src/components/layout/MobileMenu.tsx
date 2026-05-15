"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { NavigationItem } from "@/lib/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
};

export default function MobileMenu({
  isOpen,
  onClose,
  navigationItems,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      <div className="ml-auto flex h-full w-80 max-w-[85vw] flex-col bg-[#F6EEE8] p-6 shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl text-[#5C3A57]">
            Astrogyan
          </h2>

          <button
            onClick={onClose}
            className="rounded-full border border-[#E6C89C]/50 p-2 text-[#5C3A57]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className="rounded-2xl border border-[#E6C89C]/40 bg-white px-4 py-4 text-base font-medium text-[#5C3A57] transition hover:bg-[#E6C89C]/20"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}