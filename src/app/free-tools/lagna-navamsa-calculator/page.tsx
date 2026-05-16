import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import LagnaNavamsaCalculator from "@/components/calculators/astrology/LagnaNavamsaCalculator";

export default function LagnaNavamsaCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Vedic Astrology"
        title="Lagna Navamsa Calculator"
        description="Calculate your Lagna using your Vedic birth chart and understand personality, life direction, first-house planets and Navamsa/D9 guidance."
      />

      <LagnaNavamsaCalculator />

      <Footer />
    </main>
  );
}