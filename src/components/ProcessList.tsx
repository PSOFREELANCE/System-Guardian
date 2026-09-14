import { useEffect, useMemo, useState } from "react";
import { Search, Cpu as CpuIcon } from "lucide-react";
import { api } from "../lib/ipc";
import { formatBytes } from "../lib/utils";
import type { ProcessInfo } from "../lib/types";
import { ScrollArea } from "./ui/scroll-area";

export default function ProcessList() {
  const [procs, setProcs] = useState<ProcessInfo[]>([]);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"cpu" | "memory" | "name">("cpu");

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const p = await api.processes(120);
      if (alive) setProcs(p);
    };
    load();
    const id = setInterval(load, 2500);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const filtered = useMemo(() => {
    const list = procs.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    list.sort((a, b) =>
      sort === "cpu" ? b.cpu_usage - a.cpu_usage
      : sort === "memory" ? b.memory - a.memory
      : a.name.localeCompare(b.name)
    );
    return list;
  }, [procs, q, sort]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><CpuIcon size={22} className="text-accent" /> Processes</h1>
          <p className="text-slate-400 text-sm mt-1">{filtered.length} running · live updates every 2.5s</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search process…"
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-900/60 border border-border focus:border-accent/60 focus:outline-none text-sm w-64 transition-colors"
            />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-900/60 border border-border text-sm focus:outline-none focus:border-accent/60">
            <option value="cpu">Sort: CPU</option>
            <option value="memory">Sort: Memory</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>
      </div>

      <div className="glass overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_120px_140px] px-5 py-3 text-[11px] uppercase tracking-wider text-slate-400 border-b border-border bg-slate-900/40">
          <span>PID</span><span>Name</span><span className="text-right">CPU %</span><span className="text-right">Memory</span>
        </div>
        <ScrollArea className="h-[calc(100vh-260px)]">
          {filtered.map((p) => (
            <div key={p.pid} className="grid grid-cols-[80px_1fr_120px_140px] px-5 py-2.5 text-sm hover:bg-slate-800/40 transition-colors border-b border-border/40">
              <span className="font-mono text-slate-500">{p.pid}</span>
              <span className="truncate">{p.name}</span>
              <span className={"text-right font-mono " + (p.cpu_usage > 30 ? "text-amber-400" : "text-slate-300")}>{p.cpu_usage.toFixed(1)}</span>
              <span className="text-right font-mono text-slate-300">{formatBytes(p.memory)}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}