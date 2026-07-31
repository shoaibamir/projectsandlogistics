-- Enrich 7 of the currently-thin mock listings (one per category, plus a
-- second Sea freight one) into fully rich profiles covering every field the
-- detail page now supports, and seed each with a few mock reviews. Every
-- other listing is left untouched and stays thin, matching what real
-- unclaimed data currently looks like.

-- Sea freight (had a license already) — trust block + everything else
update public.listings set
  claimed = true,
  verified = true,
  phone = '+86 755 5550 1122',
  primary_contact_name = 'Mei Chen',
  services = array['FCL Ocean Freight','LCL Consolidation','Reefer Container Shipping'],
  year_founded = 2011,
  company_size = '51-200 employees',
  street_address = '88 Binhai Avenue, Nanshan District',
  linkedin_url = 'https://www.linkedin.com/company/silverpoint-ocean-logistics',
  certifications = array['ISO 9001','C-TPAT Certified']
where id = 'silverpoint-ocean-logistics';

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('silverpoint-ocean-logistics', 'James Carter', 5, 'Smooth booking process and consistent transit times on our China-to-LA lane. Documentation was always accurate.'),
  ('silverpoint-ocean-logistics', 'Priya Nair', 4, 'Reliable service overall, though communication during the Lunar New Year peak season could be faster.');

-- Sea freight (deliberately no license) — rich profile without a trust block
update public.listings set
  claimed = true,
  verified = true,
  phone = '+31 10 555 0177',
  primary_contact_name = 'Bram de Vries',
  services = array['FCL Ocean Freight','Port-to-Port Delivery','Cargo Insurance'],
  year_founded = 2005,
  company_size = '11-50 employees',
  street_address = 'Waalhaven Zuidzijde 15',
  linkedin_url = 'https://www.linkedin.com/company/northbridge-container-lines',
  certifications = array['ISO 14001']
where id = 'northbridge-container-lines';

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('northbridge-container-lines', 'Sophie Laurent', 5, 'Excellent coordination on our Rotterdam import shipments — always kept us updated on vessel schedules.'),
  ('northbridge-container-lines', 'Tom Reynolds', 4, 'Good rates and dependable service for our regular Northern Europe lanes.'),
  ('northbridge-container-lines', 'Anke Willems', 3, 'Service is solid but their online tracking portal feels outdated compared to competitors.');

-- Air freight
update public.listings set
  claimed = true,
  verified = true,
  phone = '+971 4 555 0198',
  primary_contact_name = 'Yusuf Al-Amiri',
  services = array['Charter Freight','Express Air Freight','Dangerous Goods Handling'],
  year_founded = 2016,
  company_size = '11-50 employees',
  street_address = 'Al Garhoud Business Tower, Level 9',
  linkedin_url = 'https://www.linkedin.com/company/falcon-ridge-air-freight',
  certifications = array['IATA Accredited']
where id = 'falcon-ridge-air-freight';

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('falcon-ridge-air-freight', 'Rania Haddad', 5, 'Fast turnaround on an urgent charter shipment — handled the dangerous goods paperwork flawlessly.'),
  ('falcon-ridge-air-freight', 'Mark Sullivan', 4, 'Dependable for time-sensitive freight, pricing is a bit higher than average but worth it for the speed.');

-- Warehousing
update public.listings set
  claimed = true,
  verified = true,
  phone = '(816) 555-0184',
  primary_contact_name = 'Kevin Ortiz',
  services = array['Bonded Storage','Pick & Pack','Inventory Management'],
  year_founded = 1998,
  company_size = '201-500 employees',
  street_address = '4200 Roanoke Industrial Blvd',
  linkedin_url = 'https://www.linkedin.com/company/union-depot-storage',
  certifications = array['ISO 9001','SmartWay Partner']
where id = 'union-depot-storage';

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('union-depot-storage', 'Latoya Brooks', 5, 'Our inventory accuracy improved significantly after switching to their fulfillment services.'),
  ('union-depot-storage', 'Ben Coughlin', 4, 'Well-run facility, responsive account team, minor delays during peak holiday season.'),
  ('union-depot-storage', 'Nadia Farouk', 5, 'Great value for bonded storage in the Midwest — highly recommend for regional distribution.');

-- Trucking
update public.listings set
  claimed = true,
  verified = true,
  phone = '(402) 555-0132',
  primary_contact_name = 'Dale Whitmore',
  services = array['Full Truckload','Refrigerated Trucking','Expedited Freight'],
  year_founded = 2009,
  company_size = '51-200 employees',
  street_address = '1420 Cargo Way',
  linkedin_url = 'https://www.linkedin.com/company/prairie-road-transport',
  certifications = array['SmartWay Partner']
where id = 'prairie-road-transport';

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('prairie-road-transport', 'Colin Baxter', 4, 'Consistent on-time delivery for our reefer loads across the central states.'),
  ('prairie-road-transport', 'Michelle Hoang', 3, 'Decent service, but dispatch communication could be more proactive during weather delays.');

-- Customs brokerage
update public.listings set
  claimed = true,
  verified = true,
  phone = '(973) 555-0165',
  primary_contact_name = 'Angela Ruiz',
  services = array['Import Clearance','Export Documentation','ISF Filing'],
  year_founded = 2013,
  company_size = '11-50 employees',
  street_address = '200 Port Authority Way, Suite 4',
  linkedin_url = 'https://www.linkedin.com/company/bridgeway-customs-services',
  certifications = array['Licensed Customs Broker']
where id = 'bridgeway-customs-services';

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('bridgeway-customs-services', 'Victor Alarcon', 5, 'Their team caught a classification error that would have cost us thousands in duties. Extremely thorough.'),
  ('bridgeway-customs-services', 'Grace Kim', 5, 'Fast ISF filings and clear communication — never had a clearance delay with them.'),
  ('bridgeway-customs-services', 'Derek Simmons', 4, 'Reliable brokerage service, pricing is fair for the Newark market.');

-- Rail freight
update public.listings set
  claimed = true,
  verified = true,
  phone = '+1 204 555 0141',
  primary_contact_name = 'Grant MacDonald',
  services = array['Intermodal Rail','Rail Yard Transloading','Bulk Commodity Transport'],
  year_founded = 2001,
  company_size = '201-500 employees',
  street_address = '1100 Rail Yard Crescent',
  linkedin_url = 'https://www.linkedin.com/company/northline-rail-solutions',
  certifications = array['ISO 9001']
where id = 'northline-rail-solutions';

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('northline-rail-solutions', 'Fiona Campbell', 4, 'Solid intermodal service across the prairies, minor scheduling hiccups during grain season.'),
  ('northline-rail-solutions', 'Patrick Doyle', 5, 'Their transloading team is efficient and the rates are competitive for Western Canada routes.');
