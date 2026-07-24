import { Locator, Page } from '@playwright/test';

export class CartPage {
  checkoutButton: Locator;
  cartLink: Locator;

  constructor(private page: Page) {
    this.cartLink = this.page.locator('.shopping_cart_link');
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  }

  async openCart() {
    await this.cartLink.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
