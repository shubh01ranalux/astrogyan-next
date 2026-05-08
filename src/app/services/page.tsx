import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Astrogyan Services"
        title="Personalized Vedic Guidance"
        description="Choose from focused astrology consultations designed to bring clarity, timing, and practical direction into your life decisions."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/55 p-7 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/75"
            >
              <h2 className="font-display text-3xl text-[#5C3A57]">
                {service.title}
              </h2>

              <p className="mt-4 leading-7 text-[#6F5B69]">
                {service.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-[#E6C89C]/40 pt-5">
                <div>
                  <p className="text-2xl font-semibold text-[#5C3A57]">
                    {service.price}
                  </p>
                  <p className="text-sm text-[#B784A7]">{service.duration}</p>
                </div>

                <Button>Book</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}