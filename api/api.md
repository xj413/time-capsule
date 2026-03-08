# API Documentation

## API Requirements
A Flask API to retrieve the necessary data from the database.
Database setup for Supabase schema can be found in /database.
No authentication implemented at this stage, in production auth tokens will be used.

## Base URL
```
http://localhost:5000/api
```

## Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Retrieve all users |
| GET | `/users/<user_id>` | Retrieve a specific user by ID |
| GET | `/cities` | Retrieve all cities |
| GET | `/cultures` | Retrieve all cultural categories |
| GET | `/sites/city/<city_name>` | Retrieve all sites in a specific city |
| GET | `/contributions/<site_id>` | Retrieve the 5 most recent contributions for a site |
| POST | `/contributions` | Create a new contribution for a site |
| POST | `/sites` | Create a new cultural site |

---

## Endpoints

### 1. Fetch All Users
**GET** `/users`

Retrieve all users in the database.

**Request:**
```
GET http://localhost:5000/api/users
```

**Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "first_name": "Alice",
    "last_name": "Johnson"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "first_name": "Bob",
    "last_name": "Smith"
  }
]
```

---

### 2. Fetch User by ID
**GET** `/users/<user_id>`

Retrieve a specific user by their ID.

**Request:**
```
GET http://localhost:5000/api/users/550e8400-e29b-41d4-a716-446655440001
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "first_name": "Alice",
  "last_name": "Johnson"
}
```

---

### 3. Fetch All Cities
**GET** `/cities`

Retrieve all cities in the database.

**Request:**
```
GET http://localhost:5000/api/cities
```

**Response (200):**
```json
[
  {
    "_id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Durham",
    "summary": "Historic city in North East England",
    "country": "United Kingdom"
  },
  {
    "_id": "223e4567-e89b-12d3-a456-426614174000",
    "name": "Edinburgh",
    "summary": "Capital of Scotland",
    "country": "United Kingdom"
  }
]
```

---

### 4. Fetch All Cultures
**GET** `/cultures`

Retrieve all cultural categories in the database.

**Request:**
```
GET http://localhost:5000/api/cultures
```

**Response (200):**
```json
[
  {
    "_id": "323e4567-e89b-12d3-a456-426614174000",
    "name": "Medieval Architecture",
    "summary": "Architecture from the medieval period"
  },
  {
    "_id": "423e4567-e89b-12d3-a456-426614174000",
    "name": "Colonial Heritage",
    "summary": "Colonial era buildings and monuments"
  }
]
```

---

### 5. Fetch All Sites Within a City
**GET** `/sites/city/<city_name>`

Retrieve all cultural sites in a specific city by name.

**Request:**
```
GET http://localhost:5000/api/sites/city/Durham
```

**Response (200):**
```json
[
  {
    "_id": "523e4567-e89b-12d3-a456-426614174000",
    "name": "Durham Cathedral",
    "summary": "Historic Norman cathedral",
    "culture_name": "Medieval Architecture",
    "city_name": "Durham",
    "latitude": 54.7740,
    "longitude": -1.5823
  },
  {
    "_id": "623e4567-e89b-12d3-a456-426614174000",
    "name": "Durham Castle",
    "summary": "Norman fortress",
    "culture_name": "Medieval Architecture",
    "city_name": "Durham",
    "latitude": 54.7735,
    "longitude": -1.5819
  }
]
```

---

### 6. Fetch All Contributions for a Site
**GET** `/contributions/<site_id>`

Retrieve the 5 most recent user contributions for a specific site.

**Request:**
```
GET http://localhost:5000/api/contributions/523e4567-e89b-12d3-a456-426614174000
```

**Response (200):**
```json
[
  {
    "_id": "723e4567-e89b-12d3-a456-426614174000",
    "description": "Beautiful place to visit in autumn",
    "photo_path": "user_photos/photo_001.jpg",
    "user_id": "550e8400-e29b-41d4-a716-446655440001",
    "created_at": "2026-03-05T14:32:10"
  },
  {
    "_id": "823e4567-e89b-12d3-a456-426614174000",
    "description": "Amazing historical details preserved",
    "photo_path": "user_photos/photo_002.jpg",
    "user_id": "550e8400-e29b-41d4-a716-446655440002",
    "created_at": "2026-03-04T09:15:22"
  }
]
```

---

### 7. Post a User Contribution to a Site
**POST** `/contributions`

Create a new contribution for a site.

**Request:**
```json
POST http://localhost:5000/api/contributions
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "site_id": "523e4567-e89b-12d3-a456-426614174000",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "description": "Stunning architectural details",
  "photo_path": "user_photos/my_photo.jpg"
}
```

**Response (201):**
```json
{
  "_id": "923e4567-e89b-12d3-a456-426614174000",
  "description": "Stunning architectural details",
  "photo_path": "user_photos/my_photo.jpg",
  "user_id": "550e8400-e29b-41d4-a716-446655440001",
  "created_at": "2026-03-07T10:45:30"
}
```

---

### 8. Add a New Site
**POST** `/sites`

Create a new cultural site in the database.

**Request:**
```json
POST http://localhost:5000/api/sites
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Westminster Abbey",
  "summary": "Historic Gothic abbey in London",
  "city_name": "London",
  "culture_name": "Medieval Architecture",
  "latitude": 51.4955,
  "longitude": -0.1270
}
```

**Response (201):**
```json
{
  "_id": "a23e4567-e89b-12d3-a456-426614174000",
  "name": "Westminster Abbey",
  "summary": "Historic Gothic abbey in London",
  "city_name": "London",
  "culture_name": "Medieval Architecture",
  "latitude": 51.4955,
  "longitude": -0.1270
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "site_id is required",
  "status": 400
}
```

### 404 Not Found
```json
{
  "error": "Site with ID 'xyz' not found",
  "status": 404
}
```

### 500 Internal Server Error
```json
{
  "error": "Database error",
  "status": 500
}
```

