export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-chip border border-void-border bg-void-elevated/80 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.15em] text-glow-amber">
      {children}
    </span>
  );
}
