import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import FreeToolsGrid from "@/components/tools/FreeToolsGrid";
import { getFreeTools } from "@/lib/free-tools";
import { getSiteSettings } from "@/lib/site-settings";

export default async function FreeToolsPage() {
  const tools = await getFreeTools();
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
      />

      <PageHero
        eyebrow="Free Astrology Tools"
        title="Explore Free Astrogyan Tools"
        description="Use free astrology, numerology, Panchang, gemstone, and spiritual tools. Some tools are available now, while advanced calculators are coming soon."
      />

      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <FreeToolsGrid tools={tools} />
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