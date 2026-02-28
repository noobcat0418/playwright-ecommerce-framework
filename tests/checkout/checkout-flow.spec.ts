import { test, expect } from '../../fixtures/pageFixtures';
import { DataGenerator } from '../../utils/DataGenerator';
import { allure } from 'allure-playwright';

test.describe('Checkout Flow Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.loginAsStandardUser();
  });

  test('TC-015: should complete checkout process end-to-end', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await allure.epic('Checkout');
    await allure.feature('Checkout Flow');
    await allure.story('Complete Purchase');
    await allure.severity('blocker');
    await allure.description('Verify the full end-to-end checkout process from adding a product to order completion.');

    await test.step('Add product to cart', async () => {
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
    });

    await test.step('Go to cart and verify', async () => {
      await inventoryPage.goToCart();
      await cartPage.verifyOnCartPage();
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.verifyOnStepOne();
    });

    await test.step('Fill customer information and continue', async () => {
      const customerInfo = DataGenerator.generateCustomerInfo();
      await checkoutPage.fillCustomerInfo(
        customerInfo.firstName,
        customerInfo.lastName,
        customerInfo.postalCode
      );
      await checkoutPage.clickContinue();
    });

    await test.step('Verify on overview page', async () => {
      await checkoutPage.verifyOnStepTwo();
    });

    await test.step('Complete purchase', async () => {
      await checkoutPage.clickFinish();
    });

    await test.step('Verify order completion', async () => {
      await checkoutPage.verifyOnComplete();
    });
  });

  test('TC-016: should show error when first name is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await allure.epic('Checkout');
    await allure.feature('Checkout Flow');
    await allure.story('Validation Errors');
    await allure.severity('normal');
    await allure.description('Verify that an error message is shown when the first name field is left empty during checkout.');

    await test.step('Add product and go to checkout', async () => {
      await inventoryPage.addToCartByName('Sauce Labs Bike Light');
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
    });

    await test.step('Leave first name empty and fill others', async () => {
      await checkoutPage.fillCustomerInfo('', 'Doe', '12345');
      await checkoutPage.clickContinue();
    });

    await test.step('Verify error message is displayed', async () => {
      await checkoutPage.verifyErrorMessage('First Name is required');
    });

    await test.step('Verify still on step one', async () => {
      await checkoutPage.verifyOnStepOne();
    });
  });

  test('TC-020: should calculate checkout totals correctly', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await allure.epic('Checkout');
    await allure.feature('Checkout Flow');
    await allure.story('Price Calculations');
    await allure.severity('critical');
    await allure.description('Verify that item total, tax, and grand total are calculated correctly during checkout.');

    const backpackPrice = 29.99;
    const bikeLightPrice = 9.99;
    const expectedItemTotal = backpackPrice + bikeLightPrice; // $39.98
    const expectedTax = 3.20; // ~8% tax
    const expectedGrandTotal = expectedItemTotal + expectedTax; // $43.18

    await test.step('Add both products to cart', async () => {
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
      await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    });

    await test.step('Proceed to checkout overview', async () => {
      await inventoryPage.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.fillCustomerInfo('Test', 'User', '00000');
      await checkoutPage.clickContinue();
    });

    await test.step('Verify price calculations', async () => {
      const itemTotal = await checkoutPage.getItemTotal();
      const tax = await checkoutPage.getTax();
      const grandTotal = await checkoutPage.getGrandTotal();

      expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);
      expect(tax).toBeCloseTo(expectedTax, 2);
      expect(grandTotal).toBeCloseTo(expectedGrandTotal, 2);
    });

    await test.step('Verify both items in summary', async () => {
      const itemCount = await checkoutPage.getSummaryItemCount();
      expect(itemCount).toBe(2);
    });
  });
});
