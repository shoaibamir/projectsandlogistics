create table public.claim_requests (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null references public.listings(id),
  business_email text not null,
  message text,
  status text not null default 'pending',
  submitted_at timestamptz not null default now()
);

alter table public.claim_requests enable row level security;

create policy "Public insert access"
  on public.claim_requests
  for insert
  to anon, authenticated
  with check (true);
