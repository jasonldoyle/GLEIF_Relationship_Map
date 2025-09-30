import { Graph, TreeNode } from "../types/graph";

export function buildTree(graph: Graph): TreeNode | null {
  if (!graph.nodes.length) return null;

  const nodeMap: Record<string, TreeNode> = {};
  graph.nodes.forEach((n) => {
    nodeMap[n.id] = {
      name: n.name,
      attributes: { LEI: n.id, Country: n.country },
      children: [],
      nodeData: n,
    };
  });

  const childrenSet = new Set<string>();
  graph.links.forEach((link) => {
    const parent = nodeMap[link.source];
    const child = nodeMap[link.target];
    if (parent && child) {
      parent.children!.push(child);
      childrenSet.add(child.name);
    }
  });

  const rootNode = graph.nodes.find((n) => !childrenSet.has(n.name));
  return rootNode ? nodeMap[rootNode.id] : null;
}