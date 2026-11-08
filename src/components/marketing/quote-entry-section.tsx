import { EntryQuoteSelector } from "@/components/marketing/entry-quote-selector";
import { Reveal } from "@/components/motion/reveal";

/**
 * Cotador: 80% da largura.
 * Sobreposição: ~30% da altura do card sobe sobre o bg do hero
 * (`translateY(-30%)` é relativo à própria altura do card).
 */
export function QuoteEntrySection() {
  return (
    <section
      aria-labelledby="cotador-title"
      className="relative z-20 bg-brand-cream pb-12 pt-0 sm:pb-14"
    >
      <div className="relative z-20 mx-auto w-[80%] max-w-[80vw] -translate-y-[30%]">
        <Reveal className="reveal--scale">
          <EntryQuoteSelector />
        </Reveal>
      </div>
    </section>
  );
}
