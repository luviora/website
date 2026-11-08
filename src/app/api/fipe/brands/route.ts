import { NextResponse } from "next/server";
import { listBrands } from "@/lib/fipe/client";
import type { FipeVehicleType } from "@/lib/fipe/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vehicleType = (searchParams.get("type") || "cars") as FipeVehicleType;
  if (!["cars", "motorcycles", "trucks"].includes(vehicleType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    const brands = await listBrands(vehicleType);
    return NextResponse.json(brands, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar as marcas FIPE." },
      { status: 502 },
    );
  }
}
