from flask import Flask, request, jsonify
from db import get_db

app = Flask(__name__)

@app.route("/users", methods=["GET"])
def get_users():
    conn = get_db()

    if not conn:
        return jsonify({"Error": "Failed to Connect to Database"})
    
    cur = conn.cursor()
    cur.execute("SELECT id, first_name, last_name FROM users")
    rows = cur.fetchall()

    users = []
    for r in rows:
        users.append({
            "id": r[0],
            "first_name": r[1],
            "last_name": r[2]
        })
    
    cur.close()
    conn.close()

    return jsonify(users)

if __name__ == "__main__":
    app.run(debug=True)
