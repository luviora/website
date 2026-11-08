/** Tipos da Tabela FIPE via Parallelum (proxy interno). */

export type FipeVehicleType = "cars" | "motorcycles" | "trucks";

export type FipeItem = {
  code: string;
  name: string;
};

export type FipeVehicleInfo = {
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  codeFipe: string;
  /** Referência de mercado FIPE — não usar como prêmio de seguro. */
  price: string;
  referenceMonth: string;
  fuelAcronym?: string;
  vehicleType?: number;
};
