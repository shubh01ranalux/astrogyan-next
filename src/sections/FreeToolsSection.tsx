import Link from "next/link";
import { getFreeTools } from "@/lib/free-tools";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function FreeToolsSection() {
  const tools = await getFreeTools();
  const featuredTools = tools.slice(0, 4);

  if (!featuredTools.length) return null;

  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Free Astrology Tools"
          title="Start your spiritual journey for free"
          description="Explore Panchang, gemstone guidance, kundali insights, numerology and more AstroGyan tools."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <div
              key={tool.id}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur transition hover:-translate-y-2 hover:border-amber-400/40 hover:bg-amber-400/[0.05]"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 text-3xl">
                {tool.icon || "✦"}
              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                {tool.category}
              </p>

              <h3 className="text-xl font-semibold text-white">
                {tool.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/65">
                {tool.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="rounded-full border border-amber-300/20 px-3 py-1 text-xs text-amber-200">
                  {tool.status}
                </span>

                <Link
                  href={tool.link || "/free-tools"}
                  className="text-sm font-semibold text-amber-300 transition hover:text-amber-100"
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
            className="inline-flex rounded-full border border-amber-300/30 px-6 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300 hover:text-black"
          >
            View All Free Tools
          </Link>
        </div>
      </div>
    </section>
  );
}