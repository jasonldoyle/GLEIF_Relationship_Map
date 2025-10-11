import { useRef, useEffect } from "react";
import ForceGraph2D, {
  ForceGraphMethods,
  NodeObject,
  LinkObject,
} from "react-force-graph-2d";
import { Graph, Node } from "../types/graph";

type NetworkGraphProps = {
  graph: Graph;
  onSelectNode: (node: Node | null) => void;
};

function NetworkGraph({ graph, onSelectNode }: NetworkGraphProps) {
  // ✅ Use correct generics for ref
  const fgRef = useRef<
    ForceGraphMethods<NodeObject<Node>, LinkObject<Node>>
  >(null!);

  useEffect(() => {
    if (fgRef.current && graph?.nodes?.length) {
      setTimeout(() => {
        fgRef.current.zoomToFit(400, 100);
      }, 100);
    }
  }, [graph]);

  return (
    <ForceGraph2D<NodeObject<Node>, LinkObject<Node>>
      ref={fgRef}
      graphData={graph}
      nodeId="id"
      nodeLabel={(node: Node) =>
        `${node.name}\nLEI: ${node.id}\nCountry: ${node.country}`
      }
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
      nodeCanvasObject={(
        node: NodeObject<Node>,
        ctx: CanvasRenderingContext2D,
        globalScale: number
      ) => {
        const label = node.name || node.id;
        const fontSize = 10 / globalScale;
        ctx.font = `${fontSize}px 'Inter', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#111827";
        ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + 10);

        ctx.beginPath();
        ctx.arc(node.x ?? 0, node.y ?? 0, 6, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#4f46e5";
        ctx.fill();
      }}
      onNodeClick={(node: NodeObject<Node>) =>
        onSelectNode(node as unknown as Node)
      }
    />
  );
}

export default NetworkGraph;