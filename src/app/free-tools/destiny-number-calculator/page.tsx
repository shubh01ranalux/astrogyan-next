import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import DestinyNumberCalculator from "@/components/calculators/numerology/DestinyNumberCalculator";

export default function DestinyNumberCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Destiny Number Calculator"
        description="Calculate your Destiny Number from your date of birth and get a complete AstroGyan report with personality, career, relationship, money, lucky colours, dates and remedies."
      />

      <DestinyNumberCalculator />

      <Footer />
    </main>
  );
}