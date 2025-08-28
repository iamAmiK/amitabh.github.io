import type { MetadataRoute } from "next";
import { siteMetadata } from "@/app/data/siteMetadata";

export const dynamic = "force-static";
export const revalidate = 86400; // 1 day

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/links/"],
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  };
}
