import { z } from "zod";
import type { QuoteField, QuoteStep } from "@/features/quotes/domain/step";

function fieldSchema(field: QuoteField) {
  const optionalText = z.string().optional();
  switch (field.type) {
    case "email":
      return field.required
        ? z.string().email("Informe um e-mail válido")
        : optionalText;
    case "number":
      return field.required
        ? z.coerce
            .number({ error: "Informe um valor válido" })
            .positive("Informe um valor válido")
        : z.union([z.literal(""), z.coerce.number()]).optional();
    case "checkbox":
      return field.required
        ? z.literal(true, {
            error: "É necessário confirmar para continuar",
          })
        : z.boolean().optional();
    case "select":
    case "text":
    case "tel":
    default:
      return field.required
        ? z.string().min(1, "Campo obrigatório")
        : optionalText;
  }
}

export function buildStepSchema(step: QuoteStep) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of step.fields) {
    shape[field.name] = fieldSchema(field);
  }
  return z.object(shape);
}
