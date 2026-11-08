import type { ProductType } from "@/features/products/catalog";

export type CustomerType = "PF" | "PJ";
export type QuoteStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "offers_available"
  | "rejected"
  | "expired";
export type SubmissionMode = "demo" | "assisted" | "integrated";

export interface QuoteRequest {
  product: ProductType;
  customerType: CustomerType;
  answers: Record<string, unknown>;
  consentVersion: string;
  source?: { campaign?: string; channel?: string };
}

export interface QuoteResponse {
  id: string;
  status: QuoteStatus;
  submissionMode: SubmissionMode;
  createdAt: string;
}

export const SUBMISSION_MODE: SubmissionMode =
  (process.env.NUVIORA_SUBMISSION_MODE as SubmissionMode) ?? "demo";

export const CONSENT_VERSION = "2026-01-demo";
