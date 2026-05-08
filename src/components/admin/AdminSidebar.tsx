"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigation } from "@/data/admin";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-[#E6C89C]/40 bg-[#F6EEE8]/80 p-5 backdrop-blur-xl lg:block">
      <h1 className="font-display text-3xl text-[#5C3A57]">Astrogyan</h1>
      <p className="mt-1 text-sm text-[#B784A7]">Admin Console</p>

      <nav className="mt-10 space-y-2">
        {adminNavigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-full px-5 py-3 text-sm transition ${
                active
                  ? "bg-[#5C3A57] text-[#F6EEE8]"
                  : "text-[#5C3A57] hover:bg-white/60"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}