import type { FipeItem } from "@/lib/fipe/types";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || "Falha ao consultar a tabela FIPE");
  }
  return res.json() as Promise<T>;
}

export function fetchFipeBrands() {
  return getJson<FipeItem[]>("/api/fipe/brands?type=cars");
}

export function fetchFipeModels(brandId: string) {
  return getJson<FipeItem[]>(
    `/api/fipe/brands/${encodeURIComponent(brandId)}/models?type=cars`,
  );
}

export function fetchFipeYears(brandId: string, modelId: string) {
  return getJson<FipeItem[]>(
    `/api/fipe/brands/${encodeURIComponent(brandId)}/models/${encodeURIComponent(modelId)}/years?type=cars`,
  );
}

export function fetchFipeIdentity(
  brandId: string,
  modelId: string,
  yearId: string,
) {
  return getJson<{
    codeFipe: string;
    brand: string;
    model: string;
    modelYear: number;
    fuel: string;
    referenceMonth: string;
  }>(
    `/api/fipe/brands/${encodeURIComponent(brandId)}/models/${encodeURIComponent(modelId)}/years/${encodeURIComponent(yearId)}?type=cars`,
  );
}

export function filterFipeItems(items: FipeItem[], query: string) {
  const q = query.trim().toLocaleLowerCase("pt-BR");
  if (!q) return items.slice(0, 80);
  return items
    .filter((item) => item.name.toLocaleLowerCase("pt-BR").includes(q))
    .slice(0, 80);
}
