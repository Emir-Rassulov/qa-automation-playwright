import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  addToCartButtons: Locator;
  cartBadge: Locator;
  productSort: Locator;
  productNames: Locator;
  productPrices: Locator;

  constructor(private page: Page) {
    this.addToCartButtons = this.page.getByRole('button', { name: 'Add to cart' });
    this.cartBadge = this.page.locator('.shopping_cart_badge');
    this.productSort = this.page.locator('.product_sort_container');
    this.productNames = this.page.locator('.inventory_item_name');
    this.productPrices = this.page.locator('.inventory_item_price');
  }

  async sortLowToHigh() {
    await this.productSort.selectOption('lohi');
  }

  async addProduct(index: number) {
    await this.addToCartButtons.nth(index).click();
  }
}
