import { FastifyInstance } from 'fastify';
import { BlockchainController } from '../controllers/blockchain.controller';
import { authenticate } from '../middleware/auth';

export async function blockchainRoutes(fastify: FastifyInstance) {
  const controller = new BlockchainController();

  // Public routes - Network & Prices
  fastify.get('/networks', controller.getSupportedNetworks.bind(controller));
  fastify.get('/networks/:chainId', controller.getNetworkInfo.bind(controller));
  fastify.get('/gas', controller.getGasEstimate.bind(controller));
  fastify.get('/prices', controller.getTokenPrices.bind(controller));

  // Public routes - Vehicle Data (read-only)
  fastify.get('/vehicles/:vehicleId', controller.getVehicleBlockchainData.bind(controller));
  fastify.get('/vehicles/:vehicleId/drivechain', controller.getDriveChainIdentity.bind(controller));

  // Public routes - Transaction lookup
  fastify.get('/transactions/:txHash', controller.getTransaction.bind(controller));
  fastify.get('/address/:address/transactions', controller.getUserTransactions.bind(controller));

  // Public routes - Escrow lookup
  fastify.get('/escrows/:escrowId', controller.getEscrow.bind(controller));
  fastify.get('/address/:address/escrows', controller.getUserEscrows.bind(controller));

  // Protected routes - Vehicle Registration
  fastify.post(
    '/vehicles/register',
    { preHandler: authenticate },
    controller.registerVehicle.bind(controller)
  );

  // Protected routes - Ownership Transfer
  fastify.post(
    '/vehicles/:vehicleId/transfer',
    { preHandler: authenticate },
    controller.transferOwnership.bind(controller)
  );

  // Protected routes - Maintenance
  fastify.post(
    '/vehicles/:vehicleId/maintenance',
    { preHandler: authenticate },
    controller.updateMaintenanceLog.bind(controller)
  );

  // Protected routes - Verification
  fastify.post(
    '/vehicles/:vehicleId/verify',
    { preHandler: authenticate },
    controller.verifyVehicle.bind(controller)
  );

  // Protected routes - Escrow Management
  fastify.post('/escrows', { preHandler: authenticate }, controller.createEscrow.bind(controller));
  fastify.post(
    '/escrows/:escrowId/release',
    { preHandler: authenticate },
    controller.releaseEscrow.bind(controller)
  );
  fastify.post(
    '/escrows/:escrowId/cancel',
    { preHandler: authenticate },
    controller.cancelEscrow.bind(controller)
  );
  fastify.post(
    '/escrows/:escrowId/dispute',
    { preHandler: authenticate },
    controller.disputeEscrow.bind(controller)
  );
}
