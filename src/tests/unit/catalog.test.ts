import { describe, expect, it } from "vitest";
import { PRODUCTS, isProductType } from "@/features/products/catalog";
import { buildStepSchema } from "@/features/quotes/schemas/build-step-schema";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";

describe("product catalog", () => {
  it("lists four products including emprestimos", () => {
    expect(PRODUCTS).toHaveLength(4);
    expect(PRODUCTS.map((p) => p.id)).toContain("emprestimos");
    expect(PRODUCTS.some((p) => p.title.toLowerCase().includes("home equity"))).toBe(
      false,
    );
  });

  it("validates product slugs", () => {
    expect(isProductType("auto")).toBe(true);
    expect(isProductType("invalid")).toBe(false);
  });
});

describe("quote schemas", () => {
  it("requires consent checkbox on auto contact step", () => {
    const step = QUOTE_CONFIG.auto.steps.find((s) => s.id === "contact")!;
    const schema = buildStepSchema(step);
    const result = schema.safeParse({
      name: "Ana",
      email: "ana@example.com",
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("accepts PF/PJ on emprestimos profile", () => {
    const step = QUOTE_CONFIG.emprestimos.steps[0];
    const schema = buildStepSchema(step);
    expect(
      schema.safeParse({ customerType: "PJ", purpose: "working-capital" }).success,
    ).toBe(true);
  });
});
