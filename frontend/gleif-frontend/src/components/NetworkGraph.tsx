import { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Graph, Node } from "../types/graph";

type NetworkGraphProps = {
  graph: Graph;
  onSelectNode: (node: Node | null) => void;
};

function NetworkGraph({ graph, onSelectNode }: NetworkGraphProps) {
  const fgRef = useRef<any>();

  // Center and zoom when graph data updates
  useEffect(() => {
    if (fgRef.current && graph?.nodes?.length) {
      // Wait a tick to ensure layout positions are calculated
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 100, (node: any) => true); // duration=400ms, padding=50px
      }, 100);
    }
  }, [graph]);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graph}
      nodeId="id"
      nodeLabel={(node: any) =>
        `${node.name}\nLEI: ${node.id}\nCountry: ${node.country}`
      }
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
      nodeCanvasObject={(node: any, ctx, globalScale) => {
        const label = node.name || node.id;
        const fontSize = 10 / globalScale;
        ctx.font = `${fontSize}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#111827";
        ctx.fillText(label, node.x!, node.y! + 10);

        ctx.beginPath();
        ctx.arc(node.x!, node.y!, 6, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#4f46e5";
        ctx.fill();
      }}
      onNodeClick={(node: any) => onSelectNode(node)}
    />
  );
}

export default NetworkGraph;