import type { Metadata } from "next";
import { getCategories, getListings } from "@/lib/listings";
import DirectoryClient from "@/components/DirectoryClient";

export const metadata: Metadata = {
  title: "Browse the Directory",
  description:
    "Search and filter verified sea freight, air freight, trucking, warehousing, customs brokerage and rail freight providers by category and country.",
};

type DirectoryPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const params = await searchParams;
  const categoryParam = Array.isArray(params.category) ? params.category[0] : params.category;
  const [listings, categories] = await Promise.all([getListings(), getCategories()]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Directory</h1>
      <p className="mt-2 text-slate-600">
        Browse {listings.length} logistics and freight providers worldwide.
      </p>
      <p className="mt-4 max-w-3xl text-slate-600">
        This directory combines companies that have joined Projects &amp; Logistics directly with
        listings compiled from public licensing registries. Unclaimed listings are marked as such
        on their profile page — if you recognize your own company, you can claim it for free from
        its listing page.
      </p>
      <div className="mt-8">
        <DirectoryClient
          listings={listings}
          categories={categories}
          initialCategory={categoryParam}
        />
      </div>
    </section>
  );
}
