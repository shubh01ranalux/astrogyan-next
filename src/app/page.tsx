import CertificatesSection from "@/sections/CertificatesSection";
import FreeToolsSection from "@/sections/FreeToolsSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ServicesPreview from "@/sections/ServicesPreview";
import TestimonialsSection from "@/sections/TestimonialsSection";
import CTASection from "@/sections/CTASection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CertificatesSection />
      <ServicesPreview />
      <FreeToolsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}