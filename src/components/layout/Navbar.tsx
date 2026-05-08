"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-40 w-full px-4 py-4 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#E6C89C]/40 bg-[#F6EEE8]/80 px-5 py-3 shadow-sm backdrop-blur-xl">
          <Link href="/" className="font-display text-2xl text-[#5C3A57]">
            Astrogyan
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full border border-[#E6C89C]/50 p-2 text-[#5C3A57] transition hover:bg-[#E6C89C]/30"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}