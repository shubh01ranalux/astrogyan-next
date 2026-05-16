import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import LuckyVehicleNumberCalculator from "@/components/calculators/numerology/LuckyVehicleNumberCalculator";

export default function LuckyVehicleNumberCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Lucky Vehicle Number Calculator"
        description="Check the numerology vibration of your car, bike or vehicle number and get a complete AstroGyan report with travel, safety, money energy and remedies."
      />

      <LuckyVehicleNumberCalculator />

      <Footer />
    </main>
  );
}