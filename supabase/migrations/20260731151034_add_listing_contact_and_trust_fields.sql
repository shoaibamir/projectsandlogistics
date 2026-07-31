alter table public.listings
  add column phone text,
  add column primary_contact_name text,
  add column services text[] not null default '{}',
  add column license_type text,
  add column license_renewal_date date;

-- All FMC-sourced pilot listings were pulled specifically from the FMC's
-- "Licensed NVOCCs" register (not the separate Ocean Freight Forwarders
-- list), so this can be backfilled accurately rather than left blank.
update public.listings
set license_type = 'NVOCC'
where source = 'FMC public registry';
