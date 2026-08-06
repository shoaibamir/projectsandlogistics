import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
      // AI crawler directives — left as an explicit, conscious decision to make
      // later rather than an accidental default. Uncomment to block a given
      // crawler from using this site's content for model training.
      // { userAgent: "GPTBot", disallow: "/" },
      // { userAgent: "ClaudeBot", disallow: "/" },
      // { userAgent: "PerplexityBot", disallow: "/" },
      // { userAgent: "Google-Extended", disallow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
