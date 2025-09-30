// Simple in-memory storage (replace with actual database later)
import { NotFoundError, ConflictError } from '../utils/errors';

interface Favorite {
  id: string;
  userId: string;
  carId: string;
  createdAt: Date;
}

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string | null;
  description: string | null;
}

export interface FavoriteWithCar extends Favorite {
  car: Car;
}

const favorites: Map<string, Favorite> = new Map();
const cars: Map<string, Car> = new Map(); // Reference to cars

export class FavoriteRepository {
  async findUserFavorites(userId: string): Promise<FavoriteWithCar[]> {
    const userFavorites = Array.from(favorites.values()).filter((f) => f.userId === userId);
    
    return userFavorites
      .map((fav) => {
        const car = cars.get(fav.carId);
        if (!car) return null;
        return { ...fav, car };
      })
      .filter((f): f is FavoriteWithCar => f !== null);
  }

  async findByUserAndCar(userId: string, carId: string): Promise<Favorite | null> {
    return (
      Array.from(favorites.values()).find(
        (f) => f.userId === userId && f.carId === carId
      ) || null
    );
  }

  async create(userId: string, carId: string): Promise<Favorite> {
    const existing = await this.findByUserAndCar(userId, carId);
    if (existing) {
      throw new Error('Car is already in favorites');
    }

    const favorite: Favorite = {
      id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      carId,
      createdAt: new Date(),
    };
    favorites.set(favorite.id, favorite);
    return favorite;
  }

  async delete(userId: string, carId: string): Promise<void> {
    const favorite = await this.findByUserAndCar(userId, carId);
    if (!favorite) {
      throw new Error('Favorite not found');
    }
    favorites.delete(favorite.id);
  }
}
