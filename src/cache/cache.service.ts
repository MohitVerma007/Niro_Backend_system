// src/cache/cache.service.ts
import { redisClient } from '../config/redis.js'; 

export const cacheService = {
  /**
   * Automatically parses data and types it based on the generic <T> passed
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get(key);
      if (!data) return null;
      console.log(`✅ Cache GET Success [Key: ${key}]`);
      
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`❌ Cache GET Error [Key: ${key}]:`, error);
      return null; // Cache fail hone par app crash nahi hogi, DB fallback chalega
    }
  },

  /**
   * Stringifies and stores data with an optional TTL (Default: 1 Hour)
   */
  async set(key: string, value: unknown, ttlInSeconds = 3600): Promise<void> {
    try {
      const stringifiedValue = JSON.stringify(value);
      await redisClient.set(key, stringifiedValue, 'EX', ttlInSeconds);
        console.log(`✅ Cache SET Success [Key: ${key}, TTL: ${ttlInSeconds}s]`);
    } catch (error) {
      console.error(`❌ Cache SET Error [Key: ${key}]:`, error);
    }
  },

  /**
   * Deletes a key (Cache Invalidation)
   */
  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
      console.log(`✅ Cache DEL Success [Key: ${key}]`);
    } catch (error) {
      console.error(`❌ Cache DEL Error [Key: ${key}]:`, error);
    }
  },
};