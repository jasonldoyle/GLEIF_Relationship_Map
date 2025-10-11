# GLEIF Relationship Map

**Interactive visualization of global corporate ownership structures using GLEIF’s Legal Entity Identifier (LEI) dataset.**

Built as a full-stack web application, this project maps relationships between legal entities (e.g., parent–subsidiary or fund–manager links) using a **graph network and hierarchical tree view**.  
It provides users with a clear and interactive way to explore the real-world corporate structure behind LEIs.

---

## 🧩 Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | React + TypeScript + Vite | Dynamic UI, dual graph/tree visualization |
| **Backend** | FastAPI (Python) | REST API serving structured GLEIF data |
| **Data** | GLEIF API | Global LEI Relationship data source |
| **Containerization** | Docker + Docker Compose | Fully containerized development environment |
| **Hosting** | Railway.app | Cloud-deployed backend & frontend (Dockerized) |
| **Visualization Libraries** | `react-d3-tree`, `react-force-graph-2d` | Interactive data visualization |

---

## Project Overview

### Objective
To create an **intuitive data visualization tool** that reveals how companies, funds, and financial institutions are connected globally through GLEIF relationship data.

### Features
- **Search by LEI** – Fetch any legal entity and its connected network
- **Two Visualization Modes**
  - 🌳 **Tree View:** Hierarchical ownership structure
  - 🕸️ **Network View:** Force-directed graph layout
- **Interactive Controls** – Zoom, drag, and click nodes to view entity metadata
- **Clean UI** – Built with TailwindCSS and modern React practices
- **Dockerized Stack** – Fully reproducible and deployable via Docker Compose

---

## 🖥️ Live Demo

Frontend: [https://gleif-frontend.up.railway.app](https://gleif-frontend.up.railway.app)  
Backend API: [https://gleif-backend.up.railway.app/docs](https://gleif-backend.up.railway.app/docs)

*(May take a few seconds to wake from free-tier sleep mode)*

---

## Local Development

### **lone the repository**
```bash
git clone https://github.com/<yourusername>/gleif-relationship-map.git
cd gleif-relationship-map
