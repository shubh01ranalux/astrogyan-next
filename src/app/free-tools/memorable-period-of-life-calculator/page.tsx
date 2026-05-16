import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import MemorablePeriodCalculator from "@/components/calculators/numerology/MemorablePeriodCalculator";

export default function MemorablePeriodOfLifeCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Memorable Period of Life Calculator"
        description="Find important life phases and milestone ages using numerology, including career, relationship, money patterns and remedies."
      />

      <MemorablePeriodCalculator />

      <Footer />
    </main>
  );
}