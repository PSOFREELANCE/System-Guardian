import { cn } from "../lib/utils";
import type { ReactNode } from "react";

export default function StatusCard({
  title, value, sub, icon, tone = "default",
}: { title: string; value: ReactNode; sub?: string; icon: ReactNode; tone?: "default" | "ok" | "warn" | "danger" }) {
  const toneCls =
    tone === "ok" ? "text-emerald-400 border-emerald-500/30"
    : tone === "warn" ? "text-amber-400 border-amber-500/30"
    : tone === "danger" ? "text-rose-400 border-rose-500/30"
    : "text-cyan-400 border-accent/30";
  return (
    <div className="glass glass-hover p-4 flex items-start gap-4">
      <div className={cn("w-11 h-11 rounded-xl grid place-items-center bg-slate-900/70 border", toneCls)}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">{title}</div>
        <div className="text-lg font-semibold truncate">{value}</div>
        {sub && <div className="text-xs text-slate-500 mt-0.5 truncate">{sub}</div>}
      </div>
    </div>
  );
}