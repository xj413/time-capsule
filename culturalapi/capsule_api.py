from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
import os
import requests
import random
import time
import base64


def load_env(filepath="keys.env"):
    if os.path.exists(filepath):
        with open(filepath) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip()


load_env()


app = FastAPI(title="Cultural Capsule API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
FREESOUND_API_KEY = os.environ.get("FREESOUND_API_KEY", "")


class ContextResponse(BaseModel):
    place: str
    story: str


class ImageResponse(BaseModel):
    place: str
    image_base64: str
    image_description: str
    disclaimer: str


class MusicResponse(BaseModel):
    place: str
    track: dict | None


class CapsuleResponse(BaseModel):
    context: ContextResponse
    image: ImageResponse
    music: MusicResponse


@app.get("/")
async def root():
    return {
        "message": "Cultural Capsule API running",
        "usage": "Pass any place: /api/capsules/context?place=Tokyo",
        "endpoints": [
            "GET /api/capsules/context?place=Tokyo",
            "GET /api/capsules/image?place=Tokyo",
            "GET /api/capsules/music?place=Tokyo",
            "GET /api/capsules/full?place=Tokyo"
        ]
    }


@app.get("/api/capsules/context", response_model=ContextResponse)
async def get_context(place: str):
    if not place or len(place.strip()) < 2:
        raise HTTPException(400, "Please provide a valid place name")

    prompt = f"""
Structured cultural heritage overview for {place}.

Format as EXACTLY 8 bullet points (1 sentence each):

• **Buildings**: Key architecture/monuments
• **Traditions**: Festivals/rituals
• **Music**: Instruments/genres
• **Food**: Signature dishes/ingredients
• **History**: Pivotal events/eras
• **Clothing**: Traditional attire
• **Social Practices**: Customs/gatherings
• **Threats & Preservation**: Challenges + protection efforts

Use formal factual language for adults.
Use "Limited documentation available" if genuinely unknown.
End with: "This heritage fosters global cultural understanding."
"""

    resp = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=prompt,
        config=types.GenerateContentConfig(
            max_output_tokens=500,
            temperature=0.4
        )
    )

    return ContextResponse(place=place, story=resp.text.strip())


@app.get("/api/capsules/image", response_model=ImageResponse)
async def get_image(place: str):
    if not place or len(place.strip()) < 2:
        raise HTTPException(400, "Please provide a valid place name")

    seed = f"{random.randint(1, 1000)}-{int(time.time())}"

    scene_resp = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=f"Describe ONE vivid cultural heritage scene for {place} (100 words). Focus on buildings, clothing, markets, traditions. Seed:{seed}",
        config=types.GenerateContentConfig(temperature=0.8)
    )
    scene_desc = scene_resp.text.strip()

    try:
        resp = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=f"{scene_desc}\nStyle: Vibrant educational cartoon illustration. Clean lines, bright colors, museum poster quality. Text overlay: '{place} Cultural Heritage'",
            config=types.GenerateContentConfig(
                temperature=1.0,
                response_modalities=["IMAGE"]
            )
        )

        for part in resp.candidates[0].content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                img_b64 = base64.b64encode(part.inline_data.data).decode('utf-8')
                return ImageResponse(
                    place=place,
                    image_base64=f"data:image/png;base64,{img_b64}",
                    image_description=scene_desc,
                    disclaimer="AI-generated cartoon illustration (artistic interpretation)"
                )
        raise ValueError("No image in response")

    except Exception as e:
        return ImageResponse(
            place=place,
            image_base64="",
            image_description="Image generation unavailable",
            disclaimer=str(e)[:150]
        )


@app.get("/api/capsules/music", response_model=MusicResponse)
async def get_music(place: str):
    if not place or len(place.strip()) < 2:
        raise HTTPException(400, "Please provide a valid place name")

    if not FREESOUND_API_KEY:
        return MusicResponse(place=place, track=None)

    search_queries = [f"{place} traditional music", f"{place} folk", place]

    for query in search_queries:
        try:
            r = requests.get(
                "https://freesound.org/apiv2/search/text/",
                headers={"Authorization": f"Token {FREESOUND_API_KEY}"},
                params={
                    "query": query,
                    "fields": "name,id,username,previews,duration,license",
                    "filter": "duration:[15 TO 90]",
                    "page_size": 1,
                    "sort": "score"
                },
                timeout=10
            )
            data = r.json()
            if data.get("results"):
                sound = data["results"][0]
                return MusicResponse(
                    place=place,
                    track={
                        "title": sound["name"],
                        "artist": sound["username"],
                        "url": sound["previews"]["preview-hq-mp3"],
                        "duration": sound["duration"],
                        "license": sound["license"],
                        "genre": query
                    }
                )
        except Exception as e:
            print(f"Music error: {e}")

    return MusicResponse(place=place, track=None)


@app.get("/api/capsules/full", response_model=CapsuleResponse)
async def get_full_capsule(place: str):
    if not place or len(place.strip()) < 2:
        raise HTTPException(400, "Please provide a valid place name")

    context = await get_context(place)
    image = await get_image(place)
    music = await get_music(place)

    return CapsuleResponse(context=context, image=image, music=music)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
