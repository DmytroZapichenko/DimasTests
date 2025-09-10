const { test, expect } = require('@playwright/test');

test('Verify DemoQA header and site loading', async ({ page }) => {
  // Go to https://demoqa.com/
  await page.goto('https://demoqa.com/');

  // Verify that correct site was opened
  await expect(page).toHaveURL('https://demoqa.com/');

  //  Click on "Elements" block
  await page.locator('.card', { hasText: 'Elements' }).click();

  // Verify the page opened
  await expect(page).toHaveURL('https://demoqa.com/elements');

  // In the left sidebar select "Text box" form
  await page.locator('.element-group', { hasText: 'Elements' }).locator('li', { hasText: 'Text Box' }).click();

  //  Verify form loaded
  await expect(page).toHaveURL('https://demoqa.com/text-box');
  const textBoxHeader = await page.locator('h1', { hasText: 'Text Box' });
  await expect(textBoxHeader).toBeVisible();

  // Fill all the fields in the form
  await page.waitForSelector('#userName', { state: 'visible', timeout: 10000 });
  await page.fill('#userName', 'Ricky Martin');

  await page.waitForSelector('#userEmail', { state: 'visible', timeout: 10000 });
  await page.fill('#userEmail', 'test@example.com');

  await page.waitForSelector('#currentAddress', { state: 'visible', timeout: 10000 });
  await page.fill('#currentAddress', '789 Oak St, Town, Country');

  await page.waitForSelector('#permanentAddress', { state: 'visible', timeout: 10000 });
  await page.fill('#permanentAddress', '101 Pine St, Town, Country');

  // Submit the form
  await page.click('#submit');

  // 9. Check the output block
  const output = page.locator('#output');
  await expect(output).toBeVisible();

  // 10. Verify each field separately
  const nameField = output.locator('#name');
  await expect(nameField).toHaveText('Name:Ricky Martin');

  const emailField = output.locator('#email');
  await expect(emailField).toHaveText('Email:test@example.com');

  const currentAddress = output.locator('#currentAddress');
  await expect(currentAddress).toHaveText('Current Address :789 Oak St, Town, Country');

  const permanentAddress = output.locator('#permanentAddress');
  await expect(permanentAddress).toHaveText('Permananet Address :101 Pine St, Town, Country');
});
