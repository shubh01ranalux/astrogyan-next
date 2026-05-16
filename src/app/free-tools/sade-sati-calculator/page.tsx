import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import SadeSatiCalculator from "@/components/calculators/astrology/SadeSatiCalculator";

export default function SadeSatiCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Vedic Astrology"
        title="Sade Sati Calculator"
        description="Check whether your Sade Sati is active using your natal Moon sign and Saturn’s current transit position, with phase, impact, what to do, what to avoid and remedy."
      />

      <SadeSatiCalculator />

      <Footer />
    </main>
  );
}