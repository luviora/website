"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import type { ProductType } from "@/features/products/catalog";
import type { QuoteStep } from "@/features/quotes/domain/step";
import { buildStepSchema } from "@/features/quotes/schemas/build-step-schema";
import { Button } from "@/components/ui/button";
import {
  ConsentCheckbox,
  FloatingField,
  FormTextInput,
  NativeSelect,
} from "@/components/ui/form-controls";
import { cn } from "@/lib/utils";

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
  });

  const isLast = stepIndex === totalSteps - 1;

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
        {step.fields.map((field) => {
          const error = form.formState.errors[field.name]?.message as
            | string
            | undefined;
          const id = `${product}-${field.name}`;

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
                type={field.type === "number" ? "number" : field.type}
                placeholder={field.placeholder || field.label}
                error={!!error}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-err` : undefined}
                inputMode={field.type === "number" ? "decimal" : undefined}
                {...form.register(field.name)}
              />
            </FloatingField>
          );
        })}

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
