import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_db():
    """Get the Supabase connection."""
    USER = os.getenv("USER")
    PASSWORD = os.getenv("PASSWORD")
    HOST = os.getenv("HOST")
    PORT = os.getenv("PORT")
    DBNAME = os.getenv("DBNAME")

    try:
        connection = psycopg2.connect(
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        dbname=DBNAME
        )
        print("Connection successful!")
        return connection
    except Exception as e:
        print(f"Failed to connect: {e}")

