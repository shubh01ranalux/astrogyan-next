import SectionHeading from "@/components/ui/SectionHeading";

type AboutSectionProps = {
  title?: string;
  subtitle?: string;
  description?: string;
};

export default function AboutSection({
  title = "What is Astrogyan?",
  subtitle = "Astrogyan is a modern Vedic astrology platform created to make ancient wisdom simple, practical, and accessible.",
  description = "From personalized consultations and Panchang insights to puja services, gemstones, and free astrology tools, Astrogyan helps you find clarity before making important decisions in life.",
}: AboutSectionProps) {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#E6C89C]/40 bg-white/45 p-8 shadow-sm backdrop-blur-md sm:p-12">
        <SectionHeading title={title} subtitle={subtitle} />

        <p className="mx-auto max-w-3xl text-center text-lg leading-9 text-[#6F5B69]">
          {description}
        </p>
      </div>
    </section>
  );
}