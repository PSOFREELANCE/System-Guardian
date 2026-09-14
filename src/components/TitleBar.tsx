import { Minus, Square, X, ShieldCheck } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const isTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

export default function TitleBar() {
  const win = isTauri ? getCurrentWindow() : null;
  return (
    <header className="drag-region h-11 flex items-center justify-between px-4 border-b border-border bg-panel/60 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 select-none">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center shadow-glow">
          <ShieldCheck size={16} className="text-white" />
        </div>
        <span className="font-semibold tracking-tight">System Guardian</span>
        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/30">v1.0</span>
      </div>
      <div className="no-drag flex items-center gap-1">
        <button onClick={() => win?.minimize()} className="p-2 rounded-md hover:bg-slate-800/70 transition-colors"><Minus size={14} /></button>
        <button onClick={() => win?.toggleMaximize()} className="p-2 rounded-md hover:bg-slate-800/70 transition-colors"><Square size={12} /></button>
        <button onClick={() => win?.close()} className="p-2 rounded-md hover:bg-rose-600/80 transition-colors"><X size={14} /></button>
      </div>
    </header>
  );
}