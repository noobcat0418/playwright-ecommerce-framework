# E-Commerce Test Automation Framework

A production-grade end-to-end test automation framework built with **Playwright** and **TypeScript** for an e-commerce web application. Implements industry best practices including Page Object Model (POM), visual regression testing, cross-browser coverage, and multi-format reporting.

![Playwright](https://img.shields.io/badge/Playwright-1.40.0-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Page Objects](#page-objects)
- [Utilities](#utilities)
- [Configuration](#configuration)
- [Reports](#reports)
- [CI/CD Integration](#cicd-integration)
- [Author](#author)

---

## Features

- **Page Object Model (POM)** - Maintainable and reusable page classes
- **TypeScript** - Type-safe test development with strict mode
- **Visual Regression Testing** - Screenshot comparison for UI validation
- **Cross-Browser Testing** - Chrome, Firefox, Safari, and mobile browsers
- **Parallel Execution** - Fast test runs with configurable workers
- **Auto-Wait Mechanism** - Built-in smart waiting strategies
- **Multi-Format Reporting** - HTML, JSON, JUnit, and Allure reports
- **CI/CD Ready** - GitHub Actions, Jenkins, and pipeline-compatible
- **Utility Helpers** - Custom wait, retry, and data generation utilities

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Playwright](https://playwright.dev/) | Browser automation framework |
| [TypeScript](https://www.typescriptlang.org/) | Programming language |
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Allure](https://docs.qameta.io/allure/) | Test reporting |

---

## Project Structure

```
playwright-ecommerce-framework/
|
├── config/                          # Configuration files
│   ├── environments.ts              # Environment-specific settings
│   ├── test-settings.ts             # Test configuration and app settings
│   └── index.ts                     # Config barrel export
|
├── fixtures/                        # Test data and fixtures
│   ├── pageFixtures.ts              # Playwright custom fixtures
│   └── test-data.ts                 # Static test data and constants
|
├── pages/                           # Page Object Model classes
│   ├── LoginPage.ts                 # Login page interactions
│   ├── InventoryPage.ts             # Product listing page
│   ├── CartPage.ts                  # Shopping cart page
│   ├── CheckoutPage.ts              # Checkout flow pages
│   ├── ProductDetailPage.ts         # Product detail page
│   └── SearchPage.ts                # Search functionality
|
├── tests/                           # Test specifications
│   ├── auth/                        # Authentication tests
│   │   └── logout.spec.ts
│   ├── cart/                        # Shopping cart tests
│   │   └── cart-operations.spec.ts
│   ├── checkout/                    # Checkout flow tests
│   │   └── checkout-flow.spec.ts
│   ├── product/                     # Product detail tests
│   │   └── product-details.spec.ts
│   ├── search/                      # Search feature tests
│   │   └── search.spec.ts
│   ├── sorting/                     # Product sorting tests
│   │   └── product-sort.spec.ts
│   └── visual/                      # Visual regression tests
│       └── visual-regression.spec.ts
|
├── utils/                           # Utility helpers
│   ├── WaitHelper.ts                # Custom wait functions
│   ├── RetryHelper.ts               # Retry logic with exponential backoff
│   ├── DataGenerator.ts             # Random test data generator
│   └── index.ts                     # Utils barrel export
|
├── reports/                         # Generated reports (gitignored)
├── allure-results/                  # Allure raw results (gitignored)
├── allure-report/                   # Allure HTML report (gitignored)
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Dependencies and scripts
```

---

## Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **Java JDK 21** (for Allure reports) - `winget install Microsoft.OpenJDK.21`

---

## Installation

```bash
git clone https://github.com/noobcat0418/playwright-ecommerce-framework.git
cd playwright-ecommerce-framework
npm install
npx playwright install
```

---

## Running Tests

### All Tests

```bash
npm test                          # Headless
npm run test:headed               # With browser visible
```

### By Browser

```bash
npm run test:chrome               # Chromium
npm run test:firefox              # Firefox
npm run test:safari               # WebKit
```

### By Module

```bash
npm run test:auth                 # Authentication
npm run test:cart                 # Cart operations
npm run test:checkout             # Checkout flow
npm run test:product              # Product details
npm run test:sorting              # Product sorting
npm run test:search               # Search
npm run test:visual               # Visual regression
```

### Debug & UI Mode

```bash
npm run test:debug                # Step-by-step debugger
npm run test:ui                   # Playwright Inspector UI
```

### Visual Baselines

```bash
npm run test:visual:update        # Update baseline screenshots
```

---

## Test Coverage

### Functional Tests

| Test ID | Test Name | Module | Priority |
|---------|-----------|--------|----------|
| TC-011 | Logout Functionality | Authentication | High |
| TC-012 | Sort Products by Price (Low to High) | Sorting | Medium |
| TC-013 | Sort Products by Name (Z to A) | Sorting | Medium |
| TC-014 | Navigate to Product Details Page | Product | High |
| TC-015 | Complete Checkout Process (E2E) | Checkout | Critical |
| TC-016 | Checkout with Missing Required Fields | Checkout | High |
| TC-020 | Verify Checkout Overview Calculations | Checkout | Critical |

### Search Tests

| Test ID | Test Name | Priority |
|---------|-----------|----------|
| TC-001 | Search results display for matching products | Critical |
| TC-002 | Search result names contain search keyword | Normal |
| TC-003 | Search result navigation to product detail | Normal |

### Visual Regression Tests

| Test ID | Test Name | Description |
|---------|-----------|-------------|
| VIS-001 | Login Page Default State | Baseline screenshot |
| VIS-002 | Login Page with Error | Error message display |
| VIS-003 | Login Page Locked Out | Locked user error |
| VIS-004 | Inventory Page Default | Product listing |
| VIS-005 | Inventory Page Menu Open | Side menu expanded |
| VIS-006 | Single Product Card | Product component |
| VIS-007 | Login Page Mobile View | Responsive (375px) |
| VIS-008 | Inventory Page Tablet View | Responsive (768px) |

---

## Page Objects

| Page Class | Responsibility |
|------------|---------------|
| `LoginPage` | Authentication, login/logout, field validation |
| `InventoryPage` | Product listing, sorting, cart operations, navigation |
| `CartPage` | Cart verification, item removal, checkout navigation |
| `CheckoutPage` | Customer info, order review, totals, completion |
| `ProductDetailPage` | Product info display, add to cart, back navigation |
| `SearchPage` | Product search, result display, result navigation |

---

## Utilities

| Utility | Purpose |
|---------|---------|
| `WaitHelper` | Element visibility, URL changes, network idle, custom delays |
| `RetryHelper` | Retry with exponential backoff for flaky operations |
| `DataGenerator` | Random names, emails, addresses, customer info |

---

## Configuration

### Browser Projects

| Project | Device |
|---------|--------|
| `chromium` | Desktop Chrome |
| `firefox` | Desktop Firefox |
| `webkit` | Desktop Safari |
| `mobile-chrome` | Pixel 5 |
| `mobile-safari` | iPhone 12 |

### Environment Support

The framework supports `dev`, `staging`, and `prod` environment configurations via `config/environments.ts`.

---

## Reports

### Playwright HTML Report

```bash
npm run report
```

### Allure Report

```bash
npm run allure:report             # Generate and open
npm run allure:generate           # Generate only
npm run allure:open               # Open existing report
```

### Report Locations

| Report | Location |
|--------|----------|
| HTML Report | `reports/html-report/` |
| JSON Report | `reports/json-report/results.json` |
| JUnit Report | `reports/junit-report/results.xml` |
| Allure Report | `allure-report/` |
| Screenshots | `reports/test-results/` |
| Visual Baselines | `reports/snapshots/` |

### Clean Up

```bash
npm run clean                     # Remove all generated reports
```

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/playwright.yml`:

```yaml
name: E2E Tests

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

      - name: Run tests
        run: npx playwright test

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-reports
          path: reports/
          retention-days: 30
```

---

## Author

**Mike Ryan B. Cervantes**
- GitHub: [@noobcat0418](https://github.com/noobcat0418)
- LinkedIn: [Mike Ryan Cervantes](https://www.linkedin.com/in/mike-ryan-cervantes/)

---

## License

This project is licensed under the MIT License.
