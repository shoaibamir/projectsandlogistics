import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { articleBySlugQuery, type ArticleDetail } from "@/sanity/lib/queries";
import { buildArticleMetadata } from "@/sanity/lib/metadata";
import { buildArticleJsonLd } from "@/sanity/lib/structuredData";
import { jsonLdScriptProps } from "@/lib/jsonLd";
import ArticleByline from "@/components/ArticleByline";
import ArticleContent from "@/components/ArticleContent";

async function getArticle(slug: string) {
  return client.fetch<ArticleDetail | null>(articleBySlugQuery, {
    contentType: "guide",
    slug,
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return buildArticleMetadata(article);
}

export const revalidate = 300;

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script {...jsonLdScriptProps(buildArticleJsonLd(article))} />

      <Link href="/guides" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        &larr; All guides
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">{article.title}</h1>
      <ArticleByline
        author={article.author}
        reviewedBy={article.reviewedBy}
        publishedAt={article.publishedAt}
      />

      <ArticleContent article={article} />
    </article>
  );
}
