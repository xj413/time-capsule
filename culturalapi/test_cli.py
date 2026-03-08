"""
CLI Test Script for Cultural Capsule API
Run: python test_cli.py Durham
"""

import requests
import sys
import os

def load_env(filepath="keys.env"):
    if os.path.exists(filepath):
        with open(filepath) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip()

load_env()

BASE_URL = "http://127.0.0.1:8000"

def test_place(place: str):
    print(f"\n{'='*50}")
    print(f"TESTING: {place}")
    print('='*50)

    # Test context
    print("\n--- HERITAGE OVERVIEW ---")
    try:
        r = requests.get(f"{BASE_URL}/api/capsules/context", params={"place": place}, timeout=30)
        print(f"Status: {r.status_code}")
        data = r.json()
        print(data["story"])
    except Exception as e:
        print(f"Context failed: {e}")

    # Test image
    print("\n--- IMAGE ---")
    try:
        r = requests.get(f"{BASE_URL}/api/capsules/image", params={"place": place}, timeout=30)
        print(f"Status: {r.status_code}")
        data = r.json()
        if data["image_base64"]:
            print(f"Image generated successfully ({len(data['image_base64'])} chars)")
            print(f"Scene: {data['image_description'][:150]}...")
        else:
            print(f"Image failed: {data['disclaimer']}")
    except Exception as e:
        print(f"Image failed: {e}")

    # Test music
    print("\n--- MUSIC ---")
    try:
        r = requests.get(f"{BASE_URL}/api/capsules/music", params={"place": place}, timeout=30)
        print(f"Status: {r.status_code}")
        data = r.json()
        if data["track"]:
            print(f"Title:    {data['track']['title']}")
            print(f"Artist:   {data['track']['artist']}")
            print(f"Genre:    {data['track'].get('genre', 'N/A')}")
            print(f"Duration: {data['track']['duration']:.1f}s")
            print(f"URL:      {data['track']['url']}")
        else:
            print("No music found")
    except Exception as e:
        print(f"Music failed: {e}")

    print(f"\n{'='*50}\n")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        place = " ".join(sys.argv[1:])
    else:
        place = input("Enter a place name: ")

    test_place(place)
