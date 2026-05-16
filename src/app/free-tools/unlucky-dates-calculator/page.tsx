import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import UnluckyDatesCalculator from "@/components/calculators/numerology/UnluckyDatesCalculator";

export default function UnluckyDatesCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Unlucky Dates Calculator"
        description="Find dates that may need extra awareness based on your numerology vibration, with balancing dates, safe uses and remedies."
      />

      <UnluckyDatesCalculator />

      <Footer />
    </main>
  );
}