import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getFreeTools } from "@/lib/free-tools";
import { getSiteSettings } from "@/lib/site-settings";

export default async function FreeToolsPage() {
  const tools = await getFreeTools();
  const settings = await getSiteSettings();

  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
      />

      <PageHero
        eyebrow="Free Astrology Tools"
        title="Explore Free Astrogyan Tools"
        description="Use free astrology, numerology, Panchang, gemstone, and spiritual tools. Some tools are available now, while advanced calculators are coming soon."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          {tools.length > 0 && (
            <div className="mb-10 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className="rounded-full border border-[#5C3A57]/15 bg-white px-5 py-2 text-sm font-medium text-[#5C3A57] transition hover:bg-[#5C3A57] hover:text-white"
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {tools.length === 0 ? (
            <p className="text-center text-[#6F5B69]">No tools added yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/55 p-7 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/75"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E6C89C]/50 bg-[#F6EEE8] text-2xl text-[#5C3A57]">
                    {tool.icon || "✦"}
                  </div>

                  <p className="mt-6 text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                    {tool.category}
                  </p>

                  <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
                    {tool.title}
                  </h2>

                  <p className="mt-4 leading-7 text-[#6F5B69]">
                    {tool.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E6C89C]/40 pt-5">
                    <span
                      className={`rounded-full px-4 py-2 text-xs font-medium ${
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
                      className="rounded-full bg-[#5C3A57] px-5 py-3 text-sm text-[#F6EEE8] transition hover:bg-[#B784A7]"
                    >
                      {tool.button_text || "View Tool"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
        subtitle={settings.site_tagline || "Ancient Vedic Wisdom for Modern Life"}
      />
    </main>
  );
}