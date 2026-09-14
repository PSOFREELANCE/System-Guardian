import { useEffect, useState } from "react";
import { Cpu, HardDrive, MemoryStick, Monitor, Network, Info } from "lucide-react";
import StatusCard from "./StatusCard";
import { Progress } from "./ui/progress";
import { api } from "../lib/ipc";
import { formatBytes, formatUptime } from "../lib/utils";
import type { SystemInfo as Info_t } from "../lib/types";

export default function SystemInfo() {
  const [info, setInfo] = useState<Info_t | null>(null);
  useEffect(() => {
    api.systemInfo().then(setInfo);
    const id = setInterval(() => api.systemInfo().then(setInfo), 3000);
    return () => clearInterval(id);
  }, []);

  const memPct = info ? (info.used_memory / info.total_memory) * 100 : 0;
  const swapPct = info && info.total_swap ? (info.used_swap / info.total_swap) * 100 : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">System Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatusCard title="Operating System" value={info?.os_name ?? "—"} sub={info?.os_version} icon={<Monitor size={20} />} />
        <StatusCard title="Hostname" value={info?.hostname ?? "—"} sub={`Arch: ${info?.arch}`} icon={<Network size={20} />} />
        <StatusCard title="Uptime" value={info ? formatUptime(info.uptime) : "—"} sub={`Kernel ${info?.kernel ?? ""}`} icon={<Info size={20} />} />
        <StatusCard title="CPU Threads" value={String(info?.cpu_cores ?? "—")} sub={info?.cpu_brand} icon={<Cpu size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 space-y-5">
          <div className="flex items-center gap-2"><MemoryStick size={18} className="text-accent" /><h2 className="font-semibold">Memory</h2></div>
          <div>
            <div className="flex justify-between text-sm mb-2"><span className="text-slate-400">RAM</span><span className="font-mono">{info ? `${formatBytes(info.used_memory)} / ${formatBytes(info.total_memory)}` : "—"}</span></div>
            <Progress value={memPct} />
            <div className="text-xs text-slate-500 mt-1">{memPct.toFixed(1)}% used</div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2"><span className="text-slate-400">Swap</span><span className="font-mono">{info ? `${formatBytes(info.used_swap)} / ${formatBytes(info.total_swap)}` : "—"}</span></div>
            <Progress value={swapPct} />
            <div className="text-xs text-slate-500 mt-1">{swapPct.toFixed(1)}% used</div>
          </div>
        </div>

        <div className="glass p-6 space-y-4">
          <div className="flex items-center gap-2"><HardDrive size={18} className="text-accent" /><h2 className="font-semibold">Storage</h2></div>
          <p className="text-sm text-slate-400">Mount & disk details are read via <code className="text-accent">sysinfo::Disks</code> in the Rust backend.</p>
          <div className="text-xs text-slate-500 space-y-1">
            <div>• Drive enumeration</div>
            <div>• Free / total per volume</div>
            <div>• SMART status (WMI on Windows)</div>
          </div>
        </div>
      </div>
    </div>
  );
}