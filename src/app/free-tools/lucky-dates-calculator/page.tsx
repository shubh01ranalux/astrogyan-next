import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function LuckyDatesCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Lucky Dates Calculator" description="Discover your favorable dates based on your birth number." />
      <BasicCalculatorClient type="lucky-dates" />
      <Footer />
    </main>
  );
}