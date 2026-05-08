import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getFreeTools } from "@/lib/free-tools";

export default async function FreeToolsPage() {
  const tools = await getFreeTools();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Astrology Tools"
        title="Explore Free Astrogyan Tools"
        description="Use free astrology, numerology, Panchang, gemstone, and spiritual tools. Some tools are available now, while advanced calculators are coming soon."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.length === 0 && (
            <p className="text-[#6F5B69]">No tools added yet.</p>
          )}

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
                <span className="rounded-full bg-[#D8A7B1]/25 px-4 py-2 text-xs text-[#5C3A57]">
                  {tool.status}
                </span>

                {tool.link ? (
                  <Link
                    href={tool.link}
                    className="rounded-full bg-[#5C3A57] px-5 py-3 text-sm text-[#F6EEE8] transition hover:bg-[#B784A7]"
                  >
                    {tool.button_text || "Open Tool"}
                  </Link>
                ) : (
                  <button
                    disabled
                    className="rounded-full border border-[#5C3A57]/20 px-5 py-3 text-sm text-[#5C3A57]/60"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}