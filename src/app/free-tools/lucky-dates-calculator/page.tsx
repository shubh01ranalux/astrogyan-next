import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import LuckyDatesCalculator from "@/components/calculators/numerology/LuckyDatesCalculator";

export default function LuckyDatesCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Lucky Dates Calculator"
        description="Find your lucky dates using numerology and get a complete AstroGyan report for career, money, relationships, decisions and remedies."
      />

      <LuckyDatesCalculator />

      <Footer />
    </main>
  );
}