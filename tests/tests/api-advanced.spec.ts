// import { test, expect } from '@playwright/test';

// test('обновление поста через PUT', async ({ request }) => {
//   const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
//     data: {
//       id: 1,
//       title: 'Updated Title',
//       body: 'Updated body text',
//       userId: 1,
//     },
//   });

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.title).toBe('Updated Title');
// });

// test('частичное обновление поста через PATCH', async ({ request }) => {
//   const response = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
//     data: {
//       title: 'Only Title Patched',
//     },
//   });

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.title).toBe('Only Title Patched');
// });

// test('удаление поста', async ({ request }) => {
//   const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

//   expect(response.status()).toBe(200);
// });

// test('фильтрация постов по userId через query-параметр', async ({ request }) => {
//   const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
//     params: {
//       userId: 1,
//     },
//   });

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   body.forEach((post: any) => {
//     expect(post.userId).toBe(1);
//   });
// });

// test('запрос несуществующего ресурса возвращает 404', async ({ request }) => {
//   const response = await request.get('https://jsonplaceholder.typicode.com/users/99999');

//   expect(response.status()).toBe(404);
// });

import { test, expect } from '../testFixtures';

test('обновление поста через PUT', async ({ postsApi }) => {
  const response = await postsApi.updatePost(1, {
    id: 1,
    title: 'Updated Title',
    body: 'Updated body text',
    userId: 1,
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.title).toBe('Updated Title');
});

test('частичное обновление поста через PATCH', async ({ postsApi }) => {
  const response = await postsApi.patchPost(1, {
    title: 'Only Title Patched',
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.title).toBe('Only Title Patched');
});

test('удаление поста', async ({ postsApi }) => {
  const response = await postsApi.deletePost(1);

  expect(response.status()).toBe(200);
});

test('фильтрация постов по userId через query-параметр', async ({ postsApi }) => {
  const response = await postsApi.getPosts(1);

  expect(response.status()).toBe(200);

  const body = await response.json();

  body.forEach((post: { userId: number }) => {
    expect(post.userId).toBe(1);
  });
});
