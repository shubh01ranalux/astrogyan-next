import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import UnluckyColorCalculator from "@/components/calculators/numerology/UnluckyColorCalculator";

export default function UnluckyColorCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Unlucky Color Calculator"
        description="Find which colors may be less supportive for your numerology vibration and get balancing colors, practical guidance and remedies."
      />

      <UnluckyColorCalculator />

      <Footer />
    </main>
  );
}