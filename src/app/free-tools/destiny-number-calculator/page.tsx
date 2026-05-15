import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function DestinyNumberCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero
        eyebrow="Free Numerology"
        title="Destiny Number Calculator"
        description="Calculate your destiny number from your date of birth."
      />
      <BasicCalculatorClient type="destiny-number" />
      <Footer />
    </main>
  );
}