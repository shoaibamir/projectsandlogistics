import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Plain-language guides to ocean freight forwarding, NVOCCs, and U.S. freight forwarder licensing.",
};

export default function GuidesIndexPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Guides</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        Plain-language explainers on ocean freight forwarding and logistics licensing, for
        shippers and providers navigating the industry.
      </p>

      <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="block px-4 py-4 transition hover:bg-slate-50"
            >
              <p className="font-semibold text-slate-900">{guide.title}</p>
              <p className="mt-1 text-sm text-slate-500">{guide.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
