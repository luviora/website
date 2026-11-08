"use client";

import { useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { FloatingField, FormTextInput } from "@/components/ui/form-controls";
import { isValidCep, maskCep, onlyDigits } from "@/lib/br/document";
import type { ViaCepAddress } from "@/lib/cep/viacep";

type FormValues = Record<string, unknown>;

async function fetchCep(cep: string): Promise<ViaCepAddress> {
  const digits = onlyDigits(cep, 8);
  const res = await fetch(`/api/cep/${digits}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || "CEP não encontrado");
  }
  return res.json() as Promise<ViaCepAddress>;
}

export function CepAddressFields({
  form,
  product,
  cepLabel = "CEP",
  streetLabel = "Rua",
}: {
  form: UseFormReturn<FormValues> | UseFormReturn;
  product: string;
  cepLabel?: string;
  streetLabel?: string;
}) {
  const setValue = form.setValue as UseFormReturn<FormValues>["setValue"];
  const watch = form.watch as UseFormReturn<FormValues>["watch"];
  const control = form.control as UseFormReturn<FormValues>["control"];
  const errors = form.formState.errors as UseFormReturn<FormValues>["formState"]["errors"];

  const cep = String(watch("cep") ?? "");
  const [streetEditable, setStreetEditable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const lastLookup = useRef("");

  useEffect(() => {
    if (!isValidCep(cep)) return;
    const digits = onlyDigits(cep, 8);
    if (digits === lastLookup.current) return;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      setLoading(true);
      setLookupError(null);
      fetchCep(digits)
        .then((address) => {
          if (cancelled) return;
          lastLookup.current = digits;
          setValue("cep", address.cep, { shouldValidate: true });
          setValue("street", address.street, { shouldValidate: true });
          setValue("neighborhood", address.neighborhood, {
            shouldValidate: true,
          });
          setValue("city", address.city, { shouldValidate: true });
          setValue("state", address.state, { shouldValidate: true });
          setStreetEditable(address.streetEditable);
        })
        .catch((err: Error) => {
          if (cancelled) return;
          lastLookup.current = "";
          setLookupError(err.message);
          setValue("street", "");
          setValue("neighborhood", "");
          setValue("city", "");
          setValue("state", "");
          setStreetEditable(true);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [cep, setValue]);

  const cepError = errors.cep?.message as string | undefined;
  const streetError = errors.street?.message as string | undefined;
  const neighborhoodError = errors.neighborhood?.message as string | undefined;
  const cityError = errors.city?.message as string | undefined;
  const stateError = errors.state?.message as string | undefined;

  return (
    <div className="space-y-5">
      <FloatingField
        id={`${product}-cep`}
        label={cepLabel}
        helper="Usamos o ViaCEP para preencher o endereço"
        error={cepError || lookupError || undefined}
      >
        <div className="relative">
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <FormTextInput
                id={`${product}-cep`}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                error={!!cepError || !!lookupError}
                value={String(field.value ?? "")}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                onChange={(e) => {
                  lastLookup.current = "";
                  field.onChange(maskCep(e.target.value));
                }}
              />
            )}
          />
          {loading ? (
            <Loader2
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
              aria-hidden
            />
          ) : null}
        </div>
      </FloatingField>

      <FloatingField
        id={`${product}-street`}
        label={streetLabel}
        helper={
          streetEditable
            ? "Este CEP não trouxe o nome da rua. Pode escrever manualmente."
            : "Preenchido pelo CEP"
        }
        error={streetError}
      >
        <Controller
          name="street"
          control={control}
          render={({ field }) => (
            <FormTextInput
              id={`${product}-street`}
              type="text"
              autoComplete="address-line1"
              placeholder={streetLabel}
              error={!!streetError}
              readOnly={!streetEditable}
              aria-readonly={!streetEditable}
              className={!streetEditable ? "bg-brand-cream/50" : undefined}
              value={String(field.value ?? "")}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </FloatingField>

      <FloatingField
        id={`${product}-neighborhood`}
        label="Bairro"
        error={neighborhoodError}
      >
        <Controller
          name="neighborhood"
          control={control}
          render={({ field }) => (
            <FormTextInput
              id={`${product}-neighborhood`}
              type="text"
              autoComplete="address-level3"
              placeholder="Bairro"
              error={!!neighborhoodError}
              readOnly
              className="bg-brand-cream/50"
              value={String(field.value ?? "")}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
      </FloatingField>

      <div className="grid grid-cols-[1fr_5.5rem] gap-3">
        <FloatingField
          id={`${product}-city`}
          label="Cidade"
          error={cityError}
        >
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <FormTextInput
                id={`${product}-city`}
                type="text"
                autoComplete="address-level2"
                placeholder="Cidade"
                error={!!cityError}
                readOnly
                className="bg-brand-cream/50"
                value={String(field.value ?? "")}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </FloatingField>

        <FloatingField id={`${product}-state`} label="UF" error={stateError}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <FormTextInput
                id={`${product}-state`}
                type="text"
                autoComplete="address-level1"
                placeholder="UF"
                error={!!stateError}
                readOnly
                className="bg-brand-cream/50"
                value={String(field.value ?? "")}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </FloatingField>
      </div>
    </div>
  );
}
