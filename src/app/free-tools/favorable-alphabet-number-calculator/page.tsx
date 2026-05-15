import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import BasicCalculatorClient from "@/components/tools/BasicCalculatorClient";

export default function FavorableAlphabetNumberCalculatorPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <PageHero eyebrow="Free Numerology" title="Favorable Alphabet & Number Calculator" description="Find favorable alphabets and numbers based on your birth date." />
      <BasicCalculatorClient type="favorable-alphabet" />
      <Footer />
    </main>
  );
}