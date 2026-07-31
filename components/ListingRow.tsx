import Link from "next/link";
import type { Listing } from "@/lib/listings";

type ListingRowProps = {
  listing: Listing;
};

export default function ListingRow({ listing }: ListingRowProps) {
  return (
    <li>
      <Link
        href={`/directory/${listing.id}`}
        className="flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-slate-50"
      >
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{listing.name}</p>
          <p className="truncate text-sm text-slate-500">
            {listing.country} &middot; {listing.category}
          </p>
        </div>
        {listing.verified && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            Verified
          </span>
        )}
      </Link>
    </li>
  );
}
