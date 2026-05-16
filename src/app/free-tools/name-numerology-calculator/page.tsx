import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import NameNumerologyCalculator from "@/components/calculators/numerology/NameNumerologyCalculator";

export default function NameNumerologyCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Name Numerology Calculator"
        description="Calculate your name number using Chaldean numerology and get a complete AstroGyan report with personality, career, relationship, money, lucky colours, lucky dates and remedies."
      />

      <NameNumerologyCalculator />

      <Footer />
    </main>
  );
}