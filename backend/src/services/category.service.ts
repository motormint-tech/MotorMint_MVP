import { CategoryRepository } from '../repositories/category.repository';
import { getCache, setCache, deleteCache } from '../utils/cache';
import { NotFoundError } from '../utils/errors';

interface CarCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async getCategories(): Promise<CarCategory[]> {
    const cacheKey = 'categories:all';
    const cached = await getCache<CarCategory[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const categories = await this.categoryRepository.findMany();
    await setCache(cacheKey, categories, 1800); // 30 minutes

    return categories;
  }

  async getCategoryById(id: string): Promise<CarCategory> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }

  async createCategory(name: string): Promise<CarCategory> {
    const category = await this.categoryRepository.create(name);

    // Invalidate cache
    await deleteCache('categories:all');

    return category;
  }

  async updateCategory(id: string, name: string): Promise<CarCategory> {
    const category = await this.categoryRepository.update(id, name);

    // Invalidate cache
    await deleteCache('categories:all');

    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);

    // Invalidate cache
    await deleteCache('categories:all');
  }
}

