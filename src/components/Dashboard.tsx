import { useEffect, useState } from "react";
import { Activity, Cpu, HardDrive, MemoryStick, ShieldCheck, Wrench, AlertTriangle } from "lucide-react";
import HealthScore from "./HealthScore";
import StatusCard from "./StatusCard";
import { api } from "../lib/ipc";
import { formatBytes, formatUptime } from "../lib/utils";
import type { SystemInfo } from "../lib/types";
import type { PageKey } from "./Sidebar";
import { useSystemHealth } from "../hooks/useSystemHealth";

export default function Dashboard({ onNavigate }: { onNavigate: (k: PageKey) => void }) {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const { report } = useSystemHealth();

  useEffect(() => {
    api.systemInfo().then(setInfo).catch(() => {});
    const id = setInterval(() => api.systemInfo().then(setInfo).catch(() => {}), 4000);
    return () => clearInterval(id);
  }, []);

  const memPct = info ? (info.used_memory / info.total_memory) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back 👋</h1>
        <p className="text-slate-400 text-sm mt-1">Here's the health of your system right now.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass p-6 flex flex-col items-center justify-center lg:col-span-1">
          <HealthScore score={report?.score ?? 0} />
          <div className="mt-4 flex gap-2">
            <button className="btn-primary" onClick={() => onNavigate("repair")}>
              <Wrench size={16} /> Fix Issues
            </button>
            <button className="btn-ghost" onClick={() => onNavigate("dashboard")}>Refresh</button>
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusCard title="CPU" value={info?.cpu_brand.split(" ").slice(0, 3).join(" ") ?? "—"} sub={`${info?.cpu_cores ?? 0} threads • ${info?.arch ?? ""}`} icon={<Cpu size={20} />} />
          <StatusCard title="Memory" value={info ? `${formatBytes(info.used_memory)} / ${formatBytes(info.total_memory)}` : "—"} sub={`${memPct.toFixed(0)}% used`} icon={<MemoryStick size={20} />} tone={memPct > 85 ? "warn" : "default"} />
          <StatusCard title="Uptime" value={info ? formatUptime(info.uptime) : "—"} sub={info?.hostname} icon={<Activity size={20} />} />
          <StatusCard title="OS" value={info?.os_name ?? "—"} sub={info?.os_version} icon={<HardDrive size={20} />} />
        </div>
      </div>

      <div className="glass p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-400" />
            <h2 className="font-semibold">Detected Issues</h2>
          </div>
          <span className="text-xs text-slate-400">{report?.issues.length ?? 0} issue(s)</span>
        </div>
        {report?.issues.length ? (
          <ul className="space-y-3">
            {report.issues.map((i) => (
              <li key={i.id} className="flex items-start gap-3 p-3 rounded-xl border border-border/60 bg-slate-900/40 hover:border-accent/40 transition-colors">
                <span className={
                  "mt-1 w-2 h-2 rounded-full shrink-0 " +
                  (i.severity === "critical" ? "bg-rose-500 animate-pulse"
                    : i.severity === "high" ? "bg-rose-400"
                    : i.severity === "medium" ? "bg-amber-400" : "bg-emerald-400")
                } />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{i.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{i.description}</div>
                </div>
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-slate-800 border border-border text-slate-400">{i.category}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-3 text-emerald-400 text-sm py-6">
            <ShieldCheck size={20} /> All clear — no issues detected.
          </div>
        )}
      </div>
    </div>
  );
}