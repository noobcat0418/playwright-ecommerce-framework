# 🎭 Playwright Sauce Demo Automation Framework

A robust, scalable end-to-end test automation framework built with **Playwright** and **TypeScript** for testing the [Sauce Demo](https://www.saucedemo.com) e-commerce application. This framework demonstrates industry best practices including Page Object Model (POM), visual regression testing, and comprehensive test coverage.

![Playwright](https://img.shields.io/badge/Playwright-1.40.0-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Test Cases](#-test-cases)
- [Page Objects](#-page-objects)
- [Utilities](#-utilities)
- [Configuration](#-configuration)
- [Reports](#-reports)
- [CI/CD Integration](#-cicd-integration)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

- ✅ **Page Object Model (POM)** - Maintainable and reusable page classes
- ✅ **TypeScript** - Type-safe test development
- ✅ **Visual Regression Testing** - Screenshot comparison for UI validation
- ✅ **Cross-Browser Testing** - Chrome, Firefox, Safari, and mobile browsers
- ✅ **Parallel Execution** - Fast test runs with configurable workers
- ✅ **Auto-Wait Mechanism** - Built-in smart waiting strategies
- ✅ **Detailed Reporting** - HTML, JSON, and JUnit reports
- ✅ **CI/CD Ready** - Easy integration with GitHub Actions, Jenkins, etc.
- ✅ **Utility Helpers** - Custom wait, retry, and data generation utilities

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | Browser automation framework |
| [TypeScript](https://www.typescriptlang.org/) | Programming language |
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Allure](https://docs.qameta.io/allure/) | Test reporting (optional) |

---

## 📁 Project Structure

```
playwright-saucedemo-framework/
│
├── config/                          # Configuration files
│   └── test-settings.ts             # Test configuration settings
│
├── fixtures/                        # Test data and fixtures
│   └── test-data.ts                 # Static test data
│
├── pages/                           # Page Object Model classes
│   ├── LoginPage.ts                 # Login page interactions
│   ├── InventoryPage.ts             # Product listing page
│   ├── CartPage.ts                  # Shopping cart page
│   ├── CheckoutPage.ts              # Checkout flow pages
│   └── ProductDetailPage.ts         # Product detail page
│
├── tests/                           # Test specifications
│   ├── auth/                        # Authentication tests
│   │   └── logout.spec.ts           # TC-011: Logout functionality
│   ├── cart/                        # Shopping cart tests
│   │   └── cart-operations.spec.ts  # TC-017, TC-018, TC-019
│   ├── checkout/                    # Checkout tests
│   │   └── checkout-flow.spec.ts    # TC-015, TC-016, TC-020
│   ├── product/                     # Product tests
│   │   └── product-details.spec.ts  # TC-014
│   ├── sorting/                     # Sorting tests
│   │   └── product-sort.spec.ts     # TC-012, TC-013
│   └── visual/                      # Visual regression tests
│       └── visual-regression.spec.ts # VIS-001 to VIS-008
│
├── utils/                           # Utility helpers
│   ├── WaitHelper.ts                # Custom wait functions
│   ├── RetryHelper.ts               # Retry logic for flaky operations
│   ├── DataGenerator.ts             # Random test data generator
│   └── index.ts                     # Utils barrel export
│
├── reports/                         # Generated reports (gitignored)
│   ├── html-report/                 # Playwright HTML report
│   ├── json-report/                 # JSON results
│   ├── junit-report/                # JUnit XML report
│   └── snapshots/                   # Visual test baselines
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Project dependencies and scripts
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

---

## 📌 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

---

## 🚀 Installation

1. **Clone the repository**

```bash
git clone https://github.com/noobcat0418/playwright-saucedemo-framework.git
cd playwright-saucedemo-framework
```

2. **Install dependencies**

```bash
npm install
```

3. **Install Playwright browsers**

```bash
npx playwright install
```

4. **Verify installation**

```bash
npx playwright --version
```

---

## ▶️ Running Tests

### Run All Tests

```bash
# Headless mode (no browser UI)
npx playwright test

# With browser visible
npx playwright test --headed

# Using npm scripts
npm test
npm run test:headed
```

### Run by Browser

```bash
# Chrome only
npx playwright test --project=chromium
npm run test:chrome

# Firefox only
npx playwright test --project=firefox
npm run test:firefox

# Safari only
npx playwright test --project=webkit
npm run test:safari
```

### Run by Test Suite

```bash
# Authentication tests
npm run test:auth

# Cart tests
npm run test:cart

# Checkout tests
npm run test:checkout

# Product tests
npm run test:product

# Sorting tests
npm run test:sorting

# Visual tests
npm run test:visual
```

### Run Specific Test File

```bash
npx playwright test tests/auth/logout.spec.ts --headed
```

### Debug Mode

```bash
# Step-by-step debugging
npx playwright test --debug

# Playwright Inspector UI
npx playwright test --ui
npm run test:ui
```

### Update Visual Baselines

```bash
npm run test:visual:update
```

---

## 🧪 Test Cases

### Functional Tests (10 Test Cases)

| Test ID | Test Name | Module | Priority |
|---------|-----------|--------|----------|
| TC-011 | Logout Functionality | Authentication | High |
| TC-012 | Sort Products by Price (Low to High) | Sorting | Medium |
| TC-013 | Sort Products by Name (Z to A) | Sorting | Medium |
| TC-014 | Navigate to Product Details Page | Product | High |
| TC-015 | Complete Checkout Process (E2E) | Checkout | Critical |
| TC-016 | Checkout with Missing Required Fields | Checkout | High |
| TC-017 | Remove Product from Cart | Cart | High |
| TC-018 | Verify Cart Persistence During Session | Cart | Medium |
| TC-019 | Continue Shopping from Cart | Cart | Medium |
| TC-020 | Verify Checkout Overview Calculations | Checkout | Critical |

### Visual Regression Tests (8 Test Cases)

| Test ID | Test Name | Description |
|---------|-----------|-------------|
| VIS-001 | Login Page Default State | Baseline screenshot of login page |
| VIS-002 | Login Page with Error | Error message display |
| VIS-003 | Login Page Locked Out | Locked out user error |
| VIS-004 | Inventory Page Default | Product listing page |
| VIS-005 | Inventory Page Menu Open | Side menu expanded |
| VIS-006 | Single Product Card | Individual product component |
| VIS-007 | Login Page Mobile View | Responsive design (375px) |
| VIS-008 | Inventory Page Tablet View | Responsive design (768px) |

---

## 📄 Page Objects

### LoginPage

Handles login page interactions and validations.

```typescript
// Usage example
const loginPage = new LoginPage(page);
await loginPage.navigate();
await loginPage.loginAsStandardUser();
await loginPage.verifyOnLoginPage();
```

**Methods:**
- `navigate()` - Navigate to login page
- `login(username, password)` - Login with credentials
- `loginAsStandardUser()` - Quick login with standard user
- `verifyOnLoginPage()` - Verify current page is login
- `verifyFieldsAreEmpty()` - Verify form fields are empty

### InventoryPage

Handles product listing page interactions.

```typescript
// Usage example
const inventoryPage = new InventoryPage(page);
await inventoryPage.addToCartByName('Sauce Labs Backpack');
await inventoryPage.sortBy('lohi');
await inventoryPage.goToCart();
```

**Methods:**
- `verifyOnInventoryPage()` - Verify on inventory page
- `addToCartByName(productName)` - Add product to cart
- `sortBy(option)` - Sort products (az, za, lohi, hilo)
- `goToCart()` - Navigate to cart
- `logout()` - Logout from application
- `getProductNames()` - Get all product names
- `getProductPrices()` - Get all product prices
- `getCartBadgeCount()` - Get cart item count

### CartPage

Handles shopping cart operations.

```typescript
// Usage example
const cartPage = new CartPage(page);
await cartPage.verifyProductInCart('Sauce Labs Backpack');
await cartPage.removeItemByName('Sauce Labs Backpack');
await cartPage.proceedToCheckout();
```

**Methods:**
- `verifyOnCartPage()` - Verify on cart page
- `verifyProductInCart(name)` - Verify product exists in cart
- `removeItemByName(name)` - Remove product from cart
- `continueShopping()` - Return to inventory
- `proceedToCheckout()` - Go to checkout
- `verifyCartIsEmpty()` - Verify cart has no items

### CheckoutPage

Handles entire checkout flow.

```typescript
// Usage example
const checkoutPage = new CheckoutPage(page);
await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
await checkoutPage.clickContinue();
await checkoutPage.clickFinish();
await checkoutPage.verifyOnComplete();
```

**Methods:**
- `fillCustomerInfo(firstName, lastName, postalCode)` - Fill checkout form
- `clickContinue()` - Proceed to overview
- `clickFinish()` - Complete order
- `verifyOnStepOne()` - Verify on info step
- `verifyOnStepTwo()` - Verify on overview step
- `verifyOnComplete()` - Verify order complete
- `verifyErrorMessage(message)` - Verify validation error
- `getItemTotal()` - Get subtotal amount
- `getTax()` - Get tax amount
- `getGrandTotal()` - Get total amount

### ProductDetailPage

Handles individual product page.

```typescript
// Usage example
const productDetailPage = new ProductDetailPage(page);
await productDetailPage.verifyProductDetails('Sauce Labs Backpack', 29.99);
await productDetailPage.addToCart();
```

**Methods:**
- `verifyOnProductDetailPage()` - Verify on detail page
- `verifyProductDetails(name, price)` - Verify product info
- `addToCart()` - Add product to cart
- `goBackToProducts()` - Return to inventory

---

## 🔧 Utilities

### WaitHelper

Custom wait utilities for handling dynamic elements.

```typescript
const waitHelper = new WaitHelper(page);

// Wait for element visibility
await waitHelper.waitForVisible(locator);

// Wait for URL navigation
await waitHelper.waitForUrl(/.*inventory.html/);

// Wait for network idle
await waitHelper.waitForNetworkIdle();

// Custom delay
await waitHelper.delay(500);
```

### RetryHelper

Retry logic for handling flaky operations.

```typescript
const retryHelper = new RetryHelper(page);

// Retry an operation 3 times
await retryHelper.retry(async () => {
  await page.click('.flaky-button');
}, 3, 1000);

// Retry click
await retryHelper.retryClick('.submit-button');
```

### DataGenerator

Generate random test data.

```typescript
// Generate customer info
const customer = DataGenerator.generateCustomerInfo();
// { firstName: 'John', lastName: 'Smith', postalCode: '12345' }

// Random email
const email = DataGenerator.randomEmail();
// 'abc123456@test.com'

// Random string
const str = DataGenerator.randomString(10);

// Pick random from array
const item = DataGenerator.pickRandom(['a', 'b', 'c']);
```

---

## ⚙️ Configuration

### playwright.config.ts

Key configuration options:

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  
  projects: [
    { name: 'chromium' },
    { name: 'firefox' },
    { name: 'webkit' },
    { name: 'mobile-chrome' },
    { name: 'mobile-safari' },
  ],
});
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:chrome` | Run on Chrome only |
| `npm run test:firefox` | Run on Firefox only |
| `npm run test:safari` | Run on Safari only |
| `npm run test:debug` | Run in debug mode |
| `npm run test:ui` | Open Playwright UI |
| `npm run test:auth` | Run auth tests |
| `npm run test:cart` | Run cart tests |
| `npm run test:checkout` | Run checkout tests |
| `npm run test:visual` | Run visual tests |
| `npm run test:visual:update` | Update visual baselines |
| `npm run report` | Open HTML report |
| `npm run clean` | Clean report folders |

---

## 📊 Reports

### HTML Report

After running tests, view the HTML report:

```bash
npm run report
# or
npx playwright show-report
```

### Report Locations

| Report Type | Location |
|-------------|----------|
| HTML Report | `reports/html-report/` |
| JSON Report | `reports/json-report/results.json` |
| JUnit Report | `reports/junit-report/results.xml` |
| Screenshots | `reports/test-results/` |
| Visual Baselines | `reports/snapshots/` |

---

## 🔄 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
        
      - name: Run Playwright tests
        run: npx playwright test
        
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## 🧹 Clean Up

Before pushing to Git, clean generated files:

```bash
# Using npm script
npm run clean

# Manual (PowerShell)
Remove-Item -Recurse -Force reports, test-results, playwright-report -ErrorAction SilentlyContinue
```

---

## 🐛 Troubleshooting

### Common Issues

**1. Browsers not installed**
```bash
npx playwright install
```

**2. Tests timing out**
- Increase timeout in `playwright.config.ts`
- Check network connectivity to test site

**3. Visual tests failing**
```bash
# Update baselines
npm run test:visual:update
```

**4. Permission errors on Windows**
- Run terminal as Administrator
- Check antivirus is not blocking

---

## 👤 Author

**Mike Ryan B. Cervantes**

- 💼 Senior Quality Assurance Engineer
- 📧 Email: cervantesmikeryan24@gmail.com
- 💻 GitHub: [@noobcat0418](https://github.com/noobcat0418)
- 🔗 LinkedIn: [Mike Ryan Cervantes](https://www.linkedin.com/in/mike-ryan-cervantes/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Sauce Demo](https://www.saucedemo.com) - Test application
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

⭐ **If you found this project helpful, please give it a star!**
