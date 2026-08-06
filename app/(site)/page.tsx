import type { Metadata } from "next";
import { getRecentVerifiedListings } from "@/lib/listings";
import Masthead from "@/components/Masthead";
import FeaturedStory from "@/components/FeaturedStory";
import NewsThumbRow from "@/components/NewsThumbRow";
import CompanyListRow from "@/components/CompanyListRow";
import MiniArticleItem from "@/components/MiniArticleItem";
import { client } from "@/sanity/lib/client";
import {
  featuredNewsQuery,
  homepageArticleQuery,
  type FeaturedArticle,
  type HomepageArticle,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: {
    absolute: "Projects & Logistics Directory — Find Global Freight & Logistics Providers",
  },
  description:
    "Find and compare sea freight, air freight, trucking, warehousing, customs brokerage and rail freight providers worldwide. Free to list.",
};

export const revalidate = 300;

export default async function HomePage() {
  const [featured, news, companies, guides, blogPosts] = await Promise.all([
    client.fetch<FeaturedArticle | null>(featuredNewsQuery),
    client.fetch<HomepageArticle[]>(homepageArticleQuery, { contentType: "news", limit: 3 }),
    getRecentVerifiedListings(3),
    client.fetch<HomepageArticle[]>(homepageArticleQuery, { contentType: "guide", limit: 2 }),
    client.fetch<HomepageArticle[]>(homepageArticleQuery, { contentType: "blog", limit: 2 }),
  ]);

  return (
    <>
      <Masthead />

      {featured && <FeaturedStory article={featured} />}

      {news.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xs tracking-[0.2em] text-slate-500 [font-variant:small-caps]">
            Latest news
          </h2>
          <div className="mt-4 border-t border-slate-300 pt-8">
            <NewsThumbRow articles={news} />
          </div>
        </section>
      )}

      {companies.length > 0 && (
        <section className="border-t border-slate-300">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="text-center text-xs tracking-[0.2em] text-slate-500 [font-variant:small-caps]">
              Latest companies
            </h2>
            <ul className="mt-6">
              {companies.map((listing) => (
                <CompanyListRow key={listing.id} listing={listing} />
              ))}
            </ul>
          </div>
        </section>
      )}

      {(guides.length > 0 || blogPosts.length > 0) && (
        <section className="border-t border-slate-300 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2">
              {guides.length > 0 && (
                <div>
                  <h2 className="border-b-2 border-slate-900 pb-2 text-xs tracking-[0.2em] text-slate-900 [font-variant:small-caps]">
                    Guides
                  </h2>
                  <ul className="divide-y divide-slate-200">
                    {guides.map((article) => (
                      <MiniArticleItem key={article.slug} article={article} basePath="guides" />
                    ))}
                  </ul>
                </div>
              )}
              {blogPosts.length > 0 && (
                <div>
                  <h2 className="border-b-2 border-slate-900 pb-2 text-xs tracking-[0.2em] text-slate-900 [font-variant:small-caps]">
                    Blog
                  </h2>
                  <ul className="divide-y divide-slate-200">
                    {blogPosts.map((article) => (
                      <MiniArticleItem key={article.slug} article={article} basePath="blog" />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
