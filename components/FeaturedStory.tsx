import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { FeaturedArticle } from "@/sanity/lib/queries";

export default function FeaturedStory({ article }: { article: FeaturedArticle }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/news/${article.slug}`} className="group block">
      {article.featuredImage ? (
        <Image
          src={urlFor(article.featuredImage).width(1600).height(800).fit("crop").url()}
          alt=""
          width={1600}
          height={800}
          priority
          className="w-full object-cover"
          style={{ aspectRatio: "2 / 1" }}
        />
      ) : (
        <div className="flex aspect-[2/1] w-full items-center justify-center bg-slate-900 font-serif text-sm text-slate-400 [font-variant:small-caps]">
          Projects &amp; Logistics
        </div>
      )}
      <div className="mx-auto max-w-3xl px-4 py-6 text-center sm:px-6">
        <p className="text-xs tracking-[0.2em] text-slate-500 [font-variant:small-caps]">News</p>
        <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-slate-900 group-hover:underline sm:text-4xl">
          {article.title}
        </h2>
        <p className="mt-4 font-serif text-lg text-slate-700">{article.summary}</p>
        <p className="mt-4 font-serif text-sm italic text-slate-500">
          {article.author ? `By ${article.author.name} — ` : ""}
          {date}
        </p>
      </div>
    </Link>
  );
}
