import AnimatedBackground from "@/components/visuals/AnimatedBackground";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/site-settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title =
    settings.default_meta_title || "Astrogyan | Vedic Astrology Guidance";

  const description =
    settings.default_meta_description ||
    "Get personalized Vedic astrology guidance, Panchang insights, gemstone recommendations, puja services and free astrology tools.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: settings.default_og_image ? [settings.default_og_image] : [],
    },
  };
}

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