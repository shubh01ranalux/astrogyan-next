"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

type NavbarProps = {
  logo?: string;
  title?: string;
};

export default function Navbar({
  logo = "",
  title = "Astrogyan",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-40 w-full px-4 py-4 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-[#E6C89C]/40 bg-[#F6EEE8]/80 px-5 py-3 shadow-sm backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            {logo ? (
              <Image
                src={logo}
                alt={title}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : null}

            <span className="font-display text-2xl text-[#5C3A57]">
              {title}
            </span>
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