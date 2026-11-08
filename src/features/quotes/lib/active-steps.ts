import type { ProductType } from "@/features/products/catalog";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";
import type { QuoteStep } from "@/features/quotes/domain/step";

/** Etapas visíveis conforme respostas (ex.: FIPE só se garantia = veículo). */
export function getActiveQuoteSteps(
  product: ProductType,
  answers: Record<string, unknown>,
): QuoteStep[] {
  const steps = QUOTE_CONFIG[product].steps;
  if (product === "emprestimos" && answers.collateral !== "vehicle") {
    return steps.filter((step) => step.id !== "vehicleFipe");
  }
  return steps;
}

const FIPE_ANSWER_KEYS = [
  "brand",
  "brandCode",
  "model",
  "modelCode",
  "year",
  "yearCode",
  "fipeCode",
] as const;

export function clearVehicleFipeAnswers(
  answers: Record<string, unknown>,
): Record<string, unknown> {
  const next = { ...answers };
  for (const key of FIPE_ANSWER_KEYS) {
    delete next[key];
  }
  return next;
}
