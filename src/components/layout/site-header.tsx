"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color] duration-300",
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
              className="md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </Container>
      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#cotador"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "mt-2 w-full")}
          >
            {siteCopy.hero.ctaPrimary}
          </Link>
        </Container>
      </div>
    </header>
  );
}
