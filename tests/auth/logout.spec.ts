import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Authentication - Logout Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC-011: should logout successfully and redirect to login page', async ({ page, loginPage, inventoryPage, waitHelper }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.loginAsStandardUser();
      await inventoryPage.verifyOnInventoryPage();
    });

    await test.step('Perform logout', async () => {
      await inventoryPage.logout();
    });

    await test.step('Wait for navigation to complete', async () => {
      await waitHelper.waitForUrl('https://www.saucedemo.com/');
    });

    await test.step('Verify redirected to login page', async () => {
      await loginPage.verifyOnLoginPage();
      await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    await test.step('Verify fields are empty', async () => {
      await loginPage.verifyFieldsAreEmpty();
    });
  });
});
