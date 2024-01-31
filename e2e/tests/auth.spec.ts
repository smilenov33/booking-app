import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in
  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();

  await page.locator("[name=email]").fill("sasho@abv.bg");
  await page.locator("[name=password]").fill("123456");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register${
    Math.floor(Math.random() * 90_000) + 1
  }@test.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign in" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("Test_firstName");
  await page.locator("[name=lastName]").fill("Test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
