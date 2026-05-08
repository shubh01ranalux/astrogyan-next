import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import { getTestimonials } from "@/lib/testimonials";

type TestimonialsSectionProps = {
  title?: string;
  subtitle?: string;
};

export default async function TestimonialsSection({
  title = "Client Experiences",
  subtitle = "Real stories of clarity, guidance, and spiritual confidence.",
}: TestimonialsSectionProps) {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={title} subtitle={subtitle} />

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}