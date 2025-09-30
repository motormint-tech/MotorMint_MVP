import { FastifyInstance } from 'fastify';
import { StatsController } from '../controllers/stats.controller';
import { authenticate, requireRole } from '../middleware/auth';

export async function statsRoutes(fastify: FastifyInstance) {
  const controller = new StatsController();

  // Public routes
  fastify.get('/:carId', controller.getStatsByCarId.bind(controller));

  // Admin routes
  fastify.post(
    '/',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.createStats.bind(controller)
  );
  fastify.put(
    '/:carId',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.updateStats.bind(controller)
  );
  fastify.delete(
    '/:carId',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.deleteStats.bind(controller)
  );
}

