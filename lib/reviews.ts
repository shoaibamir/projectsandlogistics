import { supabase } from "@/lib/supabaseClient";

export type Review = {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string | null;
  created_at: string;
};

export async function getReviewsByListingId(listingId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, reviewer_name, rating, review_text, created_at")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}
