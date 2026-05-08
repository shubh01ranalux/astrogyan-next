import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export default function PanchangPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Daily Panchang"
        title="Today’s Panchang"
        description="View daily tithi, nakshatra, rahu kaal, choghadiya and auspicious timings."
      />

      <section className="px-6 py-24 sm:px-10">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {[
            ["Tithi", "Coming Soon"],
            ["Nakshatra", "Coming Soon"],
            ["Rahu Kaal", "Coming Soon"],
            ["Choghadiya", "Coming Soon"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/60 p-7 shadow-sm backdrop-blur-md"
            >
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                {label}
              </p>
              <h2 className="mt-3 font-display text-3xl text-[#5C3A57]">
                {value}
              </h2>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}