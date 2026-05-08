import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Reach out for consultations, collaborations, or spiritual guidance."
      />

      <section className="px-6 py-24 sm:px-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#E6C89C]/40 bg-white/60 p-8 shadow-sm backdrop-blur-md">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                Email
              </p>

              <p className="mt-2 text-lg text-[#5C3A57]">
                hello@astrogyan.in
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                Instagram
              </p>

              <p className="mt-2 text-lg text-[#5C3A57]">
                @astrogyan_31
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                WhatsApp
              </p>

              <p className="mt-2 text-lg text-[#5C3A57]">
                Available Soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}