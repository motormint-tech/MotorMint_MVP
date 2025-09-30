import { FastifyRequest, FastifyReply } from 'fastify';
import { BlockchainService } from '../services/blockchain.service';
import { sendResponse } from '../utils/response';
import {
  registerVehicleSchema,
  createEscrowSchema,
  escrowIdSchema,
  vehicleIdSchema,
  transferOwnershipSchema,
  verifyVehicleSchema,
  txHashSchema,
  addressSchema,
  updateMaintenanceSchema,
} from '../validations/blockchain.validation';

export class BlockchainController {
  private blockchainService = new BlockchainService();

  // Network & Gas
  async getNetworkInfo(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = request as { params: { chainId: string } };
    const chainId = parseInt(params.chainId, 10);
    const network = await this.blockchainService.getNetworkInfo(chainId);
    return sendResponse(reply, 200, network, 'Network info retrieved');
  }

  async getSupportedNetworks(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const networks = await this.blockchainService.getSupportedNetworks();
    return sendResponse(reply, 200, networks, 'Supported networks retrieved');
  }

  async getGasEstimate(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const gasEstimate = await this.blockchainService.getGasEstimate();
    return sendResponse(reply, 200, gasEstimate, 'Gas estimate retrieved');
  }

  async getTokenPrices(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const prices = await this.blockchainService.getTokenPrices();
    return sendResponse(reply, 200, prices, 'Token prices retrieved');
  }

  // Vehicle Registration
  async registerVehicle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = registerVehicleSchema.parse({ body: request.body });
    const result = await this.blockchainService.registerVehicle(
      body.vehicleId,
      body.ownerAddress,
      body.vin,
      body.metadataUri
    );
    return sendResponse(reply, 201, result, 'Vehicle registered on blockchain');
  }

  async getVehicleBlockchainData(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { params } = vehicleIdSchema.parse({ params: request.params });
    const data = await this.blockchainService.getVehicleBlockchainData(params.vehicleId);
    return sendResponse(reply, 200, data, 'Vehicle blockchain data retrieved');
  }

  // Escrow
  async createEscrow(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = createEscrowSchema.parse({ body: request.body });
    const escrow = await this.blockchainService.createEscrow(body);
    return sendResponse(reply, 201, escrow, 'Escrow created successfully');
  }

  async getEscrow(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = escrowIdSchema.parse({ params: request.params });
    const escrow = await this.blockchainService.getEscrow(params.escrowId);
    return sendResponse(reply, 200, escrow, 'Escrow retrieved');
  }

  async getUserEscrows(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = addressSchema.parse({ params: request.params });
    const escrows = await this.blockchainService.getUserEscrows(params.address);
    return sendResponse(reply, 200, escrows, 'User escrows retrieved');
  }

  async releaseEscrow(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = escrowIdSchema.parse({ params: request.params });
    const escrow = await this.blockchainService.releaseEscrow(params.escrowId);
    return sendResponse(reply, 200, escrow, 'Escrow released successfully');
  }

  async cancelEscrow(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = escrowIdSchema.parse({ params: request.params });
    const escrow = await this.blockchainService.cancelEscrow(params.escrowId);
    return sendResponse(reply, 200, escrow, 'Escrow cancelled successfully');
  }

  async disputeEscrow(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = escrowIdSchema.parse({ params: request.params });
    const escrow = await this.blockchainService.disputeEscrow(params.escrowId);
    return sendResponse(reply, 200, escrow, 'Escrow disputed');
  }

  // Ownership Transfer
  async transferOwnership(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = transferOwnershipSchema.parse({
      params: request.params,
      body: request.body,
    });
    const record = await this.blockchainService.transferOwnership(
      params.vehicleId,
      body.newOwnerAddress,
      body.transferType
    );
    return sendResponse(reply, 200, record, 'Ownership transferred successfully');
  }

  // DriveChain
  async getDriveChainIdentity(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = vehicleIdSchema.parse({ params: request.params });
    const identity = await this.blockchainService.getDriveChainIdentity(params.vehicleId);
    return sendResponse(reply, 200, identity, 'DriveChain identity retrieved');
  }

  async updateMaintenanceLog(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = updateMaintenanceSchema.parse({
      params: request.params,
      body: request.body,
    });
    const identity = await this.blockchainService.updateMaintenanceLog(
      params.vehicleId,
      body.maintenanceData
    );
    return sendResponse(reply, 200, identity, 'Maintenance log updated');
  }

  // Transactions
  async getUserTransactions(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = addressSchema.parse({ params: request.params });
    const transactions = await this.blockchainService.getUserTransactions(params.address);
    return sendResponse(reply, 200, transactions, 'User transactions retrieved');
  }

  async getTransaction(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = txHashSchema.parse({ params: request.params });
    const transaction = await this.blockchainService.getTransaction(params.txHash);
    return sendResponse(reply, 200, transaction, 'Transaction retrieved');
  }

  // Verification
  async verifyVehicle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = verifyVehicleSchema.parse({
      params: request.params,
      body: request.body,
    });
    const verification = await this.blockchainService.verifyVehicle(
      params.vehicleId,
      body.verificationType,
      body.verifierAddress,
      body.metadata
    );
    return sendResponse(reply, 201, verification, 'Vehicle verified successfully');
  }
}
