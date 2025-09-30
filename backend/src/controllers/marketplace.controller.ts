import { FastifyRequest, FastifyReply } from 'fastify';
import { MarketplaceService } from '../services/marketplace.service';
import { sendResponse } from '../utils/response';
import { z } from 'zod';

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const getListingsSchema = z.object({
  query: z.object({
    minPrice: z.string().transform(Number).optional(),
    maxPrice: z.string().transform(Number).optional(),
    minYear: z.string().transform(Number).optional(),
    maxYear: z.string().transform(Number).optional(),
    brand: z.string().optional(),
    status: z.enum(['LISTED', 'IN_ESCROW', 'SOLD', 'UNLISTED']).optional(),
    hasEscrow: z.string().transform((v) => v === 'true').optional(),
    isVerified: z.string().transform((v) => v === 'true').optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
  }),
});

const createListingSchema = z.object({
  body: z.object({
    vehicleId: z.string().min(1),
    priceUsd: z.number().positive(),
    sellerAddress: z.string().regex(ethereumAddressRegex),
    imageUrl: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

const updatePriceSchema = z.object({
  params: z.object({
    listingId: z.string().min(1),
  }),
  body: z.object({
    priceUsd: z.number().positive(),
  }),
});

const updateStatusSchema = z.object({
  params: z.object({
    listingId: z.string().min(1),
  }),
  body: z.object({
    status: z.enum(['LISTED', 'IN_ESCROW', 'SOLD', 'UNLISTED']),
  }),
});

const listingIdSchema = z.object({
  params: z.object({
    listingId: z.string().min(1),
  }),
});

export class MarketplaceController {
  private marketplaceService = new MarketplaceService();

  async getListings(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { query } = getListingsSchema.parse({ query: request.query });
    const result = await this.marketplaceService.getListings(query);
    return sendResponse(reply, 200, result, 'Listings retrieved');
  }

  async getListing(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = listingIdSchema.parse({ params: request.params });
    const listing = await this.marketplaceService.getListing(params.listingId);
    return sendResponse(reply, 200, listing, 'Listing retrieved');
  }

  async createListing(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = createListingSchema.parse({ body: request.body });
    const listing = await this.marketplaceService.createListing(body);
    return sendResponse(reply, 201, listing, 'Listing created');
  }

  async updatePrice(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = updatePriceSchema.parse({
      params: request.params,
      body: request.body,
    });
    const listing = await this.marketplaceService.updateListingPrice(
      params.listingId,
      body.priceUsd
    );
    return sendResponse(reply, 200, listing, 'Price updated');
  }

  async updateStatus(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = updateStatusSchema.parse({
      params: request.params,
      body: request.body,
    });
    const listing = await this.marketplaceService.updateListingStatus(
      params.listingId,
      body.status
    );
    return sendResponse(reply, 200, listing, 'Status updated');
  }

  async removeListing(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = listingIdSchema.parse({ params: request.params });
    await this.marketplaceService.removeListing(params.listingId);
    return sendResponse(reply, 200, null, 'Listing removed');
  }

  async getStats(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const stats = await this.marketplaceService.getMarketplaceStats();
    return sendResponse(reply, 200, stats, 'Marketplace stats retrieved');
  }

  async getRecentTransactions(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const limit = (request.query as { limit?: string }).limit;
    const transactions = await this.marketplaceService.getRecentTransactions(
      limit ? parseInt(limit, 10) : 10
    );
    return sendResponse(reply, 200, transactions, 'Recent transactions retrieved');
  }
}
