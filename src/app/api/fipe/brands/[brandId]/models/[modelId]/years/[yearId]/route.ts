import { NextResponse } from "next/server";
import { getVehicleInfo, isSafeFipeId } from "@/lib/fipe/client";
import type { FipeVehicleType } from "@/lib/fipe/types";

/** Retorna identificação FIPE (código). Preço de mercado não é prêmio. */
export async function GET(
  request: Request,
  context: {
    params: Promise<{ brandId: string; modelId: string; yearId: string }>;
  },
) {
  const { brandId, modelId, yearId } = await context.params;
  if (
    !isSafeFipeId(brandId) ||
    !isSafeFipeId(modelId) ||
    !isSafeFipeId(yearId)
  ) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const vehicleType = (searchParams.get("type") || "cars") as FipeVehicleType;
  if (!["cars", "motorcycles", "trucks"].includes(vehicleType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    const info = await getVehicleInfo(brandId, modelId, yearId, vehicleType);
    return NextResponse.json(
      {
        codeFipe: info.codeFipe,
        brand: info.brand,
        model: info.model,
        modelYear: info.modelYear,
        fuel: info.fuel,
        referenceMonth: info.referenceMonth,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Não foi possível consultar o veículo na FIPE." },
      { status: 502 },
    );
  }
}
