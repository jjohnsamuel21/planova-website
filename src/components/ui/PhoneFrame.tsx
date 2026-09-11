import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[300px] rounded-[2.5rem] border-4 border-void-border bg-void-elevated p-2 shadow-[0_0_60px_rgba(232,163,61,0.15)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-void" />
      <div
        className={`min-h-[560px] overflow-hidden rounded-[2rem] bg-[#0C1220] p-4 ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
