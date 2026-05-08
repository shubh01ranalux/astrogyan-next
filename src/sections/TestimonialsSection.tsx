import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Client Experiences"
          subtitle="Real stories of clarity, guidance, and spiritual confidence."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-[#D8A7B1]/40 bg-[#F6EEE8]/70 p-7 shadow-sm backdrop-blur-md"
            >
              <p className="text-lg leading-8 text-[#6F5B69]">
                “{item.text}”
              </p>

              <p className="mt-6 font-semibold text-[#5C3A57]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}