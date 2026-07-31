-- The previous migration left `state` null for non-US listings, since a US-
-- style state code doesn't map cleanly everywhere. The "no nulls anywhere"
-- goal for this dev-visibility pass applies regardless, so fill it in with
-- each company's real administrative region/province.
update public.listings set state = 'Maharashtra' where id = 'apex-cargo-movers';
update public.listings set state = 'North Holland' where id = 'atlantic-crossing-shipping';
update public.listings set state = 'Central Region' where id = 'blue-horizon-ocean-freight';
update public.listings set state = 'CDMX' where id = 'borderline-customs-solutions';
update public.listings set state = 'BC' where id = 'clearway-customs-brokers';
update public.listings set state = 'Ho Chi Minh' where id = 'coastal-line-freight-co';
update public.listings set state = 'Hamburg' where id = 'continental-rail-cargo';
update public.listings set state = 'Mazovia' where id = 'eurohaul-trucking-group';
update public.listings set state = 'Abu Dhabi' where id = 'falcon-express-air-freight';
update public.listings set state = 'Dubai' where id = 'falcon-ridge-air-freight';
update public.listings set state = 'Central Region' where id = 'globalgate-trade-compliance';
update public.listings set state = 'South Holland' where id = 'northbridge-container-lines';
update public.listings set state = 'ON' where id = 'harborline-customs-solutions';
update public.listings set state = 'NSW' where id = 'harborview-distribution-centers';
update public.listings set state = 'Greater London' where id = 'meridian-storage-fulfillment';
update public.listings set state = 'Stockholm County' where id = 'nordic-air-freight-partners';
update public.listings set state = 'MB' where id = 'northline-rail-solutions';
update public.listings set state = 'NSW' where id = 'outback-transport-co';
update public.listings set state = 'Central Region' where id = 'pacific-gateway-shipping';
update public.listings set state = 'Shanghai' where id = 'pacific-rim-container-lines';
update public.listings set state = 'Shanghai' where id = 'silk-route-rail-logistics';
update public.listings set state = 'Guangdong' where id = 'silverpoint-ocean-logistics';
update public.listings set state = 'Hamburg' where id = 'skybridge-air-cargo';
update public.listings set state = 'Hesse' where id = 'skyline-air-cargo-solutions';
update public.listings set state = 'West Midlands' where id = 'summit-distribution-services';
update public.listings set state = 'SP' where id = 'transandes-rail-freight';
update public.listings set state = 'Nuevo Leon' where id = 'vantage-freight-carriers';
