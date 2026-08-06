import type { MetadataRoute } from "next";
import { getListings } from "@/lib/listings";
import { SITE_URL } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { allArticlesForSitemapQuery, type SitemapArticle } from "@/sanity/lib/queries";

const SECTION_PATH: Record<SitemapArticle["contentType"], string> = {
  news: "news",
  blog: "blog",
  guide: "guides",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listings, articles] = await Promise.all([
    getListings(),
    client.fetch<SitemapArticle[]>(allArticlesForSitemapQuery),
  ]);

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
      url: `${SITE_URL}/news`,
      changeFrequency: "hourly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...articles.map(
      (article): MetadataRoute.Sitemap[number] => ({
        url: `${SITE_URL}/${SECTION_PATH[article.contentType]}/${article.slug}`,
        lastModified: article._updatedAt,
        changeFrequency: article.contentType === "news" ? "daily" : "monthly",
        priority: article.contentType === "guide" ? 0.5 : 0.6,
      }),
    ),
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
