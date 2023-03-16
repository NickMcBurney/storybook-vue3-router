import { test, expect } from '@playwright/test';

const PLAYWRIGHT_TEST_BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL as string || "https://deploy-preview-39--storybook-vue3-router.netlify.app/"

test.describe('Mock Router', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PLAYWRIGHT_TEST_BASE_URL);
  
    // Go to story
    await page.click("text=Mock Router")
    await page.locator("#mock-router--default").click()
  })
  
  test('$route: Loads Mock Route Object', async ({ page }) => {    
    // Get story iframe
    const story = await page.frameLocator('#storybook-preview-iframe').locator('#storybook-root')
  
    // ######################################
    // test mock router object is displayed
    // ######################################
    // expect loads mock router object text
    await expect(story.locator('pre:has-text("isMocked")')).toHaveText(`{
      "isMocked": true,
      "path": "/",
      "fullPath": "/#/",
      "name": "home",
      "meta": {
        "some_meta": "true"
      },
      "params": {
        "some_param": "false"
      },
      "query": {
        "some_query": "false"
      }
    }`);
  });
  test('$route: Mocks Meta Data in Dynamic Template (show/hide based on route meta)', async ({ page }) => {  
    // Go to story
    await page.click("text=Dynamic Template")
  
    // Get story iframe
    const story = await page.frameLocator('#storybook-preview-iframe').locator('#storybook-root')
  
    // ######################################
    // test mock meta data
    // ######################################
    await expect(story).toContainText('some_meta is true!');
  });
  test('$router: Programatic Navigation Mocked', async ({ page }) => {  
    // Go to story
    await page.click("text=Programatic Navigation")
  
    // Get story iframe
    const story = await page.frameLocator('#storybook-preview-iframe').locator('#storybook-root')
  
    // ######################################
    // test programatic navigation events
    // ######################################
    // open actions panel
    await page.locator('#tabbutton-actions').click()
    // get actions panel content
    const actionsPanel = await page.locator('#panel-tab-content')

    // test push event
    await story.locator('button:has-text("Push")').click()
    await expect(actionsPanel).toContainText('$router.push()');

    // test replace event
    await story.locator('button:has-text("Replace")').click()
    await expect(actionsPanel).toContainText('$router.replace()');

    // test go event
    await story.locator('button:has-text("Go")').click()
    await expect(actionsPanel).toContainText('$router.go()');

    // test back event
    await story.locator('button:has-text("Back")').click()
    await expect(actionsPanel).toContainText('$router.back()');

    // test forward event
    await story.locator('button:has-text("Forward")').click()
    await expect(actionsPanel).toContainText('$router.forward()');
  });
})

