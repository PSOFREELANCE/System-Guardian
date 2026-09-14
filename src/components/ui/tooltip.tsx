import * as React from "react";
import * as T from "@radix-ui/react-tooltip";

export function Tooltip({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <T.Provider delayDuration={200}>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Portal>
          <T.Content sideOffset={6} className="z-50 px-2.5 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-100 border border-border shadow-lg animate-fade-in">
            {label}
            <T.Arrow className="fill-slate-800" />
          </T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  );
}