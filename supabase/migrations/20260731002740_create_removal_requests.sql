create table public.removal_requests (
  id uuid primary key default gen_random_uuid(),
  listing_id text references public.listings(id),
  business_name text,
  email text not null,
  message text,
  status text not null default 'pending',
  submitted_at timestamptz not null default now()
);

alter table public.removal_requests enable row level security;

create policy "Public insert access"
  on public.removal_requests
  for insert
  to anon, authenticated
  with check (true);
