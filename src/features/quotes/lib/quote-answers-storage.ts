import type { ProductType } from "@/features/products/catalog";

const PREFIX = "nuviora:quote-answers:";

export function loadQuoteAnswers(
  product: ProductType,
): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(`${PREFIX}${product}`);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    return parsed as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function saveQuoteAnswers(
  product: ProductType,
  answers: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`${PREFIX}${product}`, JSON.stringify(answers));
  } catch {
    // quota / private mode — fluxo continua sem persistência
  }
}

export function clearQuoteAnswers(product: ProductType) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(`${PREFIX}${product}`);
  } catch {
    // ignore
  }
}
