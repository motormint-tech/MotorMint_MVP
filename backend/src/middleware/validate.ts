import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../utils/errors';

export function validate<T>(schema: ZodSchema<T>) {
  return async (
    request: FastifyRequest<{ Body?: unknown; Params?: unknown; Querystring?: unknown }>,
    reply: FastifyReply
  ): Promise<void> => {
    try {
      if (request.body) {
        request.body = schema.parse(request.body);
      }
      if (request.params) {
        request.params = schema.parse(request.params);
      }
      if (request.query) {
        request.query = schema.parse(request.query);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError('Validation failed', error.errors);
      }
      throw error;
    }
  };
}

