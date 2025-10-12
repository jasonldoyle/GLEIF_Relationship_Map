# GLEIF Relationship Map

**Interactive visualization of global corporate ownership structures using GLEIF’s Legal Entity Identifier (LEI) dataset.**

Built as a full-stack web application, this project maps relationships between legal entities (e.g., parent–subsidiary or fund–manager links) using a **graph network and hierarchical tree view**.  
It provides users with a clear and interactive way to explore the real-world corporate structures behind LEIs.

---

## Live Demo

Try the live hosted app here:  
👉 **[http://16.171.206.188:5173](http://16.171.206.188:5173)**

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
| **Barclays Bank PLC (UK)** | `G5GSEF7VJP5I7OUK5573` |
| **HSBC Holdings plc (UK)** | `MP6I5ZYZBEU3UXPYFY54` |
| **Nestlé S.A. (Switzerland)** | `254900UBKGS0000O0Y14` |
| **Allianz SE (Germany)** | `529900W3MOO00A50CU29` |
| **BlackRock, Inc. (USA)** | `549300RLMK6C7DJJHE28` |
| **Apple Inc. (USA)** | `HWUPKR0MPOU8FGXBT394` |
| **Volkswagen AG (Germany)** | `529900HWWD7VMC0OHH03` |
| **UBS Group AG (Switzerland)** | `549300ZOF1D6WJ74JT11` |
| **JPMorgan Chase & Co. (USA)** | `7H6GLXDRUGQFU57RNE97` |

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

## 📊 Project Overview

### Objective
To create an **intuitive data visualization tool** that reveals how companies, funds, and financial institutions are connected globally through GLEIF relationship data.

### ✨ Features
- 🔍 **Search by LEI** – Fetch any legal entity and its connected network  
- 🌳 **Tree View** – Hierarchical ownership structure  
- 🕸️ **Network View** – Force-directed graph layout  
- ⚙️ **Interactive Controls** – Zoom, drag, and click nodes to view entity metadata  
- 🎨 **Clean UI** – Built with TailwindCSS and modern React practices  
- 🐳 **Dockerized Stack** – Fully reproducible and deployable via Docker Compose  

## Screenshots
<img width="1486" height="687" alt="Screenshot 2025-10-12 at 14 41 28" src="https://github.com/user-attachments/assets/111bd38a-345b-4a1c-b254-b1b7d25f25c6" />


<img width="1486" height="849" alt="Screenshot 2025-10-12 at 14 41 42" src="https://github.com/user-attachments/assets/90dceb11-0955-4c77-afa4-205028d806c3" />

> Once your screenshots are uploaded (e.g., `/assets/tree-view.png` and `/assets/network-view.png`), update this section to embed them like so:
>
> ```markdown
> ![Tree View](assets/tree-view.png)
> ![Network View](assets/network-view.png)
> ```

---

## Local Development

### Clone the repository
```bash
git clone https://github.com/jasonldoyle/GLEIF_Relationship_Map.git
cd GLEIF_Relationship_Map
