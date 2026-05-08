"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import type { NavigationItem } from "@/lib/navigation";

type NavbarProps = {
  logo?: string;
  title?: string;
  navigationItems?: NavigationItem[];
};

export default function Navbar({
  logo = "",
  title = "Astrogyan",
  navigationItems = [],
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navbarItems = navigationItems.filter(
    (item) => item.location === "navbar" || item.location === "both"
  );

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

          <div className="hidden items-center gap-6 lg:flex">
            {navbarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm font-medium text-[#5C3A57] transition hover:text-[#B784A7]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full border border-[#E6C89C]/50 p-2 text-[#5C3A57] transition hover:bg-[#E6C89C]/30 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigationItems={navbarItems}
      />
    </>
  );
}