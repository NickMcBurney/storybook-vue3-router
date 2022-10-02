import { test, expect } from '@playwright/test';

test('Loads Inital README page', async ({ page }) => {
  console.log('Preview URL:', process.env.PLAYWRIGHT_TEST_BASE_URL)
  await page.goto(process.env.PLAYWRIGHT_TEST_BASE_URL as string);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/README/);

  // await expect(page.locator('h1')).toHaveText('Storybook Vue3 Router');
});
