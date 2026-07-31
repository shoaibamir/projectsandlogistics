import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Freight Forwarder Licensing Works in the US",
  description:
    "An overview of how ocean freight forwarders and NVOCCs get licensed by the Federal Maritime Commission in the United States.",
};

export default function LicensingGuidePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href="/guides" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        &larr; All guides
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">
        How freight forwarder licensing works in the US
      </h1>

      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          In the United States, companies that arrange ocean transportation as an intermediary —
          whether as a freight forwarder or an NVOCC — generally fall under the regulatory
          category of Ocean Transportation Intermediary (OTI), overseen by the Federal Maritime
          Commission (FMC).
        </p>
        <p>
          To operate as a licensed OTI, a U.S.-based company typically needs to: hold a valid FMC
          license, maintain a surety bond (or equivalent financial responsibility instrument), and
          designate a qualifying individual who meets the FMC&apos;s experience requirements.
          Foreign-based NVOCCs can, in some cases, operate on a registered basis rather than a full
          license, provided they meet separate regulatory requirements.
        </p>
        <p>
          Licenses are tied to a specific license number and are subject to renewal; the FMC
          publishes a public list of active, licensed OTIs, which is one of the sources this
          directory draws on for unclaimed listings.
        </p>
        <p>
          This guide is a general overview, not legal advice — if you&apos;re seeking or renewing
          an OTI license, the FMC&apos;s own licensing guidance is the authoritative source.
        </p>
        <p>
          Browse licensed providers currently listed in the{" "}
          <Link href="/directory" className="font-medium text-blue-600 hover:text-blue-700">
            directory
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
