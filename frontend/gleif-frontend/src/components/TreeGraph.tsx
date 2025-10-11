import { useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";
import { TreeNode, Node } from "../types/graph";

// local fallback types
export type RawNodeDatum = {
  name: string;
  attributes?: Record<string, string>;
  children?: RawNodeDatum[];
};

export type TreeNodeDatum = RawNodeDatum & {
  parent?: TreeNodeDatum;
};

type TreeGraphProps = {
  treeData: TreeNode[];
  onSelectNode: (node: Node | null) => void;
  treeTranslate: { x: number; y: number };
  treeZoom: number;
  setTreeTranslate: (t: { x: number; y: number }) => void;
  setTreeZoom: (z: number) => void;
  setTreeData: (data: TreeNode[]) => void;
};

type ToggleNodeDatum = TreeNodeDatum & { __rd3t?: { collapsed?: boolean } };

function TreeGraph({
  treeData = [],
  onSelectNode,
  treeTranslate,
  treeZoom,
  setTreeTranslate,
  setTreeZoom,
  setTreeData,
}: TreeGraphProps) {

const treeRef = useRef<unknown>(null); useEffect(() => {
  
    if (treeData.length > 0) {
      setTimeout(() => {
        const container = document.querySelector("div[style*='height: 100%']");
        if (!container) return;

        const { width, height } = container.getBoundingClientRect();

        // Center roughly on the root
        setTreeTranslate({ x: width / 2, y: height / 6 });

        // Slightly zoomed out by default
        setTreeZoom(0.7);
      }, 200);
    }
  }, [treeData, setTreeTranslate, setTreeZoom]);

  if (treeData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No tree data available
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Tree
        ref={treeRef}
        data={treeData as RawNodeDatum[]}
        orientation="vertical"
        translate={treeTranslate}
        zoom={treeZoom}
        zoomable
        collapsible
        nodeSize={{ x: 200, y: 140 }}
        separation={{ siblings: 2.2, nonSiblings: 2.8 }}
        pathFunc="elbow"
        styles={{
          links: { stroke: "#cbd5e1", strokeWidth: 1.25 },
        }}
        renderCustomNodeElement={(rd3tProps: {
          nodeDatum: TreeNodeDatum;
          toggleNode: () => void;
        }) => (
          <CustomTreeNode {...rd3tProps} onSelectNode={onSelectNode} />
        )}
        onUpdate={(state: {
          translate: { x: number; y: number };
          zoom: number;
        }) => {
          setTreeTranslate(state.translate);
          setTreeZoom(state.zoom);
        }}
        onNodeToggle={(nodeData: ToggleNodeDatum) => {
  if (nodeData.__rd3t) {
    nodeData.__rd3t.collapsed = !nodeData.__rd3t.collapsed;
    setTreeData([...treeData]);
  }
}}
      />
    </div>
  );
}

export default TreeGraph;