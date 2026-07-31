alter table public.listings
  alter column website drop not null;

alter table public.listings
  add column license_number text,
  add column source text,
  add column claimed boolean not null default false;
