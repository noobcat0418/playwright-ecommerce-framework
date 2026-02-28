import { test, expect } from '../../fixtures/pageFixtures';
import { allure } from 'allure-playwright';

test.describe('Product Sorting Tests', () => {

  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.loginAsStandardUser();
    await inventoryPage.verifyOnInventoryPage();
  });

  test('TC-012: should sort products by price low to high', async ({ inventoryPage, waitHelper }) => {
    await allure.epic('Product Catalog');
    await allure.feature('Product Sorting');
    await allure.story('Sort by Price');
    await allure.severity('normal');
    await allure.description('Verify that products are sorted in ascending order by price when selecting low to high.');

    await test.step('Sort by price low to high', async () => {
      await inventoryPage.sortBy('lohi');
      await waitHelper.delay(500);
    });

    await test.step('Verify prices are in ascending order', async () => {
      const prices = await inventoryPage.getProductPrices();

      for (let i = 0; i < prices.length - 1; i++) {
        expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
      }
    });

    await test.step('Verify first item is lowest price ($7.99 - Onesie)', async () => {
      const prices = await inventoryPage.getProductPrices();
      expect(prices[0]).toBe(7.99);
    });

    await test.step('Verify last item is highest price ($49.99 - Fleece Jacket)', async () => {
      const prices = await inventoryPage.getProductPrices();
      expect(prices[prices.length - 1]).toBe(49.99);
    });
  });

  test('TC-013: should sort products by name Z to A', async ({ inventoryPage, waitHelper }) => {
    await allure.epic('Product Catalog');
    await allure.feature('Product Sorting');
    await allure.story('Sort by Name');
    await allure.severity('normal');
    await allure.description('Verify that products are sorted in descending alphabetical order when selecting Z to A.');

    await test.step('Sort by name Z to A', async () => {
      await inventoryPage.sortBy('za');
      await waitHelper.delay(500);
    });

    await test.step('Verify names are in descending alphabetical order', async () => {
      const names = await inventoryPage.getProductNames();

      for (let i = 0; i < names.length - 1; i++) {
        expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
      }
    });

    await test.step('Verify first item is Test.allTheThings()', async () => {
      const names = await inventoryPage.getProductNames();
      expect(names[0]).toContain('Test.allTheThings()');
    });

    await test.step('Verify last item is Sauce Labs Backpack', async () => {
      const names = await inventoryPage.getProductNames();
      expect(names[names.length - 1]).toBe('Sauce Labs Backpack');
    });
  });
});
