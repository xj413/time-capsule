-- ====================================================================
-- Duwit schema + sample data creation script (creates UUID PKs)
-- ====================================================================

-- 1) Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS postgis;     -- for ST_GeomFromText (if not available remove geometry usage)

-- 2) Drop existing objects we will recreate (DESCTRUCTIVE)
DROP VIEW IF EXISTS public.v_user_interests CASCADE;

DROP TABLE IF EXISTS public.user_contribution_interest CASCADE;
DROP TABLE IF EXISTS public.user_culture_interest CASCADE;
DROP TABLE IF EXISTS public.user_site_interest CASCADE;
DROP TABLE IF EXISTS public.user_city_interest CASCADE;

DROP TABLE IF EXISTS public.contribution CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.culture CASCADE;
DROP TABLE IF EXISTS public.site CASCADE;
DROP TABLE IF EXISTS public.city CASCADE;

-- 3) Create core tables

-- city
CREATE TABLE public.city (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text,
  summary text,
  country text
);

-- site
CREATE TABLE public.site (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text,
  summary text,
  culture_id uuid,
  location geometry(Point,4326),
  city_id uuid,
  CONSTRAINT fk_site_city FOREIGN KEY (city_id) REFERENCES public.city(id) ON DELETE SET NULL
);

-- CULTURE
CREATE TABLE public.culture (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  summary text
);

-- users table
CREATE TABLE public.users (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text,
  last_name text
);

-- contribution
CREATE TABLE public.contribution (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  description text,
  site_id uuid REFERENCES public.site(id) ON DELETE CASCADE,
  photo_path text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Interest join tables (all using uuid PKs)
CREATE TABLE public.user_city_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  city_id uuid REFERENCES public.city(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.user_site_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  site_id uuid REFERENCES public.site(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.user_culture_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  culture_id uuid REFERENCES public.culture(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.user_contribution_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  contribution_id uuid REFERENCES public.contribution(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
