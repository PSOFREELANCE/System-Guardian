import { useState } from "react";
import { Wrench, ShieldCheck, Trash2, Network, Terminal, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { api } from "../lib/ipc";
import type { RepairResult } from "../lib/types";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

interface Action { id: string; label: string; description: string; icon: any; danger?: boolean; }

const actions: Action[] = [
  { id: "sfc", label: "System File Check (SFC)", description: "Scans and repairs corrupted Windows system files.", icon: ShieldCheck },
  { id: "dism", label: "DISM RestoreHealth", description: "Repairs the Windows component store image.", icon: Wrench },
  { id: "chkdsk", label: "Disk Check (CHKDSK)", description: "Checks the system drive for file system errors.", icon: ShieldCheck },
  { id: "cleanup_temp", label: "Clean Temp Files", description: "Removes temporary files from Windows and user folders.", icon: Trash2 },
  { id: "flush_dns", label: "Flush DNS", description: "Clears DNS resolver cache to fix network issues.", icon: Network },
];

export default function RepairPanel() {
  const [running, setRunning] = useState<string | null>(null);
  const [results, setResults] = useState<RepairResult[]>([]);

  const run = async (id: string) => {
    setRunning(id);
    try {
      const fn = id === "cleanup_temp" ? api.cleanupTemp : id === "flush_dns" ? api.flushDns : () => api.runRepair(id);
      const r = await fn();
      setResults((prev) => [r, ...prev]);
    } catch (e: any) {
      setResults((prev) => [{ action: id, success: false, output: String(e), duration_ms: 0 }, ...prev]);
    } finally { setRunning(null); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Wrench size={22} className="text-accent" /> Repair Center</h1>
        <p className="text-slate-400 text-sm mt-1">One-click maintenance actions to keep your PC healthy. Administrator privileges required for system-level fixes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((a) => {
          const Icon = a.icon;
          const busy = running === a.id;
          return (
            <div key={a.id} className="glass glass-hover p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl grid place-items-center bg-slate-900/70 border border-accent/30 text-accent"><Icon size={20} /></div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{a.label}</div>
                <div className="text-xs text-slate-400 mt-1">{a.description}</div>
                <div className="mt-3 flex gap-2">
                  <button className="btn-primary !py-2 !px-3 text-xs" disabled={busy || running !== null} onClick={() => run(a.id)}>
                    {busy ? <><Loader2 size={14} className="animate-spin" /> Running…</> : "Run"}
                  </button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="btn-ghost !py-2 !px-3 text-xs"><Terminal size={14} /> Details</button>
                    </DialogTrigger>
                    <DialogContent title={a.label}>
                      <p className="text-sm text-slate-400">{a.description}</p>
                      <p className="mt-4 text-xs text-slate-500">Command executed with elevated privileges via Tauri shell plugin.</p>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass p-6">
        <div className="flex items-center gap-2 mb-4"><Terminal size={18} className="text-accent" /><h2 className="font-semibold">Recent Results</h2></div>
        {results.length === 0 ? (
          <div className="text-sm text-slate-500 py-6 text-center">No repairs run yet this session.</div>
        ) : (
          <ul className="space-y-3">
            {results.map((r, i) => (
              <li key={i} className="rounded-xl border border-border/60 bg-slate-900/40 p-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {r.success ? <CheckCircle2 size={15} className="text-emerald-400" /> : <XCircle size={15} className="text-rose-400" />}
                  <span>{r.action}</span>
                  <span className="ml-auto text-xs text-slate-500 font-mono">{r.duration_ms} ms</span>
                </div>
                <pre className="mt-2 text-xs text-slate-400 whitespace-pre-wrap font-mono max-h-40 overflow-auto">{r.output}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}