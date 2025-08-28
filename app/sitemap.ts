import type { MetadataRoute } from "next";
import { siteMetadata } from "@/app/data/siteMetadata";
import { siteMetadata } from "@/app/data/siteMetadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${siteMetadata.siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${siteMetadata.siteUrl}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Blog removed
  ];
}
