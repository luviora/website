import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes = [
    "",
    "/como-funciona",
    "/duvidas",
    "/emprestimos",
    "/seguros/auto",
    "/seguros/incendio",
    "/seguros/fianca",
    "/abrir-sinistro",
    "/para-corretores",
    "/minhas-cotacoes",
    "/privacidade",
    "/termos",
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
