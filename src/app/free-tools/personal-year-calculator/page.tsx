import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import PersonalYearCalculator from "@/components/calculators/numerology/PersonalYearCalculator";

export default function PersonalYearCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Personal Year Calculator"
        description="Calculate your Personal Year Number and get a complete AstroGyan report for your yearly theme, career, money, love, health, lucky colours, lucky dates and remedies."
      />

      <PersonalYearCalculator />

      <Footer />
    </main>
  );
}