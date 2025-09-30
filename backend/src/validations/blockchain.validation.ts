import { z } from 'zod';

// Ethereum address validation
const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
const txHashRegex = /^0x[a-fA-F0-9]{64}$/;

export const registerVehicleSchema = z.object({
  body: z.object({
    vehicleId: z.string().min(1, 'Vehicle ID is required'),
    ownerAddress: z.string().regex(ethereumAddressRegex, 'Invalid Ethereum address'),
    vin: z.string().length(17, 'VIN must be 17 characters'),
    metadataUri: z.string().url('Invalid metadata URI'),
  }),
});

export const createEscrowSchema = z.object({
  body: z.object({
    vehicleId: z.string().min(1, 'Vehicle ID is required'),
    sellerAddress: z.string().regex(ethereumAddressRegex, 'Invalid seller address'),
    buyerAddress: z.string().regex(ethereumAddressRegex, 'Invalid buyer address'),
    amount: z.string().min(1, 'Amount is required'),
    currency: z.enum(['ETH', 'USDC', 'MOTO']),
    durationDays: z.number().min(1).max(90),
  }),
});

export const escrowIdSchema = z.object({
  params: z.object({
    escrowId: z.string().min(1, 'Escrow ID is required'),
  }),
});

export const vehicleIdSchema = z.object({
  params: z.object({
    vehicleId: z.string().min(1, 'Vehicle ID is required'),
  }),
});

export const transferOwnershipSchema = z.object({
  params: z.object({
    vehicleId: z.string().min(1, 'Vehicle ID is required'),
  }),
  body: z.object({
    newOwnerAddress: z.string().regex(ethereumAddressRegex, 'Invalid Ethereum address'),
    transferType: z.enum(['SALE', 'GIFT']),
  }),
});

export const verifyVehicleSchema = z.object({
  params: z.object({
    vehicleId: z.string().min(1, 'Vehicle ID is required'),
  }),
  body: z.object({
    verificationType: z.enum(['VIN', 'TITLE', 'INSPECTION', 'HISTORY']),
    verifierAddress: z.string().regex(ethereumAddressRegex, 'Invalid verifier address'),
    metadata: z.record(z.unknown()),
  }),
});

export const txHashSchema = z.object({
  params: z.object({
    txHash: z.string().regex(txHashRegex, 'Invalid transaction hash'),
  }),
});

export const addressSchema = z.object({
  params: z.object({
    address: z.string().regex(ethereumAddressRegex, 'Invalid Ethereum address'),
  }),
});

export const updateMaintenanceSchema = z.object({
  params: z.object({
    vehicleId: z.string().min(1, 'Vehicle ID is required'),
  }),
  body: z.object({
    maintenanceData: z.record(z.unknown()),
  }),
});

export const chainIdSchema = z.object({
  params: z.object({
    chainId: z.string().refine((val) => !isNaN(parseInt(val, 10)), 'Invalid chain ID'),
  }),
});
