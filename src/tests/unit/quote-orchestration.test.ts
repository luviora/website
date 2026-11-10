import { describe, expect, it } from "vitest";
import {
  canEnterReview,
  firstIncompleteStepId,
  needsCanonicalStepSync,
  resolveCanonicalStepId,
} from "@/features/quotes/lib/quote-orchestration";
import { REVIEW_STEP } from "@/features/quotes/lib/resolve-quote-location";
import { buildStepSchema } from "@/features/quotes/schemas/build-step-schema";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";
import { getActiveQuoteSteps } from "@/features/quotes/lib/active-steps";

const autoContact = {
  name: "Ana",
  cpf: "529.982.247-25",
  phone: "(11) 98765-4321",
  email: "ana@example.com",
  consent: true,
};

const autoComplete = {
  brand: "VW",
  brandCode: "59",
  model: "Gol",
  modelCode: "1",
  year: "2020 Gasolina",
  yearCode: "2020-1",
  fipeCode: "001",
  usage: "particular",
  hasGasKit: "no",
  hasAdditionalDrivers: "no",
  hasYoungDrivers: "no",
  cep: "01310-100",
  street: "Av. Paulista",
  neighborhood: "Bela Vista",
  city: "São Paulo",
  state: "SP",
  coverages: ["collision", "theft"],
  ...autoContact,
};

describe("quote orchestration", () => {
  it("blocks review until every active auto step is complete", () => {
    expect(canEnterReview("auto", { brand: "VW" })).toBe(false);
    expect(firstIncompleteStepId("auto", {})).toBe("vehicle");
    expect(canEnterReview("auto", autoComplete)).toBe(true);
  });

  it("never keeps review URL when answers are incomplete", () => {
    expect(
      resolveCanonicalStepId("auto", REVIEW_STEP, { brand: "VW" }),
    ).toBe("vehicle");
    expect(
      needsCanonicalStepSync("auto", REVIEW_STEP, { brand: "VW" }),
    ).toBe("vehicle");
  });

  it("keeps review when the journey is complete", () => {
    expect(resolveCanonicalStepId("auto", REVIEW_STEP, autoComplete)).toBe(
      REVIEW_STEP,
    );
    expect(needsCanonicalStepSync("auto", REVIEW_STEP, autoComplete)).toBeNull();
  });

  it("redirects inactive vehicleFipe to the next active emprestimos step", () => {
    const answers = { collateral: "property" };
    const activeIds = getActiveQuoteSteps("emprestimos", answers).map(
      (s) => s.id,
    );
    expect(activeIds).not.toContain("vehicleFipe");
    expect(
      resolveCanonicalStepId("emprestimos", "vehicleFipe", answers),
    ).toBe("risks");
  });

  it("keeps vehicleFipe when collateral is vehicle", () => {
    expect(
      resolveCanonicalStepId("emprestimos", "vehicleFipe", {
        collateral: "vehicle",
      }),
    ).toBe("vehicleFipe");
  });
});

describe("all product schemas stay wired", () => {
  it("builds a schema for every configured step", () => {
    for (const product of Object.keys(QUOTE_CONFIG) as Array<
      keyof typeof QUOTE_CONFIG
    >) {
      for (const step of QUOTE_CONFIG[product].steps) {
        const schema = buildStepSchema(step);
        expect(schema.safeParse({}).success).toBeTypeOf("boolean");
        expect(step.id).toBeTruthy();
        expect(step.fields.length).toBeGreaterThan(0);
      }
    }
  });
});
