import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
  firstName: Locator;
  lastName: Locator;
  zip: Locator;
  continueButton: Locator;
  finishButton: Locator;
  successMessage: Locator;

  constructor(private page: Page) {
    this.firstName = this.page.getByPlaceholder('First Name');
    this.lastName = this.page.getByPlaceholder('Last Name');
    this.zip = this.page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    this.successMessage = this.page.getByText('Thank you for your order!');
  }

  async fillInformation(first: string, last: string, zipCode: string) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.zip.fill(zipCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async verifySuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async getSubtotalValue() {
    const subtotalText = await this.page.locator('.summary_subtotal_label').textContent();
    return Number(subtotalText?.replace('Item total: $', '') ?? '0');
  }
}
