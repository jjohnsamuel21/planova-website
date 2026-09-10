export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-chip bg-pill-bg px-3 py-1 text-sm font-semibold text-pill-text">
      {children}
    </span>
  );
}
