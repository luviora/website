import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" className="min-w-0 flex-1 overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
