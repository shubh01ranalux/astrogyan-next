import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import LoveCalculator from "@/components/calculators/fun/LoveCalculator";

export default function LoveCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Fun Tool"
        title="Love Calculator"
        description="Check a fun love compatibility score using your name and your partner’s name, with a light-hearted AstroGyan relationship report."
      />

      <LoveCalculator />

      <Footer />
    </main>
  );
}