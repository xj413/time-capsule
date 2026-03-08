# Database Structure Documentation

**Project Reference:** `pfibzzijgjrvepcahgob`  
**Database Type:** PostgreSQL (Supabase)

---

## Overview

The database contains 9 tables organized into core entities and junction tables for tracking user interests in cities, sites, and cultures. The schema supports a platform for managing cultural heritage sites with geospatial queries, user contributions, and user interests across different locations and cultural categories.

---

## Tables

### 1. **USER** (RLS Enabled)
Application user profile information.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | uuid | Primary Key | gen_random_uuid() |
| created_at | timestamp with time zone | | now() |
| first_name | text | Nullable | |
| last_name | text | Nullable | |

**Primary Key:** `id`  
**Row Count:** 0

---

### 2. **CITY** (RLS Enabled)
Geographic locations with summary information. Primary city/location table.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | bigint | Identity (BY DEFAULT) | |
| created_at | timestamp with time zone | | now() |
| updated_at | timestamp with time zone | | now() |
| summary | character varying(1000) | Nullable | |

**Primary Key:** `id`  
**Row Count:** 0

---

### 3. **CULTURE** (RLS Enabled)
Cultural categories and cultural heritage classifications.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | bigint | Identity (BY DEFAULT) | |
| created_at | timestamp with time zone | | now() |
| updated_at | timestamp with time zone | | now() |
| name | character varying(255) | NOT NULL | |
| summary | character varying(1000) | Nullable | |

**Primary Key:** `id`  
**Row Count:** 0

---

### 4. **SITE** (RLS Enabled)
Cultural heritage sites with detailed information. Primary site/landmark table with geospatial support.

| Column | Type | Options | Default |
|--------|------|---------|----------|
| id | bigint | Identity (BY DEFAULT) | |
| created_at | timestamp with time zone | | now() |
| updated_at | timestamp with time zone | | now() |
| name | character varying(255) | Nullable | |
| summary | character varying(1000) | Nullable | |
| culture_id | bigint | Foreign Key, Nullable | |
| location | geometry(Point, 4326) | Nullable | |
| city_id | bigint | Foreign Key, NOT NULL | |

**Primary Key:** `id`  
**Foreign Keys:**
- `city_id` → `CITY.id` (ON DELETE CASCADE)
- `culture_id` → `CULTURE.id`

**Row Count:** 0

---

### 5. **CONTRIBUTION** (RLS Enabled)
User contributions including descriptions and photo paths.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | uuid | Primary Key | gen_random_uuid() |
| user_id | uuid | Foreign Key | |
| description | text | Nullable | |
| photo_path | text | | |
| created_at | timestamp with time zone | Nullable | now() |

**Primary Key:** `id`  
**Foreign Keys:**
- `user_id` → `auth.users.id`
- Referenced by `USER_CONTRIBUTION_INTEREST.contribution_id`

**Row Count:** 0

---

### 6. **USER_CITY_INTEREST** (RLS Enabled)
Junction table tracking user interests in cities.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | uuid | Primary Key | gen_random_uuid() |
| user_id | uuid | Foreign Key | |
| city_id | bigint | Foreign Key | |
| created_at | timestamp with time zone | Nullable | now() |

**Primary Key:** `id`  
**Foreign Keys:**
- `user_id` → `auth.users.id`
- `city_id` → `CITY.id`

**Row Count:** 0

---

### 7. **USER_SITE_INTEREST** (RLS Enabled)
Junction table tracking user interests in sites.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | uuid | Primary Key | gen_random_uuid() |
| user_id | uuid | Foreign Key | |
| site_id | bigint | Foreign Key | |
| created_at | timestamp with time zone | Nullable | now() |

**Primary Key:** `id`  
**Foreign Keys:**
- `user_id` → `auth.users.id`
- `site_id` → `SITE.id`

**Row Count:** 0

---

### 8. **USER_CONTRIBUTION_INTEREST** (RLS Enabled)
Junction table linking user interests to contributions.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | uuid | Primary Key | gen_random_uuid() |
| user_id | uuid | Foreign Key | |
| contribution_id | uuid | Foreign Key | |
| created_at | timestamp with time zone | Nullable | now() |

**Primary Key:** `id`  
**Foreign Keys:**
- `user_id` → `auth.users.id`
- `contribution_id` → `CONTRIBUTION.id`

**Row Count:** 0

---

### 9. **USER_CULTURE_INTEREST** (RLS Enabled)
Junction table tracking user interests in cultures.

| Column | Type | Options | Default |
|--------|------|---------|---------|
| id | uuid | Primary Key | gen_random_uuid() |
| user_id | uuid | Foreign Key | |
| culture_id | bigint | Foreign Key | |
| created_at | timestamp with time zone | Nullable | now() |

**Primary Key:** `id`  
**Foreign Keys:**
- `user_id` → `auth.users.id`
- `culture_id` → `CULTURE.id`

**Row Count:** 0

---

## Entity Relationship Summary

### User Management
- **USER** / **auth.users** (external): Core user profiles
- **CONTRIBUTION**: User-generated content (descriptions, photos)

### Locations
- **CITY**: Geographic locations (legacy table)
- **SITE**: Cultural heritage sites (legacy table)
- **CULTURE**: Cultural categories and heritage classifications

### User Interests (Many-to-Many)
- **USER_CITY_INTEREST**: Tracks which users are interested in which cities (references CITY via bigint FK)
- **USER_SITE_INTEREST**: Tracks which users are interested in which sites (references SITE via bigint FK)
- **USER_CULTURE_INTEREST**: Tracks which users are interested in which cultures (references CULTURE via bigint FK)
- **USER_CONTRIBUTION_INTEREST**: Tracks user interests associated with contributions

### Security
- **RLS Enabled Tables:** USER, SITE, CULTURE, CONTRIBUTION, USER_CITY_INTEREST, USER_SITE_INTEREST, USER_CULTURE_INTEREST, USER_CONTRIBUTION_INTEREST
- **RLS Disabled Tables:** CITY

---

## Key Design Notes

1. **Primary Entity Tables:** CITY, SITE, and CULTURE are the main tables for locations and cultural heritage classifications
2. **ID Strategy:** CITY, SITE, and CULTURE use `bigint` with identity generation; user tables use UUID
3. **Coordinate Storage:** SITE uses PostGIS `geometry(Point, 4326)` type for geospatial queries (distance calculations, proximity searches); supports functions like `ST_Distance()`, `ST_Contains()`, etc.
4. **Site-to-City Relationship:** Every SITE must belong to a CITY via `city_id` foreign key (NOT NULL); cascades on deletion
5. **Site-to-Culture Relationship:** SITE optionally references CULTURE via `culture_id` foreign key for cultural classification; allows NULL for sites without specific cultural categorization
6. **Timestamp Tracking:** All tables have `created_at` and `updated_at` timestamps with UTC timezone for audit trails
7. **VARCHAR Length Constraints:** Defined explicit max lengths for text fields: SITE/CITY/CULTURE names (255 chars), summaries (1000 chars)
8. **Null Safety:** Most data fields are nullable except site_id foreign keys in user interests and city_id in SITE
9. **Security:** User-related tables and CULTURE have Row Level Security (RLS) enabled; location tables (CITY, SITE) are public
