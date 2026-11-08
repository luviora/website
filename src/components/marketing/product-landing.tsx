import Image from "next/image";
import Link from "next/link";
import type { ProductType } from "@/features/products/catalog";
import { productPages, siteCopy } from "@/content/site-copy";
import { PRODUCT_VISUALS } from "@/content/product-visuals";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const quoteHref: Record<ProductType, string> = {
  auto: "/cotar/auto",
  incendio: "/cotar/incendio",
  fianca: "/cotar/fianca",
  emprestimos: "/cotar/emprestimos",
};

export function ProductLanding({ product }: { product: ProductType }) {
  const page = productPages[product];
  const visual = PRODUCT_VISUALS[product];
  const isEmprestimos = product === "emprestimos";

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={visual.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: visual.objectPosition }}
          />
          <div
            className="absolute inset-0"
            style={{ background: visual.gradient }}
            aria-hidden
          />
        </div>
        <Container className="relative z-10 flex min-h-[min(52vh,420px)] flex-col justify-end py-14 sm:min-h-[min(56vh,480px)] sm:py-16">
          <Reveal>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brand-mint">
              Nuviora
            </p>
            <h1 className="mt-3 max-w-xl font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
              {page.title}
            </h1>
            {isEmprestimos && "lede" in page ? (
              <p className="mt-4 max-w-lg text-lg text-white/88">{page.lede}</p>
            ) : (
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
                {page.body}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={quoteHref[product]}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "min-h-12 rounded-full bg-brand-mint px-8 text-brand-navy hover:bg-white",
                )}
              >
                {page.cta}
              </Link>
              <Link
                href="/#cotador"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-h-12 rounded-full border-white/35 bg-transparent text-white hover:bg-white/10",
                )}
              >
                Ver outros produtos
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <Container className="max-w-3xl">
          <Reveal>
            {isEmprestimos ? (
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {page.body}
              </p>
            ) : (
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Simule em poucos passos, com linguagem clara e revisão antes de qualquer
                envio. {siteCopy.quoteEntry.demoNote}
              </p>
            )}
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground sm:text-base">
              {siteCopy.howItWorks.steps.map((step) => (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-green" aria-hidden />
                  <span>
                    <strong className="font-semibold text-brand-ink">{step.title}.</strong>{" "}
                    {step.body}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
