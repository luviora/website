import Image from "next/image";
import Link from "next/link";
import { siteCopy } from "@/content/site-copy";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PreFooterSection() {
  const { prefooter } = siteCopy;
  return (
    <section
      aria-labelledby="prefooter-title"
      className="prefooter-surface relative overflow-x-clip pb-0 pt-16 sm:pt-20"
    >
      <Container className="relative pb-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(280px,420px)] lg:items-end lg:gap-12">
          <Reveal className="lg:pb-16">
            <div className="max-w-xl text-brand-cream">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-brand-mint">
                {prefooter.eyebrow}
              </p>
              <h2
                id="prefooter-title"
                className="mt-4 font-display text-[clamp(1.85rem,3.6vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white"
              >
                {prefooter.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/78 sm:text-lg">
                {prefooter.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#cotador"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "min-h-12 bg-brand-mint text-brand-navy transition-[transform,background-color] duration-300 hover:bg-white motion-safe:hover:-translate-y-0.5",
                  )}
                >
                  {prefooter.ctaPrimary}
                </Link>
                <Link
                  href="/duvidas"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "min-h-12 border-white/30 bg-transparent text-white hover:bg-white/10",
                  )}
                >
                  {prefooter.ctaSecondary}
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex items-end justify-center lg:justify-end">
            <Image
              src="/image/persons/person-2.png"
              alt="Pessoas em momento de decisão sobre proteção e crédito"
              width={1194}
              height={1317}
              sizes="(max-width: 1024px) 90vw, 400px"
              className="h-auto max-h-[min(52vh,480px)] w-auto max-w-[min(100%,460px)] object-contain object-bottom lg:max-h-[min(60vh,540px)]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
