import csv
import json
import urllib.request

URL = "https://docs.google.com/spreadsheets/d/1H0FelbYejrgKoqOWcoqZmbbW1juH51bRHm37kH4aiaQ/export?format=csv&gid=0"

with urllib.request.urlopen(URL) as response:
    lines = response.read().decode("utf-8").splitlines()

reader = csv.DictReader(lines)

dades = []

for fila in reader:

    posicio = fila["POSICIÓ"].strip()

    if posicio.isdigit():
        posicio = int(posicio)

    dades.append({
        "data": fila["DATA"].strip(),
        "cursa": fila["CURSA"].strip(),
        "posicio": posicio,
        "nivell": fila["NIVELL"].strip(),
        "context": fila["CONTEXT /TIPUS"].strip()
    })

with open("dades.json", "w", encoding="utf-8") as f:
    json.dump(dades, f, ensure_ascii=False, indent=2)

print(f"{len(dades)} curses guardades a dades.json")