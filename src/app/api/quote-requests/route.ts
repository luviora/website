import { NextResponse } from "next/server";
import { z } from "zod";
import type { QuoteResponse } from "@/lib/api/quote-types";
import { CONSENT_VERSION, SUBMISSION_MODE } from "@/lib/api/quote-types";
import { isProductType } from "@/features/products/catalog";

const bodySchema = z.object({
  product: z.string().refine(isProductType, "Produto inválido"),
  customerType: z.enum(["PF", "PJ"]),
  answers: z.record(z.string(), z.unknown()),
  consentVersion: z.string(),
});

export async function POST(request: Request) {
  if (SUBMISSION_MODE === "demo") {
    return NextResponse.json(
      {
        error:
          "Modo demonstração: envio desativado. Configure NUVIORA_SUBMISSION_MODE=integrated para persistir.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.consentVersion !== CONSENT_VERSION) {
    return NextResponse.json({ error: "Versão de consentimento inválida" }, { status: 400 });
  }

  const response: QuoteResponse = {
    id: crypto.randomUUID(),
    status: "submitted",
    submissionMode: SUBMISSION_MODE,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    status: 201,
    headers: { "Cache-Control": "no-store" },
  });
}
