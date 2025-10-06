import { useState } from "react";
import { Graph, Node } from "../types/graph";
import TreeGraph from "./TreeGraph";
import NetworkGraph from "./NetworkGraph";
import { buildTree } from "../utils/buildTree";

type GraphViewProps = {
  onSelectNode: (node: Node | null) => void;
};

function GraphView({ onSelectNode }: GraphViewProps) {
  const [lei, setLei] = useState("");
  const [graph, setGraph] = useState<Graph | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"tree" | "network">("tree");

  // Tree state
  const [treeTranslate, setTreeTranslate] = useState({ x: 0, y: 0 });
  const [treeZoom, setTreeZoom] = useState(1);
  const [treeData, setTreeData] = useState<any[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchGraph = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/full-graph/${lei}`);
      const data: Graph = await res.json();
      setGraph(data);

      const root = buildTree(data, lei);
      setTreeData(root ? [root] : []);

      // Reset zoom; translate will be auto-centered in TreeGraph on first render
      setTreeZoom(1);
      setTreeTranslate({ x: 0, y: 0 });
    } catch (err) {
      console.error("Error fetching graph:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Controls */}
      <div className="flex items-center gap-2 p-4 border-b bg-white shadow-sm">
        <input
          type="text"
          placeholder="Enter LEI"
          value={lei}
          onChange={(e) => setLei(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchGraph()}
          className="p-2 w-96 border border-gray-300 rounded"
        />
        <button
          onClick={fetchGraph}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        >
          Fetch Graph
        </button>
        {loading && <p className="text-sm text-gray-500">Loading...</p>}

        {graph && (
          <div className="ml-4 space-x-2">
            <button
              onClick={() => setViewMode("tree")}
              className={`px-3 py-1 rounded ${
                viewMode === "tree" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Tree View
            </button>
            <button
              onClick={() => setViewMode("network")}
              className={`px-3 py-1 rounded ${
                viewMode === "network" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Network View
            </button>
          </div>
        )}
      </div>

      {/* Graph area */}
      <div className="flex-1 bg-gray-50">
        {graph &&
          (viewMode === "network" ? (
            <NetworkGraph graph={graph} onSelectNode={onSelectNode} />
          ) : (
            <TreeGraph
              treeData={treeData}
              onSelectNode={onSelectNode}
              treeTranslate={treeTranslate}
              treeZoom={treeZoom}
              setTreeTranslate={setTreeTranslate}
              setTreeZoom={setTreeZoom}
              setTreeData={setTreeData}
            />
          ))}
      </div>
    </div>
  );
}

export default GraphView;