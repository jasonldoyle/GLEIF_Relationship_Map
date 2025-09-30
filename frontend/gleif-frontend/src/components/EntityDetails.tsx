import { Node } from "../types/graph";

type Props = {
  selectedNode: Node | null;
};

export default function EntityDetails({ selectedNode }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
        Entity Details
      </h2>
      {selectedNode ? (
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {selectedNode.name}</p>
          <p><strong>LEI:</strong> {selectedNode.id}</p>
          <p><strong>Country:</strong> {selectedNode.country}</p>
          <p><strong>Jurisdiction:</strong> {selectedNode.jurisdiction || "Unknown"}</p>
          <p><strong>Status:</strong> {selectedNode.status || "Unknown"}</p>
          <p><strong>Legal Form:</strong> {selectedNode.legal_form || "Unknown"}</p>
          <p><strong>Registration Date:</strong> {selectedNode.registration_date || "N/A"}</p>
          <p><strong>Last Update:</strong> {selectedNode.last_update || "N/A"}</p>
          <p><strong>Next Renewal:</strong> {selectedNode.next_renewal || "N/A"}</p>
        </div>
      ) : (
        <p className="text-gray-400">Click a node to see details here.</p>
      )}
    </div>
  );
}