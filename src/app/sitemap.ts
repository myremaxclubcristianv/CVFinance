import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://credite.cristianvaduva.com";
  const now = new Date();

  const routes = [
    "",
    "/credit-nevoi-personale",
    "/refinantare-credit",
    "/credit-istoric-negativ",
    "/broker-credite-bucuresti",
    "/calculator-rata-credit",
    "/stergere-birou-credit",
    "/termeni-si-conditii",
    "/politica-confidentialitate",
    "/gdpr",
    "/nota-legala",
    "/acord-marketing",
    "/confidentialitate",
    "/termeni",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.includes("termeni") || route.includes("confidentialitate") || route.includes("gdpr") || route.includes("nota-legala") || route.includes("acord-marketing") ? 0.3 : 0.8,
  }));
}
