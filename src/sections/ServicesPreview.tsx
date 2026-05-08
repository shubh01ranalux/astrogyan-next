import SectionHeading from "@/components/ui/SectionHeading";
import { getServices } from "@/lib/services";

type ServicesPreviewProps = {
  title?: string;
  subtitle?: string;
};

export default async function ServicesPreview({
  title = "Popular Services",
  subtitle = "Guidance designed for clarity, timing, and practical decisions.",
}: ServicesPreviewProps) {
  const services = await getServices();

  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <div
              key={service.id}
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