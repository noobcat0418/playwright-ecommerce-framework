import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsSection: Locator;
  readonly productNames: Locator;
  readonly productCards: Locator;
  readonly searchedProductsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsSection = page.locator('.features_items');
    this.productNames = page.locator('.productinfo p');
    this.productCards = page.locator('.product-image-wrapper');
    this.searchedProductsHeading = page.getByRole('heading', { name: /searched products/i });
  }

  async navigate(): Promise<void> {
    // Block ad scripts that interfere with mobile browsers
    await this.page.route(/googlesyndication|googleads|doubleclick|adservice|google_vignette/, route => route.abort());
    await this.page.goto('https://www.automationexercise.com/products', { waitUntil: 'domcontentloaded' });
  }

  async searchFor(term: string): Promise<void> {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  viewProductLink(cardIndex: number): Locator {
    return this.productCards
      .nth(cardIndex)
      .locator('.nav.nav-pills.nav-justified li:last-child a');
  }
}
