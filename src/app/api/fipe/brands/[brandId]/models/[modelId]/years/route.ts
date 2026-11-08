import { NextResponse } from "next/server";
import { isSafeFipeId, listYears } from "@/lib/fipe/client";
import type { FipeVehicleType } from "@/lib/fipe/types";

export async function GET(
  request: Request,
  context: { params: Promise<{ brandId: string; modelId: string }> },
) {
  const { brandId, modelId } = await context.params;
  if (!isSafeFipeId(brandId) || !isSafeFipeId(modelId)) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const vehicleType = (searchParams.get("type") || "cars") as FipeVehicleType;
  if (!["cars", "motorcycles", "trucks"].includes(vehicleType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    const years = await listYears(brandId, modelId, vehicleType);
    return NextResponse.json(years, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar os anos FIPE." },
      { status: 502 },
    );
  }
}
