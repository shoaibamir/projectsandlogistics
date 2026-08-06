import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My Listings",
  description: "Manage the company listings you own on Projects & Logistics Directory.",
};

export default async function MyListingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/my-listings");
  }

  const { data: listings, error } = await supabase
    .from("listings")
    .select("id, name, category, country, status")
    .eq("owner_id", user.id)
    .order("name");

  if (error) throw error;

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">My listings</h1>
      <p className="mt-2 text-slate-600">
        Companies you own or have claimed on Projects &amp; Logistics.
      </p>

      {listings && listings.length > 0 ? (
        <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white">
          {listings.map((listing) => (
            <li key={listing.id} className="flex items-center justify-between gap-4 px-4 py-4">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">{listing.name}</p>
                <p className="truncate text-sm text-slate-500">
                  {listing.country} &middot; {listing.category}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                    listing.status === "published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {listing.status === "published" ? "Published" : "Pending review"}
                </span>
                <Link
                  href={`/my-listings/${listing.id}/edit`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-lg border border-dashed border-slate-300 px-4 py-8 text-center text-slate-500">
          You don&apos;t own any listings yet.{" "}
          <Link
            href="/list-your-company"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            List your company
          </Link>
          .
        </p>
      )}
    </section>
  );
}
