import { describe, expect, it } from "vitest";
import {
  needsStepUrlSync,
  resolveQuoteLocation,
  REVIEW_STEP,
} from "@/features/quotes/lib/resolve-quote-location";

const AUTO_STEPS = ["vehicle", "usage", "coverage", "contact"];

describe("resolveQuoteLocation", () => {
  it("keeps review as review (never falls back to first step)", () => {
    expect(resolveQuoteLocation(REVIEW_STEP, AUTO_STEPS)).toEqual({
      kind: "review",
    });
  });

  it("resolves a known step id", () => {
    expect(resolveQuoteLocation("usage", AUTO_STEPS)).toEqual({
      kind: "step",
      id: "usage",
      index: 1,
    });
  });

  it("falls back to first step only for unknown/missing ids", () => {
    expect(resolveQuoteLocation(null, AUTO_STEPS)).toEqual({
      kind: "step",
      id: "vehicle",
      index: 0,
    });
    expect(resolveQuoteLocation("nope", AUTO_STEPS)).toEqual({
      kind: "step",
      id: "vehicle",
      index: 0,
    });
  });
});

describe("needsStepUrlSync", () => {
  it("does not rewrite review at the location layer", () => {
    // Gate de completude fica em quote-orchestration (needsCanonicalStepSync).
    expect(needsStepUrlSync(REVIEW_STEP, AUTO_STEPS)).toBeNull();
  });

  it("rewrites invalid step to first active step", () => {
    expect(needsStepUrlSync("bogus", AUTO_STEPS)).toBe("vehicle");
  });

  it("is stable when URL already matches", () => {
    expect(needsStepUrlSync("coverage", AUTO_STEPS)).toBeNull();
  });
});
