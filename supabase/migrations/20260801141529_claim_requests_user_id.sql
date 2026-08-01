-- Tie claim requests to real accounts. business_email is kept for display
-- but is no longer the identifier used to authorize the insert.
alter table public.claim_requests
  add column user_id uuid not null references auth.users(id),
  add column verification_info text;

-- Previously anyone (anon) could insert a claim with any user_id/business_email
-- since the form was unauthenticated. Claiming now requires login, so tighten
-- this to authenticated-only, and require the row's user_id to match the
-- caller's own auth.uid() so nobody can file a claim "as" another user.
drop policy if exists "Public insert access" on public.claim_requests;

create policy "Authenticated users can submit their own claim"
  on public.claim_requests
  for insert
  to authenticated
  with check (user_id = auth.uid());

-- Manual review process for claims on FMC-sourced (unclaimed) listings:
-- cross-check the listing's license_number against the FMC's public OTI
-- register (fmc.gov) to confirm the claimant's company actually matches
-- before approving via approve_claim(). This is a manual step for the
-- reviewer, not something enforced in application code.
comment on column public.claim_requests.verification_info is
  'Free-text claimant-provided proof of affiliation (e.g. LinkedIn URL, phone number). For claims on FMC-sourced listings, reviewers should additionally cross-check the listing''s license_number against the FMC public OTI register at fmc.gov before calling approve_claim().';
