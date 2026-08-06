import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { articleListQuery, type ArticleListItem } from "@/sanity/lib/queries";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guidance for shippers and providers — cost-saving tactics, comparisons, and how-to articles on freight and logistics.",
};

export const revalidate = 300;

export default async function BlogIndexPage() {
  const articles = await client.fetch<ArticleListItem[]>(articleListQuery, {
    contentType: "blog",
  });

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Practical guidance for shippers and providers navigating freight and logistics.
      </p>

      {articles.length === 0 ? (
        <p className="mt-8 text-slate-500">No blog posts yet — check back soon.</p>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} basePath="blog" />
          ))}
        </ul>
      )}
    </section>
  );
}
