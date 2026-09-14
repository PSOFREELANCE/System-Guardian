import * as React from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "ghost" | "danger";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}
export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }, ref) => {
    const base =
      variant === "primary" ? "btn-primary"
      : variant === "danger"
        ? "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-500 text-white font-semibold shadow-lg shadow-rose-500/20 hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50"
        : "btn-ghost";
    return <button ref={ref} className={cn(base, className)} {...props} />;
  }
);
Button.displayName = "Button";