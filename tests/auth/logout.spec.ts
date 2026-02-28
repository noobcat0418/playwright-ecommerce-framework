import { test, expect } from '../../fixtures/pageFixtures';
import { allure } from 'allure-playwright';

test.describe('Authentication - Logout Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('TC-011: should logout successfully and redirect to login page', async ({ page, loginPage, inventoryPage, waitHelper }) => {
    await allure.epic('Authentication');
    await allure.feature('Logout');
    await allure.story('Successful Logout');
    await allure.severity('critical');
    await allure.description('Verify that a logged-in user can logout and is redirected to the login page with empty fields.');

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
