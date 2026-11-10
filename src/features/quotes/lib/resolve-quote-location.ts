export const REVIEW_STEP = "review";

export type QuoteLocation =
  | { kind: "review" }
  | { kind: "step"; id: string; index: number };

/**
 * Fonte única de verdade para URL ↔ etapa.
 * `review` nunca é tratado como inválido (evita fallback para o 1º step).
 */
export function resolveQuoteLocation(
  stepFromUrl: string | null | undefined,
  activeStepIds: string[],
): QuoteLocation {
  if (stepFromUrl === REVIEW_STEP) {
    return { kind: "review" };
  }

  if (!activeStepIds.length) {
    return { kind: "step", id: "", index: 0 };
  }

  const index = stepFromUrl
    ? activeStepIds.findIndex((id) => id === stepFromUrl)
    : -1;

  if (index >= 0) {
    return { kind: "step", id: activeStepIds[index]!, index };
  }

  return { kind: "step", id: activeStepIds[0]!, index: 0 };
}

/** Precisa corrigir a URL? (nunca quando já está em review) */
export function needsStepUrlSync(
  stepFromUrl: string | null | undefined,
  activeStepIds: string[],
): string | null {
  const location = resolveQuoteLocation(stepFromUrl, activeStepIds);
  if (location.kind === "review") return null;
  if (!location.id) return null;
  if (stepFromUrl === location.id) return null;
  return location.id;
}
