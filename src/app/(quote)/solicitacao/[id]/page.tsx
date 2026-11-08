import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solicitação",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SolicitacaoPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  const product = String(query.product ?? "—");
  const mode = String(query.mode ?? "demo");

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-10 sm:py-14">
      <Link href="/" className="mx-auto inline-flex" aria-label="Nuviora — início">
        <Image
          src="/image/logo.png"
          alt="Nuviora"
          width={2172}
          height={724}
          className="h-9 w-auto"
        />
      </Link>
      <p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-brand-green">
        Modo {mode}
      </p>
      <h1 className="mt-3 text-center font-display text-2xl font-bold text-brand-navy">
        Demonstração concluída
      </h1>
      <p className="mt-3 text-center text-muted-foreground">
        Protocolo: <strong className="text-foreground">{id}</strong>
      </p>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Produto: {product}. Nenhum dado foi armazenado ou transmitido nesta demonstração.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-10 h-14 w-full rounded-full bg-brand-mint text-brand-navy hover:bg-[#a8ecc8]",
        )}
      >
        Voltar ao início
      </Link>
    </div>
  );
}
