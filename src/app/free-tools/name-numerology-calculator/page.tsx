import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function NameNumerologyCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero
        eyebrow="Free Numerology"
        title="Name Numerology Calculator"
        description="Find your name number and its basic numerology meaning."
      />
      <BasicCalculatorClient type="name-numerology" />
      <Footer />
    </main>
  );
}