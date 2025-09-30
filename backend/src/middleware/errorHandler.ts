import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/response';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

export async function errorHandler(
  error: FastifyError | AppError | ZodError,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply> {
  // Zod validation errors
  if (error instanceof ZodError) {
    const errors = error.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));

    logger.warn({ errors, path: request.url }, 'Validation error');

    return sendError(reply, 422, `Validation failed: ${errors.map((e) => e.message).join(', ')}`);
  }

  // Application errors
  if (error instanceof AppError) {
    logger.warn({ error: error.message, path: request.url }, 'Application error');

    return sendError(reply, error.statusCode, error.message);
  }


  // Unknown errors
  logger.error({ error, path: request.url }, 'Unhandled error');

  const statusCode = error.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message;

  return sendError(reply, statusCode, message);
}

