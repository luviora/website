"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChoiceCardOption = {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
};

export function ChoiceCardsField({
  legend,
  options,
  value,
  onChange,
  error,
}: {
  legend: string;
  options: ChoiceCardOption[];
  value: string;
  onChange: (next: string) => void;
  error?: string;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-brand-navy">{legend}</legend>
      <div className="grid gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-[border-color,background-color] duration-200",
                active
                  ? "border-brand-green bg-white"
                  : "border-border/80 bg-brand-cream/30 hover:border-brand-green/40",
              )}
            >
              {Icon ? (
                <span
                  className={cn(
                    "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl",
                    active
                      ? "bg-brand-mint text-brand-navy"
                      : "bg-white text-brand-green",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[0.95rem] font-bold tracking-tight text-brand-navy">
                  {option.label}
                </span>
                {option.description ? (
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                    {option.description}
                  </span>
                ) : null}
              </span>
              <span
                className={cn(
                  "mt-1 size-5 shrink-0 rounded-full border-2",
                  active
                    ? "border-brand-green bg-brand-green"
                    : "border-border bg-white",
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function YesNoField({
  legend,
  helper,
  value,
  onChange,
  error,
}: {
  legend: string;
  helper?: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
}) {
  const options = [
    { value: "yes", label: "Sim" },
    { value: "no", label: "Não" },
  ];

  return (
    <fieldset className="space-y-2.5">
      <legend className="text-sm font-semibold text-brand-navy">{legend}</legend>
      {helper ? (
        <p className="text-xs leading-relaxed text-muted-foreground">{helper}</p>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "h-12 rounded-xl border text-sm font-semibold transition-[border-color,background-color,color] duration-200",
                active
                  ? "border-brand-green bg-brand-mint text-brand-navy"
                  : "border-border/80 bg-white text-brand-ink hover:border-brand-green/40",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
