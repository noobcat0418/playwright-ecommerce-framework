import { test, expect } from '../../fixtures/pageFixtures';
import { allure } from 'allure-playwright';

test.describe('Product Details Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.loginAsStandardUser();
  });

  test('TC-014: should navigate to product details page with all elements', async ({ page, inventoryPage, productDetailPage, waitHelper }) => {
    await allure.epic('Product Catalog');
    await allure.feature('Product Details');
    await allure.story('View Product Information');
    await allure.severity('normal');
    await allure.description('Verify that clicking a product navigates to the detail page with all elements displayed correctly.');

    const productName = 'Sauce Labs Backpack';
    const expectedPrice = 29.99;

    await test.step('Click on product name', async () => {
      await inventoryPage.clickProductByName(productName);
    });

    await test.step('Wait for navigation to product detail page', async () => {
      await waitHelper.waitForUrl(/.*inventory-item.html/);
    });

    await test.step('Verify on product detail page', async () => {
      await productDetailPage.verifyOnProductDetailPage();
      await expect(page).toHaveURL(/.*inventory-item.html/);
    });

    await test.step('Verify product details', async () => {
      await productDetailPage.verifyProductDetails(productName, expectedPrice);
    });

    await test.step('Verify Add to cart button is visible', async () => {
      await productDetailPage.verifyAddToCartButtonVisible();
    });

    await test.step('Verify Back to products link is visible', async () => {
      await productDetailPage.verifyBackLinkVisible();
    });
  });
});
