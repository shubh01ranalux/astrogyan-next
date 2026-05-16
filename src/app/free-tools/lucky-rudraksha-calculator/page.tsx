import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import LuckyRudrakshaCalculator from "@/components/calculators/astrology/LuckyRudrakshaCalculator";

export default function LuckyRudrakshaCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Vedic Astrology"
        title="Lucky Rudraksha Calculator"
        description="Find a Rudraksha recommendation using your Vedic Lagna and Moon sign, with planet logic, guidance, what to do, what to avoid and energizing remedy."
      />

      <LuckyRudrakshaCalculator />

      <Footer />
    </main>
  );
}