import { redis, isRedisAvailable } from '../config/redis';
import { logger } from './logger';

const CACHE_TTL = 3600; // 1 hour in seconds

export async function getCache<T>(key: string): Promise<T | null> {
  if (!isRedisAvailable()) {
    return null;
  }

  try {
    const data = await redis!.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    logger.error({ err: error }, `Cache get error for key ${key}`);
    return null;
  }
}

export async function setCache<T>(key: string, value: T, ttl = CACHE_TTL): Promise<void> {
  if (!isRedisAvailable()) {
    return;
  }

  try {
    await redis!.setex(key, ttl, JSON.stringify(value));
  } catch (error) {
    logger.error({ err: error }, `Cache set error for key ${key}`);
  }
}

export async function deleteCache(key: string): Promise<void> {
  if (!isRedisAvailable()) {
    return;
  }

  try {
    await redis!.del(key);
  } catch (error) {
    logger.error({ err: error }, `Cache delete error for key ${key}`);
  }
}

export async function deleteCachePattern(pattern: string): Promise<void> {
  if (!isRedisAvailable()) {
    return;
  }

  try {
    const keys = await redis!.keys(pattern);
    if (keys.length > 0) {
      await redis!.del(...keys);
    }
  } catch (error) {
    logger.error({ err: error }, `Cache delete pattern error for ${pattern}`);
  }
}
