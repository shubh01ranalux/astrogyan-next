import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BabyNameGenerator from "@/components/calculators/astrology/BabyNameGenerator";

export default function BabyNameGeneratorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free AI Astrology Tool"
        title="Baby Name Generator"
        description="Generate modern, traditional and meaningful baby names using Nakshatra astrology or parents’ combined numerology."
      />

      <BabyNameGenerator />

      <Footer />
    </main>
  );
}