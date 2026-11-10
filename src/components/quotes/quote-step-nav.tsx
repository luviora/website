import { cn } from "@/lib/utils";

export function QuoteStepNav({
  steps,
  currentIndex,
  reviewMode,
  reachableIndex = 0,
  onStepSelect,
}: {
  steps: { id: string; title: string }[];
  currentIndex: number;
  reviewMode?: boolean;
  /** Último índice que o usuário pode abrir (etapas já válidas / atual). */
  reachableIndex?: number;
  onStepSelect?: (index: number) => void;
}) {
  const active = reviewMode ? steps.length : currentIndex;

  return (
    <nav aria-label="Etapas da simulação" className="w-full overflow-x-auto">
      <ol className="mx-auto flex min-w-max max-w-xl items-start justify-center gap-0 px-2">
        {steps.map((step, index) => {
          const isActive = index === active && !reviewMode;
          const isDone = index < active || Boolean(reviewMode);
          const isLast = index === steps.length - 1;
          const canOpen =
            Boolean(onStepSelect) &&
            !reviewMode &&
            index <= reachableIndex &&
            index !== currentIndex;

          return (
            <li key={step.id} className="flex items-start">
              <div className="flex w-[5.5rem] flex-col items-center gap-2 sm:w-[6.5rem]">
                {canOpen ? (
                  <button
                    type="button"
                    onClick={() => onStepSelect?.(index)}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-xs font-bold tabular-nums transition-colors duration-300 sm:size-10 sm:text-sm",
                      "bg-brand-green/15 text-brand-green hover:bg-brand-mint hover:text-brand-navy",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40",
                    )}
                    aria-label={`Ir para: ${step.title}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                ) : (
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-xs font-bold tabular-nums transition-colors duration-300 sm:size-10 sm:text-sm",
                      isActive && "bg-brand-mint text-brand-navy",
                      isDone &&
                        !isActive &&
                        "bg-brand-green/15 text-brand-green",
                      !isActive &&
                        !isDone &&
                        "bg-muted text-muted-foreground",
                    )}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <span
                  className={cn(
                    "max-w-[5.5rem] text-center text-[0.65rem] font-medium leading-tight sm:max-w-[6.5rem] sm:text-xs",
                    isActive ? "text-brand-navy" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </div>
              {!isLast ? (
                <span
                  className={cn(
                    "mt-[1.1rem] h-px w-4 shrink-0 sm:mt-[1.2rem] sm:w-8",
                    index < active ? "bg-brand-green/40" : "bg-border",
                  )}
                  aria-hidden
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
