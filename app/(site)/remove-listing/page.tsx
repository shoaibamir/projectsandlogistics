import type { Metadata } from "next";
import RemovalRequestForm from "@/components/RemovalRequestForm";

export const metadata: Metadata = {
  title: "Request Removal",
  description:
    "Request that a listing be removed from the Projects & Logistics Directory, including unclaimed listings sourced from public registries.",
};

export default function RemoveListingPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Request removal</h1>
      <p className="mt-4 max-w-2xl text-slate-600">
        If you&apos;d like a listing removed from the directory — including an unclaimed listing
        sourced from a public registry — fill out the form below. We review every request
        manually and will follow up at the email you provide.
      </p>
      <div className="mt-8">
        <RemovalRequestForm />
      </div>
    </section>
  );
}
