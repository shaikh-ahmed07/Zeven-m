/** Illustrative line-drawn floor plan used as a placeholder until real plans are supplied. */
export function FloorPlan({ label }: { label: string }) {
  const beds = /4/.test(label) ? 4 : /3/.test(label) ? 3 : /2/.test(label) ? 2 : 3;
  const w = 360 / beds;
  return (
    <svg className="floorplan" viewBox="0 0 400 300" role="img" aria-label={`Illustrative floor plan placeholder for ${label}`}>
      <rect x="20" y="20" width="360" height="260" className="fp-outer" />
      {Array.from({ length: beds }, (_, i) => (
        <g key={i}>
          <rect x={20 + i * w} y="20" width={w} height="110" />
          <text x={20 + i * w + w / 2} y="80">
            {i === 0 ? 'MASTER BED' : `BED ${i + 1}`}
          </text>
        </g>
      ))}
      <rect x="20" y="130" width="220" height="150" />
      <text x="130" y="210">LIVING &amp; DINING</text>
      <rect x="240" y="130" width="140" height="80" />
      <text x="310" y="175">KITCHEN</text>
      <rect x="240" y="210" width="140" height="70" />
      <text x="310" y="250">BALCONY</text>
      <path className="fp-door" d="M130 130a24 24 0 0 1 24-24M240 170a20 20 0 0 1 20 20" />
    </svg>
  );
}
