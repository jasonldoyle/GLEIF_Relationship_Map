from fastapi import FastAPI
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.gleif.org/api/v1/lei-records"
HEADERS = {"Accept": "application/vnd.api+json"}

visited = set()


@app.get("/full-graph/{lei}")
def full_graph(lei: str):
    global visited
    visited = set()
    nodes, links = build_graph(lei)

    # ✅ deduplicate nodes & links
    unique_nodes = {node["id"]: node for node in nodes}.values()
    unique_links = {(l["source"], l["target"]): l for l in links}.values()

    return {"nodes": list(unique_nodes), "links": list(unique_links)}


def build_graph(start_lei: str):
    nodes, links = [], []

    def recurse(current_lei):
        if current_lei in visited:
            return
        visited.add(current_lei)

        node_info = fetch_entity_info(current_lei)
        nodes.append(node_info)

        # children
        for child in fetch_children(current_lei):
            links.append({"source": current_lei, "target": child["id"]})
            recurse(child["id"])

        # parents
        for parent in fetch_parents(current_lei):
            links.append({"source": parent["id"], "target": current_lei})
            recurse(parent["id"])

    recurse(start_lei)
    return nodes, links


def fetch_entity_info(lei: str):
    url = f"{BASE_URL}/{lei}"
    resp = requests.get(url, headers=HEADERS)
    if resp.status_code != 200:
        return {"id": lei, "name": "Unknown", "country": "Unknown"}

    data = resp.json().get("data", {})
    attributes = data.get("attributes", {})
    entity = attributes.get("entity", {})

    return {
        "id": lei,
        "name": entity.get("legalName", {}).get("name", "Unknown"),
        "country": entity.get("legalAddress", {}).get("country", "Unknown"),
        "jurisdiction": attributes.get("jurisdiction", "Unknown"),
        "status": entity.get("status", "Unknown"),
        "legal_form": entity.get("legalForm", {}).get("id", "Unknown"),
        "registration_date": attributes.get("registration", {}).get("initialRegistrationDate"),
        "last_update": attributes.get("registration", {}).get("lastUpdateDate"),
        "next_renewal": attributes.get("registration", {}).get("nextRenewalDate"),
    }


def fetch_children(lei: str):
    url = f"{BASE_URL}/{lei}/direct-children"
    resp = requests.get(url, headers=HEADERS)
    if resp.status_code != 200:
        return []

    data = resp.json().get("data", [])
    normalized = []
    for child in data:
        attrs = child.get("attributes", {})
        entity = attrs.get("entity", {})
        normalized.append({
            "id": attrs.get("lei", "Unknown"),
            "name": entity.get("legalName", {}).get("name", "Unknown"),
            "country": entity.get("legalAddress", {}).get("country", "Unknown"),
            "jurisdiction": attrs.get("jurisdiction", "Unknown"),
            "status": entity.get("status", "Unknown"),
            "legal_form": entity.get("legalForm", {}).get("id", "Unknown"),
            "registration_date": attrs.get("registration", {}).get("initialRegistrationDate"),
            "last_update": attrs.get("registration", {}).get("lastUpdateDate"),
            "next_renewal": attrs.get("registration", {}).get("nextRenewalDate"),
        })
    return normalized


def fetch_parents(lei: str):
    parents = []
    for endpoint in ["direct-parent", "ultimate-parent"]:
        url = f"{BASE_URL}/{lei}/{endpoint}"
        resp = requests.get(url, headers=HEADERS)
        if resp.status_code != 200:
            continue

        parent_data = resp.json().get("data")
        if not parent_data:
            continue

        if isinstance(parent_data, dict):
            parent_data = [parent_data]

        for parent in parent_data:
            attrs = parent.get("attributes", {})
            entity = attrs.get("entity", {})
            parents.append({
                "id": attrs.get("lei", "Unknown"),
                "name": entity.get("legalName", {}).get("name", "Unknown"),
                "country": entity.get("legalAddress", {}).get("country", "Unknown"),
                "jurisdiction": attrs.get("jurisdiction", "Unknown"),
                "status": entity.get("status", "Unknown"),
                "legal_form": entity.get("legalForm", {}).get("id", "Unknown"),
                "registration_date": attrs.get("registration", {}).get("initialRegistrationDate"),
                "last_update": attrs.get("registration", {}).get("lastUpdateDate"),
                "next_renewal": attrs.get("registration", {}).get("nextRenewalDate"),
            })
    return parents