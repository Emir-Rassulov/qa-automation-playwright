// import { test, expect } from '@playwright/test';

// test('получение списка пользователей', async ({ request }) => {
//   const response = await request.get('https://jsonplaceholder.typicode.com/users');

//   expect(response.status()).toBe(200);

//   const body = await response.json();
//   console.log(body);

//   expect(body.length).toBe(10);
//   expect(body[0].name).toBe('Leanne Graham');
//   expect(body[0].email).toContain('@');
// });

// test('создание нового пользователя', async ({ request }) => {
//   const response = await request.post('https://jsonplaceholder.typicode.com/users', {
//     data: {
//       name: 'Ivan Petrov',
//       email: 'ivan@example.com',
//     },
//   });

//   expect(response.status()).toBe(201);

//   const body = await response.json();
//   console.log(body);
// });

// test('проверка что fake API не сохраняет данные по-настоящему', async ({ request }) => {
//   const response = await request.get('https://jsonplaceholder.typicode.com/users');

//   expect(response.status()).toBe(200);

//   const body = await response.json();
//   console.log(body);

//   expect(body.length).toBe(10);
// });
