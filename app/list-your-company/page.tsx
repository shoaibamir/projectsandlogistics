import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "List Your Company",
  description:
    "Get your logistics or freight company listed in the Projects & Logistics directory — free to list.",
};

export default function ListYourCompanyPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">List your company</h1>
      <p className="mt-4 text-lg text-slate-600">
        We&apos;re putting the finishing touches on company submissions. Check back soon, or
        browse the directory in the meantime.
      </p>
      <div className="mt-8">
        <Link
          href="/directory"
          className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Browse the directory
        </Link>
      </div>
    </section>
  );
}
