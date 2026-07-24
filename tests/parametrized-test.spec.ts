import { test, expect } from '@playwright/test';

const validationTestCases = [
  { email: 'joe.doe@example.com', isValid: true },
  { email: 'emir.rassulov@gmail.com', isValid: true },
  { email: 'not-an-email', isValid: false },
];

for (const testCase of validationTestCases) {
  test(`создание пользователя с email "${testCase.email}"`, async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: {
        email: testCase.email,
      },
    });

    expect(response.status()).toBe(201);
  });
}
