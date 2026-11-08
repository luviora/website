import { z } from "zod";
import type { QuoteField, QuoteStep } from "@/features/quotes/domain/step";
import {
  isValidCep,
  isValidCnpj,
  isValidCpf,
  isValidDocument,
  isValidPhone,
  parseBrlToNumber,
} from "@/lib/br/document";

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
    case "currency": {
      const currency = z
        .string()
        .refine((v) => {
          const n = parseBrlToNumber(v);
          return n !== null && n > 0;
        }, "Informe um valor em reais válido");
      return field.required ? currency : z.union([z.literal(""), currency]).optional();
    }
    case "phone":
    case "tel": {
      const phone = z
        .string()
        .refine(isValidPhone, "Informe um telefone válido com DDD");
      return field.required ? phone : z.union([z.literal(""), phone]).optional();
    }
    case "cpf": {
      const cpf = z.string().refine(isValidCpf, "Informe um CPF válido");
      return field.required ? cpf : z.union([z.literal(""), cpf]).optional();
    }
    case "cnpj": {
      const cnpj = z.string().refine(isValidCnpj, "Informe um CNPJ válido");
      return field.required ? cnpj : z.union([z.literal(""), cnpj]).optional();
    }
    case "document": {
      const doc = z
        .string()
        .refine(isValidDocument, "Informe um CPF ou CNPJ válido");
      return field.required ? doc : z.union([z.literal(""), doc]).optional();
    }
    case "cep": {
      const cep = z.string().refine(isValidCep, "Informe um CEP válido");
      return field.required ? cep : z.union([z.literal(""), cep]).optional();
    }
    case "coverageCards": {
      const coverages = z
        .array(z.string())
        .min(1, "Escolha ao menos uma cobertura");
      return field.required
        ? coverages
        : z.union([z.array(z.string()), z.literal(undefined)]).optional();
    }
    case "choiceCards":
    case "yesNo": {
      const choice = z.string().min(1, "Selecione uma opção");
      return field.required
        ? choice
        : z.union([z.literal(""), choice]).optional();
    }
    case "fipeBrand":
    case "fipeModel":
    case "fipeYear": {
      const selected = z
        .string()
        .min(1, "Selecione uma opção da tabela FIPE");
      return field.required
        ? selected
        : z.union([z.literal(""), selected]).optional();
    }
    case "hidden":
      return field.required
        ? z.string().min(1, "Seleção incompleta na tabela FIPE")
        : optionalText;
    case "checkbox":
      return field.required
        ? z.literal(true, {
            error: "É necessário confirmar para continuar",
          })
        : z.boolean().optional();
    case "select":
    case "text":
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
