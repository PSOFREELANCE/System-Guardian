import { cn, scoreColor } from "../../lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full rounded-full bg-slate-800/80 overflow-hidden", className)}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: `linear-gradient(90deg, ${scoreColor(value)}, #22d3ee)`,
        }}
      />
    </div>
  );
}