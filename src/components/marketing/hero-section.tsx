import Image from "next/image";
import Link from "next/link";
import { siteCopy } from "@/content/site-copy";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { hero } = siteCopy;
  return (
    <section className="hero-gradient relative z-0 overflow-hidden text-brand-cream">
      {/* pb reserva a faixa onde ~30% do cotador sobrepõe o hero */}
      <Container className="relative z-10 grid min-h-[min(72dvh,720px)] grid-cols-1 items-center gap-8 pt-10 pb-24 sm:pb-28 lg:min-h-[min(100dvh,920px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-32 lg:pt-14">
        <div className="max-w-[36rem]">
          {/* Tipografia de sistema no LCP (PageSpeed mobile); Manrope continua no restante do site */}
          <h1
            className="text-[clamp(2.25rem,5vw,3.65rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
            style={{
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            }}
          >
            {hero.title}
          </h1>
          <p
            className="mt-4 text-[clamp(1.15rem,2.2vw,1.45rem)] font-medium leading-snug text-brand-mint"
            style={{
              fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            }}
          >
            {hero.titleAccent}
          </p>
          <p className="mt-5 max-w-[34rem] text-base leading-[1.65] text-white/85 sm:text-lg">
            {hero.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/#cotador"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-12 bg-brand-mint px-8 text-brand-navy transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-standard)] hover:bg-white hover:shadow-[0_12px_32px_rgb(184_245_213/0.35)] motion-safe:hover:-translate-y-0.5",
              )}
            >
              {hero.ctaPrimary}
            </Link>
            <Link
              href="/como-funciona"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-12 border-white/30 bg-transparent px-8 text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/10",
              )}
            >
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="relative flex min-h-[min(47vh,426px)] items-end justify-center lg:min-h-[min(81vh,762px)] lg:items-center lg:justify-end">
          <Image
            src="/image/persons/person-1-hero.webp"
            alt="Momento cotidiano de quem cuida do que importa"
            width={480}
            height={474}
            quality={70}
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 280px, 400px"
            className="h-auto max-h-[min(56vh,515px)] w-auto max-w-full object-contain object-bottom sm:max-h-[min(63vh,605px)] lg:max-h-[min(81vh,739px)] lg:motion-safe:animate-[person-float_5.5s_var(--ease-standard)_infinite_alternate]"
          />
        </div>
      </Container>
    </section>
  );
}
