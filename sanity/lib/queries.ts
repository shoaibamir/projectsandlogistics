import { groq } from "next-sanity";

export type ContentType = "news" | "blog" | "guide";

export type ArticleListItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  featuredImage?: unknown;
  categories: { title: string; slug: string }[];
};

export type ArticleAuthor = {
  name: string;
  role?: string;
  bio?: string;
  image?: unknown;
  credentials?: string[];
  sameAs?: string[];
  socialLinks?: { platform: string; url: string }[];
};

export type ArticleDetail = {
  _id: string;
  title: string;
  slug: string;
  contentType: ContentType;
  summary: string;
  plainBody?: string;
  keyTakeaways?: string[];
  body: unknown;
  faqs?: { question: string; answer: string }[];
  author?: ArticleAuthor;
  reviewedBy?: ArticleAuthor;
  categories: { title: string; slug: string }[];
  tags: { title: string; slug: string }[];
  publishedAt: string;
  _updatedAt: string;
  isSyndicated?: boolean;
  sourceName?: string;
  sourceUrl?: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: unknown;
    noIndex?: boolean;
    canonicalUrl?: string;
  };
};

export type SitemapArticle = {
  slug: string;
  contentType: ContentType;
  publishedAt: string;
  _updatedAt: string;
};

const articleListProjection = groq`
  {
    _id,
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    featuredImage,
    "categories": categories[]->{title, "slug": slug.current},
  }
`;

export const articleListQuery = groq`
  *[_type == "article" && contentType == $contentType && defined(slug.current)]
  | order(publishedAt desc)
  ${articleListProjection}
`;

export const recentArticlesQuery = groq`
  *[_type == "article" && contentType == $contentType && defined(slug.current)]
  | order(publishedAt desc) [0...$limit]
  ${articleListProjection}
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && contentType == $contentType && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    contentType,
    summary,
    "plainBody": pt::text(body),
    keyTakeaways,
    body,
    faqs,
    author->{name, role, bio, image, credentials, sameAs, socialLinks},
    reviewedBy->{name, role, image},
    "categories": categories[]->{title, "slug": slug.current},
    "tags": tags[]->{title, "slug": slug.current},
    publishedAt,
    _updatedAt,
    isSyndicated,
    sourceName,
    sourceUrl,
    seo,
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && contentType == $contentType && defined(slug.current)][].slug.current
`;

export const allArticlesForSitemapQuery = groq`
  *[_type == "article" && defined(slug.current)]{
    "slug": slug.current,
    contentType,
    publishedAt,
    _updatedAt,
  }
`;
