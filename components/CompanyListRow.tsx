import Link from "next/link";
import type { Listing } from "@/lib/listings";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function CompanyListRow({ listing }: { listing: Listing }) {
  const location = [listing.city, listing.state].filter(Boolean).join(", ") || listing.country;

  return (
    <li>
      <Link
        href={`/directory/${listing.id}`}
        className="flex items-center justify-between gap-4 border-b border-slate-200 px-2 py-4 transition hover:bg-slate-50"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-slate-900 font-serif text-sm font-bold text-slate-900">
            {initials(listing.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-serif font-semibold text-slate-900">{listing.name}</p>
            <p className="truncate text-sm text-slate-500">
              {listing.category} &middot; {location}
            </p>
          </div>
        </div>
        {listing.verified && (
          <span className="shrink-0 text-xs tracking-widest text-slate-500 [font-variant:small-caps]">
            Verified
          </span>
        )}
      </Link>
    </li>
  );
}
