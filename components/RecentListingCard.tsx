import Link from "next/link";
import type { Listing } from "@/lib/listings";

const NEW_WINDOW_DAYS = 14;

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function RecentListingCard({ listing }: { listing: Listing }) {
  const isNew =
    Date.now() - new Date(listing.created_at).getTime() < NEW_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const location = [listing.city, listing.state].filter(Boolean).join(", ");

  return (
    <li>
      <Link
        href={`/directory/${listing.id}`}
        className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-medium text-blue-600">
            {initials(listing.name)}
          </div>
          {isNew && (
            <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              New
            </span>
          )}
        </div>
        <p className="mt-2 font-semibold text-slate-900">{listing.name}</p>
        <p className="mt-1 text-sm text-slate-500">
          {listing.category}
          {location ? ` · ${location}` : ""}
        </p>
      </Link>
    </li>
  );
}
