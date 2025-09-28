from fastapi import FastAPI
import requests

app = FastAPI(title="GLEIF Relationship Map")

BASE_URL = "https://api.gleif.org/api/v1/lei-records"
HEADERS = {"Accept": "application/vnd.api+json"}

visited = set()

@app.get("/full-graph/{lei}")
def full_graph(lei: str):
    global visited
    visited = set()
    nodes, links = build_graph(lei)
    return {"nodes": nodes, "links": links}


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
            nodes.append(child)
            links.append({"source": current_lei, "target": child["id"]})
            recurse(child["id"])

    recurse(parent_lei)

    # Deduplicate nodes
    unique_nodes = {node["id"]: node for node in nodes}.values()
    return list(unique_nodes), links


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

    children = resp.json().get("children", [])
    normalized = []
    for child in children:
        normalized.append({
            "id": child.get("lei", "Unknown"),
            "name": child.get("name", "Unknown"),
            "country": child.get("country", "Unknown")
        })
    return normalized