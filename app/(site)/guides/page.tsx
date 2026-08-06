import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { articleListQuery, type ArticleListItem } from "@/sanity/lib/queries";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Plain-language guides to ocean freight forwarding, NVOCCs, and U.S. freight forwarder licensing.",
};

export const revalidate = 300;

export default async function GuidesIndexPage() {
  const articles = await client.fetch<ArticleListItem[]>(articleListQuery, {
    contentType: "guide",
  });

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Guides</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Plain-language explainers on ocean freight forwarding and logistics licensing, for
        shippers and providers navigating the industry.
      </p>

      {articles.length === 0 ? (
        <p className="mt-8 text-slate-500">No guides yet — check back soon.</p>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} basePath="guides" />
          ))}
        </ul>
      )}
    </section>
  );
}
