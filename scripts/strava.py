import os
import json
import requests

CLIENT_ID = os.environ["STRAVA_CLIENT_ID"]
CLIENT_SECRET = os.environ["STRAVA_CLIENT_SECRET"]
REFRESH_TOKEN = os.environ["STRAVA_REFRESH_TOKEN"]

print("CLIENT_ID =", CLIENT_ID)
print("CLIENT_SECRET longitud =", len(CLIENT_SECRET))
print("REFRESH_TOKEN longitud =", len(REFRESH_TOKEN))

# Renovar l'access token
token = requests.post(
    "https://www.strava.com/oauth/token",
    data={
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "refresh_token",
        "refresh_token": REFRESH_TOKEN,
    },
)

token.raise_for_status()

token_data = token.json()

access_token = token_data["access_token"]

headers = {
    "Authorization": f"Bearer {access_token}"
}
# Descarregar les últimes activitats
response = requests.get(
    "https://www.strava.com/api/v3/athlete/activities?per_page=20",
    headers=headers,
)

response.raise_for_status()

activities = response.json()

entrenaments = []

for a in activities:

    entrenaments.append({
        "id": a["id"],
        "data": a["start_date_local"][:10],
        "nom": a["name"],
        "tipus": a["sport_type"],
        "distancia": round(a["distance"] / 1000, 2),
        "desnivell": round(a["total_elevation_gain"]),
        "temps": round(a["moving_time"] / 60)
   })
# Guardar entrenaments.json

with open("entrenaments.json", "w", encoding="utf-8") as f:
    json.dump(
        entrenaments,
        f,
        ensure_ascii=False,
        indent=2
    )

print(f"{len(entrenaments)} entrenaments desats a entrenaments.json")