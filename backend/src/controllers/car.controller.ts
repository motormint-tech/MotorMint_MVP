import { FastifyRequest, FastifyReply } from 'fastify';
import { CarService } from '../services/car.service';
import { sendResponse } from '../utils/response';
import {
  createCarSchema,
  updateCarSchema,
  getCarSchema,
  getCarsSchema,
  deleteCarSchema,
} from '../validations/car.validation';

export class CarController {
  private carService = new CarService();

  async getCars(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { query } = getCarsSchema.parse({ query: request.query });
    const result = await this.carService.getCars(
      {
        brand: query.brand,
        categoryId: query.categoryId,
        minYear: query.minYear,
        maxYear: query.maxYear,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        search: query.search,
      },
      query.page,
      query.limit
    );
    return sendResponse(reply, 200, result.cars, 'Cars retrieved successfully', result.meta);
  }

  async getCarById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = getCarSchema.parse({ params: request.params });
    const car = await this.carService.getCarById(params.id);
    return sendResponse(reply, 200, car, 'Car retrieved successfully');
  }

  async createCar(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = createCarSchema.parse({ body: request.body });
    const car = await this.carService.createCar(body);
    return sendResponse(reply, 201, car, 'Car created successfully');
  }

  async updateCar(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = updateCarSchema.parse({
      params: request.params,
      body: request.body,
    });
    const car = await this.carService.updateCar(params.id, body);
    return sendResponse(reply, 200, car, 'Car updated successfully');
  }

  async deleteCar(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = deleteCarSchema.parse({ params: request.params });
    await this.carService.deleteCar(params.id);
    return sendResponse(reply, 200, null, 'Car deleted successfully');
  }
}

