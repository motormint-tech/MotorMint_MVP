import { FastifyInstance } from 'fastify';
import { authRoutes } from './auth.routes';
import { carRoutes } from './car.routes';
import { categoryRoutes } from './category.routes';
import { statsRoutes } from './stats.routes';
import { favoriteRoutes } from './favorite.routes';
import { blockchainRoutes } from './blockchain.routes';
import { walletRoutes } from './wallet.routes';
import { marketplaceRoutes } from './marketplace.routes';

export async function registerRoutes(fastify: FastifyInstance) {
  // Auth & User routes
  fastify.register(authRoutes, { prefix: '/api/auth' });
  fastify.register(favoriteRoutes, { prefix: '/api/favorites' });

  // Vehicle routes
  fastify.register(carRoutes, { prefix: '/api/cars' });
  fastify.register(categoryRoutes, { prefix: '/api/categories' });
  fastify.register(statsRoutes, { prefix: '/api/stats' });

  // Blockchain routes
  fastify.register(blockchainRoutes, { prefix: '/api/blockchain' });
  fastify.register(walletRoutes, { prefix: '/api/wallet' });
  fastify.register(marketplaceRoutes, { prefix: '/api/marketplace' });

  // Health check
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      network: 'Ethereum Mainnet',
      chainId: 1,
    };
  });
}

