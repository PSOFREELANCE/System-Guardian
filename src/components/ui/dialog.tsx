import * as React from "react";
import * as D from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export function DialogContent({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <D.Portal>
      <D.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in" />
      <D.Content className={cn("fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[min(680px,92vw)] glass p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          {title && <D.Title className="text-lg font-semibold">{title}</D.Title>}
          <D.Close className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors"><X size={16} /></D.Close>
        </div>
        {children}
      </D.Content>
    </D.Portal>
  );
}