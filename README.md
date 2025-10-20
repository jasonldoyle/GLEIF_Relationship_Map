# GLEIF Relationship Map

**Interactive visualization of global corporate ownership structures using GLEIF’s Legal Entity Identifier (LEI) dataset.**

Built as a full-stack web application, this project maps relationships between legal entities (e.g., parent–subsidiary or fund–manager links) using a **graph network and hierarchical tree view**.

Hosted on AWS.

It provides users with a clear and interactive way to explore the real-world corporate structures behind LEIs.

---

## Live Demo

Try the live hosted app here:  
-> **[http://16.171.206.188:5173](http://16.171.206.188:5173)**

> The backend FastAPI API is also available here:  
> ⚙️ **[http://16.171.206.188:8000/docs](http://16.171.206.188:8000/docs)**  
>
> *(Note: the EC2 instance may take a few seconds to respond when first accessed.)*

---

### How to Use the Demo

1. Open the site in your browser → [http://16.171.206.188:5173](http://16.171.206.188:5173)
2. Enter a **Legal Entity Identifier (LEI)** in the search bar  
   For example:

   *3U8WV1YX2VMUHH7Z1Q21*

   *(This corresponds to AIB Group plc — it produces a small, clean example tree.)*
3. Click **Fetch Graph** to visualize the entity’s connections.
4. Toggle between:
   - **Tree View** — hierarchical ownership structure  
   - **Network View** — force-directed graph layout  
5. Click on any node to view its details (LEI, country, legal form, etc.)

---

### Sample LEIs to Try

| Company | LEI |
|----------|-----|
| **AIB Group plc (Ireland)** | `3U8WV1YX2VMUHH7Z1Q21` |
| **Brummer & Partners** | `213800XLPZI6PECOUC58` |
| **Bank of Ireland Group** | `635400C8EK6DRI12LJ39` |
| **INTERNATIONAL CONSOLIDATED AIRLINES GROUP, S.A.** | `959800TZHQRUSH1ESL13` |


---
## Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | React + TypeScript + Vite | Dynamic UI, dual graph/tree visualization |
| **Backend** | FastAPI (Python) | REST API serving structured GLEIF data |
| **Data** | GLEIF API | Global LEI Relationship data source |
| **Containerization** | Docker + Docker Compose | Fully containerized deployment |
| **Hosting** | AWS EC2 (Ubuntu) | Self-hosted backend & frontend via Docker |
| **Visualization Libraries** | `react-d3-tree`, `react-force-graph-2d` | Interactive data visualization |

---

## Project Overview

### Objective
To create an **intuitive data visualization tool** that reveals how companies, funds, and financial institutions are connected globally through GLEIF relationship data.

### Features
- **Search by LEI** – Fetch any legal entity and its connected network  
- **Tree View** – Hierarchical ownership structure  
- **Network View** – Force-directed graph layout  
- **Interactive Controls** – Zoom, drag, and click nodes to view entity metadata  
- **Clean UI** – Built with TailwindCSS and modern React practices  
- **Dockerized Stack** – Fully reproducible and deployable via Docker Compose  

## Screenshots
<img width="1486" height="687" alt="Screenshot 2025-10-12 at 14 41 28" src="https://github.com/user-attachments/assets/111bd38a-345b-4a1c-b254-b1b7d25f25c6" />


<img width="1486" height="849" alt="Screenshot 2025-10-12 at 14 41 42" src="https://github.com/user-attachments/assets/90dceb11-0955-4c77-afa4-205028d806c3" />

---

## Local Development

## License

This project is licensed under a **Modified MIT License (Non-Commercial)**.  
You are free to use, modify, and share it for personal or educational purposes,  
but **commercial use requires prior written permission** from the author.

© 2025 Jason Liu Doyle — [GitHub Profile](https://github.com/jasonldoyle)

### Clone the repository
```bash
git clone https://github.com/jasonldoyle/GLEIF_Relationship_Map.git
cd GLEIF_Relationship_Map

---
