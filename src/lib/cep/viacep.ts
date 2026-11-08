import { onlyDigits } from "@/lib/br/document";

export type ViaCepAddress = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  /** true quando ViaCEP não retornou logradouro (usuário pode digitar). */
  streetEditable: boolean;
};

type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean | string;
};

export async function lookupViaCep(cep: string): Promise<ViaCepAddress | null> {
  const digits = onlyDigits(cep, 8);
  if (digits.length !== 8) return null;

  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 * 7 },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as ViaCepResponse;
  if (data.erro) return null;

  const street = (data.logradouro || "").trim();
  return {
    cep: data.cep || `${digits.slice(0, 5)}-${digits.slice(5)}`,
    street,
    neighborhood: (data.bairro || "").trim(),
    city: (data.localidade || "").trim(),
    state: (data.uf || "").trim().toUpperCase(),
    streetEditable: street.length === 0,
  };
}
