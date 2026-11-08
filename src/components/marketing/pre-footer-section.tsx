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
      className="prefooter-surface relative pt-16 sm:pt-20"
    >
      <Container className="relative z-[1] pb-0">
        <div className="grid items-end gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <Reveal className="md:pb-14 lg:pb-16">
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

          <div className="relative z-[1] flex w-full justify-center md:justify-end">
            <Image
              src="/image/persons/person-2.png"
              alt="Pessoas em momento de decisão sobre proteção e crédito"
              width={1194}
              height={1317}
              sizes="(max-width: 768px) 92vw, 42vw"
              className="h-auto w-full max-w-[min(100%,380px)] object-contain object-bottom motion-safe:animate-[person-float_5.5s_var(--ease-standard)_infinite_alternate] sm:max-w-[440px] md:max-h-[min(58vh,520px)] lg:max-h-[min(62vh,560px)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
