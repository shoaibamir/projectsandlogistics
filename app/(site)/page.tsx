import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getRecentListings } from "@/lib/listings";
import CategoryTile from "@/components/CategoryTile";
import RecentListingCard from "@/components/RecentListingCard";
import NewsListItem from "@/components/NewsListItem";
import BlogCard from "@/components/BlogCard";
import { GlobeIcon, ShipIcon, PlaneIcon, TruckIcon } from "@/components/icons";
import { client } from "@/sanity/lib/client";
import { recentArticlesQuery, type ArticleListItem } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: {
    absolute: "Projects & Logistics Directory — Find Global Freight & Logistics Providers",
  },
  description:
    "Find and compare sea freight, air freight, trucking, warehousing, customs brokerage and rail freight providers worldwide. Free to list.",
};

export const revalidate = 300;

export default async function HomePage() {
  const [categories, recentListings, news, blogPosts, guides] = await Promise.all([
    getCategories(),
    getRecentListings(4),
    client.fetch<ArticleListItem[]>(recentArticlesQuery, { contentType: "news", limit: 3 }),
    client.fetch<ArticleListItem[]>(recentArticlesQuery, { contentType: "blog", limit: 2 }),
    client.fetch<ArticleListItem[]>(recentArticlesQuery, { contentType: "guide", limit: 3 }),
  ]);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              The directory for global logistics providers
            </h1>
            <p className="mt-6 text-lg text-slate-600">
              Shippers find providers. Providers get discovered. Free to list.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse directory
              </Link>
              <Link
                href="/list-your-company"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400 hover:bg-slate-50"
              >
                List your company
              </Link>
            </div>
          </div>

          <div
            className="relative flex aspect-square w-full max-w-md items-center justify-center justify-self-center rounded-3xl bg-slate-900 p-10 sm:aspect-video lg:aspect-square"
            aria-hidden="true"
          >
            <GlobeIcon className="h-24 w-24 text-blue-400" />
            <ShipIcon className="absolute left-8 top-10 h-10 w-10 text-white/80" />
            <PlaneIcon className="absolute right-10 top-16 h-9 w-9 text-white/70" />
            <TruckIcon className="absolute bottom-10 right-12 h-10 w-10 text-white/80" />
          </div>
        </div>
      </section>

      {recentListings.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Recently listed companies</h2>
            <Link href="/directory" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View directory
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {recentListings.map((listing) => (
              <RecentListingCard key={listing.id} listing={listing} />
            ))}
          </ul>
        </section>
      )}

      {news.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Latest news</h2>
            <Link href="/news" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all news
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {news.map((article) => (
              <NewsListItem key={article._id} article={article} />
            ))}
          </ul>
        </section>
      )}

      {blogPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-slate-900">From the blog</h2>
            <Link href="/blog" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all posts
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {blogPosts.map((article) => (
              <BlogCard key={article._id} article={article} />
            ))}
          </ul>
        </section>
      )}

      {guides.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Guides</h2>
            <Link href="/guides" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              View all guides
            </Link>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {guides.map((article) => (
              <li key={article._id}>
                <Link
                  href={`/guides/${article.slug}`}
                  className="block h-full rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300"
                >
                  <p className="font-semibold text-slate-900">{article.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{article.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900">Browse by category</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categories.map((category) => (
              <CategoryTile key={category} category={category} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
