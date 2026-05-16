import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import NakshatraCalculator from "@/components/calculators/astrology/NakshatraCalculator";

export default function NakshatraCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Vedic Astrology"
        title="Nakshatra Calculator"
        description="Calculate your birth Nakshatra using birth date, birth time and birth place, with personality, career, relationship, deity, lord and remedy."
      />

      <NakshatraCalculator />

      <Footer />
    </main>
  );
}