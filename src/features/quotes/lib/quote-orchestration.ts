import type { ProductType } from "@/features/products/catalog";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";
import type { QuoteStep } from "@/features/quotes/domain/step";
import { getActiveQuoteSteps } from "@/features/quotes/lib/active-steps";
import { buildStepSchema } from "@/features/quotes/schemas/build-step-schema";
import { REVIEW_STEP } from "@/features/quotes/lib/resolve-quote-location";

export function pickStepAnswers(
  step: QuoteStep,
  answers: Record<string, unknown>,
): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const field of step.fields) {
    if (Object.prototype.hasOwnProperty.call(answers, field.name)) {
      data[field.name] = answers[field.name];
    } else if (field.type === "checkbox") {
      data[field.name] = false;
    } else if (field.type === "coverageCards") {
      data[field.name] = [];
    } else {
      data[field.name] = "";
    }
  }
  return data;
}

export function isStepComplete(
  step: QuoteStep,
  answers: Record<string, unknown>,
): boolean {
  return buildStepSchema(step).safeParse(pickStepAnswers(step, answers))
    .success;
}

export function canEnterReview(
  product: ProductType,
  answers: Record<string, unknown>,
): boolean {
  const steps = getActiveQuoteSteps(product, answers);
  if (!steps.length) return false;
  return steps.every((step) => isStepComplete(step, answers));
}

export function firstIncompleteStepId(
  product: ProductType,
  answers: Record<string, unknown>,
): string | null {
  const steps = getActiveQuoteSteps(product, answers);
  for (const step of steps) {
    if (!isStepComplete(step, answers)) return step.id;
  }
  return null;
}

/**
 * Resolve o step canônico para a URL atual.
 * - `review` só permanece se todas as etapas ativas estiverem completas
 * - step inativo (ex.: vehicleFipe sem garantia veículo) cai no vizinho ativo
 */
export function resolveCanonicalStepId(
  product: ProductType,
  stepFromUrl: string | null | undefined,
  answers: Record<string, unknown>,
): string {
  const active = getActiveQuoteSteps(product, answers);
  const activeIds = active.map((s) => s.id);
  if (!activeIds.length) return "";

  if (stepFromUrl === REVIEW_STEP) {
    if (canEnterReview(product, answers)) return REVIEW_STEP;
    return firstIncompleteStepId(product, answers) ?? activeIds[0]!;
  }

  if (stepFromUrl && activeIds.includes(stepFromUrl)) {
    return stepFromUrl;
  }

  if (stepFromUrl) {
    const catalogIds = QUOTE_CONFIG[product].steps.map((s) => s.id);
    const requestedIdx = catalogIds.indexOf(stepFromUrl);
    if (requestedIdx >= 0) {
      for (let i = requestedIdx; i < catalogIds.length; i += 1) {
        const id = catalogIds[i]!;
        if (activeIds.includes(id)) return id;
      }
      for (let i = requestedIdx - 1; i >= 0; i -= 1) {
        const id = catalogIds[i]!;
        if (activeIds.includes(id)) return id;
      }
    }
  }

  return activeIds[0]!;
}

export function needsCanonicalStepSync(
  product: ProductType,
  stepFromUrl: string | null | undefined,
  answers: Record<string, unknown>,
): string | null {
  const canonical = resolveCanonicalStepId(product, stepFromUrl, answers);
  if (!canonical) return null;
  if (stepFromUrl === canonical) return null;
  return canonical;
}

/** Máximo índice “liberado” na nav (etapas já válidas + atual). */
export function farthestReachableIndex(
  product: ProductType,
  answers: Record<string, unknown>,
  currentIndex: number,
): number {
  const steps = getActiveQuoteSteps(product, answers);
  let farthest = 0;
  for (let i = 0; i < steps.length; i += 1) {
    if (isStepComplete(steps[i]!, answers)) {
      farthest = Math.min(i + 1, steps.length - 1);
    } else {
      farthest = i;
      break;
    }
  }
  return Math.max(farthest, currentIndex, 0);
}
