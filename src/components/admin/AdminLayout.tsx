"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";
import AdminLogoutButton from "./AdminLogoutButton";
import { adminNavigation } from "@/data/admin";

type AdminLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AdminLayout({
  title,
  description,
  children,
}: AdminLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <main className="flex min-h-screen overflow-x-hidden">
      <AdminSidebar />

      <section className="min-h-screen flex-1 px-5 py-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between gap-4 rounded-[1.5rem] border border-[#E6C89C]/40 bg-white/60 p-4 shadow-sm backdrop-blur-md">
          <div>
            <h1 className="font-display text-3xl text-[#5C3A57] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-1 text-sm text-[#6F5B69]">{description}</p>
          </div>

          <div className="flex items-center gap-3">
            <AdminLogoutButton />

            <button
              onClick={() => setOpen(true)}
              className="rounded-full border border-[#E6C89C]/50 p-2 text-[#5C3A57] lg:hidden"
              aria-label="Open admin menu"
            >
              <Menu />
            </button>
          </div>
        </div>

        {children}
      </section>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#5C3A57]/30 backdrop-blur-sm lg:hidden">
          <div className="ml-auto h-full w-[82%] max-w-sm bg-[#F6EEE8] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-3xl text-[#5C3A57]">
                  Astrogyan
                </h2>
                <p className="text-sm text-[#B784A7]">Admin Console</p>
              </div>

              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="text-[#5C3A57]" />
              </button>
            </div>

            <nav className="mt-10 space-y-2">
              {adminNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-full px-5 py-3 text-sm text-[#5C3A57] hover:bg-white/70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </main>
  );
}