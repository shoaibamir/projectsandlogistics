import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Projects & Logistics Directory sources and handles business information, including for unclaimed listings drawn from public registries.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Privacy policy</h1>
      <p className="mt-2 text-slate-500">Last updated July 2026</p>

      <div className="mt-8 space-y-8 text-slate-700">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">What data we show</h2>
          <p className="mt-3">
            Projects &amp; Logistics Directory lists logistics and freight companies to help
            shippers find providers. Some listings are added directly by the companies
            themselves. Others — marked as{" "}
            <strong className="font-semibold text-slate-900">unclaimed</strong> on their listing
            page — are compiled from public government licensing registries, such as the U.S.
            Federal Maritime Commission&apos;s public list of licensed Ocean Transportation
            Intermediaries.
          </p>
          <p className="mt-3">
            For unclaimed listings, the information we display is limited to what these
            registries publish: business name, general location (city and state or country), and
            license or registration number where one exists. We do not display personal
            information about individuals, and we do not collect or show financial or payment
            information for any listing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Claiming or removing an unclaimed listing
          </h2>
          <p className="mt-3">
            If your company appears as an unclaimed listing, you can request to claim it directly
            from the listing page — this lets you confirm the listing is yours so we can update it
            going forward. You can also request that we remove an unclaimed listing entirely, for
            any reason, at no cost.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">How to request removal</h2>
          <p className="mt-3">
            Visit the{" "}
            <Link
              href="/remove-listing"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              request removal
            </Link>{" "}
            page and submit your business name, an email address we can reach you at, a link to
            the listing if you have one, and any details that help us find it. We review removal
            requests manually and will follow up at the email address you provide.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-3">
            Questions about this policy or how your company&apos;s information is handled can be
            sent through the same{" "}
            <Link
              href="/remove-listing"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              request removal
            </Link>{" "}
            form.
          </p>
        </div>
      </div>
    </section>
  );
}
