import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function LoShuGridCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Lo Shu Grid Calculator" description="Create a basic Lo Shu Grid from your date of birth." />
      <BasicCalculatorClient type="lo-shu-grid" />
      <Footer />
    </main>
  );
}