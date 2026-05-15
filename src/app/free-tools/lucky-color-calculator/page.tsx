import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function LuckyColorCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Lucky Color Calculator" description="Find your lucky colors based on your birth date numerology." />
      <BasicCalculatorClient type="lucky-color" />
      <Footer />
    </main>
  );
}