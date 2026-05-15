import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function UnluckyColorCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Unlucky Color Calculator" description="Find colors that may feel less supportive for your numerology vibration." />
      <BasicCalculatorClient type="unlucky-color" />
      <Footer />
    </main>
  );
}