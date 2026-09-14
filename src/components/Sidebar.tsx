import { LayoutDashboard, Cpu, HardDrive, Wrench, Activity, ShieldAlert } from "lucide-react";
import { cn } from "../lib/utils";

export type PageKey = "dashboard" | "processes" | "system" | "drivers" | "repair" | "activity";

const items: { key: PageKey; label: string; icon: any }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "processes", label: "Processes", icon: Cpu },
  { key: "system",    label: "System",    icon: HardDrive },
  { key: "drivers",   label: "Drivers",   icon: ShieldAlert },
  { key: "repair",    label: "Repair",    icon: Wrench },
  { key: "activity",  label: "Activity",  icon: Activity },
];

export default function Sidebar({ current, onChange }: { current: PageKey; onChange: (k: PageKey) => void }) {
  return (
    <aside className="w-60 shrink-0 border-r border-border bg-panel/40 backdrop-blur-xl p-3 flex flex-col gap-1">
      {items.map(({ key, label, icon: Icon }) => {
        const active = current === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={cn(
              "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              active
                ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-white border border-accent/30 shadow-glow"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent"
            )}
          >
            <Icon size={18} className={active ? "text-accent" : "group-hover:text-accent transition-colors"} />
            <span>{label}</span>
            {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-accent shadow-glow" />}
          </button>
        );
      })}
      <div className="mt-auto text-[11px] text-slate-500 leading-relaxed px-2 py-3 border-t border-border/60">
        <div className="font-semibold text-slate-400">System Guardian</div>
        <div>© Pardeep Singh</div>
        <div className="truncate">PSOFREELANCE / MIT</div>
      </div>
    </aside>
  );
}