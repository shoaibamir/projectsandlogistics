-- Prevent an owner from changing admin-controlled fields on their own
-- listing, even via a direct PATCH to the REST API with those fields in
-- the payload (i.e. bypassing the edit form entirely).
--
-- Deliberately checks current_user (the actual Postgres role for this
-- statement) rather than auth.role() (a convenience wrapper that reads a
-- JWT claim PostgREST sets). auth.role() is only meaningful for requests
-- that went through PostgREST — it's blank for direct connections like the
-- SQL editor and `supabase db push`. Since approve_claim() is designed to
-- be run from the SQL editor (as the `postgres` role) and needs to write
-- to these same columns, an auth.role()-only check would cause this
-- trigger to immediately revert approve_claim()'s own update. Checking
-- current_user correctly exempts both service-key REST calls (current_user
-- = 'service_role') and SQL-editor/migration/admin-function contexts
-- (current_user = 'postgres'), while anon/authenticated REST requests keep
-- current_user set to 'anon'/'authenticated' and stay protected.
create or replace function public.protect_listing_admin_fields()
returns trigger
language plpgsql
as $$
begin
  if current_user in ('postgres', 'service_role', 'supabase_admin') then
    return new;
  end if;

  new.license_number := old.license_number;
  new.license_type := old.license_type;
  new.license_renewal_date := old.license_renewal_date;
  new.verified := old.verified;
  new.plan := old.plan;
  new.claimed := old.claimed;
  new.claimed_by := old.claimed_by;
  new.claimed_at := old.claimed_at;
  new.status := old.status;
  new.source := old.source;

  return new;
end;
$$;

drop trigger if exists protect_listing_admin_fields_trigger on public.listings;

create trigger protect_listing_admin_fields_trigger
  before update on public.listings
  for each row
  execute function public.protect_listing_admin_fields();

-- RLS only decides who may attempt an update at all; the trigger above is
-- what actually protects the sensitive columns from a tampered payload.
create policy "Owners can update their own listings"
  on public.listings
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- Needed for "List your company": a logged-in user creates their own
-- listing (owner_id must match themselves, same anti-impersonation
-- pattern used for claim_requests).
create policy "Authenticated users can create their own listings"
  on public.listings
  for insert
  to authenticated
  with check (owner_id = auth.uid());

-- Tighten public read access now that pending (unapproved/unpublished)
-- listings exist: the old "Public read access" policy used `using (true)`,
-- which would otherwise expose every pending submission's contact details
-- to anyone querying the API directly, regardless of what the app's own
-- getListings() query filters client-side. Split into two policies: the
-- public only ever sees published rows; an owner can additionally see
-- their own listings regardless of status (needed for /my-listings).
drop policy if exists "Public read access" on public.listings;

create policy "Public can read published listings"
  on public.listings
  for select
  to anon, authenticated
  using (status = 'published');

create policy "Owners can read their own listings"
  on public.listings
  for select
  to authenticated
  using (owner_id = auth.uid());
