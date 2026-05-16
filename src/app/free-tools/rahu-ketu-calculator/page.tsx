import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import RahuKetuCalculator from "@/components/calculators/astrology/RahuKetuCalculator";

export default function RahuKetuCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Vedic Astrology"
        title="Rahu Ketu Calculator"
        description="Calculate Rahu and Ketu signs, houses and karmic axis using your Vedic birth chart, with lessons, impact, what to do, what to avoid and remedy."
      />

      <RahuKetuCalculator />

      <Footer />
    </main>
  );
}