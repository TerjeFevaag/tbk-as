import type { MetadataRoute } from "next";

import { articles } from "@/content/articles";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/om-oss",
    "/tjenester",
    "/artikler",
    "/kontakt-oss",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/tjenester/${service.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteConfig.url}/artikler/${article.slug}`,
    lastModified: new Date(article.publishedAt),
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes];
}
