import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { HomepageArticle } from "@/sanity/lib/queries";

export default function NewsThumbRow({ articles }: { articles: HomepageArticle[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {articles.map((article) => {
        const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        return (
          <Link key={article.slug} href={`/news/${article.slug}`} className="group block">
            {article.featuredImage ? (
              <Image
                src={urlFor(article.featuredImage).width(400).height(240).fit("crop").url()}
                alt=""
                width={400}
                height={240}
                className="w-full object-cover"
                style={{ aspectRatio: "5 / 3" }}
              />
            ) : (
              <div className="flex aspect-[5/3] w-full items-center justify-center bg-slate-100 text-xs text-slate-400 [font-variant:small-caps]">
                Projects &amp; Logistics
              </div>
            )}
            <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-slate-900 group-hover:underline">
              {article.title}
            </h3>
            <p className="mt-2 text-xs tracking-widest text-slate-500 [font-variant:small-caps]">
              {date}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
