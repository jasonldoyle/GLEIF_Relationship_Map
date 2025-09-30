import Tree from "react-d3-tree";
import { Graph, TreeNode, Node } from "../types/graph";
import { buildTree } from "../utils/buildTree";

type Props = {
  graph: Graph | null;
  setSelectedNode: (node: Node | null) => void;
};

export default function GraphViewer({ graph, setSelectedNode }: Props) {
  const treeData: TreeNode | null = graph ? buildTree(graph) : null;

  return (
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
  );
}