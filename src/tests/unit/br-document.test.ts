import { describe, expect, it } from "vitest";
import {
  isValidCep,
  isValidCnpj,
  isValidCpf,
  isValidPhone,
  maskBrl,
  maskCpf,
  maskPhone,
  parseBrlToNumber,
} from "@/lib/br/document";

describe("BR masks and validators", () => {
  it("masks CPF and phone", () => {
    expect(maskCpf("52998224725")).toBe("529.982.247-25");
    expect(maskPhone("11987654321")).toBe("(11) 98765-4321");
  });

  it("validates known CPF checksum", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
    expect(isValidCpf("111.111.111-11")).toBe(false);
  });

  it("validates CNPJ checksum", () => {
    expect(isValidCnpj("04.252.011/0001-10")).toBe(true);
    expect(isValidCnpj("00.000.000/0000-00")).toBe(false);
  });

  it("validates phone and CEP", () => {
    expect(isValidPhone("(11) 98765-4321")).toBe(true);
    expect(isValidPhone("1133334444")).toBe(true);
    expect(isValidPhone("119876")).toBe(false);
    expect(isValidCep("01310-100")).toBe(true);
  });

  it("masks and parses BRL", () => {
    expect(maskBrl("12345")).toBe("R$\u00a0123,45");
    expect(parseBrlToNumber("R$ 1.234,56")).toBe(1234.56);
  });
});
