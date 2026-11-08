"use client";

import { Button } from "@/components/ui/button";

export default function QuoteError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="font-display text-xl font-bold">Algo deu errado</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Não foi possível carregar esta simulação. Tente novamente.
      </p>
      <Button className="mt-6 rounded-xl" onClick={reset}>
        Tentar novamente
      </Button>
    </div>
  );
}
