import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "app.db")

def get_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        return conn
    except Exception as e:
        print("Failed to connect to SQLite:", e)
        return None
