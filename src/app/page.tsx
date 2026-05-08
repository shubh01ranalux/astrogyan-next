import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/visuals/AnimatedBackground";
import HeroSection from "@/sections/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
    </main>
  );
}