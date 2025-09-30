import { FastifyRequest, FastifyReply } from 'fastify';
import { WalletService } from '../services/wallet.service';
import { sendResponse } from '../utils/response';
import { z } from 'zod';

const addressSchema = z.object({
  params: z.object({
    address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  }),
});

const verifySignatureSchema = z.object({
  body: z.object({
    address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
    signature: z.string().regex(/^0x[a-fA-F0-9]{130}$/, 'Invalid signature format'),
  }),
});

const switchNetworkSchema = z.object({
  params: z.object({
    address: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  }),
  body: z.object({
    chainId: z.number().int().positive(),
  }),
});

export class WalletController {
  private walletService = new WalletService();

  async getNonce(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = addressSchema.parse({ params: request.params });
    const result = await this.walletService.getNonce(params.address);
    return sendResponse(reply, 200, result, 'Nonce generated');
  }

  async verifySignature(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    if (!request.user) {
      return sendResponse(reply, 401, null, 'Authentication required');
    }

    const { body } = verifySignatureSchema.parse({ body: request.body });
    const session = await this.walletService.verifySignature(
      body.address,
      body.signature,
      request.user.userId
    );
    return sendResponse(reply, 200, session, 'Wallet connected successfully');
  }

  async getSession(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = addressSchema.parse({ params: request.params });
    const session = await this.walletService.getSession(params.address);
    if (!session) {
      return sendResponse(reply, 404, null, 'Wallet not connected');
    }
    return sendResponse(reply, 200, session, 'Session retrieved');
  }

  async disconnect(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params } = addressSchema.parse({ params: request.params });
    await this.walletService.disconnect(params.address);
    return sendResponse(reply, 200, null, 'Wallet disconnected');
  }

  async getUserWallets(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    if (!request.user) {
      return sendResponse(reply, 401, null, 'Authentication required');
    }

    const wallets = await this.walletService.getUserWallets(request.user.userId);
    return sendResponse(reply, 200, { wallets }, 'User wallets retrieved');
  }

  async switchNetwork(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { params, body } = switchNetworkSchema.parse({
      params: request.params,
      body: request.body,
    });
    const session = await this.walletService.switchNetwork(params.address, body.chainId);
    return sendResponse(reply, 200, session, 'Network switched');
  }

  async generateMockWallet(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const wallet = this.walletService.generateMockWallet();
    return sendResponse(reply, 200, wallet, 'Mock wallet generated (for testing only)');
  }
}
