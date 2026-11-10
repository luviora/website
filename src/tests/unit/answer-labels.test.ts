import { describe, expect, it } from "vitest";
import { formatAnswerValue } from "@/features/quotes/lib/answer-labels";

describe("formatAnswerValue coverages", () => {
  it("translates coverage codes to Portuguese labels", () => {
    expect(
      formatAnswerValue("auto", "coverages", [
        "collision",
        "theft",
        "thirdParty",
      ]),
    ).toBe("Colisão e danos, Roubo e furto, Terceiros (RCF-V)");
  });

  it("shows Todas as coberturas when the full package is selected", () => {
    expect(
      formatAnswerValue("auto", "coverages", [
        "collision",
        "theft",
        "thirdParty",
        "glass",
        "assistance",
        "spareCar",
      ]),
    ).toBe("Todas as coberturas");
  });
});
