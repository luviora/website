import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-display text-2xl font-bold">Página não encontrada</h1>
      <Link href="/" className={cn(buttonVariants(), "mt-6 rounded-xl")}>
        Ir para o início
      </Link>
    </main>
  );
}
