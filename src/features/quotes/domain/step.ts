export type FieldType =
  | "text"
  | "email"
  | "select"
  | "number"
  | "tel"
  | "phone"
  | "cpf"
  | "cnpj"
  | "document"
  | "cep"
  | "currency"
  | "checkbox"
  | "choiceCards"
  | "yesNo"
  | "coverageCards"
  | "fipeBrand"
  | "fipeModel"
  | "fipeYear"
  | "hidden";

export interface QuoteFieldOption {
  value: string;
  label: string;
  description?: string;
}

export interface QuoteField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: QuoteFieldOption[];
  helper?: string;
  required?: boolean;
}

export interface QuoteStep {
  id: string;
  title: string;
  description?: string;
  fields: QuoteField[];
}

export interface QuoteProductConfig {
  productTitle: string;
  steps: QuoteStep[];
  disclosures: string[];
}
