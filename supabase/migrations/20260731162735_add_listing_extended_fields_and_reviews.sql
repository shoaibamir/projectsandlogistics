-- city and state already exist (added in an earlier migration), so only
-- the remaining extended profile fields are added here.
alter table public.listings
  add column year_founded int,
  add column company_size text,
  add column street_address text,
  add column linkedin_url text,
  add column certifications text[] not null default '{}';

-- listing_id is text (not uuid) to match public.listings.id's actual type.
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references public.listings(id),
  reviewer_name text not null,
  rating int not null check (rating between 1 and 5),
  review_text text,
  created_at timestamptz not null default now()
);

create index reviews_listing_id_idx on public.reviews (listing_id);

alter table public.reviews enable row level security;

-- Read-only for now: reviews are seeded/admin-managed, not user-submitted.
create policy "Public read access"
  on public.reviews
  for select
  to anon, authenticated
  using (true);
