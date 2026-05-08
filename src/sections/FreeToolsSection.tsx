import Link from "next/link";
import { getFreeTools } from "@/lib/free-tools";
import SectionHeading from "@/components/ui/SectionHeading";

type FreeToolsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default async function FreeToolsSection({
  eyebrow = "Free Astrology Tools",
  title = "Start your spiritual journey for free",
  description = "Explore Panchang, gemstone guidance, kundali insights, numerology and more AstroGyan tools.",
}: FreeToolsSectionProps) {
  const tools = await getFreeTools();
  const featuredTools = tools.slice(0, 4);

  if (!featuredTools.length) return null;

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
  eyebrow={eyebrow}
  title={title}
  description={description}
/>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              className="group rounded-3xl border border-[#E6C89C]/40 bg-white/60 p-6 shadow-xl backdrop-blur-md transition hover:-translate-y-2 hover:border-[#B784A7]/50 hover:bg-white/80"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F6EEE8] text-3xl text-[#5C3A57]">
                {tool.icon || "✦"}
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#B784A7]">
                {tool.category}
              </p>

              <h3 className="text-xl font-semibold text-[#5C3A57]">
                {tool.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6F5B69]">
                {tool.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    tool.status === "Live"
                      ? "bg-emerald-100 text-emerald-700"
                      : tool.status === "Beta"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-[#EADDE5] text-[#5C3A57]"
                  }`}
                >
                  {tool.status}
                </span>

                <Link
                  href={`/free-tools/${tool.slug}`}
                  className="text-sm font-semibold text-[#5C3A57] transition hover:text-[#B784A7]"
                >
                  {tool.button_text || "Open Tool"} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/free-tools"
            className="inline-flex rounded-full border border-[#5C3A57]/20 bg-white/60 px-6 py-3 text-sm font-semibold text-[#5C3A57] transition hover:bg-[#5C3A57] hover:text-white"
          >
            View All Free Tools
          </Link>
        </div>
      </div>
    </section>
  );
}