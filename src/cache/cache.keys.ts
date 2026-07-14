// src/cache/cache.keys.ts

export const CACHE_KEYS = { // cache keys for redis are variable names that are used to store and retrieve data from the cache in string format. The keys are organized into different categories based on the type of data they represent, such as posts and users. Each key is either a string or a function that generates a string based on input parameters, allowing for dynamic key generation.
  // --- Post Keys ---
  ALL_POSTS: 'posts:all',
  POST_BY_ID: (id: string | number) => `post:${id}`,
  POSTS_BY_TAG: (tag: string) => `posts:tag:${tag}`,

  // --- User Keys ---
  USER_PROFILE: (id: string | number) => `user:profile:${id}`,
  USER_WITH_POSTS: (id: string | number) => `user:posts:${id}`,
};