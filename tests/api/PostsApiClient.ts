import { APIRequestContext } from '@playwright/test';
import { Post } from '../types/Post';

export class PostsApiClient {
  constructor(private request: APIRequestContext) {}

  async getPosts(userId?: number) {
    return await this.request.get('https://jsonplaceholder.typicode.com/posts', {
      params: userId ? { userId } : {},
    });
  }

  async getPostById(id: number) {
    return await this.request.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  async updatePost(id: number, data: Post) {
    return await this.request.put(`https://jsonplaceholder.typicode.com/posts/${id}`, { data });
  }

  async patchPost(id: number, data: Partial<Post>) {
    return await this.request.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, { data });
  }

  async deletePost(id: number) {
    return await this.request.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
