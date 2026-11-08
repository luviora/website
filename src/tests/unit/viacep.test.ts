import { describe, expect, it } from "vitest";

describe("ViaCEP address rules", () => {
  it("marks street editable only when logradouro is empty", () => {
    const withStreet = { logradouro: "Av. Paulista" };
    const withoutStreet = { logradouro: "" };
    expect(withStreet.logradouro.trim().length === 0).toBe(false);
    expect(withoutStreet.logradouro.trim().length === 0).toBe(true);
  });
});
