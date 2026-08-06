import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleListItem } from "@/sanity/lib/queries";

function relativeTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const hours = Math.round(diffMs / (60 * 60 * 1000));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export default function NewsListItem({ article }: { article: ArticleListItem }) {
  return (
    <li>
      <Link
        href={`/news/${article.slug}`}
        className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50"
      >
        {article.featuredImage ? (
          <Image
            src={urlFor(article.featuredImage).width(112).height(88).fit("crop").url()}
            alt=""
            width={56}
            height={44}
            className="h-11 w-14 flex-shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-11 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-medium text-blue-600">
            News
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-slate-900">{article.title}</p>
          <p className="mt-0.5 text-xs text-slate-400">{relativeTime(article.publishedAt)}</p>
        </div>
      </Link>
    </li>
  );
}
