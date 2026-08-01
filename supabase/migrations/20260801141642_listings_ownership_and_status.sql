alter table public.listings
  add column owner_id uuid references auth.users(id),
  add column claimed_by uuid references auth.users(id),
  add column claimed_at timestamptz,
  add column plan text not null default 'free';

-- Add status as nullable-with-default first so existing rows get a value
-- via the default, then backfill explicitly to 'published' before locking
-- it down to not null + a check constraint. New rows (self-listed or newly
-- claimed) default to 'pending' as intended; only the pre-existing mock
-- catalog is backfilled to 'published' here.
alter table public.listings add column status text default 'pending';
update public.listings set status = 'published';
alter table public.listings alter column status set not null;
alter table public.listings add constraint listings_status_check
  check (status in ('pending', 'published'));

-- The previous "populate everything" pass set claimed = true on every mock
-- listing for UI/UX visibility. That leaves nothing unclaimed to exercise
-- the new claim flow against, so revert a spread of listings (one per
-- category) back to unclaimed for testing purposes.
update public.listings set claimed = false, verified = false
where id in (
  'apex-cargo-movers',
  'borderline-customs-solutions',
  'transandes-rail-freight',
  'harborview-distribution-centers',
  'vantage-freight-carriers',
  'clearway-customs-brokers',
  'atlantic-crossing-shipping',
  'ironclad-warehousing-solutions'
);
