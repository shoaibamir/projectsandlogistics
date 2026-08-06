import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleListItem } from "@/sanity/lib/queries";

export default function BlogCard({ article }: { article: ArticleListItem }) {
  return (
    <li className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Link href={`/blog/${article.slug}`} className="block">
        {article.featuredImage ? (
          <Image
            src={urlFor(article.featuredImage).width(600).height(300).fit("crop").url()}
            alt=""
            width={600}
            height={300}
            className="h-32 w-full object-cover"
          />
        ) : (
          <div className="flex h-32 w-full items-center justify-center bg-blue-50 text-sm font-medium text-blue-600">
            Blog
          </div>
        )}
        <div className="p-4">
          {article.categories?.[0] && (
            <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
              {article.categories[0].title}
            </span>
          )}
          <p className="mt-2 font-semibold text-slate-900">{article.title}</p>
          <p className="mt-1 text-xs text-slate-400">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </Link>
    </li>
  );
}
