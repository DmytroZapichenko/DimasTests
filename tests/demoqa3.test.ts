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

  // In the left sidebar select "Check box" form
  const checkBoxLink = await page.locator('.element-group', { hasText: 'Elements' }).locator('li', { hasText: 'Check Box' });
  await checkBoxLink.click();

  // Verify "Check box" form opened
  await expect(page).toHaveURL('https://demoqa.com/checkbox');

  // Unfold all "Home" directories using Expand all button
  const expandAllButton = await page.locator('button.rct-option-expand-all');
  await expect(expandAllButton).toBeVisible();
  await expandAllButton.click();

  // Select "Excel File.doc" and "Word File.doc"
  const excelFileSpan = await page.locator('label', { hasText: 'Excel File.doc' }).locator('..').locator('span[class="rct-checkbox"]');
  const wordFileSpan = await page.locator('label', { hasText: 'Word File.doc' }).locator('..').locator('span[class="rct-checkbox"]');
  await excelFileSpan.click();
  await wordFileSpan.click();
  await page.waitForTimeout(1000);

  // Check it was selected
  const excelFileSuccessSpan = await page.locator('span.text-success', { hasText: 'excelFile' });
  const wordFileSuccessSpan = await page.locator('span.text-success', { hasText: 'wordFile' });
  await expect(excelFileSuccessSpan).toBeVisible();
  await expect(wordFileSuccessSpan).toBeVisible();
  
  // Unselect "Excel File.doc"
  await excelFileSpan.click(); // Виправлено з excelFile на excelFileSpan
  await page.waitForTimeout(1000); // Затримка 1 секунда

  // Check that only "Word File.doc" is selected
  await expect(excelFileSuccessSpan).not.toBeVisible();
  await expect(wordFileSuccessSpan).toBeVisible();
  
  // Select all "Desktop" folder
  const desktopSpan = await page.locator('label', { hasText: 'Desktop' }).locator('..').locator('span[class="rct-checkbox"]');
  await desktopSpan.click();
  await page.waitForTimeout(1000); // Затримка 1 секунда

  // Check it is selected
  const desktopSuccessSpan = await page.locator('span.text-success', { hasText: 'desktop' });
  const notesSuccessSpan = await page.locator('span.text-success', { hasText: 'notes' });
  const commandsSuccessSpan = await page.locator('span.text-success', { hasText: 'commands' });
  await expect(desktopSuccessSpan).toBeVisible();
  await expect(notesSuccessSpan).toBeVisible();
  await expect(commandsSuccessSpan).toBeVisible();

  // 14. Fold back "Home" structure
  const homeToggleButton = await page.locator('label', { hasText: 'Home' }).locator('..').locator('button.rct-collapse.rct-collapse-btn');
  await homeToggleButton.click();
  await page.waitForTimeout(500);

  // 15. Check everything is still selected
  await homeToggleButton.click(); 
  await expect(excelFileSuccessSpan).not.toBeVisible(); 
  await expect(wordFileSuccessSpan).toBeVisible();
  await expect(desktopSuccessSpan).toBeVisible(); 
  await expect(notesSuccessSpan).toBeVisible(); 
  await expect(commandsSuccessSpan).toBeVisible();
});