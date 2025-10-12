# GLEIF Relationship Map

**Interactive visualization of global corporate ownership structures using GLEIF’s Legal Entity Identifier (LEI) dataset.**

Built as a full-stack web application, this project maps relationships between legal entities (e.g., parent–subsidiary or fund–manager links) using a **graph network and hierarchical tree view**.  
It provides users with a clear and interactive way to explore the real-world corporate structures behind LEIs.

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

---

## Live Demo

> **Try it out directly:**  
> 🌍 [http://16.171.206.188:5173](http://16.171.206.188:5173)  
>
> The backend FastAPI documentation is available at:  
> ⚙️ [http://16.171.206.188:8000/docs](http://16.171.206.188:8000/docs)
>
> *Note: the EC2 instance may take a few seconds to respond when first accessed.*

---

## Screenshots
<img width="1486" height="687" alt="Screenshot 2025-10-12 at 14 41 28" src="https://github.com/user attachments/assets/a6d289f4-8df7-4982-b158-325aad76f5f0" />
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
