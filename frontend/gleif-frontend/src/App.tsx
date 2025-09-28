import { useState } from "react";
import Tree from "react-d3-tree";

type Node = {
  id: string;
  name: string;
  country: string;
  jurisdiction?: string;
  status?: string;
  legal_form?: string;
  registration_date?: string;
  last_update?: string;
  next_renewal?: string;
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
  nodeData?: Node;
};

function App() {
  const [lei, setLei] = useState("");
  const [graph, setGraph] = useState<Graph | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

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
        nodeData: n,
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
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Left side: Detail Panel (Dark) */}
      <div
        style={{
          flex: 1,
          background: "#222",
          color: "white",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <h2 style={{ borderBottom: "1px solid #444", paddingBottom: "0.5rem" }}>
          Entity Details
        </h2>
        {selectedNode ? (
          <div>
            <p>
              <strong>Name:</strong> {selectedNode.name}
            </p>
            <p>
              <strong>LEI:</strong> {selectedNode.id}
            </p>
            <p>
              <strong>Country:</strong> {selectedNode.country}
            </p>
            <p>
              <strong>Jurisdiction:</strong>{" "}
              {selectedNode.jurisdiction || "Unknown"}
            </p>
            <p>
              <strong>Status:</strong> {selectedNode.status || "Unknown"}
            </p>
            <p>
              <strong>Legal Form:</strong>{" "}
              {selectedNode.legal_form || "Unknown"}
            </p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {selectedNode.registration_date || "N/A"}
            </p>
            <p>
              <strong>Last Update:</strong>{" "}
              {selectedNode.last_update || "N/A"}
            </p>
            <p>
              <strong>Next Renewal:</strong>{" "}
              {selectedNode.next_renewal || "N/A"}
            </p>
          </div>
        ) : (
          <p style={{ color: "#aaa" }}>Click a node to see details here.</p>
        )}
      </div>

      {/* Right side: Controls + Graph (Light) */}
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "1rem", background: "#f4f4f9", color: "#222" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            LEI Graph Viewer
          </h1>
          <input
            type="text"
            placeholder="Enter LEI"
            value={lei}
            onChange={(e) => setLei(e.target.value)}
            style={{ padding: "0.5rem", width: "250px", fontSize: "1rem" }}
          />
          <button
            onClick={fetchGraph}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              cursor: "pointer",
              background: "#222",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Fetch Graph
          </button>
          {loading && <p>Loading...</p>}
        </div>

        <div style={{ flex: 1, width: "100%", overflow: "hidden", background: "#f4f4f4" }}>
          {treeData && (
            <Tree
              data={treeData}
              orientation="vertical"
              translate={{ x: window.innerWidth / 3, y: 100 }}
              collapsible={true}
              pathFunc="elbow"
              separation={{ siblings: 2, nonSiblings: 2.5 }}
              nodeSize={{ x: 220, y: 120 }}
              onNodeClick={(node: any) => {
                if (node.data.nodeData) {
                  setSelectedNode(node.data.nodeData);
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;