"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProductType } from "@/features/products/catalog";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";
import { QuoteStepForm } from "@/features/quotes/components/quote-step-form";
import {
  clearVehicleFipeAnswers,
  getActiveQuoteSteps,
} from "@/features/quotes/lib/active-steps";
import { QuoteStepNav } from "@/components/quotes/quote-step-nav";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/events";
import { CONSENT_VERSION } from "@/lib/api/quote-types";
import { siteCopy } from "@/content/site-copy";

const REVIEW_STEP = "review";

export function QuoteFlow({ product }: { product: ProductType }) {
  const config = QUOTE_CONFIG[product];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [allAnswers, setAllAnswers] = useState<Record<string, unknown>>({});
  const [reviewMode, setReviewMode] = useState(false);

  const activeSteps = useMemo(
    () => getActiveQuoteSteps(product, allAnswers),
    [product, allAnswers],
  );

  const stepFromUrl = searchParams.get("step");

  const stepIndex = useMemo(() => {
    if (reviewMode || stepFromUrl === REVIEW_STEP) return Math.max(0, activeSteps.length - 1);
    const idx = activeSteps.findIndex((s) => s.id === stepFromUrl);
    return idx >= 0 ? idx : 0;
  }, [activeSteps, stepFromUrl, reviewMode]);

  const step = activeSteps[stepIndex] ?? activeSteps[0];
  const totalSteps = activeSteps.length;
  const navSteps = activeSteps.map((s) => ({ id: s.id, title: s.title }));

  const syncStepInUrl = useCallback(
    (stepId: string, mode: "replace" | "push" = "replace") => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", stepId);
      const href = `${pathname}?${params.toString()}`;
      if (mode === "push") {
        router.push(href, { scroll: false });
      } else {
        router.replace(href, { scroll: false });
      }
    },
    [pathname, router, searchParams],
  );

  // Garante step na URL ao entrar / quando a lista ativa muda.
  useEffect(() => {
    if (reviewMode) {
      if (stepFromUrl !== REVIEW_STEP) {
        syncStepInUrl(REVIEW_STEP);
      }
      return;
    }

    const valid = activeSteps.some((s) => s.id === stepFromUrl);
    if (!valid) {
      const fallback = activeSteps[0]?.id;
      if (fallback) syncStepInUrl(fallback);
    }
  }, [activeSteps, reviewMode, stepFromUrl, syncStepInUrl]);

  // URL → review mode (voltar/avançar do browser).
  useEffect(() => {
    if (stepFromUrl === REVIEW_STEP) {
      setReviewMode(true);
    } else if (reviewMode && stepFromUrl && stepFromUrl !== REVIEW_STEP) {
      setReviewMode(false);
    }
  }, [stepFromUrl, reviewMode]);

  const defaultValues = useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const field of step.fields) {
      const prev = allAnswers[field.name];
      if (field.type === "checkbox") {
        defaults[field.name] = prev === true;
      } else if (field.type === "coverageCards") {
        defaults[field.name] = Array.isArray(prev) ? prev : [];
      } else {
        defaults[field.name] = prev ?? "";
      }
    }
    return defaults;
  }, [step, allAnswers]);

  function goToStepIndex(index: number, mode: "replace" | "push" = "push") {
    const next = activeSteps[index];
    if (!next) return;
    setReviewMode(false);
    syncStepInUrl(next.id, mode);
  }

  function onStepValid(values: Record<string, unknown>) {
    let merged = { ...allAnswers, ...values };
    if (product === "emprestimos" && merged.collateral !== "vehicle") {
      merged = clearVehicleFipeAnswers(merged);
    }
    setAllAnswers(merged);
    trackEvent("quote_step_viewed", {
      product,
      step: String(stepIndex + 1),
    });

    const nextSteps = getActiveQuoteSteps(product, merged);
    if (stepIndex < nextSteps.length - 1) {
      const next = nextSteps[stepIndex + 1];
      setReviewMode(false);
      syncStepInUrl(next.id, "push");
      return;
    }
    setReviewMode(true);
    syncStepInUrl(REVIEW_STEP, "push");
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
            className="h-[2.7rem] w-auto sm:h-12"
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
              {Object.entries(allAnswers)
                .filter(([key]) => !key.endsWith("Code") && key !== "consent")
                .map(([key, value]) => (
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
                        : Array.isArray(value)
                          ? value.join(", ")
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
                onClick={() => goToStepIndex(Math.max(0, activeSteps.length - 1), "push")}
              >
                Voltar e editar
              </button>
            </div>
          </div>
        ) : (
          <QuoteStepForm
            key={`${product}-${step.id}`}
            product={product}
            step={step}
            defaultValues={defaultValues}
            stepIndex={stepIndex}
            totalSteps={totalSteps}
            onBack={() => goToStepIndex(Math.max(0, stepIndex - 1), "push")}
            onValid={onStepValid}
          />
        )}
      </div>
    </div>
  );
}
