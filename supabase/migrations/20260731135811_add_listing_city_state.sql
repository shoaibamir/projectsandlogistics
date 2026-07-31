alter table public.listings
  add column city text,
  add column state text;

-- Backfill city/state for FMC-sourced listings by parsing the existing
-- "based in {City}, {State}." fragment out of their description text.
update public.listings
set
  city = (regexp_match(description, 'based in ([^,]+), ([A-Z]{2})\.'))[1],
  state = (regexp_match(description, 'based in ([^,]+), ([A-Z]{2})\.'))[2]
where source = 'FMC public registry';
