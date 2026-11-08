/**
 * Cotação focada (modelo Loovi): sem navbar de marketing.
 */
export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="conteudo" className="flex min-h-screen flex-1 flex-col bg-white">
      {children}
    </main>
  );
}
