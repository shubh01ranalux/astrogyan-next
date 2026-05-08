import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-[#E6C89C]/50 bg-[#5C3A57] px-8 py-16 text-center shadow-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#E6C89C]">
          Begin your guidance journey
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-[#F6EEE8] sm:text-6xl">
          Find clarity before your next important decision.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-[#F6EEE8]/75">
          Book a consultation and receive personalized Vedic guidance based on
          your birth details and life questions.
        </p>

        <div className="mt-9">
          <Button>Book Consultation</Button>
        </div>
      </div>
    </section>
  );
}