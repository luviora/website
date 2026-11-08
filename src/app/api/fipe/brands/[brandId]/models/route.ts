import { NextResponse } from "next/server";
import { isSafeFipeId, listModels } from "@/lib/fipe/client";
import type { FipeVehicleType } from "@/lib/fipe/types";

export async function GET(
  request: Request,
  context: { params: Promise<{ brandId: string }> },
) {
  const { brandId } = await context.params;
  if (!isSafeFipeId(brandId)) {
    return NextResponse.json({ error: "Marca inválida" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const vehicleType = (searchParams.get("type") || "cars") as FipeVehicleType;
  if (!["cars", "motorcycles", "trucks"].includes(vehicleType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    const models = await listModels(brandId, vehicleType);
    return NextResponse.json(models, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar os modelos FIPE." },
      { status: 502 },
    );
  }
}
