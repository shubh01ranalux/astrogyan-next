import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export default function ServicesPreview() {
  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Popular Services"
          subtitle="Guidance designed for clarity, timing, and practical decisions."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/50 p-6 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/70"
            >
              <h3 className="font-display text-2xl text-[#5C3A57]">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-[#6F5B69]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}