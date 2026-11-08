import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function UtilityPage({
  eyebrow,
  title,
  body,
  demoNote = "Demonstração. Fluxo preparado para validação de produto, sem envio a parceiros.",
  primaryHref = "/#cotador",
  primaryLabel = "Começar simulação",
  secondaryHref = "/duvidas",
  secondaryLabel = "Falar com suporte",
}: {
  eyebrow: string;
  title: string;
  body: string;
  demoNote?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brand-green">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {body}
        </p>
        <p className="mt-4 rounded-xl bg-brand-cream/80 px-4 py-3 text-sm text-brand-ink/80 ring-1 ring-border/70">
          {demoNote}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryHref}
            className={cn(buttonVariants({ size: "lg" }), "min-h-12")}
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-h-12",
            )}
          >
            {secondaryLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
