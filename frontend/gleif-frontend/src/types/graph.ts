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

export type TreeNode = {
  name: string;
  attributes?: Record<string, string>;
  children?: TreeNode[];
  nodeData?: Node;
};