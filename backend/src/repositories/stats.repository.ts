// Simple in-memory storage (replace with actual database later)
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

const stats: Map<string, CarStats> = new Map();

export class StatsRepository {
  async findByCarId(carId: string): Promise<CarStats | null> {
    return Array.from(stats.values()).find((s) => s.carId === carId) || null;
  }

  async findById(id: string): Promise<CarStats | null> {
    return stats.get(id) || null;
  }

  async create(data: {
    carId: string;
    horsepower?: number;
    torque?: number;
    zeroTo100?: number;
    topSpeed?: number;
    batteryRange?: number;
  }): Promise<CarStats> {
    const stat: CarStats = {
      id: `stats_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    stats.set(stat.id, stat);
    return stat;
  }

  async update(
    carId: string,
    data: Partial<{
      horsepower: number;
      torque: number;
      zeroTo100: number;
      topSpeed: number;
      batteryRange: number;
    }>
  ): Promise<CarStats> {
    const stat = await this.findByCarId(carId);
    if (!stat) {
      throw new Error('Car stats not found');
    }

    const updated = { ...stat, ...data, updatedAt: new Date() };
    stats.set(stat.id, updated);
    return updated;
  }

  async delete(carId: string): Promise<void> {
    const stat = await this.findByCarId(carId);
    if (!stat) {
      throw new Error('Car stats not found');
    }
    stats.delete(stat.id);
  }
}
