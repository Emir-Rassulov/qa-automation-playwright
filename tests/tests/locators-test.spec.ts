import { test, expect } from '../testFixtures';
import { faker } from '@faker-js/faker';

test('оформление заказа с одним товаром', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await test.step('Открываем сайт и логинимся', async () => {
    await page.goto('https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Добавляем первый товар в корзину', async () => {
    await inventoryPage.addProduct(0);
  });

  await test.step('Открываем корзину и переходим к оформлению', async () => {
    await cartPage.openCart();
    await cartPage.checkout();
  });

  await test.step('Заполняем информацию о покупателе и завершаем заказ', async () => {
    // ИЗМЕНЕНО: добавили генерацию случайных данных
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipCode = faker.location.zipCode();

    console.log('Customer:', firstName, lastName, zipCode);

    // ИЗМЕНЕНО: вместо фиксированных данных используем faker
    await checkoutPage.fillInformation(firstName, lastName, zipCode);

    await checkoutPage.clickContinue();
    await checkoutPage.finish();
  });

  await test.step('Проверяем успешное оформление заказа', async () => {
    await checkoutPage.verifySuccess();
  });
});

test('добавление трёх товаров и проверка суммы в чекауте', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await test.step('Открываем сайт и логинимся', async () => {
    await page.goto('https://www.saucedemo.com');
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Добавляем три товара в корзину', async () => {
    for (let i = 0; i < 3; i++) {
      await inventoryPage.addProduct(i);
    }
  });

  await test.step('Проверяем количество товаров в корзине', async () => {
    await expect(inventoryPage.cartBadge).toHaveText('3');
  });

  await test.step('Открываем корзину и собираем цены товаров', async () => {
    await cartPage.openCart();

    const priceElements = await inventoryPage.productPrices.all();

    const pricesText: string[] = [];

    for (const price of priceElements) {
      pricesText.push((await price.textContent()) ?? '');
    }

    const prices = pricesText.map((price) => Number(price.replace('$', '')));

    let total = 0;

    for (let i = 0; i < prices.length; i++) {
      total += prices[i];
    }

    await test.step('Переходим к оформлению заказа', async () => {
      await cartPage.checkout();

      // ИЗМЕНЕНО: faker вместо фиксированных данных

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const zipCode = faker.location.zipCode();

      console.log('Customer:', firstName, lastName, zipCode);

      await checkoutPage.fillInformation(firstName, lastName, zipCode);

      await checkoutPage.clickContinue();

      const subtotalValue = await checkoutPage.getSubtotalValue();

      await expect(subtotalValue).toBeCloseTo(total, 2);
    });
  });
});

test('добавление отсортированного дешёвого товара в корзину', async ({
  page,
  loginPage,
  inventoryPage,
  cartPage,
}) => {
  await test.step('Открываем сайт и логинимся', async () => {
    await page.goto('https://www.saucedemo.com');

    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Сортируем товары и добавляем самый дешёвый', async () => {
    await inventoryPage.sortLowToHigh();

    // Сначала сохраняем название
    // потом добавляем товар

    const cheapestProductName = await inventoryPage.productNames.nth(0).textContent();

    await inventoryPage.addProduct(0);

    await cartPage.openCart();

    const cartProductName = await inventoryPage.productNames.first().textContent();

    expect(cartProductName).toBe(cheapestProductName);
  });
});
