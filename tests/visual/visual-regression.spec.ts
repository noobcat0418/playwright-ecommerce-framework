import { test, expect } from '../../fixtures/pageFixtures';
import { allure } from 'allure-playwright';

test.describe('Visual Regression Tests', () => {

  test.describe('Login Page Visuals', () => {
    test('VIS-001: login page default state', async ({ page, loginPage, waitHelper }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Login Page');
      await allure.story('Default State');
      await allure.severity('minor');

      await test.step('Navigate to login page', async () => {
        await loginPage.navigate();
        await waitHelper.waitForNetworkIdle();
      });

      await test.step('Take screenshot and compare', async () => {
        await expect(page).toHaveScreenshot('login-page-default.png', {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('VIS-002: login page with error message', async ({ page, loginPage, waitHelper }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Login Page');
      await allure.story('Error State');
      await allure.severity('minor');

      await test.step('Navigate and trigger error', async () => {
        await loginPage.navigate();
        await loginPage.login('invalid_user', 'wrong_password');
        await waitHelper.delay(300);
      });

      await test.step('Take screenshot and compare', async () => {
        await expect(page).toHaveScreenshot('login-page-error.png', {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('VIS-003: login page locked out error', async ({ page, loginPage, waitHelper }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Login Page');
      await allure.story('Locked Out State');
      await allure.severity('minor');

      await test.step('Navigate and trigger locked out error', async () => {
        await loginPage.navigate();
        await loginPage.login('locked_out_user', 'secret_sauce');
        await waitHelper.delay(300);
      });

      await test.step('Take screenshot and compare', async () => {
        await expect(page).toHaveScreenshot('login-page-locked-out.png', {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });
  });

  test.describe('Inventory Page Visuals', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
      await loginPage.navigate();
      await loginPage.loginAsStandardUser();
      await inventoryPage.verifyOnInventoryPage();
    });

    test('VIS-004: inventory page default state', async ({ page, waitHelper }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Inventory Page');
      await allure.story('Default State');
      await allure.severity('minor');

      await test.step('Wait for page to fully load', async () => {
        await waitHelper.waitForNetworkIdle();
      });

      await test.step('Take screenshot and compare', async () => {
        await expect(page).toHaveScreenshot('inventory-page-default.png', {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('VIS-005: inventory page with open menu', async ({ page, waitHelper }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Inventory Page');
      await allure.story('Menu Open State');
      await allure.severity('minor');

      await test.step('Open hamburger menu', async () => {
        await page.locator('#react-burger-menu-btn').click();
        await waitHelper.delay(500);
      });

      await test.step('Take screenshot and compare', async () => {
        await expect(page).toHaveScreenshot('inventory-page-menu-open.png', {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('VIS-006: single product card', async ({ page }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Inventory Page');
      await allure.story('Product Card');
      await allure.severity('minor');

      await test.step('Take screenshot of first product card', async () => {
        const productCard = page.locator('.inventory_item').first();
        await expect(productCard).toHaveScreenshot('product-card-default.png');
      });
    });
  });

  test.describe('Responsive Visuals', () => {
    test('VIS-007: login page mobile view', async ({ page, loginPage, waitHelper }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Responsive');
      await allure.story('Mobile View');
      await allure.severity('minor');

      await test.step('Set mobile viewport and navigate', async () => {
        await page.setViewportSize({ width: 375, height: 667 });
        await loginPage.navigate();
        await waitHelper.waitForNetworkIdle();
      });

      await test.step('Take screenshot and compare', async () => {
        await expect(page).toHaveScreenshot('login-page-mobile.png', {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });

    test('VIS-008: inventory page tablet view', async ({ page, loginPage, waitHelper }) => {
      await allure.epic('Visual Regression');
      await allure.feature('Responsive');
      await allure.story('Tablet View');
      await allure.severity('minor');

      await test.step('Set tablet viewport, navigate and login', async () => {
        await page.setViewportSize({ width: 768, height: 1024 });
        await loginPage.navigate();
        await loginPage.loginAsStandardUser();
        await waitHelper.waitForNetworkIdle();
      });

      await test.step('Take screenshot and compare', async () => {
        await expect(page).toHaveScreenshot('inventory-page-tablet.png', {
          fullPage: true,
          animations: 'disabled'
        });
      });
    });
  });
});
