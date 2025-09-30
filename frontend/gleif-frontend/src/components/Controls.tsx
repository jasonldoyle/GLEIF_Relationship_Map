type Props = {
  lei: string;
  setLei: (v: string) => void;
  fetchGraph: () => void;
  loading: boolean;
};

export default function Controls({ lei, setLei, fetchGraph, loading }: Props) {
  return (
    <div style={{ padding: "1rem", background: "#f4f4f9", color: "#222" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>LEI Graph Viewer</h1>
      <input
        type="text"
        placeholder="Enter LEI"
        value={lei}
        onChange={(e) => setLei(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", fontSize: "1rem" }}
      />
      <button
        onClick={fetchGraph}
        style={{
          marginLeft: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          background: "#222",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Fetch Graph
      </button>
      {loading && <p>Loading...</p>}
    </div>
  );
}