import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListingById } from "@/lib/listings";
import { getReviewsByListingId } from "@/lib/reviews";
import ClaimListingForm from "@/components/ClaimListingForm";
import StarRating from "@/components/StarRating";
import { LinkedInIcon } from "@/components/icons";
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

function formatRenewalDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatReviewDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const [listing, reviews] = await Promise.all([getListingById(id), getReviewsByListingId(id)]);

  if (!listing) {
    notFound();
  }

  const hasTrustSignal = Boolean(listing.license_number);
  const hasContactInfo = Boolean(
    listing.phone || listing.primary_contact_name || listing.contact_email,
  );
  const hasServices = listing.services.length > 0;
  const hasCertifications = listing.certifications.length > 0;
  const hasCompanyInfo = Boolean(
    listing.year_founded || listing.company_size || listing.street_address,
  );
  const hasReviews = reviews.length > 0;
  const averageRating = hasReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: listing.name,
    url: `${SITE_URL}/directory/${listing.id}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.street_address ?? undefined,
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

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{listing.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
              {listing.category}
            </span>
            <span className="text-sm text-slate-500">{listing.country}</span>
          </div>
        </div>

        {listing.claimed ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Verified
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Unclaimed listing
          </span>
        )}
      </div>

      {/* Trust signal block */}
      {hasTrustSignal && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            Government-licensed provider
          </p>
          <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <dt className="text-blue-700/70">License number</dt>
              <dd className="font-semibold text-slate-900">{listing.license_number}</dd>
            </div>
            {listing.license_type && (
              <div>
                <dt className="text-blue-700/70">License type</dt>
                <dd className="font-semibold text-slate-900">{listing.license_type}</dd>
              </div>
            )}
            {listing.license_renewal_date && (
              <div>
                <dt className="text-blue-700/70">Renewal date</dt>
                <dd className="font-semibold text-slate-900">
                  {formatRenewalDate(listing.license_renewal_date)}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Specialisation */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Specialisation
        </h2>
        <p className="mt-2 text-slate-700">{listing.description}</p>
      </div>

      {listing.website && (
        <p className="mt-4">
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

      {/* Core Services */}
      {hasServices && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Core Services
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.services.map((service) => (
              <span
                key={service}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {hasCertifications && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Certifications
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.certifications.map((certification) => (
              <span
                key={certification}
                className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {certification}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Company Info */}
      {hasCompanyInfo && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Company Info
          </h2>
          <dl className="mt-3 space-y-1 text-sm">
            {listing.year_founded && (
              <div className="flex gap-2">
                <dt className="text-slate-500">Founded:</dt>
                <dd className="font-medium text-slate-900">{listing.year_founded}</dd>
              </div>
            )}
            {listing.company_size && (
              <div className="flex gap-2">
                <dt className="text-slate-500">Company size:</dt>
                <dd className="font-medium text-slate-900">{listing.company_size}</dd>
              </div>
            )}
            {listing.street_address && (
              <div className="flex gap-2">
                <dt className="text-slate-500">Address:</dt>
                <dd className="font-medium text-slate-900">
                  {[listing.street_address, listing.city, listing.state]
                    .filter(Boolean)
                    .join(", ")}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Social */}
      {listing.linkedin_url && (
        <p className="mt-4">
          <a
            href={listing.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
        </p>
      )}

      {/* Contact Information */}
      {hasContactInfo && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Contact Information
          </h2>
          <dl className="mt-3 space-y-1 text-sm">
            {listing.primary_contact_name && (
              <div className="flex gap-2">
                <dt className="text-slate-500">Contact:</dt>
                <dd className="font-medium text-slate-900">{listing.primary_contact_name}</dd>
              </div>
            )}
            {listing.phone && (
              <div className="flex gap-2">
                <dt className="text-slate-500">Phone:</dt>
                <dd className="font-medium text-slate-900">
                  <a href={`tel:${listing.phone}`} className="hover:text-blue-600">
                    {listing.phone}
                  </a>
                </dd>
              </div>
            )}
            {listing.contact_email && (
              <div className="flex gap-2">
                <dt className="text-slate-500">Email:</dt>
                <dd className="font-medium text-slate-900">
                  <a href={`mailto:${listing.contact_email}`} className="hover:text-blue-600">
                    {listing.contact_email}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Reviews */}
      {hasReviews && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Reviews
          </h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={averageRating} />
            <span className="text-sm font-semibold text-slate-900">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">
              ({reviews.length} review{reviews.length === 1 ? "" : "s"})
            </span>
          </div>
          <ul className="mt-4 space-y-4">
            {reviews.map((review) => (
              <li key={review.id} className="rounded-lg border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-slate-900">{review.reviewer_name}</p>
                  <StarRating rating={review.rating} />
                </div>
                {review.review_text && (
                  <p className="mt-2 text-sm text-slate-700">{review.review_text}</p>
                )}
                <p className="mt-2 text-xs text-slate-400">
                  {formatReviewDate(review.created_at)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {listing.source && (
        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Unclaimed listing — company info sourced from {listing.source}.{" "}
          <a href="#claim" className="font-medium underline underline-offset-2">
            Is this your company?
          </a>
        </div>
      )}

      {/* Claim CTA */}
      {!listing.claimed && (
        <div className="mt-10 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 px-6 py-6 text-center">
          <h2 className="text-lg font-semibold text-slate-900">Claim your listing</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
            Verify you&apos;re authorized to manage this company&apos;s profile — add contact
            details, services, and more.
          </p>
          <div className="mt-4 flex justify-center">
            <ClaimListingForm listingId={listing.id} />
          </div>
        </div>
      )}
    </section>
  );
}
