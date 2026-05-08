import SectionHeading from "@/components/ui/SectionHeading";
import { getCertificates } from "@/lib/certificates";

type CertificatesSectionProps = {
  title?: string;
  subtitle?: string;
};

export default async function CertificatesSection({
  title = "Trusted & Certified Guidance",
  subtitle = "Astrogyan focuses on clarity, ethics, and personalized Vedic guidance.",
}: CertificatesSectionProps) {
  const certificates = await getCertificates();

  if (certificates.length === 0) return null;

  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid gap-6 md:grid-cols-3">
          {certificates.map((item) => (
            <div
              key={item.id}
              className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/55 p-7 text-center shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/75"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#E6C89C]/60 bg-[#F6EEE8] text-2xl text-[#5C3A57]">
                {item.icon || "✦"}
              </div>

              <h3 className="mt-6 font-display text-2xl text-[#5C3A57]">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-[#6F5B69]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}