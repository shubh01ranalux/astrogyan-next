import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import FlamesCalculator from "@/components/calculators/fun/FlamesCalculator";

export default function FlamesCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Fun Tool"
        title="FLAMES Calculator"
        description="Check a fun relationship result using your name and your partner’s name, with a light-hearted AstroGyan compatibility report."
      />

      <FlamesCalculator />

      <Footer />
    </main>
  );
}