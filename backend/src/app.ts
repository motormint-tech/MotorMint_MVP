import Fastify, { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { env } from './config/env';
// Redis is optional - imported but not required
import { errorHandler } from './middleware/errorHandler';
import { registerRoutes } from './routes';
import { logger } from './utils/logger';

export async function buildServer(): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: false, // We use pino directly
    requestIdLogLabel: 'reqId',
    disableRequestLogging: false,
  });

  // Error handler
  fastify.setErrorHandler(errorHandler);

  // Security
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  });

  // CORS
  await fastify.register(cors, {
    origin: env.CORS_ORIGIN.split(','),
    credentials: true,
  });

  // Rate limiting (in-memory - Redis optional)
  await fastify.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_TIME_WINDOW,
  });

  // Routes
  await fastify.register(registerRoutes);

  return fastify;
}


