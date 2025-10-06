import { useEffect, useRef } from "react";
import Tree from "react-d3-tree";
import CustomTreeNode from "./CustomTreeNode";

type TreeGraphProps = {
  treeData: any[];
  onSelectNode: (node: any | null) => void;
  treeTranslate: { x: number; y: number };
  treeZoom: number;
  setTreeTranslate: (t: { x: number; y: number }) => void;
  setTreeZoom: (z: number) => void;
  setTreeData: (data: any[]) => void;
};

function TreeGraph({
  treeData = [],
  onSelectNode,
  treeTranslate,
  treeZoom,
  setTreeTranslate,
  setTreeZoom,
  setTreeData,
}: TreeGraphProps) {
  const treeRef = useRef<any>(null);

  useEffect(() => {
    if (treeData.length > 0) {
      // Center root and zoom out a bit after render
      setTimeout(() => {
        const container = document.querySelector("div[style*='height: 100%']");
        if (!container) return;

        const { width, height } = container.getBoundingClientRect();

        // Position roughly center
        setTreeTranslate({ x: width / 2, y: height / 6 });

        // Set a good default zoom (0.7 = zoomed out)
        setTreeZoom(0.7);
      }, 200);
    }
  }, [treeData]);

  if (!Array.isArray(treeData) || treeData.length === 0) {
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
        data={treeData}
        orientation="vertical"
        translate={treeTranslate}
        zoom={treeZoom}
        zoomable
        collapsible
        nodeSize={{ x: 200, y: 140 }}
        separation={{ siblings: 2.2, nonSiblings: 2.8 }}
        pathFunc="elbow"
        styles={{
          links: {
            stroke: "#cbd5e1",
            strokeWidth: 1.25,
          },
        }}
        renderCustomNodeElement={(rd3tProps) => (
          <CustomTreeNode {...rd3tProps} onSelectNode={onSelectNode} />
        )}
        onUpdate={(state: any) => {
          setTreeTranslate(state.translate);
          setTreeZoom(state.zoom);
        }}
        onNodeToggle={(nodeData: any) => {
          nodeData.__rd3t.collapsed = !nodeData.__rd3t.collapsed;
          setTreeData([...treeData]);
        }}
      />
    </div>
  );
}

export default TreeGraph;