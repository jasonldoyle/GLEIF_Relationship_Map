from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware

# FastAPI app
app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend URL when hosting
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
BASE_URL = "https://api.gleif.org/api/v1/lei-records"
HEADERS = {"Accept": "application/vnd.api+json"}

visited = set()

# Routes
@app.get("/full-graph/{lei}")
def full_graph(lei: str):
    global visited
    visited = set()
    nodes, links = build_graph(lei)
    return {"nodes": nodes, "links": links}


# Graph building logic
def build_graph(parent_lei: str):
    nodes = []
    links = []

    def recurse(current_lei):
        if current_lei in visited:
            return
        visited.add(current_lei)

        # Add current node
        parent_info = fetch_entity_info(current_lei)
        nodes.append(parent_info)

        # Fetch direct children
        children = fetch_children(current_lei)
        for child in children:
            links.append({"source": current_lei, "target": child["id"]})
            recurse(child["id"])

    recurse(parent_lei)

    # Deduplicate nodes
    unique_nodes = {node["id"]: node for node in nodes}.values()
    return list(unique_nodes), links


# Helper functions
def fetch_entity_info(lei: str):
    url = f"{BASE_URL}/{lei}"
    resp = requests.get(url, headers=HEADERS)
    if resp.status_code != 200:
        return {"id": lei, "name": "Unknown", "country": "Unknown"}

    data = resp.json().get("data", {})
    attributes = data.get("attributes", {})
    entity = attributes.get("entity", {})
    legal_name = entity.get("legalName", {}).get("name", "Unknown")
    country = entity.get("legalAddress", {}).get("country", "Unknown")
    return {"id": lei, "name": legal_name, "country": country}


def fetch_children(lei: str):
    url = f"{BASE_URL}/{lei}/direct-children"
    resp = requests.get(url, headers=HEADERS)
    if resp.status_code != 200:
        return []

    # Normalize children data
    children_data = resp.json().get("data", [])
    normalized = []
    for child in children_data:
        attrs = child.get("attributes", {})
        entity = attrs.get("entity", {})
        legal_name = entity.get("legalName", {}).get("name", "Unknown")
        country = entity.get("legalAddress", {}).get("country", "Unknown")
        normalized.append({
            "id": attrs.get("lei", "Unknown"),
            "name": legal_name,
            "country": country
        })
    return normalized