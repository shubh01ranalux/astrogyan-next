import Image from "next/image";
import Link from "next/link";
import type { NavigationItem } from "@/lib/navigation";

type FooterProps = {
  title?: string;
  subtitle?: string;
  navigationItems?: NavigationItem[];
};

export default function Footer({
  title = "AstroGyan",
  subtitle = "Ancient Vedic Wisdom for Modern Life",
  navigationItems = [],
}: FooterProps) {
  const footerItems = navigationItems.filter(
    (item) => item.location === "footer" || item.location === "both"
  );

  return (
    <footer className="relative border-t border-[#E6C89C]/30 bg-[#F6EEE8]/55 px-6 py-6 backdrop-blur-sm sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-2">
              <Image
                src="/logos/astrogyan-logo-horizontal.png"
                alt={title}
                width={220}
                height={72}
                className="h-auto w-[155px] object-contain sm:w-[190px]"
                priority
              />

              <p className="text-sm text-[#6F5B69]">
                {subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#B784A7]">
                Powered<br />By
              </span>

              <Link
                href="https://sskdivine.in"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-[1.03]"
              >
                <Image
                  src="/logos/ssk-divine-logo-horizontal.png"
                  alt="SSK Divine"
                  width={170}
                  height={58}
                  className="h-auto w-[92px] object-contain sm:w-[115px]"
                />
              </Link>
            </div>
          </div>

          {footerItems.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#5C3A57] md:justify-end">
              {footerItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="transition hover:text-[#B784A7]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-[#E6C89C]/20 pt-4 text-center text-xs text-[#8B7285]">
          © {new Date().getFullYear()} AstroGyan • Ancient Wisdom Reimagined
        </div>
      </div>
    </footer>
  );
}