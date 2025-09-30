import { StatsRepository } from '../repositories/stats.repository';
import { getCache, setCache, deleteCache } from '../utils/cache';
import { NotFoundError } from '../utils/errors';

interface CarStats {
  id: string;
  carId: string;
  horsepower?: number;
  torque?: number;
  zeroTo100?: number;
  topSpeed?: number;
  batteryRange?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStatsInput {
  carId: string;
  horsepower?: number;
  torque?: number;
  zeroTo100?: number;
  topSpeed?: number;
  batteryRange?: number;
}

export interface UpdateStatsInput {
  horsepower?: number;
  torque?: number;
  zeroTo100?: number;
  topSpeed?: number;
  batteryRange?: number;
}

export class StatsService {
  private statsRepository = new StatsRepository();

  async getStatsByCarId(carId: string): Promise<CarStats> {
    const cacheKey = `stats:car:${carId}`;
    const cached = await getCache<CarStats>(cacheKey);
    if (cached) {
      return cached;
    }

    const stats = await this.statsRepository.findByCarId(carId);
    if (!stats) {
      throw new NotFoundError('Car stats not found');
    }

    await setCache(cacheKey, stats, 600); // 10 minutes

    return stats;
  }

  async createStats(input: CreateStatsInput): Promise<CarStats> {
    const stats = await this.statsRepository.create(input);

    // Invalidate cache
    await deleteCache(`stats:car:${input.carId}`);
    await deleteCache(`car:${input.carId}`);

    return stats;
  }

  async updateStats(carId: string, input: UpdateStatsInput): Promise<CarStats> {
    const stats = await this.statsRepository.update(carId, input);

    // Invalidate cache
    await deleteCache(`stats:car:${carId}`);
    await deleteCache(`car:${carId}`);

    return stats;
  }

  async deleteStats(carId: string): Promise<void> {
    await this.statsRepository.delete(carId);

    // Invalidate cache
    await deleteCache(`stats:car:${carId}`);
    await deleteCache(`car:${carId}`);
  }
}

