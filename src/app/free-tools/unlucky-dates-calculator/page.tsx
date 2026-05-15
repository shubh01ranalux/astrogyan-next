import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function UnluckyDatesCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Unlucky Dates Calculator" description="Find dates that may require extra caution according to numerology." />
      <BasicCalculatorClient type="unlucky-dates" />
      <Footer />
    </main>
  );
}