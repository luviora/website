import { test, expect } from "@playwright/test";

test("home to auto quote demo", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: /Proteção e crédito que cabem no seu momento de vida/,
    }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Seguro Auto/i }).first().click();
  await expect(page).toHaveURL(/\/cotar\/auto/);
  await page.getByLabel("Marca").fill("Marca X");
  await page.getByLabel("Modelo").fill("Modelo Y");
  await page.getByLabel("Ano").fill("2022");
  await page.getByRole("button", { name: "Avançar" }).click();
  await expect(page.getByLabel("CEP de pernoite")).toBeVisible();
  await page.getByLabel("CEP de pernoite").fill("01310-100");
  await page.getByLabel("Uso principal").selectOption("particular");
  await page.getByRole("button", { name: "Avançar" }).click();
  await page.getByLabel("Nível desejado").selectOption("balanced");
  await page.getByRole("button", { name: "Avançar" }).click();
  await page.getByLabel("Nome").fill("Demo");
  await page.getByLabel("E-mail").fill("demo@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Revisar" }).click();
  await page.getByRole("button", { name: "Concluir demonstração" }).click();
  await expect(
    page.getByRole("heading", { name: "Demonstração concluída" }),
  ).toBeVisible();
});
