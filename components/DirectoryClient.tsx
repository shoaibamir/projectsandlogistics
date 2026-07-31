"use client";

import { useMemo, useState } from "react";
import type { Category, Listing } from "@/lib/listings";
import SearchBar from "@/components/SearchBar";
import ListingRow from "@/components/ListingRow";

type DirectoryClientProps = {
  listings: Listing[];
  categories: Category[];
  initialCategory?: string;
};

const ALL_CATEGORIES = "all";

export default function DirectoryClient({
  listings,
  categories,
  initialCategory,
}: DirectoryClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(
    initialCategory && categories.includes(initialCategory as Category)
      ? initialCategory
      : ALL_CATEGORIES,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((listing) => {
      const matchesCategory = category === ALL_CATEGORIES || listing.category === category;
      const matchesQuery =
        q === "" ||
        listing.name.toLowerCase().includes(q) ||
        listing.category.toLowerCase().includes(q) ||
        listing.country.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [listings, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div>
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/30 sm:w-56"
          >
            <option value={ALL_CATEGORIES}>All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-500" role="status">
        {filtered.length} {filtered.length === 1 ? "provider" : "providers"} found
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-2 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {filtered.map((listing) => (
            <ListingRow key={listing.id} listing={listing} />
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-slate-500">
          No providers match your search. Try a different name, category, or country.
        </p>
      )}
    </div>
  );
}
