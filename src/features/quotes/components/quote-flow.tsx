"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProductType } from "@/features/products/catalog";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";
import { QuoteStepForm } from "@/features/quotes/components/quote-step-form";
import { QuoteStepNav } from "@/components/quotes/quote-step-nav";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/events";
import { CONSENT_VERSION } from "@/lib/api/quote-types";
import { productCopy, siteCopy } from "@/content/site-copy";
import type { QuoteStep } from "@/features/quotes/domain/step";

function stepHeading(
  product: ProductType,
  stepIndex: number,
  step: QuoteStep,
): string {
  if (product === "emprestimos" && stepIndex === 1) {
    return productCopy.emprestimos.cotadorHint;
  }
  if (stepIndex === 0) {
    return productCopy[product].cotadorHint;
  }
  return step.title;
}

export function QuoteFlow({ product }: { product: ProductType }) {
  const config = QUOTE_CONFIG[product];
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<string, unknown>>({});
  const [reviewMode, setReviewMode] = useState(false);

  const step = config.steps[stepIndex];
  const totalSteps = config.steps.length;
  const navSteps = config.steps.map((s) => ({ id: s.id, title: s.title }));

  const defaultValues = useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const field of step.fields) {
      const prev = allAnswers[field.name];
      if (field.type === "checkbox") {
        defaults[field.name] = prev === true;
      } else {
        defaults[field.name] = prev ?? "";
      }
    }
    return defaults;
  }, [step, allAnswers]);

  function onStepValid(values: Record<string, unknown>) {
    const merged = { ...allAnswers, ...values };
    setAllAnswers(merged);
    trackEvent("quote_step_viewed", {
      product,
      step: String(stepIndex + 1),
    });

    if (stepIndex < totalSteps - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    setReviewMode(true);
    trackEvent("quote_review_viewed", { product });
  }

  async function finishDemo() {
    trackEvent("quote_demo_completed", { product });
    const customerType =
      (allAnswers.customerType as string) === "PJ" ? "PJ" : "PF";
    const demoId = `demo-${product}-${Date.now().toString(36)}`;
    router.push(
      `/solicitacao/${demoId}?product=${product}&mode=demo&customerType=${customerType}&consent=${CONSENT_VERSION}`,
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="mx-auto flex w-full max-w-lg flex-col items-center">
        <Link href="/" className="inline-flex" aria-label="Nuviora, início">
          <Image
            src="/image/logo.png"
            alt="Nuviora"
            width={2172}
            height={724}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>
        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-brand-green/80">
          Simulação
        </p>
      </header>

      <div className="mx-auto mt-8 w-full max-w-xl">
        <QuoteStepNav
          steps={navSteps}
          currentIndex={stepIndex}
          reviewMode={reviewMode}
        />
      </div>

      <div className="mx-auto mt-10 w-full max-w-md">
        {reviewMode ? (
          <div className="motion-safe:animate-[step-enter_var(--duration-step)_var(--ease-standard)]">
            <p className="text-center text-xs font-medium text-brand-green">
              {siteCopy.quoteFlow.demoBadge}
            </p>
            <h1 className="mt-3 text-center font-display text-2xl font-bold text-brand-navy">
              {siteCopy.quoteFlow.reviewTitle}
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {siteCopy.quoteFlow.reviewBody}
            </p>
            <dl className="mt-6 space-y-3 rounded-2xl border border-border/70 bg-brand-cream/50 p-4 text-sm">
              {Object.entries(allAnswers).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between gap-4 border-b border-border/40 pb-2 last:border-0"
                >
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="text-right font-medium">
                    {typeof value === "boolean"
                      ? value
                        ? "Sim"
                        : "Não"
                      : String(value)}
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {config.disclosures.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                type="button"
                size="lg"
                className="h-14 w-full rounded-full bg-brand-mint text-brand-navy hover:bg-[#a8ecc8]"
                onClick={finishDemo}
              >
                {siteCopy.quoteFlow.finishCta}
              </Button>
              <button
                type="button"
                className="text-sm font-medium text-brand-green underline underline-offset-4"
                onClick={() => setReviewMode(false)}
              >
                Voltar e editar
              </button>
            </div>
          </div>
        ) : (
          <QuoteStepForm
            key={`${product}-${stepIndex}`}
            product={product}
            step={{ ...step, title: stepHeading(product, stepIndex, step) }}
            defaultValues={defaultValues}
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            onBack={() => setStepIndex((i) => Math.max(0, i - 1))}
            onValid={onStepValid}
          />
        )}
      </div>
    </div>
  );
}
