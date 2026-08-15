import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://credite.cristianvaduva.com"),
  title: {
    default: "CV Finance | Credit Advisory & Financial Optimization",
    template: "%s | CV Finance",
  },
  description:
    "CV Finance oferă consultanță financiară independentă pentru analizarea opțiunilor de creditare, refinanțare și optimizare a ratelor lunare.",
  keywords: [
    "credit nevoi personale",
    "refinanțare credit",
    "consultant financiar",
    "optimizare financiară",
    "consultanță financiară",
    "broker credite",
    "credit cu istoric negativ",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "CV Finance | Credit Advisory & Financial Optimization",
    description:
      "Analizăm gratuit situația ta financiară și verificăm dacă există variante mai potrivite pentru creditul tău.",
    type: "website",
    locale: "ro_RO",
    siteName: "CV Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Finance | Credit Advisory & Financial Optimization",
    description: "Analiză financiară independentă pentru refinanțare și opțiuni de creditare.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "CV Finance",
  "url": "https://credite.cristianvaduva.com",
  "telephone": "+40767110439",
  "email": "cristianvaduva@duck.com",
  "founder": {
    "@type": "Person",
    "name": "Cristian Văduva"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "București",
    "addressRegion": "Piața Victoriei",
    "addressCountry": "RO"
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "Cristian Văduva Intelligence Ecosystem",
    "sameAs": [
      "https://homefind.cristianvaduva.com",
      "https://insurance.cristianvaduva.com",
      "https://subventii.cristianvaduva.com",
      "https://aixmedia.cristianvaduva.com",
      "https://health.cristianvaduva.com",
      "https://os.cristianvaduva.com"
    ]
  }
};

import Header from "@/components/Header";
import FloatingConversionCTA from "@/components/FloatingConversionCTA";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <FloatingConversionCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
