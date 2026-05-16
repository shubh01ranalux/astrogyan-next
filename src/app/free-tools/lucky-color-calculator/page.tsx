import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import LuckyColorCalculator from "@/components/calculators/numerology/LuckyColorCalculator";

export default function LuckyColorCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Lucky Color Calculator"
        description="Find your lucky colors using numerology and get a complete AstroGyan report with support colors, avoid colors, usage guidance and remedies."
      />

      <LuckyColorCalculator />

      <Footer />
    </main>
  );
}