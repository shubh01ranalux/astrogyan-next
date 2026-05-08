import Link from "next/link";
import Button from "@/components/ui/Button";

type CTASectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
};

export default function CTASection({
  eyebrow = "Begin your guidance journey",
  title = "Find clarity before your next important decision.",
  description = "Book a consultation and receive personalized Vedic guidance based on your birth details and life questions.",
  buttonText = "Book Consultation",
  buttonHref = "/book",
  backgroundImage = "",
}: CTASectionProps) {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#E6C89C]/50 bg-[#5C3A57] px-8 py-16 text-center shadow-xl"
        style={
          backgroundImage
            ? {
                backgroundImage: `linear-gradient(rgba(92, 58, 87, 0.82), rgba(92, 58, 87, 0.92)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <p className="text-sm uppercase tracking-[0.35em] text-[#E6C89C]">
          {eyebrow}
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-[#F6EEE8] sm:text-6xl">
          {title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#F6EEE8]/75">
          {description}
        </p>

        <div className="mt-9">
          <Link href={buttonHref}>
            <Button>{buttonText}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}