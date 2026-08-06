import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { HomepageArticle } from "@/sanity/lib/queries";

const AVERAGE_CHARS_PER_MINUTE = 1000;

function readingTime(chars: number | undefined): string {
  const minutes = Math.max(1, Math.round((chars ?? AVERAGE_CHARS_PER_MINUTE) / AVERAGE_CHARS_PER_MINUTE));
  return `${minutes} min read`;
}

export default function MiniArticleItem({
  article,
  basePath,
}: {
  article: HomepageArticle;
  basePath: "guides" | "blog";
}) {
  return (
    <li>
      <Link href={`/${basePath}/${article.slug}`} className="group flex items-center gap-4 py-3">
        {article.featuredImage ? (
          <Image
            src={urlFor(article.featuredImage).width(160).height(160).fit("crop").url()}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 flex-shrink-0 object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center bg-slate-100 text-[10px] text-slate-400 [font-variant:small-caps]">
            {basePath}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-serif font-semibold leading-snug text-slate-900 group-hover:underline">
            {article.title}
          </p>
          <p className="mt-1 text-xs tracking-widest text-slate-500 [font-variant:small-caps]">
            {readingTime(article.readingChars)}
          </p>
        </div>
      </Link>
    </li>
  );
}
