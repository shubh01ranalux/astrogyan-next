import Image from "next/image";
import Link from "next/link";
import type { NavigationItem } from "@/lib/navigation";

type FooterProps = {
  title?: string;
  subtitle?: string;
  logo?: string;
  navigationItems?: NavigationItem[];
};

export default function Footer({
  title = "Astrogyan",
  subtitle = "Ancient Vedic Wisdom for Modern Life",
  logo = "",
  navigationItems = [],
}: FooterProps) {
  const footerItems = navigationItems.filter(
    (item) => item.location === "footer" || item.location === "both"
  );

  return (
    <footer className="relative border-t border-[#E6C89C]/40 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {logo ? (
            <Image
              src={logo}
              alt={title}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : null}

          <div>
            <h3 className="font-display text-3xl text-[#5C3A57]">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[#6F5B69]">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-[#5C3A57]">
          {footerItems.map((item) => (
            <Link key={item.id} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}