import type { MetadataRoute } from "next";
import { getListings } from "@/lib/listings";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings();

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/directory`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...listings.map(
      (listing): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/directory/${listing.id}`,
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    ),
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...GUIDES.map(
      (guide): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/guides/${guide.slug}`,
        lastModified: guide.datePublished,
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    ),
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
