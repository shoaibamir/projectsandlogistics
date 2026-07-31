import { supabase } from "@/lib/supabaseClient";

export type Category =
  | "Sea freight"
  | "Air freight"
  | "Warehousing"
  | "Trucking"
  | "Customs brokerage"
  | "Rail freight";

export type Listing = {
  id: string;
  name: string;
  category: Category;
  country: string;
  city: string | null;
  state: string | null;
  description: string;
  website: string | null;
  verified: boolean;
  license_number: string | null;
  license_type: string | null;
  license_renewal_date: string | null;
  source: string | null;
  claimed: boolean;
  phone: string | null;
  primary_contact_name: string | null;
  services: string[];
};

export const CATEGORIES: Category[] = [
  "Sea freight",
  "Air freight",
  "Warehousing",
  "Trucking",
  "Customs brokerage",
  "Rail freight",
];

const LISTING_COLUMNS =
  "id, name, category, country, city, state, description, website, verified, license_number, license_type, license_renewal_date, source, claimed, phone, primary_contact_name, services";

export async function getListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .order("name");

  if (error) throw error;

  return (data ?? []) as Listing[];
}

export async function getListingById(id: string): Promise<Listing | null> {
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data as Listing | null;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}
