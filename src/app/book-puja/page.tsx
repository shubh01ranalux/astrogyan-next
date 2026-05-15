import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import PujaBookingPageClient from "@/components/puja/PujaBookingPageClient";

export default function BookPujaPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <PageHero
        eyebrow="Book Puja"
        title="Book Doorstep or Online Puja"
        description="Doorstep Puja is available in Mumbai and Pune only. Remote Puja can be booked from anywhere."
      />

      <PujaBookingPageClient />

      <Footer />
    </main>
  );
}