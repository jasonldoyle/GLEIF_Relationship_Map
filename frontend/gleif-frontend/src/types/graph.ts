// --------------------
// Raw graph structures
// --------------------
export type Node = {
  id: string;
  name: string;
  country: string;
  jurisdiction?: string;
  status?: string;
  legal_form?: string;
  registration_date?: string;
  last_update?: string;
  next_renewal?: string;
};

export type Link = {
  source: string;
  target: string;
};

export type Graph = {
  nodes: Node[];
  links: Link[];
};

// --------------------
// Tree structure
// --------------------
export type TreeNodeAttributes = {
  lei: string;
  country: string;
  status: string;
  legal_form: string;
  registration_date: string;
  last_update: string;
  next_renewal: string;
};

export type TreeNode = {
  name: string;
  attributes: TreeNodeAttributes;
  children: TreeNode[];
  nodeData: Node;
};