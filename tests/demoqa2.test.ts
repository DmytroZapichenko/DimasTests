const { test, expect } = require('@playwright/test');

test('Verify DemoQA header and site loading', async ({ page }) => {
  // Go to https://demoqa.com/
  await page.goto('https://demoqa.com/');
  // Verify that correct site was opened
  await expect(page).toHaveURL('https://demoqa.com/');

  // Click on "Elements" block
  const elementsCard = await page.locator('.card', { hasText: 'Elements' });
  await elementsCard.click();
  // Verify the page opened
  await expect(page).toHaveURL('https://demoqa.com/elements');

  // In the left sidebar select "Text box" form
  const textBoxLink = await page.locator('.element-group', { hasText: 'Elements' }).locator('li', { hasText: 'Text Box' });
  await textBoxLink.click();
  // Verify form loaded
  await expect(page).toHaveURL('https://demoqa.com/text-box');

  const textBoxHeader = await page.locator('h1', { hasText: 'Text Box' });
  await expect(textBoxHeader).toBeVisible();

  // Wait for all form fields to be visible
  const waitForVisible = async (selector) => await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  await waitForVisible('#userName');
  await waitForVisible('#userEmail');
  await waitForVisible('#currentAddress');
  await waitForVisible('#permanentAddress');

  // Fill all the fields in the form
  await page.fill('#userName', 'Ricky Martin');
  await page.fill('#userEmail', 'test@example.com');
  await page.fill('#currentAddress', '789 Oak St, Town, Country');
  await page.fill('#permanentAddress', '101 Pine St, Town, Country');

  // Submit the form
  await page.click('#submit');

  // Check the output block
  const output = await page.locator('#output');
  await expect(output).toBeVisible();

  // Verify each field separately
  const nameField = output.locator('#name');
  await expect(nameField).toHaveText('Name:Ricky Martin');

  const emailField = output.locator('#email');
  await expect(emailField).toHaveText('Email:test@example.com');

  const currentAddress = output.locator('#currentAddress');
  await expect(currentAddress).toHaveText('Current Address :789 Oak St, Town, Country');

  const permanentAddress = output.locator('#permanentAddress');
  await expect(permanentAddress).toHaveText('Permananet Address :101 Pine St, Town, Country');
});
