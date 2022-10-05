import { test, expect } from '@playwright/test';

const PLAYWRIGHT_TEST_BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL as string || "https://storybook-vue3-router.netlify.app/"

test('Loads Inital README page', async ({ page }) => {
  await page.goto(PLAYWRIGHT_TEST_BASE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/README/);

  const story = await page.frameLocator('#storybook-preview-iframe')

  await expect(story.locator('text=Storybook Vue3 Router')).toBeTruthy();
});
