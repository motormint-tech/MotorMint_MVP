// In-memory blockchain data storage (simulated)
import { NotFoundError, ConflictError } from '../utils/errors';
import {
  VehicleOnChainRecord,
  OwnershipRecord,
  Escrow,
  EscrowStatus,
  DriveChainIdentity,
  BlockchainTransaction,
  VehicleVerification,
} from '../types/blockchain.types';

// In-memory stores
const vehicleRecords: Map<string, VehicleOnChainRecord> = new Map();
const ownershipHistory: Map<string, OwnershipRecord[]> = new Map();
const escrows: Map<string, Escrow> = new Map();
const driveChainIdentities: Map<string, DriveChainIdentity> = new Map();
const transactions: Map<string, BlockchainTransaction> = new Map();
const verifications: Map<string, VehicleVerification[]> = new Map();

// Helper to generate mock blockchain data
function generateTxHash(): string {
  return '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function generateAddress(): string {
  return '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export class BlockchainRepository {
  // Vehicle On-Chain Records
  async getVehicleRecord(vehicleId: string): Promise<VehicleOnChainRecord | null> {
    return vehicleRecords.get(vehicleId) || null;
  }

  async createVehicleRecord(
    vehicleId: string,
    ownerAddress: string,
    metadataUri: string
  ): Promise<VehicleOnChainRecord> {
    if (vehicleRecords.has(vehicleId)) {
      throw new ConflictError('Vehicle already registered on-chain');
    }

    const txHash = generateTxHash();
    const blockNumber = Math.floor(Math.random() * 1000000) + 18000000;

    const record: VehicleOnChainRecord = {
      id: `record_${Date.now()}`,
      vehicleId,
      tokenId: `${Math.floor(Math.random() * 100000)}`,
      contractAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f5c2A1',
      registrationTxHash: txHash,
      registrationBlockNumber: blockNumber,
      registrationTimestamp: new Date(),
      currentOwner: ownerAddress,
      ownershipStatus: 'REGISTERED',
      verificationHash: generateTxHash(),
      metadataUri,
      chainId: 1,
      network: 'Ethereum Mainnet',
    };

    vehicleRecords.set(vehicleId, record);

    // Create initial ownership record
    await this.addOwnershipRecord(vehicleId, {
      ownerAddress,
      transferTxHash: txHash,
      transferBlockNumber: blockNumber,
      previousOwner: null,
      transferType: 'REGISTRATION',
    });

    // Create transaction record
    await this.createTransaction({
      txHash,
      blockNumber,
      from: ownerAddress,
      to: record.contractAddress,
      value: '0',
      type: 'REGISTRATION',
    });

    return record;
  }

  async updateVehicleOwner(
    vehicleId: string,
    newOwner: string,
    transferType: 'SALE' | 'GIFT' | 'ESCROW_RELEASE'
  ): Promise<VehicleOnChainRecord> {
    const record = vehicleRecords.get(vehicleId);
    if (!record) {
      throw new NotFoundError('Vehicle not registered on-chain');
    }

    const previousOwner = record.currentOwner;
    const txHash = generateTxHash();
    const blockNumber = record.registrationBlockNumber + Math.floor(Math.random() * 10000);

    record.currentOwner = newOwner;
    record.ownershipStatus = 'TRANSFERRED';
    vehicleRecords.set(vehicleId, record);

    await this.addOwnershipRecord(vehicleId, {
      ownerAddress: newOwner,
      transferTxHash: txHash,
      transferBlockNumber: blockNumber,
      previousOwner,
      transferType,
    });

    await this.createTransaction({
      txHash,
      blockNumber,
      from: previousOwner,
      to: newOwner,
      value: '0',
      type: 'TRANSFER',
    });

    return record;
  }

  // Ownership History
  async getOwnershipHistory(vehicleId: string): Promise<OwnershipRecord[]> {
    return ownershipHistory.get(vehicleId) || [];
  }

  async addOwnershipRecord(
    vehicleId: string,
    data: Omit<OwnershipRecord, 'id' | 'vehicleId' | 'transferTimestamp'>
  ): Promise<OwnershipRecord> {
    const record: OwnershipRecord = {
      id: `ownership_${Date.now()}`,
      vehicleId,
      ...data,
      transferTimestamp: new Date(),
    };

    const history = ownershipHistory.get(vehicleId) || [];
    history.push(record);
    ownershipHistory.set(vehicleId, history);

    return record;
  }

  // Escrow Management
  async getEscrow(escrowId: string): Promise<Escrow | null> {
    return escrows.get(escrowId) || null;
  }

  async getEscrowByVehicle(vehicleId: string): Promise<Escrow | null> {
    for (const escrow of escrows.values()) {
      if (escrow.vehicleId === vehicleId && escrow.status === 'ACTIVE') {
        return escrow;
      }
    }
    return null;
  }

  async getEscrowsByUser(userAddress: string): Promise<Escrow[]> {
    return Array.from(escrows.values()).filter(
      (e) => e.sellerAddress === userAddress || e.buyerAddress === userAddress
    );
  }

  async createEscrow(data: {
    vehicleId: string;
    sellerAddress: string;
    buyerAddress: string;
    amount: string;
    currency: 'ETH' | 'USDC' | 'MOTO';
    expiresAt: Date;
  }): Promise<Escrow> {
    const existingEscrow = await this.getEscrowByVehicle(data.vehicleId);
    if (existingEscrow) {
      throw new ConflictError('Vehicle already has an active escrow');
    }

    const txHash = generateTxHash();
    const escrowContract = generateAddress();

    const escrow: Escrow = {
      id: `escrow_${Date.now()}`,
      ...data,
      escrowContractAddress: escrowContract,
      status: 'ACTIVE',
      creationTxHash: txHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      conditions: [],
    };

    escrows.set(escrow.id, escrow);

    // Update vehicle status
    const vehicleRecord = vehicleRecords.get(data.vehicleId);
    if (vehicleRecord) {
      vehicleRecord.ownershipStatus = 'IN_ESCROW';
      vehicleRecords.set(data.vehicleId, vehicleRecord);
    }

    await this.createTransaction({
      txHash,
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      from: data.buyerAddress,
      to: escrowContract,
      value: data.amount,
      type: 'ESCROW_CREATE',
    });

    return escrow;
  }

  async updateEscrowStatus(escrowId: string, status: EscrowStatus): Promise<Escrow> {
    const escrow = escrows.get(escrowId);
    if (!escrow) {
      throw new NotFoundError('Escrow not found');
    }

    escrow.status = status;
    escrow.updatedAt = new Date();

    if (status === 'COMPLETED') {
      escrow.releaseTxHash = generateTxHash();
      
      // Transfer ownership
      await this.updateVehicleOwner(escrow.vehicleId, escrow.buyerAddress, 'ESCROW_RELEASE');

      await this.createTransaction({
        txHash: escrow.releaseTxHash,
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        from: escrow.escrowContractAddress,
        to: escrow.sellerAddress,
        value: escrow.amount,
        type: 'ESCROW_RELEASE',
      });
    } else if (status === 'CANCELLED') {
      escrow.cancelTxHash = generateTxHash();
      
      // Restore vehicle status
      const vehicleRecord = vehicleRecords.get(escrow.vehicleId);
      if (vehicleRecord) {
        vehicleRecord.ownershipStatus = 'REGISTERED';
        vehicleRecords.set(escrow.vehicleId, vehicleRecord);
      }

      await this.createTransaction({
        txHash: escrow.cancelTxHash,
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        from: escrow.escrowContractAddress,
        to: escrow.buyerAddress,
        value: escrow.amount,
        type: 'ESCROW_CANCEL',
      });
    }

    escrows.set(escrowId, escrow);
    return escrow;
  }

  // DriveChain Identity
  async getDriveChainIdentity(vehicleId: string): Promise<DriveChainIdentity | null> {
    return driveChainIdentities.get(vehicleId) || null;
  }

  async createDriveChainIdentity(data: {
    vehicleId: string;
    vin: string;
  }): Promise<DriveChainIdentity> {
    if (driveChainIdentities.has(data.vehicleId)) {
      throw new ConflictError('DriveChain identity already exists');
    }

    const identity: DriveChainIdentity = {
      id: `dc_${Date.now()}`,
      vehicleId: data.vehicleId,
      vin: data.vin,
      driveChainId: `DC-${Date.now().toString(36).toUpperCase()}`,
      healthScore: Math.floor(Math.random() * 30) + 70, // 70-100
      maintenanceLogHash: generateTxHash(),
      lastMaintenanceUpdate: new Date(),
      fraudScore: Math.random() * 10, // 0-10 (low is good)
      isAuthentic: true,
      registeredAt: new Date(),
    };

    driveChainIdentities.set(data.vehicleId, identity);
    return identity;
  }

  async updateDriveChainHealth(
    vehicleId: string,
    healthScore: number,
    maintenanceLogHash: string
  ): Promise<DriveChainIdentity> {
    const identity = driveChainIdentities.get(vehicleId);
    if (!identity) {
      throw new NotFoundError('DriveChain identity not found');
    }

    identity.healthScore = healthScore;
    identity.maintenanceLogHash = maintenanceLogHash;
    identity.lastMaintenanceUpdate = new Date();

    driveChainIdentities.set(vehicleId, identity);
    return identity;
  }

  // Transactions
  async createTransaction(data: {
    txHash: string;
    blockNumber: number;
    from: string;
    to: string;
    value: string;
    type: BlockchainTransaction['type'];
  }): Promise<BlockchainTransaction> {
    const tx: BlockchainTransaction = {
      id: `tx_${Date.now()}`,
      ...data,
      timestamp: new Date(),
      gasUsed: (Math.floor(Math.random() * 100000) + 21000).toString(),
      status: 'CONFIRMED',
    };

    transactions.set(tx.id, tx);
    return tx;
  }

  async getTransactionsByAddress(address: string): Promise<BlockchainTransaction[]> {
    return Array.from(transactions.values()).filter(
      (tx) => tx.from === address || tx.to === address
    );
  }

  async getTransactionByHash(txHash: string): Promise<BlockchainTransaction | null> {
    for (const tx of transactions.values()) {
      if (tx.txHash === txHash) {
        return tx;
      }
    }
    return null;
  }

  // Verifications
  async getVehicleVerifications(vehicleId: string): Promise<VehicleVerification[]> {
    return verifications.get(vehicleId) || [];
  }

  async addVerification(data: {
    vehicleId: string;
    verificationType: VehicleVerification['verificationType'];
    verifierAddress: string;
    metadata: Record<string, unknown>;
    expiresAt?: Date;
  }): Promise<VehicleVerification> {
    const verification: VehicleVerification = {
      id: `ver_${Date.now()}`,
      ...data,
      verificationHash: generateTxHash(),
      verifiedAt: new Date(),
      isValid: true,
    };

    const vehicleVerifications = verifications.get(data.vehicleId) || [];
    vehicleVerifications.push(verification);
    verifications.set(data.vehicleId, vehicleVerifications);

    return verification;
  }
}

// Export helper functions
export { generateTxHash, generateAddress, shortenAddress };
