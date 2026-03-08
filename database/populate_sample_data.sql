-- Population script for Duwit database
-- Inserts sample data: 4 cities, 5 cultures, 12 sites, 5 users, contributions, and interests

-- ============================================================================
-- INSERT CITIES
-- ============================================================================
INSERT INTO public.city (id, created_at, updated_at, name, summary, country) VALUES
  ('11111111-1111-1111-1111-111111111111'::uuid, now(), now(), 'Durham', 'Historic university city in North East England, known for its Norman cathedral and medieval architecture', 'United Kingdom'),
  ('22222222-2222-2222-2222-222222222222'::uuid, now(), now(), 'Edinburgh', 'Capital of Scotland, famous for its castles, festivals, and vibrant cultural scene', 'United Kingdom'),
  ('33333333-3333-3333-3333-333333333333'::uuid, now(), now(), 'Kuala Lumpur', 'Capital of Malaysia, a modern metropolis blending colonial architecture with contemporary culture', 'Malaysia'),
  ('44444444-4444-4444-4444-444444444444'::uuid, now(), now(), 'New York', 'The City That Never Sleeps, iconic American metropolis with world-class landmarks and museums', 'United States');

-- ============================================================================
-- INSERT CULTURAL CATEGORIES
-- ============================================================================
INSERT INTO public.culture (id, created_at, updated_at, name, summary) VALUES
  ('a1111111-1111-1111-1111-111111111111'::uuid, now(), now(), 'Medieval Architecture', 'Historic structures from the Middle Ages including cathedrals, castles, and fortifications'),
  ('a2222222-2222-2222-2222-222222222222'::uuid, now(), now(), 'Colonial Heritage', 'Buildings and structures from the colonial era reflecting British and European influence'),
  ('a3333333-3333-3333-3333-333333333333'::uuid, now(), now(), 'Islamic Architecture', 'Historic mosques, palaces, and structures showcasing Islamic architectural traditions'),
  ('a4444444-4444-4444-4444-444444444444'::uuid, now(), now(), 'Modern Art & Design', 'Contemporary art installations and modern architecture representing current cultural expression'),
  ('a5555555-5555-5555-5555-555555555555'::uuid, now(), now(), 'Industrial Heritage', 'Historic industrial sites, factories, and infrastructure representing industrial revolution');

-- ============================================================================
-- INSERT CULTURAL SITES
-- ============================================================================
-- Durham Sites
INSERT INTO public.site (id, created_at, updated_at, name, summary, culture_id, location, city_id) VALUES
  ('f1111111-1111-1111-1111-111111111111'::uuid, now(), now(), 'Durham Cathedral', 'Magnificent Norman cathedral built in 1093, a masterpiece of Romanesque architecture and UNESCO World Heritage Site', 'a1111111-1111-1111-1111-111111111111'::uuid,
   ST_GeomFromText('POINT(-1.5742 54.7754)', 4326), '11111111-1111-1111-1111-111111111111'::uuid),
  ('f1111111-1111-1111-1111-111111111112'::uuid, now(), now(), 'Durham Castle', 'Impressive medieval castle with iconic keep overlooking the city, now part of Durham University', 'a1111111-1111-1111-1111-111111111111'::uuid,
   ST_GeomFromText('POINT(-1.5678 54.7725)', 4326), '11111111-1111-1111-1111-111111111111'::uuid);

-- Edinburgh Sites
INSERT INTO public.site (id, created_at, updated_at, name, summary, culture_id, location, city_id) VALUES
  ('f2222222-2222-2222-2222-222222222222'::uuid, now(), now(), 'Edinburgh Castle', 'Ancient fortress dominating the city skyline, one of Scotland''s most iconic landmarks with medieval architecture', 'a1111111-1111-1111-1111-111111111111'::uuid,
   ST_GeomFromText('POINT(-3.2011 55.9486)', 4326), '22222222-2222-2222-2222-222222222222'::uuid),
  ('f2222222-2222-2222-2222-222222222223'::uuid, now(), now(), 'Royal Mile', 'Historic street in the Old Town featuring medieval buildings, shops, and cultural venues', 'a2222222-2222-2222-2222-222222222222'::uuid,
   ST_GeomFromText('POINT(-3.1882 55.9503)', 4326), '22222222-2222-2222-2222-222222222222'::uuid),
  ('f2222222-2222-2222-2222-222222222224'::uuid, now(), now(), 'Palace of Holyroodhouse', 'The official Scottish residence of the monarch, showcasing royal heritage and architecture', 'a2222222-2222-2222-2222-222222222222'::uuid,
   ST_GeomFromText('POINT(-3.1734 55.9547)', 4326), '22222222-2222-2222-2222-222222222222'::uuid);

-- Kuala Lumpur Sites
INSERT INTO public.site (id, created_at, updated_at, name, summary, culture_id, location, city_id) VALUES
  ('f3333333-3333-3333-3333-333333333333'::uuid, now(), now(), 'Petronas Twin Towers', 'Iconic twin skyscrapers and symbol of Malaysia''s modernity with distinctive Islamic-influenced design', 'a3333333-3333-3333-3333-333333333333'::uuid,
   ST_GeomFromText('POINT(101.7123 3.1578)', 4326), '33333333-3333-3333-3333-333333333333'::uuid),
  ('f3333333-3333-3333-3333-333333333334'::uuid, now(), now(), 'Masjid Jamek', 'Historic mosque built in 1909 featuring striking Islamic architecture at the confluence of two rivers', 'a3333333-3333-3333-3333-333333333333'::uuid,
   ST_GeomFromText('POINT(101.6977 3.1485)', 4326), '33333333-3333-3333-3333-333333333333'::uuid),
  ('f3333333-3333-3333-3333-333333333335'::uuid, now(), now(), 'Batu Caves', 'Ancient limestone cave temple complex housing a sacred Hindu shrine with 272 steps to the entrance', 'a3333333-3333-3333-3333-333333333333'::uuid,
   ST_GeomFromText('POINT(101.6835 3.2426)', 4326), '33333333-3333-3333-3333-333333333333'::uuid);

-- New York Sites
INSERT INTO public.site (id, created_at, updated_at, name, summary, culture_id, location, city_id) VALUES
  ('f4444444-4444-4444-4444-444444444444'::uuid, now(), now(), 'Statue of Liberty', 'Iconic copper colossus and symbol of freedom overlooking New York Harbor, designed by French sculptor', 'a4444444-4444-4444-4444-444444444444'::uuid,
   ST_GeomFromText('POINT(-74.0445 40.6892)', 4326), '44444444-4444-4444-4444-444444444444'::uuid),
  ('f4444444-4444-4444-4444-444444444445'::uuid, now(), now(), 'Metropolitan Museum of Art', 'World-renowned art museum housing over 2 million artworks spanning from ancient to contemporary', 'a4444444-4444-4444-4444-444444444444'::uuid,
   ST_GeomFromText('POINT(-73.9626 40.7813)', 4326), '44444444-4444-4444-4444-444444444444'::uuid),
  ('f4444444-4444-4444-4444-444444444446'::uuid, now(), now(), 'Times Square', 'Bustling urban area and commercial hub featuring towering billboards, theaters, and modern culture', 'a4444444-4444-4444-4444-444444444444'::uuid,
   ST_GeomFromText('POINT(-73.9857 40.7580)', 4326), '44444444-4444-4444-4444-444444444444'::uuid),
  ('f4444444-4444-4444-4444-444444444447'::uuid, now(), now(), 'Brooklyn Bridge', 'Iconic suspension bridge completed in 1883 connecting Manhattan and Brooklyn with neogothic architecture', 'a5555555-5555-5555-5555-555555555555'::uuid,
   ST_GeomFromText('POINT(-73.9976 40.7061)', 4326), '44444444-4444-4444-4444-444444444444'::uuid);

-- ============================================================================
-- INSERT USERS
-- ============================================================================
INSERT INTO public.users (id, created_at, first_name, last_name) VALUES
  ('550e8400-e29b-41d4-a716-446655440001'::uuid, now(), 'Alice', 'Johnson'),
  ('550e8400-e29b-41d4-a716-446655440002'::uuid, now(), 'Bob', 'Smith'),
  ('550e8400-e29b-41d4-a716-446655440003'::uuid, now(), 'Catherine', 'Williams'),
  ('550e8400-e29b-41d4-a716-446655440004'::uuid, now(), 'David', 'Brown'),
  ('550e8400-e29b-41d4-a716-446655440005'::uuid, now(), 'Emma', 'Davis');

-- ============================================================================
-- INSERT CONTRIBUTIONS
-- ============================================================================
-- Alice's contributions (to Durham sites)
INSERT INTO public.contribution (id, user_id, site_id, description, photo_path, created_at) VALUES
  ('650e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'f1111111-1111-1111-1111-111111111111'::uuid, 
   'Beautiful sunset view from the castle terrace. The evening light perfectly illuminates the Norman architecture.', 
   '/photos/durham_castle_sunset.jpg', now()),
  ('650e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'f1111111-1111-1111-1111-111111111112'::uuid,
   'Detail of the intricate stonework on the cathedral facade. Remarkable medieval craftsmanship.',
   '/photos/cathedral_stonework.jpg', now());

-- Bob's contributions (to Edinburgh sites)
INSERT INTO public.contribution (id, user_id, site_id, description, photo_path, created_at) VALUES
  ('650e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'f2222222-2222-2222-2222-222222222222'::uuid,
   'Street performers on the Royal Mile during festival season. Vibrant cultural atmosphere.',
   '/photos/royal_mile_performers.jpg', now()),
  ('650e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'f2222222-2222-2222-2222-222222222223'::uuid,
   'Edinburgh Castle at night with atmospheric lighting. One of Scotland''s most magnificent views.',
   '/photos/edinburgh_castle_night.jpg', now());

-- Catherine's contributions (to Kuala Lumpur sites)
INSERT INTO public.contribution (id, user_id, site_id, description, photo_path, created_at) VALUES
  ('650e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 'f3333333-3333-3333-3333-333333333333'::uuid,
   'The Petronas Twin Towers reflecting the modern development of Kuala Lumpur. Architectural marvel.',
   '/photos/petronas_towers.jpg', now()),
  ('650e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 'f3333333-3333-3333-3333-333333333334'::uuid,
   'Intricate Islamic tilework at Masjid Jamek. Exceptional geometric patterns and craftsmanship.',
   '/photos/masjid_jamek_detail.jpg', now());

-- David's contributions (to New York sites)
INSERT INTO public.contribution (id, user_id, site_id, description, photo_path, created_at) VALUES
  ('650e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 'f4444444-4444-4444-4444-444444444444'::uuid,
   'Statue of Liberty at sunrise with ferry boats in background. Iconic American landmark.',
   '/photos/statue_liberty_sunrise.jpg', now()),
  ('650e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 'f4444444-4444-4444-4444-444444444445'::uuid,
   'The Metropolitan Museum of Art''s classical facade. World-class repository of human artistic achievement.',
   '/photos/met_museum_facade.jpg', now());

-- Emma's contributions (to New York sites)
INSERT INTO public.contribution (id, user_id, site_id, description, photo_path, created_at) VALUES
  ('650e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'f4444444-4444-4444-4444-444444444447'::uuid,
   'Brooklyn Bridge cables creating geometric patterns against sunset sky. Engineering and art combined.',
   '/photos/brooklyn_bridge_sunset.jpg', now()),
  ('650e8400-e29b-41d4-a716-446655440010'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'f4444444-4444-4444-4444-444444444446'::uuid,
   'Times Square neon lights reflecting on wet pavement after rain. Urban energy and vibrancy.',
   '/photos/times_square_rain.jpg', now());

-- ============================================================================
-- INSERT USER CITY INTERESTS
-- ============================================================================
-- Alice interested in Durham and Edinburgh
INSERT INTO public.user_city_interest (id, user_id, city_id, created_at) VALUES
  ('750e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, '11111111-1111-1111-1111-111111111111'::uuid, now()),
  ('750e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, now());

-- Bob interested in Edinburgh and Kuala Lumpur
INSERT INTO public.user_city_interest (id, user_id, city_id, created_at) VALUES
  ('750e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, now()),
  ('750e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, '33333333-3333-3333-3333-333333333333'::uuid, now());

-- Catherine interested in Kuala Lumpur and New York
INSERT INTO public.user_city_interest (id, user_id, city_id, created_at) VALUES
  ('750e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, '33333333-3333-3333-3333-333333333333'::uuid, now()),
  ('750e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, '44444444-4444-4444-4444-444444444444'::uuid, now());

-- David interested in New York and Durham
INSERT INTO public.user_city_interest (id, user_id, city_id, created_at) VALUES
  ('750e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, '44444444-4444-4444-4444-444444444444'::uuid, now()),
  ('750e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, '11111111-1111-1111-1111-111111111111'::uuid, now());

-- Emma interested in all cities
INSERT INTO public.user_city_interest (id, user_id, city_id, created_at) VALUES
  ('750e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '11111111-1111-1111-1111-111111111111'::uuid, now()),
  ('750e8400-e29b-41d4-a716-446655440010'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, now()),
  ('750e8400-e29b-41d4-a716-446655440011'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '33333333-3333-3333-3333-333333333333'::uuid, now()),
  ('750e8400-e29b-41d4-a716-446655440012'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '44444444-4444-4444-4444-444444444444'::uuid, now());

-- ============================================================================
-- INSERT USER SITE INTERESTS
-- ============================================================================
-- Alice interested in Durham Cathedral and Edinburgh Castle
INSERT INTO public.user_site_interest (id, user_id, site_id, created_at) VALUES
  ('850e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'f1111111-1111-1111-1111-111111111111'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'f2222222-2222-2222-2222-222222222222'::uuid, now());

-- Bob interested in Royal Mile, Palace of Holyroodhouse, and Petronas Towers
INSERT INTO public.user_site_interest (id, user_id, site_id, created_at) VALUES
  ('850e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'f2222222-2222-2222-2222-222222222223'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'f2222222-2222-2222-2222-222222222224'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'f3333333-3333-3333-3333-333333333333'::uuid, now());

-- Catherine interested in Petronas Towers, Masjid Jamek, and Batu Caves
INSERT INTO public.user_site_interest (id, user_id, site_id, created_at) VALUES
  ('850e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 'f3333333-3333-3333-3333-333333333333'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 'f3333333-3333-3333-3333-333333333334'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 'f3333333-3333-3333-3333-333333333335'::uuid, now());

-- David interested in Statue of Liberty and Metropolitan Museum of Art
INSERT INTO public.user_site_interest (id, user_id, site_id, created_at) VALUES
  ('850e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 'f4444444-4444-4444-4444-444444444444'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440010'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 'f4444444-4444-4444-4444-444444444445'::uuid, now());

-- Emma interested in all major sites
INSERT INTO public.user_site_interest (id, user_id, site_id, created_at) VALUES
  ('850e8400-e29b-41d4-a716-446655440011'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'f1111111-1111-1111-1111-111111111111'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440012'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'f2222222-2222-2222-2222-222222222222'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440013'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'f3333333-3333-3333-3333-333333333333'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440014'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'f4444444-4444-4444-4444-444444444444'::uuid, now()),
  ('850e8400-e29b-41d4-a716-446655440015'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'f4444444-4444-4444-4444-444444444446'::uuid, now());

-- ============================================================================
-- INSERT USER CULTURE INTERESTS
-- ============================================================================
-- Alice interested in Medieval Architecture and Colonial Heritage
INSERT INTO public.user_culture_interest (id, user_id, culture_id, created_at) VALUES
  ('950e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'a1111111-1111-1111-1111-111111111111'::uuid, now()),
  ('950e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'a2222222-2222-2222-2222-222222222222'::uuid, now());

-- Bob interested in Colonial Heritage and Modern Art
INSERT INTO public.user_culture_interest (id, user_id, culture_id, created_at) VALUES
  ('950e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'a2222222-2222-2222-2222-222222222222'::uuid, now()),
  ('950e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 'a4444444-4444-4444-4444-444444444444'::uuid, now());

-- Catherine interested in Islamic Architecture
INSERT INTO public.user_culture_interest (id, user_id, culture_id, created_at) VALUES
  ('950e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 'a3333333-3333-3333-3333-333333333333'::uuid, now());

-- David interested in Modern Art and Industrial Heritage
INSERT INTO public.user_culture_interest (id, user_id, culture_id, created_at) VALUES
  ('950e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 'a4444444-4444-4444-4444-444444444444'::uuid, now()),
  ('950e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 'a5555555-5555-5555-5555-555555555555'::uuid, now());

-- Emma interested in all cultures
INSERT INTO public.user_culture_interest (id, user_id, culture_id, created_at) VALUES
  ('950e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'a1111111-1111-1111-1111-111111111111'::uuid, now()),
  ('950e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'a2222222-2222-2222-2222-222222222222'::uuid, now()),
  ('950e8400-e29b-41d4-a716-446655440010'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'a3333333-3333-3333-3333-333333333333'::uuid, now()),
  ('950e8400-e29b-41d4-a716-446655440011'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'a4444444-4444-4444-4444-444444444444'::uuid, now()),
  ('950e8400-e29b-41d4-a716-446655440012'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'a5555555-5555-5555-5555-555555555555'::uuid, now());

-- ============================================================================
-- INSERT USER CONTRIBUTION INTERESTS
-- ============================================================================
-- Alice interested in her own and Bob's contributions
INSERT INTO public.user_contribution_interest (id, user_id, contribution_id, created_at) VALUES
  ('a50e8400-e29b-41d4-a716-446655440001'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, '650e8400-e29b-41d4-a716-446655440001'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, '650e8400-e29b-41d4-a716-446655440003'::uuid, now());

-- Bob interested in his own and Catherine's contributions
INSERT INTO public.user_contribution_interest (id, user_id, contribution_id, created_at) VALUES
  ('a50e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, '650e8400-e29b-41d4-a716-446655440003'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, '650e8400-e29b-41d4-a716-446655440005'::uuid, now());

-- Catherine interested in her own and David's contributions
INSERT INTO public.user_contribution_interest (id, user_id, contribution_id, created_at) VALUES
  ('a50e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, '650e8400-e29b-41d4-a716-446655440005'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, '650e8400-e29b-41d4-a716-446655440007'::uuid, now());

-- David interested in his own and Emma's contributions
INSERT INTO public.user_contribution_interest (id, user_id, contribution_id, created_at) VALUES
  ('a50e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, '650e8400-e29b-41d4-a716-446655440007'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, '650e8400-e29b-41d4-a716-446655440009'::uuid, now());

-- Emma interested in all contributions
INSERT INTO public.user_contribution_interest (id, user_id, contribution_id, created_at) VALUES
  ('a50e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '650e8400-e29b-41d4-a716-446655440001'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440010'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '650e8400-e29b-41d4-a716-446655440003'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440011'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '650e8400-e29b-41d4-a716-446655440005'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440012'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '650e8400-e29b-41d4-a716-446655440007'::uuid, now()),
  ('a50e8400-e29b-41d4-a716-446655440013'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, '650e8400-e29b-41d4-a716-446655440009'::uuid, now());
