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
  const progressPct = steps.length <= 1 ? 100 : (active / (steps.length - 1)) * 100;

  const onKey = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActive(index);
      }
      if (e.key === "ArrowRight") setActive((i) => Math.min(steps.length - 1, i + 1));
      if (e.key === "ArrowLeft") setActive((i) => Math.max(0, i - 1));
    },
    [steps.length],
  );

  const activeStep = steps[active]!;
  const ActiveIcon = icons[active] ?? Layers3;

  return (
    <div className="mt-12">
      <p className="text-sm text-muted-foreground">{trust.pipelineHint}</p>

      <div
        className="mt-8"
        role="tablist"
        aria-label="Etapas da jornada Nuviora"
      >
        <div className="hidden md:block">
          <div className="relative px-2 lg:px-4">
            <div className="absolute left-8 right-8 top-[1.35rem] h-px bg-border" aria-hidden />
            <div
              className="absolute left-8 top-[1.35rem] h-px bg-brand-green transition-[width] duration-500 ease-[var(--ease-standard)]"
              style={{ width: `calc((100% - 4rem) * ${progressPct / 100})` }}
              aria-hidden
            />
            <ol className="relative flex justify-between gap-1">
              {steps.map((step, index) => {
                const Icon = icons[index] ?? Layers3;
                const isActive = index === active;
                const isDone = index < active;
                return (
                  <li key={step.title} className="flex min-w-0 flex-1 flex-col items-center">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="pipeline-panel"
                      id={`pipeline-tab-${index}`}
                      onClick={() => setActive(index)}
                      onKeyDown={(e) => onKey(index, e)}
                      className="group flex min-h-11 w-full flex-col items-center gap-3 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 focus-visible:ring-offset-2"
                    >
                      <span
                        className={cn(
                          "relative z-10 flex size-11 items-center justify-center rounded-full border transition-all duration-300",
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
                          <Icon className="size-[1.15rem]" strokeWidth={1.7} aria-hidden />
                        )}
                      </span>
                      <span
                        className={cn(
                          "max-w-[7.5rem] text-center text-xs font-medium leading-snug transition-colors lg:max-w-[8.5rem] lg:text-sm",
                          isActive ? "text-brand-navy" : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <ol className="space-y-2 md:hidden">
          {steps.map((step, index) => {
            const Icon = icons[index] ?? Layers3;
            const isActive = index === active;
            return (
              <li key={step.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="pipeline-panel"
                  id={`pipeline-tab-mobile-${index}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left touch-manipulation transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 focus-visible:ring-offset-2",
                    isActive
                      ? "bg-brand-navy text-white"
                      : "bg-white text-brand-ink ring-1 ring-border/70",
                  )}
                >
                  <Icon className="size-5 shrink-0" strokeWidth={1.7} aria-hidden />
                  <span className="font-semibold">{step.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

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
              <p className="mt-2 max-w-xl text-base text-muted-foreground">{activeStep.body}</p>
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
    </div>
  );
}
