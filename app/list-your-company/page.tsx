import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ListYourCompanyForm from "@/components/ListYourCompanyForm";

export const metadata: Metadata = {
  title: "List Your Company",
  description:
    "Get your logistics or freight company listed in the Projects & Logistics directory — free to list.",
};

export default async function ListYourCompanyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">List your company</h1>
      <p className="mt-4 text-slate-600">
        Add your company to the Projects &amp; Logistics directory — free to list. Every
        submission is reviewed before it goes live.
      </p>

      {user ? (
        <div className="mt-8">
          <ListYourCompanyForm />
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-slate-700">Sign in to list your company.</p>
          <Link
            href="/login?redirectTo=/list-your-company"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Sign in
          </Link>
        </div>
      )}
    </section>
  );
}
