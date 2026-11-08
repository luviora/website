"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteCopy } from "@/content/site-copy";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Seguros", href: "/#produtos" },
  { label: "Empréstimos", href: "/emprestimos" },
  { label: "Como funciona", href: "/como-funciona" },
  { label: "Dúvidas", href: "/duvidas" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overlay = pathname === "/";
  const drawerId = useId();

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color] duration-300",
        overlay
          ? "border-b border-white/10 bg-brand-cream/55 backdrop-blur-xl supports-[backdrop-filter]:bg-brand-cream/45"
          : "border-b border-border/80 bg-background/95 backdrop-blur-sm",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-brand-ink/90 link-underline transition-colors duration-200 hover:text-brand-green"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/#cotador"
              className={cn(buttonVariants({ size: "lg" }), "hidden sm:inline-flex")}
            >
              {siteCopy.hero.ctaPrimary}
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-11 touch-manipulation md:hidden"
              aria-expanded={open}
              aria-controls={drawerId}
              aria-haspopup="dialog"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={toggle}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Drawer fullscreen mobile: abre/fecha por toggle, link ou Escape */}
      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className={cn(
            "absolute inset-0 flex h-dvh w-full flex-col bg-background transition-[opacity,transform] duration-300 ease-[var(--ease-standard)]",
            "pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]",
            open
              ? "translate-y-0 opacity-100"
              : "invisible translate-y-3 opacity-0",
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/80 px-4 sm:h-[4.25rem] sm:px-6">
            <Logo />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-11 touch-manipulation"
              aria-label="Fechar menu"
              onClick={close}
            >
              <X className="size-5" />
            </Button>
          </div>

          <nav
            className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6"
            aria-label="Menu mobile"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-14 items-center rounded-xl px-4 text-lg font-semibold text-brand-ink touch-manipulation transition-colors hover:bg-muted active:bg-muted"
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 border-t border-border/80 px-4 py-5 sm:px-6">
            <Link
              href="/#cotador"
              onClick={close}
              className={cn(buttonVariants({ size: "lg" }), "w-full touch-manipulation")}
            >
              {siteCopy.hero.ctaPrimary}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
