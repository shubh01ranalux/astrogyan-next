import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const defaultSeo = {
  siteName: "Astrogyan",
  title: "Astrogyan | Vedic Astrology Guidance",
  description:
    "Astrogyan is a premium Vedic astrology platform for consultations, Panchang, puja services, gemstones, and free astrology tools.",
  image: "/og-image.jpg",
};

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({
  title,
  description,
  path = "",
  image,
}: SeoInput): Metadata {
  const metaTitle = title
    ? `${title} | Astrogyan`
    : defaultSeo.title;

  const metaDescription = description || defaultSeo.description;

  const url = `${siteUrl}${path}`;
  const imageUrl = image?.startsWith("http")
    ? image
    : `${siteUrl}${image || defaultSeo.image}`;

  return {
    metadataBase: new URL(siteUrl),
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: defaultSeo.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}