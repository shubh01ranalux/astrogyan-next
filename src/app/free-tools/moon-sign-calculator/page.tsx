import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import MoonSignCalculator from "@/components/calculators/astrology/MoonSignCalculator";

export default function MoonSignCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Vedic Astrology"
        title="Moon Sign Calculator"
        description="Calculate your Vedic Moon Sign using birth date, birth time and birth place, with emotional pattern, career tendency, relationship nature and remedy."
      />

      <MoonSignCalculator />

      <Footer />
    </main>
  );
}