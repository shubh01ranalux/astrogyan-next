import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import LoShuCalculator from "@/components/calculators/numerology/LoShuCalculator";

export default function LoShuGridCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Lo Shu Grid Calculator"
        description="Generate a complete AstroGyan Lo Shu Grid report from your date of birth, including personality number, destiny number, present numbers, missing numbers, arrows, strengths and remedies."
      />

      <LoShuCalculator />

      <Footer />
    </main>
  );
}