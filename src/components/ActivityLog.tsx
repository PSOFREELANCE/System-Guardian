import { Activity as ActivityIcon, Trash2 } from "lucide-react";
import { useActivityLog } from "../hooks/useActivityLog";
import { ScrollArea } from "./ui/scroll-area";

const tone: Record<string, string> = {
  info: "text-cyan-400", success: "text-emerald-400",
  warn: "text-amber-400", error: "text-rose-400",
};

export default function ActivityLog() {
  const { events, clear } = useActivityLog();
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><ActivityIcon size={22} className="text-accent" /> Activity Log</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time event feed from System Guardian.</p>
        </div>
        <button className="btn-ghost" onClick={clear}><Trash2 size={15} /> Clear</button>
      </div>

      <div className="glass overflow-hidden">
        <ScrollArea className="h-[calc(100vh-240px)]">
          {events.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500">No events yet.</div>
          ) : events.map((e) => (
            <div key={e.id} className="flex items-start gap-3 px-5 py-3 border-b border-border/40 hover:bg-slate-800/40 transition-colors">
              <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-current ${tone[e.level]}`} />
              <span className="text-xs text-slate-500 font-mono w-20 shrink-0">{new Date(e.time * 1000).toLocaleTimeString()}</span>
              <span className={`text-xs uppercase w-16 shrink-0 tracking-wider ${tone[e.level]}`}>{e.level}</span>
              <span className="text-sm flex-1">{e.message}</span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}