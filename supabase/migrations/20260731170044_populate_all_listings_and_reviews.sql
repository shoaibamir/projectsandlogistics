-- Fully populate every mock listing (all fields, every listing claimed and
-- verified) purely for development visibility into the detail page's full
-- design, per explicit instruction that this is not meant to reflect a
-- realistic thin/rich mix right now. That mix returns later via a fresh
-- reseed rather than by editing this migration.

update public.listings set
  contact_email = 'info@apexcargomovers.example.com',
  phone = '+91 230-284-7515',
  primary_contact_name = 'Liam Kowalski',
  services = array['Charter Freight','Same-Day Air Freight','Dangerous Goods Handling','Express Air Freight'],
  year_founded = 2000,
  company_size = '201-500 employees',
  street_address = '6526 Terminal Way',
  linkedin_url = 'https://www.linkedin.com/company/apex-cargo-movers',
  certifications = array['ISO 9001','IATA Accredited','C-TPAT Certified'],
  license_number = '096001',
  license_type = 'Freight Forwarder',
  license_renewal_date = '2029-02-18',
  claimed = true,
  verified = true
where id = 'apex-cargo-movers';

update public.listings set
  contact_email = 'info@atlanticcrossing.example.com',
  phone = '+31 433-311-7266',
  primary_contact_name = 'Camila Al-Rashid',
  services = array['Reefer Container Shipping','Cargo Insurance','Break Bulk Shipping','FCL Ocean Freight'],
  year_founded = 1992,
  company_size = '51-200 employees',
  street_address = '3191 Terminal Way',
  city = 'Amsterdam',
  linkedin_url = 'https://www.linkedin.com/company/atlantic-crossing-shipping',
  certifications = array['NVOCC Bonded','ISO 9001','SmartWay Partner'],
  license_number = '096002',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2027-03-15',
  claimed = true,
  verified = true
where id = 'atlantic-crossing-shipping';

update public.listings set
  contact_email = 'info@bluehorizonocean.example.com',
  phone = '+65 906-697-7693',
  primary_contact_name = 'Antoine Tanaka',
  services = array['FCL Ocean Freight','Bulk Vessel Chartering','Break Bulk Shipping','Reefer Container Shipping'],
  year_founded = 2019,
  company_size = '1-10 employees',
  street_address = '3609 Cargo Ln',
  city = 'Singapore',
  linkedin_url = 'https://www.linkedin.com/company/blue-horizon-ocean-freight',
  certifications = array['NVOCC Bonded','SmartWay Partner','C-TPAT Certified'],
  license_number = '096003',
  license_type = 'NVOCC',
  license_renewal_date = '2028-01-25',
  claimed = true,
  verified = true
where id = 'blue-horizon-ocean-freight';

update public.listings set
  contact_email = 'info@borderlinecustoms.example.com',
  phone = '+52 970-632-7653',
  primary_contact_name = 'Liam Bello',
  services = array['Import Clearance','Bonded Warehousing','Tariff Classification'],
  year_founded = 2007,
  company_size = '51-200 employees',
  street_address = '5014 Trade Center Dr',
  city = 'Mexico City',
  linkedin_url = 'https://www.linkedin.com/company/borderline-customs-solutions',
  certifications = array['C-TPAT Certified','ISO 14001','SmartWay Partner'],
  license_number = '096004',
  license_type = 'NVOCC',
  license_renewal_date = '2028-10-05',
  claimed = true,
  verified = true
where id = 'borderline-customs-solutions';

update public.listings set
  contact_email = 'info@bridgewaycustoms.example.com',
  license_number = '096005',
  license_type = 'NVOCC',
  license_renewal_date = '2027-09-20',
  claimed = true,
  verified = true
where id = 'bridgeway-customs-services';

update public.listings set
  contact_email = 'info@clearwaycustoms.example.com',
  phone = '+1 619-982-2452',
  primary_contact_name = 'Dmitri Kowalski',
  services = array['Export Documentation','Tariff Classification'],
  year_founded = 2010,
  company_size = '1-10 employees',
  street_address = '6108 Commerce Blvd',
  city = 'Vancouver',
  linkedin_url = 'https://www.linkedin.com/company/clearway-customs-brokers',
  certifications = array['SmartWay Partner','ISO 9001','C-TPAT Certified'],
  license_number = '096006',
  license_type = 'Freight Forwarder',
  license_renewal_date = '2027-06-30',
  claimed = true,
  verified = true
where id = 'clearway-customs-brokers';

update public.listings set
  website = 'https://coastallinefreightco.example.com',
  contact_email = 'info@coastallinefreightco.example.com',
  phone = '+84 751-860-5626',
  primary_contact_name = 'Fatoumata Lefevre',
  services = array['Break Bulk Shipping','LCL Consolidation','Bulk Vessel Chartering','Cargo Insurance'],
  year_founded = 1987,
  company_size = '11-50 employees',
  street_address = '5177 Gateway Ave',
  linkedin_url = 'https://www.linkedin.com/company/coastal-line-freight-co',
  certifications = array['NVOCC Bonded','ISO 9001','ISO 14001'],
  claimed = true,
  verified = true
where id = 'coastal-line-freight-co';

update public.listings set
  contact_email = 'info@continentalrailcargo.example.com',
  phone = '+49 304-542-8941',
  primary_contact_name = 'Mei Dubois',
  services = array['Container Rail','Bulk Commodity Transport','Unit Train Service'],
  year_founded = 1986,
  company_size = '201-500 employees',
  street_address = '1524 Harbor Way',
  city = 'Hamburg',
  linkedin_url = 'https://www.linkedin.com/company/continental-rail-cargo',
  certifications = array['ISO 9001','C-TPAT Certified','ISO 14001'],
  license_number = '096007',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'continental-rail-cargo';

update public.listings set
  contact_email = 'info@continentalwarehousing.example.com',
  year_founded = 2006,
  company_size = '11-50 employees',
  street_address = '6663 Distribution Dr',
  linkedin_url = 'https://www.linkedin.com/company/continental-warehousing-group',
  certifications = array['ISO 14001','ISO 9001','SmartWay Partner'],
  license_number = '096008',
  license_type = 'NVOCC',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'continental-warehousing-group';

update public.listings set
  contact_email = 'info@eurohaultrucking.example.com',
  phone = '+48 609-946-7760',
  primary_contact_name = 'Viktor Rossi',
  services = array['LTL Freight','Full Truckload','Flatbed Transport'],
  year_founded = 1986,
  company_size = '1-10 employees',
  street_address = '5015 Commerce Blvd',
  city = 'Warsaw',
  linkedin_url = 'https://www.linkedin.com/company/eurohaul-trucking-group',
  certifications = array['ISO 9001','SmartWay Partner','C-TPAT Certified'],
  license_number = '096009',
  license_type = 'Freight Forwarder',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'eurohaul-trucking-group';

update public.listings set
  contact_email = 'info@falconexpressair.example.com',
  phone = '+971 684-784-8703',
  primary_contact_name = 'David Ibrahim',
  services = array['Express Air Freight','Same-Day Air Freight','Dangerous Goods Handling','Perishables Handling'],
  year_founded = 1994,
  company_size = '51-200 employees',
  street_address = '2839 Commerce Blvd',
  city = 'Abu Dhabi',
  linkedin_url = 'https://www.linkedin.com/company/falcon-express-air-freight',
  certifications = array['C-TPAT Certified','ISO 9001','ISO 14001'],
  license_number = '096010',
  license_type = 'NVOCC',
  license_renewal_date = '2027-06-30',
  claimed = true,
  verified = true
where id = 'falcon-express-air-freight';

update public.listings set
  website = 'https://falconridgeairfreight.example.com',
  contact_email = 'info@falconridgeairfreight.example.com',
  license_number = '096011',
  license_type = 'NVOCC',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'falcon-ridge-air-freight';

update public.listings set
  contact_email = 'info@globaltradecompliance.example.com',
  year_founded = 1990,
  company_size = '501-1000 employees',
  street_address = '373 Harbor Way',
  linkedin_url = 'https://www.linkedin.com/company/global-trade-compliance-group',
  certifications = array['Licensed Customs Broker','ISO 14001','C-TPAT Certified'],
  license_number = '096012',
  license_type = 'Freight Forwarder',
  license_renewal_date = '2028-07-15',
  claimed = true,
  verified = true
where id = 'global-trade-compliance-group';

update public.listings set
  contact_email = 'info@globalgatetrade.example.com',
  phone = '+65 838-895-4657',
  primary_contact_name = 'Wei Costa',
  services = array['Import Clearance','ISF Filing'],
  year_founded = 2017,
  company_size = '11-50 employees',
  street_address = '8623 Gateway Ave',
  city = 'Singapore',
  linkedin_url = 'https://www.linkedin.com/company/globalgate-trade-compliance',
  certifications = array['ISO 14001','SmartWay Partner','C-TPAT Certified'],
  license_number = '096013',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2028-10-05',
  claimed = true,
  verified = true
where id = 'globalgate-trade-compliance';

update public.listings set
  contact_email = 'info@harborlinecustoms.example.com',
  year_founded = 2008,
  company_size = '1-10 employees',
  street_address = '5048 Trade Center Dr',
  linkedin_url = 'https://www.linkedin.com/company/harborline-customs-solutions',
  certifications = array['ISO 9001','ISO 14001','C-TPAT Certified'],
  license_number = '096014',
  license_type = 'NVOCC',
  license_renewal_date = '2028-07-15',
  claimed = true,
  verified = true
where id = 'harborline-customs-solutions';

update public.listings set
  contact_email = 'info@harborviewdc.example.com',
  phone = '+61 270-970-7993',
  primary_contact_name = 'Ravi Okafor',
  services = array['Inventory Management','Pick & Pack'],
  year_founded = 1997,
  company_size = '51-200 employees',
  street_address = '5544 Terminal Way',
  city = 'Sydney',
  linkedin_url = 'https://www.linkedin.com/company/harborview-distribution-centers',
  certifications = array['ISO 9001','SmartWay Partner','ISO 14001'],
  license_number = '096015',
  license_type = 'NVOCC',
  license_renewal_date = '2027-03-15',
  claimed = true,
  verified = true
where id = 'harborview-distribution-centers';

update public.listings set
  contact_email = 'info@ironrailfreight.example.com',
  year_founded = 1999,
  company_size = '501-1000 employees',
  street_address = '8645 Gateway Ave',
  linkedin_url = 'https://www.linkedin.com/company/iron-rail-freight-corp',
  certifications = array['SmartWay Partner','ISO 14001','AAR Certified'],
  license_number = '096016',
  license_type = 'NVOCC',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'iron-rail-freight-corp';

update public.listings set
  contact_email = 'info@ironcladwarehousing.example.com',
  phone = '+1 385-456-1909',
  primary_contact_name = 'Viktor Petrov',
  services = array['Cross-Docking','Climate-Controlled Storage','Fulfillment Services','Pick & Pack'],
  year_founded = 1996,
  company_size = '51-200 employees',
  street_address = '5386 Distribution Dr',
  city = 'Phoenix',
  state = 'AZ',
  linkedin_url = 'https://www.linkedin.com/company/ironclad-warehousing-solutions',
  certifications = array['SmartWay Partner','ISO 14001','ISO 9001'],
  license_number = '096017',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2028-01-25',
  claimed = true,
  verified = true
where id = 'ironclad-warehousing-solutions';

update public.listings set
  contact_email = 'info@meridianbaylogistics.example.com',
  year_founded = 1999,
  company_size = '51-200 employees',
  street_address = '5671 Freight St',
  linkedin_url = 'https://www.linkedin.com/company/meridian-bay-logistics',
  certifications = array['SmartWay Partner','C-TPAT Certified','NVOCC Bonded'],
  claimed = true,
  verified = true
where id = 'meridian-bay-logistics';

update public.listings set
  contact_email = 'info@meridianraillogistics.example.com',
  phone = '+1 682-787-4604',
  primary_contact_name = 'Carlos Fernandez',
  services = array['Unit Train Service','Intermodal Rail'],
  year_founded = 1985,
  company_size = '1-10 employees',
  street_address = '8228 Trade Center Dr',
  linkedin_url = 'https://www.linkedin.com/company/meridian-rail-logistics',
  certifications = array['ISO 14001','SmartWay Partner','ISO 9001'],
  license_number = '096018',
  license_type = 'NVOCC',
  license_renewal_date = '2029-02-18',
  claimed = true,
  verified = true
where id = 'meridian-rail-logistics';

update public.listings set
  contact_email = 'info@meridianstorage.example.com',
  phone = '+44 276-769-5235',
  primary_contact_name = 'Nadia Ibrahim',
  services = array['Bonded Storage','Pick & Pack'],
  year_founded = 1998,
  company_size = '51-200 employees',
  street_address = '2563 Freight St',
  city = 'London',
  linkedin_url = 'https://www.linkedin.com/company/meridian-storage-fulfillment',
  certifications = array['ISO 14001','OSHA Compliant Facility','SmartWay Partner'],
  license_number = '096019',
  license_type = 'NVOCC',
  license_renewal_date = '2027-06-30',
  claimed = true,
  verified = true
where id = 'meridian-storage-fulfillment';

update public.listings set
  contact_email = 'info@nordicairfreight.example.com',
  year_founded = 1997,
  company_size = '51-200 employees',
  street_address = '3246 Commerce Blvd',
  linkedin_url = 'https://www.linkedin.com/company/nordic-air-freight-partners',
  certifications = array['ISO 14001','ISO 9001','IATA Accredited'],
  license_number = '096020',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2027-03-15',
  claimed = true,
  verified = true
where id = 'nordic-air-freight-partners';

update public.listings set
  contact_email = 'info@northbridgecontainer.example.com',
  license_number = '096021',
  license_type = 'Freight Forwarder',
  license_renewal_date = '2027-03-15',
  claimed = true,
  verified = true
where id = 'northbridge-container-lines';

update public.listings set
  website = 'https://northlinerailsolutions.example.com',
  contact_email = 'info@northlinerailsolutions.example.com',
  license_number = '096022',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2027-11-10',
  claimed = true,
  verified = true
where id = 'northline-rail-solutions';

update public.listings set
  contact_email = 'info@northwindair.example.com',
  phone = '+1 312-889-9124',
  primary_contact_name = 'Ravi Novak',
  services = array['Express Air Freight','Temperature-Controlled Cargo','Charter Freight','Same-Day Air Freight'],
  year_founded = 2011,
  company_size = '1-10 employees',
  street_address = '8692 Gateway Ave',
  city = 'Houston',
  state = 'TX',
  linkedin_url = 'https://www.linkedin.com/company/northwind-air-logistics',
  certifications = array['ISO 9001','C-TPAT Certified','ISO 14001'],
  license_number = '096023',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2027-03-15',
  claimed = true,
  verified = true
where id = 'northwind-air-logistics';

update public.listings set
  contact_email = 'info@outbacktransport.example.com',
  phone = '+61 401-257-2715',
  primary_contact_name = 'Aisha Adeyemi',
  services = array['Cross-Border Trucking','LTL Freight','Flatbed Transport'],
  year_founded = 1992,
  company_size = '1-10 employees',
  street_address = '580 Trade Center Dr',
  city = 'Sydney',
  linkedin_url = 'https://www.linkedin.com/company/outback-transport-co',
  certifications = array['SmartWay Partner','C-TPAT Certified','ISO 14001'],
  license_number = '096024',
  license_type = 'Freight Forwarder',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'outback-transport-co';

update public.listings set
  contact_email = 'info@pacificgatewayshipping.example.com',
  year_founded = 2014,
  company_size = '201-500 employees',
  street_address = '9107 Cargo Ln',
  linkedin_url = 'https://www.linkedin.com/company/pacific-gateway-shipping',
  certifications = array['ISO 9001','C-TPAT Certified','ISO 14001'],
  claimed = true,
  verified = true
where id = 'pacific-gateway-shipping';

update public.listings set
  contact_email = 'info@pacificrimlines.example.com',
  phone = '+86 909-378-1483',
  primary_contact_name = 'Felix Hassan',
  services = array['Port-to-Port Delivery','Reefer Container Shipping','Break Bulk Shipping','FCL Ocean Freight'],
  year_founded = 1989,
  company_size = '201-500 employees',
  street_address = '2864 Depot St',
  city = 'Shanghai',
  linkedin_url = 'https://www.linkedin.com/company/pacific-rim-container-lines',
  certifications = array['C-TPAT Certified','ISO 9001','NVOCC Bonded'],
  license_number = '096025',
  license_type = 'NVOCC',
  license_renewal_date = '2028-07-15',
  claimed = true,
  verified = true
where id = 'pacific-rim-container-lines';

update public.listings set
  contact_email = 'info@prairieroadtransport.example.com',
  license_number = '096026',
  license_type = 'NVOCC',
  license_renewal_date = '2028-01-25',
  claimed = true,
  verified = true
where id = 'prairie-road-transport';

update public.listings set
  contact_email = 'info@redwoodtrucking.example.com',
  year_founded = 1995,
  company_size = '11-50 employees',
  street_address = '8199 Trade Center Dr',
  linkedin_url = 'https://www.linkedin.com/company/redwood-trucking-alliance',
  certifications = array['SmartWay Partner','ISO 14001','FMCSA Registered'],
  license_number = '096027',
  license_type = 'NVOCC',
  license_renewal_date = '2027-09-20',
  claimed = true,
  verified = true
where id = 'redwood-trucking-alliance';

update public.listings set
  website = 'https://ridgelinefreightsystems.example.com',
  contact_email = 'info@ridgelinefreightsystems.example.com',
  phone = '+1 948-902-6762',
  primary_contact_name = 'Bruno Lindqvist',
  services = array['Expedited Freight','LTL Freight','Flatbed Transport'],
  year_founded = 2003,
  company_size = '501-1000 employees',
  street_address = '1443 Industrial Pkwy',
  linkedin_url = 'https://www.linkedin.com/company/ridgeline-freight-systems',
  certifications = array['C-TPAT Certified','ISO 9001','FMCSA Registered'],
  license_number = '096028',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2028-01-25',
  claimed = true,
  verified = true
where id = 'ridgeline-freight-systems';

update public.listings set
  contact_email = 'info@roadrunnerfreight.example.com',
  phone = '+1 732-463-3229',
  primary_contact_name = 'Fatima Khan',
  services = array['LTL Freight','Full Truckload','Expedited Freight','Refrigerated Trucking'],
  year_founded = 2009,
  company_size = '201-500 employees',
  street_address = '9204 Terminal Way',
  city = 'Portland',
  state = 'OR',
  linkedin_url = 'https://www.linkedin.com/company/roadrunner-freight-trucking',
  certifications = array['FMCSA Registered','C-TPAT Certified','SmartWay Partner'],
  license_number = '096029',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2027-09-20',
  claimed = true,
  verified = true
where id = 'roadrunner-freight-trucking';

update public.listings set
  contact_email = 'info@silkrouterail.example.com',
  phone = '+86 313-675-5819',
  primary_contact_name = 'Maria Girard',
  services = array['Unit Train Service','Bulk Commodity Transport'],
  year_founded = 2002,
  company_size = '1-10 employees',
  street_address = '2245 Commerce Blvd',
  city = 'Shanghai',
  linkedin_url = 'https://www.linkedin.com/company/silk-route-rail-logistics',
  certifications = array['ISO 14001','SmartWay Partner','C-TPAT Certified'],
  license_number = '096030',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2028-07-15',
  claimed = true,
  verified = true
where id = 'silk-route-rail-logistics';

update public.listings set
  contact_email = 'info@silverpointocean.example.com',
  claimed = true,
  verified = true
where id = 'silverpoint-ocean-logistics';

update public.listings set
  contact_email = 'info@skybridgecargo.example.com',
  phone = '+49 687-725-6539',
  primary_contact_name = 'Marco Carter',
  services = array['Charter Freight','Temperature-Controlled Cargo','Dangerous Goods Handling'],
  year_founded = 1991,
  company_size = '201-500 employees',
  street_address = '6763 Distribution Dr',
  city = 'Hamburg',
  linkedin_url = 'https://www.linkedin.com/company/skybridge-air-cargo',
  certifications = array['IATA Accredited','ISO 14001','SmartWay Partner'],
  license_number = '096031',
  license_type = 'Freight Forwarder',
  license_renewal_date = '2027-11-10',
  claimed = true,
  verified = true
where id = 'skybridge-air-cargo';

update public.listings set
  contact_email = 'info@skylineaircargo.example.com',
  year_founded = 2003,
  company_size = '501-1000 employees',
  street_address = '150 Port Rd',
  linkedin_url = 'https://www.linkedin.com/company/skyline-air-cargo-solutions',
  certifications = array['IATA Accredited','C-TPAT Certified','ISO 14001'],
  license_number = '096032',
  license_type = 'NVOCC',
  license_renewal_date = '2027-11-10',
  claimed = true,
  verified = true
where id = 'skyline-air-cargo-solutions';

update public.listings set
  contact_email = 'info@summitdistribution.example.com',
  year_founded = 2012,
  company_size = '501-1000 employees',
  street_address = '5253 Terminal Way',
  linkedin_url = 'https://www.linkedin.com/company/summit-distribution-services',
  certifications = array['SmartWay Partner','ISO 9001','C-TPAT Certified'],
  license_number = '096033',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2027-03-15',
  claimed = true,
  verified = true
where id = 'summit-distribution-services';

update public.listings set
  contact_email = 'info@transandesrail.example.com',
  phone = '+55 275-633-2918',
  primary_contact_name = 'Mei Andersson',
  services = array['Container Rail','Bulk Commodity Transport','Intermodal Rail','Rail Yard Transloading'],
  year_founded = 2020,
  company_size = '51-200 employees',
  street_address = '9554 Port Rd',
  city = 'Sao Paulo',
  linkedin_url = 'https://www.linkedin.com/company/transandes-rail-freight',
  certifications = array['ISO 14001','ISO 9001','SmartWay Partner'],
  license_number = '096034',
  license_type = 'NVOCC',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'transandes-rail-freight';

update public.listings set
  website = 'https://uniondepotstorage.example.com',
  contact_email = 'info@uniondepotstorage.example.com',
  license_number = '096035',
  license_type = 'NVOCC, Freight Forwarder',
  license_renewal_date = '2028-04-30',
  claimed = true,
  verified = true
where id = 'union-depot-storage';

update public.listings set
  contact_email = 'info@vantagefreightcarriers.example.com',
  year_founded = 2018,
  company_size = '51-200 employees',
  street_address = '9563 Freight St',
  linkedin_url = 'https://www.linkedin.com/company/vantage-freight-carriers',
  certifications = array['C-TPAT Certified','ISO 14001','SmartWay Partner'],
  license_number = '096036',
  license_type = 'NVOCC',
  license_renewal_date = '2028-10-05',
  claimed = true,
  verified = true
where id = 'vantage-freight-carriers';

-- Reviews for listings that didn't already have any

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('apex-cargo-movers', 'Ravi Moreau', 5, 'Best air cargo partner we''ve worked with — responsive and detail-oriented.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('atlantic-crossing-shipping', 'Theo Schmidt', 5, 'We''ve used them for over a year now and they consistently deliver on ocean freight. Highly recommend.'),
  ('atlantic-crossing-shipping', 'Isabella Holt', 4, 'Good experience overall — ocean freight handling is reliable, pricing is fair.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('blue-horizon-ocean-freight', 'Liam Adeyemi', 5, 'Best ocean freight partner we''ve worked with — responsive and detail-oriented.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('borderline-customs-solutions', 'Carlos Khan', 4, 'Consistently good service, communication could be a touch faster during peak season.'),
  ('borderline-customs-solutions', 'Felix Khan', 4, 'Reliable partner for our customs clearance needs, would use again.'),
  ('borderline-customs-solutions', 'Chloe Moreau', 4, 'Reliable partner for our customs clearance needs, would use again.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('clearway-customs-brokers', 'Viktor Lindqvist', 3, 'Service is adequate but communication during customs clearance delays could improve.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('coastal-line-freight-co', 'Nadia Girard', 5, 'Best ocean freight partner we''ve worked with — responsive and detail-oriented.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('continental-rail-cargo', 'Julia Fernandez', 4, 'Reliable partner for our rail freight needs, would use again.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('continental-warehousing-group', 'Amara Yusuf', 5, 'Professional team, competitive rates, and reliable warehousing handling every time.'),
  ('continental-warehousing-group', 'Amina Girard', 5, 'We''ve used them for over a year now and they consistently deliver on warehousing. Highly recommend.'),
  ('continental-warehousing-group', 'Lena Osei', 4, 'Consistently good service, communication could be a touch faster during peak season.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('eurohaul-trucking-group', 'Elena Marchetti', 4, 'Consistently good service, communication could be a touch faster during peak season.'),
  ('eurohaul-trucking-group', 'Sanaa Hassan', 5, 'Professional team, competitive rates, and reliable trucking handling every time.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('falcon-express-air-freight', 'Ingrid Novak', 5, 'Professional team, competitive rates, and reliable air cargo handling every time.'),
  ('falcon-express-air-freight', 'Omar Marchetti', 4, 'Reliable partner for our air cargo needs, would use again.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('global-trade-compliance-group', 'Sanaa Larsen', 4, 'Consistently good service, communication could be a touch faster during peak season.'),
  ('global-trade-compliance-group', 'Carlos Kovac', 4, 'Solid customs clearance provider, minor delays occasionally but overall dependable.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('globalgate-trade-compliance', 'Hiroshi Reyes', 5, 'Outstanding customs clearance service — always on time and the communication is excellent.'),
  ('globalgate-trade-compliance', 'Amina Fernandez', 4, 'Solid customs clearance provider, minor delays occasionally but overall dependable.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('harborline-customs-solutions', 'Amina Moreau', 5, 'Best customs clearance partner we''ve worked with — responsive and detail-oriented.'),
  ('harborline-customs-solutions', 'Sofia Kovac', 4, 'Solid customs clearance provider, minor delays occasionally but overall dependable.'),
  ('harborline-customs-solutions', 'Lucas Patel', 3, 'Gets the job done, though their tracking and updates feel a bit behind competitors.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('harborview-distribution-centers', 'Ingrid Tanaka', 5, 'Professional team, competitive rates, and reliable warehousing handling every time.'),
  ('harborview-distribution-centers', 'Camila Ferrari', 5, 'We''ve used them for over a year now and they consistently deliver on warehousing. Highly recommend.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('iron-rail-freight-corp', 'Mei Volkov', 3, 'Service is adequate but communication during rail freight delays could improve.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('ironclad-warehousing-solutions', 'Hiroshi Costa', 3, 'Service is adequate but communication during warehousing delays could improve.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('meridian-bay-logistics', 'Priya Volkov', 5, 'We''ve used them for over a year now and they consistently deliver on ocean freight. Highly recommend.'),
  ('meridian-bay-logistics', 'Hiroshi Moreau', 4, 'Good experience overall — ocean freight handling is reliable, pricing is fair.'),
  ('meridian-bay-logistics', 'Sven O''Brien', 5, 'We''ve used them for over a year now and they consistently deliver on ocean freight. Highly recommend.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('meridian-rail-logistics', 'Ahmed Fernandez', 3, 'Gets the job done, though their tracking and updates feel a bit behind competitors.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('meridian-storage-fulfillment', 'Mei Petrov', 4, 'Solid warehousing provider, minor delays occasionally but overall dependable.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('nordic-air-freight-partners', 'Layla Nguyen', 4, 'Good experience overall — air cargo handling is reliable, pricing is fair.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('northwind-air-logistics', 'Theo Zhang', 3, 'Gets the job done, though their tracking and updates feel a bit behind competitors.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('outback-transport-co', 'Marco Larsen', 5, 'We''ve used them for over a year now and they consistently deliver on trucking. Highly recommend.'),
  ('outback-transport-co', 'Mohammed Haddad', 5, 'Best trucking partner we''ve worked with — responsive and detail-oriented.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('pacific-gateway-shipping', 'Fatima Nielsen', 5, 'Outstanding ocean freight service — always on time and the communication is excellent.'),
  ('pacific-gateway-shipping', 'Theo Santos', 3, 'Gets the job done, though their tracking and updates feel a bit behind competitors.'),
  ('pacific-gateway-shipping', 'Omar Girard', 4, 'Good experience overall — ocean freight handling is reliable, pricing is fair.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('pacific-rim-container-lines', 'Nadia Silva', 4, 'Reliable partner for our ocean freight needs, would use again.'),
  ('pacific-rim-container-lines', 'David Reyes', 3, 'Service is adequate but communication during ocean freight delays could improve.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('redwood-trucking-alliance', 'Carlos Yusuf', 5, 'We''ve used them for over a year now and they consistently deliver on trucking. Highly recommend.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('ridgeline-freight-systems', 'Marco Berg', 5, 'Professional team, competitive rates, and reliable trucking handling every time.'),
  ('ridgeline-freight-systems', 'Omar Ferrari', 5, 'Best trucking partner we''ve worked with — responsive and detail-oriented.'),
  ('ridgeline-freight-systems', 'Aisha Schmidt', 5, 'We''ve used them for over a year now and they consistently deliver on trucking. Highly recommend.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('roadrunner-freight-trucking', 'Bruno Rossi', 3, 'Gets the job done, though their tracking and updates feel a bit behind competitors.'),
  ('roadrunner-freight-trucking', 'Chloe Lefevre', 5, 'Professional team, competitive rates, and reliable trucking handling every time.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('silk-route-rail-logistics', 'Elena Costa', 5, 'Best rail freight partner we''ve worked with — responsive and detail-oriented.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('skybridge-air-cargo', 'Anna Haddad', 5, 'We''ve used them for over a year now and they consistently deliver on air cargo. Highly recommend.'),
  ('skybridge-air-cargo', 'Noah Hassan', 5, 'Best air cargo partner we''ve worked with — responsive and detail-oriented.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('skyline-air-cargo-solutions', 'Chloe Kovac', 4, 'Consistently good service, communication could be a touch faster during peak season.'),
  ('skyline-air-cargo-solutions', 'Mei Tanaka', 5, 'We''ve used them for over a year now and they consistently deliver on air cargo. Highly recommend.'),
  ('skyline-air-cargo-solutions', 'Chloe Rossi', 3, 'Gets the job done, though their tracking and updates feel a bit behind competitors.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('summit-distribution-services', 'Raj Sorensen', 5, 'We''ve used them for over a year now and they consistently deliver on warehousing. Highly recommend.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('transandes-rail-freight', 'Amara Dubois', 4, 'Good experience overall — rail freight handling is reliable, pricing is fair.'),
  ('transandes-rail-freight', 'Liam Adeyemi', 5, 'We''ve used them for over a year now and they consistently deliver on rail freight. Highly recommend.'),
  ('transandes-rail-freight', 'Carlos Petrov', 4, 'Consistently good service, communication could be a touch faster during peak season.');

insert into public.reviews (listing_id, reviewer_name, rating, review_text) values
  ('vantage-freight-carriers', 'Theo Khan', 4, 'Reliable partner for our trucking needs, would use again.');
