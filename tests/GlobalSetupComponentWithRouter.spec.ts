import { test, expect } from '@playwright/test';

const PLAYWRIGHT_TEST_BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL as string || "https://storybook-vue3-router.netlify.app/"

test.describe('Global Preview Setup() with Vue Router Setup()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYWRIGHT_TEST_BASE_URL);
  
    // Go to story
    await page.click("text=Global Preview.js Component and Vue Router Decorator")
    await page.locator("#basic-router-view-wrapper--default").click()
  })

  test('Global Button Component Loads', async ({ page }) => {
    // Get story iframe
    const story = await page.frameLocator('#storybook-preview-iframe').locator('#storybook-root')

    // ###################################
    // test basic page elements on load
    // ###################################
    // expect loads expected route component
    const button = story.locator('button')
    await expect(button).not.toBeDisabled()
    // click the globally imported button
    await button.click()
    // button should be disabled after clicking
    await expect(button).toBeDisabled()
  })
})
