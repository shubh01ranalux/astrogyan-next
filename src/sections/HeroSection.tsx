import Link from "next/link";
import Button from "@/components/ui/Button";
import ZodiacWheel from "@/components/visuals/ZodiacWheel";

type HeroSectionProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
};

export default function HeroSection({
  eyebrow = "Premium Vedic Astrology",
  title = "Astrogyan",
  subtitle = "Your Gateway to Accurate & Personalized Vedic Astrology",
  description = "Discover your life path, career guidance, relationship compatibility, and spiritual clarity through personalized Vedic astrology insights.",
  primaryButtonText = "Book Consultation",
  secondaryButtonText = "Explore Services",
  primaryButtonHref = "/book",
  secondaryButtonHref = "/services",
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 sm:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#B784A7]">
            {eyebrow}
          </p>

          <h1 className="font-display text-5xl leading-tight text-[#5C3A57] sm:text-7xl">
            {title}
          </h1>

          <h2 className="mt-4 max-w-xl font-display text-3xl leading-snug text-[#B784A7] sm:text-5xl">
            {subtitle}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#6F5B69] sm:text-lg">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href={primaryButtonHref}>
              <Button>{primaryButtonText}</Button>
            </Link>

            <Link
              href={secondaryButtonHref}
              className="rounded-full border border-[#5C3A57]/20 px-6 py-3 text-center text-sm font-medium text-[#5C3A57] transition hover:bg-white/50"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>

        <ZodiacWheel />
      </div>
    </section>
  );
}