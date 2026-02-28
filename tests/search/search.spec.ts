import { test, expect } from '../../fixtures/pageFixtures';
import { allure } from 'allure-playwright';

test.describe('Product Search', () => {

  test.beforeEach(async ({ searchPage }) => {
    await searchPage.navigate();
  });

  test('TC-001: Verify search results are displayed when searching for a matching product', async ({ page, searchPage }) => {
    await allure.epic('Product Catalog');
    await allure.feature('Search');
    await allure.story('Search Results Display');
    await allure.severity('critical');
    await allure.description('Verify that searching for a known product keyword returns visible results.');

    const searchTerm = 'Top';

    await test.step('Submit search for a known product keyword', async () => {
      await searchPage.searchFor(searchTerm);
      await expect(searchPage.searchedProductsHeading).toBeVisible();
    });

    await test.step('Verify "Searched Products" section is visible', async () => {
      await expect(searchPage.searchedProductsSection).toBeVisible();
    });

    await test.step('Verify the section heading shows "Searched Products"', async () => {
      await expect(searchPage.searchedProductsHeading).toContainText('Searched Products', { ignoreCase: true });
    });

    await test.step('Verify at least one product result is returned', async () => {
      await expect(searchPage.productNames.first()).toBeVisible();
      const resultCount = await searchPage.productNames.count();
      expect(resultCount).toBeGreaterThan(0);
    });
  });

  test('TC-002: Verify product names in search results contain the search keyword', async ({ page, searchPage }) => {
    await allure.epic('Product Catalog');
    await allure.feature('Search');
    await allure.story('Search Result Accuracy');
    await allure.severity('normal');
    await allure.description('Verify that product names in search results contain the search keyword.');

    const searchTerm = 'Jeans';

    await test.step('Submit search for a known product keyword', async () => {
      await searchPage.searchFor(searchTerm);
      await expect(searchPage.searchedProductsHeading).toBeVisible();
    });

    await test.step('Verify results are visible', async () => {
      await expect(searchPage.productNames.first()).toBeVisible();
    });

    await test.step('Verify first result name contains the search keyword', async () => {
      const firstProductName: string = (await searchPage.productNames.first().textContent()) ?? '';
      expect(firstProductName.toLowerCase()).toContain(searchTerm.toLowerCase());
    });
  });

  test('TC-003: Verify clicking a search result navigates to the correct product detail page', async ({ page, searchPage }) => {
    await allure.epic('Product Catalog');
    await allure.feature('Search');
    await allure.story('Search Result Navigation');
    await allure.severity('normal');
    await allure.description('Verify that clicking a search result navigates to the correct product detail page.');

    const searchTerm = 'Dress';

    let expectedProductName = '';

    await test.step('Submit search and capture first product name', async () => {
      await searchPage.searchFor(searchTerm);
      await expect(searchPage.searchedProductsHeading).toBeVisible();

      await expect(searchPage.productNames.first()).toBeVisible();
      expectedProductName = (await searchPage.productNames.first().textContent()) ?? '';
    });

    await test.step('Click "View Product" on the first search result', async () => {
      await searchPage.viewProductLink(0).click();
    });

    await test.step('Verify URL navigates to the product detail page', async () => {
      await expect(page).toHaveURL(/product_details/);
    });

    await test.step('Verify product name on detail page matches the search result', async () => {
      const detailPageName = await page.locator('.product-information h2').textContent();
      expect(detailPageName?.trim()).toBe(expectedProductName.trim());
    });
  });

});
