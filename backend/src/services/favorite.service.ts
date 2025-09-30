import { FavoriteRepository, FavoriteWithCar } from '../repositories/favorite.repository';
import { NotFoundError } from '../utils/errors';

export class FavoriteService {
  private favoriteRepository = new FavoriteRepository();

  async getUserFavorites(userId: string): Promise<FavoriteWithCar[]> {
    return this.favoriteRepository.findUserFavorites(userId);
  }

  async addFavorite(userId: string, carId: string): Promise<{ message: string }> {
    await this.favoriteRepository.create(userId, carId);
    return { message: 'Car added to favorites' };
  }

  async removeFavorite(userId: string, carId: string): Promise<{ message: string }> {
    await this.favoriteRepository.delete(userId, carId);
    return { message: 'Car removed from favorites' };
  }
}

