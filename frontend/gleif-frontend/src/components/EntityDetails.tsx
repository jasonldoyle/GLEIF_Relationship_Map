import { Node } from "../types/graph";

type Props = {
  selectedNode: Node | null;
};

export default function EntityDetails({ selectedNode }: Props) {
  return (
    <div
      style={{
        flex: 1,
        background: "#222",
        color: "white",
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      <h2 style={{ borderBottom: "1px solid #444", paddingBottom: "0.5rem" }}>
        Entity Details
      </h2>
      {selectedNode ? (
        <div>
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
        <p style={{ color: "#aaa" }}>Click a node to see details here.</p>
      )}
    </div>
  );
}