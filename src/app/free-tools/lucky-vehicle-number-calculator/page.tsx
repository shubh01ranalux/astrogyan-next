import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function LuckyVehicleNumberCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Lucky Vehicle Number Calculator" description="Check the numerology vibration of your vehicle number." />
      <BasicCalculatorClient type="vehicle-number" />
      <Footer />
    </main>
  );
}