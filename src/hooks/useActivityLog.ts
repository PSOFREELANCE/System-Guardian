import { useCallback, useState } from "react";
import type { ActivityEvent } from "../lib/types";

export function useActivityLog() {
  const [events, setEvents] = useState<ActivityEvent[]>([
    { id: "1", time: Date.now() / 1000, level: "info", message: "System Guardian started" },
  ]);

  const log = useCallback((message: string, level: ActivityEvent["level"] = "info") => {
    setEvents((prev) => [
      { id: crypto.randomUUID(), time: Date.now() / 1000, level, message },
      ...prev,
    ].slice(0, 200));
  }, []);

  const clear = useCallback(() => setEvents([]), []);

  return { events, log, clear };
}