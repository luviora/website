"use client";

import { useCallback, useState } from "react";
import {
  Check,
  FileCheck2,
  Handshake,
  Layers3,
  MessageCircleHeart,
} from "lucide-react";
import { siteCopy } from "@/content/site-copy";
import { cn } from "@/lib/utils";

const icons = [Layers3, MessageCircleHeart, FileCheck2, Handshake] as const;

export function ClarityPipeline() {
  const { trust } = siteCopy;
  const [active, setActive] = useState(0);
  const steps = trust.items;
  const progressPct =
    steps.length <= 1 ? 100 : (active / (steps.length - 1)) * 100;

  const onKey = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(index);
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(steps.length - 1, i + 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      }
      if (e.key === "Home") {
        e.preventDefault();
        setActive(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        setActive(steps.length - 1);
      }
    },
    [steps.length],
  );

  const activeStep = steps[active]!;
  const ActiveIcon = icons[active] ?? Layers3;

  return (
    <div className="mt-12">
      <p className="text-sm text-muted-foreground">{trust.pipelineHint}</p>

      <div
        className="relative mt-8"
        role="tablist"
        aria-label="Etapas da jornada Nuviora"
        aria-orientation="horizontal"
      >
        <div
          className="pointer-events-none absolute left-8 right-8 top-[1.35rem] hidden h-px bg-border md:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-8 top-[1.35rem] hidden h-px bg-brand-green transition-[width] duration-500 ease-[var(--ease-standard)] md:block"
          style={{ width: `calc((100% - 4rem) * ${progressPct / 100})` }}
          aria-hidden
        />

        <div className="relative flex flex-col gap-2 md:flex-row md:justify-between md:gap-1">
          {steps.map((step, index) => {
            const Icon = icons[index] ?? Layers3;
            const isActive = index === active;
            const isDone = index < active;
            return (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="pipeline-panel"
                id={`pipeline-tab-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(e) => onKey(index, e)}
                className={cn(
                  "group flex min-h-12 touch-manipulation items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 focus-visible:ring-offset-2",
                  "md:min-h-11 md:w-full md:flex-1 md:flex-col md:rounded-none md:bg-transparent md:px-0 md:py-0 md:ring-0",
                  isActive
                    ? "bg-brand-navy text-white md:bg-transparent md:text-brand-navy"
                    : "bg-white text-brand-ink ring-1 ring-border/70 md:bg-transparent md:text-muted-foreground md:ring-0",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 md:size-11",
                    isActive &&
                      "pipeline-node--active border-brand-green bg-brand-green text-white",
                    isDone &&
                      !isActive &&
                      "border-brand-green bg-white text-brand-green",
                    !isActive &&
                      !isDone &&
                      "border-border bg-white text-muted-foreground group-hover:border-brand-green/40",
                  )}
                >
                  {isDone && !isActive ? (
                    <Check className="size-4" strokeWidth={2.25} aria-hidden />
                  ) : (
                    <Icon
                      className="size-[1.15rem]"
                      strokeWidth={1.7}
                      aria-hidden
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "font-semibold md:max-w-[8.5rem] md:text-center md:text-xs md:font-medium md:leading-snug lg:text-sm",
                    isActive ? "md:text-brand-navy" : "md:text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="pipeline-panel"
        role="tabpanel"
        aria-labelledby={`pipeline-tab-${active}`}
        key={active}
        className="mt-10 border-t border-border/80 pt-8 motion-safe:animate-[step-enter_0.35s_var(--ease-standard)]"
      >
        <div className="flex gap-5">
          <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-brand-mint/50 text-brand-green sm:inline-flex">
            <ActiveIcon className="size-6" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              Etapa {active + 1} de {steps.length}
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-brand-navy">
              {activeStep.title}
            </h3>
            <p className="mt-2 max-w-xl text-base text-muted-foreground">
              {activeStep.body}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-ink/85">
              {activeStep.pipelineDetail}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={active === 0}
                onClick={() => setActive((i) => i - 1)}
                className="min-h-11 touch-manipulation rounded-lg px-4 py-2.5 text-sm font-medium text-brand-ink ring-1 ring-border transition-colors hover:bg-white disabled:opacity-35"
              >
                Anterior
              </button>
              <button
                type="button"
                disabled={active === steps.length - 1}
                onClick={() => setActive((i) => i + 1)}
                className="min-h-11 touch-manipulation rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-ink disabled:opacity-35"
              >
                Próxima etapa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
