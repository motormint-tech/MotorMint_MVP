import Redis from 'ioredis';
import { env } from './env';
import { logger } from '../utils/logger';

let redisClient: Redis | null = null;
let connectionAttempted = false;
let connectionFailed = false;

// Only create Redis client if we actually need it
function getRedisClient(): Redis | null {
  if (redisClient) return redisClient;
  
  // Don't retry if we've already failed
  if (connectionFailed) return null;
  
  try {
    redisClient = new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD || undefined,
      // Disable auto-reconnect to prevent spam
      retryStrategy: () => null, // Return null to stop retrying
      lazyConnect: true,
      enableOfflineQueue: false,
      maxRetriesPerRequest: 0, // Don't retry failed requests
      connectTimeout: 2000, // 2 second timeout
    });

    // Only log connection success
    redisClient.on('connect', () => {
      logger.info('Redis connected successfully');
      connectionFailed = false;
    });

    // Only log error once
    redisClient.on('error', (error) => {
      if (!connectionAttempted) {
        logger.warn(`Redis connection failed - server will continue without Redis: ${error.message}`);
        connectionFailed = true;
      }
    });

    // Try to connect once, but don't retry
    if (!connectionAttempted) {
      connectionAttempted = true;
      redisClient.connect().catch(() => {
        // Silent fail - already logged in error handler
      });
    }

    return redisClient;
  } catch (error) {
    logger.warn('Redis initialization failed - server will continue without Redis');
    connectionFailed = true;
    return null;
  }
}

// Export a safe Redis instance
export const redis = getRedisClient();

// Helper function to check if Redis is available
export function isRedisAvailable(): boolean {
  return redis !== null && redis.status === 'ready';
}
