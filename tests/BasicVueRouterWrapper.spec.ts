import { test, expect } from '@playwright/test';

const PLAYWRIGHT_TEST_BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL as string || "https://storybook-vue3-router.netlify.app/"

test('Basic Route View Wrapper', async ({ page }) => {
  await page.goto(PLAYWRIGHT_TEST_BASE_URL);

  // Go to story
  await page.click("text=Basic Router View Wrapper")

  // await new Promise(resolve => setTimeout(resolve, 100))

  // Get story iframe
  const story = await page.frameLocator('#storybook-preview-iframe').locator('#root')

  // ###################################
  // test basic page elements on load
  // ###################################
  // expect loads expected route component
  await expect(story.locator('h2')).toHaveText('Home');
  await expect(story.locator('.intro p')).toHaveText('Path: /');
  // expect loads router link components
  await expect(story.locator('a')).toContainText(['Home', 'About']);
  // expect home route to be the active router link
  await expect(story.locator('a:has-text("Home")')).toHaveClass('router-link-active router-link-exact-active')

  // ###################################
  // test router link works
  // ###################################
  // click the about router link
  await story.locator('a:has-text("About")').click()
  // expect loads expected route component
  await expect(story.locator('h2')).toHaveText('About');
  await expect(story.locator('.intro p')).toHaveText('Path: /about');
  // expect home route to be the active router link
  await expect(story.locator('a:has-text("About")')).toHaveClass('router-link-active router-link-exact-active')
});
