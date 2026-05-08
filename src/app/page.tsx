import CertificatesSection from "@/sections/CertificatesSection";
import FreeToolsSection from "@/sections/FreeToolsSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ServicesPreview from "@/sections/ServicesPreview";
import TestimonialsSection from "@/sections/TestimonialsSection";
import CTASection from "@/sections/CTASection";
import { getSiteContent } from "@/lib/site-content";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar
  logo={content.site_logo}
  title={content.footer_title || "Astrogyan"}
/>

      <HeroSection
        eyebrow={content.hero_badge || "Premium Vedic Astrology"}
        title={content.hero_title || "Astrogyan"}
        subtitle={
          content.hero_subtitle ||
          "Your Gateway to Accurate & Personalized Vedic Astrology"
        }
        description={
          content.hero_description ||
          "Discover your life path, career guidance, relationship compatibility, and spiritual clarity through personalized Vedic astrology insights."
        }
        primaryButtonText={content.hero_primary_cta || "Book Consultation"}
        secondaryButtonText={content.hero_secondary_cta || "Explore Services"}
      />

      <AboutSection
        title={content.about_title || "What is Astrogyan?"}
        subtitle={
          content.about_subtitle ||
          "Astrogyan is a modern Vedic astrology platform created to make ancient wisdom simple, practical, and accessible."
        }
        description={
          content.about_description ||
          "From personalized consultations and Panchang insights to puja services, gemstones, and free astrology tools, Astrogyan helps you find clarity before making important decisions in life."
        }
      />

      <CertificatesSection
        title={content.certificates_title || "Trusted & Certified Guidance"}
        subtitle={
          content.certificates_subtitle ||
          "Astrogyan focuses on clarity, ethics, and personalized Vedic guidance."
        }
      />

      <ServicesPreview
        title={content.services_title || "Popular Services"}
        subtitle={
          content.services_subtitle ||
          "Guidance designed for clarity, timing, and practical decisions."
        }
      />

      <FreeToolsSection
        eyebrow={content.free_tools_eyebrow || "Free Astrology Tools"}
        title={
          content.free_tools_title ||
          "Start your spiritual journey for free"
        }
        description={
          content.free_tools_description ||
          "Explore Panchang, gemstone guidance, kundali insights, numerology and more AstroGyan tools."
        }
      />

      <TestimonialsSection
        title={content.testimonials_title || "Client Experiences"}
        subtitle={
          content.testimonials_subtitle ||
          "Real stories of clarity, guidance, and spiritual confidence."
        }
      />

<CTASection
  eyebrow={content.cta_eyebrow || "Begin your guidance journey"}
  title={
    content.cta_title ||
    "Find clarity before your next important decision."
  }
  description={
    content.cta_description ||
    "Book a consultation and receive personalized Vedic guidance based on your birth details and life questions."
  }
  buttonText={content.cta_button || "Book Consultation"}
  backgroundImage={content.cta_background_image}
/>

      <Footer
  logo={content.footer_logo || content.site_logo}
  title={content.footer_title || "Astrogyan"}
  subtitle={
    content.footer_subtitle ||
    "Ancient Vedic Wisdom for Modern Life"
  }
/>
    </main>
  );
}