import { FastifyInstance } from 'fastify';
import { CarController } from '../controllers/car.controller';
import { authenticate, requireRole } from '../middleware/auth';

export async function carRoutes(fastify: FastifyInstance) {
  const controller = new CarController();

  // Public routes
  fastify.get('/', controller.getCars.bind(controller));
  fastify.get('/:id', controller.getCarById.bind(controller));

  // Admin routes
  fastify.post(
    '/',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.createCar.bind(controller)
  );
  fastify.put(
    '/:id',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.updateCar.bind(controller)
  );
  fastify.delete(
    '/:id',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.deleteCar.bind(controller)
  );
}

