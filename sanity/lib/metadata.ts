import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { urlFor } from "./image";
import type { ArticleDetail, ContentType } from "./queries";

const SECTION_PATH: Record<ContentType, string> = {
  news: "news",
  blog: "blog",
  guide: "guides",
};

export function buildArticleMetadata(article: ArticleDetail): Metadata {
  const sectionPath = SECTION_PATH[article.contentType];
  const url = `${SITE_URL}/${sectionPath}/${article.slug}`;
  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.summary;
  const ogImage = article.seo?.ogImage
    ? urlFor(article.seo.ogImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: article.seo?.canonicalUrl || url },
    robots: article.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article._updatedAt,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}
