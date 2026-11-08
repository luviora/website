"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import type { ProductType } from "@/features/products/catalog";
import type { FieldType, QuoteStep } from "@/features/quotes/domain/step";
import { buildStepSchema } from "@/features/quotes/schemas/build-step-schema";
import {
  maskBrl,
  maskCep,
  maskCnpj,
  maskCpf,
  maskDocument,
  maskPhone,
} from "@/lib/br/document";
import { Button } from "@/components/ui/button";
import {
  ConsentCheckbox,
  FloatingField,
  FormTextInput,
  NativeSelect,
} from "@/components/ui/form-controls";
import { CepAddressFields } from "@/features/quotes/components/cep-address-fields";
import { CoverageCardsField } from "@/features/quotes/components/coverage-cards-field";
import { FipeVehicleFields } from "@/features/quotes/components/fipe-vehicle-fields";
import { cn } from "@/lib/utils";

const FIPE_FIELD_TYPES = new Set<FieldType>([
  "fipeBrand",
  "fipeModel",
  "fipeYear",
  "hidden",
]);

const ADDRESS_FIELD_NAMES = new Set([
  "cep",
  "street",
  "neighborhood",
  "city",
  "state",
]);

const MASKERS: Partial<Record<FieldType, (value: string) => string>> = {
  phone: maskPhone,
  tel: maskPhone,
  cpf: maskCpf,
  cnpj: maskCnpj,
  document: maskDocument,
  cep: maskCep,
  currency: maskBrl,
};

const INPUT_MODE: Partial<
  Record<FieldType, React.HTMLAttributes<HTMLInputElement>["inputMode"]>
> = {
  phone: "tel",
  tel: "tel",
  cpf: "numeric",
  cnpj: "numeric",
  document: "numeric",
  cep: "numeric",
  currency: "decimal",
  number: "numeric",
  email: "email",
};

export function QuoteStepForm({
  product,
  step,
  defaultValues,
  stepIndex,
  totalSteps,
  onBack,
  onValid,
}: {
  product: ProductType;
  step: QuoteStep;
  defaultValues: Record<string, unknown>;
  stepIndex: number;
  totalSteps: number;
  onBack: () => void;
  onValid: (values: Record<string, unknown>) => void;
}) {
  const schema = useMemo(() => buildStepSchema(step), [step]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const isLast = stepIndex === totalSteps - 1;
  const usesFipeVehicle = step.fields.some((f) => f.type === "fipeBrand");
  const usesAddress =
    step.fields.some((f) => f.type === "cep") &&
    step.fields.some((f) => f.name === "street");
  const coverageField = step.fields.find((f) => f.type === "coverageCards");

  return (
    <div className="motion-safe:animate-[step-enter_var(--duration-step)_var(--ease-standard)]">
      <h1 className="text-center font-display text-2xl font-bold tracking-tight text-brand-navy sm:text-[1.75rem]">
        {step.title}
      </h1>
      {step.description ? (
        <p className="mx-auto mt-2 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      ) : null}

      <form
        className="mt-8 space-y-5"
        onSubmit={form.handleSubmit(onValid)}
        noValidate
      >
        {usesFipeVehicle ? (
          <FipeVehicleFields form={form} product={product} />
        ) : null}

        {step.fields.map((field) => {
          if (usesFipeVehicle && FIPE_FIELD_TYPES.has(field.type)) {
            return null;
          }
          if (usesAddress && ADDRESS_FIELD_NAMES.has(field.name)) {
            return null;
          }
          if (field.type === "coverageCards") {
            return null;
          }

          const error = form.formState.errors[field.name]?.message as
            | string
            | undefined;
          const id = `${product}-${field.name}`;
          const mask = MASKERS[field.type];

          if (field.type === "checkbox") {
            return (
              <div key={field.name} className="space-y-2">
                <ConsentCheckbox
                  id={id}
                  label={field.label}
                  error={error}
                  {...form.register(field.name)}
                />
                {error ? (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          }

          if (field.type === "select") {
            return (
              <FloatingField
                key={field.name}
                id={id}
                label={field.label}
                helper={field.helper}
                error={error}
              >
                <NativeSelect
                  id={id}
                  error={!!error}
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-err` : undefined}
                  {...form.register(field.name)}
                >
                  <option value="">{field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </NativeSelect>
              </FloatingField>
            );
          }

          if (mask) {
            return (
              <FloatingField
                key={field.name}
                id={id}
                label={field.label}
                helper={field.helper}
                error={error}
              >
                <Controller
                  name={field.name}
                  control={form.control}
                  render={({ field: rhf }) => (
                    <FormTextInput
                      id={id}
                      type="text"
                      inputMode={INPUT_MODE[field.type]}
                      autoComplete={
                        field.type === "phone" || field.type === "tel"
                          ? "tel"
                          : field.type === "cep"
                            ? "postal-code"
                            : undefined
                      }
                      placeholder={field.placeholder || field.label}
                      error={!!error}
                      aria-invalid={!!error}
                      aria-describedby={error ? `${id}-err` : undefined}
                      value={String(rhf.value ?? "")}
                      onBlur={rhf.onBlur}
                      name={rhf.name}
                      ref={rhf.ref}
                      onChange={(e) => rhf.onChange(mask(e.target.value))}
                    />
                  )}
                />
              </FloatingField>
            );
          }

          return (
            <FloatingField
              key={field.name}
              id={id}
              label={field.label}
              helper={field.helper}
              error={error}
            >
              <FormTextInput
                id={id}
                type={
                  field.type === "number"
                    ? "number"
                    : field.type === "email"
                      ? "email"
                      : "text"
                }
                placeholder={field.placeholder || field.label}
                error={!!error}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-err` : undefined}
                inputMode={INPUT_MODE[field.type]}
                {...form.register(field.name)}
              />
            </FloatingField>
          );
        })}

        {usesAddress ? (
          <CepAddressFields
            form={form}
            product={product}
            cepLabel={
              step.fields.find((f) => f.name === "cep")?.label || "CEP"
            }
          />
        ) : null}

        {coverageField ? (
          <Controller
            name={coverageField.name}
            control={form.control}
            render={({ field, fieldState }) => (
              <CoverageCardsField
                value={Array.isArray(field.value) ? field.value : []}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        ) : null}

        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-brand-green underline underline-offset-4 transition-colors hover:text-brand-navy"
          >
            Voltar
          </button>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className={cn(
            "mt-2 h-14 w-full rounded-full bg-brand-mint text-base font-semibold text-brand-navy shadow-none",
            "hover:bg-[#a8ecc8] hover:text-brand-navy",
          )}
        >
          {isLast ? "Revisar" : "Avançar"}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </form>
    </div>
  );
}
