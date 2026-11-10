import type { ProductType } from "@/features/products/catalog";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";
import { AUTO_COVERAGES } from "@/content/auto-coverages";
import { AUTO_USAGE_OPTIONS } from "@/content/auto-usage";

function labelForCode(
  code: string,
  catalogs: { value: string; label: string }[],
): string {
  return catalogs.find((o) => o.value === code)?.label ?? code;
}

/** Labels amigáveis para a tela de revisão (sem códigos internos). */
export function buildAnswerLabelMap(
  product: ProductType,
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const step of QUOTE_CONFIG[product].steps) {
    for (const field of step.fields) {
      if (field.type === "hidden") continue;
      map[field.name] = field.label;
    }
  }
  return map;
}

export function formatAnswerValue(
  product: ProductType,
  key: string,
  value: unknown,
): string {
  if (typeof value === "boolean") return value ? "Sim" : "Não";

  if (Array.isArray(value)) {
    const items = value.map((item) => String(item)).filter(Boolean);
    if (!items.length) return "—";

    if (key === "coverages") {
      const coverageLabels = items.map((code) =>
        labelForCode(code, AUTO_COVERAGES),
      );
      // Pacote completo: mostrar o rótulo amigável único
      if (
        items.length ===
        AUTO_COVERAGES.filter((c) => !c.selectsAll).length
      ) {
        return "Todas as coberturas";
      }
      return coverageLabels.join(", ");
    }

    return items
      .map((code) => {
        for (const step of QUOTE_CONFIG[product].steps) {
          const field = step.fields.find((f) => f.name === key);
          const opt = field?.options?.find((o) => o.value === code);
          if (opt) return opt.label;
        }
        return code;
      })
      .join(", ");
  }

  const raw = String(value ?? "").trim();
  if (!raw) return "—";

  if (key === "usage") {
    return labelForCode(raw, AUTO_USAGE_OPTIONS);
  }

  if (key === "coverages") {
    return labelForCode(raw, AUTO_COVERAGES);
  }

  for (const step of QUOTE_CONFIG[product].steps) {
    const field = step.fields.find((f) => f.name === key);
    if (!field?.options?.length) continue;
    const opt = field.options.find((o) => o.value === raw);
    if (opt) return opt.label;
  }

  if (raw === "yes" || raw === "sim") return "Sim";
  if (raw === "no" || raw === "nao" || raw === "não") return "Não";

  return raw;
}

export function reviewEntries(
  product: ProductType,
  answers: Record<string, unknown>,
): { key: string; label: string; value: string }[] {
  const labels = buildAnswerLabelMap(product);
  const orderedKeys: string[] = [];
  const seen = new Set<string>();

  for (const step of QUOTE_CONFIG[product].steps) {
    for (const field of step.fields) {
      if (field.type === "hidden") continue;
      if (field.name === "consent" || field.name.endsWith("Code")) continue;
      if (seen.has(field.name)) continue;
      seen.add(field.name);
      orderedKeys.push(field.name);
    }
  }

  // Campos residuais (não previstos no config) ficam no fim
  for (const key of Object.keys(answers)) {
    if (seen.has(key)) continue;
    if (key.endsWith("Code") || key === "consent" || key === "fipeCode") {
      continue;
    }
    orderedKeys.push(key);
  }

  return orderedKeys
    .filter((key) => {
      const value = answers[key];
      if (value === undefined || value === null || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
    .map((key) => ({
      key,
      label: labels[key] ?? key,
      value: formatAnswerValue(product, key, answers[key]),
    }));
}
