import { describe, expect, it } from "vitest";
import { isSafeFipeId } from "@/lib/fipe/client";
import { filterFipeItems } from "@/lib/fipe/browser";
import { buildStepSchema } from "@/features/quotes/schemas/build-step-schema";
import { QUOTE_CONFIG } from "@/features/quotes/config/products";

describe("FIPE helpers", () => {
  it("accepts safe FIPE ids including year-fuel codes", () => {
    expect(isSafeFipeId("25")).toBe(true);
    expect(isSafeFipeId("2020-5")).toBe(true);
    expect(isSafeFipeId("../etc")).toBe(false);
  });

  it("filters brands by query", () => {
    const items = [
      { code: "25", name: "Honda" },
      { code: "59", name: "VW - VolksWagen" },
      { code: "7", name: "BMW" },
    ];
    expect(filterFipeItems(items, "hon").map((i) => i.code)).toEqual(["25"]);
    expect(filterFipeItems(items, "").length).toBe(3);
  });

  it("requires FIPE selection codes on auto vehicle step", () => {
    const step = QUOTE_CONFIG.auto.steps.find((s) => s.id === "vehicle")!;
    const schema = buildStepSchema(step);
    expect(
      schema.safeParse({
        brand: "Honda",
        brandCode: "25",
        model: "Civic",
        modelCode: "7693",
        year: "2020 Flex",
        yearCode: "2020-5",
        fipeCode: "014090-2",
      }).success,
    ).toBe(true);
    expect(
      schema.safeParse({
        brand: "Honda",
        brandCode: "",
        model: "Civic",
        modelCode: "7693",
        year: "2020 Flex",
        yearCode: "2020-5",
      }).success,
    ).toBe(false);
  });
});
