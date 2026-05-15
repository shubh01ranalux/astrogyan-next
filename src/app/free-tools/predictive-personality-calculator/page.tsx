import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function PredictivePersonalityCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Predictive Personality Calculator" description="Get a simple personality reading from your name and birth date." />
      <BasicCalculatorClient type="predictive-personality" />
      <Footer />
    </main>
  );
}