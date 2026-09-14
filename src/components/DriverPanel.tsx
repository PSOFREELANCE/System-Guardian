import { useEffect, useState } from "react";
import { ShieldAlert, RefreshCw, CheckCircle2, AlertTriangle, XCircle, HelpCircle } from "lucide-react";
import { api } from "../lib/ipc";
import type { DriverInfo } from "../lib/types";

const iconFor = (s: DriverInfo["status"]) => ({
  ok: <CheckCircle2 size={16} className="text-emerald-400" />,
  warning: <AlertTriangle size={16} className="text-amber-400" />,
  error: <XCircle size={16} className="text-rose-400" />,
  unknown: <HelpCircle size={16} className="text-slate-400" />,
}[s]);

export default function DriverPanel() {
  const [drivers, setDrivers] = useState<DriverInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setDrivers(await api.drivers()); } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><ShieldAlert size={22} className="text-accent" /> Drivers</h1>
          <p className="text-slate-400 text-sm mt-1">{drivers.length} devices detected · {drivers.filter(d => d.status !== "ok").length} need attention</p>
        </div>
        <button className="btn-ghost" onClick={load} disabled={loading}>
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="glass divide-y divide-border/60 overflow-hidden">
        {drivers.map((d, i) => (
          <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-800/40 transition-colors">
            <div className="w-10 h-10 rounded-xl grid place-items-center bg-slate-900/70 border border-border">{iconFor(d.status)}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{d.name}</div>
              <div className="text-xs text-slate-500 font-mono truncate">{d.device_id} · v{d.version} · {d.date}</div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 border border-border text-slate-300">{d.vendor}</span>
          </div>
        ))}
        {!drivers.length && !loading && (
          <div className="p-10 text-center text-slate-500 text-sm">No driver data available.</div>
        )}
      </div>
    </div>
  );
}