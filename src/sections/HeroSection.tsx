import Button from "@/components/ui/Button";
import ZodiacWheel from "@/components/visuals/ZodiacWheel";
import { siteConfig } from "@/data/site";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 sm:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#B784A7]">
            Premium Vedic Astrology
          </p>

          <h1 className="font-display text-5xl leading-tight text-[#5C3A57] sm:text-7xl">
            {siteConfig.name}
          </h1>

          <h2 className="mt-4 max-w-xl font-display text-3xl leading-snug text-[#B784A7] sm:text-5xl">
            {siteConfig.tagline}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#6F5B69] sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button>Book Consultation</Button>
            <button className="rounded-full border border-[#5C3A57]/20 px-6 py-3 text-sm font-medium text-[#5C3A57] transition hover:bg-white/50">
              Explore Services
            </button>
          </div>
        </div>

        <ZodiacWheel />
      </div>
    </section>
  );
}