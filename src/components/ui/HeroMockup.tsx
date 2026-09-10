// Stylized mockup of the app's Dashboard view, built from CSS/SVG tokens —
// not a real screenshot (none exist yet since the app isn't published).
export function HeroMockup() {
  const categories = [
    { label: "Medicine", pct: 100, color: "bg-category-purple" },
    { label: "Exercise", pct: 75, color: "bg-category-green" },
    { label: "Sleep", pct: 50, color: "bg-category-blue" },
  ];

  return (
    <div className="w-full max-w-sm rounded-sheet bg-surface p-6 shadow-card">
      <div className="flex items-center justify-between">
        <span className="font-extrabold text-ink">Today</span>
        <span className="font-mono text-sm font-semibold text-accent">82%</span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <svg viewBox="0 0 36 36" className="h-20 w-20 shrink-0">
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            className="stroke-surface-alt"
            strokeWidth="4"
          />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            stroke="#7A6AB0"
            strokeWidth="4"
            strokeDasharray="97.4"
            strokeDashoffset="17.5"
            strokeLinecap="round"
            transform="rotate(-90 18 18)"
          />
        </svg>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between rounded-chip bg-surface-alt px-3 py-2">
            <span className="text-xs font-semibold text-sub">Day streak</span>
            <span className="font-mono text-sm font-bold text-ink">12</span>
          </div>
          <div className="flex justify-between rounded-chip bg-surface-alt px-3 py-2">
            <span className="text-xs font-semibold text-sub">Tasks</span>
            <span className="font-mono text-sm font-bold text-ink">5/6</span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {categories.map((c) => (
          <div key={c.label}>
            <div className="mb-1 flex justify-between text-xs font-semibold text-sub">
              <span>{c.label}</span>
              <span className="font-mono">{c.pct}%</span>
            </div>
            <div className="h-[5px] w-full overflow-hidden rounded-full bg-surface-alt">
              <div
                className={`h-full rounded-full ${c.color}`}
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
