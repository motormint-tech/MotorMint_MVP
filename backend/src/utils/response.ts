import { FastifyReply } from 'fastify';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export function sendResponse<T>(
  reply: FastifyReply,
  statusCode: number,
  data?: T,
  message?: string,
  meta?: ApiResponse<T>['meta']
): FastifyReply {
  const response: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 300,
    data,
    message,
    meta,
  };

  return reply.status(statusCode).send(response);
}

export function sendError(
  reply: FastifyReply,
  statusCode: number,
  message: string
): FastifyReply {
  const response: ApiResponse = {
    success: false,
    error: message,
  };

  return reply.status(statusCode).send(response);
}

