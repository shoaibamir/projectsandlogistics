import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Plain-language guides to ocean freight forwarding, NVOCCs, and U.S. freight forwarder licensing.",
};

const GUIDES = [
  {
    href: "/guides/what-is-an-nvocc",
    title: "What is an NVOCC?",
    description:
      "A plain-language explanation of non-vessel operating common carriers and what they do.",
  },
  {
    href: "/guides/ocean-freight-forwarder-vs-nvocc",
    title: "Ocean freight forwarder vs. NVOCC: what's the difference?",
    description: "How these two types of ocean transportation intermediary compare.",
  },
  {
    href: "/guides/freight-forwarder-licensing-in-the-us",
    title: "How freight forwarder licensing works in the US",
    description: "An overview of FMC licensing for ocean transportation intermediaries.",
  },
];

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
          <li key={guide.href}>
            <Link
              href={guide.href}
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
