"use client";

import {
  AUTO_COVERAGE_VALUES,
  AUTO_COVERAGES,
  type AutoCoverageValue,
} from "@/content/auto-coverages";
import { cn } from "@/lib/utils";

function normalizeSelection(selected: string[]): AutoCoverageValue[] {
  const set = new Set(
    selected.filter((v): v is AutoCoverageValue =>
      (AUTO_COVERAGE_VALUES as readonly string[]).includes(v),
    ),
  );
  return AUTO_COVERAGE_VALUES.filter((v) => set.has(v));
}

export function CoverageCardsField({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  error?: string;
}) {
  const selected = normalizeSelection(value);
  const allSelected = selected.length === AUTO_COVERAGE_VALUES.length;

  function toggle(optionValue: string, selectsAll?: boolean) {
    if (selectsAll) {
      onChange(allSelected ? [] : [...AUTO_COVERAGE_VALUES]);
      return;
    }

    const exists = selected.includes(optionValue as AutoCoverageValue);
    const next = exists
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue as AutoCoverageValue];
    onChange(normalizeSelection(next));
  }

  return (
    <fieldset className="space-y-3">
      <legend className="sr-only">Coberturas desejadas</legend>
      <div className="grid gap-3">
        {AUTO_COVERAGES.map((option) => {
          const Icon = option.icon;
          const isAll = option.selectsAll;
          const active = isAll
            ? allSelected
            : selected.includes(option.value as AutoCoverageValue);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option.value, option.selectsAll)}
              className={cn(
                "flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200",
                active
                  ? "border-brand-green bg-white shadow-[0_0_0_1px_rgb(16_45_48/0.06)]"
                  : "border-border/80 bg-brand-cream/30 hover:border-brand-green/40",
                isAll && "border-dashed",
              )}
            >
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
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[0.95rem] font-bold tracking-tight text-brand-navy">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">
                  {option.description}
                </span>
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
