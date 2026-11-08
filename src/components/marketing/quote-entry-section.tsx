import { EntryQuoteSelector } from "@/components/marketing/entry-quote-selector";
import { Reveal } from "@/components/motion/reveal";

/**
 * Cotador: 100% da largura no mobile; ~80% a partir de sm.
 * Sobreposição: ~30% da altura do card sobe sobre o bg do hero.
 */
export function QuoteEntrySection() {
  return (
    <section
      aria-labelledby="cotador-title"
      className="relative z-20 overflow-x-clip bg-brand-cream pb-12 pt-0 sm:pb-14"
    >
      <div className="relative z-20 w-full max-w-none -translate-y-[30%] sm:mx-auto sm:w-[80%] sm:max-w-[40rem] lg:max-w-[80%]">
        <Reveal variant="scale">
          <EntryQuoteSelector />
        </Reveal>
      </div>
    </section>
  );
}
