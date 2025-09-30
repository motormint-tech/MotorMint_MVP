import { FastifyRequest, FastifyReply } from 'fastify';
import { FavoriteService } from '../services/favorite.service';
import { sendResponse } from '../utils/response';
import { addFavoriteSchema, removeFavoriteSchema } from '../validations/favorite.validation';

export class FavoriteController {
  private favoriteService = new FavoriteService();

  async getUserFavorites(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    if (!request.user) {
      return sendResponse(reply, 401, null, 'Unauthorized');
    }

    const favorites = await this.favoriteService.getUserFavorites(request.user.userId);
    return sendResponse(reply, 200, favorites, 'Favorites retrieved successfully');
  }

  async addFavorite(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    if (!request.user) {
      return sendResponse(reply, 401, null, 'Unauthorized');
    }

    const { body } = addFavoriteSchema.parse({ body: request.body });
    const result = await this.favoriteService.addFavorite(request.user.userId, body.carId);
    return sendResponse(reply, 201, result, 'Car added to favorites');
  }

  async removeFavorite(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    if (!request.user) {
      return sendResponse(reply, 401, null, 'Unauthorized');
    }

    const { params } = removeFavoriteSchema.parse({ params: request.params });
    const result = await this.favoriteService.removeFavorite(request.user.userId, params.carId);
    return sendResponse(reply, 200, result, 'Car removed from favorites');
  }
}

