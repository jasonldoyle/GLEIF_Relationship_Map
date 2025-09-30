import { useState } from "react";
import { Graph, Node } from "./types/graph";
import EntityDetails from "./components/EntityDetails";
import Controls from "./components/Controls";
import GraphViewer from "./components/GraphViewer";

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

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <EntityDetails selectedNode={selectedNode} />
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <Controls lei={lei} setLei={setLei} fetchGraph={fetchGraph} loading={loading} />
        <GraphViewer graph={graph} setSelectedNode={setSelectedNode} />
      </div>
    </div>
  );
}

export default App;