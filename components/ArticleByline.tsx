import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleAuthor } from "@/sanity/lib/queries";

function AuthorChip({ label, author }: { label: string; author: ArticleAuthor }) {
  return (
    <div className="flex items-center gap-2">
      {author.image ? (
        <Image
          src={urlFor(author.image).width(64).height(64).fit("crop").url()}
          alt={author.name}
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600">
          {author.name.slice(0, 1)}
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-slate-900">
          {label} {author.name}
        </p>
        {author.role && <p className="text-xs text-slate-500">{author.role}</p>}
      </div>
    </div>
  );
}

export default function ArticleByline({
  author,
  reviewedBy,
  publishedAt,
}: {
  author?: ArticleAuthor;
  reviewedBy?: ArticleAuthor;
  publishedAt: string;
}) {
  if (!author && !reviewedBy) {
    return (
      <p className="mt-2 text-sm text-slate-500">
        {new Date(publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
      {author && <AuthorChip label="By" author={author} />}
      {reviewedBy && <AuthorChip label="Reviewed by" author={reviewedBy} />}
      <p className="text-sm text-slate-500">
        {new Date(publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
