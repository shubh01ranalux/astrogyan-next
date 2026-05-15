import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function LoveCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero
        eyebrow="Free Calculator"
        title="Love Calculator"
        description="Calculate a fun love compatibility score based on names."
      />
      <BasicCalculatorClient type="love" />
      <Footer />
    </main>
  );
}