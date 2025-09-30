import { FastifyInstance } from 'fastify';
import { FavoriteController } from '../controllers/favorite.controller';
import { authenticate } from '../middleware/auth';

export async function favoriteRoutes(fastify: FastifyInstance) {
  const controller = new FavoriteController();

  // All routes require authentication
  fastify.get('/', { preHandler: authenticate }, controller.getUserFavorites.bind(controller));
  fastify.post('/', { preHandler: authenticate }, controller.addFavorite.bind(controller));
  fastify.delete(
    '/:carId',
    { preHandler: authenticate },
    controller.removeFavorite.bind(controller)
  );
}

