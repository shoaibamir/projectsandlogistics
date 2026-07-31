import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/listings";
import ClaimListingForm from "@/components/ClaimListingForm";
import { jsonLdScriptProps } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";

type ListingPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return { title: "Listing not found" };
  }

  return {
    title: `${listing.name} — ${listing.category} in ${listing.country}`,
    description: listing.description,
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: listing.name,
    url: `${SITE_URL}/directory/${listing.id}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city ?? undefined,
      addressRegion: listing.state ?? undefined,
      addressCountry: listing.country,
    },
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script {...jsonLdScriptProps(organizationSchema)} />

      <Link href="/directory" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        &larr; Back to directory
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-900">{listing.name}</h1>
        {listing.verified && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
            Verified
          </span>
        )}
      </div>

      <p className="mt-2 text-slate-500">
        {listing.country} &middot; {listing.category}
      </p>

      <p className="mt-6 text-slate-700">{listing.description}</p>

      {listing.website && (
        <p className="mt-6">
          <a
            href={listing.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Visit website &rarr;
          </a>
        </p>
      )}

      {listing.source && (
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Unclaimed listing — company info sourced from {listing.source}.{" "}
          <a href="#claim" className="font-medium underline underline-offset-2">
            Is this your company?
          </a>
        </div>
      )}

      {!listing.claimed && (
        <div className="mt-8">
          <ClaimListingForm listingId={listing.id} />
        </div>
      )}
    </section>
  );
}
