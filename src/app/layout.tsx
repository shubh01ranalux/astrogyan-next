import AnimatedBackground from "@/components/visuals/AnimatedBackground";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Astrogyan | Vedic Astrology Guidance",
  description:
    "Astrogyan is a premium astrology platform for consultations, Panchang, puja services, gemstones, and free astrology tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
  <AnimatedBackground />
  {children}
</body>
    </html>
  );
}
