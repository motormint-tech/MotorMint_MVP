import { FastifyRequest, FastifyReply } from 'fastify';
import { StatsService } from '../services/stats.service';
import { sendResponse } from '../utils/response';
import {
  createStatsSchema,
  updateStatsSchema,
  getStatsSchema,
  deleteStatsSchema,
} from '../validations/stats.validation';

export class StatsController {
  private statsService = new StatsService();

  async getStatsByCarId(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = getStatsSchema.parse({ params: request.params });
    const stats = await this.statsService.getStatsByCarId(params.carId);
    return sendResponse(reply, 200, stats, 'Stats retrieved successfully');
  }

  async createStats(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = createStatsSchema.parse({ body: request.body });
    const stats = await this.statsService.createStats(body);
    return sendResponse(reply, 201, stats, 'Stats created successfully');
  }

  async updateStats(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = updateStatsSchema.parse({
      params: request.params,
      body: request.body,
    });
    const stats = await this.statsService.updateStats(params.carId, body);
    return sendResponse(reply, 200, stats, 'Stats updated successfully');
  }

  async deleteStats(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = deleteStatsSchema.parse({ params: request.params });
    await this.statsService.deleteStats(params.carId);
    return sendResponse(reply, 200, null, 'Stats deleted successfully');
  }
}

