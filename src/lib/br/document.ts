/** Utilitários BR: máscara e validação de CPF, CNPJ, telefone, CEP e BRL. */

export function onlyDigits(value: string, max?: number) {
  const digits = value.replace(/\D/g, "");
  return typeof max === "number" ? digits.slice(0, max) : digits;
}

export function maskCpf(value: string) {
  const d = onlyDigits(value, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskCnpj(value: string) {
  const d = onlyDigits(value, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

/** Máscara automática CPF (11) ou CNPJ (14). */
export function maskDocument(value: string) {
  const d = onlyDigits(value, 14);
  return d.length > 11 ? maskCnpj(d) : maskCpf(d);
}

export function maskPhone(value: string) {
  const d = onlyDigits(value, 11);
  if (d.length <= 10) {
    return d
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return d
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function maskCep(value: string) {
  const d = onlyDigits(value, 8);
  return d.replace(/^(\d{5})(\d)/, "$1-$2");
}

/** Máscara BRL enquanto digita (centavos implícitos). */
export function maskBrl(value: string) {
  const d = onlyDigits(value).slice(0, 12);
  if (!d) return "";
  const cents = Number.parseInt(d, 10);
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseBrlToNumber(value: string): number | null {
  const d = onlyDigits(value);
  if (!d) return null;
  return Number.parseInt(d, 10) / 100;
}

function allSameDigits(digits: string) {
  return /^(\d)\1+$/.test(digits);
}

export function isValidCpf(value: string) {
  const cpf = onlyDigits(value, 11);
  if (cpf.length !== 11 || allSameDigits(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  if (rest !== Number(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10) rest = 0;
  return rest === Number(cpf[10]);
}

export function isValidCnpj(value: string) {
  const cnpj = onlyDigits(value, 14);
  if (cnpj.length !== 14 || allSameDigits(cnpj)) return false;

  const calc = (base: string, factors: number[]) => {
    const sum = factors.reduce(
      (acc, factor, i) => acc + Number(base[i]) * factor,
      0,
    );
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const d1 = calc(cnpj, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calc(cnpj, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return d1 === Number(cnpj[12]) && d2 === Number(cnpj[13]);
}

export function isValidDocument(value: string) {
  const d = onlyDigits(value);
  if (d.length <= 11) return isValidCpf(d);
  return isValidCnpj(d);
}

export function isValidPhone(value: string) {
  const d = onlyDigits(value, 11);
  if (d.length < 10 || d.length > 11) return false;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  if (d.length === 11 && d[2] !== "9") return false;
  return true;
}

export function isValidCep(value: string) {
  return onlyDigits(value, 8).length === 8;
}
