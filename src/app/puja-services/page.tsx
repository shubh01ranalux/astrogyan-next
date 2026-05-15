import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import { getPujaServices } from "@/lib/puja-services";

export default async function PujaServicesPage() {
  const pujas = await getPujaServices();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Puja Services"
        title="Sacred Rituals for Peace & Growth"
        description="Book personalized puja services for grah shanti, protection, prosperity, health, marriage, and spiritual upliftment."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          {pujas.length === 0 ? (
            <p className="text-[#6F5B69]">No puja services available yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pujas.map((puja) => (
                <div
                  key={puja.id}
                  className="rounded-[2rem] border border-[#E6C89C]/40 bg-white/55 p-7 shadow-sm backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/75"
                >
                  <h2 className="font-display text-3xl text-[#5C3A57]">
                    {puja.title}
                  </h2>

                  <p className="mt-4 leading-7 text-[#6F5B69]">
                    {puja.description}
                  </p>

                  {puja.benefits && (
                    <p className="mt-4 rounded-[1rem] bg-[#F6EEE8]/80 p-4 text-sm leading-7 text-[#5C3A57]">
                      {puja.benefits}
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between border-t border-[#E6C89C]/40 pt-5">
                    <div>
                      <p className="text-2xl font-semibold text-[#5C3A57]">
                        ₹{puja.price || 0}
                      </p>

                      <p className="text-sm text-[#B784A7]">
                        {puja.duration || "Custom duration"}
                      </p>
                    </div>

                    <Link href={`/book?service=${puja.slug}`}>
                      <Button>Book Puja</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}