import { FastifyInstance } from 'fastify';
import { CategoryController } from '../controllers/category.controller';
import { authenticate, requireRole } from '../middleware/auth';

export async function categoryRoutes(fastify: FastifyInstance) {
  const controller = new CategoryController();

  // Public routes
  fastify.get('/', controller.getCategories.bind(controller));
  fastify.get('/:id', controller.getCategoryById.bind(controller));

  // Admin routes
  fastify.post(
    '/',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.createCategory.bind(controller)
  );
  fastify.put(
    '/:id',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.updateCategory.bind(controller)
  );
  fastify.delete(
    '/:id',
    { preHandler: [authenticate, requireRole('ADMIN')] },
    controller.deleteCategory.bind(controller)
  );
}

