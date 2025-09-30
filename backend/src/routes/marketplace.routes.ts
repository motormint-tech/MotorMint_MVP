import { FastifyInstance } from 'fastify';
import { MarketplaceController } from '../controllers/marketplace.controller';
import { authenticate } from '../middleware/auth';

export async function marketplaceRoutes(fastify: FastifyInstance) {
  const controller = new MarketplaceController();

  // Public routes
  fastify.get('/listings', controller.getListings.bind(controller));
  fastify.get('/listings/:listingId', controller.getListing.bind(controller));
  fastify.get('/stats', controller.getStats.bind(controller));
  fastify.get('/transactions', controller.getRecentTransactions.bind(controller));

  // Protected routes
  fastify.post(
    '/listings',
    { preHandler: authenticate },
    controller.createListing.bind(controller)
  );
  fastify.patch(
    '/listings/:listingId/price',
    { preHandler: authenticate },
    controller.updatePrice.bind(controller)
  );
  fastify.patch(
    '/listings/:listingId/status',
    { preHandler: authenticate },
    controller.updateStatus.bind(controller)
  );
  fastify.delete(
    '/listings/:listingId',
    { preHandler: authenticate },
    controller.removeListing.bind(controller)
  );
}
