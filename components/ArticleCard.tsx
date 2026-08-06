import Link from "next/link";
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
        className="block px-4 py-4 transition hover:bg-slate-50"
      >
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
      </Link>
    </li>
  );
}
