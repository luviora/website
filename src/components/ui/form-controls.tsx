import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const controlClass =
  "w-full rounded-xl border border-[color:var(--border-subtle)] bg-white px-4 text-base text-foreground transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-muted-foreground/60 hover:border-brand-green/35 focus-visible:border-brand-green focus-visible:shadow-[var(--shadow-input-focus)] focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50";

/** Label flutuante no topo da borda (modelo Loovi). */
export function FloatingField({
  id,
  label,
  helper,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative pt-2", className)}>
      <label
        htmlFor={id}
        className="absolute left-3 top-0 z-10 bg-white px-1.5 text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {helper && !error ? (
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{helper}</p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormField({
  id,
  label,
  helper,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-brand-ink">
        {label}
      </Label>
      {children}
      {helper && !error ? (
        <p className="text-xs leading-relaxed text-muted-foreground">{helper}</p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const formInputClass = cn(controlClass, "h-14");

export const FormTextInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { error?: boolean }
>(function FormTextInput({ className, error, ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        formInputClass,
        error && "border-destructive/80 focus-visible:border-destructive",
        className,
      )}
      {...rest}
    />
  );
});

export function NativeSelect({
  className,
  error,
  children,
  ...props
}: React.ComponentProps<"select"> & { error?: boolean }) {
  return (
    <div className="relative">
      <select
        className={cn(
          formInputClass,
          "appearance-none pr-11",
          error && "border-destructive/80",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}

export const ConsentCheckbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "type"> & {
    id: string;
    label: string;
    error?: string;
  }
>(function ConsentCheckbox({ id, label, error, className, ...rest }, ref) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer gap-3 rounded-xl border border-border/80 bg-brand-cream/40 p-4 text-sm leading-relaxed text-brand-ink",
        error && "border-destructive/50",
        className,
      )}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="mt-0.5 size-4 shrink-0 rounded border-border accent-brand-green"
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
});
