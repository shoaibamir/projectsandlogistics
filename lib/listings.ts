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
  street_address: string | null;
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
  contact_email: string | null;
  services: string[];
  year_founded: number | null;
  company_size: string | null;
  linkedin_url: string | null;
  certifications: string[];
  status: "pending" | "published";
  created_at: string;
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
  "id, name, category, country, city, state, street_address, description, website, verified, license_number, license_type, license_renewal_date, source, claimed, phone, primary_contact_name, contact_email, services, year_founded, company_size, linkedin_url, certifications, status, created_at";

export async function getListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .eq("status", "published")
    .order("name");

  if (error) throw error;

  return (data ?? []) as Listing[];
}

export async function getRecentListings(limit: number): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []) as Listing[];
}

export async function getListingById(id: string): Promise<Listing | null> {
  const { data, error } = await supabase
    .from("listings")
    .select(LISTING_COLUMNS)
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;

  return data as Listing | null;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}
