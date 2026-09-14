import { useEffect, useState } from "react";
import { scoreColor } from "../lib/utils";

export default function HealthScore({ score, size = 200 }: { score: number; size?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const from = display;
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (score - from) * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = scoreColor(display);

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#1e293b" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * display) / 100}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1), stroke 0.4s", filter: `drop-shadow(0 0 10px ${color}90)` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-5xl font-extrabold tracking-tighter" style={{ color }}>{display}</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mt-1">Health Score</div>
        </div>
      </div>
      <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ boxShadow: `0 0 40px ${color}40` }} />
    </div>
  );
}