import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import FavourableAlphabetNumbersCalculator from "@/components/calculators/numerology/FavourableAlphabetNumbersCalculator";

export default function FavourableAlphabetNumbersCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Free Numerology"
        title="Favourable Alphabet and Numbers Calculator"
        description="Find your favourable alphabets, numbers and dates using numerology for names, usernames, business names, planning and remedies."
      />

      <FavourableAlphabetNumbersCalculator />

      <Footer />
    </main>
  );
}