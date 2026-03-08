from flask import Flask, request, jsonify
from db import get_db
from utils.errors import APIError, ValidationError, NotFoundError, DatabaseError, error_response

app = Flask(__name__)

@app.errorhandler(APIError)
def handle_api_error(error):
    return error_response(error)


def row_to_dict(cursor, row):
    """Convert a database row to a dictionary using cursor description."""
    if row is None:
        return None
    columns = [desc[0] for desc in cursor.description]
    return dict(zip(columns, row))


@app.route("/api/users", methods=["GET"])
def get_users():
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, first_name, last_name FROM users")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        users = []
        for r in rows:
            users.append({
                "id": str(r[0]),
                "first_name": r[1],
                "last_name": r[2]
            })
        return jsonify(users)
    except Exception as e:
        conn.close()
        raise DatabaseError(str(e))


@app.route("/api/users/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, first_name, last_name FROM users WHERE id = %s", (user_id,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        
        if not row:
            raise NotFoundError(f"User with ID '{user_id}' not found")
        
        user = {
            "id": str(row[0]),
            "first_name": row[1],
            "last_name": row[2]
        }
        return jsonify(user)
    except NotFoundError:
        conn.close()
        raise
    except Exception as e:
        conn.close()
        raise DatabaseError(str(e))
def get_cities():
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, name, summary, country FROM city ORDER BY name")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        cities = []
        for r in rows:
            cities.append({
                "_id": str(r[0]),
                "name": r[1],
                "summary": r[2],
                "country": r[3]
            })
        return jsonify(cities)
    except Exception as e:
        conn.close()
        raise DatabaseError(str(e))


@app.route("/api/cultures", methods=["GET"])
def get_cultures():
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, name, summary FROM culture ORDER BY name")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        cultures = []
        for r in rows:
            cultures.append({
                "_id": str(r[0]),
                "name": r[1],
                "summary": r[2]
            })
        return jsonify(cultures)
    except Exception as e:
        conn.close()
        raise DatabaseError(str(e))


@app.route("/api/sites/city/<city_name>", methods=["GET"])
def get_sites_by_city(city_name):
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        query = """
            SELECT s.id, s.name, s.summary, c.name as culture_name, cy.name as city_name,
                   ST_X(s.location) as longitude, ST_Y(s.location) as latitude
            FROM site s
            JOIN culture c ON s.culture_id = c.id
            JOIN city cy ON s.city_id = cy.id
            WHERE LOWER(cy.name) = LOWER(%s)
            ORDER BY s.name
        """
        cur.execute(query, (city_name,))
        rows = cur.fetchall()
        
        if not rows:
            raise NotFoundError(f"City '{city_name}' not found")
        
        cur.close()
        conn.close()
        
        sites = []
        for r in rows:
            sites.append({
                "_id": str(r[0]),
                "name": r[1],
                "summary": r[2],
                "culture_name": r[3],
                "city_name": r[4],
                "latitude": float(r[5]) if r[5] else None,
                "longitude": float(r[6]) if r[6] else None
            })
        return jsonify(sites)
    except NotFoundError:
        conn.close()
        raise
    except Exception as e:
        conn.close()
        raise DatabaseError(str(e))


@app.route("/api/contributions/<site_id>", methods=["GET"])
def get_contributions_by_site(site_id):
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        
        cur.execute("SELECT id FROM site WHERE id = %s", (site_id,))
        if not cur.fetchone():
            raise NotFoundError(f"Site with ID '{site_id}' not found")
        
        query = """
            SELECT c.id, c.description, c.photo_path, c.user_id, c.created_at
            FROM contribution c
            WHERE c.site_id = %s
            ORDER BY c.created_at DESC
            LIMIT 5
        """
        cur.execute(query, (site_id,))
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        contributions = []
        for r in rows:
            contributions.append({
                "_id": str(r[0]),
                "description": r[1],
                "photo_path": r[2],
                "user_id": str(r[3]),
                "created_at": r[4].isoformat() if r[4] else None
            })
        return jsonify(contributions)
    except NotFoundError:
        conn.close()
        raise
    except Exception as e:
        conn.close()
        raise DatabaseError(str(e))


@app.route("/api/contributions", methods=["POST"])
def create_contribution():
    data = request.get_json()
    if not data:
        raise ValidationError("Request body must be JSON")
    
    required_fields = ["site_id", "description", "photo_path", "user_id"]
    for field in required_fields:
        if field not in data or not data[field]:
            raise ValidationError(f"{field} is required")
    
    site_id = data["site_id"]
    user_id = data["user_id"]
    description = data["description"]
    photo_path = data["photo_path"]
    
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        
        cur.execute("SELECT id FROM site WHERE id = %s", (site_id,))
        if not cur.fetchone():
            raise NotFoundError(f"Site with ID '{site_id}' not found")
        
        cur.execute("SELECT id FROM users WHERE id = %s", (user_id,))
        if not cur.fetchone():
            raise NotFoundError(f"User with ID '{user_id}' not found")
        
        query = """
            INSERT INTO contribution (user_id, site_id, description, photo_path)
            VALUES (%s, %s, %s, %s)
            RETURNING id, user_id, description, photo_path, created_at
        """
        cur.execute(query, (user_id, site_id, description, photo_path))
        row = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        contribution = {
            "_id": str(row[0]),
            "description": row[2],
            "photo_path": row[3],
            "user_id": str(row[1]),
            "created_at": row[4].isoformat() if row[4] else None
        }
        return jsonify(contribution), 201
    except NotFoundError:
        conn.close()
        raise
    except Exception as e:
        conn.rollback()
        conn.close()
        raise DatabaseError(str(e))


@app.route("/api/sites", methods=["POST"])
def create_site():
    data = request.get_json()
    if not data:
        raise ValidationError("Request body must be JSON")
    
    required_fields = ["name", "summary", "city_name", "culture_name", "latitude", "longitude"]
    for field in required_fields:
        if field not in data or not data[field]:
            raise ValidationError(f"{field} is required")
    
    name = data["name"]
    summary = data["summary"]
    city_name = data["city_name"]
    culture_name = data["culture_name"]
    latitude = data["latitude"]
    longitude = data["longitude"]
    
    conn = get_db()
    if not conn:
        raise DatabaseError("Failed to connect to database")
    
    try:
        cur = conn.cursor()
        
        cur.execute("SELECT id FROM city WHERE name = %s", (city_name,))
        city_row = cur.fetchone()
        if not city_row:
            raise NotFoundError(f"City '{city_name}' not found")
        city_id = city_row[0]
        
        cur.execute("SELECT id FROM culture WHERE name = %s", (culture_name,))
        culture_row = cur.fetchone()
        if not culture_row:
            raise NotFoundError(f"Culture '{culture_name}' not found")
        culture_id = culture_row[0]
        
        query = """
            INSERT INTO site (name, summary, culture_id, city_id, location)
            VALUES (%s, %s, %s, %s, ST_GeomFromText(%s, 4326))
            RETURNING id, name, summary, culture_id, city_id, ST_X(location) as longitude, ST_Y(location) as latitude
        """
        point_wkt = f"POINT({longitude} {latitude})"
        cur.execute(query, (name, summary, culture_id, city_id, point_wkt))
        row = cur.fetchone()
        conn.commit()
        
        cur.execute("SELECT name FROM culture WHERE id = %s", (culture_id,))
        culture_name_result = cur.fetchone()[0]
        
        cur.execute("SELECT name FROM city WHERE id = %s", (city_id,))
        city_name_result = cur.fetchone()[0]
        
        cur.close()
        conn.close()
        
        site = {
            "_id": str(row[0]),
            "name": row[1],
            "summary": row[2],
            "culture_name": culture_name_result,
            "city_name": city_name_result,
            "longitude": float(row[5]) if row[5] else None,
            "latitude": float(row[6]) if row[6] else None
        }
        return jsonify(site), 201
    except NotFoundError:
        conn.close()
        raise
    except Exception as e:
        conn.rollback()
        conn.close()
        raise DatabaseError(str(e))


if __name__ == "__main__":
    app.run(debug=True)
