import { CarRepository, CarFilters, CarWithRelations } from '../repositories/car.repository';
import { getPagination, getPaginationMeta } from '../utils/pagination';
import { getCache, setCache, deleteCachePattern, deleteCache } from '../utils/cache';
import { NotFoundError } from '../utils/errors';

export interface CreateCarInput {
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl?: string;
  description?: string;
  categoryId?: string;
}

export interface UpdateCarInput {
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  imageUrl?: string;
  description?: string;
  categoryId?: string;
}

export interface CarListResponse {
  cars: CarWithRelations[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class CarService {
  private carRepository = new CarRepository();

  async getCars(filters: CarFilters, page?: number, limit?: number): Promise<CarListResponse> {
    const pagination = getPagination({ page, limit });

    // Build cache key
    const cacheKey = `cars:${JSON.stringify({ filters, ...pagination })}`;

    // Try to get from cache
    const cached = await getCache<CarListResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const { cars, total } = await this.carRepository.findMany(filters, pagination);

    const meta = getPaginationMeta(total, pagination.page, pagination.limit);

    const result: CarListResponse = { cars, meta };

    // Cache the result
    await setCache(cacheKey, result, 300); // 5 minutes

    return result;
  }

  async getCarById(id: string): Promise<CarWithRelations> {
    const cacheKey = `car:${id}`;
    const cached = await getCache<CarWithRelations>(cacheKey);
    if (cached) {
      return cached;
    }

    const car = await this.carRepository.findById(id);
    if (!car) {
      throw new NotFoundError('Car not found');
    }

    await setCache(cacheKey, car, 600); // 10 minutes

    return car;
  }

  async createCar(input: CreateCarInput): Promise<CarWithRelations> {
    const car = await this.carRepository.create(input);

    // Invalidate cache
    await deleteCachePattern('cars:*');

    return car;
  }

  async updateCar(id: string, input: UpdateCarInput): Promise<CarWithRelations> {
    const car = await this.carRepository.update(id, input);

    // Invalidate cache
    await deleteCachePattern('cars:*');
    await deleteCache(`car:${id}`);

    return car;
  }

  async deleteCar(id: string): Promise<void> {
    await this.carRepository.delete(id);

    // Invalidate cache
    await deleteCachePattern('cars:*');
    await deleteCache(`car:${id}`);
  }
}

