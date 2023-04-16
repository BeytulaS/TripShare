const { chromium } = require("playwright");
const { test, expect } = require("@playwright/test");

describe("Sign In Form", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:5173/signin");
  });

  afterEach(async () => {
    await page.close();
  });

  test("should sign in successfully with valid credentials", async ({
    page,
  }) => {
    await page.fill("#email", "example@email.com");
    await page.fill("#password", "password123");
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    expect(page.url()).toBe("http://localhost:5173/");
  });

  test("should show an error dialog when invalid credentials are entered", async ({
    page,
  }) => {
    await page.fill("#email", "invalid@email.com");
    await page.fill("#password", "invalidpassword");
    await page.click('button[type="submit"]');
    await page.waitForSelector("#error-dialog");

    const dialogMessage = await page.textContent(
      "#error-dialog .MuiDialogContent-root"
    );
    expect(dialogMessage).toBe("Invalid email or password");
  });
});
