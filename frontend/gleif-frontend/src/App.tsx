import { useState } from "react";
import Tree from "react-d3-tree";

type Node = {
  id: string;
  name: string;
  country: string;
};

type Link = {
  source: string;
  target: string;
};

type Graph = {
  nodes: Node[];
  links: Link[];
};

type TreeNode = {
  name: string;
  attributes?: Record<string, string>;
  children?: TreeNode[];
};

function App() {
  const [lei, setLei] = useState("");
  const [graph, setGraph] = useState<Graph | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchGraph = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/full-graph/${lei}`);
      const data: Graph = await res.json();
      setGraph(data);
    } catch (err) {
      console.error("Error fetching graph:", err);
    } finally {
      setLoading(false);
    }
  };

  const buildTree = (graph: Graph): TreeNode | null => {
    if (!graph.nodes.length) return null;

    const nodeMap: Record<string, TreeNode> = {};
    graph.nodes.forEach((n) => {
      nodeMap[n.id] = {
        name: n.name,
        attributes: { LEI: n.id, Country: n.country },
        children: [],
      };
    });

    const childrenSet = new Set<string>();
    graph.links.forEach((link) => {
      const parent = nodeMap[link.source];
      const child = nodeMap[link.target];
      if (parent && child) {
        parent.children!.push(child);
        childrenSet.add(child.name);
      }
    });

    const rootNode = graph.nodes.find((n) => !childrenSet.has(n.name));
    return rootNode ? nodeMap[rootNode.id] : null;
  };

  const treeData = graph ? buildTree(graph) : null;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f4f4f9",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Controls */}
      <div style={{ padding: "1rem", background: "#222", color: "white" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          LEI Graph Viewer
        </h1>
        <input
          type="text"
          placeholder="Enter LEI"
          value={lei}
          onChange={(e) => setLei(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />
        <button
          onClick={fetchGraph}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Fetch Graph
        </button>
        {loading && <p>Loading...</p>}
      </div>

      {/* Graph takes the rest of the screen */}
      <div style={{ flex: 1, width: "100%", overflow: "hidden" }}>
        {treeData && (
          <Tree
  data={treeData}
  orientation="vertical"
  translate={{ x: window.innerWidth / 2, y: 100 }} // centers tree horizontally
  collapsible={true}
  pathFunc="elbow"
  separation={{ siblings: 3, nonSiblings: 3.5 }} // more spread out
  nodeSize={{ x: 300, y: 150 }} // control spacing between nodes
  styles={{
    nodes: {
      node: {
        name: { fontSize: "14px", fontWeight: "bold", fill: "#333" },
        attributes: { fontSize: "12px", fill: "#555" },
      },
      leafNode: {
        name: { fontSize: "14px", fontWeight: "bold", fill: "#333" },
        attributes: { fontSize: "12px", fill: "#555" },
      },
    },
    links: {
      stroke: "#888",
      strokeWidth: 2,
    },
  }}
/>
        )}
      </div>
    </div>
  );
}

export default App;