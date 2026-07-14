
// src/services/post.service.ts
import { postRepository } from '../repositories/post.repository.js';
import { postProducer } from '../kafka/post.producer.js';
import { cacheService } from '../cache/cache.service.js';
import { CACHE_KEYS } from '../cache/cache.keys.js';
import { type IPost, type IPostWithUser } from '../interfaces/post.interface.js';
import { type CreatePostInput, type PostFilters } from '../types/post.types.js';

export const postService = {
  /**
   * Get all posts with Caching Strategy
   */
  async getAllPosts(filters?: PostFilters): Promise<IPostWithUser[]> {
    // Agar koi specific tag search kar raha hai toh alag key banegi, nahi toh default key
    const cacheKey = filters?.tag 
      ? CACHE_KEYS.POSTS_BY_TAG(filters.tag) 
      : CACHE_KEYS.ALL_POSTS;

    // 1. Check Cache (TypeScript automatically knows this returns IPostWithUser[])
    const cachedData = await cacheService.get<IPostWithUser[]>(cacheKey);
    if (cachedData) return cachedData;

    // 2. Cache Miss -> Fetch from Repo (Database)
    const posts = await postRepository.findAll(filters);

    // 3. Save to Cache for 5 minutes (300 seconds)
    if (posts.length > 0) {
      await cacheService.set(cacheKey, posts, 300);
    }

    return posts;
  },

  /**
   * Create a post and Invalidate Cache
   */
  async createNewPost(data: CreatePostInput): Promise<IPost> {
    // 1. Database me post create karo
    const newPost = await postRepository.create(data);

    await postProducer.emitPostCreated(newPost);

    // 2. Cache Invalidation (Purana data delete karo taaki agli baar fresh data aaye)
    await cacheService.del(CACHE_KEYS.ALL_POSTS);
    if (data.tags) {
      // Agar tags hain, toh tag-specific caches ko bhi clear kar sakte hain
      const individualTags = data.tags.split(',');
      for (const tag of individualTags) {
        await cacheService.del(CACHE_KEYS.POSTS_BY_TAG(tag.trim()));
      }
    }

    return newPost;
  }
};