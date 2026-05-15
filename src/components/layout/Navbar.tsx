"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import type { NavigationItem } from "@/lib/navigation";
import { createClient } from "@/lib/supabase/client";

type NavbarProps = {
  logo?: string;
  title?: string;
  navigationItems?: NavigationItem[];
};

const fallbackItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    location: "navbar",
    is_active: true,
    display_order: 0,
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    location: "navbar",
    is_active: true,
    display_order: 1,
  },
  {
    id: "free-tools",
    label: "Free Tools",
    href: "/free-tools",
    location: "navbar",
    is_active: true,
    display_order: 2,
  },
  {
    id: "puja-services",
    label: "Puja Services",
    href: "/puja-services",
    location: "navbar",
    is_active: true,
    display_order: 3,
  },
  {
    id: "book",
    label: "Book",
    href: "/book",
    location: "navbar",
    is_active: true,
    display_order: 4,
  },
];

export default function Navbar({
  logo = "",
  title = "Astrogyan",
  navigationItems = [],
}: NavbarProps) {
  const supabase = createClient();

  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<NavigationItem[]>(navigationItems);

  useEffect(() => {
    async function loadNavigation() {
      const { data, error } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("is_active", true)
        .in("location", ["navbar", "both"])
        .order("display_order", { ascending: true });

      if (!error && data?.length) {
        setItems(data);
      }
    }

    if (navigationItems.length === 0) {
      loadNavigation();
    }
  }, [supabase, navigationItems.length]);

  const navbarItems = useMemo(() => {
    const source = items.length > 0 ? items : fallbackItems;

    return source.filter(
      (item) => item.location === "navbar" || item.location === "both"
    );
  }, [items]);

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
            className="rounded-full border border-[#E6C89C]/50 p-2 text-[#5C3A57] transition hover:bg-[#E6C89C]/30"
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