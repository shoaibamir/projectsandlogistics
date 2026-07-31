import Link from "next/link";
import type { Category } from "@/lib/listings";
import { getCategoryIcon } from "@/components/icons";

type CategoryTileProps = {
  category: Category;
};

export default function CategoryTile({ category }: CategoryTileProps) {
  const icon = getCategoryIcon(category)({ className: "h-5 w-5" });

  return (
    <Link
      href={`/directory?category=${encodeURIComponent(category)}`}
      className="group flex flex-col items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-600 hover:shadow-sm"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </span>
      <span className="font-semibold text-slate-900">{category}</span>
    </Link>
  );
}
