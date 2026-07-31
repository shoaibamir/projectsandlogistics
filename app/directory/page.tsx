import type { Metadata } from "next";
import { CATEGORIES, getCategories, getListings, type Category } from "@/lib/listings";
import DirectoryClient from "@/components/DirectoryClient";

type DirectoryPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function resolveCategoryParam(params: { category?: string | string[] }): Category | undefined {
  const raw = Array.isArray(params.category) ? params.category[0] : params.category;
  return CATEGORIES.find((category) => category === raw);
}

export async function generateMetadata({ searchParams }: DirectoryPageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = resolveCategoryParam(params);

  if (category) {
    return {
      title: `${category} Providers Directory`,
      description: `Browse verified and unclaimed ${category.toLowerCase()} providers in the Projects & Logistics directory.`,
    };
  }

  return {
    title: "Browse the Directory",
    description:
      "Search and filter verified sea freight, air freight, trucking, warehousing, customs brokerage and rail freight providers by category and country.",
  };
}

export default async function DirectoryPage({ searchParams }: DirectoryPageProps) {
  const params = await searchParams;
  const category = resolveCategoryParam(params);
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
          initialCategory={category}
        />
      </div>
    </section>
  );
}
