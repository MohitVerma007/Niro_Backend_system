import { Redis } from 'ioredis';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export const redisClient = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    enableOfflineQueue: false,
    maxRetriesPerRequest: 1,
});

redisClient.on('connect', () => logger.info('Redis connected successfully'));
redisClient.on('error', (error) => logger.error({ message: 'Redis connection error', error: error.message }));
