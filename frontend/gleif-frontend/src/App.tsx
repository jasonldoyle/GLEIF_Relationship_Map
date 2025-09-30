import { useState } from "react";
import GraphView from "./components/GraphView";
import EntityDetails from "./components/EntityDetails";
import { Node } from "./types/graph";

function App() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-900 relative">
      {/* Left side: Entity Details */}
      <div
        className={`transition-all duration-300 ${
          collapsed ? "w-0" : "w-1/4"
        } bg-gray-800 text-white overflow-hidden`}
      >
        {!collapsed && (
          <div className="p-6 h-full overflow-y-auto">
            <EntityDetails selectedNode={selectedNode} />
          </div>
        )}
      </div>

      {/* Toggle button (floats on border) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-1/2 left-[calc(25%-0.75rem)] transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-md z-10 transition-all"
        style={{ left: collapsed ? "0.5rem" : "calc(25% - 0.75rem)" }}
      >
        {collapsed ? "▶" : "◀"}
      </button>

      {/* Right side: Graph Viewer */}
      <div
        className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${
          collapsed ? "w-full" : "w-3/4"
        } h-screen`}   // enforce equal height
      >
        {/* Header stays fixed height */}
        <header className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">
            LEI Graph Viewer
          </h1>
        </header>

        {/* Graph fills remaining height */}
        <main className="flex-1 overflow-hidden">
          <GraphView onSelectNode={setSelectedNode} />
        </main>
      </div>
    </div>
  );
}

export default App;