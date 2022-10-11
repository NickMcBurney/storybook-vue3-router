import { test, expect, Page } from '@playwright/test';

const PLAYWRIGHT_TEST_BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL as string || "https://storybook-vue3-router.netlify.app/"

const testRouterGuardAuth = async (page: Page) => {
  // Get story iframe
  const story = await page.frameLocator('#storybook-preview-iframe').locator('#root')

  // ###################################
  // test auth router guards
  // ###################################
  // login is false initially
  await expect(story.locator('p.login-state')).toHaveText('Is Logged-In: false');

  // try accessing dashboard whilst logged out
  // click dashboard router-link
  await page.click('a:has-text("View dashboard")')
  // expect dashboard page is blocked by guard
  await expect(story.locator('p.login-warning')).toBeVisible()
  await expect(story.locator('p.login-warning')).toHaveText('You can\'t access the dashboard whilst not logged in.')

  // click login button
  await page.click('button:has-text("Login")')
  // expect login state is true after button click
  await expect(story.locator('p.login-state')).toHaveText('Is Logged-In: true');

  // click dashboard router-link
  await page.click('a:has-text("View dashboard")')

  // expect dashboard route is loaded
  await expect(story.locator('h2:has-text("Dashboard")')).toBeVisible()

  // logout
  await page.click('button:has-text("Logout")')
  await expect(story.locator('h2:has-text("Login")')).toBeVisible()
  await expect(story.locator('p.login-state')).toHaveText('Is Logged-In: false');
}

test.describe('Router Guards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYWRIGHT_TEST_BASE_URL);
  
    // Go to story
    await page.click("text=With Router Guard")
  })

  test('Per Route Guard', async ({ page }) => {
    await testRouterGuardAuth(page)
  })
  test('Global Guard Guard', async ({ page }) => {
    // Go to story
    await page.click("text=Global Guard")

    await testRouterGuardAuth(page)
  })
})
