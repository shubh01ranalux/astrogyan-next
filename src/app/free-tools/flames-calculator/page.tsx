import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function FlamesCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero
        eyebrow="Free Calculator"
        title="FLAMES Calculator"
        description="Check a fun relationship result using the classic FLAMES method."
      />
      <BasicCalculatorClient type="flames" />
      <Footer />
    </main>
  );
}