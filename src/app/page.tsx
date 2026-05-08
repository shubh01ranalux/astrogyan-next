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
      <Navbar />

      <HeroSection
  eyebrow={
    content.hero_badge || "Premium Vedic Astrology"
  }
  title={
    content.hero_title || "Astrogyan"
  }
  subtitle={
    content.hero_subtitle ||
    "Your Gateway to Accurate & Personalized Vedic Astrology"
  }
  description={
    content.hero_description ||
    "Discover your life path, career guidance, relationship compatibility, and spiritual clarity through personalized Vedic astrology insights."
  }
  primaryButtonText={
    content.hero_primary_cta || "Book Consultation"
  }
  secondaryButtonText={
    content.hero_secondary_cta || "Explore Services"
  }
/>  

      <AboutSection
  title={content.about_title}
  subtitle={content.about_subtitle}
  description={content.about_description}
/>

<CertificatesSection
  title={content.certificates_title}
  subtitle={content.certificates_subtitle}
/>

<ServicesPreview
  title={content.services_title}
  subtitle={content.services_subtitle}
/>

      <FreeToolsSection
        eyebrow={
          content.free_tools_eyebrow || "Free Astrology Tools"
        }
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
  title={content.testimonials_title}
  subtitle={content.testimonials_subtitle}
/>

<CTASection
  eyebrow={content.cta_eyebrow}
  title={content.cta_title}
  description={content.cta_description}
  buttonText={content.cta_button}
/>

<Footer
  title={content.footer_title}
  subtitle={content.footer_subtitle}
/>
    </main>
  );
}