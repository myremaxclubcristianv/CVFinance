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
    "/totul-inainte-de-credit",
    "/referral",
    "/ghid",
    "/ghid/cum-stii-daca-un-credit-este-scump",
    "/ghid/credite-rapide-ifn-cost-real",
    "/ghid/cum-compari-ofertele-de-credit",
    "/ghid/stresul-ratelor-multiple-solutii",
    "/ghid/ce-trebuie-sa-stii-inainte-sa-semnezi-un-credit",
    "/ghid/cand-are-sens-refinantarea-unui-credit",
    "/ghid/istoricul-de-credit-biroul-de-credit-optiuni",
    "/povesti-reale/david-21-credite-ifn",
    "/povesti-reale/georgeta-refinantare-rate-mari",
    "/povesti-reale/raluca-solutie-finantare",
    "/povesti-reale/istoric-negativ-biroul-de-credit",
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
    changeFrequency: route === "" ? "daily" : route.startsWith("/ghid") ? "weekly" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/ghid") ? 0.85 : route.includes("termeni") || route.includes("confidentialitate") || route.includes("gdpr") || route.includes("nota-legala") || route.includes("acord-marketing") ? 0.3 : 0.8,
  }));
}
