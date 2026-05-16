import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import KundliMatchingCalculator from "@/components/calculators/astrology/KundliMatchingCalculator";

export default function KundliMatchingCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Vedic Astrology"
        title="Kundli Matching Calculator"
        description="Match two Kundlis using Vedic Moon Sign and Nakshatra data, with compatibility summary, cautions, what to do, what to avoid and remedy."
      />

      <KundliMatchingCalculator />

      <Footer />
    </main>
  );
}