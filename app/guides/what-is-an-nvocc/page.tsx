import type { Metadata } from "next";
import Link from "next/link";
import { getGuideBySlug } from "@/lib/guides";
import { jsonLdScriptProps } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";

const guide = getGuideBySlug("what-is-an-nvocc")!;

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
};

export default function WhatIsAnNvoccPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    url: `${SITE_URL}/guides/${guide.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <script {...jsonLdScriptProps(articleSchema)} />

      <Link href="/guides" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        &larr; All guides
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">What is an NVOCC?</h1>

      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          An NVOCC — short for Non-Vessel Operating Common Carrier — is a company that arranges
          ocean freight shipments without owning or operating the ships that actually carry the
          cargo. Instead, an NVOCC books space on vessels run by ocean carriers, consolidates
          cargo from multiple shippers into containers, and issues its own bill of lading to the
          shipper.
        </p>
        <p>
          In practice, this means an NVOCC acts as the carrier from the shipper&apos;s point of
          view — taking on contractual responsibility for the shipment — while relying on vessel
          operators to move the freight. This lets smaller or mid-sized shippers access ocean
          freight rates and container space they might not get on their own, since the NVOCC
          combines volume across many customers.
        </p>
        <p>
          In the United States, NVOCCs operating to or from U.S. ports are regulated by the
          Federal Maritime Commission (FMC) and generally must be licensed or properly registered,
          maintain a bond, and publish tariffs for their services under the Shipping Act.
        </p>
        <p>
          Companies in this directory tagged under{" "}
          <span className="font-medium text-slate-900">Sea freight</span> include licensed NVOCCs
          — you can browse them, along with other ocean transportation providers, from the{" "}
          <Link href="/directory" className="font-medium text-blue-600 hover:text-blue-700">
            directory
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
