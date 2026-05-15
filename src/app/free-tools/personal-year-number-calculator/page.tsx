import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function PersonalYearNumberCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero
        eyebrow="Free Numerology"
        title="Personal Year Number Calculator"
        description="Discover the numerology theme of your current year."
      />
      <BasicCalculatorClient type="personal-year" />
      <Footer />
    </main>
  );
}