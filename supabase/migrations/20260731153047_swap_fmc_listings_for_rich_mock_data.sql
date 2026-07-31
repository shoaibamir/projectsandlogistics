-- Swap out the real FMC-sourced listings for a richer, fully-populated
-- fictional mock dataset, to unblock detail-page UI/UX work without being
-- tied to the current limits of the real data (no phone/contact/services
-- captured yet). Real FMC data returns later via a separate seed pass —
-- this migration deliberately does not touch the original 18 mock rows
-- (supabase/migrations/20260730234846_seed_listings.sql) or the FMC seed
-- migration (20260730234852_seed_pilot_fmc_listings.sql) itself.

-- Remove test claim/removal requests (from earlier manual verification,
-- not real user submissions) that reference FMC-sourced listings, so the
-- foreign key constraints don't block the delete below.
delete from public.claim_requests
  where listing_id in (select id from public.listings where source = 'FMC public registry');

delete from public.removal_requests
  where listing_id in (select id from public.listings where source = 'FMC public registry');

delete from public.listings where source = 'FMC public registry';

insert into public.listings
  (id, name, category, country, city, state, description, website, verified,
   license_number, license_type, license_renewal_date, source, claimed,
   phone, primary_contact_name, services)
values
  -- Sea freight (the only category that carries an FMC-style OTI license,
  -- matching real-world FMC licensing scope)
  ('meridian-bay-logistics', 'Meridian Bay Logistics', 'Sea freight', 'United States', 'Long Beach', 'CA',
   'Meridian Bay Logistics is a full-service NVOCC specializing in transpacific container shipping and cargo consolidation for mid-market importers and exporters.',
   'https://meridianbaylogistics.example.com', true,
   '091042', 'NVOCC', '2028-04-30', null, true,
   '(562) 555-0148', 'Carla Jimenez', array['FCL Ocean Freight','LCL Consolidation','Cargo Insurance']),

  ('pacific-gateway-shipping', 'Pacific Gateway Shipping', 'Sea freight', 'Singapore', 'Singapore', null,
   'Pacific Gateway Shipping operates FCL and reefer container services connecting Southeast Asian ports with major global trade lanes.',
   'https://pacificgatewayshipping.example.com', true,
   '091058', 'NVOCC', '2027-09-15', null, true,
   '+65 6555 0192', 'Wei Ling Tan', array['FCL Ocean Freight','Reefer Container Shipping','Port-to-Port Delivery']),

  ('silverpoint-ocean-logistics', 'Silverpoint Ocean Logistics', 'Sea freight', 'China', 'Shenzhen', null,
   'Silverpoint Ocean Logistics arranges containerized ocean freight and NVOCC services for manufacturers exporting out of East Asia.',
   'https://silverpointocean.example.com', false,
   '091073', 'NVOCC, Freight Forwarder', '2028-01-20', null, false,
   null, null, '{}'),

  ('coastal-line-freight-co', 'Coastal Line Freight Co.', 'Sea freight', 'Vietnam', 'Ho Chi Minh City', null,
   'Coastal Line Freight Co. provides ocean freight forwarding and consolidation services for garment and electronics exporters in Southeast Asia.',
   null, false,
   '091089', 'Freight Forwarder', '2027-12-05', null, false,
   null, null, '{}'),

  ('northbridge-container-lines', 'Northbridge Container Lines', 'Sea freight', 'Netherlands', 'Rotterdam', null,
   'Northbridge Container Lines coordinates container shipping and inland distribution across Northern European ports.',
   'https://northbridgecontainer.example.com', false,
   null, null, null, null, false,
   null, null, '{}'),

  -- Air freight
  ('skyline-air-cargo-solutions', 'Skyline Air Cargo Solutions', 'Air freight', 'Germany', 'Frankfurt', null,
   'Skyline Air Cargo Solutions offers time-critical and temperature-controlled air freight forwarding across major European and transatlantic routes.',
   'https://skylineaircargo.example.com', true,
   null, null, null, null, true,
   '+49 69 5550 1187', 'Lukas Bergmann', array['Charter Freight','Temperature-Controlled Cargo','Express Air Freight']),

  ('nordic-air-freight-partners', 'Nordic Air Freight Partners', 'Air freight', 'Sweden', 'Stockholm', null,
   'Nordic Air Freight Partners specializes in charter and scheduled air cargo services connecting Scandinavia with global markets.',
   'https://nordicairfreight.example.com', true,
   null, null, null, null, true,
   '+46 8 555 0143', 'Elin Karlsson', array['Charter Freight','Same-Day Air Freight','Dangerous Goods Handling']),

  ('falcon-ridge-air-freight', 'Falcon Ridge Air Freight', 'Air freight', 'United Arab Emirates', 'Dubai', null,
   'Falcon Ridge Air Freight arranges air cargo charters and express freight forwarding across the Middle East and South Asia.',
   null, false,
   null, null, null, null, false,
   null, null, '{}'),

  ('apex-cargo-movers', 'Apex Cargo Movers', 'Air freight', 'India', 'Mumbai', null,
   'Apex Cargo Movers provides air freight forwarding and customs documentation support for exporters shipping out of South Asia.',
   'https://apexcargomovers.example.com', false,
   null, null, null, null, false,
   null, null, '{}'),

  -- Warehousing
  ('continental-warehousing-group', 'Continental Warehousing Group', 'Warehousing', 'United States', 'Memphis', 'TN',
   'Continental Warehousing Group provides bonded and climate-controlled warehousing with nationwide distribution and fulfillment support.',
   'https://continentalwarehousing.example.com', true,
   null, null, null, null, true,
   '(901) 555-0176', 'Marcus Webb', array['Bonded Storage','Pick & Pack','Cross-Docking']),

  ('summit-distribution-services', 'Summit Distribution Services', 'Warehousing', 'United Kingdom', 'Birmingham', null,
   'Summit Distribution Services offers third-party fulfillment, inventory management, and cross-docking for e-commerce and retail brands.',
   'https://summitdistribution.example.com', true,
   null, null, null, null, true,
   '+44 20 5550 1129', 'Olivia Bennett', array['Fulfillment Services','Inventory Management','Cross-Docking']),

  ('union-depot-storage', 'Union Depot Storage', 'Warehousing', 'United States', 'Kansas City', 'MO',
   'Union Depot Storage operates regional distribution warehousing serving the central United States.',
   null, false,
   null, null, null, null, false,
   null, null, '{}'),

  -- Trucking
  ('redwood-trucking-alliance', 'Redwood Trucking Alliance', 'Trucking', 'United States', 'Dallas', 'TX',
   'Redwood Trucking Alliance operates a full truckload and LTL fleet serving shippers across the western United States.',
   'https://redwoodtrucking.example.com', true,
   null, null, null, null, true,
   '(214) 555-0163', 'Danny Osorio', array['Full Truckload','LTL Freight','Flatbed Transport']),

  ('vantage-freight-carriers', 'Vantage Freight Carriers', 'Trucking', 'Mexico', 'Monterrey', null,
   'Vantage Freight Carriers specializes in cross-border trucking and expedited freight between Mexico and the United States.',
   'https://vantagefreightcarriers.example.com', true,
   null, null, null, null, true,
   '+52 81 5550 1184', 'Rosa Delgado', array['Cross-Border Trucking','Expedited Freight','Full Truckload']),

  ('prairie-road-transport', 'Prairie Road Transport', 'Trucking', 'United States', 'Omaha', 'NE',
   'Prairie Road Transport provides regional and long-haul trucking services across the central United States.',
   'https://prairieroadtransport.example.com', false,
   null, null, null, null, false,
   null, null, '{}'),

  ('ridgeline-freight-systems', 'Ridgeline Freight Systems', 'Trucking', 'United States', 'Denver', 'CO',
   'Ridgeline Freight Systems offers flatbed and heavy-haul trucking for industrial and construction shippers.',
   null, false,
   null, null, null, null, false,
   null, null, '{}'),

  -- Customs brokerage
  ('harborline-customs-solutions', 'Harborline Customs Solutions', 'Customs brokerage', 'Canada', 'Toronto', null,
   'Harborline Customs Solutions handles import clearance, tariff classification, and trade compliance advisory for cross-border shippers.',
   'https://harborlinecustoms.example.com', true,
   null, null, null, null, true,
   '(416) 555-0157', 'Ian MacLeod', array['Import Clearance','Trade Compliance Advisory','Tariff Classification']),

  ('global-trade-compliance-group', 'Global Trade Compliance Group', 'Customs brokerage', 'United States', 'Miami', 'FL',
   'Global Trade Compliance Group provides customs brokerage and trade compliance services for importers across a range of regulated industries.',
   'https://globaltradecompliance.example.com', true,
   null, null, null, null, true,
   '(305) 555-0139', 'Priya Shah', array['Import Clearance','Bonded Warehousing','ISF Filing']),

  ('bridgeway-customs-services', 'Bridgeway Customs Services', 'Customs brokerage', 'United States', 'Newark', 'NJ',
   'Bridgeway Customs Services offers import and export customs clearance support for regional freight forwarders.',
   'https://bridgewaycustoms.example.com', false,
   null, null, null, null, false,
   null, null, '{}'),

  -- Rail freight
  ('iron-rail-freight-corp', 'Iron Rail Freight Corp', 'Rail freight', 'United States', 'Chicago', 'IL',
   'Iron Rail Freight Corp moves intermodal and bulk commodity freight across major North American rail corridors.',
   'https://ironrailfreight.example.com', true,
   null, null, null, null, true,
   '(312) 555-0121', 'Tom Whitfield', array['Intermodal Rail','Bulk Commodity Transport','Container Rail']),

  ('northline-rail-solutions', 'Northline Rail Solutions', 'Rail freight', 'Canada', 'Winnipeg', null,
   'Northline Rail Solutions provides intermodal rail freight and transloading services across Western Canada.',
   null, false,
   null, null, null, null, false,
   null, null, '{}'),

  ('meridian-rail-logistics', 'Meridian Rail Logistics', 'Rail freight', 'United States', 'St. Louis', 'MO',
   'Meridian Rail Logistics coordinates unit train and container rail service for bulk shippers in the central United States.',
   'https://meridianraillogistics.example.com', false,
   null, null, null, null, false,
   null, null, '{}');
