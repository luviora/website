/** URL canônica de produção Nuviora. */
export const PRODUCTION_SITE_URL = "https://nuviora-sec.vercel.app";

export const SITE_NAME = "Nuviora";

export const SITE_TAGLINE =
  "Proteção e crédito que cabem no seu momento de vida";

export const SITE_DESCRIPTION =
  "Simule em minutos e tenha as melhores propostas. Seguros e empréstimos com passos claros, sem preço inventado.";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || PRODUCTION_SITE_URL
  );
}
