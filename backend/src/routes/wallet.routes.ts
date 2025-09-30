import { FastifyInstance } from 'fastify';
import { WalletController } from '../controllers/wallet.controller';
import { authenticate } from '../middleware/auth';

export async function walletRoutes(fastify: FastifyInstance) {
  const controller = new WalletController();

  // Public routes
  fastify.get('/nonce/:address', controller.getNonce.bind(controller));
  fastify.get('/session/:address', controller.getSession.bind(controller));
  fastify.get('/mock', controller.generateMockWallet.bind(controller)); // For testing

  // Protected routes
  fastify.post('/verify', { preHandler: authenticate }, controller.verifySignature.bind(controller));
  fastify.delete(
    '/disconnect/:address',
    { preHandler: authenticate },
    controller.disconnect.bind(controller)
  );
  fastify.get('/user', { preHandler: authenticate }, controller.getUserWallets.bind(controller));
  fastify.post(
    '/network/:address',
    { preHandler: authenticate },
    controller.switchNetwork.bind(controller)
  );
}
