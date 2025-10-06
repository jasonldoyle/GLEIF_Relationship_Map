type CustomTreeNodeProps = {
  nodeDatum: any;
  onSelectNode: (node: any | null) => void;
};

// split a long name into up to two readable lines
function splitLabel(s: string, max = 26): [string, string?] {
  if (s.length <= max) return [s];
  const cut = s.lastIndexOf(" ", max);
  const line1 = s.slice(0, cut > 12 ? cut : max);
  const line2 = s.slice(line1.length).trim();
  return [line1, line2];
}

const CustomTreeNode = ({ nodeDatum, onSelectNode }: CustomTreeNodeProps) => {
  const isRoot = !nodeDatum.parent;
  const original = nodeDatum.nodeData ?? nodeDatum.data?.nodeData ?? null;

  const name =
    nodeDatum.name ||
    original?.name ||
    nodeDatum.attributes?.lei ||
    "Unknown";

  const lei = nodeDatum.attributes?.lei;
  const country = nodeDatum.attributes?.country;

  // Card sizing
  const W = 300;
  const H = 92;
  const R = 12;

  // Softer, accessible palette
  const palette = isRoot
    ? {
        fill: "#eef2ff",     // indigo-50
        stroke: "#6366f1",   // indigo-500
        name: "#0f172a",     // slate-950
        meta1: "#334155",    // slate-700
        meta2: "#475569",    // slate-600
      }
    : {
        fill: "#ffffff",
        stroke: "#e5e7eb",   // gray-200
        name: "#111827",     // gray-900
        meta1: "#374151",    // gray-700
        meta2: "#6b7280",    // gray-500
      };

  const [line1, line2] = splitLabel(name, 28);

  return (
    <g onClick={() => onSelectNode(original)} style={{ cursor: "pointer" }}>
      {/* Card */}
      <rect
        width={W}
        height={H}
        x={-W / 2}
        y={-H / 2}
        rx={R}
        ry={R}
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth={1.5}
        filter="url(#shadow-sm)"
      />

      {/* Name (two lines if needed) */}
      <text
        x={0}
        y={line2 ? -14 : -8}
        textAnchor="middle"
        fontWeight="100"
        fill={palette.name}
              >
        {line1}
      </text>
      {line2 && (
        <text
          x={0}
          y={2}
          textAnchor="middle"
            fontWeight="200"
          fill={palette.name}
        >
          {line2}
        </text>
      )}

      {/* LEI */}
      {lei && (
        <text
          x={0}
          y={line2 ? 20 : 12}
          textAnchor="middle"
            fontWeight="200"
          fill={palette.meta1}
        >
          LEI: {lei}
        </text>
      )}

      {/* Country */}
      {country && (
        <text
          x={0}
          y={line2 ? 36 : 28}
          textAnchor="middle"
          fill={palette.meta2}
        >
          {country}
        </text>
      )}

      {/* Subtle shadow (defined once per SVG) */}
      <defs>
        <filter id="shadow-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodOpacity="0.12" />
        </filter>
      </defs>
    </g>
  );
};

export default CustomTreeNode;