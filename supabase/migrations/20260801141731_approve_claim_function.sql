-- Approving a claim is a single function call rather than two hand-synced
-- UPDATEs. Intended usage: an admin reviews the claim (see the manual FMC
-- license cross-check note on claim_requests.verification_info), then runs
--   select public.approve_claim('<claim id>');
-- from the SQL editor.
--
-- SECURITY DEFINER so it can update listings/claim_requests regardless of
-- the caller's own RLS grants. It has no internal authorization check, so
-- EXECUTE is intentionally restricted below to service_role only — regular
-- authenticated users must never be able to call this directly.
create or replace function public.approve_claim(claim_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_listing_id text;
  v_user_id uuid;
  v_status text;
begin
  select listing_id, user_id, status
    into v_listing_id, v_user_id, v_status
  from public.claim_requests
  where id = claim_id;

  if v_listing_id is null then
    raise exception 'Claim request % not found', claim_id;
  end if;

  if v_status = 'approved' then
    raise exception 'Claim request % has already been approved', claim_id;
  end if;

  update public.claim_requests
  set status = 'approved'
  where id = claim_id;

  update public.listings
  set owner_id = v_user_id,
      claimed = true,
      claimed_by = v_user_id,
      claimed_at = now()
  where id = v_listing_id;
end;
$$;

revoke execute on function public.approve_claim(uuid) from public, anon, authenticated;
grant execute on function public.approve_claim(uuid) to service_role;
