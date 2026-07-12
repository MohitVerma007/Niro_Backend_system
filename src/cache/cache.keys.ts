// src/cache/cache.keys.ts

export const CACHE_KEYS = {
  // --- Post Keys ---
  ALL_POSTS: 'posts:all',
  POST_BY_ID: (id: string | number) => `post:${id}`,
  POSTS_BY_TAG: (tag: string) => `posts:tag:${tag}`,

  // --- User Keys ---
  USER_PROFILE: (id: string | number) => `user:profile:${id}`,
  USER_WITH_POSTS: (id: string | number) => `user:posts:${id}`,
};