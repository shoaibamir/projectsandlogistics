import type { Metadata } from "next";
import Link from "next/link";
import { getGuideBySlug } from "@/lib/guides";
import { jsonLdScriptProps } from "@/lib/jsonLd";
import { SITE_URL } from "@/lib/site";

const guide = getGuideBySlug("ocean-freight-forwarder-vs-nvocc")!;

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
};

export default function ForwarderVsNvoccPage() {
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

      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        Ocean freight forwarder vs. NVOCC: what&apos;s the difference?
      </h1>

      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          Both ocean freight forwarders and NVOCCs fall under the umbrella term &quot;ocean
          transportation intermediary&quot; (OTI), and the same company is often licensed as both.
          The distinction is about the role each plays in a given shipment, not necessarily two
          different kinds of company.
        </p>
        <p>
          A <span className="font-medium text-slate-900">freight forwarder</span> acts as an agent
          for the shipper: arranging transportation, handling documentation, and coordinating
          logistics, but without issuing its own bill of lading as the carrier. The forwarder is
          working on the shipper&apos;s behalf, not taking on carrier liability.
        </p>
        <p>
          An <span className="font-medium text-slate-900">NVOCC</span>, by contrast, acts as the
          carrier from the shipper&apos;s perspective — it issues its own bill of lading and takes
          on contractual responsibility for the cargo, even though it doesn&apos;t operate the
          vessel. It then books the actual ocean transport with a vessel-operating carrier.
        </p>
        <p>
          Why it matters: the party you contract with determines who is liable for the shipment
          and how claims are handled. When evaluating a provider, it&apos;s worth asking directly
          whether they&apos;re acting as your agent (forwarder) or as the carrier (NVOCC) for a
          given shipment.
        </p>
        <p>
          You can browse both types of provider in the{" "}
          <Link href="/directory" className="font-medium text-blue-600 hover:text-blue-700">
            directory
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
