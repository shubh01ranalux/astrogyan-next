import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { getSiteSettings } from "@/lib/site-settings";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const email = settings.contact_email || "hello@astrogyan.in";
  const phone = settings.contact_phone || "Available Soon";
  const whatsapp = settings.contact_whatsapp || "Available Soon";
  const address = settings.contact_address || "India";
  const instagram = settings.instagram_url || "https://instagram.com/astrogyan_31";

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
      />

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
              <Link
                href={`mailto:${email}`}
                className="mt-2 block text-lg text-[#5C3A57]"
              >
                {email}
              </Link>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                Phone
              </p>
              <p className="mt-2 text-lg text-[#5C3A57]">{phone}</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                WhatsApp
              </p>
              {settings.contact_whatsapp ? (
                <Link
                  href={`https://wa.me/${settings.contact_whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  className="mt-2 block text-lg text-[#5C3A57]"
                >
                  {whatsapp}
                </Link>
              ) : (
                <p className="mt-2 text-lg text-[#5C3A57]">{whatsapp}</p>
              )}
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                Instagram
              </p>
              <Link
                href={instagram}
                target="_blank"
                className="mt-2 block text-lg text-[#5C3A57]"
              >
                {instagram.replace("https://instagram.com/", "@")}
              </Link>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-[#B784A7]">
                Address
              </p>
              <p className="mt-2 whitespace-pre-line text-lg text-[#5C3A57]">
                {address}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
        subtitle={settings.site_tagline || "Ancient Vedic Wisdom for Modern Life"}
      />
    </main>
  );
}