import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditListingForm from "@/components/EditListingForm";

export const metadata: Metadata = {
  title: "Edit Listing",
};

type EditListingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditListingPage({ params }: EditListingPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=${encodeURIComponent(`/my-listings/${id}/edit`)}`);
  }

  const { data: listing, error } = await supabase
    .from("listings")
    .select(
      "id, name, owner_id, description, services, phone, primary_contact_name, website, contact_email, street_address, city, state, linkedin_url, certifications",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!listing || listing.owner_id !== user.id) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Edit {listing.name}</h1>
      <p className="mt-2 text-slate-600">Update your company&apos;s profile information.</p>
      <div className="mt-8">
        <EditListingForm listing={listing} />
      </div>
    </section>
  );
}
