import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "api", "app.db")

def main():
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # Create tables
    cur.executescript("""
    CREATE TABLE city (
      id TEXT PRIMARY KEY,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      name TEXT,
      summary TEXT,
      country TEXT
    );

    CREATE TABLE culture (
      id TEXT PRIMARY KEY,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      name TEXT NOT NULL,
      summary TEXT
    );

    CREATE TABLE site (
      id TEXT PRIMARY KEY,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      name TEXT,
      summary TEXT,
      culture_id TEXT,
      latitude REAL,
      longitude REAL,
      city_id TEXT
    );

    CREATE TABLE users (
      id TEXT PRIMARY KEY,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      first_name TEXT,
      last_name TEXT
    );

    CREATE TABLE contribution (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      description TEXT,
      site_id TEXT,
      photo_path TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Insert minimal mock data
    cur.executescript("""
    INSERT INTO city (id, name, summary, country) VALUES
      ('11111111-1111-1111-1111-111111111111', 'Durham', 'Historic university city', 'United Kingdom'),
      ('22222222-2222-2222-2222-222222222222', 'Edinburgh', 'Capital of Scotland', 'United Kingdom'),
      ('33333333-3333-3333-3333-333333333333', 'Kuala Lumpur', 'Capital of Malaysia', 'Malaysia'),
      ('44444444-4444-4444-4444-444444444444', 'New York', 'The City That Never Sleeps', 'United States');

    INSERT INTO culture (id, name, summary) VALUES
      ('a1111111-1111-1111-1111-111111111111', 'Medieval Architecture', 'Historic structures'),
      ('a3333333-3333-3333-3333-333333333333', 'Islamic Architecture', 'Historic mosques');

    INSERT INTO site (id, name, summary, culture_id, latitude, longitude, city_id) VALUES
      ('f1111111-1111-1111-1111-111111111111', 'Durham Cathedral', 'Magnificent Norman cathedral', 'a1111111-1111-1111-1111-111111111111', 54.7754, -1.5742, '11111111-1111-1111-1111-111111111111'),
      ('f3333333-3333-3333-3333-333333333333', 'Petronas Twin Towers', 'Iconic twin skyscrapers', 'a3333333-3333-3333-3333-333333333333', 3.1578, 101.7123, '33333333-3333-3333-3333-333333333333');

    INSERT INTO users (id, first_name, last_name) VALUES
      ('550e8400-e29b-41d4-a716-446655440001', 'Alice', 'Johnson'),
      ('550e8400-e29b-41d4-a716-446655440003', 'Catherine', 'Williams');

    INSERT INTO contribution (id, user_id, site_id, description, photo_path) VALUES
      ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'f1111111-1111-1111-1111-111111111111', 'Beautiful sunset view.', '/photos/test.jpg'),
      ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'f3333333-3333-3333-3333-333333333333', 'Amazing heights.', '/photos/test2.jpg');
    """)

    conn.commit()
    conn.close()
    print("Successfully built manual SQLite seed database!")

if __name__ == '__main__':
    main()
