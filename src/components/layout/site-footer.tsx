import Image from "next/image";
import Link from "next/link";
import { siteCopy } from "@/content/site-copy";
import { PRODUCTS } from "@/features/products/catalog";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  const { footer } = siteCopy;
  const { legal } = footer;

  return (
    <footer className="footer-loovi mt-auto bg-[#0b1f20] text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="Nuviora, início"
              className="footer-logo-mark group inline-flex rounded-xl bg-white px-4 py-3 transition-[transform,box-shadow] duration-500 ease-[var(--ease-standard)] motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.05] hover:shadow-[0_20px_48px_rgb(184_245_213/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1f20]"
            >
              <Image
                src="/image/logo.png"
                alt="Nuviora"
                width={2172}
                height={724}
                className="relative z-[1] h-[2.99rem] w-auto transition-transform duration-500 ease-[var(--ease-standard)] motion-safe:group-hover:scale-[1.04] sm:h-[3.36rem]"
              />
            </Link>
            <p className="mt-5 max-w-[18rem] text-sm leading-relaxed text-white/65">
              {footer.tagline}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              {footer.channelsTitle}
            </h2>
            <ul className="mt-5 space-y-4">
              {footer.channels.map((channel) => (
                <li key={channel.label}>
                  <p className="text-xs text-white/40">{channel.label}</p>
                  <Link
                    href={channel.href}
                    className="mt-0.5 inline-block text-base font-medium text-brand-mint link-underline transition-colors duration-300 hover:text-white"
                  >
                    {channel.display}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-1 text-xs leading-relaxed text-white/45">
              {footer.channelsHours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              {footer.productsTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    href={product.href}
                    className="text-white/70 link-underline transition-colors duration-300 hover:text-white"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
              {footer.linksTitle}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footer.usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 link-underline transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={footer.susepLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 link-underline transition-colors duration-300 hover:text-white"
                >
                  Consulta SUSEP
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-[0.6875rem] leading-[1.7] text-white/50 sm:text-xs">
            {footer.legalIntro} {footer.legalBody} {legal.address}. {legal.cnpj}.{" "}
            {legal.susepProcess}. Consulte{" "}
            <Link
              href={footer.susepLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-mint underline underline-offset-2 transition-colors duration-300 hover:text-white"
            >
              {footer.susepLink.label}
            </Link>
            . © 2026 Nuviora.
          </p>
        </div>
      </Container>
    </footer>
  );
}
