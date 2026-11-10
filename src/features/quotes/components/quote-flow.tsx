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
import { reviewEntries } from "@/features/quotes/lib/answer-labels";
import {
  clearQuoteAnswers,
  loadQuoteAnswers,
  saveQuoteAnswers,
} from "@/features/quotes/lib/quote-answers-storage";
import {
  canEnterReview,
  farthestReachableIndex,
  needsCanonicalStepSync,
} from "@/features/quotes/lib/quote-orchestration";
import {
  resolveQuoteLocation,
  REVIEW_STEP,
} from "@/features/quotes/lib/resolve-quote-location";
import { QuoteStepNav } from "@/components/quotes/quote-step-nav";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/events";
import { CONSENT_VERSION } from "@/lib/api/quote-types";
import { siteCopy } from "@/content/site-copy";

export function QuoteFlow({ product }: { product: ProductType }) {
  const config = QUOTE_CONFIG[product];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [allAnswers, setAllAnswers] = useState<Record<string, unknown>>({});
  const [hydrated, setHydrated] = useState(false);
  const [finishError, setFinishError] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    setAllAnswers(loadQuoteAnswers(product));
    setHydrated(true);
  }, [product]);

  useEffect(() => {
    if (!hydrated) return;
    saveQuoteAnswers(product, allAnswers);
  }, [allAnswers, hydrated, product]);

  const activeSteps = useMemo(
    () => getActiveQuoteSteps(product, allAnswers),
    [product, allAnswers],
  );
  const activeStepIds = useMemo(
    () => activeSteps.map((s) => s.id),
    [activeSteps],
  );

  const stepFromUrl = searchParams.get("step");
  const location = useMemo(
    () => resolveQuoteLocation(stepFromUrl, activeStepIds),
    [stepFromUrl, activeStepIds],
  );
  const isReview = location.kind === "review";
  const stepIndex =
    location.kind === "step"
      ? location.index
      : Math.max(0, activeSteps.length - 1);
  const step = activeSteps[stepIndex] ?? activeSteps[0];
  const totalSteps = activeSteps.length;
  const navSteps = activeSteps.map((s) => ({ id: s.id, title: s.title }));
  const reachableIndex = useMemo(
    () => farthestReachableIndex(product, allAnswers, stepIndex),
    [product, allAnswers, stepIndex],
  );
  const summary = useMemo(
    () => reviewEntries(product, allAnswers),
    [product, allAnswers],
  );
  const reviewReady = useMemo(
    () => canEnterReview(product, allAnswers),
    [product, allAnswers],
  );

  const syncStepInUrl = useCallback(
    (stepId: string, mode: "replace" | "push" = "replace") => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get("step") === stepId) return;
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

  // URL canônica: review gateado + step inativo → vizinho ativo (nunca “some” para vehicle).
  useEffect(() => {
    if (!hydrated) return;
    const next = needsCanonicalStepSync(product, stepFromUrl, allAnswers);
    if (next) syncStepInUrl(next, "replace");
  }, [allAnswers, hydrated, product, stepFromUrl, syncStepInUrl]);

  const defaultValues = useMemo(() => {
    if (!step) return {};
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
    if (index > reachableIndex) return;
    setFinishError(null);
    syncStepInUrl(next.id, mode);
  }

  function onStepValid(values: Record<string, unknown>) {
    setFinishError(null);
    let merged = { ...allAnswers, ...values };
    if (product === "emprestimos" && merged.collateral !== "vehicle") {
      merged = clearVehicleFipeAnswers(merged);
    }
    setAllAnswers(merged);

    const nextSteps = getActiveQuoteSteps(product, merged);
    const currentId = step?.id;
    const currentIndex = nextSteps.findIndex((s) => s.id === currentId);
    const safeIndex = currentIndex >= 0 ? currentIndex : stepIndex;

    trackEvent("quote_step_viewed", {
      product,
      step: String(safeIndex + 1),
    });

    if (safeIndex < nextSteps.length - 1) {
      const next = nextSteps[safeIndex + 1];
      if (next) syncStepInUrl(next.id, "push");
      return;
    }

    if (!canEnterReview(product, merged)) {
      const incomplete = nextSteps.find((s) => s.id !== currentId);
      if (incomplete) {
        syncStepInUrl(incomplete.id, "push");
        setFinishError(siteCopy.quoteFlow.reviewEmptyError);
      }
      return;
    }

    syncStepInUrl(REVIEW_STEP, "push");
    trackEvent("quote_review_viewed", { product });
  }

  async function finishDemo() {
    if (finishing) return;
    if (!reviewReady) {
      setFinishError(siteCopy.quoteFlow.reviewEmptyError);
      const next = needsCanonicalStepSync(product, REVIEW_STEP, allAnswers);
      if (next) syncStepInUrl(next, "replace");
      return;
    }

    setFinishing(true);
    setFinishError(null);
    try {
      trackEvent("quote_demo_completed", { product });
      clearQuoteAnswers(product);
      const customerType =
        (allAnswers.customerType as string) === "PJ" ? "PJ" : "PF";
      const demoId = `demo-${product}-${Date.now().toString(36)}`;
      router.push(
        `/solicitacao/${demoId}?product=${product}&mode=demo&customerType=${customerType}&consent=${CONSENT_VERSION}`,
      );
    } catch {
      setFinishing(false);
      setFinishError(siteCopy.quoteFlow.finishError);
    }
  }

  if (!hydrated || !step) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16 text-sm text-muted-foreground">
        Carregando simulação…
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="mx-auto flex w-full max-w-lg flex-col items-center">
        <Link href="/" className="inline-flex" aria-label="Nuviora, início">
          <Image
            src="/image/logo.png"
            alt="Nuviora"
            width={260}
            height={87}
            priority
            sizes="(max-width: 640px) 180px, 220px"
            className="h-[3.24rem] w-auto sm:h-[3.6rem]"
          />
        </Link>
        <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-brand-green/80">
          Simulação
        </p>
        <p className="mt-1 text-center text-sm font-medium text-brand-navy/80">
          {config.productTitle}
        </p>
      </header>

      <div className="mx-auto mt-8 w-full max-w-xl">
        <QuoteStepNav
          steps={navSteps}
          currentIndex={stepIndex}
          reviewMode={isReview}
          reachableIndex={reachableIndex}
          onStepSelect={(index) => goToStepIndex(index, "push")}
        />
      </div>

      <div className="mx-auto mt-10 w-full max-w-md">
        {isReview ? (
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

            {finishError ? (
              <p
                className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-center text-sm text-destructive"
                role="alert"
              >
                {finishError}
              </p>
            ) : null}

            {summary.length === 0 ? (
              <p className="mt-6 rounded-2xl border border-border/70 bg-brand-cream/50 p-4 text-center text-sm text-muted-foreground">
                {siteCopy.quoteFlow.reviewEmptyHint}
              </p>
            ) : (
              <dl className="mt-6 space-y-3 rounded-2xl border border-border/70 bg-brand-cream/50 p-4 text-sm">
                {summary.map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between gap-4 border-b border-border/40 pb-2 last:border-0"
                  >
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="max-w-[58%] text-right font-medium text-brand-navy">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-4 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
              {config.disclosures.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button
                type="button"
                size="lg"
                disabled={finishing || !reviewReady}
                className="h-14 w-full rounded-full bg-brand-mint text-brand-navy hover:bg-[#a8ecc8] disabled:opacity-60"
                onClick={finishDemo}
              >
                {finishing
                  ? siteCopy.quoteFlow.finishPending
                  : siteCopy.quoteFlow.finishCta}
              </Button>
              <button
                type="button"
                className="text-sm font-medium text-brand-green underline underline-offset-4"
                onClick={() =>
                  goToStepIndex(Math.max(0, activeSteps.length - 1), "push")
                }
              >
                {siteCopy.quoteFlow.editCta}
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
