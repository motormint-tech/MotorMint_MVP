// Simple in-memory storage (replace with actual database later)
import { NotFoundError, ConflictError } from '../utils/errors';

interface CarCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categories: Map<string, CarCategory> = new Map();

export class CategoryRepository {
  async findMany(): Promise<CarCategory[]> {
    return Array.from(categories.values());
  }

  async findById(id: string): Promise<CarCategory | null> {
    return categories.get(id) || null;
  }

  async findByName(name: string): Promise<CarCategory | null> {
    return Array.from(categories.values()).find((c) => c.name === name) || null;
  }

  async create(name: string): Promise<CarCategory> {
    const existing = await this.findByName(name);
    if (existing) {
      throw new Error('Category with this name already exists');
    }

    const category: CarCategory = {
      id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categories.set(category.id, category);
    return category;
  }

  async update(id: string, name: string): Promise<CarCategory> {
    const category = categories.get(id);
    if (!category) {
      throw new Error('Category not found');
    }

    const existing = await this.findByName(name);
    if (existing && existing.id !== id) {
      throw new Error('Category with this name already exists');
    }

    const updated = { ...category, name, updatedAt: new Date() };
    categories.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    if (!categories.has(id)) {
      throw new Error('Category not found');
    }
    categories.delete(id);
  }
}
