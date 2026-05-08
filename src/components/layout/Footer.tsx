import Link from "next/link";
import { navigationItems } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#E6C89C]/40 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-3xl text-[#5C3A57]">
            Astrogyan
          </h3>
          <p className="mt-2 text-sm text-[#6F5B69]">
            Ancient Vedic Wisdom for Modern Life
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-[#5C3A57]">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}