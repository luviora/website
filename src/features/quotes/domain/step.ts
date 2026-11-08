export type FieldType = "text" | "email" | "select" | "number" | "tel" | "checkbox";

export interface QuoteField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
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
