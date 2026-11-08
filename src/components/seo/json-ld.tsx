import { siteCopy } from "@/content/site-copy";
import { PRODUCTS } from "@/features/products/catalog";
import { getSiteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export function JsonLd() {
  const siteUrl = getSiteUrl();
  const faqItems = siteCopy.faq.items;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/image/logo.png`,
          caption: SITE_NAME,
        },
        image: `${siteUrl}/opengraph-image`,
        description: SITE_DESCRIPTION,
        areaServed: {
          "@type": "Country",
          name: "Brasil",
        },
        knowsAbout: [
          "Seguro Auto",
          "Seguro Incêndio",
          "Seguro Fiança",
          "Empréstimos",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME,
        alternateName: "Nuviora Seguros e Empréstimos",
        description: SITE_TAGLINE,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "pt-BR",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${SITE_NAME} | ${SITE_TAGLINE}`,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        description: SITE_DESCRIPTION,
        inLanguage: "pt-BR",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}/opengraph-image`,
        },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#service-quotes`,
        name: "Simulação de seguros e empréstimos",
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: "BR",
        serviceType: "Comparação e encaminhamento de simulações",
        description: SITE_DESCRIPTION,
        url: `${siteUrl}/#cotador`,
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#product-list`,
        name: "Produtos Nuviora",
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.title,
          url: `${siteUrl}${product.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/duvidas#faq`,
        url: `${siteUrl}/duvidas`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Como funciona",
            item: `${siteUrl}/como-funciona`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Dúvidas",
            item: `${siteUrl}/duvidas`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
