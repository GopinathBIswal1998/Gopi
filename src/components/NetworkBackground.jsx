// Signature element: an ambient microservices "node network" —
// a visual echo of the REST APIs / microservices this portfolio is about.
const nodes = [
  { x: 90, y: 80 }, { x: 340, y: 40 }, { x: 620, y: 110 }, { x: 860, y: 60 },
  { x: 160, y: 260 }, { x: 460, y: 230 }, { x: 740, y: 280 }, { x: 1020, y: 200 },
  { x: 60, y: 430 }, { x: 320, y: 420 }, { x: 600, y: 400 }, { x: 900, y: 440 },
];

const edges = [
  [0, 1], [1, 2], [2, 3], [1, 5], [4, 5], [5, 6], [6, 7], [4, 8],
  [5, 9], [6, 10], [7, 11], [8, 9], [9, 10], [10, 11], [0, 4], [2, 6],
];

export default function NetworkBackground({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1100 500"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        return (
          <line
            key={i}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="#F2A93B"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="animate-dash"
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="18" fill="#F2A93B" opacity="0.05" />
          <circle
            cx={n.x}
            cy={n.y}
            r="3.5"
            fill={i % 3 === 0 ? "#F2A93B" : "#5FD0C0"}
            className="animate-pulseNode"
            style={{ animationDelay: `${(i * 0.35).toFixed(2)}s` }}
          />
        </g>
      ))}
    </svg>
  );
}
