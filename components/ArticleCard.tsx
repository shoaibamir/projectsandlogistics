import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleListItem } from "@/sanity/lib/queries";

export default function ArticleCard({
  article,
  basePath,
}: {
  article: ArticleListItem;
  basePath: string;
}) {
  return (
    <li>
      <Link
        href={`/${basePath}/${article.slug}`}
        className="flex gap-4 px-4 py-4 transition hover:bg-slate-50"
      >
        {article.featuredImage ? (
          <Image
            src={urlFor(article.featuredImage).width(160).height(120).fit("crop").url()}
            alt=""
            width={80}
            height={60}
            className="h-15 w-20 flex-shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-15 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <span className="text-xs font-medium">
              {basePath === "news" ? "News" : basePath === "blog" ? "Blog" : "Guide"}
            </span>
          </div>
        )}
        <div className="min-w-0 flex-1">
          {article.categories?.[0] && (
            <span className="text-xs font-medium uppercase tracking-wide text-blue-600">
              {article.categories[0].title}
            </span>
          )}
          <p className="mt-1 font-semibold text-slate-900">{article.title}</p>
          <p className="mt-1 text-sm text-slate-600">{article.summary}</p>
          <p className="mt-2 text-xs text-slate-400">
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
