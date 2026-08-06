import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
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
    "CV Finance oferă consultanță financiară premium pentru optimizarea creditelor, refinanțare și identificarea celor mai bune soluții financiare disponibile în piață.",
  keywords: [
    "credit nevoi personale",
    "refinanțare credit",
    "consultant financiar",
    "optimizare financiară",
    "strategie de creditare",
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
      "CV Finance oferă consultanță financiară premium pentru optimizarea creditelor, refinanțare și identificarea celor mai bune soluții financiare disponibile în piață.",
    type: "website",
    locale: "ro_RO",
    siteName: "CV Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Finance | Credit Advisory & Financial Optimization",
    description: "Consultanță financiară premium pentru optimizarea creditelor și refinanțare.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${manrope.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
