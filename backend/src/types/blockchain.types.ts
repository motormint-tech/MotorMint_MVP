// Blockchain-related types for MotorMint

export type EscrowStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
export type TransactionStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';
export type OwnershipStatus = 'REGISTERED' | 'TRANSFERRED' | 'LOCKED' | 'IN_ESCROW';

export interface WalletAddress {
  address: string;
  shortAddress: string; // e.g., "0x1234...abcd"
}

export interface BlockchainTransaction {
  id: string;
  txHash: string;
  blockNumber: number;
  timestamp: Date;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  status: TransactionStatus;
  type: 'REGISTRATION' | 'TRANSFER' | 'ESCROW_CREATE' | 'ESCROW_RELEASE' | 'ESCROW_CANCEL';
}

export interface VehicleOnChainRecord {
  id: string;
  vehicleId: string;
  tokenId: string;
  contractAddress: string;
  registrationTxHash: string;
  registrationBlockNumber: number;
  registrationTimestamp: Date;
  currentOwner: string;
  ownershipStatus: OwnershipStatus;
  verificationHash: string;
  metadataUri: string;
  chainId: number;
  network: string;
}

export interface OwnershipRecord {
  id: string;
  vehicleId: string;
  ownerAddress: string;
  transferTxHash: string;
  transferBlockNumber: number;
  transferTimestamp: Date;
  previousOwner: string | null;
  transferType: 'REGISTRATION' | 'SALE' | 'GIFT' | 'ESCROW_RELEASE';
}

export interface Escrow {
  id: string;
  vehicleId: string;
  sellerAddress: string;
  buyerAddress: string;
  escrowContractAddress: string;
  amount: string;
  currency: 'ETH' | 'USDC' | 'MOTO';
  status: EscrowStatus;
  creationTxHash: string;
  releaseTxHash?: string;
  cancelTxHash?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  conditions: EscrowCondition[];
}

export interface EscrowCondition {
  id: string;
  escrowId: string;
  description: string;
  isMet: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
}

export interface VehicleVerification {
  id: string;
  vehicleId: string;
  verificationType: 'VIN' | 'TITLE' | 'INSPECTION' | 'HISTORY';
  verificationHash: string;
  verifiedAt: Date;
  verifierAddress: string;
  expiresAt?: Date;
  isValid: boolean;
  metadata: Record<string, unknown>;
}

export interface DriveChainIdentity {
  id: string;
  vehicleId: string;
  vin: string;
  driveChainId: string;
  healthScore: number;
  maintenanceLogHash: string;
  lastMaintenanceUpdate: Date;
  fraudScore: number;
  isAuthentic: boolean;
  registeredAt: Date;
}

export interface TokenPrice {
  symbol: string;
  name: string;
  priceUsd: number;
  priceEth: number;
  change24h: number;
  lastUpdated: Date;
}

export interface GasEstimate {
  slow: { gasPrice: string; estimatedTime: number };
  standard: { gasPrice: string; estimatedTime: number };
  fast: { gasPrice: string; estimatedTime: number };
}

export interface NetworkInfo {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  currency: string;
  isTestnet: boolean;
}
