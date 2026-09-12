type LineArtProps = {
  name: "framing" | "drywall" | "ceiling" | "sound";
  className?: string;
};

export default function LineArt({ name, className = "" }: LineArtProps) {
  const art = {
    framing: <FramingArt />,
    drywall: <DrywallArt />,
    ceiling: <CeilingArt />,
    sound: <SoundArt />,
  }[name];

  return (
    <div className={`relative flex aspect-square items-center justify-center overflow-hidden bg-gypsum ${className}`}>
      <div className="stud-grid absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_47.6%,rgba(145,221,211,0.95)_47.6%,rgba(145,221,211,0.95)_48.4%,transparent_48.4%)] opacity-70" />
      <svg
        viewBox="0 0 320 320"
        className="relative z-10 h-[78%] w-[78%] text-ink"
        fill="none"
        aria-hidden="true"
      >
        {art}
      </svg>
    </div>
  );
}

function FramingArt() {
  return (
    <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="miter">
      <rect x="46" y="42" width="228" height="236" />
      <line x1="46" y1="68" x2="274" y2="68" />
      <line x1="46" y1="252" x2="274" y2="252" />
      {[70, 106, 142, 178, 214, 250].map((x) => (
        <g key={x}>
          <line x1={x} y1="68" x2={x} y2="252" />
          <line x1={x - 5} y1="68" x2={x + 5} y2="68" />
          <line x1={x - 5} y1="252" x2={x + 5} y2="252" />
        </g>
      ))}
      <line x1="46" y1="160" x2="274" y2="160" stroke="#5fc4b8" strokeWidth="2" />
      <circle cx="70" cy="68" r="3.5" fill="#91ddd3" stroke="none" />
      <circle cx="250" cy="252" r="3.5" fill="#91ddd3" stroke="none" />
    </g>
  );
}

function DrywallArt() {
  return (
    <g stroke="currentColor" strokeWidth="1.6">
      <rect x="58" y="78" width="168" height="196" transform="rotate(-8 58 78)" />
      <rect x="78" y="62" width="168" height="196" transform="rotate(-4 78 62)" />
      <rect x="96" y="48" width="168" height="196" />
      {[72, 104, 136, 168, 200].map((y) => (
        <g key={y}>
          <circle cx="124" cy={y} r="2.2" fill="#91ddd3" stroke="none" />
          <circle cx="176" cy={y} r="2.2" fill="#91ddd3" stroke="none" />
          <circle cx="228" cy={y} r="2.2" fill="#91ddd3" stroke="none" />
        </g>
      ))}
      <line x1="96" y1="146" x2="264" y2="146" stroke="#5fc4b8" strokeWidth="2" />
    </g>
  );
}

function CeilingArt() {
  return (
    <g stroke="currentColor" strokeWidth="1.5">
      <rect x="44" y="52" width="232" height="216" />
      {[98, 152, 206, 260].map((x) => (
        <line key={`v-${x}`} x1={x} y1="52" x2={x} y2="268" />
      ))}
      {[106, 160, 214].map((y) => (
        <line key={`h-${y}`} x1="44" y1={y} x2="276" y2={y} />
      ))}
      <rect x="104" y="112" width="42" height="42" fill="#c5f0ea" stroke="currentColor" />
      <rect x="158" y="166" width="42" height="42" fill="#c5f0ea" stroke="currentColor" />
      <line x1="44" y1="52" x2="276" y2="268" stroke="#5fc4b8" strokeWidth="2" />
    </g>
  );
}

function SoundArt() {
  return (
    <g stroke="currentColor" strokeWidth="1.6">
      <rect x="86" y="46" width="28" height="228" />
      <rect x="114" y="46" width="18" height="228" fill="#c5f0ea" stroke="currentColor" />
      <rect x="132" y="46" width="28" height="228" />
      {[86, 100, 132, 146].map((x) =>
        [70, 102, 134, 166, 198, 230].map((y) => (
          <line key={`${x}-${y}`} x1={x} y1={y} x2={x + 14} y2={y} strokeWidth="1" />
        ))
      )}
      <path d="M188 110c22 18 22 82 0 100" stroke="#5fc4b8" strokeWidth="2" />
      <path d="M210 88c36 28 36 116 0 144" stroke="#5fc4b8" strokeWidth="2" />
      <path d="M232 66c50 38 50 150 0 188" stroke="#5fc4b8" strokeWidth="2" />
    </g>
  );
}
