const { test, expect } = require('@playwright/test');

test('Check specific elements on Playwright homepage', async ({ page }) => {
  // Navigate to Playwright homepage
  await page.goto('https://playwright.dev/');

  // Check if navbar with specific class is present
  const navbar = await page.locator('.theme-layout-navbar-left.navbar__items');
  await expect(navbar).toBeVisible();

  // Check if links with specific href attributes are present
  const vsCodeLink = await page.locator('a[href="https://code.visualstudio.com"]');
  await expect(vsCodeLink).toBeVisible();

  const bingLink = await page.locator('a[href="https://bing.com"]');
  await expect(bingLink).toBeVisible();

  const hotstarLink = await page.locator('a[href="https://www.hotstar.com/"]');
  await expect(hotstarLink).toBeVisible();

  const materialUILink = await page.locator('a[href="https://github.com/mui-org/material-ui"]');
  await expect(materialUILink).toBeVisible();

  const ingLink = await page.locator('a[href="https://github.com/ing-bank/lion"]');
  await expect(ingLink).toBeVisible();

  const adobeLink = await page.locator('a[href="https://github.com/adobe/spectrum-web-components"]');
  await expect(adobeLink).toBeVisible();

  const reactNavigationLink = await page.locator('a[href="https://github.com/react-navigation/react-navigation"]');
  await expect(reactNavigationLink).toBeVisible();

  const accessibilityInsightsLink = await page.locator('a[href="https://accessibilityinsights.io/"]');
  await expect(accessibilityInsightsLink).toBeVisible();
});