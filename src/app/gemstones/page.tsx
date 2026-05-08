import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import { divyaRatnaShopUrl, gemstoneHighlights } from "@/data/gemstones";

export default function GemstonesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="DivyaRatna by Astrogyan"
        title="Gemstone & Crystal Guidance"
        description="Get personalized gemstone, crystal, and bracelet recommendations based on your kundli, planetary weaknesses, and life concerns."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/60 p-8 shadow-sm backdrop-blur-md">
            <p className="text-sm uppercase tracking-[0.3em] text-[#B784A7]">
              Personalized Recommendation
            </p>

            <h2 className="mt-4 font-display text-4xl text-[#5C3A57] sm:text-5xl">
              Not sure which gemstone or crystal is right for you?
            </h2>

            <p className="mt-6 leading-8 text-[#6F5B69]">
              Book a gemstone recommendation consultation. Astrogyan will review
              your birth details and concerns to suggest suitable gemstones,
              crystals, bracelets, and remedies.
            </p>

            <div className="mt-8">
              <Link href="/book?service=gemstone-recommendation">
                <Button>Book Gemstone Recommendation</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E6C89C]/40 bg-[#5C3A57] p-8 text-[#F6EEE8] shadow-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#E6C89C]">
              Shop Crystals
            </p>

            <h2 className="mt-4 font-display text-4xl">
              Visit DivyaRatna Store
            </h2>

            <p className="mt-6 leading-8 text-[#F6EEE8]/75">
              Explore curated crystal bracelets, gemstones, rudraksha, and
              spiritual products through DivyaRatna by Astrogyan.
            </p>

            <a
              href={divyaRatnaShopUrl}
              target="_blank"
              className="mt-8 inline-flex rounded-full border border-[#E6C89C] px-6 py-3 text-sm font-medium text-[#F6EEE8] transition hover:bg-[#E6C89C]/20"
            >
              Shop on DivyaRatna
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3">
          {gemstoneHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/55 p-7 shadow-sm backdrop-blur-md"
            >
              <h3 className="font-display text-2xl text-[#5C3A57]">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-[#6F5B69]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}