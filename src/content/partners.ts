/**
 * Logos de seguradoras (SUSEP) — paths em /public/partners/.
 * Troque pelos vetores do kit oficial quando liberados (ver public/partners/README.md).
 */
export type InsurancePartner = {
  id: string;
  name: string;
  logoSrc: string;
  width: number;
  height: number;
};

export const INSURANCE_PARTNERS: InsurancePartner[] = [
  { id: "porto", name: "Porto Seguro", logoSrc: "/partners/porto-seguro.svg", width: 140, height: 40 },
  { id: "bradesco", name: "Bradesco Seguros", logoSrc: "/partners/bradesco-seguros.svg", width: 150, height: 40 },
  { id: "sulamerica", name: "SulAmérica", logoSrc: "/partners/sulamerica.svg", width: 130, height: 40 },
  { id: "tokio", name: "Tokio Marine", logoSrc: "/partners/tokio-marine.svg", width: 140, height: 40 },
  { id: "allianz", name: "Allianz", logoSrc: "/partners/allianz.svg", width: 120, height: 40 },
  { id: "liberty", name: "Liberty Seguros", logoSrc: "/partners/liberty.svg", width: 130, height: 40 },
  { id: "hdi", name: "HDI Seguros", logoSrc: "/partners/hdi.svg", width: 110, height: 40 },
  { id: "mapfre", name: "Mapfre", logoSrc: "/partners/mapfre.svg", width: 120, height: 40 },
  { id: "zurich", name: "Zurich", logoSrc: "/partners/zurich.svg", width: 110, height: 40 },
  { id: "itau", name: "Itaú Seguros", logoSrc: "/partners/itau-seguros.svg", width: 130, height: 40 },
];
