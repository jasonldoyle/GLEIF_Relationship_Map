import { Graph, TreeNode } from "../types/graph";

/**
 * Build a clean, acyclic, deduped tree from a general graph.
 * - Each entity appears ONCE in the tree (subsequent references are dropped).
 * - Duplicate edges (same source->target) are ignored.
 * - The root is the ultimate ancestor if one exists; otherwise the queried LEI.
 */
export function buildTree(graph: Graph, startLei: string): TreeNode | null {
  if (!graph || !graph.nodes || graph.nodes.length === 0) return null;

  // ---- De-dupe edges (some datasets repeat edges) ----
  const uniqueEdges: { source: string; target: string }[] = [];
  const edgeSet = new Set<string>();
  for (const l of graph.links) {
    const key = `${l.source}->${l.target}`;
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      uniqueEdges.push({ source: l.source, target: l.target });
    }
  }

  // ---- Build node map (keeps original node for details) ----
const nodeMap: Record<string, TreeNode> = {};
for (const n of graph.nodes) {
  nodeMap[n.id] = {
    name: n.name,
    attributes: {
      lei: n.id,
      country: n.country ?? "Unknown",
      status: n.status ?? "Unknown",
      legal_form: n.legal_form ?? "Unknown",
      registration_date: n.registration_date ?? "N/A",
      last_update: n.last_update ?? "N/A",
      next_renewal: n.next_renewal ?? "N/A",
    },
    children: [],
    nodeData: n,
  };
}

  // ---- Parent/child maps for fast lookups ----
  const parentsOf = new Map<string, Set<string>>();
  const childrenOf = new Map<string, Set<string>>();

  for (const { source, target } of uniqueEdges) {
    if (!parentsOf.has(target)) parentsOf.set(target, new Set());
    parentsOf.get(target)!.add(source);

    if (!childrenOf.has(source)) childrenOf.set(source, new Set());
    childrenOf.get(source)!.add(target);
  }

  // ---- Find ultimate ancestor (node that has no parents) ----
  const allChildren = new Set(Array.from(parentsOf.keys()));
  let rootId = graph.nodes.find((n) => !allChildren.has(n.id))?.id;

  // If there isn't a pure ancestor, bubble up from the queried LEI
  if (!rootId) {
    let cur = startLei || graph.nodes[0].id;
    const seen = new Set<string>();
    while (parentsOf.get(cur)?.size && !seen.has(cur)) {
      seen.add(cur);
      // pick any parent (if multiple) — could add rules here if needed
      cur = Array.from(parentsOf.get(cur)!).find(Boolean)!;
    }
    rootId = cur;
  }

  if (!rootId || !nodeMap[rootId]) return null;

  // ---- DFS build with visited guard (drop subsequent occurrences) ----
  const visited = new Set<string>();
  const build = (id: string): TreeNode | null => {
    const base = nodeMap[id];
    if (!base) return null;
    if (visited.has(id)) return null; // drop re-appearance for a clean tree
    visited.add(id);

    const kids = Array.from(childrenOf.get(id) ?? []);
    // Optional: sort children by name for consistent layout
    kids.sort((a, b) => (nodeMap[a]?.name || a).localeCompare(nodeMap[b]?.name || b));

    base.children = kids
      .map((childId) => build(childId))
      .filter((c): c is TreeNode => !!c);

    return base;
  };

  return build(rootId);
}