import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import KundaliBasicReportClient from "@/components/tools/KundaliBasicReportClient";
import { getSiteSettings } from "@/lib/site-settings";

export default async function KundaliReportPage() {
  const settings = await getSiteSettings();

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
      />

      <PageHero
        eyebrow="Free Kundali Tool"
        title="Basic Kundali Report"
        description="Generate a basic Vedic birth chart with Lagna, planetary positions, houses and downloadable PDF report."
      />

      <KundaliBasicReportClient />

      <Footer
        logo={settings.site_logo}
        title={settings.site_name || "Astrogyan"}
        subtitle={
          settings.site_tagline || "Ancient Vedic Wisdom for Modern Life"
        }
      />
    </main>
  );
}