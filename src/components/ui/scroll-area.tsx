import * as React from "react";
import * as S from "@radix-ui/react-scroll-area";
import { cn } from "../../lib/utils";

export function ScrollArea({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <S.Root className={cn("overflow-hidden", className)} type="auto">
      <S.Viewport className="w-full h-full pr-3">{children}</S.Viewport>
      <S.Scrollbar orientation="vertical" className="w-2 rounded-full bg-slate-900/60">
        <S.Thumb className="rounded-full bg-slate-600 hover:bg-slate-500 transition-colors" />
      </S.Scrollbar>
    </S.Root>
  );
}