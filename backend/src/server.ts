// Load environment variables FIRST before anything else
import { config } from 'dotenv';
import { resolve } from 'path';

// Try multiple paths for .env file
const envPaths = [
  resolve(process.cwd(), '.env'),
  resolve(__dirname, '../.env'),
  resolve(process.cwd(), 'backend/.env'),
];

for (const envPath of envPaths) {
  try {
    const result = config({ path: envPath });
    if (!result.error) {
      break;
    }
  } catch {
    // Continue to next path
  }
}

// Fallback to default location
config();

import { buildServer } from './app';
import { env } from './config/env';
import { redis } from './config/redis';
import { logger } from './utils/logger';

async function start() {
  try {
    logger.info('Starting server...');

    // Build Fastify app
    const app = await buildServer();

    // Get port with fallback
    const port = Number(process.env.PORT) || env.PORT || 3000;
    const host = env.HOST || '0.0.0.0';

    // Start server
    await app.listen({ port, host });

    logger.info(`🚀 Server running on http://${host}:${port}`);
    logger.info(`📝 Environment: ${env.NODE_ENV}`);
  } catch (error) {
    // Log the actual error with full details
    if (error instanceof Error) {
      logger.error('Failed to start server:');
      logger.error(`  Message: ${error.message}`);
      logger.error(`  Stack: ${error.stack}`);
    } else {
      logger.error({ err: error }, 'Failed to start server');
    }
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  try {
    if (redis && redis.status === 'ready') {
      await redis.quit();
    }
  } catch (error) {
    // Ignore Redis errors during shutdown
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  try {
    if (redis && redis.status === 'ready') {
      await redis.quit();
    }
  } catch (error) {
    // Ignore Redis errors during shutdown
  }
  process.exit(0);
});

// Start the server
if (require.main === module) {
  start();
}

export { start };