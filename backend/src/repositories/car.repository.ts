// Simple in-memory storage (replace with actual database later)
import { NotFoundError } from '../utils/errors';

interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl?: string;
  description?: string;
  categoryId?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CarCategory {
  id: string;
  name: string;
}

interface CarStats {
  id: string;
  carId: string;
  horsepower?: number;
  torque?: number;
  zeroTo100?: number;
  topSpeed?: number;
  batteryRange?: number;
}

export interface CarFilters {
  brand?: string;
  categoryId?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface CarWithRelations extends Car {
  category?: CarCategory | null;
  stats?: CarStats | null;
}

const cars: Map<string, Car> = new Map();
const stats: Map<string, CarStats> = new Map();

export class CarRepository {
  async findMany(
    filters: CarFilters,
    pagination: { skip: number; take: number }
  ): Promise<{ cars: CarWithRelations[]; total: number }> {
    let filtered = Array.from(cars.values());

    if (filters.brand) {
      filtered = filtered.filter((c) =>
        c.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters.categoryId) {
      filtered = filtered.filter((c) => c.categoryId === filters.categoryId);
    }

    if (filters.minYear) {
      filtered = filtered.filter((c) => c.year >= filters.minYear!);
    }

    if (filters.maxYear) {
      filtered = filtered.filter((c) => c.year <= filters.maxYear!);
    }

    if (filters.minPrice) {
      filtered = filtered.filter((c) => c.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((c) => c.price <= filters.maxPrice!);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.brand.toLowerCase().includes(searchLower) ||
          c.model.toLowerCase().includes(searchLower) ||
          c.description?.toLowerCase().includes(searchLower)
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice(pagination.skip, pagination.skip + pagination.take);

    const carsWithRelations: CarWithRelations[] = paginated.map((car) => ({
      ...car,
      stats: stats.get(car.id) || null,
      category: null, // Categories not implemented yet
    }));

    return { cars: carsWithRelations, total };
  }

  async findById(id: string): Promise<CarWithRelations | null> {
    const car = cars.get(id);
    if (!car) return null;

    return {
      ...car,
      stats: stats.get(id) || null,
      category: null,
    };
  }

  async create(data: {
    brand: string;
    model: string;
    year: number;
    price: number;
    imageUrl?: string;
    description?: string;
    categoryId?: string;
  }): Promise<CarWithRelations> {
    const car: Car = {
      id: `car_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    cars.set(car.id, car);

    return {
      ...car,
      stats: null,
      category: null,
    };
  }

  async update(
    id: string,
    data: Partial<{
      brand: string;
      model: string;
      year: number;
      price: number;
      imageUrl: string;
      description: string;
      categoryId: string;
    }>
  ): Promise<CarWithRelations> {
    const car = cars.get(id);
    if (!car) {
      throw new NotFoundError('Car not found');
    }

    const updated = { ...car, ...data, updatedAt: new Date() };
    cars.set(id, updated);

    return {
      ...updated,
      stats: stats.get(id) || null,
      category: null,
    };
  }

  async delete(id: string): Promise<void> {
    if (!cars.has(id)) {
      throw new NotFoundError('Car not found');
    }
    cars.delete(id);
    stats.delete(id);
  }
}
