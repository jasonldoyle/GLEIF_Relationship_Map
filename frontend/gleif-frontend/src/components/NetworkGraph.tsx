import ForceGraph2D from "react-force-graph-2d";
import { Graph, Node } from "../types/graph";

type NetworkGraphProps = {
  graph: Graph;
  onSelectNode: (node: Node | null) => void;
};

function NetworkGraph({ graph, onSelectNode }: NetworkGraphProps) {
  return (
    <ForceGraph2D
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
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.fillText(label, node.x!, node.y! + 10);

        ctx.beginPath();
        ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#4f46e5";
        ctx.fill();
      }}
      onNodeClick={(node: any) => onSelectNode(node)}
    />
  );
}

export default NetworkGraph;