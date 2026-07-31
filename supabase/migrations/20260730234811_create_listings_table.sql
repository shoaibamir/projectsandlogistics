create table public.listings (
  id text primary key,
  name text not null,
  category text not null check (
    category in (
      'Sea freight',
      'Air freight',
      'Warehousing',
      'Trucking',
      'Customs brokerage',
      'Rail freight'
    )
  ),
  country text not null,
  description text not null,
  website text not null,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index listings_category_idx on public.listings (category);

alter table public.listings enable row level security;

create policy "Public read access"
  on public.listings
  for select
  to anon, authenticated
  using (true);
