import { NextResponse } from "next/server";
import { onlyDigits } from "@/lib/br/document";
import { lookupViaCep } from "@/lib/cep/viacep";

export async function GET(
  _request: Request,
  context: { params: Promise<{ cep: string }> },
) {
  const { cep } = await context.params;
  const digits = onlyDigits(cep, 8);
  if (digits.length !== 8) {
    return NextResponse.json({ error: "CEP inválido" }, { status: 400 });
  }

  try {
    const address = await lookupViaCep(digits);
    if (!address) {
      return NextResponse.json({ error: "CEP não encontrado" }, { status: 404 });
    }
    return NextResponse.json(address, {
      headers: {
        "Cache-Control": "public, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível consultar o CEP." },
      { status: 502 },
    );
  }
}
