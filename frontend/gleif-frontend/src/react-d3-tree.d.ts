declare module "react-d3-tree" {
  import { ComponentType } from "react";

  interface TreeNodeDatum {
    name: string;
    attributes?: Record<string, string>;
    children?: TreeNodeDatum[];
  }

  interface TreeProps {
    data: TreeNodeDatum | TreeNodeDatum[];
    orientation?: "vertical" | "horizontal";
    collapsible?: boolean;
    translate?: { x: number; y: number };
    pathFunc?: "diagonal" | "elbow" | "step";
    zoomable?: boolean;
    nodeSvgShape?: {
      shape: "circle" | "rect" | "ellipse" | "polygon";
      shapeProps?: Record<string, string | number>;
    };
    [key: string]: unknown; // for additional optional props
  }

  const Tree: ComponentType<TreeProps>;
  export default Tree;
}