import type { FipeItem, FipeVehicleInfo, FipeVehicleType } from "@/lib/fipe/types";

const DEFAULT_BASE = "https://fipe.parallelum.com.br/api/v2";

function baseUrl() {
  return (
    process.env.FIPE_API_BASE?.replace(/\/$/, "") || DEFAULT_BASE
  );
}

function headers(): HeadersInit {
  const h: HeadersInit = { Accept: "application/json" };
  const token = process.env.FIPE_API_TOKEN;
  if (token) h["X-Subscription-Token"] = token;
  return h;
}

async function fipeGet<T>(path: string): Promise<T> {
  const url = `${baseUrl()}${path}`;
  const res = await fetch(url, {
    headers: headers(),
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) {
    throw new Error(`FIPE indisponível (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function listBrands(vehicleType: FipeVehicleType = "cars") {
  return fipeGet<FipeItem[]>(`/${vehicleType}/brands`);
}

export function listModels(
  brandId: string,
  vehicleType: FipeVehicleType = "cars",
) {
  return fipeGet<FipeItem[]>(
    `/${vehicleType}/brands/${encodeURIComponent(brandId)}/models`,
  );
}

export function listYears(
  brandId: string,
  modelId: string,
  vehicleType: FipeVehicleType = "cars",
) {
  return fipeGet<FipeItem[]>(
    `/${vehicleType}/brands/${encodeURIComponent(brandId)}/models/${encodeURIComponent(modelId)}/years`,
  );
}

export function getVehicleInfo(
  brandId: string,
  modelId: string,
  yearId: string,
  vehicleType: FipeVehicleType = "cars",
) {
  return fipeGet<FipeVehicleInfo>(
    `/${vehicleType}/brands/${encodeURIComponent(brandId)}/models/${encodeURIComponent(modelId)}/years/${encodeURIComponent(yearId)}`,
  );
}

export function isSafeFipeId(value: string) {
  return /^[A-Za-z0-9._-]{1,32}$/.test(value);
}
