import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryService } from '../services/category.service';
import { sendResponse } from '../utils/response';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  deleteCategorySchema,
} from '../validations/category.validation';

export class CategoryController {
  private categoryService = new CategoryService();

  async getCategories(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const categories = await this.categoryService.getCategories();
    return sendResponse(reply, 200, categories, 'Categories retrieved successfully');
  }

  async getCategoryById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = getCategorySchema.parse({ params: request.params });
    const category = await this.categoryService.getCategoryById(params.id);
    return sendResponse(reply, 200, category, 'Category retrieved successfully');
  }

  async createCategory(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = createCategorySchema.parse({ body: request.body });
    const category = await this.categoryService.createCategory(body.name);
    return sendResponse(reply, 201, category, 'Category created successfully');
  }

  async updateCategory(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = updateCategorySchema.parse({
      params: request.params,
      body: request.body,
    });
    const category = await this.categoryService.updateCategory(params.id, body.name);
    return sendResponse(reply, 200, category, 'Category updated successfully');
  }

  async deleteCategory(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = deleteCategorySchema.parse({ params: request.params });
    await this.categoryService.deleteCategory(params.id);
    return sendResponse(reply, 200, null, 'Category deleted successfully');
  }
}

