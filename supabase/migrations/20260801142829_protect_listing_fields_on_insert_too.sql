-- The original trigger only covered UPDATE, per the original ask. But the
-- RLS INSERT policy only checks owner_id = auth.uid() — nothing stops an
-- authenticated user from POSTing a brand-new listing directly with
-- verified: true, status: 'published', license_number: '...', plan: 'paid'
-- in the payload, bypassing review entirely. That undermines the point of
-- protecting these columns at all, so this extends the same trigger to
-- INSERT: a non-privileged insert always lands unverified, unlicensed,
-- pending, and on the free plan, regardless of what the client sends.
-- `claimed` and `source` are deliberately left as submitted — a legitimate
-- self-listing arrives with claimed = true (the submitter owns their own
-- new row) and source = 'self-listed'.
create or replace function public.protect_listing_admin_fields()
returns trigger
language plpgsql
as $$
begin
  if current_user in ('postgres', 'service_role', 'supabase_admin') then
    return new;
  end if;

  if tg_op = 'UPDATE' then
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
  elsif tg_op = 'INSERT' then
    new.license_number := null;
    new.license_type := null;
    new.license_renewal_date := null;
    new.verified := false;
    new.plan := 'free';
    new.status := 'pending';
    new.claimed_by := null;
    new.claimed_at := null;
  end if;

  return new;
end;
$$;

drop trigger if exists protect_listing_admin_fields_trigger on public.listings;

create trigger protect_listing_admin_fields_trigger
  before insert or update on public.listings
  for each row
  execute function public.protect_listing_admin_fields();
