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
import { getHomepageSections } from "@/lib/homepage-sections";
import { getSiteSettings } from "@/lib/site-settings";
import { getNavigationItems } from "@/lib/navigation";
import PanchangTopBar from "@/components/layout/PanchangTopBar";
import AboutAstrologerSection from "@/components/home/AboutAstrologerSection";

export default async function Home() {
  const content = await getSiteContent();
  const sections = await getHomepageSections();
  const settings = await getSiteSettings();
  const navigationItems = await getNavigationItems();
  const enabledSections = sections.filter((section) => section.is_enabled);
  const sectionComponents: Record<string, React.ReactNode> = {
    hero: (
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
    ),
about_astrologer: (
  <AboutAstrologerSection
    eyebrow={content.astrologer_eyebrow || "About Your Astrologer"}
    title={content.astrologer_title || "Meet Your Vedic Guide"}
    description={
      content.astrologer_description ||
      "Astrogyan brings ancient Vedic wisdom into practical modern guidance."
    }
    image={content.astrologer_image}
  />
),
    about: (
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
    ),

    certificates: (
      <CertificatesSection
        title={content.certificates_title || "Trusted & Certified Guidance"}
        subtitle={
          content.certificates_subtitle ||
          "Astrogyan focuses on clarity, ethics, and personalized Vedic guidance."
        }
      />
    ),

    services: (
      <ServicesPreview
        title={content.services_title || "Popular Services"}
        subtitle={
          content.services_subtitle ||
          "Guidance designed for clarity, timing, and practical decisions."
        }
      />
    ),

    free_tools: (
      <FreeToolsSection
        eyebrow={content.free_tools_eyebrow || "Free Astrology Tools"}
        title={
          content.free_tools_title || "Start your spiritual journey for free"
        }
        description={
          content.free_tools_description ||
          "Explore Panchang, gemstone guidance, kundali insights, numerology and more AstroGyan tools."
        }
      />
    ),

    testimonials: (
      <TestimonialsSection
        title={content.testimonials_title || "Client Experiences"}
        subtitle={
          content.testimonials_subtitle ||
          "Real stories of clarity, guidance, and spiritual confidence."
        }
      />
    ),

    cta: (
      <CTASection
        eyebrow={content.cta_eyebrow || "Begin your guidance journey"}
        title={
          content.cta_title || "Find clarity before your next important decision."
        }
        description={
          content.cta_description ||
          "Book a consultation and receive personalized Vedic guidance based on your birth details and life questions."
        }
        buttonText={content.cta_button || "Book Consultation"}
        backgroundImage={content.cta_background_image}
      />
    ),
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PanchangTopBar />

      <Navbar
        logo={settings.site_logo || content.site_logo}
        title={settings.site_name || content.footer_title || "Astrogyan"}
      />

      {enabledSections.map((section) => (
        <div key={section.section_key}>
          {sectionComponents[section.section_key] || null}
        </div>
      ))}

      <Footer
  logo={settings.site_logo || content.footer_logo || content.site_logo}
  title={settings.site_name || content.footer_title || "Astrogyan"}
  subtitle={
    settings.site_tagline ||
    content.footer_subtitle ||
    "Ancient Vedic Wisdom for Modern Life"
  }
  navigationItems={navigationItems}
/>
    </main>
  );
}