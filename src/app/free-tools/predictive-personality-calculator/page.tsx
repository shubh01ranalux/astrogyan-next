import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import PredictivePersonalityCalculator from "@/components/calculators/numerology/PredictivePersonalityCalculator";

export default function PredictivePersonalityCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Predictive Personality Calculator"
        description="Get a personality prediction using your full name and date of birth, including career, money, relationship, strengths, challenges and remedies."
      />

      <PredictivePersonalityCalculator />

      <Footer />
    </main>
  );
}